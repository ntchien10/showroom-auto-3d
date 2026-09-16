'use client';

import { useGLTF } from '@react-three/drei';
import { useEffect, useMemo } from 'react';
import * as THREE from 'three';

export function CarModel() {
  const { scene } = useGLTF('/assets/models/3D-VF6-2.glb');

  // Chuẩn hóa kích thước xe
  useMemo(() => {
    if (!scene) return;

    scene.scale.set(1, 1, 1);
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);

    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const scaleFactor = 4.3 / maxDim;
      scene.scale.setScalar(scaleFactor);
    }
  }, [scene]);

  // Chỉ bật nhận/đổ bóng, GIỮ NGUYÊN VẸN MÀU ĐEN VÀ VẬT LIỆU GỐC CỦA TỪNG MESH
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
