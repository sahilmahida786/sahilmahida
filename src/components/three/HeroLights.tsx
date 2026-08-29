"use client";

/**
 * Hero lighting setup — creates depth in the dark environment.
 *
 * Key light: subtle directional from top-right
 * Fill: dim ambient
 * Accent: blue point light near the core
 *
 * Quality-adaptive: low tier skips the point light.
 */
export default function HeroLights({ quality }: { quality: "high" | "medium" | "low" }) {
  return (
    <>
      {/* Ambient fill — very dim */}
      <ambientLight intensity={0.08} color="#8899bb" />

      {/* Key light — top right, cool white */}
      <directionalLight
        position={[4, 3, 5]}
        intensity={0.4}
        color="#c0d0ff"
      />

      {/* Accent — electric blue point near core */}
      {quality !== "low" && (
        <pointLight
          position={[0, 0, 2]}
          intensity={0.6}
          color="#3b82f6"
          distance={8}
          decay={2}
        />
      )}
    </>
  );
}
