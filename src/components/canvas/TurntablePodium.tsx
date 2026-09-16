'use client';

import React from 'react';
import * as THREE from 'three';

export default function TurntablePodium({ isLight = false }: { isLight?: boolean }) {
  return (
    <group position={[0.85, -0.38, 0]}>
      {/* 1. Thân bục hình trụ dẹt gọn gàng ôm vừa vặn 4 bánh xe */}
      <mesh position={[0, -0.06, 0]} receiveShadow>
        <cylinderGeometry args={[2.58, 2.72, 0.12, 64]} />
        <meshStandardMaterial
          color={isLight ? '#e2e8f0' : '#1c1f26'}
          roughness={0.25}
          metalness={isLight ? 0.75 : 0.85}
        />
      </mesh>

      {/* 2. Viền LED xanh Neon chỉ mảnh ôm khít mép đĩa (bán kính 2.48m - 2.52m) */}
      <mesh position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.48, 2.52, 64]} />
        <meshBasicMaterial
          color={isLight ? '#0284c7' : '#0070f3'}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
