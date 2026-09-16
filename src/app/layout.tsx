import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#07080c",
};

export const metadata: Metadata = {
  title: "VinFast VF 6 | 3D Digital Luxury Showroom & Configurator",
  description: "Trải nghiệm không gian 3D tương tác 360 độ siêu thực của mẫu xe điện thông minh VinFast VF6. Tùy chỉnh màu sơn, khám phá khoang lái công nghệ cao và đăng ký lái thử.",
  keywords: ["VinFast", "VF6", "Xe điện VinFast", "Showroom 3D", "3D Car Configurator", "B-SUV điện", "VinFast VF 6"],
  authors: [{ name: "VinFast Auto" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#07080c] overflow-hidden">{children}</body>
    </html>
  );
}
