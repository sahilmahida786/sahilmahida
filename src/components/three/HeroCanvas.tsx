"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, Preload } from "@react-three/drei";
import { useDeviceCapability } from "@/hooks";
import { getAdaptiveDPR } from "@/lib/three-utils";
import HeroScene from "./HeroScene";

/**
 * Hero Canvas — isolated client component wrapping the Three.js Canvas.
 * Loaded via next/dynamic({ ssr: false }) from the Hero section.
 *
 * Responsibilities:
 * - Canvas setup (camera, DPR, GL context)
 * - Device-adaptive quality
 * - Suspense boundary for loading
 * - Fallback when WebGL unavailable
 */
export default function HeroCanvas() {
  const device = useDeviceCapability();

  // WebGL fallback — show nothing, the HTML hero is the fallback
  if (!device.hasWebGL) return null;

  const dpr = getAdaptiveDPR(device.isMobile);

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{
        antialias: !device.isMobile,
        alpha: true,
        powerPreference: device.isMobile ? "low-power" : "high-performance",
        stencil: false,
        depth: true,
      }}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
      // Reduced motion: stop the loop entirely
      frameloop={device.prefersReducedMotion ? "never" : "always"}
    >
      <Suspense fallback={null}>
        <HeroScene
          gpuTier={device.gpuTier}
          isMobile={device.isMobile}
          reducedMotion={device.prefersReducedMotion}
        />
        <AdaptiveDpr pixelated />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
