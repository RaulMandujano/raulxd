"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  m,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import { MagneticButtonLink } from "@/components/ui/MagneticButtonLink";
import { SystemConsole } from "@/components/ui/SystemConsole";
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

function ConsolePreview() {
  return (
    <m.div
      variants={fadeUp}
      className="relative flex w-full justify-center lg:justify-end lg:-mr-10"
    >
      <div className="absolute left-[18%] top-[18%] h-28 w-56 rounded-full bg-sky-400/16 blur-3xl" />
      <div className="absolute right-[14%] top-[18%] h-44 w-44 rounded-full bg-violet-400/12 blur-3xl" />

      <div className="w-full max-w-[420px] rounded-[2rem] border border-white/15 bg-white/[0.18] p-3 shadow-[0_36px_100px_-48px_rgba(15,23,42,0.52)] backdrop-blur-xl">
        <SystemConsole />
      </div>
    </m.div>
  );
}

export function Hero() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const heroProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 22,
    mass: 0.28,
  });
  const contentY = useTransform(heroProgress, [0, 1], [0, -56]);
  const contentOpacity = useTransform(heroProgress, [0, 1], [1, 0.8]);
  const ambientScale = useTransform(heroProgress, [0, 1], [1, 1.08]);
  const shellPadding = useTransform(heroProgress, [0, 1], ["0px", "24px"]);
  const shellScale = useTransform(heroProgress, [0, 1], [1, 0.92]);
  const shellRadius = useTransform(heroProgress, [0, 1], ["0px", "24px"]);
  const shellShadow = useTransform(
    heroProgress,
    [0, 1],
    [
      "0 0 0 rgba(15,23,42,0)",
      "0 24px 60px -20px rgba(15,23,42,0.24), 0 42px 140px -44px rgba(15,23,42,0.24)",
    ],
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-[150svh]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <m.div
          className="mx-auto h-full w-full"
          style={
            shouldReduceMotion
              ? undefined
              : {
                  paddingLeft: shellPadding,
                  paddingRight: shellPadding,
                  paddingTop: shellPadding,
                  paddingBottom: shellPadding,
                  scale: shellScale,
                }
          }
        >
          <m.div
            className={cn(
              "relative isolate h-full overflow-hidden border border-white/60",
              "bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(238,242,255,0.84)_34%,rgba(224,231,255,0.68)_58%,rgba(15,23,42,0.12)_100%)]",
            )}
            style={
              shouldReduceMotion
                ? undefined
                : {
                    borderRadius: shellRadius,
                    boxShadow: shellShadow,
                    transformOrigin: "center center",
                  }
            }
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.2),transparent_28%),radial-gradient(circle_at_78%_20%,rgba(168,85,247,0.18),transparent_28%),radial-gradient(circle_at_70%_75%,rgba(15,23,42,0.16),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent)]" />
            <m.div
              className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-sky-300/28 blur-3xl"
              style={shouldReduceMotion ? undefined : { scale: ambientScale }}
            />
            <m.div
              className="absolute right-[-4%] top-[20%] h-80 w-80 rounded-full bg-violet-300/18 blur-3xl"
              style={shouldReduceMotion ? undefined : { scale: ambientScale }}
            />
            <m.div
              className="absolute bottom-[-8%] left-[34%] h-52 w-52 rounded-full bg-white/50 blur-3xl"
              style={shouldReduceMotion ? undefined : { scale: ambientScale }}
            />
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
              className="relative flex h-full items-center px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24"
              style={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: contentY,
                      opacity: contentOpacity,
                    }
              }
            >
              <div className="mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[1fr_1fr] lg:gap-20 xl:gap-24">
                <div className="max-w-5xl">
                  <m.div variants={fadeUp}>
                    <span className="inline-flex items-center rounded-full border border-white/45 bg-white/55 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-700 shadow-[0_12px_30px_-20px_rgba(15,23,42,0.45)] backdrop-blur-md">
                      AI &amp; SaaS Builder
                    </span>
                  </m.div>

                  <m.h1
                    variants={fadeUp}
                    className="mt-8 max-w-5xl text-5xl font-semibold tracking-[-0.075em] text-slate-950 sm:text-6xl lg:max-w-3xl lg:text-7xl lg:leading-[0.94]"
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
                    <MagneticButtonLink
                      href="#contact"
                      variant="dark"
                      className={cn(
                        "hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950/20",
                        "hover:shadow-[0_20px_60px_-16px_rgba(59,130,246,0.34),0_18px_50px_-20px_rgba(168,85,247,0.28)]",
                      )}
                    >
                      Let&apos;s Connect
                      <ArrowUpRight className="h-4 w-4" />
                    </MagneticButtonLink>

                    <div className="rounded-full border border-white/35 bg-white/35 px-4 py-2 text-sm text-slate-600 backdrop-blur-md">
                      Scalable systems. Elegant execution.
                    </div>
                  </m.div>
                </div>

                <ConsolePreview />
              </div>
            </m.div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
