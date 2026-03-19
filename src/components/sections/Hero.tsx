"use client";

import { ArrowUpRight } from "lucide-react";
import { m, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import { fadeUp, heroMotionProps, staggerContainer } from "@/styles/animations";

const particles = [
  {
    className: "left-[8%] top-[18%] h-2.5 w-2.5 bg-sky-300/70",
    duration: 7,
    delay: 0.2,
  },
  {
    className: "left-[22%] top-[70%] h-3 w-3 bg-violet-300/55",
    duration: 9,
    delay: 0.8,
  },
  {
    className: "right-[16%] top-[22%] h-2 w-2 bg-cyan-200/70",
    duration: 8.4,
    delay: 0.4,
  },
  {
    className: "right-[9%] top-[58%] h-3.5 w-3.5 bg-fuchsia-200/45",
    duration: 10,
    delay: 1.1,
  },
  {
    className: "left-[48%] top-[14%] h-2 w-2 bg-white/80",
    duration: 6.8,
    delay: 0.6,
  },
  {
    className: "left-[68%] top-[78%] h-2.5 w-2.5 bg-sky-100/70",
    duration: 8.8,
    delay: 1.4,
  },
];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="hero" className="site-container pt-6 sm:pt-8">
      <div
        className={cn(
          "relative isolate overflow-hidden rounded-[2rem] border border-white/60",
          "bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(238,242,255,0.84)_34%,rgba(224,231,255,0.68)_58%,rgba(15,23,42,0.12)_100%)]",
          "shadow-[0_40px_140px_-48px_rgba(15,23,42,0.34)]",
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.2),transparent_28%),radial-gradient(circle_at_78%_20%,rgba(168,85,247,0.18),transparent_28%),radial-gradient(circle_at_70%_75%,rgba(15,23,42,0.16),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent)]" />
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-sky-300/28 blur-3xl" />
        <div className="absolute right-[-4%] top-[20%] h-80 w-80 rounded-full bg-violet-300/18 blur-3xl" />
        <div className="absolute bottom-[-8%] left-[34%] h-52 w-52 rounded-full bg-white/50 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.14),transparent_22%,transparent_78%,rgba(15,23,42,0.06))]" />

        {particles.map((particle) => (
          <m.span
            key={particle.className}
            aria-hidden="true"
            className={cn(
              "absolute rounded-full blur-[1px]",
              particle.className,
            )}
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, -18, 0],
                    opacity: [0.35, 0.9, 0.35],
                    scale: [1, 1.15, 1],
                  }
            }
            transition={
              shouldReduceMotion
                ? undefined
                : {
                    duration: particle.duration,
                    delay: particle.delay,
                    ease: "easeInOut",
                    repeat: Number.POSITIVE_INFINITY,
                  }
            }
          />
        ))}

        <m.div
          variants={staggerContainer}
          {...heroMotionProps}
          className="relative flex min-h-[calc(100svh-6rem)] items-center px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24"
        >
          <div className="max-w-5xl">
            <m.div variants={fadeUp}>
              <span className="inline-flex items-center rounded-full border border-white/45 bg-white/55 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-700 shadow-[0_12px_30px_-20px_rgba(15,23,42,0.45)] backdrop-blur-md">
                AI &amp; SaaS Builder
              </span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="mt-8 max-w-5xl text-5xl font-semibold tracking-[-0.075em] text-slate-950 sm:text-6xl lg:text-7xl lg:leading-[0.94]"
            >
              <span className="block">Building scalable</span>
              <span className="animated-gradient-text block pb-1">
                SaaS and AI-powered systems
              </span>
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-measure mt-7 max-w-3xl text-lg leading-8 text-slate-700 sm:text-xl"
            >
              I design and develop high-performance platforms that solve real
              business problems.
            </m.p>

            <m.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className={cn(
                  "button-glow inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white",
                  "bg-slate-950 shadow-[0_18px_48px_-18px_rgba(15,23,42,0.72)]",
                  "hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950/20",
                  "hover:shadow-[0_20px_60px_-16px_rgba(59,130,246,0.34),0_18px_50px_-20px_rgba(168,85,247,0.28)]",
                )}
              >
                Let&apos;s Connect
                <ArrowUpRight className="h-4 w-4" />
              </a>

              <div className="rounded-full border border-white/35 bg-white/35 px-4 py-2 text-sm text-slate-600 backdrop-blur-md">
                Scalable systems. Elegant execution.
              </div>
            </m.div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
