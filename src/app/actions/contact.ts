"use server";

import { z } from "zod";

// Environment variables — read server-side only.
const web3formsAccessKey = process.env.WEB3FORMS_ACCESS_KEY;

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
        return { success: true, message: "Thank you! Your project request has been received. I'll get back to you soon." };
      }

      console.warn("[contact] Validation failed:", validatedFields.error.flatten().fieldErrors);
      return {
        success: false,
        message: "Please correct the errors in the form.",
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { name, email, projectType, message } = validatedFields.data;

    // 3. Guard: Web3Forms access key not set
    if (!web3formsAccessKey) {
      console.error("[contact] WEB3FORMS_ACCESS_KEY is not set.");
      return {
        success: false,
        message: "Server configuration error. Please contact me directly via email.",
      };
    }

    // 4. Send email via Web3Forms API
    const payload = {
      access_key: web3formsAccessKey,
      subject: "New Project Inquiry — Sahil Mahida Portfolio",
      from_name: "SAHIL.OS Portfolio",
      replyto: email,
      name,
      email,
      "Project Type": projectType, // Make it readable in the email
      message,
    };

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      console.error("[contact] Web3Forms API error:", result);
      return {
        success: false,
        message: "Unable to submit your request right now. Please try again or email me directly.",
      };
    }

    // 5. Success
    return {
      success: true,
      message: "Thank you! Your project request has been received. I'll get back to you soon.",
    };
  } catch (error) {
    // Catch-all — log a safe representation of the error without PII.
    const safeMessage = error instanceof Error ? error.message : String(error);
    console.error("[contact] Unexpected error in submitContactForm:", safeMessage);
    return {
      success: false,
      message: "Unable to submit your request right now. Please try again or email me directly.",
    };
  }
}
