'use client';

import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment, ContactShadows, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import CarModel from './CarModel';

interface ShowroomCanvasProps {
  carColor?: string;
  isInterior?: boolean;
  autoRotate?: boolean;
}

// Component điều phối Camera bay vào cửa lái và kéo lùi ra toàn cảnh
function CameraRig({ isInterior, autoRotate }: { isInterior: boolean; autoRotate?: boolean }) {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const tweenTimelineRef = useRef<gsap.core.Timeline | null>(null);

  // Tọa độ góc nhìn ngoài showroom toàn cảnh
  const defaultCamPos = new THREE.Vector3(5.2, 1.8, 5.0);
  const defaultTarget = new THREE.Vector3(0.85, 0.7, 0);

  // Tọa độ lướt sát cửa kính ghế lái
  const doorCamPos = new THREE.Vector3(0.1, 1.25, 1.45);
  const doorTarget = new THREE.Vector3(0.7, 1.0, 0.1);

  useEffect(() => {
    if (!controlsRef.current) return;
    const controls = controlsRef.current;

    // Dọn dẹp animation cũ nếu người dùng bấm chuyển đổi liên tục
    if (tweenTimelineRef.current) {
      tweenTimelineRef.current.kill();
    }

    const tl = gsap.timeline();
    tweenTimelineRef.current = tl;

    if (isInterior) {
      // 1. NGOẠI THẤT -> NỘI THẤT: Bay chậm rãi, êm ái vào cửa lái (1.35s)
      controls.enabled = false;
      tl.to(
        camera.position,
        {
          x: doorCamPos.x,
          y: doorCamPos.y,
          z: doorCamPos.z,
          duration: 1.35,
          ease: 'power2.inOut',
        },
        0
      );

      tl.to(
        controls.target,
        {
          x: doorTarget.x,
          y: doorTarget.y,
          z: doorTarget.z,
          duration: 1.35,
          ease: 'power2.inOut',
          onUpdate: () => controls.update(),
        },
        0
      );
    } else {
      // 2. NỘI THẤT -> NGOẠI THẤT: Kéo lùi mượt mà từ cửa lái ra toàn cảnh (1.45s)
      controls.enabled = false;

      tl.to(
        camera.position,
        {
          x: defaultCamPos.x,
          y: defaultCamPos.y,
          z: defaultCamPos.z,
          duration: 1.45,
          ease: 'power3.inOut',
        },
        0
      );

      tl.to(
        controls.target,
        {
          x: defaultTarget.x,
          y: defaultTarget.y,
          z: defaultTarget.z,
          duration: 1.45,
          ease: 'power3.inOut',
          onUpdate: () => controls.update(),
          onComplete: () => {
            controls.enabled = true; // Mở lại xoay 360 sau khi camera đã hạ cánh hoàn toàn
          },
        },
        0
      );
    }
  }, [isInterior, camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enableDamping={true}
      dampingFactor={0.05}
      enableZoom={false}
      enablePan={false}
      autoRotate={!isInterior && autoRotate}
      autoRotateSpeed={1.0}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 2.05}
      target={[0.85, 0.7, 0]}
    />
  );
}

export function ShowroomCanvas({
  carColor,
  isInterior = false,
  autoRotate = false
}: ShowroomCanvasProps) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0d0f15',
        zIndex: 0,
      }}
    >
      <Canvas
        camera={{ position: [5.2, 1.8, 5.0], fov: 38, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#0d0f15']} />

        {/* Ánh sáng Studio */}
        <ambientLight intensity={1.8} />
        <directionalLight position={[10, 15, 10]} intensity={2.5} castShadow />
        <directionalLight position={[-10, 10, -10]} intensity={1.2} />
        <directionalLight position={[0, -2, 5]} intensity={0.8} />

        <Suspense fallback={null}>
          {/* Dịch nhẹ xe và bóng đổ sang phải (x = 0.85) để cân bằng bố cục với bảng thông số */}
          <group position={[0.85, 0, 0]}>
            <CarModel color={carColor} />
            <ContactShadows
              position={[0, 0, 0]}
              opacity={0.7}
              scale={12}
              blur={2}
              far={3.5}
            />
          </group>
          <Environment preset="city" />
        </Suspense>

        {/* Camera Rig điều khiển chuyển cảnh vào cửa lái và xoay 360 */}
        <CameraRig isInterior={isInterior} autoRotate={autoRotate} />
      </Canvas>
    </div>
  );
}

export default ShowroomCanvas;
