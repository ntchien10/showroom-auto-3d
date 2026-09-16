import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

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
  title: "VINFAST NEWWAY",
  description: "Trải nghiệm không gian 3D tương tác 360 độ siêu thực của mẫu xe điện thông minh VinFast VF6. Tùy chỉnh màu sơn, khám phá khoang lái công nghệ cao và đăng ký lái thử.",
  keywords: ["VinFast", "VF6", "Xe điện VinFast", "Showroom 3D", "3D Car Configurator", "B-SUV điện", "VinFast VF 6"],
  authors: [{ name: "VinFast Auto" }],
  icons: {
    icon: [
      { url: "/assets/images/vinfast-logo-header.png" },
      { url: "/icon.png" },
    ],
    shortcut: "/assets/images/vinfast-logo-header.png",
    apple: "/assets/images/vinfast-logo-header.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/assets/images/vinfast-logo-header.png" type="image/png" sizes="any" />
        <link rel="shortcut icon" href="/assets/images/vinfast-logo-header.png" type="image/png" />
        <link rel="apple-touch-icon" href="/assets/images/vinfast-logo-header.png" />
      </head>
      <body className="min-h-full flex flex-col bg-[#07080c] dark:bg-[#07080c] overflow-hidden">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
