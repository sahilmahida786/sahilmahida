"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface HeroParticlesProps {
  quality: "high" | "medium" | "low";
  reducedMotion: boolean;
}

const COUNTS = { high: 200, medium: 120, low: 60 } as const;

/**
 * Controlled particle field surrounding the Digital Core.
 * Uses a single Points object — one draw call for all particles.
 *
 * Particles orbit the core gently; no explosion or chaos.
 * All mutation via refs — zero React re-renders.
 */
export default function HeroParticles({ quality, reducedMotion }: HeroParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = COUNTS[quality];

  const { positions, speeds, radii, offsets } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const rad = new Float32Array(count);
    const off = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // eslint-disable-next-line react-hooks/purity
      const radius = 1.5 + Math.random() * 2.5;
      // eslint-disable-next-line react-hooks/purity
      const theta = Math.random() * Math.PI * 2;
      // eslint-disable-next-line react-hooks/purity
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      // eslint-disable-next-line react-hooks/purity
      spd[i] = 0.05 + Math.random() * 0.15;
      rad[i] = radius;
      // eslint-disable-next-line react-hooks/purity
      off[i] = Math.random() * Math.PI * 2;
    }

    return { positions: pos, speeds: spd, radii: rad, offsets: off };
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame(({ clock }) => {
    if (reducedMotion || !pointsRef.current) return;
    const t = clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const angle = t * speeds[i] + offsets[i];
      const r = radii[i];
      const phi = offsets[i] + Math.sin(t * 0.1 + offsets[i]) * 0.3;

      arr[i * 3] = r * Math.sin(phi) * Math.cos(angle);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(angle);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }

    posAttr.needsUpdate = true;
    pointsRef.current.rotation.y = t * 0.02;
  });

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: new THREE.Color("hsl(210, 100%, 65%)"),
        size: quality === "high" ? 0.02 : 0.025,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [quality]
  );

  return (
    <points ref={pointsRef} geometry={geometry}>
      <primitive object={material} attach="material" />
    </points>
  );
}
