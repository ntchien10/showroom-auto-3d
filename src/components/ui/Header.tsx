'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneCall, Calendar, Menu, X, ChevronRight, Shield } from 'lucide-react';

interface HeaderProps {
  onOpenTestDrive: () => void;
  onOpenSpecs: () => void;
}

export function Header({ onOpenTestDrive, onOpenSpecs }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 sm:px-10 py-5 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            {/* VinFast V-Logo Icon */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-800 p-1.5 flex items-center justify-center shadow-lg shadow-blue-500/20 border border-blue-400/30">
              <svg viewBox="0 0 24 24" className="w-full h-full fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 4.5L12 19.5L21.5 4.5H16.8L12 12.3L7.2 4.5H2.5Z" />
              </svg>
            </div>
            <div>
              <span className="text-lg font-black tracking-widest text-white uppercase block leading-none">
                VINFAST
              </span>
              <span className="text-[9px] tracking-[0.25em] text-blue-400 uppercase font-medium">
                VF6 • Showroom 3D
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 glass-pill px-5 py-2 rounded-full border border-white/10 text-xs font-medium text-zinc-300">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-colors"
          >
            Tổng quan
          </button>
          <button
            onClick={onOpenSpecs}
            className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-colors"
          >
            Thông số kỹ thuật
          </button>
          <span className="px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/20">
            Trải nghiệm 3D 360°
          </span>
          <a
            href="tel:1900232389"
            className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1"
          >
            <PhoneCall className="w-3 h-3 text-blue-400" />
            1900 23 23 89
          </a>
        </nav>

        {/* Action Button: Đăng ký lái thử */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenTestDrive}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-semibold tracking-wide shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Đăng ký lái thử</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl glass-pill text-white border border-white/15"
            aria-label="Mở menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-3 p-4 rounded-2xl glass-panel border border-white/15 text-white pointer-events-auto space-y-3"
          >
            <div className="flex flex-col space-y-2 text-sm font-medium">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSpecs();
                }}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 text-left"
              >
                <span>Thông số kỹ thuật chi tiết</span>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTestDrive();
                }}
                className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Đăng ký lái thử ngay</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
