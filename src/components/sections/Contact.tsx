"use client";

import { useRef } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { m, useScroll, useSpring, useTransform } from "framer-motion";

import { MagneticButtonLink } from "@/components/ui/MagneticButtonLink";
import { cn } from "@/lib/utils";

export function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
    mass: 0.32,
  });

  const backgroundScale = useTransform(smoothProgress, [0, 1], [0.85, 1.2]);
  const backgroundWidth = useTransform(smoothProgress, [0, 1], ["80%", "100%"]);
  const backgroundHeight = useTransform(smoothProgress, [0, 1], ["400px", "100vh"]);
  const backgroundRadius = useTransform(smoothProgress, [0, 1], ["40px", "0px"]);
  const contentOpacity = useTransform(smoothProgress, [0.12, 0.42, 1], [0, 1, 1]);
  const contentY = useTransform(smoothProgress, [0, 0.4], [36, 0]);
  const topFadeOpacity = useTransform(smoothProgress, [0, 0.45], [0.9, 0.18]);
  const glowOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.18, 0.34, 0.22]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-[180svh] w-full"
    >
      <m.div
        className="sticky top-0 flex h-screen items-center justify-center overflow-hidden"
      >
        <m.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#eef2ff] via-slate-900/58 to-transparent blur-2xl"
          style={{ opacity: topFadeOpacity }}
        />

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <m.div
            className="relative overflow-hidden bg-slate-950 shadow-[0_42px_160px_-42px_rgba(2,6,23,0.94)]"
            style={{
              width: backgroundWidth,
              height: backgroundHeight,
              borderRadius: backgroundRadius,
              scale: backgroundScale,
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(96,165,250,0.18),transparent_22%),radial-gradient(circle_at_72%_42%,rgba(168,85,247,0.14),transparent_28%),linear-gradient(180deg,rgba(15,23,42,0.08),rgba(2,6,23,0.22)_100%)]" />
            <m.div
              className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/14 blur-[110px]"
              style={{ opacity: glowOpacity }}
            />
            <m.div
              className="absolute inset-x-[18%] top-[30%] h-48 rounded-full bg-violet-400/10 blur-[96px]"
              style={{ opacity: glowOpacity }}
            />
          </m.div>
        </div>

        <m.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="relative z-10 mx-auto flex w-full max-w-xl items-center justify-center px-6 text-center sm:px-10"
        >
          <div className="space-y-5">
            <p className="section-eyebrow text-slate-400">
              Contact
            </p>
            <h2 className="section-title mx-auto text-white">
              Let&apos;s build something impactful.
            </h2>
            <p className="section-body mx-auto text-slate-300">
              Open to building ambitious SaaS products, AI systems, and
              automation-first platforms with real business value.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 pt-5 sm:flex-row">
              <MagneticButtonLink
                href="https://wa.me/18016027150?text=Hi%20Evano%20Development%2C%20I%27d%20like%20to%20connect."
                target="_blank"
                rel="noreferrer"
                aria-label="Send a WhatsApp message to +1 801 602 7150"
                variant="dark"
                className={cn(
                  "bg-[#25D366] !text-white hover:-translate-y-0.5 hover:bg-[#20bd5a] hover:!text-white focus:outline-none focus:ring-2 focus:ring-[#25D366]/40",
                  "shadow-[0_18px_48px_-18px_rgba(37,211,102,0.58)] [--button-glow-0:rgba(255,255,255,0.12)] [--button-glow-1:rgba(37,211,102,0.42)] [--button-glow-2:rgba(16,185,129,0.28)] [--button-glow-3:rgba(255,255,255,0.1)]",
                  "hover:shadow-[0_22px_64px_-18px_rgba(37,211,102,0.62),0_18px_48px_-20px_rgba(16,185,129,0.34)]",
                )}
              >
                WhatsApp
                <MessageCircle className="h-4 w-4" />
              </MagneticButtonLink>

              <a
                href="mailto:customer@evanodevelopment.com"
                className="interactive-link inline-flex items-center gap-2 text-sm font-medium !text-white hover:!text-white focus-visible:!text-white"
              >
                <Mail className="h-4 w-4" />
                customer@evanodevelopment.com
              </a>
            </div>
          </div>
        </m.div>
      </m.div>
    </section>
  );
}
