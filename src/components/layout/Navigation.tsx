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
          className="fixed inset-0 top-16 z-40 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px] animate-fade-in motion-reduce:animate-none"
            onClick={close}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <div
            ref={menuRef}
            className={cn(
              "absolute inset-x-0 top-0 overflow-y-auto pb-8",
              "bg-gradient-to-b from-[#05070B] to-[hsl(225,25%,4%)] border-b border-border/50",
              "shadow-[0_20px_40px_rgba(0,0,0,0.4)]",
              "animate-slide-down motion-reduce:animate-none"
            )}
            style={{
              backgroundImage: "radial-gradient(100% 100% at 50% 0%, hsla(215, 60%, 40%, 0.05), transparent 80%), linear-gradient(to bottom, #05070B, hsl(225,25%,4%))"
            }}
          >
            <nav className="flex h-full flex-col px-[var(--spacing-container)] pt-6">
              <ul className="flex flex-col gap-2" role="list">
                {navigation.map((link, i) => (
                  <li
                    key={link.section}
                    className="opacity-0 motion-reduce:opacity-100"
                    style={{
                      animation: "linkStagger 300ms ease-out forwards",
                      animationDelay: `${i * 40}ms`
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={close}
                      className={cn(
                        "group flex items-center justify-between",
                        "py-5 border-b border-border/30",
                        "text-h3 text-muted font-medium",
                        "transition-all duration-[var(--duration-fast)]",
                        "hover:text-foreground active:scale-[0.98]"
                      )}
                    >
                      <span className="flex items-center gap-4">
                        <span className="text-label text-subtle font-mono group-hover:text-accent/70 transition-colors">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="relative">
                          {link.label}
                          <span className="absolute -left-4 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-accent opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 group-hover:-left-6" />
                        </span>
                      </span>
                      <ArrowUpRight size={20} className="text-subtle/50 group-hover:text-accent transition-colors" />
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Mobile CTA */}
              <div
                className="mt-6 pt-4 pb-4 opacity-0 motion-reduce:opacity-100"
                style={{
                  animation: "linkStagger 300ms ease-out forwards",
                  animationDelay: `${navigation.length * 40}ms`
                }}
              >
                <Link
                  href="/#contact"
                  onClick={close}
                  className={cn(
                    "flex items-center justify-center gap-2",
                    "h-14 w-full rounded-[var(--radius-lg)]",
                    "bg-gradient-to-br from-accent to-accent-hover",
                    "text-white text-body font-medium",
                    "border border-accent-hover/50 shadow-[0_4px_16px_rgba(59,130,246,0.15)]",
                    "transition-all duration-[var(--duration-fast)]",
                    "active:scale-[0.98] hover:shadow-[0_8px_24px_rgba(59,130,246,0.25)]"
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
