'use client';

import { Canvas } from '@react-three/fiber';
import LightRain from './LightRain';

export default function FoggyCanvas() {
  return (
    <Canvas
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
        width: '100%',
        height: '80vh',
        pointerEvents: 'none',
      }}
      camera={{ position: [0, 0, 15], fov: 75 }}
    >
      <LightRain />
    </Canvas>
  );
}
