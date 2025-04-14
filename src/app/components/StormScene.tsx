'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function RainLines() {
  const rainRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const count = 2000;
    const positions: number[] = [];
    const vertices = [];

    for (let i = 0; i < count; i++) {
      const x = THREE.MathUtils.randFloatSpread(100);
      const y = Math.random() * 100;
      const z = THREE.MathUtils.randFloatSpread(100);
      const length = Math.random() * 2 + 1;

      // each line = 2 points: start and end
      positions.push(x, y, z);
      positions.push(x, y - length, z);
    }

    const rainGeo = new THREE.BufferGeometry();
    rainGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return rainGeo;
  }, []);

  useFrame(() => {
    if (!rainRef.current) return;

    const positions = rainRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < positions.length; i += 6) {
      // move both top and bottom of each line down
      positions[i + 1] -= 1.2;
      positions[i + 4] -= 1.2;

      if (positions[i + 1] < 0) {
        const resetY = 100;
        const length = positions[i + 1] - positions[i + 4];

        positions[i + 1] = resetY;
        positions[i + 4] = resetY - length;
      }
    }

    rainRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <lineSegments ref={rainRef} geometry={geometry}>
      <lineBasicMaterial color="#b0c4de" transparent opacity={0.4} />
    </lineSegments>
  );
}

function LightningFlash() {
  const flashRef = useRef<THREE.Mesh>(null);
  const intensity = useRef(0);

  useFrame(() => {
    if (!flashRef.current) return;

    if (Math.random() < 0.001) {
      intensity.current = Math.random() * 0.4 + 0.1; // subtle flash
    }

    intensity.current *= 0.9; // fade quickly
    (flashRef.current.material as THREE.MeshBasicMaterial).opacity = intensity.current;
  });

  return (
    <mesh ref={flashRef}>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial color="white" transparent opacity={0} />
    </mesh>
  );
}

function StormFadeOverlay() {
  const fadeRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!fadeRef.current) return;

    const scrollY = window.scrollY;
    const maxFadeScroll = window.innerHeight * 9.5; // adjust this to match final section
    const fade = Math.min((scrollY - 3000) / maxFadeScroll, 1);


    (fadeRef.current.material as THREE.MeshBasicMaterial).opacity = fade * 0.9;
  });

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial color="#f0f8ff" transparent opacity={0} />
    </mesh>
  );
}

export default function StormScene() {
  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        width: '100vw',
        height: '50vh',
        background: '#111',
      }}
      camera={{ position: [0, 0, 20], fov: 75 }}
    >
      <fog attach="fog" args={['#111', 10, 100]} />
      <ambientLight intensity={0.1} />
      <RainLines />
      <LightningFlash />
      <StormFadeOverlay />
    </Canvas>
  );
}
