import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  projectType: z.string().min(1),
  message: z.string().min(10).max(3000),
  // honeypot — bots fill this; humans leave it empty
  company_website: z.string().max(0),
  // Turnstile token from the client widget
  turnstileToken: z.string().min(1),
});

export async function POST(request: NextRequest) {
  // ── 1. Parse body ─────────────────────────────────────────────────────────
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    console.error("[CONTACT API] Failed to parse request body as JSON");
    return NextResponse.json(
      { success: false, message: "Invalid request." },
      { status: 400 }
    );
  }

  console.log("[CONTACT API] Request received");

  // ── 2. Validate fields ────────────────────────────────────────────────────
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    const issues = parsed.error.flatten().fieldErrors;

    // Honeypot triggered — silently accept to confuse bots
    if (issues.company_website) {
      console.log("[CONTACT API] Honeypot triggered — silently accepted");
      return NextResponse.json({
        success: true,
        message: "Thank you! Your project request has been received. I'll get back to you soon.",
      });
    }

    console.warn("[CONTACT API] Zod validation failed:", Object.keys(issues));
    return NextResponse.json(
      { success: false, message: "Please correct the errors in the form.", errors: issues },
      { status: 422 }
    );
  }

  console.log("[CONTACT API] Zod validation: success");
  const { name, email, projectType, message, turnstileToken } = parsed.data;

  // ── 3. Server-side Turnstile verification ─────────────────────────────────
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    console.error("[CONTACT API] TURNSTILE_SECRET_KEY is not set in environment");
    return NextResponse.json(
      { success: false, message: "Server configuration error. Please try again later." },
      { status: 500 }
    );
  }

  let turnstileOk = false;
  try {
    // Cloudflare Siteverify: send as application/x-www-form-urlencoded
    // (the officially documented and most reliable format)
    const formBody = new URLSearchParams();
    formBody.set("secret", secretKey);
    formBody.set("response", turnstileToken);

    const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    if (clientIp) {
      formBody.set("remoteip", clientIp);
    }

    const verifyRes = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formBody.toString(),
    });

    const verifyData = await verifyRes.json() as {
      success: boolean;
      "error-codes"?: string[];
      hostname?: string;
      challenge_ts?: string;
    };

    // Safe diagnostic log — no secrets
    console.log("[CONTACT API] Turnstile siteverify response:", {
      success: verifyData.success,
      errorCodes: verifyData["error-codes"] ?? [],
      hostname: verifyData.hostname ?? "not-returned",
    });

    if (!verifyData.success) {
      console.warn("[CONTACT API] Turnstile verification failed. Error codes:", verifyData["error-codes"]);
      turnstileOk = false;
    } else {
      // Hostname check: only enforce if Cloudflare actually returns a hostname.
      // The allowed list covers production + localhost for dev.
      const allowedHostnames = ["sahilmahida.vercel.app", "localhost"];

      if (verifyData.hostname && !allowedHostnames.includes(verifyData.hostname)) {
        console.warn(
          "[CONTACT API] Turnstile hostname mismatch — expected one of",
          allowedHostnames,
          "got:",
          verifyData.hostname
        );
        turnstileOk = false;
      } else {
        console.log("[CONTACT API] Turnstile verification: success");
        turnstileOk = true;
      }
    }
  } catch (err) {
    console.error("[CONTACT API] Turnstile network/fetch error:", err instanceof Error ? err.message : String(err));
    return NextResponse.json(
      { success: false, message: "Unable to verify your request. Please try again." },
      { status: 502 }
    );
  }

  if (!turnstileOk) {
    return NextResponse.json(
      { success: false, message: "Human verification failed. Please refresh and try again." },
      { status: 403 }
    );
  }

  // ── 4. Forward to Web3Forms ───────────────────────────────────────────────
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    console.error("[CONTACT API] NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is not set in environment");
    return NextResponse.json(
      { success: false, message: "Unable to submit your request right now. Please email me directly." },
      { status: 500 }
    );
  }

  const payload = {
    access_key: accessKey,
    subject: "New Project Inquiry — Sahil Mahida Portfolio",
    from_name: "SAHIL.OS Portfolio",
    replyto: email,
    name,
    email,
    "Project Type": projectType,
    message,
  };

  try {
    console.log("[CONTACT API] Sending to Web3Forms...");

    const w3res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const w3data = await w3res.json() as { success: boolean; message?: string };

    console.log("[CONTACT API] Web3Forms response:", {
      status: w3res.status,
      success: w3data.success,
      // safe diagnostic — not logging message contents
    });

    if (!w3res.ok || !w3data.success) {
      console.error("[CONTACT API] Web3Forms submission failed. HTTP status:", w3res.status);
      return NextResponse.json(
        { success: false, message: "Unable to submit your request right now. Please email me directly." },
        { status: 502 }
      );
    }

    console.log("[CONTACT API] Web3Forms: success — email dispatched");
    return NextResponse.json({
      success: true,
      message: "Thank you! Your project request has been received. I'll get back to you soon.",
    });
  } catch (err) {
    console.error("[CONTACT API] Web3Forms network error:", err instanceof Error ? err.message : String(err));
    return NextResponse.json(
      { success: false, message: "Unable to submit your request right now. Please email me directly." },
      { status: 502 }
    );
  }
}
