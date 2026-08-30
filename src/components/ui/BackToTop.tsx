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
      // Request animation frame is not strictly necessary for simple boolean state
      // but ensures the check runs efficiently.
      setIsVisible(window.scrollY > 400);
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
        "fixed right-4 sm:right-8 z-40",
        "flex h-11 w-11 items-center justify-center rounded-full",
        "bg-accent text-background shadow-[0_4px_14px_rgba(59,130,246,0.25)]",
        "transition-all duration-300 ease-[var(--ease-out)]",
        "hover:bg-accent-hover hover:scale-105 active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "motion-reduce:transition-opacity motion-reduce:hover:scale-100", // Respect reduced motion
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-8 opacity-0 pointer-events-none"
      )}
      style={{
        // Ensure it sits above mobile browser UI bars safely and is forced to the right
        bottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))",
        right: "1rem",
      }}
    >
      <ArrowUp size={20} strokeWidth={2.5} aria-hidden="true" />
    </button>
  );
}
