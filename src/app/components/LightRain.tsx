'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function LightRain() {
  const rainRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const count = 400;
    const positions: number[] = [];

    for (let i = 0; i < count; i++) {
      const x = THREE.MathUtils.randFloatSpread(80);
      const y = Math.random() * 60;
      const z = THREE.MathUtils.randFloatSpread(80);
      const length = Math.random() * 0.5 + 0.5; // shorter than storm

      // push two points for a line (start and end)
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
      positions[i + 1] -= 0.07; // top point
      positions[i + 4] -= 0.07; // bottom point

      if (positions[i + 1] < 0) {
        const resetY = 60;
        const length = positions[i + 1] - positions[i + 4];

        positions[i + 1] = resetY;
        positions[i + 4] = resetY - length;
      }
    }

    rainRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <lineSegments ref={rainRef} geometry={geometry}>
      <lineBasicMaterial color="#9db7d5" transparent opacity={0.3} />
    </lineSegments>
  );
}

