"use client";

import { ArrowUpRight, Sparkles } from "lucide-react";
import { m } from "framer-motion";

import {
  cn,
  glassHoverClassName,
  glassPanelClassName,
  sectionClassName,
} from "@/lib/utils";
import {
  fadeUp,
  hoverLiftProps,
  sectionMotionProps,
  staggerContainer,
} from "@/styles/animations";

const highlights = [
  "Building SaaS platforms with scalable product foundations and fast iteration cycles.",
  "Designing CRM systems tailored to operational workflows and revenue teams.",
  "Shipping AI-driven automation tools that reduce manual work and increase execution speed.",
];

export function Experience() {
  return (
    <section id="experience" className={sectionClassName}>
      <m.div
        variants={staggerContainer}
        {...sectionMotionProps}
        className={cn(
          glassPanelClassName,
          "overflow-hidden rounded-[2rem] p-6 sm:p-10 lg:p-14",
        )}
      >
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.25fr] lg:gap-14">
          <m.div variants={fadeUp} className="space-y-5">
            <p className="section-eyebrow text-slate-500">
              Experience
            </p>
            <h2 className="section-title text-slate-950">
              Founder-Led Product Building
            </h2>
            <p className="section-body max-w-[40rem] text-slate-600">
              Co-Founder at Evano Development — building SaaS platforms, CRM
              systems, and AI-driven automation tools.
            </p>
          </m.div>

          <m.div
            variants={fadeUp}
            {...hoverLiftProps}
            className={cn(
              glassPanelClassName,
              glassHoverClassName,
              "relative rounded-[1.75rem] p-6 sm:p-8",
            )}
          >
            <div className="absolute bottom-8 left-8 top-8 w-px bg-gradient-to-b from-sky-300 via-slate-200 to-transparent" />

            <div className="relative pl-8">
              <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/30 text-sky-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-md">
                <Sparkles className="h-4 w-4" />
              </div>

              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-white/15 bg-white/28 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 backdrop-blur-md">
                    Evano Development
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-slate-500">
                    Co-Founder
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                <ul className="space-y-4">
                  {highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-3 text-base leading-7 text-slate-600"
                    >
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-slate-900" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </m.div>
        </div>
      </m.div>
    </section>
  );
}
