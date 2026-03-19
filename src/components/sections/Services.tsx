"use client";

import type { LucideIcon } from "lucide-react";
import { Bot, Boxes, Layers3 } from "lucide-react";
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
};

const services: Service[] = [
  {
    title: "SaaS Development",
    description:
      "Modern product engineering for scalable platforms with fast, reliable user experiences.",
    icon: Boxes,
  },
  {
    title: "AI Automation",
    description:
      "Workflow automation and AI-powered tooling that reduce manual work and unlock operational leverage.",
    icon: Bot,
  },
  {
    title: "System Architecture",
    description:
      "Robust technical foundations designed for maintainability, performance, and long-term growth.",
    icon: Layers3,
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
        <m.div variants={fadeUp} className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow text-slate-500">
            Services
          </p>
          <h2 className="section-title mx-auto mt-4 text-slate-950">
            Services
          </h2>
          <p className="section-body mx-auto mt-4 text-slate-600">
            Focused capabilities for building modern products with strong
            technical foundations.
          </p>
        </m.div>

        <m.div
          variants={staggerContainer}
          className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
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
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/70 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-[linear-gradient(135deg,rgba(255,255,255,0.45),rgba(224,242,254,0.24))] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                  <Icon className="h-6 w-6 text-slate-900" />
                </div>

                <div className="mt-8 space-y-3">
                  <h3 className="max-w-[18rem] text-[1.65rem] font-semibold tracking-[-0.04em] text-slate-950">
                    {service.title}
                  </h3>
                  <p className="max-w-[24rem] text-base leading-7 text-slate-600">
                    {service.description}
                  </p>
                </div>
              </m.article>
            );
          })}
        </m.div>
      </m.div>
    </section>
  );
}
