import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { CursorLight } from "@/components/layout/CursorLight";
import { Navbar } from "@/components/layout/Navbar";
import { SiteBackground } from "@/components/layout/SiteBackground";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

import "lenis/dist/lenis.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen font-sans text-slate-950 antialiased">
        <MotionProvider>
          <SmoothScrollProvider>
            <div className="relative isolate min-h-screen">
              <SiteBackground />
              <CursorLight />
              <div className="relative z-10 flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
              </div>
            </div>
          </SmoothScrollProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
