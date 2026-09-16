'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BatteryCharging, Zap, Gauge, ShieldCheck, ChevronRight, X, Sparkles, CheckCircle2 } from 'lucide-react';

interface SpecsOverlayProps {
  viewMode: 'exterior' | 'interior';
  isFullModalOpen: boolean;
  onCloseFullModal: () => void;
  onOpenFullModal: () => void;
  onOpenTestDrive: () => void;
}

export function SpecsOverlay({
  viewMode,
  isFullModalOpen,
  onCloseFullModal,
  onOpenFullModal,
  onOpenTestDrive
}: SpecsOverlayProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Left Editorial Specs Card (Only shown during Exterior View, or minimized) */}
      <AnimatePresence>
        {viewMode === 'exterior' && (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-24 left-6 sm:left-8 z-30 pointer-events-none max-w-[340px] w-full"
          >
            <div className="pointer-events-auto">
              {!collapsed ? (
                <div className="relative w-full p-5 rounded-3xl backdrop-blur-2xl transition-all duration-500 bg-white/75 dark:bg-black/40 border border-white/80 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
                  {/* Subtle decorative glow */}
                  <div className="absolute top-0 left-0 -ml-16 -mt-16 w-36 h-36 bg-blue-600/15 dark:bg-blue-600/20 rounded-full blur-2xl pointer-events-none" />

                  {/* Header Badge */}
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9.5px] uppercase font-bold tracking-widest bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                      <Sparkles className="w-3 h-3 text-blue-500 dark:text-cyan-400" />
                      Thuần Điện Thông Minh
                    </span>
                    <button
                      onClick={() => setCollapsed(true)}
                      className="text-[11px] text-neutral-400 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                      title="Thu gọn"
                    >
                      Thu gọn
                    </button>
                  </div>

                  {/* Car Title & Segment */}
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white uppercase">
                    VinFast VF 6
                  </h1>
                  <p className="text-[11px] font-medium text-neutral-500 dark:text-zinc-400 tracking-wider uppercase mt-0.5">
                    C-SUV Cỡ Nhỏ Hiện Đại • Torino & Pininfarina
                  </p>

                  {/* Price Tag */}
                  <div className="mt-3 pb-3 border-b border-neutral-200/60 dark:border-white/10 flex items-baseline gap-2">
                    <span className="text-[11px] text-neutral-500 dark:text-zinc-400">Giá niêm yết từ:</span>
                    <span className="text-lg sm:text-xl font-bold text-blue-600 dark:text-cyan-400">
                      675.000.000
                    </span>
                    <span className="text-[11px] text-neutral-600 dark:text-zinc-300 font-semibold">VNĐ</span>
                  </div>

                  {/* Primary Performance Spec Badges */}
                  <div className="grid grid-cols-3 gap-2 my-4">
                    {/* Range */}
                    <div className="p-2.5 rounded-2xl transition-all bg-neutral-100/80 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-white/5 hover:border-blue-500/40">
                      <div className="flex items-center gap-1 text-blue-500 dark:text-blue-400 mb-1">
                        <BatteryCharging className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-base sm:text-lg font-bold tracking-tight text-neutral-900 dark:text-white leading-none">399</div>
                      <div className="text-[9.5px] text-neutral-500 dark:text-zinc-400 leading-tight mt-1">km/lần sạc (WLTP)</div>
                    </div>

                    {/* Horsepower */}
                    <div className="p-2.5 rounded-2xl transition-all bg-neutral-100/80 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-white/5 hover:border-blue-500/40">
                      <div className="flex items-center gap-1 text-cyan-600 dark:text-cyan-400 mb-1">
                        <Zap className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-base sm:text-lg font-bold tracking-tight text-neutral-900 dark:text-white leading-none">201</div>
                      <div className="text-[9.5px] text-neutral-500 dark:text-zinc-400 leading-tight mt-1">Mã lực (HP)</div>
                    </div>

                    {/* ADAS / Tech */}
                    <div className="p-2.5 rounded-2xl transition-all bg-neutral-100/80 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-white/5 hover:border-blue-500/40">
                      <div className="flex items-center gap-1 text-indigo-500 dark:text-indigo-400 mb-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-base sm:text-lg font-bold tracking-tight text-neutral-900 dark:text-white leading-none">Level 2</div>
                      <div className="text-[9.5px] text-neutral-500 dark:text-zinc-400 leading-tight mt-1">Trợ lái ADAS</div>
                    </div>
                  </div>

                  {/* Bottom Actions */}
                  <div className="flex items-center gap-2.5 pt-0.5">
                    <button
                      onClick={onOpenFullModal}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-neutral-100/80 dark:bg-white/10 hover:bg-neutral-200/80 dark:hover:bg-white/20 text-[11px] font-semibold text-neutral-800 dark:text-white transition-all border border-neutral-200 dark:border-white/15 hover:border-blue-500/40"
                    >
                      <span>Toàn bộ thông số</span>
                      <ChevronRight className="w-3.5 h-3.5 text-blue-500 dark:text-cyan-400" />
                    </button>
                    <button
                      onClick={onOpenTestDrive}
                      className="py-2 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-[11px] font-semibold text-white shadow-lg shadow-blue-500/20 transition-all"
                    >
                      Lái thử
                    </button>
                  </div>
                </div>
              ) : (
                /* Collapsed floating trigger */
                <button
                  onClick={() => setCollapsed(false)}
                  className="px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-2xl transition-all bg-white/75 dark:bg-neutral-900/80 border border-white/80 dark:border-white/10 text-neutral-800 dark:text-white flex items-center gap-2 shadow-lg"
                >
                  <Sparkles className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                  <span>VinFast VF6 • Thông số xe</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comprehensive Tech Specs Modal */}
      <AnimatePresence>
        {isFullModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto glass-panel rounded-3xl p-6 sm:p-8 border border-white/20 text-white shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={onCloseFullModal}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                  <Gauge className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold uppercase tracking-wide">
                    Thông Số Kỹ Thuật VinFast VF6
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Bản thương mại tiêu chuẩn & Plus phân phối chính hãng
                  </p>
                </div>
              </div>

              {/* Specs Table & Grid */}
              <div className="space-y-6">
                {/* Section 1: Kích thước & Trọng lượng */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-blue-400 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Kích thước & Trọng lượng
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between">
                      <span className="text-zinc-400">Dài x Rộng x Cao</span>
                      <span className="font-semibold">4.238 x 1.820 x 1.594 mm</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between">
                      <span className="text-zinc-400">Chiều dài cơ sở</span>
                      <span className="font-semibold">2.730 mm</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between">
                      <span className="text-zinc-400">Khoảng sáng gầm</span>
                      <span className="font-semibold">170 mm</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between">
                      <span className="text-zinc-400">La-zăng</span>
                      <span className="font-semibold">19 inch hợp kim nhôm (Plus)</span>
                    </div>
                  </div>
                </div>

                {/* Section 2: Động cơ & Vận hành */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-blue-400 mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4" /> Động cơ & Vận hành (Bản VF6 Plus)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between">
                      <span className="text-zinc-400">Loại động cơ</span>
                      <span className="font-semibold">Động cơ điện (Front-Wheel Drive)</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between">
                      <span className="text-zinc-400">Công suất tối đa</span>
                      <span className="font-semibold">201 HP (150 kW)</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between">
                      <span className="text-zinc-400">Mô-men xoắn cực đại</span>
                      <span className="font-semibold">310 Nm</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between">
                      <span className="text-zinc-400">Dung lượng Pin LFP</span>
                      <span className="font-semibold">59.6 kWh</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between">
                      <span className="text-zinc-400">Quãng đường di chuyển</span>
                      <span className="font-semibold">399 km (WLTP)</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between">
                      <span className="text-zinc-400">Thời gian sạc nhanh (10-70%)</span>
                      <span className="font-semibold">~24.6 phút</span>
                    </div>
                  </div>
                </div>

                {/* Section 3: An toàn & ADAS */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-blue-400 mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" /> Công nghệ An toàn & Trợ lái ADAS
                  </h4>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs space-y-2 text-zinc-300">
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      Hỗ trợ di chuyển khi ùn tắc giao thông (Traffic Jam Assist)
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      Hỗ trợ giữ làn khẩn cấp & Cảnh báo chệch làn đường (LKA / LDW)
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      Kiểm soát hành trình thích ứng toàn dải tốc độ (Adaptive Cruise Control)
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      Phanh tự động khẩn cấp trước/sau & Cảnh báo điểm mù (BSD)
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      Hệ thống 8 túi khí tiêu chuẩn an toàn 5 sao ASEAN NCAP
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom CTA in Modal */}
              <div className="mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-zinc-400 text-center sm:text-left">
                  Bảo hành chính hãng 7 năm hoặc 160.000 km • Cứu hộ 24/7 toàn quốc
                </div>
                <button
                  onClick={() => {
                    onCloseFullModal();
                    onOpenTestDrive();
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 font-bold text-xs uppercase tracking-wider text-white shadow-lg glow-blue hover:scale-105 transition-all"
                >
                  Đăng ký nhận báo giá & Lái thử
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
