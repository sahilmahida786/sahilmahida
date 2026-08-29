"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigation } from "@/data/navigation";

/**
 * Premium navigation with:
 * - Backdrop blur on scroll
 * - Scroll-aware border
 * - Mobile menu with focus trapping, ESC close, body scroll lock
 * - Keyboard accessible
 * - "Hire Me" CTA
 */
export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Scroll detection for backdrop
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  // ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  // Focus trap inside mobile menu
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const menu = menuRef.current;
    const focusable = menu.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    menu.addEventListener("keydown", trap);
    first.focus();
    return () => menu.removeEventListener("keydown", trap);
  }, [isOpen]);

  const close = useCallback(() => setIsOpen(false), []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50",
        "transition-all duration-[var(--duration-base)] ease-[var(--ease-out)]",
        isScrolled
          ? "bg-[hsl(225,25%,4%)]/85 backdrop-blur-xl border-b border-border/60 shadow-[0_1px_0_rgba(59,130,246,0.03)]"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[var(--container-max)] items-center justify-between px-[var(--spacing-container)]">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent block transition-transform duration-200 ease-out hover:scale-105 active:scale-95 motion-reduce:transition-none motion-reduce:hover:scale-100"
          aria-label="Sahil Mahida home"
        >
          <div className="relative h-10 w-40 md:h-11 md:w-48">
            <Image
              src="/images/logo/sahil-mahida-logo.webp"
              alt="Sahil Mahida"
              fill
              className="object-contain object-left"
              sizes="(max-width: 768px) 160px, 192px"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navigation.map((link) => (
            <Link
              key={link.section}
              href={link.href}
              className={cn(
                "group relative px-3.5 py-2 rounded-[var(--radius-sm)]",
                "text-body-sm text-muted font-medium",
                "transition-colors duration-200 ease-out",
                "hover:text-foreground",
                // Subtle blue indicator
                "after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-[3px] after:w-[3px] after:bg-accent after:rounded-full after:opacity-0 after:transition-all after:duration-300 after:ease-out",
                "hover:after:w-4 hover:after:opacity-100 hover:bg-surface/30"
              )}
            >
              {link.label}
            </Link>
          ))}

          {/* CTA */}
          <Link
            href="/#contact"
            className={cn(
              "ml-4 inline-flex items-center gap-1.5",
              "h-9 px-4 rounded-[var(--radius-md)]",
              "bg-accent text-white text-body-sm font-medium",
              "transition-all duration-[var(--duration-fast)]",
              "hover:bg-accent-hover"
            )}
          >
            Hire Me
            <ArrowUpRight size={14} />
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          ref={toggleRef}
          className={cn(
            "relative inline-flex items-center justify-center",
            "h-12 w-12 rounded-[var(--radius-md)] md:hidden",
            "bg-surface/50 border border-border/50",
            "text-foreground",
            "transition-all duration-[250ms] ease-out",
            "hover:bg-surface hover:border-border active:scale-95",
            // Extremely subtle blue glow on hover
            "hover:shadow-[0_0_12px_rgba(59,130,246,0.08)]"
          )}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <div className="relative w-[20px] h-[14px]">
            <span
              className={cn(
                "absolute left-0 w-full h-[1.5px] bg-current rounded-full transition-all duration-300 ease-out origin-center",
                isOpen ? "top-[6px] rotate-45" : "top-0"
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-[6px] w-full h-[1.5px] bg-current rounded-full transition-all duration-300 ease-out",
                isOpen ? "opacity-0 scale-x-0" : "opacity-100"
              )}
            />
            <span
              className={cn(
                "absolute left-0 w-full h-[1.5px] bg-current rounded-full transition-all duration-300 ease-out origin-center",
                isOpen ? "top-[6px] -rotate-45" : "top-[12px]"
              )}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          id="mobile-nav"
          className="fixed inset-0 top-16 z-[60] md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
            style={{ animation: "mobileMenuFadeIn 200ms ease-out forwards" }}
            onClick={close}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <div
            ref={menuRef}
            className="absolute inset-x-0 top-0 overflow-y-auto pb-8 border-b border-border/50 shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
            style={{
              animation: "mobileMenuSlideDown 250ms ease-out forwards",
              background: "radial-gradient(100% 100% at 50% 0%, hsla(215,60%,40%,0.06), transparent 80%), linear-gradient(to bottom, #05070B, hsl(225,25%,4%))"
            }}
          >
            <style>{`
              @keyframes mobileMenuFadeIn {
                from { opacity: 0; }
                to   { opacity: 1; }
              }
              @keyframes mobileMenuSlideDown {
                from { opacity: 0; transform: translateY(-8px); }
                to   { opacity: 1; transform: translateY(0); }
              }
              @keyframes mobileNavItem {
                from { opacity: 0; transform: translateY(6px); }
                to   { opacity: 1; transform: translateY(0); }
              }
            `}</style>

            <nav className="flex h-full flex-col px-[var(--spacing-container)] pt-6" aria-label="Mobile navigation">
              <ul className="flex flex-col" role="list">
                {navigation.map((link, i) => (
                  <li
                    key={link.section}
                    style={{
                      animation: `mobileNavItem 280ms ease-out forwards`,
                      animationDelay: `${60 + i * 45}ms`,
                      opacity: 0,
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={close}
                      className={cn(
                        "group flex items-center justify-between",
                        "py-5 border-b border-border/30",
                        "text-h3 text-foreground/80 font-medium",
                        "transition-colors duration-150",
                        "hover:text-foreground active:opacity-70"
                      )}
                    >
                      <span className="flex items-center gap-4">
                        <span className="text-label text-accent/60 font-mono tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{link.label}</span>
                      </span>
                      <ArrowUpRight size={18} className="text-subtle/50 group-hover:text-accent transition-colors shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Mobile CTA */}
              <div
                className="mt-8 pb-4"
                style={{
                  animation: "mobileNavItem 280ms ease-out forwards",
                  animationDelay: `${60 + navigation.length * 45}ms`,
                  opacity: 0,
                }}
              >
                <Link
                  href="/#contact"
                  onClick={close}
                  className={cn(
                    "flex items-center justify-center gap-2",
                    "h-14 w-full rounded-[var(--radius-lg)]",
                    "bg-gradient-to-br from-accent to-accent-hover",
                    "text-white text-body font-semibold",
                    "shadow-[0_4px_20px_rgba(59,130,246,0.2)]",
                    "active:scale-[0.98] transition-all duration-150"
                  )}
                >
                  Hire Me
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}


    </header>
  );
}
