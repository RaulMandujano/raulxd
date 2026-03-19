"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import { m } from "framer-motion";

import { cn, sectionClassName } from "@/lib/utils";
import { fadeUp, sectionMotionProps, staggerContainer } from "@/styles/animations";

export function Contact() {
  return (
    <section id="contact" className={cn(sectionClassName, "pb-20 sm:pb-24")}>
      <m.div
        variants={staggerContainer}
        {...sectionMotionProps}
        className={cn(
          "mx-auto max-w-4xl overflow-hidden rounded-[2rem] px-6 py-14 text-center",
          "border border-slate-950/10 bg-slate-950 text-white shadow-[0_32px_100px_-44px_rgba(15,23,42,0.72)]",
          "sm:px-10 sm:py-16 lg:px-14 lg:py-20",
        )}
      >
        <m.div variants={fadeUp} className="space-y-5">
          <p className="section-eyebrow text-slate-300">
            Contact
          </p>
          <h2 className="section-title mx-auto text-white">
            Contact
          </h2>
          <p className="section-body mx-auto text-slate-300">
            Let&apos;s build something impactful.
          </p>
        </m.div>

        <m.div
          variants={fadeUp}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="mailto:hello@example.com"
            className={cn(
              "button-glow inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-950",
              "hover:-translate-y-0.5 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white/30",
              "hover:shadow-[0_18px_54px_-18px_rgba(96,165,250,0.28),0_14px_40px_-18px_rgba(255,255,255,0.3)]",
            )}
          >
            Get in Touch
            <ArrowUpRight className="h-4 w-4" />
          </a>

          <a
            href="mailto:hello@example.com"
            className="interactive-link inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white"
          >
            <Mail className="h-4 w-4" />
            hello@example.com
          </a>
        </m.div>
      </m.div>
    </section>
  );
}
