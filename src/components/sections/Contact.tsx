"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { Send } from "lucide-react";
import { z } from "zod";

const projectTypes = [
  { value: "website", label: "Website" },
  { value: "web-app", label: "Web Application" },
  { value: "automation", label: "Automation / Scraping" },
  { value: "ai", label: "AI Solution" },
  { value: "other", label: "Other" },
];

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().email("Invalid email address"),
  projectType: z.string().min(1, "Please select a project type"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(3000, "Message is too long (max 3000 chars)"),
  company_website: z.string().max(0, "Invalid submission"),
});

export default function Contact() {
  const [isPending, setIsPending] = useState(false);
  const [state, setState] = useState<{
    success: boolean;
    message: string;
    errors?: Record<string, string[]>;
  }>({
    success: false,
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setState({ success: false, message: "", errors: {} });

    const formData = new FormData(e.currentTarget);
    const rawData = {
      name: (formData.get("name") as string) ?? "",
      email: (formData.get("email") as string) ?? "",
      projectType: (formData.get("projectType") as string) ?? "",
      message: (formData.get("message") as string) ?? "",
      company_website: (formData.get("company_website") as string) ?? "",
    };

    // Client-side Zod Validation
    const validatedFields = contactSchema.safeParse(rawData);

    if (!validatedFields.success) {
      if (validatedFields.error.flatten().fieldErrors.company_website) {
        setState({ success: true, message: "Thank you! Your project request has been received. I'll get back to you soon." });
        setIsPending(false);
        return;
      }

      setState({
        success: false,
        message: "Please correct the errors in the form.",
        errors: validatedFields.error.flatten().fieldErrors,
      });
      setIsPending(false);
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    
    if (!accessKey) {
      console.error("[contact] NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is not set.");
      setState({
        success: false,
        message: "Unable to submit your request right now. Please try again or email me directly.",
      });
      setIsPending(false);
      return;
    }

    const payload = {
      access_key: accessKey,
      subject: "New Project Inquiry — Sahil Mahida Portfolio",
      from_name: "SAHIL.OS Portfolio",
      replyto: rawData.email,
      name: rawData.name,
      email: rawData.email,
      "Project Type": rawData.projectType,
      message: rawData.message,
    };

    try {
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
        setState({
          success: false,
          message: "Unable to submit your request right now. Please try again or email me directly.",
        });
      } else {
        setState({
          success: true,
          message: "Thank you! Your project request has been received. I'll get back to you soon.",
        });
      }
    } catch (error) {
      console.error("[contact] Network error in submitContactForm:", error);
      setState({
        success: false,
        message: "Unable to submit your request right now. Please try again or email me directly.",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section
      id="contact"
      className="section-glow-contact relative py-section bg-gradient-to-b from-surface-elevated via-[hsl(225,14%,9.5%)] to-surface-elevated border-t border-border"
      aria-labelledby="contact-heading"
    >
      <Container>
        <RevealOnScroll>
          <SectionHeader
            eyebrow="05 / Contact"
            title="Start a Project"
            description="Have an idea? Let's turn it into a digital product."
          />
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <div className="grid gap-[var(--spacing-gap-lg)] lg:grid-cols-5 mt-8 lg:mt-12">
            {/* Form */}
            <form
              className="lg:col-span-3 space-y-6"
              onSubmit={handleSubmit}
            >
              {/* Honeypot field - visually hidden to catch bots */}
              <div aria-hidden="true" className="hidden opacity-0 absolute pointer-events-none -left-[9999px]">
                <label htmlFor="company_website">Website</label>
                <input type="text" id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
              </div>

              {state.success ? (
                <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-6 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <span className="text-emerald-500 text-xl">✓</span>
                  </div>
                  <h3 className="text-h3 font-bold text-emerald-400">PROJECT REQUEST RECEIVED</h3>
                  <p className="text-body text-emerald-200/80">{state.message}</p>
                </div>
              ) : (
                <>
                  {state.message && !state.success && (
                    <div className="rounded-[var(--radius-md)] bg-red-500/10 border border-red-500/20 p-4 text-body-sm text-red-400">
                      {state.message}
                    </div>
                  )}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-1">
                      <Input
                        label="Name"
                        name="name"
                        placeholder="Your name"
                        required
                        disabled={isPending}
                        aria-invalid={!!state.errors?.name}
                      />
                      {state.errors?.name && <p className="text-caption text-red-400">{state.errors.name[0]}</p>}
                    </div>
                    <div className="space-y-1">
                      <Input
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        required
                        disabled={isPending}
                        aria-invalid={!!state.errors?.email}
                      />
                      {state.errors?.email && <p className="text-caption text-red-400">{state.errors.email[0]}</p>}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Select
                      label="Project type"
                      name="projectType"
                      options={projectTypes}
                      defaultValue=""
                      required
                      disabled={isPending}
                      aria-invalid={!!state.errors?.projectType}
                    />
                    {state.errors?.projectType && <p className="text-caption text-red-400">{state.errors.projectType[0]}</p>}
                  </div>

                  <div className="space-y-1">
                    <Textarea
                      label="Message"
                      name="message"
                      placeholder="Tell me about your project..."
                      required
                      disabled={isPending}
                      aria-invalid={!!state.errors?.message}
                    />
                    {state.errors?.message && <p className="text-caption text-red-400">{state.errors.message[0]}</p>}
                  </div>

                  <Button type="submit" size="lg" className="w-full sm:w-auto group" disabled={isPending}>
                    {isPending ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                        Sending inquiry...
                      </span>
                    ) : (
                      <>
                        <Send size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                        Start a Project
                      </>
                    )}
                  </Button>
                </>
              )}
            </form>

            {/* Info sidebar */}
            <div className="lg:col-span-2 flex flex-col gap-10 lg:pl-[var(--spacing-gap-lg)]">
              <div>
                <p className="text-label text-accent mb-2 uppercase tracking-widest">Availability</p>
                <p className="text-body-sm text-muted">
                  Open to freelance projects and full-time opportunities.
                </p>
              </div>

              <div>
                <p className="text-label text-accent mb-2 uppercase tracking-widest">Response time</p>
                <p className="text-body-sm text-muted">
                  Usually within 24 hours.
                </p>
              </div>

              <div>
                <p className="text-label text-accent mb-3 uppercase tracking-widest">Services</p>
                <ul className="space-y-2">
                  {["Websites", "Web Applications", "Automation", "AI Solutions", "Digital Launch"].map((s) => (
                    <li key={s} className="text-body-sm text-muted flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent/60 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
