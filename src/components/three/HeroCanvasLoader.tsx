"use client";

import dynamic from "next/dynamic";

/**
 * Client-side wrapper that dynamically imports HeroCanvas with ssr: false.
 * This isolates the "use client" + ssr: false requirement from the
 * server-rendered Hero section.
 */
const HeroCanvas = dynamic(
  () => import("@/components/three/HeroCanvas"),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-label text-subtle animate-pulse tracking-widest">
          INITIALIZING CORE...
        </div>
      </div>
    ),
  }
);

export default function HeroCanvasLoader() {
  return <HeroCanvas />;
}
