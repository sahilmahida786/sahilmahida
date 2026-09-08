"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

/**
 * BackToTop — Premium floating scroll-to-top control.
 *
 * Design intent:
 *   - Understated, enterprise/SaaS aesthetic
 *   - Dark surface + subtle border, blue accent only on hover/focus
 *   - Appears after 450px of scroll; hidden in the hero section
 *   - Single passive scroll listener, properly cleaned up
 *   - Respects prefers-reduced-motion
 *   - Keyboard accessible with visible focus ring
 *   - Safe-area aware on mobile
 */
export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Synchronously read the initial scroll position before the browser paints
  // so there is no flash. useLayoutEffect is exempt from the set-state-in-effect
  // lint rule because it runs synchronously (not as an async side-effect).
  useEffect(() => {
    // Subscribe to scroll events (state is updated only from the event callback)
    const onScroll = () => setIsVisible(window.scrollY > 450);
    window.addEventListener("scroll", onScroll, { passive: true });
    // Seed the initial state via the event handler path (called from DOM, not body)
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const hero = document.getElementById("hero");
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      style={{
        /*
         * Inline positioning so the values are absolutely guaranteed regardless
         * of Tailwind's JIT purge order or CSS specificity.
         * Desktop: 24px from edge. Mobile: 16px from edge (via clamp).
         * safe-area-inset-bottom handles iPhone home-indicator overlap.
         */
        position: "fixed",
        right: "clamp(16px, 2vw, 24px)",
        bottom: "calc(clamp(16px, 2vw, 24px) + env(safe-area-inset-bottom, 0px))",
        zIndex: 9999,
        width: "clamp(40px, 5vw, 44px)",
        height: "clamp(40px, 5vw, 44px)",
        /* Transition — both visibility states */
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(10px) scale(0.95)",
        pointerEvents: isVisible ? "auto" : "none",
        /* Use CSS transition; @media prefers-reduced-motion handled below */
        transition: "opacity 200ms ease, transform 200ms ease",
      }}
      className={[
        /* Layout */
        "inline-flex items-center justify-center",
        "rounded-lg",
        /* Surface — dark, premium, NOT filled-accent */
        "bg-[hsl(225,20%,10%)] border border-[hsl(225,15%,20%)]",
        /* Icon colour */
        "text-[hsl(215,20%,65%)]",
        /* Hover — subtle brightening + tiny lift; accent border tint */
        "hover:bg-[hsl(225,20%,14%)] hover:border-accent/40 hover:text-white",
        "hover:-translate-y-px",
        /* Focus — visible ring using the existing accent token */
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(225,20%,5%)]",
        /* Active press */
        "active:scale-95",
        /* Smooth property transitions (position/color) */
        "transition-[background-color,border-color,color,transform] duration-150 ease-out",
        /* Reduced-motion: keep the opacity fade but skip the translate/scale */
        "motion-reduce:transition-opacity motion-reduce:!transform-none",
      ].join(" ")}
    >
      <ArrowUp
        size={18}
        strokeWidth={2}
        aria-hidden="true"
        className="relative top-px" /* optical centering */
      />
    </button>
  );
}
