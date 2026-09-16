'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneCall, Calendar, Menu, X, ChevronRight, Shield, MapPin } from 'lucide-react';
import { SHOWROOM_CONFIG } from '@/config/showroom';
import { AnimatedThemeToggle } from './AnimatedThemeToggle';

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
          <div className="flex items-center gap-3">
            {/* VinFast 3D Chrome Double-V Emblem with White Background */}
            <div className="w-10 h-10 rounded-2xl bg-white p-1 flex items-center justify-center shadow-md shadow-black/10 border border-black/10 dark:border-white/20 shrink-0">
              <Image
                src="/assets/images/vinfast-logo-header.png"
                alt="VinFast Logo"
                width={36}
                height={36}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div>
              <span className="text-lg font-black tracking-widest text-neutral-900 dark:text-white uppercase block leading-none">
                VINFAST
              </span>
              <span className="text-[9px] tracking-[0.2em] text-blue-600 dark:text-blue-400 uppercase font-medium">
                {SHOWROOM_CONFIG.name}
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 backdrop-blur-2xl bg-white/70 dark:bg-black/30 px-5 py-2 rounded-full border border-black/10 dark:border-white/10 text-xs font-medium text-neutral-700 dark:text-zinc-300 shadow-sm">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-3.5 py-1.5 rounded-full hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            Tổng quan
          </button>
          <button
            onClick={onOpenSpecs}
            className="px-3.5 py-1.5 rounded-full hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            Thông số kỹ thuật
          </button>
          <span className="px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 border border-blue-500/20">
            Trải nghiệm 3D 360°
          </span>
          <a
            href={`tel:${SHOWROOM_CONFIG.hotline.replace(/\s+/g, '')}`}
            className="px-3.5 py-1.5 rounded-full hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center gap-1"
          >
            <PhoneCall className="w-3 h-3 text-blue-500 dark:text-blue-400" />
            {SHOWROOM_CONFIG.hotline}
          </a>
        </nav>

        {/* Action Button & Theme Switcher */}
        <div className="flex items-center gap-3">
          <AnimatedThemeToggle />

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
            className="md:hidden p-2 rounded-xl bg-white/70 dark:bg-neutral-800/80 text-neutral-800 dark:text-white border border-black/10 dark:border-white/15 hover:scale-105 transition-transform"
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
            className="md:hidden mt-3 p-4 rounded-2xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-2xl border border-black/10 dark:border-white/15 text-neutral-900 dark:text-white shadow-xl pointer-events-auto space-y-3"
          >
            <div className="flex flex-col space-y-2 text-sm font-medium">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSpecs();
                }}
                className="flex items-center justify-between p-3 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-left transition-colors"
              >
                <span>Thông số kỹ thuật chi tiết</span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTestDrive();
                }}
                className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-md"
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
