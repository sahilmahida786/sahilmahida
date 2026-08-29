"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
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
 */
export default function HeroScene({ gpuTier, isMobile, reducedMotion }: HeroSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const smoothMouse = useRef({ x: 0, y: 0 });

  // Track mouse position (desktop only)
  useFrame(({ pointer }) => {
    if (reducedMotion || !groupRef.current) return;

    if (!isMobile) {
      mouse.current.x = pointer.x * 0.3;
      mouse.current.y = pointer.y * 0.15;
    }

    // Smooth interpolation
    smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * 0.04;
    smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * 0.04;

    // Apply to group — subtle tilt
    groupRef.current.rotation.y = smoothMouse.current.x * 0.5;
    groupRef.current.rotation.x = -smoothMouse.current.y * 0.3;
  });

  // Quality tiers
  const quality = getQuality(gpuTier, isMobile);

  // Position: centered on desktop, lower-right on mobile
  const position: [number, number, number] = isMobile
    ? [0, -0.5, 0]
    : [1.8, -0.2, 0];

  return (
    <group ref={groupRef} position={position}>
      <HeroCore quality={quality} reducedMotion={reducedMotion} />
      <HeroParticles quality={quality} reducedMotion={reducedMotion} />
      <HeroLights quality={quality} />
    </group>
  );
}

type Quality = "high" | "medium" | "low";

function getQuality(gpuTier: DeviceCapability["gpuTier"], isMobile: boolean): Quality {
  if (isMobile) return "low";
  if (gpuTier === "high") return "high";
  if (gpuTier === "low") return "low";
  return "medium";
}
