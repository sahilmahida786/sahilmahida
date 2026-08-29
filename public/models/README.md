# 3D Model Assets

Place GLB/GLTF model files here. These will be:
- Served as static files from /models/*
- Cached aggressively via the Next.js headers config
- Loaded on-demand via @react-three/drei's useGLTF hook

Naming convention: lowercase-with-dashes.glb
Max total size target: < 2MB compressed
