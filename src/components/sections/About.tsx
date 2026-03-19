"use client";

import { m } from "framer-motion";

import { cn, sectionClassName } from "@/lib/utils";
import { fadeUp, sectionMotionProps, staggerContainer } from "@/styles/animations";

export function About() {
  return (
    <section id="about" className={cn(sectionClassName, "py-24")}>
      <m.div
        variants={staggerContainer}
        {...sectionMotionProps}
        className={cn(
          "relative mx-auto max-w-3xl overflow-hidden text-center",
          "px-6 sm:px-8",
        )}
      >
        <div className="pointer-events-none absolute left-1/2 top-12 h-44 w-44 -translate-x-1/2 rounded-full bg-sky-300/16 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-[24%] top-24 h-28 rounded-full bg-violet-300/10 blur-3xl" />

        <m.div variants={fadeUp} className="relative space-y-6">
          <p className="section-eyebrow text-slate-500">
            About
          </p>
          <h2 className="mx-auto max-w-3xl text-[clamp(2.35rem,2rem+1.5vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-slate-950">
            Building{" "}
            <span className="animated-gradient-text">systems</span>, not just
            code
          </h2>
          <p className="mx-auto max-w-3xl text-base leading-8 text-slate-600 sm:text-lg sm:leading-9">
            I&apos;m a full-stack engineer and SaaS builder focused on creating
            scalable systems that solve real business problems. My work goes
            beyond writing code — I design architectures, automate workflows,
            and build <span className="animated-gradient-text">AI</span>-driven{" "}
            <span className="animated-gradient-text">SaaS</span> solutions that
            operate as real products, not just prototypes.
          </p>
          <p className="mx-auto max-w-2xl text-sm font-medium leading-7 tracking-[-0.02em] text-slate-700 sm:text-base">
            I specialize in CRM systems, automation engines, and multi-tenant
            platforms that help businesses scale efficiently.
          </p>
        </m.div>
      </m.div>
    </section>
  );
}
