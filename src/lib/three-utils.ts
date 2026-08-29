import * as THREE from "three";

/**
 * Dispose a Three.js object and all its children recursively.
 * Prevents memory leaks when unmounting 3D components.
 *
 * Usage: call in useEffect cleanup or when removing objects from scene.
 */
export function disposeObject(obj: THREE.Object3D): void {
  obj.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      if (child.geometry) {
        child.geometry.dispose();
      }

      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach(disposeMaterial);
        } else {
          disposeMaterial(child.material);
        }
      }
    }
  });
}

/**
 * Dispose a material and all its textures.
 */
function disposeMaterial(material: THREE.Material): void {
  material.dispose();

  // Dispose textures if they exist
  const mat = material as THREE.MeshStandardMaterial;
  const textureKeys: (keyof THREE.MeshStandardMaterial)[] = [
    "map",
    "normalMap",
    "roughnessMap",
    "metalnessMap",
    "aoMap",
    "emissiveMap",
    "envMap",
    "alphaMap",
    "bumpMap",
    "displacementMap",
    "lightMap",
  ];

  for (const key of textureKeys) {
    const texture = mat[key];
    if (texture && texture instanceof THREE.Texture) {
      texture.dispose();
    }
  }
}

/**
 * Clamp DPR based on device capability.
 * Mobile: [1, 1.5], Desktop: [1, 2]
 */
export function getAdaptiveDPR(isMobile: boolean): [number, number] {
  return isMobile ? [1, 1.5] : [1, 2];
}
