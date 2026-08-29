import { createMetadata } from "@/lib/seo";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sahilmahida.in";

export const metadata = createMetadata({
  title: "Terms & Conditions | SAHIL.OS — Sahil Mahida",
  description:
    "Terms & Conditions for engaging Sahil Mahida (SAHIL.OS) for software development, web development, SEO, and digital services.",
  alternates: {
    canonical: `${BASE_URL}/terms`,
  },
  openGraph: {
    title: "Terms & Conditions | SAHIL.OS — Sahil Mahida",
    description:
      "Terms & Conditions for engaging Sahil Mahida (SAHIL.OS) for software development, web development, SEO, and digital services.",
    url: `${BASE_URL}/terms`,
  },
});

const sections = [
  { id: "acceptance", label: "1. Acceptance of Terms" },
  { id: "website-usage", label: "2. Website Usage" },
  { id: "services", label: "3. Services" },
  { id: "project-scope", label: "4. Project Scope" },
  { id: "payments", label: "5. Pricing & Payments" },
  { id: "revisions-changes", label: "6. Project Changes & Revisions" },
  { id: "intellectual-property", label: "7. Intellectual Property" },
  { id: "client-content", label: "8. Client Content & Responsibilities" },
  { id: "third-party", label: "9. Third-Party Services" },
  { id: "hosting-domain", label: "10. Hosting & Domain" },
  { id: "seo-disclaimer", label: "11. SEO & Google Business Services" },
  { id: "liability", label: "12. Disclaimer & Limitation of Liability" },
  { id: "termination", label: "13. Termination" },
  { id: "governing-law", label: "14. Governing Law" },
  { id: "contact", label: "15. Contact" },
];

export default function TermsPage() {
  return (
    <article className="min-h-screen pt-32 pb-24 px-[var(--spacing-container)]">
      <div className="mx-auto max-w-[820px]">

        {/* Header */}
        <div className="mb-12 pb-10 border-b border-border/50">
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-4">Legal</p>
          <h1 className="text-h2 font-bold text-foreground mb-4">Terms &amp; Conditions</h1>
          <p className="text-body-sm text-subtle">
            Last updated: <time dateTime="2026-08-28">August 28, 2026</time>
          </p>
          <p className="text-body text-muted mt-6 leading-relaxed">
            These Terms &amp; Conditions govern the use of the website at{" "}
            <a href="https://sahilmahida.in" className="text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm">sahilmahida.in</a>{" "}
            and the engagement of services provided by{" "}
            <strong className="text-foreground">Sahil Mahida</strong> (&quot;SAHIL.OS&quot;, &quot;I&quot;, &quot;me&quot;, or &quot;my&quot;), a Software Developer &amp; Digital Solutions Provider based in Rajkot, Gujarat, India. Please read these terms carefully before using this website or engaging my services.
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

          <section id="acceptance" aria-labelledby="h-acceptance">
            <h2 id="h-acceptance" className="text-h3 font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
            <p className="text-body text-muted leading-relaxed">
              By accessing this website, submitting a contact enquiry, or engaging my services, you confirm that you have read, understood, and agree to be bound by these Terms &amp; Conditions and my{" "}
              <Link href="/privacy-policy" className="text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm">
                Privacy Policy
              </Link>. If you do not agree to these terms, please do not use this website or engage my services.
            </p>
          </section>

          <div className="border-t border-border/30" />

          <section id="website-usage" aria-labelledby="h-website">
            <h2 id="h-website" className="text-h3 font-semibold text-foreground mb-4">2. Website Usage</h2>
            <p className="text-body text-muted mb-4 leading-relaxed">
              This website is provided for informational and professional engagement purposes. You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others. You must not:
            </p>
            <ul className="list-disc list-inside flex flex-col gap-2 text-body text-muted ml-2">
              <li>Attempt to gain unauthorised access to any part of this website or its infrastructure</li>
              <li>Transmit harmful, offensive, or unlawful content through any website forms</li>
              <li>Use automated tools to scrape or collect data without permission</li>
              <li>Attempt to disrupt or degrade the performance of this website</li>
            </ul>
          </section>

          <div className="border-t border-border/30" />

          <section id="services" aria-labelledby="h-services">
            <h2 id="h-services" className="text-h3 font-semibold text-foreground mb-4">3. Services</h2>
            <p className="text-body text-muted mb-4 leading-relaxed">
              I offer professional digital services, which may include:
            </p>
            <ul className="list-disc list-inside flex flex-col gap-2 text-body text-muted mb-4 ml-2">
              <li>Website development</li>
              <li>Web application development</li>
              <li>Custom software development</li>
              <li>UI/UX development</li>
              <li>Technical SEO and on-page optimisation</li>
              <li>Local SEO and Google Business Profile optimisation</li>
              <li>Website performance optimisation</li>
              <li>Deployment, hosting, and domain assistance</li>
              <li>Custom digital solutions</li>
            </ul>
            <p className="text-body text-muted leading-relaxed">
              The specific scope of services for any engagement is defined in the agreed proposal, quotation, or service agreement. These Terms &amp; Conditions apply in conjunction with any such agreement.
            </p>
          </section>

          <div className="border-t border-border/30" />

          <section id="project-scope" aria-labelledby="h-scope">
            <h2 id="h-scope" className="text-h3 font-semibold text-foreground mb-4">4. Project Scope</h2>
            <p className="text-body text-muted mb-4 leading-relaxed">
              All project deliverables, timelines, features, and technical requirements will be defined in a written proposal or service agreement before work commences. Work that falls outside the agreed scope may be subject to additional charges and a separate agreement.
            </p>
            <p className="text-body text-muted leading-relaxed">
              Changes to project scope requested by the client after the agreement is signed will be assessed individually and may affect the timeline and cost. I will communicate any impact clearly before proceeding.
            </p>
          </section>

          <div className="border-t border-border/30" />

          <section id="payments" aria-labelledby="h-payments">
            <h2 id="h-payments" className="text-h3 font-semibold text-foreground mb-4">5. Pricing &amp; Payments</h2>
            <p className="text-body text-muted mb-4 leading-relaxed">
              All pricing is project-specific and will be communicated in a written proposal or invoice. The following general terms apply:
            </p>
            <ul className="list-disc list-inside flex flex-col gap-2 text-body text-muted mb-4 ml-2">
              <li>Payment schedules, including any advance or milestone payments, will be defined in the project proposal or invoice.</li>
              <li>Third-party costs such as domain registration, hosting, SaaS tools, API subscriptions, and stock assets are not included in my service fees unless explicitly stated.</li>
              <li>Applicable taxes (such as GST) may be added to invoices as required by Indian law.</li>
              <li>Delayed payment may result in project suspension until outstanding balances are settled.</li>
            </ul>
            <h3 className="text-base font-semibold text-foreground/90 mb-3 mt-4">Refunds &amp; Cancellations</h3>
            <p className="text-body text-muted leading-relaxed">
              Refund and cancellation terms depend on the project stage, work already completed, and the terms set out in the agreed proposal or contract. Any advance payments made for work already delivered or commenced may not be refundable. Third-party costs (such as domain or hosting fees) are non-refundable once incurred. Refund requests will be assessed fairly on a case-by-case basis.
            </p>
          </section>

          <div className="border-t border-border/30" />

          <section id="revisions-changes" aria-labelledby="h-revisions">
            <h2 id="h-revisions" className="text-h3 font-semibold text-foreground mb-4">6. Project Changes &amp; Revisions</h2>
            <p className="text-body text-muted leading-relaxed">
              The number of included revisions, if any, will be specified in the project proposal. Revisions beyond the agreed scope, or changes that substantially alter the original brief, may be charged at an agreed hourly or project rate. Revision requests should be communicated clearly and in writing.
            </p>
          </section>

          <div className="border-t border-border/30" />

          <section id="intellectual-property" aria-labelledby="h-ip">
            <h2 id="h-ip" className="text-h3 font-semibold text-foreground mb-4">7. Intellectual Property</h2>
            <h3 className="text-base font-semibold text-foreground/90 mb-3">Client-provided content</h3>
            <p className="text-body text-muted mb-4 leading-relaxed">
              Logos, text, images, trademarks, and other business materials you provide remain your intellectual property. By providing such materials, you confirm that you have the legal right to use and share them for the purposes of the project.
            </p>
            <h3 className="text-base font-semibold text-foreground/90 mb-3">Project deliverables</h3>
            <p className="text-body text-muted mb-4 leading-relaxed">
              Ownership of final project deliverables will be transferred to you upon receipt of full and final payment, unless otherwise specified in the project agreement.
            </p>
            <h3 className="text-base font-semibold text-foreground/90 mb-3">Developer materials</h3>
            <p className="text-body text-muted mb-4 leading-relaxed">
              Reusable code libraries, frameworks, templates, utilities, and pre-existing components developed or used by me remain subject to their original ownership and licensing, unless a specific transfer is agreed and documented in writing.
            </p>
            <h3 className="text-base font-semibold text-foreground/90 mb-3">Third-party &amp; open-source software</h3>
            <p className="text-body text-muted leading-relaxed">
              Projects may incorporate third-party libraries, open-source packages, and frameworks. Such software is subject to its respective licences, which remain unaffected by this agreement.
            </p>
          </section>

          <div className="border-t border-border/30" />

          <section id="client-content" aria-labelledby="h-client">
            <h2 id="h-client" className="text-h3 font-semibold text-foreground mb-4">8. Client Content &amp; Responsibilities</h2>
            <p className="text-body text-muted mb-4 leading-relaxed">
              Clients are responsible for:
            </p>
            <ul className="list-disc list-inside flex flex-col gap-2 text-body text-muted mb-4 ml-2">
              <li>Providing accurate, complete, and timely project information and content</li>
              <li>Supplying necessary credentials, access, and materials required for the project</li>
              <li>Confirming that all provided content is legally owned or licensed by the client</li>
              <li>Providing timely feedback and approvals to avoid project delays</li>
            </ul>
            <p className="text-body text-muted leading-relaxed">
              Clients must not request the development of websites, software, or digital solutions that are illegal, fraudulent, harmful, discriminatory, or that infringe third-party rights. I reserve the right to decline or terminate any engagement that violates these conditions.
            </p>
          </section>

          <div className="border-t border-border/30" />

          <section id="third-party" aria-labelledby="h-third-party">
            <h2 id="h-third-party" className="text-h3 font-semibold text-foreground mb-4">9. Third-Party Services</h2>
            <p className="text-body text-muted leading-relaxed">
              Projects may involve integration with or use of third-party platforms, APIs, plugins, and services. These are subject to their own terms of service and pricing. I am not responsible for the availability, reliability, pricing changes, or policy changes of third-party services. Any third-party costs are the responsibility of the client unless explicitly included in the agreed project price.
            </p>
          </section>

          <div className="border-t border-border/30" />

          <section id="hosting-domain" aria-labelledby="h-hosting">
            <h2 id="h-hosting" className="text-h3 font-semibold text-foreground mb-4">10. Hosting &amp; Domain</h2>
            <p className="text-body text-muted leading-relaxed">
              Domain registration, web hosting, CDN, business email, and related infrastructure services are provided by independent third-party companies. Their availability, performance, pricing, and policies are outside my direct control. I may assist with the setup, configuration, or management of such services on your behalf, but I cannot guarantee their uninterrupted availability or accept liability for downtime or data loss caused by third-party hosting or infrastructure providers.
            </p>
          </section>

          <div className="border-t border-border/30" />

          <section id="seo-disclaimer" aria-labelledby="h-seo">
            <h2 id="h-seo" className="text-h3 font-semibold text-foreground mb-4">11. SEO &amp; Google Business Services</h2>
            <p className="text-body text-muted mb-4 leading-relaxed">
              I provide SEO, Local SEO, and Google Business Profile (GBP) optimisation services. While I apply best practices and work diligently to improve your digital presence, the following should be clearly understood:
            </p>
            <ul className="list-disc list-inside flex flex-col gap-2 text-body text-muted mb-4 ml-2">
              <li>No specific Google ranking, Maps position, or placement can be guaranteed.</li>
              <li>Search rankings depend on search engine algorithms, competition, website quality, and many external factors that are outside my control.</li>
              <li>Google controls its own platform, policies, listing approval processes, and ranking systems. Changes to Google&apos;s algorithms or policies may affect results.</li>
              <li>No guarantee of specific traffic volume, leads, or conversion rates is made.</li>
              <li>Permanent or sustained rankings cannot be guaranteed.</li>
            </ul>
            <p className="text-body text-muted leading-relaxed">
              SEO is an ongoing process. Results may take time to become visible and are subject to continuous changes in the digital landscape.
            </p>
          </section>

          <div className="border-t border-border/30" />

          <section id="liability" aria-labelledby="h-liability">
            <h2 id="h-liability" className="text-h3 font-semibold text-foreground mb-4">12. Disclaimer &amp; Limitation of Liability</h2>
            <p className="text-body text-muted mb-4 leading-relaxed">
              This website and all information on it are provided &quot;as is&quot; without warranty of any kind. To the maximum extent permitted by applicable law, I shall not be liable for:
            </p>
            <ul className="list-disc list-inside flex flex-col gap-2 text-body text-muted mb-4 ml-2">
              <li>Indirect, incidental, consequential, or punitive damages arising from use of this website or my services</li>
              <li>Loss of data, revenue, profit, or business opportunity</li>
              <li>Third-party service outages, failures, or pricing changes</li>
              <li>Search engine algorithm changes affecting rankings or traffic</li>
              <li>Hosting failures or domain disruptions outside of reasonable control</li>
              <li>Damages arising from client-provided content</li>
              <li>Misuse or unintended use of delivered software or websites</li>
              <li>Third-party API deprecations or changes</li>
            </ul>
            <p className="text-body text-muted leading-relaxed">
              My total liability, where applicable, shall not exceed the total fees paid by the client for the specific service giving rise to the claim. Nothing in these terms limits liability for fraud, gross negligence, or any liability that cannot be excluded by applicable Indian law.
            </p>
          </section>

          <div className="border-t border-border/30" />

          <section id="termination" aria-labelledby="h-termination">
            <h2 id="h-termination" className="text-h3 font-semibold text-foreground mb-4">13. Termination</h2>
            <p className="text-body text-muted leading-relaxed">
              Either party may terminate a project engagement by providing written notice. Upon termination, the client is responsible for payment of all work completed to the date of termination, as well as any third-party costs already incurred. I reserve the right to immediately terminate any engagement where the client violates these terms, engages in unlawful conduct, or fails to meet agreed payment obligations.
            </p>
          </section>

          <div className="border-t border-border/30" />

          <section id="governing-law" aria-labelledby="h-law">
            <h2 id="h-law" className="text-h3 font-semibold text-foreground mb-4">14. Governing Law</h2>
            <p className="text-body text-muted leading-relaxed">
              These Terms &amp; Conditions are governed by and construed in accordance with the laws of India. Any disputes arising from these terms or from the engagement of my services shall be subject to the jurisdiction of the appropriate courts in Rajkot, Gujarat, India, unless otherwise agreed in writing.
            </p>
          </section>

          <div className="border-t border-border/30" />

          <section id="contact" aria-labelledby="h-terms-contact">
            <h2 id="h-terms-contact" className="text-h3 font-semibold text-foreground mb-4">15. Contact</h2>
            <p className="text-body text-muted mb-6 leading-relaxed">
              For any questions, clarifications, or concerns about these Terms &amp; Conditions, please contact me directly:
            </p>
            <address className="not-italic p-6 rounded-xl bg-surface-elevated border border-border/50 flex flex-col gap-3">
              <p className="text-foreground font-semibold">Sahil Mahida</p>
              <p className="text-muted text-body-sm">Software Developer & Digital Solutions Provider</p>
              <p className="text-muted text-body-sm">Rajkot, Gujarat, India</p>
              <a
                href="mailto:sahilmahida.dev@gmail.com"
                className="text-accent hover:underline text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              >
                sahilmahida.dev@gmail.com
              </a>
            </address>
          </section>

          <div className="border-t border-border/30" />

          {/* Footer nav */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between text-body-sm text-subtle pt-2">
            <p>© 2026 Sahil Mahida. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy-policy" className="text-subtle hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm">
                Privacy Policy
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
