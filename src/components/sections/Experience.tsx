"use client";

import { ArrowUpRight, Sparkles } from "lucide-react";
import { m, type Variants } from "framer-motion";

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

const experiences = [
  {
    eyebrow: "Experience",
    title: "Founder-Led Product Building",
    summary:
      "Co-Founder at Evano Development — building SaaS platforms, CRM systems, and AI-driven automation tools.",
    company: "Evano Development",
    role: "Co-Founder",
    highlights: [
      "Building SaaS platforms with scalable product foundations and fast iteration cycles.",
      "Designing CRM systems tailored to operational workflows and revenue teams.",
      "Shipping AI-driven automation tools that reduce manual work and increase execution speed.",
    ],
  },
];

const experienceItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.12,
    },
  },
};

export function Experience() {
  return (
    <section id="experience" className={sectionClassName}>
      <m.div
        variants={staggerContainer}
        {...sectionMotionProps}
        className={cn(
          glassPanelClassName,
          "relative overflow-hidden rounded-[2rem] p-6 sm:p-10 lg:p-14",
        )}
      >
        <div className="absolute bottom-14 left-1/2 top-14 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-slate-300/70 to-transparent lg:block" />

        <div className="space-y-12 lg:space-y-16">
          {experiences.map((experience, index) => (
            <m.div
              key={`${experience.company}-${experience.role}`}
              variants={experienceItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className={cn(
                "relative grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16",
                index % 2 !== 0 && "lg:[&>*:first-child]:order-2",
              )}
            >
              <div className="absolute left-1/2 top-1/2 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 bg-white shadow-[0_0_0_6px_rgba(255,255,255,0.24)] lg:block" />
              <div className="absolute left-1/2 top-1/2 hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400 lg:block" />

              <m.div variants={fadeUp} className="space-y-5">
                <p className="section-eyebrow text-slate-500">
                  {experience.eyebrow}
                </p>
                <h2 className="section-title text-slate-950">
                  {experience.title}
                </h2>
                <p className="section-body max-w-[40rem] text-slate-600">
                  {experience.summary}
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
                        {experience.company}
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-slate-500">
                        {experience.role}
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>

                    <ul className="space-y-4">
                      {experience.highlights.map((highlight) => (
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
            </m.div>
          ))}
        </div>
      </m.div>
    </section>
  );
}
