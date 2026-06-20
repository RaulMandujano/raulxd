import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { CursorLight } from "@/components/layout/CursorLight";
import { FloatingResume } from "@/components/layout/FloatingResume";
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
  title: "Raul Mandujano — Full-Stack & AI/SaaS Engineer",
  description:
    "Full-stack engineer and SaaS builder. I design and ship scalable AI-powered products — CRM systems, automation engines, and multi-tenant platforms. Selected work: Evano Studio, CrewX, EvanoTask, Evano Development, El Inka Envíos.",
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
              <FloatingResume />
            </div>
          </SmoothScrollProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
