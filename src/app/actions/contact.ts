"use server";

import * as React from "react";
import { z } from "zod";
import { Resend } from "resend";
import { AdminNotification } from "@/emails/AdminNotification";
import { CustomerConfirmation } from "@/emails/CustomerConfirmation";

// Environment variables — read server-side only.
// RESEND_API_KEY, CONTACT_EMAIL, FROM_EMAIL are never exposed to the client.
const resendApiKey = process.env.RESEND_API_KEY;
const contactEmail = process.env.CONTACT_EMAIL || "sahilmahida786@gmail.com";
const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";

// Initialize Resend conditionally to avoid build-time crashes when env var is absent.
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Zod schema — field names must match the form's name attributes exactly.
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().email("Invalid email address"),
  projectType: z.string().min(1, "Please select a project type"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(3000, "Message is too long (max 3000 chars)"),
  // Honeypot — must be empty; bots typically fill hidden fields.
  company_website: z.string().max(0, "Invalid submission"),
});

export type ContactState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function submitContactForm(
  prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  try {
    // 1. Extract raw form data
    const rawData = {
      name: (formData.get("name") as string) ?? "",
      email: (formData.get("email") as string) ?? "",
      projectType: (formData.get("projectType") as string) ?? "",
      message: (formData.get("message") as string) ?? "",
      company_website: (formData.get("company_website") as string) ?? "",
    };

    // 2. Server-side validation via Zod
    const validatedFields = contactSchema.safeParse(rawData);

    if (!validatedFields.success) {
      // Honeypot triggered — silently pretend success to confuse bots.
      if (validatedFields.error.flatten().fieldErrors.company_website) {
        console.warn("[contact] Honeypot triggered — dropping submission.");
        return { success: true, message: "Project inquiry received." };
      }

      console.warn("[contact] Validation failed:", validatedFields.error.flatten().fieldErrors);
      return {
        success: false,
        message: "Please correct the errors in the form.",
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { name, email, projectType, message } = validatedFields.data;

    // 3. Guard: Resend not initialized (missing API key)
    if (!resend) {
      console.error("[contact] RESEND_API_KEY is not set — cannot send email.");
      return {
        success: false,
        message: "Server configuration error. Please contact me directly via email.",
      };
    }

    const timestamp = new Date().toISOString();
    const sourceUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sahilmahida.in";

    // 4. Send admin notification email
    const { data: adminData, error: adminError } = await resend.emails.send({
      from: `SAHIL.OS <${fromEmail}>`,
      to: [contactEmail],
      replyTo: email,
      subject: `🔥 NEW PROJECT INQUIRY — ${projectType} — ${name}`,
      react: React.createElement(AdminNotification, {
        name,
        email,
        projectType,
        message,
        timestamp,
        sourceUrl,
      }),
    });

    if (adminError) {
      // Log the Resend error code/message without exposing to the client.
      console.error("[contact] Resend admin email error:", {
        name: adminError.name,
        message: adminError.message,
        fromEmail,
        toEmail: contactEmail,
      });
      return {
        success: false,
        message: "Unable to submit your request right now. Please try again or contact me directly at sahilmahida786@gmail.com",
      };
    }

    console.log("[contact] Admin notification sent. ID:", adminData?.id);

    // 5. Send customer confirmation (non-blocking — failure doesn't affect the user's submission)
    const { error: customerError } = await resend.emails.send({
      from: `Sahil Mahida <${fromEmail}>`,
      to: [email],
      subject: "✅ Project inquiry received — SAHIL.OS",
      react: React.createElement(CustomerConfirmation, {
        name,
        projectType,
        message,
      }),
    });

    if (customerError) {
      console.error("[contact] Resend customer confirmation error:", {
        name: customerError.name,
        message: customerError.message,
      });
      // Do not fail the submission — the admin email succeeded.
    }

    // 6. Success
    return {
      success: true,
      message: "Your project inquiry has been successfully submitted.",
    };
  } catch (error) {
    // Catch-all — log a safe representation of the error without PII.
    const safeMessage = error instanceof Error ? error.message : String(error);
    console.error("[contact] Unexpected error in submitContactForm:", safeMessage);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later or email me directly.",
    };
  }
}
