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
    return NextResponse.json({ success: false, message: "Invalid request." }, { status: 400 });
  }

  // ── 2. Validate fields ────────────────────────────────────────────────────
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    // Honeypot triggered — silently accept to confuse bots
    const issues = parsed.error.flatten().fieldErrors;
    if (issues.company_website) {
      return NextResponse.json({ success: true, message: "Thank you! Your project request has been received. I'll get back to you soon." });
    }
    return NextResponse.json({ success: false, message: "Please correct the errors in the form.", errors: issues }, { status: 422 });
  }

  const { name, email, projectType, message, turnstileToken } = parsed.data;

  // ── 3. Server-side Turnstile verification ─────────────────────────────────
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    console.error("[contact/api] TURNSTILE_SECRET_KEY is not set.");
    return NextResponse.json({ success: false, message: "Server configuration error. Please try again later." }, { status: 500 });
  }

  let turnstileOk = false;
  try {
    const verifyRes = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: secretKey,
        response: turnstileToken,
        // Forward the visitor's IP for Cloudflare's risk scoring
        remoteip: request.headers.get("x-forwarded-for") ?? undefined,
      }),
    });

    const verifyData = await verifyRes.json() as { success: boolean; hostname?: string };

    // Verify success + optionally check hostname matches production domain
    const allowedHostnames = [
      "sahilmahida.vercel.app",
      // localhost is accepted in Cloudflare test-key mode during development
      "localhost",
    ];

    if (
      verifyData.success &&
      (!verifyData.hostname || allowedHostnames.includes(verifyData.hostname))
    ) {
      turnstileOk = true;
    } else {
      console.warn("[contact/api] Turnstile rejected:", verifyData);
    }
  } catch (err) {
    console.error("[contact/api] Turnstile network error:", err);
    return NextResponse.json({ success: false, message: "Unable to verify your request. Please try again." }, { status: 502 });
  }

  if (!turnstileOk) {
    return NextResponse.json({ success: false, message: "Human verification failed. Please refresh and try again." }, { status: 403 });
  }

  // ── 4. Forward to Web3Forms ───────────────────────────────────────────────
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    console.error("[contact/api] NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is not set.");
    return NextResponse.json({ success: false, message: "Unable to submit your request right now. Please email me directly." }, { status: 500 });
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
    const w3res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    const w3data = await w3res.json() as { success: boolean };

    if (!w3res.ok || !w3data.success) {
      console.error("[contact/api] Web3Forms error:", w3data);
      return NextResponse.json({ success: false, message: "Unable to submit your request right now. Please email me directly." }, { status: 502 });
    }

    return NextResponse.json({ success: true, message: "Thank you! Your project request has been received. I'll get back to you soon." });
  } catch (err) {
    console.error("[contact/api] Web3Forms network error:", err);
    return NextResponse.json({ success: false, message: "Unable to submit your request right now. Please email me directly." }, { status: 502 });
  }
}
