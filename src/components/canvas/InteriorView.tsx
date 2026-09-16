'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Navigation, Disc3, ShieldCheck, Wind, Radio } from 'lucide-react';

interface Hotspot {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  x: number;
  y: number;
  features: string[];
}

const INTERIOR_HOTSPOTS: Hotspot[] = [
  {
    id: 'steering-wheel',
    title: 'Vô lăng D-Cut thể thao',
    subtitle: 'Bọc da cao cấp tích hợp phím trợ lái ADAS',
    description: 'Thiết kế vát đáy D-Cut thể thao công thái học, bọc da cao cấp tích hợp đầy đủ phím bấm điều khiển hành trình thích ứng, giới hạn tốc độ và trợ lý ảo thông minh.',
    icon: Disc3,
    x: 29,
    y: 56,
    features: ['Bọc da đục lỗ thông khí', 'Tích hợp lẫy điều khiển thông minh', 'Trợ lực lái điện EPS biến thiên']
  },
  {
    id: 'infotainment-screen',
    title: 'Màn hình cảm ứng 12.9 inch',
    subtitle: 'Nghiêng 8° hướng trọn về phía người lái',
    description: 'Màn hình trung tâm độ phân giải 2K sắc nét, tích hợp trợ lý ảo tiếng Việt ViVi, điều khiển hệ thống xe và kết nối Apple CarPlay / Android Auto không dây.',
    icon: Radio,
    x: 54,
    y: 44,
    features: ['Độ phân giải siêu nét 2K', 'Trợ lý ảo ViVi thông minh', 'Cập nhật phần mềm từ xa (FOTA)']
  },
  {
    id: 'shift-buttons',
    title: 'Cần số điện tử dạng nút bấm',
    subtitle: 'Thiết kế Shift-by-wire tối giản, tinh tế',
    description: 'Cụm phím chuyển số P-R-N-D mạ viền kim loại sang trọng bố trí liền mạch dưới màn hình, tối ưu không gian bệ tỳ tay rộng rãi và hiện đại.',
    icon: Navigation,
    x: 52,
    y: 68,
    features: ['Chuyển số điện tử an toàn', 'Giải phóng không gian bệ tỳ tay', 'Chất liệu kim loại xước cao cấp']
  },
  {
    id: 'air-purifier',
    title: 'Điều hòa tự động & Lọc bụi PM2.5',
    subtitle: 'Hệ thống kiểm soát chất lượng không khí Combi 1.0',
    description: 'Điều hòa tự động 2 vùng độc lập kết hợp màng lọc HEPA cao cấp loại bỏ 99% bụi mịn PM2.5, phấn hoa và các tác nhân gây hại trong cabin.',
    icon: Wind,
    x: 72,
    y: 49,
    features: ['Lọc bụi mịn PM2.5 & Ion âm', '2 vùng nhiệt độ độc lập', 'Cửa gió làm mát hàng ghế sau']
  }
];

interface InteriorViewProps {
  isOpen: boolean;
  onClose?: () => void;
}

export function InteriorView({ isOpen }: InteriorViewProps) {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  return (
    <motion.div
      className="fixed inset-0 z-10 overflow-hidden bg-black select-none"
      initial={false}
      animate={{
        opacity: isOpen ? 1 : 0,
        scale: isOpen ? 1 : 0.96,
        filter: isOpen ? 'blur(0px)' : 'blur(12px)',
      }}
      transition={{
        duration: isOpen ? 0.85 : 0.85,
        delay: isOpen ? 0.75 : 0, // Vào nội thất: đợi camera lướt tới cửa lái mới mở ảnh
        ease: [0.25, 0.1, 0.25, 1], // Đường cong cubic-bezier mượt mà, triệt tiêu độ giật
      }}
      style={{
        pointerEvents: isOpen ? 'auto' : 'none',
      }}
    >
      {/* 360/Cockpit Panoramic Photo Background */}
      <div className="relative w-full h-full">
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `url('/assets/images/vf6-noi-that.jpg')`,
            transform: 'scale(1.02)', // Chống viền trắng khi blur
          }}
        />

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/35 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/20 to-black/75 pointer-events-none" />

        {/* Top Floating Badge */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: isOpen ? 0 : -20, opacity: isOpen ? 1 : 0 }}
          transition={{ delay: isOpen ? 0.25 : 0, duration: 0.4 }}
          className="absolute top-24 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
        >
          <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-pill border border-blue-500/30 text-xs tracking-wider uppercase text-blue-300 shadow-xl">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Khoang Lái Thông Minh VinFast VF6 • Chạm Vào Điểm Sáng Để Khám Phá</span>
          </div>
        </motion.div>

        {/* Interactive Glowing Hotspots */}
        {isOpen && INTERIOR_HOTSPOTS.map((hotspot) => {
          const isSelected = activeHotspot?.id === hotspot.id;

          return (
            <div
              key={hotspot.id}
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-30 group"
            >
              <div className="relative flex items-center justify-center cursor-pointer">
                {/* Radar pulse ripples */}
                <span className="absolute w-8 h-8 rounded-full bg-blue-500/40 animate-pulse-ring pointer-events-none" />
                <span className="absolute w-6 h-6 rounded-full bg-cyan-400/30 animate-ping pointer-events-none" />

                <motion.button
                  whileHover={{ scale: 1.25 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveHotspot(isSelected ? null : hotspot)}
                  aria-label={hotspot.title}
                  className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                    isSelected
                      ? 'bg-blue-600 text-white ring-4 ring-blue-400/50 scale-110'
                      : 'bg-white/90 text-zinc-900 hover:bg-blue-500 hover:text-white ring-2 ring-white/80'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-current" />
                </motion.button>

                {/* Hover Label Preview */}
                <div className="hidden group-hover:block absolute bottom-full mb-2 left-1/2 -translate-x-1/2 pointer-events-none whitespace-nowrap">
                  <div className="px-2.5 py-1 rounded-md text-[11px] font-medium tracking-wide text-white bg-black/80 backdrop-blur-md border border-white/10 shadow-lg">
                    {hotspot.title}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Detail Hotspot Card Overlay */}
        <AnimatePresence>
          {isOpen && activeHotspot && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute bottom-28 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-lg"
            >
              <div className="glass-panel rounded-2xl p-6 border border-blue-500/30 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

                {/* Close Button */}
                <button
                  onClick={() => setActiveHotspot(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors"
                  aria-label="Đóng"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-400/30 shrink-0">
                    <activeHotspot.icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1 pr-6">
                    <h4 className="text-lg font-bold text-white tracking-wide">{activeHotspot.title}</h4>
                    <p className="text-xs font-medium text-blue-300 mt-0.5">{activeHotspot.subtitle}</p>
                    <p className="text-sm text-zinc-300 mt-2.5 leading-relaxed font-light">{activeHotspot.description}</p>

                    <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                      {activeHotspot.features.map((feat, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-200"
                        >
                          <ShieldCheck className="w-3 h-3 text-blue-400" />
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
