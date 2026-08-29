"use server";

import { z } from "zod";
import { Resend } from "resend";
import { AdminNotification } from "@/emails/AdminNotification";
import { CustomerConfirmation } from "@/emails/CustomerConfirmation";

// Ensure environment variables are typed properly.
const resendApiKey = process.env.RESEND_API_KEY;
const contactEmail = process.env.CONTACT_EMAIL || "contact@sahilmahida.com"; // Fallback for types
const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev"; // Default Resend test email

// Initialize Resend conditionally to avoid build-time crashes if missing
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Zod Schema for robust server-side validation
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().email("Invalid email address"),
  projectType: z.string().min(1, "Please select a project type"),
  message: z.string().min(10, "Message must be at least 10 characters").max(3000, "Message is too long (max 3000 chars)"),
  // Honeypot field (should be empty)
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
    // 1. Extract and validate data
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      projectType: formData.get("projectType") as string,
      message: formData.get("message") as string,
      company_website: (formData.get("company_website") as string) || "", // Honeypot
    };

    const validatedFields = contactSchema.safeParse(rawData);

    if (!validatedFields.success) {
      // Check if it failed because of the honeypot
      if (validatedFields.error.flatten().fieldErrors.company_website) {
        // Silently drop it to confuse bots, pretend it succeeded
        console.warn("Spam detected via honeypot.");
        return {
          success: true,
          message: "Project inquiry received.",
        };
      }

      return {
        success: false,
        message: "Please correct the errors in the form.",
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { name, email, projectType, message } = validatedFields.data;

    // In a real production scenario, IP-based rate limiting via Headers would go here.
    // E.g., importing headers() from next/headers and checking redis/cache.

    if (!resend) {
      console.error("Missing RESEND_API_KEY environment variable");
      return {
        success: false,
        message: "Server configuration error. Please contact directly via email.",
      };
    }

    const timestamp = new Date().toISOString();
    const sourceUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sahilmahida.in";

    // 2. Send Admin Notification
    const { error: adminError } = await resend.emails.send({
      from: `SAHIL.OS <${fromEmail}>`,
      to: [contactEmail],
      replyTo: email,
      subject: `🔥 NEW PROJECT INQUIRY — ${projectType} — ${name}`,
      react: AdminNotification({
        name,
        email,
        projectType,
        message,
        timestamp,
        sourceUrl,
      }) as React.ReactElement,
    });

    if (adminError) {
      console.error("Resend Admin Email Error:", adminError);
      return {
        success: false,
        message: "Unable to submit your request right now. Please try again or contact me directly.",
      };
    }

    // 3. Send Customer Confirmation
    const { error: customerError } = await resend.emails.send({
      from: `Sahil Mahida <${fromEmail}>`,
      to: [email],
      subject: "✅ Project inquiry received — SAHIL.OS",
      react: CustomerConfirmation({
        name,
        projectType,
        message,
      }) as React.ReactElement,
    });

    if (customerError) {
      // We don't fail the entire submission if the auto-reply fails, 
      // but we log it for observability.
      console.error("Resend Customer Confirmation Email Error:", customerError);
    }

    // 4. Return Success
    return {
      success: true,
      message: "Your project inquiry has been successfully submitted.",
    };

  } catch (error) {
    console.error("Contact Form Action Error:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}
