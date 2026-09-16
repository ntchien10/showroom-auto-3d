'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Header } from '@/components/ui/Header';
import { ShowroomDock, CAR_COLORS } from '@/components/ui/ShowroomDock';
import { SpecsOverlay } from '@/components/ui/SpecsOverlay';
import { LineupSelector } from '@/components/ui/LineupSelector';
import { TestDriveModal } from '@/components/ui/TestDriveModal';
import { InteriorView } from '@/components/canvas/InteriorView';
import { Loader2 } from 'lucide-react';

// SSR-safe Dynamic Import for WebGL Three.js Canvas
const ShowroomCanvas = dynamic(
  () => import('@/components/canvas/ShowroomCanvas'),
  {
    ssr: false,
    loading: () => (
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#0b0c10] text-white">
        <div className="relative w-14 h-14 flex items-center justify-center mb-4">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        </div>
        <p className="text-sm tracking-widest uppercase font-semibold text-zinc-300">
          Khởi tạo không gian 3D Showroom VinFast VF6...
        </p>
      </div>
    )
  }
);

export default function ShowroomPage() {
  const [carColor, setCarColor] = useState<string>(CAR_COLORS[2].hex); // Default VinFast Signature Blue
  const [viewMode, setViewMode] = useState<'exterior' | 'interior'>('exterior');
  const [autoRotate, setAutoRotate] = useState<boolean>(false);
  const [testDriveOpen, setTestDriveOpen] = useState<boolean>(false);
  const [fullSpecsOpen, setFullSpecsOpen] = useState<boolean>(false);
  const [lineupOpen, setLineupOpen] = useState<boolean>(false);

  const isInterior = viewMode === 'interior';

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#0b0c10] text-white select-none">
      {/* 1. Header Navigation */}
      <Header
        onOpenTestDrive={() => setTestDriveOpen(true)}
        onOpenSpecs={() => setFullSpecsOpen(true)}
      />

      {/* 2. Layer 1: Interactive 3D WebGL Showroom (Exterior) */}
      <div
        className="fixed inset-0 z-0 bg-[#0d0f15]"
        style={{
          pointerEvents: isInterior ? 'none' : 'auto',
        }}
      >
        <ShowroomCanvas
          carColor={carColor}
          isInterior={isInterior}
          autoRotate={autoRotate}
        />
      </div>

      {/* 3. Layer 2: Interior Cockpit with Interactive Hotspots */}
      <InteriorView
        isOpen={isInterior}
        onClose={() => setViewMode('exterior')}
      />

      {/* 3. Left-Side Editorial Specs Ticker */}
      <SpecsOverlay
        viewMode={viewMode}
        isFullModalOpen={fullSpecsOpen}
        onCloseFullModal={() => setFullSpecsOpen(false)}
        onOpenFullModal={() => setFullSpecsOpen(true)}
        onOpenTestDrive={() => setTestDriveOpen(true)}
      />

      {/* 4. Bottom Floating Pill Dock Controls */}
      <ShowroomDock
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        selectedColor={carColor}
        onColorChange={setCarColor}
        autoRotate={autoRotate}
        onToggleAutoRotate={() => setAutoRotate(!autoRotate)}
        onOpenLineup={() => setLineupOpen(true)}
      />

      {/* 5. Modals: EV Lineup Selector & Test Drive Reservation */}
      <LineupSelector
        isOpen={lineupOpen}
        onClose={() => setLineupOpen(false)}
        onSelectCar={() => setLineupOpen(false)}
      />

      <TestDriveModal
        isOpen={testDriveOpen}
        onClose={() => setTestDriveOpen(false)}
      />
    </main>
  );
}
