'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, CheckCircle2, User, Phone, MapPin, Car } from 'lucide-react';

interface TestDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TestDriveModal({ isOpen, onClose }: TestDriveModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Hà Nội',
    model: 'VinFast VF 6 Plus',
    note: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 border border-white/20 text-white shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
                  Đăng Ký Lái Thử VF6
                </h3>
                <p className="text-xs text-zinc-400">
                  Trải nghiệm công nghệ xe điện thông minh cùng chuyên gia VinFast
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 mt-5">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Họ và tên *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nguyễn Văn A"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-blue-400 focus:outline-none text-sm text-white placeholder:text-zinc-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Số điện thoại *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0987 654 321"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-blue-400 focus:outline-none text-sm text-white placeholder:text-zinc-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">Tỉnh / Thành phố</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-zinc-900 border border-white/10 focus:border-blue-400 focus:outline-none text-xs text-white"
                    >
                      <option value="Hà Nội">Hà Nội</option>
                      <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                      <option value="Đà Nẵng">Đà Nẵng</option>
                      <option value="Hải Phòng">Hải Phòng</option>
                      <option value="Cần Thơ">Cần Thơ</option>
                      <option value="Khác">Tỉnh thành khác</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">Phiên bản quan tâm</label>
                  <div className="relative">
                    <Car className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-zinc-900 border border-white/10 focus:border-blue-400 focus:outline-none text-xs text-white"
                    >
                      <option value="VinFast VF 6 Plus">VF 6 Plus (Cao cấp)</option>
                      <option value="VinFast VF 6 Base">VF 6 Base (Tiêu chuẩn)</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 font-bold text-xs uppercase tracking-wider text-white shadow-lg glow-blue transition-all"
              >
                Gửi yêu cầu lái thử ngay
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-blue-500/20 text-cyan-400 border border-cyan-400/40 mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-bold uppercase text-white mb-2">Đăng Ký Thành Công!</h4>
            <p className="text-sm text-zinc-300 max-w-sm mx-auto leading-relaxed">
              Cảm ơn Quý khách <span className="text-white font-semibold">{formData.name}</span>. Chuyên viên tư vấn VinFast sẽ liên hệ lại qua số <span className="text-cyan-400 font-mono">{formData.phone}</span> trong thời gian sớm nhất để xác nhận lịch lái thử.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-6 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all border border-white/10"
            >
              Đóng cửa sổ
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
