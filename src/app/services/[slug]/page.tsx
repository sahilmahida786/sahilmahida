import { notFound } from "next/navigation";
import { Metadata } from "next";
import { services } from "@/data/services";
import { createMetadata } from "@/lib/seo";
import { personal } from "@/data/personal";
import Script from "next/script";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ArrowUpRight } from "lucide-react";

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return {};
  }

  const titleMap: Record<string, string> = {
    "websites": `Web Development Services in Rajkot | ${personal.name}`,
    "software": `Custom Software Development in Rajkot | ${personal.name}`,
    "automation": `Business Automation & Web Scraping | ${personal.name}`,
    "ai": `AI Development Services in Gujarat | ${personal.name}`,
    "digital-launch": `Digital Solutions & Setup | ${personal.name}`,
  };

  const title = titleMap[slug] || `${service.title} Services in Rajkot | ${personal.name}`;

  return createMetadata({
    title,
    description: `Professional ${service.title.toLowerCase()} services by ${personal.name} in Rajkot, Gujarat. ${service.description}. Get custom digital solutions today.`,
    alternates: {
      canonical: `/services/${slug}`,
    },
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    provider: {
      "@type": "LocalBusiness",
      name: `${personal.name} | Software Developer & Digital Solutions Provider`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Rajkot",
        addressRegion: "Gujarat",
        addressCountry: "IN",
      },
    },
    description: service.description,
    areaServed: ["Rajkot", "Gujarat", "India"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} Offerings`,
      itemListElement: service.items.map((item, index) => ({
        "@type": "OfferCatalog",
        position: index + 1,
        name: item.name,
        description: item.description,
      })),
    },
  };

  return (
    <>
      <Script
        id={`service-schema-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="min-h-screen pt-32 pb-24 px-[var(--spacing-container)]">
        <div className="mx-auto max-w-[800px]">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 text-label text-subtle hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to Services
          </Link>

          <header className="mb-16">
            <h1 className="text-h1 font-bold text-foreground mb-4">
              {service.title} <span className="text-accent">Services</span>
            </h1>
            <p className="text-body-lg text-muted">
              {service.description}
            </p>
          </header>

          <section className="mb-16">
            <h2 className="text-h2 font-semibold text-foreground mb-8">What I Offer</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {service.items.map((item, index) => (
                <div
                  key={index}
                  className="p-6 rounded-[var(--radius-lg)] bg-surface border border-border/50"
                >
                  <CheckCircle2 size={24} className="text-accent mb-4" />
                  <h3 className="text-h3 font-medium text-foreground mb-2">{item.name}</h3>
                  <p className="text-body-sm text-subtle">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-br from-[#05070B] to-[hsl(225,25%,4%)] border border-border/50 p-8 rounded-[var(--radius-lg)] text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-h2 font-bold text-foreground mb-4">Ready to start your project?</h2>
              <p className="text-body text-muted mb-8 max-w-lg mx-auto">
                I help businesses in Rajkot and worldwide build scalable, high-performance digital solutions.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-accent text-white font-medium hover:bg-accent-hover transition-colors shadow-lg shadow-accent/20"
              >
                Get a Quote
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
