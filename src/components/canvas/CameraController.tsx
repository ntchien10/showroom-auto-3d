'use client';

import React, { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';

interface CameraControllerProps {
  isInterior: boolean;
  onTransitionToInterior: (show: boolean) => void;
}

export function CameraController({
  isInterior,
  onTransitionToInterior
}: CameraControllerProps) {
  const { camera } = useThree();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!camera) return;

    // Skip animation on initial mount
    if (isFirstRender.current) {
      isFirstRender.current = false;
      camera.position.set(5.2, 1.8, 5.0);
      camera.lookAt(0.85, 0.7, 0);
      return;
    }

    try {
      gsap.killTweensOf(camera.position);

      if (isInterior) {
        // Nhịp 2: Bật ảnh nội thất tại mốc 1.0s khi camera chạm mép kính lái
        const timer = setTimeout(() => {
          onTransitionToInterior(true);
        }, 1000);

        // Nhịp 1: Lướt camera tới sát mép kính lái trong 1.2s (tính theo vị trí xe x=0.85)
        gsap.to(camera.position, {
          x: -0.35,
          y: 1.25,
          z: 0.5,
          duration: 1.2,
          ease: 'power2.inOut',
          onComplete: () => {
            clearTimeout(timer);
            onTransitionToInterior(true);
          }
        });
      } else {
        // Tắt ngay ảnh nội thất khi quay lại ngoại thất
        onTransitionToInterior(false);

        // Lướt camera lùi lại vị trí góc nhìn studio chuẩn
        gsap.to(camera.position, {
          x: 5.2,
          y: 1.8,
          z: 5.0,
          duration: 1.0,
          ease: 'power2.inOut'
        });
      }
    } catch (err) {
      console.error('CameraController error:', err);
      camera.position.set(5.2, 1.8, 5.0);
    }
  }, [isInterior, camera, onTransitionToInterior]);

  return null;
}

export default CameraController;
