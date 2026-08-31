import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Divider from "@/components/ui/Divider";
import { Phone, Mail, ArrowUpRight } from "lucide-react";
import { navigation } from "@/data/navigation";

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="pt-[var(--spacing-section-sm)]">
      <Divider variant="gradient" />

      <Container className="py-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">

          {/* Main Content Area */}
          <div className="max-w-md">
            <Link
              href="/"
              className="shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent inline-block transition-transform duration-200 ease-out hover:scale-105 active:scale-95 motion-reduce:transition-none motion-reduce:hover:scale-100 mb-6"
              aria-label="Sahil Mahida home"
            >
              <div className="relative h-12 w-48 md:h-14 md:w-56">
                <Image
                  src="/images/logo/sahil-mahida-logo.webp"
                  alt="Sahil Mahida Software Developer & Digital Solutions Provider portfolio logo"
                  fill
                  className="object-contain object-left"
                  sizes="(max-width: 768px) 192px, 224px"
                />
              </div>
            </Link>

            <h3 className="text-body font-bold text-foreground/90">
              Software Developer & Digital Solutions Provider
            </h3>
            <p className="mt-1 text-body-sm text-muted">
              Rajkot, Gujarat, India
            </p>

            <p className="mt-6 text-body-sm text-subtle leading-relaxed">
              I build digital products from code to launch.
            </p>

            {/* Contact Details */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-6">
              <a
                href="tel:+917984592173"
                className="flex items-center gap-2 text-body-sm text-muted hover:text-accent transition-colors duration-200"
              >
                <Phone size={16} />
                +91 79845 92173
              </a>
              <a
                href="mailto:sahilmahida.dev@gmail.com"
                className="flex items-center gap-2 text-body-sm text-muted hover:text-accent transition-colors duration-200"
              >
                <Mail size={16} />
                sahilmahida.dev@gmail.com
              </a>
            </div>

            {/* Social Icons */}
            <div className="mt-8 flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/sahil-mahida-115835317"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 -ml-2 text-subtle hover:text-foreground hover:bg-white/5 rounded-full transition-all duration-200"
                aria-label="LinkedIn"
              >
                <LinkedinIcon />
              </a>
              <a
                href="https://www.instagram.com/mahida_shahil_?igsi=ZmJ0aTF1dWZocDFn"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-subtle hover:text-foreground hover:bg-white/5 rounded-full transition-all duration-200"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Quick Links / Sitemap */}
          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16 pt-4 lg:pt-0">
            <div>
              <h4 className="text-body-sm font-bold text-foreground/90 mb-4 uppercase tracking-widest">Navigation</h4>
              <ul className="flex flex-col gap-3">
                {navigation.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-body-sm text-subtle hover:text-accent transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-body-sm font-bold text-foreground/90 mb-4 uppercase tracking-widest">Legal</h4>
              <ul className="flex flex-col gap-3">
                <li>
                  <Link href="/privacy-policy" className="text-body-sm text-subtle hover:text-accent transition-colors duration-200">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-body-sm text-subtle hover:text-accent transition-colors duration-200">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: Location (Spans 4 cols) */}
          <div className="lg:col-span-4 lg:pl-4 flex flex-col">
            <h4 className="text-accent text-sm font-bold tracking-widest uppercase mb-8">Location</h4>
            
            <div className="group relative w-full h-[280px] lg:h-[200px] rounded-xl overflow-hidden bg-surface-elevated border border-border/50 transition-colors hover:border-accent/30 shadow-sm">
              <iframe
                title="SAHIL MAHIDA location on Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.802344795908!2d70.80128017582294!3d22.300548543431666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959cb8b84a8682d%3A0xfb084b0f5aacfdb4!2sSAHIL%20MAHIDA!5e0!3m2!1sen!2sin!4v1714400000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full opacity-90 hover:opacity-100 transition-opacity duration-300"
              />
            </div>

            <a 
              href="https://maps.app.goo.gl/wcR25WFaq4ZJVftN9" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-5 flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover transition-colors group w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              aria-label="View SAHIL MAHIDA location on Google Maps (opens in new tab)"
            >
              View on Google Maps 
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform motion-reduce:transition-none" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <Divider variant="subtle" className="mt-16 mb-6" />
        <div className="flex items-center justify-center">
          <p className="text-caption text-subtle">
            © {currentYear} Sahil Mahida. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
