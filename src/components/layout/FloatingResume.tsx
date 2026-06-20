"use client";

import { Download } from "lucide-react";
import { m, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

const RESUME_PATH = "/Raul-Mandujano-Resume.pdf";

export function FloatingResume() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <div className="pointer-events-none fixed bottom-5 right-4 z-50 sm:bottom-6 sm:right-6">
      <m.a
        href={RESUME_PATH}
        download="Raul-Mandujano-Resume.pdf"
        aria-label="Download my resume as a PDF"
        initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24, scale: 0.9 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        whileHover={shouldReduceMotion ? undefined : { scale: 1.04, y: -2 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
        className={cn(
          "button-interactive pointer-events-auto group inline-flex items-center gap-2.5 rounded-full",
          "bg-slate-950 px-5 py-3.5 text-sm font-semibold !text-white",
          "shadow-[0_20px_50px_-18px_rgba(15,23,42,0.7),0_8px_24px_-12px_rgba(124,58,237,0.5)]",
          "ring-1 ring-white/20",
          "[--button-glow-0:rgba(255,255,255,0.14)] [--button-glow-1:rgba(96,165,250,0.4)] [--button-glow-2:rgba(168,85,247,0.4)] [--button-glow-3:rgba(56,189,248,0.2)]",
        )}
      >
        <span className="relative flex h-5 w-5 items-center justify-center">
          <Download className="h-[18px] w-[18px] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0.5" />
        </span>
        <span className="!text-white">Download Resume</span>
      </m.a>
    </div>
  );
}
