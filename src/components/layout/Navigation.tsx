"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigation } from "@/data/navigation";

// useSyncExternalStore-based hydration guard — no setState inside useEffect
const useIsClient = () =>
  useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

/**
 * Navigation with mobile menu rendered via React Portal at document.body root.
 * This escapes ALL parent stacking contexts (including the Three.js WebGL canvas layer)
 * ensuring the mobile overlay truly covers the full viewport.
 */
export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isClient = useIsClient();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Scroll detection for backdrop
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Body scroll lock + canvas visibility when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      // Hide WebGL canvas so it cannot paint above the overlay
      document.documentElement.classList.add("menu-open");
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.body.style.paddingRight = "";
      document.documentElement.classList.remove("menu-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.body.style.paddingRight = "";
      document.documentElement.classList.remove("menu-open");
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
    // Small delay so the panel is painted before stealing focus
    const t = setTimeout(() => first.focus(), 50);
    return () => {
      clearTimeout(t);
      menu.removeEventListener("keydown", trap);
    };
  }, [isOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
    toggleRef.current?.focus();
  }, []);

  // ─── Mobile Menu Portal ────────────────────────────────────────────────────
  // Rendered at document.body level to escape ALL parent stacking contexts,
  // including the Three.js WebGL compositing layer.
  const mobileMenu = isClient && isOpen
    ? createPortal(
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Keyframe definitions */}
          <style>{`
            @keyframes mobileMenuBgIn {
              from { opacity: 0; }
              to   { opacity: 1; }
            }
            @keyframes mobileMenuPanelIn {
              from { opacity: 0; transform: translateY(-6px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            @keyframes mobileNavItemIn {
              from { opacity: 0; transform: translateY(8px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            /* Hide WebGL canvas when menu is open — prevents GPU layer bleed-through */
            html.menu-open canvas {
              visibility: hidden !important;
              pointer-events: none !important;
            }
          `}</style>

          {/* Full-viewport solid background — completely opaque, no bleed */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: "#05070B",
              animation: "mobileMenuBgIn 180ms ease-out forwards",
            }}
          />

          {/* Subtle gradient accent over the solid bg */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse 80% 50% at 50% 0%, hsla(215,60%,40%,0.08), transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Content panel */}
          <div
            ref={menuRef}
            style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              animation: "mobileMenuPanelIn 220ms ease-out forwards",
            }}
          >
            {/* Header row inside menu: Logo + Close */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 var(--spacing-container, 1.25rem)",
                height: "64px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                flexShrink: 0,
              }}
            >
              {/* Logo */}
              <Link
                href="/"
                onClick={close}
                aria-label="Sahil Mahida home"
                style={{ display: "block", flexShrink: 0 }}
              >
                <div style={{ position: "relative", height: "40px", width: "160px" }}>
                  <Image
                    src="/images/logo/sahil-mahida-logo.webp"
                    alt="Sahil Mahida Full-Stack Python Developer portfolio logo"
                    fill
                    className="object-contain object-left"
                    sizes="160px"
                    priority
                  />
                </div>
              </Link>

              {/* Close button — explicit, large touch target */}
              <button
                onClick={close}
                aria-label="Close menu"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "48px",
                  height: "48px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#fff",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Nav links — scrollable area */}
            <nav
              aria-label="Mobile navigation"
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "0 var(--spacing-container, 1.25rem)",
                WebkitOverflowScrolling: "touch",
              }}
            >
              <ul role="list" style={{ listStyle: "none", margin: 0, padding: "8px 0" }}>
                {navigation.map((link, i) => (
                  <li
                    key={link.section}
                    style={{
                      opacity: 0,
                      animation: "mobileNavItemIn 260ms ease-out forwards",
                      animationDelay: `${80 + i * 50}ms`,
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={close}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "20px 0",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                        textDecoration: "none",
                        color: "rgba(255,255,255,0.75)",
                        fontSize: "1.25rem",
                        fontWeight: 500,
                        letterSpacing: "-0.01em",
                        WebkitTapHighlightColor: "transparent",
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <span
                          style={{
                            fontFamily: "var(--font-mono, monospace)",
                            fontSize: "0.7rem",
                            color: "rgba(59,130,246,0.5)",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {link.label}
                      </span>
                      <ArrowUpRight
                        size={18}
                        style={{ color: "rgba(255,255,255,0.25)", flexShrink: 0 }}
                      />
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Hire Me CTA */}
              <div
                style={{
                  opacity: 0,
                  animation: "mobileNavItemIn 260ms ease-out forwards",
                  animationDelay: `${80 + navigation.length * 50}ms`,
                  paddingTop: "24px",
                  paddingBottom: "32px",
                }}
              >
                <Link
                  href="/#contact"
                  onClick={close}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    height: "56px",
                    width: "100%",
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                    color: "#fff",
                    fontSize: "1rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    boxShadow: "0 4px 20px rgba(59,130,246,0.25)",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  Hire Me
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </nav>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50",
          "transition-all duration-[var(--duration-base)] ease-[var(--ease-out)]",
          isScrolled
            ? "bg-[hsl(225,25%,4%)]/90 backdrop-blur-xl border-b border-border/60 shadow-[0_1px_0_rgba(59,130,246,0.03)]"
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
                  "after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-[3px] after:w-[3px] after:bg-accent after:rounded-full after:opacity-0 after:transition-all after:duration-300 after:ease-out",
                  "hover:after:w-4 hover:after:opacity-100 hover:bg-surface/30"
                )}
              >
                {link.label}
              </Link>
            ))}
            {/* Desktop CTA */}
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

          {/* Mobile Hamburger Toggle */}
          <button
            ref={toggleRef}
            className={cn(
              "relative inline-flex items-center justify-center",
              "h-12 w-12 rounded-[var(--radius-md)] md:hidden",
              "bg-surface/50 border border-border/50",
              "text-foreground",
              "transition-all duration-[250ms] ease-out",
              "hover:bg-surface hover:border-border active:scale-95",
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
      </header>

      {/* Mobile menu rendered via React Portal at document.body root —
          completely outside any parent stacking context */}
      {mobileMenu}
    </>
  );
}
