"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import {
  animate,
  m,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import type { GithubStats } from "@/lib/github";
import {
  cn,
  glassHoverClassName,
  glassPanelClassName,
  sectionClassName,
} from "@/lib/utils";
import { fadeUp, sectionMotionProps, staggerContainer } from "@/styles/animations";

const levelClassName: Record<number, string> = {
  0: "bg-slate-300/40",
  1: "bg-sky-300/70",
  2: "bg-sky-400/80",
  3: "bg-violet-400/80",
  4: "bg-violet-500",
};

const columnVariants: Variants = {
  hidden: {},
  visible: (week: number) => ({
    transition: { delayChildren: week * 0.012, staggerChildren: 0.004 },
  }),
};

const cellVariants: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (shouldReduceMotion) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, value, shouldReduceMotion]);

  return (
    <span ref={ref}>
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

type Stat = { label: string; value: number; suffix?: string };

export function GithubActivityView({ stats }: { stats: GithubStats }) {
  const yearsActive = Math.max(1, new Date().getFullYear() - stats.memberSince);

  const metrics: Stat[] = [
    { label: "Contributions this year", value: stats.totalContributions },
    { label: "Active days", value: stats.activeDays },
    { label: "Public repositories", value: stats.publicRepos },
    { label: "Years on GitHub", value: yearsActive, suffix: "+" },
  ];

  return (
    <section id="github" className={sectionClassName}>
      <m.div
        variants={staggerContainer}
        {...sectionMotionProps}
        className={cn(
          glassPanelClassName,
          "overflow-hidden rounded-[2rem] p-6 sm:p-10 lg:p-14",
        )}
      >
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <m.div variants={fadeUp} className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/20 bg-white/30 text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-md">
                <Github className="h-5 w-5" />
              </span>
              <p className="section-eyebrow text-slate-500">Open Source</p>
            </div>

            <h2 className="section-title text-slate-950">
              Shipping code, week after week
            </h2>
            <p className="section-body max-w-[40rem] text-slate-600">
              I build in the open and stay consistent — real commits across SaaS
              platforms, AI tools and client products, not just weekend
              experiments.
            </p>

            <a
              href={stats.profileUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(
                glassPanelClassName,
                glassHoverClassName,
                "interactive-link inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-slate-900",
              )}
            >
              <Github className="h-4 w-4" />@{stats.username}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </m.div>

          <m.div
            variants={fadeUp}
            className={cn(
              glassPanelClassName,
              "rounded-[1.75rem] p-5 sm:p-7",
            )}
          >
            {stats.weeks.length > 0 && (
              <>
                <div className="mb-5 [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
                  <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <m.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                      className="flex min-w-max gap-[3px]"
                    >
                      {stats.weeks.map((week, weekIndex) => (
                        <m.div
                          key={weekIndex}
                          custom={weekIndex}
                          variants={columnVariants}
                          className="flex flex-col gap-[3px]"
                        >
                          {week.map((level, dayIndex) => (
                            <m.span
                              key={dayIndex}
                              variants={cellVariants}
                              className={cn(
                                "h-[11px] w-[11px] rounded-[3px]",
                                levelClassName[level] ?? levelClassName[0],
                              )}
                            />
                          ))}
                        </m.div>
                      ))}
                    </m.div>
                  </div>
                </div>

                <div className="mb-6 flex items-center justify-end gap-2 text-[11px] font-medium text-slate-400">
                  <span>Less</span>
                  {[0, 1, 2, 3, 4].map((level) => (
                    <span
                      key={level}
                      className={cn(
                        "h-[10px] w-[10px] rounded-[3px]",
                        levelClassName[level],
                      )}
                    />
                  ))}
                  <span>More</span>
                </div>
              </>
            )}

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.22] px-4 py-4 backdrop-blur-md"
                >
                  <p className="text-2xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-3xl">
                    <CountUp value={metric.value} suffix={metric.suffix} />
                  </p>
                  <p className="mt-1 text-[11px] font-medium leading-4 text-slate-500">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </m.div>
        </div>
      </m.div>
    </section>
  );
}
