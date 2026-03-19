"use client";

import { ArrowUpRight } from "lucide-react";
import { m } from "framer-motion";

import { cn, glassPanelClassName, sectionClassName } from "@/lib/utils";
import { fadeUp, sectionMotionProps, staggerContainer } from "@/styles/animations";

const impactStatements = [
  "Built scalable SaaS platforms used across multiple clients",
  "Designed multi-tenant systems with real-time communication",
  "Integrated AI to automate business operations",
  "Developed CRM systems with messaging and workflow automation",
];

export function Impact() {
  return (
    <section id="impact" className={sectionClassName}>
      <m.div
        variants={staggerContainer}
        {...sectionMotionProps}
        className={cn(
          glassPanelClassName,
          "overflow-hidden rounded-[2rem] p-6 sm:p-10 lg:p-14",
        )}
      >
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.35fr] lg:gap-14">
          <m.div variants={fadeUp} className="space-y-5">
            <p className="section-eyebrow text-slate-500">Impact</p>
            <h2 className="section-title text-slate-950">
              Capability That Translates Into Real Systems
            </h2>
            <p className="section-body max-w-[40rem] text-slate-600">
              The focus is not vanity metrics. It&apos;s building technical
              systems that improve execution, communication, and operational
              leverage.
            </p>
          </m.div>

          <m.div variants={fadeUp} className="space-y-4">
            {impactStatements.map((statement) => (
              <div
                key={statement}
                className="flex items-start gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.22] px-5 py-5 backdrop-blur-md"
              >
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.24] text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
                <p className="max-w-[42rem] text-lg font-medium leading-8 tracking-[-0.025em] text-slate-800">
                  {statement}
                </p>
              </div>
            ))}
          </m.div>
        </div>
      </m.div>
    </section>
  );
}
