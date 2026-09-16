'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Car, RotateCw, Sparkles, Layers, Check } from 'lucide-react';

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
  subtext: string;
}

export const CAR_COLORS: ColorOption[] = [
  { id: 'white', name: 'Trắng Ngọc Trai', hex: '#F4F5F7', subtext: 'Brahminy White' },
  { id: 'crimson', name: 'Đỏ Crimson', hex: '#A81414', subtext: 'Crimson Red' },
  { id: 'blue', name: 'Xanh VinFast', hex: '#00529C', subtext: 'VinFast Blue' },
  { id: 'grey', name: 'Xám Titan', hex: '#4B5563', subtext: 'Neptune Grey' },
  { id: 'silver', name: 'Bạc Desir', hex: '#B0B5BA', subtext: 'Desir Silver' },
  { id: 'sunset', name: 'Cam Sunset', hex: '#D96B27', subtext: 'Sunset Orange' }
];

interface ShowroomDockProps {
  viewMode: 'exterior' | 'interior';
  onViewModeChange: (mode: 'exterior' | 'interior') => void;
  selectedColor: string;
  onColorChange: (colorHex: string) => void;
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
  onOpenLineup: () => void;
}

export function ShowroomDock({
  viewMode,
  onViewModeChange,
  selectedColor,
  onColorChange,
  autoRotate,
  onToggleAutoRotate,
  onOpenLineup
}: ShowroomDockProps) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-auto max-w-[95vw]"
    >
      <div className="flex items-center gap-3 sm:gap-5 px-5 py-2.5 rounded-full backdrop-blur-2xl transition-all duration-500 bg-white/75 dark:bg-neutral-900/80 border border-white/80 dark:border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.1)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
        {/* Exterior / Interior Mode Switcher */}
        <div className="flex items-center p-1 rounded-full bg-neutral-100/80 dark:bg-white/5 border border-neutral-200/60 dark:border-white/10">
          <button
            onClick={() => onViewModeChange('exterior')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
              viewMode === 'exterior'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            <span>Ngoại thất</span>
          </button>

          <button
            onClick={() => onViewModeChange('interior')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
              viewMode === 'interior'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Nội thất</span>
          </button>
        </div>

        <div className="hidden sm:block w-px h-6 bg-neutral-300/80 dark:bg-white/15" />

        {/* Color Palette Swatches (visible in Exterior mode) */}
        {viewMode === 'exterior' && (
          <div className="flex items-center gap-2">
            <span className="hidden md:inline text-[11px] uppercase tracking-wider text-neutral-500 dark:text-zinc-400 font-medium">
              Màu sơn:
            </span>
            <div className="flex items-center gap-1.5">
              {CAR_COLORS.map((color) => {
                const isSelected = selectedColor === color.hex;
                return (
                  <button
                    key={color.id}
                    onClick={() => onColorChange(color.hex)}
                    title={`${color.name} (${color.subtext})`}
                    className={`relative w-6 h-6 rounded-full transition-transform duration-200 hover:scale-110 flex items-center justify-center ${
                      isSelected
                        ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-[#090a0f] scale-110'
                        : 'opacity-85 hover:opacity-100 border border-neutral-300/60 dark:border-transparent'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  >
                    {isSelected && (
                      <Check className={`w-3.5 h-3.5 ${color.id === 'white' || color.id === 'silver' ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="w-px h-6 bg-neutral-300/80 dark:bg-white/15" />

        {/* Action Buttons: Auto-Rotate & Lineup */}
        <div className="flex items-center gap-1.5">
          {viewMode === 'exterior' && (
            <button
              onClick={onToggleAutoRotate}
              title={autoRotate ? 'Dừng xoay tự động' : 'Tự động xoay 360°'}
              className={`p-2 rounded-full text-xs font-medium transition-colors ${
                autoRotate
                  ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-400/40'
                  : 'bg-neutral-100/80 dark:bg-white/5 text-neutral-600 dark:text-zinc-300 hover:bg-neutral-200/80 dark:hover:bg-white/10 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <RotateCw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            </button>
          )}

          <button
            onClick={onOpenLineup}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-100/80 dark:bg-white/10 hover:bg-neutral-200/80 dark:hover:bg-white/20 text-neutral-800 dark:text-white text-xs font-medium border border-neutral-200/80 dark:border-white/10 transition-all duration-200 hover:border-blue-500/40"
          >
            <Layers className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
            <span className="hidden sm:inline">Dải xe điện</span>
            <span className="sm:hidden">Dải xe</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
