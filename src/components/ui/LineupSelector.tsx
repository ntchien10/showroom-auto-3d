'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Check, ArrowUpRight } from 'lucide-react';

interface CarLineupItem {
  id: string;
  name: string;
  segment: string;
  price: string;
  range: string;
  isCurrent?: boolean;
}

const CAR_LINEUP: CarLineupItem[] = [
  { id: 'vf3', name: 'VinFast VF 3', segment: 'Mini e-SUV đô thị', price: 'Từ 240 Triệu', range: '210 km' },
  { id: 'vf5', name: 'VinFast VF 5 Plus', segment: 'A-SUV Năng động', price: 'Từ 468 Triệu', range: '326 km' },
  { id: 'vf6', name: 'VinFast VF 6', segment: 'B-SUV Thời thượng', price: 'Từ 675 Triệu', range: '399 km', isCurrent: true },
  { id: 'vf7', name: 'VinFast VF 7', segment: 'C-SUV Cá tính', price: 'Từ 850 Triệu', range: '496 km' },
  { id: 'vf8', name: 'VinFast VF 8', segment: 'D-SUV Sang trọng', price: 'Từ 1.090 Triệu', range: '471 km' },
  { id: 'vf9', name: 'VinFast VF 9', segment: 'E-SUV Đẳng cấp Chủ tịch', price: 'Từ 1.589 Triệu', range: '594 km' },
  { id: 'limo-green', name: 'Limo Green', segment: 'MPV Thương mại điện cao cấp', price: 'Liên hệ', range: '450 km' },
  { id: 'nerio-green', name: 'Nerio Green', segment: 'Green Mobility Fleet', price: 'Liên hệ', range: '380 km' },
  { id: 'herio-green', name: 'Herio Green', segment: 'Eco City Transit', price: 'Liên hệ', range: '320 km' },
  { id: 'minio-green', name: 'Minio Green', segment: 'Compact Urban Electric', price: 'Liên hệ', range: '250 km' },
];

interface LineupSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCar: (carId: string) => void;
}

export function LineupSelector({ isOpen, onClose, onSelectCar }: LineupSelectorProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto glass-panel rounded-3xl p-6 sm:p-8 border border-white/20 text-white shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-xs uppercase font-bold tracking-widest text-blue-400">
            Hệ sinh thái xe điện thông minh
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-2">
          Dải Sản Phẩm Xe Điện VinFast
        </h3>
        <p className="text-xs text-zinc-400 mb-6">
          Chọn dòng xe để khám phá thiết kế tinh tế và công nghệ tương lai.
        </p>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
          {CAR_LINEUP.map((car) => {
            return (
              <div
                key={car.id}
                onClick={() => {
                  if (car.id === 'vf6') {
                    onClose();
                  } else {
                    onSelectCar(car.id);
                  }
                }}
                className={`group cursor-pointer rounded-2xl p-4.5 transition-all duration-300 relative overflow-hidden border ${
                  car.isCurrent
                    ? 'bg-blue-600/20 border-blue-400/50 shadow-lg glow-blue'
                    : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.08] hover:border-white/25'
                }`}
              >
                {car.isCurrent && (
                  <span className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-blue-300 bg-blue-500/30 px-2 py-0.5 rounded-full border border-blue-400/30">
                    <Check className="w-3 h-3" /> Đang xem
                  </span>
                )}

                <div className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {car.name}
                </div>
                <div className="text-xs text-zinc-400 mt-0.5">{car.segment}</div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-zinc-400 block text-[10px]">Giá khởi điểm</span>
                    <span className="font-semibold text-white">{car.price}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-zinc-400 block text-[10px]">Quãng đường</span>
                    <span className="font-semibold text-cyan-400">{car.range}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
