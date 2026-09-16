'use client';

import { useGLTF } from '@react-three/drei';
import { useEffect, useMemo } from 'react';
import * as THREE from 'three';

interface CarModelProps {
  color?: string;
  autoRotate?: boolean;
}

export function CarModel(_props?: CarModelProps) {
  const { scene } = useGLTF('/assets/models/3D-VF6-2.glb');

  // Chuẩn hóa kích thước và tâm xe 1 lần duy nhất ngay trong useMemo
  useMemo(() => {
    if (!scene) return;

    // Reset transformations to avoid cumulative scaling
    scene.scale.set(1, 1, 1);
    scene.position.set(0, 0, 0);
    scene.rotation.set(0, 0, 0);

    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);

    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      // Scale chuẩn tỉ lệ chiều dài VinFast VF6 thực tế
      const targetLength = 4.3;
      const scaleFactor = targetLength / maxDim;
      scene.scale.setScalar(scaleFactor);
    }

    const scaledBox = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    scaledBox.getCenter(center);

    // Căn giữa trục X, Z và đặt đáy bánh xe tiếp xúc sàn Y = 0
    scene.position.x -= center.x;
    scene.position.z -= center.z;
    scene.position.y -= scaledBox.min.y;
  }, [scene]);

  useEffect(() => {
    if (!scene) return;
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} />;
}

export default CarModel;

useGLTF.preload('/assets/models/3D-VF6-2.glb');
