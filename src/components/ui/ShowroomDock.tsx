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
      <div className="glass-pill px-4 py-2.5 rounded-full flex items-center gap-3 sm:gap-5 shadow-2xl border border-white/15">
        {/* Exterior / Interior Mode Switcher */}
        <div className="flex items-center p-1 rounded-full bg-white/5 border border-white/10">
          <button
            onClick={() => onViewModeChange('exterior')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${viewMode === 'exterior'
                ? 'bg-blue-600 text-white shadow-lg glow-blue'
                : 'text-zinc-400 hover:text-zinc-200'
              }`}
          >
            <Car className="w-3.5 h-3.5" />
            <span>Ngoại thất</span>
          </button>

          <button
            onClick={() => onViewModeChange('interior')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${viewMode === 'interior'
                ? 'bg-blue-600 text-white shadow-lg glow-blue'
                : 'text-zinc-400 hover:text-zinc-200'
              }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Nội thất</span>
          </button>
        </div>

        <div className="hidden sm:block w-px h-6 bg-white/15" />

        {/* Color Palette Swatches (visible in Exterior mode) */}
        {viewMode === 'exterior' && (
          <div className="flex items-center gap-2">
            <span className="hidden md:inline text-[11px] uppercase tracking-wider text-zinc-400 font-medium">
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
                    className={`relative w-6 h-6 rounded-full transition-transform duration-200 hover:scale-110 flex items-center justify-center ${isSelected ? 'ring-2 ring-blue-400 ring-offset-2 ring-offset-[#090a0f] scale-110' : 'opacity-85 hover:opacity-100'
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

        <div className="w-px h-6 bg-white/15" />

        {/* Action Buttons: Auto-Rotate & Lineup */}
        <div className="flex items-center gap-1.5">
          {viewMode === 'exterior' && (
            <button
              onClick={onToggleAutoRotate}
              title={autoRotate ? 'Dừng xoay tự động' : 'Tự động xoay 360°'}
              className={`p-2 rounded-full text-xs font-medium transition-colors ${autoRotate
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-400/40'
                  : 'bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white'
                }`}
            >
              <RotateCw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            </button>
          )}

          <button
            onClick={onOpenLineup}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/10 transition-all duration-200 hover:border-blue-400/40"
          >
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Dải xe điện</span>
            <span className="sm:hidden">Dải xe</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
