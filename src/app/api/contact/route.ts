import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

const verifySchema = z.object({
  turnstileToken: z.string().min(1),
});

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request." },
      { status: 400 }
    );
  }

  const parsed = verifySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: "Human verification token missing." },
      { status: 422 }
    );
  }

  const { turnstileToken } = parsed.data;

  // ── Server-side Turnstile verification ─────────────────────────────────
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    console.error("[CONTACT API] TURNSTILE_SECRET_KEY is not set in environment");
    return NextResponse.json(
      { success: false, message: "Server config error: TURNSTILE_SECRET_KEY is missing in Vercel." },
      { status: 500 }
    );
  }

  try {
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
    };

    if (!verifyData.success) {
      console.warn("[CONTACT API] Turnstile verification failed. Error codes:", verifyData["error-codes"]);
      return NextResponse.json(
        { success: false, message: "Human verification failed. Please refresh and try again." },
        { status: 403 }
      );
    }

    const allowedHostnames = ["sahilmahida.vercel.app", "localhost"];
    if (verifyData.hostname && !allowedHostnames.includes(verifyData.hostname)) {
      console.warn("[CONTACT API] Turnstile hostname mismatch. Got:", verifyData.hostname);
      return NextResponse.json(
        { success: false, message: "Invalid host origin." },
        { status: 403 }
      );
    }

    // Success! Verification passed.
    // We return success so the frontend browser can submit to Web3Forms directly.
    return NextResponse.json({ success: true, message: "Human verified." });
  } catch (err) {
    console.error("[CONTACT API] Turnstile network/fetch error:", err);
    return NextResponse.json(
      { success: false, message: "Unable to verify your request due to a network error." },
      { status: 502 }
    );
  }
}
