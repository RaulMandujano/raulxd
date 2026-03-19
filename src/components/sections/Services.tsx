"use client";

import type { LucideIcon } from "lucide-react";
import { Bot, Megaphone, Workflow } from "lucide-react";
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

type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
  badge: string;
  accentClassName: string;
  indicators: string[];
};

const services: Service[] = [
  {
    title: "AI Sales Assistant",
    description:
      "Automates lead follow-ups and conversations",
    icon: Bot,
    badge: "Revenue System",
    accentClassName: "from-sky-300/70 via-cyan-300/55 to-transparent",
    indicators: ["Lead scoring", "Smart replies", "Meeting routing"],
  },
  {
    title: "AI Social Manager",
    description:
      "Creates and manages content across platforms",
    icon: Megaphone,
    badge: "Content Engine",
    accentClassName: "from-violet-300/70 via-fuchsia-300/50 to-transparent",
    indicators: ["Content generation", "Scheduling", "Channel insights"],
  },
  {
    title: "AI Operations Engine",
    description:
      "Automates workflows and internal processes",
    icon: Workflow,
    badge: "Ops Layer",
    accentClassName: "from-emerald-300/70 via-teal-300/55 to-transparent",
    indicators: ["Workflow triggers", "Internal handoffs", "Process monitoring"],
  },
];

export function Services() {
  return (
    <section id="services" className={sectionClassName}>
      <m.div
        variants={staggerContainer}
        {...sectionMotionProps}
        className={cn(
          glassPanelClassName,
          "overflow-hidden rounded-[2rem] p-6 sm:p-10 lg:p-14",
        )}
      >
        <m.div variants={fadeUp} className="mx-auto max-w-3xl text-center">
          <p className="section-eyebrow text-slate-500">
            Ecosystem
          </p>
          <h2 className="section-title mx-auto mt-4 text-slate-950">
            AI Systems I Build
          </h2>
          <p className="section-body mx-auto mt-4 text-slate-600">
            Connected AI products designed to handle acquisition, content, and
            operations as one unified product ecosystem.
          </p>
        </m.div>

        <m.div
          variants={staggerContainer}
          className="mt-10 grid gap-5 xl:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <m.article
                key={service.title}
                variants={fadeUp}
                {...hoverLiftProps}
                className={cn(
                  glassPanelClassName,
                  glassHoverClassName,
                  "group relative overflow-hidden rounded-[1.75rem] p-6 sm:p-7",
                )}
              >
                <div
                  className={cn(
                    "absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-0 transition group-hover:opacity-100",
                    service.accentClassName,
                  )}
                />
                <div
                  className={cn(
                    "absolute right-[-10%] top-[-12%] h-36 w-36 rounded-full blur-3xl transition-opacity duration-500",
                    service.accentClassName,
                    "opacity-45 group-hover:opacity-70",
                  )}
                />

                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-[linear-gradient(135deg,rgba(255,255,255,0.45),rgba(224,242,254,0.24))] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                    <Icon className="h-6 w-6 text-slate-900" />
                  </div>

                  <span className="rounded-full border border-white/15 bg-white/25 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600 backdrop-blur-md">
                    {service.badge}
                  </span>
                </div>

                <div className="relative mt-8 space-y-3">
                  <h3 className="max-w-[18rem] text-[1.65rem] font-semibold tracking-[-0.04em] text-slate-950">
                    {service.title}
                  </h3>
                  <p className="max-w-[24rem] text-base leading-7 text-slate-600">
                    {service.description}
                  </p>
                </div>

                <div className="relative mt-6 rounded-[1.35rem] border border-white/10 bg-white/[0.24] p-4 backdrop-blur-md">
                  <div className="grid gap-2">
                    {service.indicators.map((indicator) => (
                      <div
                        key={indicator}
                        className="flex items-center gap-3 rounded-xl bg-white/[0.18] px-3 py-2"
                      >
                        <span
                          className={cn(
                            "h-2.5 w-2.5 rounded-full bg-gradient-to-r",
                            service.accentClassName,
                          )}
                        />
                        <span className="text-sm font-medium text-slate-700">
                          {indicator}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative mt-5 flex items-end gap-2">
                  <div className="flex-1 rounded-t-2xl bg-slate-950/12" style={{ height: "2.2rem" }} />
                  <div className="flex-1 rounded-t-2xl bg-slate-950/18" style={{ height: "3.1rem" }} />
                  <div className="flex-1 rounded-t-2xl bg-slate-950/14" style={{ height: "2.6rem" }} />
                  <div className="flex-1 rounded-t-2xl bg-slate-950/20" style={{ height: "3.8rem" }} />
                </div>
              </m.article>
            );
          })}
        </m.div>
      </m.div>
    </section>
  );
}
