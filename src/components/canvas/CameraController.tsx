'use client';

import React, { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import * as THREE from 'three';

interface CameraControllerProps {
  isInterior?: boolean;
}

// Vị trí góc nhìn Showroom toàn cảnh mặc định
const EXTERIOR_POS = { x: 4.8, y: 1.7, z: 4.6 };
const EXTERIOR_TARGET = { x: 0.6, y: 0.4, z: 0.0 };

// Vị trí sát mép kính cửa lái (khoảng ngang tầm mắt người chuẩn bị bước vào xe VF6)
const INTERIOR_DOOR_POS = { x: 0.05, y: 0.88, z: 0.95 };
const INTERIOR_TARGET = { x: 0.85, y: 0.60, z: 0.0 };

export function CameraController({ isInterior = false }: CameraControllerProps) {
  const { camera } = useThree();
  const isFirstRender = useRef(true);
  const targetRef = useRef(new THREE.Vector3(EXTERIOR_TARGET.x, EXTERIOR_TARGET.y, EXTERIOR_TARGET.z));

  useEffect(() => {
    if (!camera) return;

    // Lần đầu mount: đặt camera về vị trí showroom mặc định
    if (isFirstRender.current) {
      isFirstRender.current = false;
      camera.position.set(EXTERIOR_POS.x, EXTERIOR_POS.y, EXTERIOR_POS.z);
      camera.lookAt(targetRef.current);
      return;
    }

    try {
      gsap.killTweensOf(camera.position);

      if (isInterior) {
        // GIAI ĐOẠN 1: Camera lướt chậm rãi, đầm chắc từ ngoại thất áp sát mép kính cửa lái
        const currentTarget = {
          x: targetRef.current.x,
          y: targetRef.current.y,
          z: targetRef.current.z,
        };

        gsap.to(camera.position, {
          x: INTERIOR_DOOR_POS.x,
          y: INTERIOR_DOOR_POS.y,
          z: INTERIOR_DOOR_POS.z,
          duration: 1.5,
          ease: 'power2.inOut',
          onUpdate: () => {
            camera.lookAt(targetRef.current);
          },
        });

        gsap.to(currentTarget, {
          x: INTERIOR_TARGET.x,
          y: INTERIOR_TARGET.y,
          z: INTERIOR_TARGET.z,
          duration: 1.5,
          ease: 'power2.inOut',
          onUpdate: () => {
            targetRef.current.set(currentTarget.x, currentTarget.y, currentTarget.z);
            camera.lookAt(targetRef.current);
          },
        });
      } else {
        // GIAI ĐOẠN 2: Camera từ cửa lái mượt mà bay lùi về góc nhìn toàn thể showroom ban đầu
        const currentTarget = {
          x: targetRef.current.x,
          y: targetRef.current.y,
          z: targetRef.current.z,
        };

        gsap.to(camera.position, {
          x: EXTERIOR_POS.x,
          y: EXTERIOR_POS.y,
          z: EXTERIOR_POS.z,
          duration: 1.3,
          ease: 'power2.inOut',
          onUpdate: () => {
            camera.lookAt(targetRef.current);
          },
        });

        gsap.to(currentTarget, {
          x: EXTERIOR_TARGET.x,
          y: EXTERIOR_TARGET.y,
          z: EXTERIOR_TARGET.z,
          duration: 1.3,
          ease: 'power2.inOut',
          onUpdate: () => {
            targetRef.current.set(currentTarget.x, currentTarget.y, currentTarget.z);
            camera.lookAt(targetRef.current);
          },
        });
      }
    } catch (err) {
      console.error('CameraController error:', err);
    }
  }, [isInterior, camera]);

  return null;
}

export default CameraController;
