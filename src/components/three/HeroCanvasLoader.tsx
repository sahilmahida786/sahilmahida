"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";

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
  const device = useDeviceCapability();
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Delay 3D canvas initialization to prioritize FCP and LCP of the HTML content
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 1500); // 1.5s delay allows the page to fully render text/CSS first
    return () => clearTimeout(timer);
  }, []);

  // Gracefully degrade on low-end devices or slow connections
  if (device.gpuTier === "low" || device.connectionSpeed === "slow" || device.prefersReducedMotion) {
    return null; // The CSS background glow will serve as the fallback
  }

  if (!shouldLoad) {
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-label text-subtle animate-pulse tracking-widest">
          INITIALIZING CORE...
        </div>
      </div>
    );
  }

  return <HeroCanvas />;
}
