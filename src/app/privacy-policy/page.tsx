import { createMetadata } from "@/lib/seo";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sahilmahida.in";

export const metadata = createMetadata({
  title: "Privacy Policy | SAHIL.OS — Sahil Mahida",
  description:
    "Privacy Policy for SAHIL.OS — Sahil Mahida, Software Developer & Digital Solutions Provider based in Rajkot, Gujarat, India.",
  alternates: {
    canonical: `${BASE_URL}/privacy-policy`,
  },
  openGraph: {
    title: "Privacy Policy | SAHIL.OS — Sahil Mahida",
    description:
      "Privacy Policy for SAHIL.OS — Sahil Mahida, Software Developer & Digital Solutions Provider based in Rajkot, Gujarat, India.",
    url: `${BASE_URL}/privacy-policy`,
  },
});

const sections = [
  { id: "information-we-collect", label: "1. Information We Collect" },
  { id: "how-we-use-information", label: "2. How We Use Information" },
  { id: "contact-communications", label: "3. Contact Forms & Communications" },
  { id: "cookies-analytics", label: "4. Cookies & Analytics" },
  { id: "third-party-services", label: "5. Third-Party Services" },
  { id: "data-storage-retention", label: "6. Data Storage & Retention" },
  { id: "data-security", label: "7. Data Security" },
  { id: "your-rights", label: "8. Your Privacy Rights" },
  { id: "policy-changes", label: "9. Changes to This Policy" },
  { id: "contact", label: "10. Contact & Privacy Requests" },
];

export default function PrivacyPolicyPage() {
  return (
    <article className="min-h-screen pt-32 pb-24 px-[var(--spacing-container)]">
      <div className="mx-auto max-w-[820px]">

        {/* Header */}
        <div className="mb-12 pb-10 border-b border-border/50">
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-4">Legal</p>
          <h1 className="text-h2 font-bold text-foreground mb-4">Privacy Policy</h1>
          <p className="text-body-sm text-subtle">
            Last updated: <time dateTime="2026-08-28">August 28, 2026</time>
          </p>
          <p className="text-body text-muted mt-6 leading-relaxed">
            This Privacy Policy explains how <strong className="text-foreground">Sahil Mahida</strong> (&quot;SAHIL.OS&quot;, &quot;I&quot;, &quot;me&quot;, or &quot;my&quot;) collects, uses, stores, and protects information when you visit my website at{" "}
            <a href="https://sahilmahida.in" className="text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm">sahilmahida.in</a>{" "}
            or engage with my services. By using this website or contacting me, you acknowledge this policy.
          </p>
        </div>

        {/* Table of Contents */}
        <nav aria-label="Table of contents" className="mb-12 p-6 rounded-xl bg-surface-elevated border border-border/50">
          <p className="text-sm font-semibold text-foreground mb-4 uppercase tracking-widest">Contents</p>
          <ol className="flex flex-col gap-2">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-body-sm text-subtle hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Sections */}
        <div className="flex flex-col gap-12">

          <section id="information-we-collect" aria-labelledby="h-information-we-collect">
            <h2 id="h-information-we-collect" className="text-h3 font-semibold text-foreground mb-4">1. Information We Collect</h2>
            <p className="text-body text-muted mb-4 leading-relaxed">
              I only collect information that you voluntarily provide or that is automatically generated when you use this website.
            </p>
            <h3 className="text-base font-semibold text-foreground/90 mb-3">Information you provide directly:</h3>
            <ul className="list-disc list-inside flex flex-col gap-2 text-body text-muted mb-4 ml-2">
              <li>Your name</li>
              <li>Email address</li>
              <li>Phone number (if provided)</li>
              <li>Project requirements or enquiry details</li>
              <li>Messages submitted through the contact form</li>
            </ul>
            <h3 className="text-base font-semibold text-foreground/90 mb-3">Technical information collected automatically:</h3>
            <ul className="list-disc list-inside flex flex-col gap-2 text-body text-muted ml-2">
              <li>Browser type and version</li>
              <li>Device type and operating system</li>
              <li>IP address and approximate location</li>
              <li>Pages visited and time spent on the website</li>
              <li>Referral source (how you arrived at the site)</li>
            </ul>
          </section>

          <div className="border-t border-border/30" />

          <section id="how-we-use-information" aria-labelledby="h-how-we-use">
            <h2 id="h-how-we-use" className="text-h3 font-semibold text-foreground mb-4">2. How We Use Information</h2>
            <p className="text-body text-muted mb-4 leading-relaxed">
              Information collected is used solely for legitimate business purposes:
            </p>
            <ul className="list-disc list-inside flex flex-col gap-2 text-body text-muted ml-2">
              <li>Responding to your enquiries and project requests</li>
              <li>Communicating about ongoing or proposed projects</li>
              <li>Delivering the services you have requested</li>
              <li>Sending relevant updates or follow-ups (only where you have engaged with me)</li>
              <li>Improving the website experience and performance</li>
              <li>Website security and fraud prevention</li>
              <li>Business administration and record-keeping</li>
            </ul>
            <p className="text-body text-muted mt-4 leading-relaxed">
              I do not sell, rent, or trade your personal information to any third party for their marketing purposes.
            </p>
          </section>

          <div className="border-t border-border/30" />

          <section id="contact-communications" aria-labelledby="h-contact-comms">
            <h2 id="h-contact-comms" className="text-h3 font-semibold text-foreground mb-4">3. Contact Forms & Communications</h2>
            <p className="text-body text-muted mb-4 leading-relaxed">
              When you submit the contact form on this website, your name, email address, phone number (if provided), and message are collected and transmitted to my business email. This information is used exclusively to respond to your enquiry and to follow up on your project requirements.
            </p>
            <p className="text-body text-muted leading-relaxed">
              I retain contact form submissions for a reasonable period to maintain a record of our communications and project history. You may request deletion of your contact data at any time by emailing me directly.
            </p>
          </section>

          <div className="border-t border-border/30" />

          <section id="cookies-analytics" aria-labelledby="h-cookies">
            <h2 id="h-cookies" className="text-h3 font-semibold text-foreground mb-4">4. Cookies & Analytics</h2>
            <p className="text-body text-muted mb-4 leading-relaxed">
              This website may use cookies and similar tracking technologies to understand how visitors use the site, improve performance, and analyse traffic patterns. These may include:
            </p>
            <ul className="list-disc list-inside flex flex-col gap-2 text-body text-muted mb-4 ml-2">
              <li><strong className="text-foreground/80">Essential cookies:</strong> Required for the website to function correctly.</li>
              <li><strong className="text-foreground/80">Analytics cookies:</strong> Used to understand website usage patterns (such as pages visited and time on site).</li>
            </ul>
            <p className="text-body text-muted leading-relaxed">
              Most browsers allow you to refuse or delete cookies through their settings. Disabling cookies may affect some functionality of this website but will not prevent you from using the contact form.
            </p>
          </section>

          <div className="border-t border-border/30" />

          <section id="third-party-services" aria-labelledby="h-third-party">
            <h2 id="h-third-party" className="text-h3 font-semibold text-foreground mb-4">5. Third-Party Services</h2>
            <p className="text-body text-muted mb-4 leading-relaxed">
              This website may utilise third-party services that have their own privacy policies, including:
            </p>
            <ul className="list-disc list-inside flex flex-col gap-2 text-body text-muted mb-4 ml-2">
              <li><strong className="text-foreground/80">Google Maps:</strong> An interactive map is embedded in the footer of this website. Google Maps is a service of Google LLC and is subject to{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Google&apos;s Privacy Policy</a>.
              </li>
              <li><strong className="text-foreground/80">Hosting providers:</strong> This website is hosted on a third-party infrastructure provider. Standard server logs may be collected by the host.</li>
              <li><strong className="text-foreground/80">Email delivery:</strong> Contact form submissions may be processed through a transactional email service.</li>
            </ul>
            <p className="text-body text-muted leading-relaxed">
              I am not responsible for the privacy practices of third-party services. I encourage you to review their respective privacy policies.
            </p>
          </section>

          <div className="border-t border-border/30" />

          <section id="data-storage-retention" aria-labelledby="h-data-storage">
            <h2 id="h-data-storage" className="text-h3 font-semibold text-foreground mb-4">6. Data Storage & Retention</h2>
            <p className="text-body text-muted mb-4 leading-relaxed">
              Personal information you submit is stored securely for as long as necessary to fulfil the purpose for which it was collected, or as required by applicable law. In general:
            </p>
            <ul className="list-disc list-inside flex flex-col gap-2 text-body text-muted mb-4 ml-2">
              <li>Contact enquiries are retained for the duration of our professional relationship and a reasonable period thereafter.</li>
              <li>Project-related data is retained as necessary for project delivery, support, and legal compliance.</li>
              <li>Technical logs may be retained by hosting providers per their own data-retention policies.</li>
            </ul>
            <p className="text-body text-muted leading-relaxed">
              Data that is no longer needed is deleted or anonymised in a reasonable and timely manner.
            </p>
          </section>

          <div className="border-t border-border/30" />

          <section id="data-security" aria-labelledby="h-security">
            <h2 id="h-security" className="text-h3 font-semibold text-foreground mb-4">7. Data Security</h2>
            <p className="text-body text-muted mb-4 leading-relaxed">
              I take reasonable technical and organisational measures to protect your personal information, including:
            </p>
            <ul className="list-disc list-inside flex flex-col gap-2 text-body text-muted mb-4 ml-2">
              <li>HTTPS encryption for all website traffic</li>
              <li>Secure hosting infrastructure with access controls</li>
              <li>Input validation to prevent injection attacks</li>
              <li>Regular software and dependency updates</li>
              <li>Restricted access to personal data on a need-to-know basis</li>
            </ul>
            <p className="text-body text-muted leading-relaxed">
              While I make every reasonable effort to protect your data, no method of transmission over the internet or electronic storage is completely secure. I cannot guarantee absolute security, and you submit information at your own risk.
            </p>
          </section>

          <div className="border-t border-border/30" />

          <section id="your-rights" aria-labelledby="h-rights">
            <h2 id="h-rights" className="text-h3 font-semibold text-foreground mb-4">8. Your Privacy Rights</h2>
            <p className="text-body text-muted mb-4 leading-relaxed">
              In accordance with applicable Indian law, including the Digital Personal Data Protection Act, 2023, you have the right to:
            </p>
            <ul className="list-disc list-inside flex flex-col gap-2 text-body text-muted mb-4 ml-2">
              <li>Request information about the personal data I hold about you</li>
              <li>Request correction of inaccurate or incomplete personal data</li>
              <li>Request deletion of your personal data, subject to applicable legal obligations</li>
              <li>Withdraw consent where processing is based on your consent</li>
              <li>Submit a grievance or privacy complaint</li>
            </ul>
            <p className="text-body text-muted leading-relaxed">
              To exercise any of these rights, please contact me at{" "}
              <a href="mailto:sahilmahida.dev@gmail.com" className="text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm">
                sahilmahida.dev@gmail.com
              </a>. I will respond to your request within a reasonable timeframe.
            </p>
          </section>

          <div className="border-t border-border/30" />

          <section id="policy-changes" aria-labelledby="h-changes">
            <h2 id="h-changes" className="text-h3 font-semibold text-foreground mb-4">9. Changes to This Policy</h2>
            <p className="text-body text-muted leading-relaxed">
              I may update this Privacy Policy from time to time to reflect changes in my practices, services, or applicable law. The updated policy will be published on this page with a revised &quot;Last updated&quot; date. I encourage you to review this page periodically. Your continued use of this website after any changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <div className="border-t border-border/30" />

          <section id="contact" aria-labelledby="h-contact">
            <h2 id="h-contact" className="text-h3 font-semibold text-foreground mb-4">10. Contact & Privacy Requests</h2>
            <p className="text-body text-muted mb-6 leading-relaxed">
              For any privacy-related questions, requests, or grievances, please contact me directly:
            </p>
            <address className="not-italic p-6 rounded-xl bg-surface-elevated border border-border/50 flex flex-col gap-3">
              <p className="text-foreground font-semibold">Sahil Mahida</p>
              <p className="text-muted text-body-sm">Software Developer & Digital Solutions Provider</p>
              <p className="text-muted text-body-sm">Rajkot, Gujarat, India</p>
              <a href="mailto:sahilmahida.dev@gmail.com" className="text-accent hover:underline text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm">
                sahilmahida.dev@gmail.com
              </a>
            </address>
          </section>

          <div className="border-t border-border/30" />

          {/* Footer nav */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between text-body-sm text-subtle pt-2">
            <p>© 2026 Sahil Mahida. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/terms" className="text-subtle hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm">
                Terms &amp; Conditions
              </Link>
              <Link href="/" className="text-subtle hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm">
                Back to Home
              </Link>
            </div>
          </div>

        </div>
      </div>
    </article>
  );
}
