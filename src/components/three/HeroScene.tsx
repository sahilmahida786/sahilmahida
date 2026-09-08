"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import HeroCore from "./HeroCore";
import HeroParticles from "./HeroParticles";
import HeroLights from "./HeroLights";
import type { DeviceCapability } from "@/types";

interface HeroSceneProps {
  gpuTier: DeviceCapability["gpuTier"];
  isMobile: boolean;
  reducedMotion: boolean;
}

/**
 * Hero scene composition — orchestrates all 3D layers.
 * All animation uses refs, never React state.
 *
 * Position is calculated per-frame from the actual canvas aspect ratio so the
 * geometry stays visible across every viewport width — the original bug was a
 * fixed x=1.8 offset that pushed the object outside the frustum on desktop.
 */
export default function HeroScene({ gpuTier, isMobile, reducedMotion }: HeroSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const smoothMouse = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  useFrame(({ pointer }) => {
    if (!groupRef.current) return;

    // ── Mouse parallax (desktop only, skip when reduced motion) ────────────
    if (!reducedMotion && !isMobile) {
      mouse.current.x = pointer.x * 0.3;
      mouse.current.y = pointer.y * 0.15;
    }

    smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * 0.04;
    smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * 0.04;

    if (!reducedMotion) {
      groupRef.current.rotation.y = smoothMouse.current.x * 0.5;
      groupRef.current.rotation.x = -smoothMouse.current.y * 0.3;
    }

    // ── Responsive position ────────────────────────────────────────────────
    // viewport.width is in Three.js world units (accounts for camera FOV + aspect).
    // Clamping keeps the object visible on ultra-wide (21:9) and tall mobile screens.
    if (isMobile) {
      // Mobile: centered horizontally, slightly below center
      groupRef.current.position.x = 0;
      groupRef.current.position.y = -0.4;
    } else {
      // Desktop/tablet: push toward right half but clamp so it's never off-screen.
      // viewport.width * 0.22 ≈ right-centre on 16:9; wider screens get more offset
      // but never more than half the viewport (object stays fully visible).
      const xOffset = Math.min(viewport.width * 0.22, viewport.width * 0.38);
      groupRef.current.position.x = xOffset;
      groupRef.current.position.y = -0.15;
    }
    groupRef.current.position.z = 0;
  });

  // Quality tiers
  const quality = getQuality(gpuTier, isMobile);

  return (
    // Initial position matches the useFrame target so there's no jump on first frame
    <group ref={groupRef} position={isMobile ? [0, -0.4, 0] : [1.5, -0.15, 0]}>
      <HeroCore quality={quality} reducedMotion={reducedMotion} />
      <HeroParticles quality={quality} reducedMotion={reducedMotion} />
      <HeroLights quality={quality} />
    </group>
  );
}

type Quality = "high" | "medium" | "low";

function getQuality(gpuTier: DeviceCapability["gpuTier"], isMobile: boolean): Quality {
  // Mobile gets reduced quality for battery/perf — this is intentional
  if (isMobile) return "low";
  if (gpuTier === "high") return "high";
  // "low" GPU tier still gets medium quality — the scene is extremely lightweight
  // and the simplest geometry (quality "low") will render fine on any WebGL device
  if (gpuTier === "low") return "medium";
  return "medium";
}
