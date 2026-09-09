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
    // Delay 3D canvas initialization to prioritize FCP and LCP of the HTML content.
    // 600ms is enough to let the page paint text/CSS first without making the
    // 3D scene feel absent on desktop.
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Only skip the 3D canvas for explicit accessibility preferences or confirmed
  // slow (2G) network. Never skip based on gpuTier alone — the scene is lightweight
  // and Intel/AMD integrated GPUs on laptops/desktops handle it fine.
  // gpuTier === "low" was previously blocking desktop rendering when Chrome used
  // SwiftShader as a fallback renderer (WEBGL_debug_renderer_info returns "swiftshader").
  const shouldSkip =
    device.prefersReducedMotion ||
    device.connectionSpeed === "slow" ||
    !device.hasWebGL;

  if (shouldSkip) {
    return null; // The CSS background glow serves as the fallback
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
