"use client";

import { useState, useEffect, useCallback } from "react";
import type { DeviceCapability } from "@/types";

/**
 * Lightweight device capability detection (~1KB).
 * Replaces the 15KB detect-gpu library with targeted checks.
 *
 * Detects:
 * - WebGL availability
 * - Touch vs pointer input
 * - Connection speed (via Navigator.connection)
 * - Reduced motion preference
 * - Viewport width
 * - GPU tier estimate (based on WebGL renderer string)
 */

function detectWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    return gl !== null;
  } catch {
    return false;
  }
}

function detectGPUTier(): DeviceCapability["gpuTier"] {
  if (typeof window === "undefined") return "unknown";
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") as WebGLRenderingContext | null;
    if (!gl) return "unknown";

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    if (!debugInfo) return "medium";

    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string;
    const rendererLower = renderer.toLowerCase();

    // Low-end indicators
    const lowEndPatterns = [
      "intel hd",
      "intel uhd",
      "mali-4",
      "mali-t",
      "adreno 3",
      "adreno 4",
      "powervr",
      "swiftshader",
      "llvmpipe",
      "software",
    ];

    // High-end indicators
    const highEndPatterns = [
      "nvidia",
      "geforce",
      "radeon rx",
      "radeon pro",
      "apple m",
      "adreno 7",
      "mali-g7",
    ];

    if (lowEndPatterns.some((p) => rendererLower.includes(p))) return "low";
    if (highEndPatterns.some((p) => rendererLower.includes(p))) return "high";
    return "medium";
  } catch {
    return "unknown";
  }
}

function detectConnectionSpeed(): DeviceCapability["connectionSpeed"] {
  if (typeof window === "undefined") return "unknown";

  const nav = navigator as Navigator & {
    connection?: {
      effectiveType?: string;
      downlink?: number;
    };
  };

  if (!nav.connection) return "unknown";

  const effectiveType = nav.connection.effectiveType;
  if (effectiveType === "4g") return "fast";
  if (effectiveType === "3g") return "medium";
  if (effectiveType === "2g" || effectiveType === "slow-2g") return "slow";
  return "unknown";
}

export function useDeviceCapability(): DeviceCapability {
  const [capability, setCapability] = useState<DeviceCapability>({
    hasWebGL: true,
    isMobile: false,
    isTouch: false,
    prefersReducedMotion: false,
    connectionSpeed: "unknown",
    gpuTier: "unknown",
    viewportWidth: 1280,
  });

  const detect = useCallback(() => {
    setCapability({
      hasWebGL: detectWebGL(),
      isMobile: window.innerWidth < 768,
      isTouch: "ontouchstart" in window || navigator.maxTouchPoints > 0,
      prefersReducedMotion: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches,
      connectionSpeed: detectConnectionSpeed(),
      gpuTier: detectGPUTier(),
      viewportWidth: window.innerWidth,
    });
  }, []);

  useEffect(() => {
    setTimeout(detect, 0);

    const handleResize = () => {
      setCapability((prev) => ({
        ...prev,
        isMobile: window.innerWidth < 768,
        viewportWidth: window.innerWidth,
      }));
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [detect]);

  return capability;
}
