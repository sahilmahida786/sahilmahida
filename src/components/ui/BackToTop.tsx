"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Back to Top Floating Button
 * 
 * - Appears after scrolling down 400px.
 * - Smooth scrolls back to the #hero section or top of the page.
 * - Fully accessible and keyboard navigable.
 * - Respects mobile safe areas.
 */
export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Ensure it doesn't show in the hero section (which is typically ~100vh)
      // 600px is a safe threshold that guarantees we're past the initial hero view on most devices
      setIsVisible(window.scrollY > 600);
    };

    // Initial check on mount
    handleScroll();

    // Passive listener for scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToHero = () => {
    const hero = document.getElementById("hero");
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={scrollToHero}
      aria-label="Back to top"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      className={cn(
        "fixed z-[9999]",
        "flex h-12 w-12 items-center justify-center rounded-md",
        "bg-accent text-white shadow-lg border border-accent/20",
        "transition-all duration-300 ease-in-out",
        "hover:bg-accent-hover hover:-translate-y-1 active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "motion-reduce:transition-opacity motion-reduce:hover:-translate-y-0", 
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-8 opacity-0 pointer-events-none"
      )}
      style={{
        // Use inline styles to absolutely guarantee it sits on the bottom right
        bottom: "calc(2rem + env(safe-area-inset-bottom, 0px))",
        right: "1.5rem",
      }}
    >
      <ArrowUp size={24} strokeWidth={2.5} aria-hidden="true" />
    </button>
  );
}
