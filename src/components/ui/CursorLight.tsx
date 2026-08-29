"use client";

import { useCallback, useRef, type MouseEvent, type ReactNode } from "react";

interface CursorLightProps {
  children: ReactNode;
  className?: string;
}

/**
 * CursorLight — Desktop-only cursor-following radial glow on cards.
 * Uses CSS custom properties for zero-layout-thrash mouse tracking.
 * On mobile/touch devices: renders children only, no tracking overhead.
 */
export default function CursorLight({ children, className }: CursorLightProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={className}
      style={{ position: "relative" }}
    >
      {/* Cursor glow overlay — hidden on touch devices */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"
        style={{
          background:
            "radial-gradient(circle 200px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59,130,246,0.06), transparent 60%)",
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
