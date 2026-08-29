"use client";

import { useState, useEffect } from "react";

/**
 * Detects whether the user prefers reduced motion.
 * Returns true if the user has enabled reduced motion in their OS settings.
 *
 * Used to:
 * - Disable GSAP scroll animations
 * - Set Three.js frameloop to "never"
 * - Disable Lenis smooth scroll
 * - Skip CSS transitions/animations
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setTimeout(() => setPrefersReducedMotion(mediaQuery.matches), 0);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
}
