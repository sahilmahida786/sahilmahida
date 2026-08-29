"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface HeroCoreProps {
  quality: "high" | "medium" | "low";
  reducedMotion: boolean;
}

/**
 * Digital Core — the central 3D object.
 *
 * Layer 1: Inner icosahedron (solid, subtle emissive)
 * Layer 2: Wireframe icosahedron (slightly larger, rotating)
 * Layer 3: Outer ring system (orbital lines)
 *
 * All animation via refs — zero React re-renders per frame.
 */
export default function HeroCore({ quality, reducedMotion }: HeroCoreProps) {
  const innerRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  const detail = quality === "high" ? 1 : quality === "medium" ? 1 : 0;

  // Reuse materials (created once)
  const innerMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("hsl(210, 80%, 15%)"),
        emissive: new THREE.Color("hsl(210, 100%, 30%)"),
        emissiveIntensity: 0.4,
        roughness: 0.3,
        metalness: 0.8,
      }),
    []
  );

  const wireMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("hsl(210, 100%, 55%)"),
        wireframe: true,
        transparent: true,
        opacity: 0.15,
      }),
    []
  );

  const ringMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("hsl(210, 80%, 50%)"),
        transparent: true,
        opacity: 0.08,
        side: THREE.DoubleSide,
      }),
    []
  );

  useFrame(({ clock }) => {
    if (reducedMotion) return;
    const t = clock.getElapsedTime();

    if (innerRef.current) {
      innerRef.current.rotation.y = t * 0.15;
      innerRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.08;
      wireRef.current.rotation.z = t * 0.05;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.12;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = t * 0.1;
      ring2Ref.current.rotation.z = -t * 0.06;
    }
  });

  return (
    <group>
      {/* Layer 1 — Inner solid core */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.6, detail]} />
        <primitive object={innerMat} attach="material" />
      </mesh>

      {/* Layer 2 — Wireframe shell */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[0.9, detail]} />
        <primitive object={wireMat} attach="material" />
      </mesh>

      {/* Layer 3 — Orbital rings */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.4, 0.005, 8, quality === "low" ? 48 : 80]} />
        <primitive object={ringMat} attach="material" />
      </mesh>

      {quality !== "low" && (
        <mesh ref={ring2Ref} rotation={[Math.PI / 5, Math.PI / 4, 0]}>
          <torusGeometry args={[1.7, 0.004, 8, 80]} />
          <primitive object={ringMat} attach="material" />
        </mesh>
      )}
    </group>
  );
}
