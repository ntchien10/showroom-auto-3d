'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, Environment } from '@react-three/drei';
import { useTheme } from '@/components/ThemeProvider';
import * as THREE from 'three';
import CarModel from './CarModel';
import TurntablePodium from './TurntablePodium';
import ShowroomEnvironment from './ShowroomEnvironment';
import CameraController from './CameraController';

interface ShowroomCanvasProps {
  carColor?: string;
  isInterior?: boolean;
  autoRotate?: boolean;
}

// Component cho phép kéo chuột chỉ xoay riêng chiếc xe (Đã xóa triệt để tấm bóng vuông FBO)
function RotatableCar({ carRotationRef }: { carRotationRef: React.RefObject<THREE.Group | null> }) {
  return (
    <group position={[0.85, -0.38, 0]}>
      {/* Group xoay độc lập */}
      <group ref={carRotationRef} position={[0, 0, 0]}>
        {/* Center top khóa cứng tâm hình học về đúng trục quay */}
        <Center top>
          <CarModel />
        </Center>
      </group>
    </group>
  );
}

export default function ShowroomCanvas({
  isInterior = false,
  _carColor,
  _autoRotate,
}: ShowroomCanvasProps & { _carColor?: string; _autoRotate?: boolean }) {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === 'light';
  const carRotationRef = useRef<THREE.Group>(null);
  const isDraggingRef = useRef(false);
  const prevPointerXRef = useRef(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isInterior) return;
    isDraggingRef.current = true;
    prevPointerXRef.current = e.clientX;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isInterior || !isDraggingRef.current || !carRotationRef.current) return;
    const deltaX = e.clientX - prevPointerXRef.current;
    prevPointerXRef.current = e.clientX;
    carRotationRef.current.rotation.y += deltaX * 0.007;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className={`fixed inset-0 z-0 transition-colors duration-700 ${
        isInterior ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'
      } ${isLight ? 'bg-[#f8fafc]' : 'bg-[#0b0d13]'}`}
    >
      <Canvas
        camera={{ position: [4.8, 1.7, 4.6], fov: 40, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.LinearToneMapping,
          toneMappingExposure: 1.0,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
      >
        <color attach="background" args={[isLight ? '#f8fafc' : '#0b0d13']} />

        {/* Cinematic Camera Transition Controller */}
        <CameraController isInterior={isInterior} />

        {/* Ánh sáng White Gallery: tôn dáng xe và phản xạ bóng đổ trên sàn đá */}
        <ambientLight intensity={isLight ? 0.75 : 0.45} />

        {/* Đèn trần rọi highlight bóng bẩy */}
        <directionalLight
          position={[8, 12, 6]}
          intensity={isLight ? 1.6 : 1.3}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0001}
        />

        {/* Đèn ven phía sau hắt sáng đường gân hông xe */}
        <directionalLight position={[-8, 8, -6]} intensity={0.8} />

        {/* Đèn lướt nhẹ mặt trước */}
        <directionalLight position={[0, 1, 6]} intensity={0.4} />

        <Suspense fallback={null}>
          <ShowroomEnvironment isLight={isLight} />
          <TurntablePodium isLight={isLight} />
          <RotatableCar carRotationRef={carRotationRef} />
          
          {/* Ánh sáng phản chiếu môi trường */}
          <Environment environmentIntensity={0.5} preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
