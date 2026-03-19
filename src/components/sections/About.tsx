"use client";

import { m } from "framer-motion";

import { cn, sectionCardClassName, sectionClassName } from "@/lib/utils";
import { fadeUp, sectionMotionProps, staggerContainer } from "@/styles/animations";

export function About() {
  return (
    <section id="about" className={sectionClassName}>
      <m.div
        variants={staggerContainer}
        {...sectionMotionProps}
        className={cn(
          sectionCardClassName,
          "mx-auto max-w-4xl px-8 py-14 text-center sm:px-12 sm:py-16",
        )}
      >
        <m.div variants={fadeUp} className="space-y-5">
          <p className="section-eyebrow text-slate-500">
            About
          </p>
          <h2 className="section-title mx-auto text-slate-950">
            About
          </h2>
          <p className="section-body mx-auto text-slate-600">
            Full-stack developer and SaaS builder focused on scalable systems,
            automation, and AI-driven solutions.
          </p>
        </m.div>
      </m.div>
    </section>
  );
}
