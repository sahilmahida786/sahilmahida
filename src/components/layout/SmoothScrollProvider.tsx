"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Smooth scroll provider using Lenis.
 * Wraps the entire app to provide momentum-based scrolling.
 *
 * Automatically disables smooth scroll when user prefers reduced motion.
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  const prefersReducedMotion = useReducedMotion();

  // If user prefers reduced motion, render children without Lenis
  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
