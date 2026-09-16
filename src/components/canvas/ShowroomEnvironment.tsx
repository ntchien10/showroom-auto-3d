'use client';

import React, { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import { Center, Text } from '@react-three/drei';
import { SVGLoader } from 'three-stdlib';

// Cấu hình vật liệu Chrome bóng gương cao cấp (Pininfarina Spec)
const CHROME_MATERIAL_PROPS = {
  color: '#f8fafc',
  metalness: 0.96,
  roughness: 0.08,
};

// Cấu hình Extrude Geometry 3D nổi khối cho SVG Vector
const EXTRUDE_SETTINGS = {
  depth: 10,
  bevelEnabled: true,
  bevelThickness: 3,
  bevelSize: 2,
  bevelSegments: 4,
};

// Component tái tạo Logo Cánh chim Chữ V Kép 3D từ file vector SVG chính hãng VinFast
function VinFastOfficialSVGLogo({ isLight }: { isLight: boolean }) {
  const svgData = useLoader(SVGLoader, '/assets/images/vinfast-chrome-logo.svg');

  const shapes = useMemo(() => {
    return svgData.paths.flatMap((path) => path.toShapes(true));
  }, [svgData]);

  return (
    <group position={[1.82, 1.88, -3.72]} scale={[0.0027, -0.0030, 0.0028]}>
      <Center>
        {shapes.map((shape, idx) => (
          <mesh key={idx} castShadow receiveShadow>
            <extrudeGeometry args={[shape, EXTRUDE_SETTINGS]} />
            <meshStandardMaterial
              {...CHROME_MATERIAL_PROPS}
              envMapIntensity={isLight ? 2.6 : 3.2}
            />
          </mesh>
        ))}
      </Center>
    </group>
  );
}

export default function ShowroomEnvironment({ isLight }: { isLight: boolean }) {
  return (
    <group>
      {/* 1. ĐÈN SPOTLIGHT CHIẾU ĐIỂM TẠO VỆT SÁNG KIM LOẠI TRÊN CÁNH CHIM VINFAST */}
      <spotLight
        position={[3.0, 4.0, -1.2]}
        target-position={[1.82, 1.50, -3.74]}
        angle={0.58}
        penumbra={0.7}
        intensity={isLight ? 4.5 : 6.0}
        color="#ffffff"
      />

      {/* 2. BỨC TƯỜNG TRẮNG STUDIO VÔ CỰC (CYCLORAMA WALL) */}
      <mesh position={[0, 2.0, -3.8]} receiveShadow>
        <planeGeometry args={[36, 10]} />
        <meshStandardMaterial
          color={isLight ? '#f8fafc' : '#0e1118'}
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>

      {/* 3. CỤM NHẬN DIỆN THƯƠNG HIỆU VINFAST 3D (DỊCH PHẢI THOÁNG ĐÃNG) */}
      {/* Logo 3D Chrome Cánh chim V kép thon gọn */}
      <VinFastOfficialSVGLogo isLight={isLight} />

      {/* Chữ 3D "VINFAST" dập nổi mạ bạc kim loại */}
      <Text
        position={[1.82, 1.18, -3.72]}
        fontSize={0.27}
        letterSpacing={0.22}
        anchorX="center"
        anchorY="middle"
      >
        VINFAST
        <meshStandardMaterial
          {...CHROME_MATERIAL_PROPS}
          envMapIntensity={2.5}
        />
      </Text>

      {/* Tên đại lý 3D: "VINFAST NEWWAY YÊN LÃNG" mạ Titan bạc */}
      <Text
        position={[1.82, 0.94, -3.72]}
        fontSize={0.115}
        letterSpacing={0.09}
        anchorX="center"
        anchorY="middle"
      >
        VINFAST NEWWAY YÊN LÃNG
        <meshStandardMaterial
          color="#cbd5e1"
          metalness={0.85}
          roughness={0.12}
          envMapIntensity={1.8}
        />
      </Text>

      {/* Địa chỉ showroom 3D */}
      <Text
        position={[1.82, 0.80, -3.72]}
        fontSize={0.075}
        letterSpacing={0.03}
        anchorX="center"
        anchorY="middle"
      >
        183 Yên Lãng, Đống Đa, Hà Nội
        <meshStandardMaterial
          color={isLight ? '#64748b' : '#94a3b8'}
          metalness={0.5}
          roughness={0.25}
        />
      </Text>

      {/* 4. DẢI ĐÈN HẮT CHÂN TƯỜNG (COVE LIGHT STRIP) */}
      <mesh position={[0, -0.42, -3.78]}>
        <boxGeometry args={[36, 0.02, 0.03]} />
        <meshStandardMaterial
          color={isLight ? '#93c5fd' : '#1e3a8a'}
          emissive={isLight ? '#60a5fa' : '#3b82f6'}
          emissiveIntensity={isLight ? 0.6 : 1.2}
          toneMapped={false}
        />
      </mesh>

      {/* 5. MẶT SÀN ĐÁ HOA CƯƠNG BÓNG GƯƠNG TRẢI RỘNG KHÔNG GIAN (POLISHED MARBLE FLOOR) */}
      <mesh position={[0, -0.44, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial
          color={isLight ? '#e2e8f0' : '#13161c'}
          roughness={0.20}
          metalness={0.10}
          envMapIntensity={1.3}
        />
      </mesh>
    </group>
  );
}
