"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = [headingRef.current, leftRef.current, rightRef.current];

    if (reduce) {
      gsap.set(targets, { autoAlpha: 1, x: 0, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // Content slides into place from the top and both sides as you scroll —
      // the "settle into position" reveal over the static night backdrop.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          end: "top 15%",
          scrub: 0.6,
        },
      });

      tl.from(
        headingRef.current,
        { yPercent: -70, autoAlpha: 0, ease: "power2.out", duration: 0.5 },
        0,
      )
        .from(
          leftRef.current,
          { xPercent: -55, autoAlpha: 0, ease: "power2.out", duration: 0.55 },
          0.12,
        )
        .from(
          rightRef.current,
          { xPercent: 55, autoAlpha: 0, ease: "power2.out", duration: 0.55 },
          0.24,
        )
        .to({}, { duration: 0.5 });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-[1] h-[170svh] w-full"
    >
      <div className="sticky top-0 flex h-[100svh] w-full items-center overflow-hidden">
        {/* Side scrims for legibility — keep the centre (the figure) clear */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-[42%] bg-[linear-gradient(90deg,rgba(2,6,23,0.82)_0%,rgba(2,6,23,0.35)_55%,transparent_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-[42%] bg-[linear-gradient(270deg,rgba(2,6,23,0.82)_0%,rgba(2,6,23,0.35)_55%,transparent_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[38%] bg-[linear-gradient(180deg,rgba(2,6,23,0.6)_0%,transparent_100%)]"
        />

        {/* Heading — top, over the open sky */}
        <div
          ref={headingRef}
          className="absolute inset-x-0 top-[9%] px-6 text-center"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-white/55">
            About
          </p>
          <h2 className="mx-auto mt-4 max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.055em] text-white drop-shadow-[0_2px_24px_rgba(2,6,23,0.7)] sm:text-5xl lg:text-6xl">
            Building{" "}
            <span className="bg-gradient-to-r from-sky-300 via-violet-300 to-cyan-200 bg-clip-text text-transparent">
              systems
            </span>
            , not just code.
          </h2>
        </div>

        {/* Left column — flanks the figure on the left */}
        <div
          ref={leftRef}
          className="absolute bottom-[16%] left-6 max-w-[19rem] text-left sm:bottom-auto sm:left-[5%] sm:top-1/2 sm:max-w-sm sm:-translate-y-1/2"
        >
          <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-200/80">
            <span className="h-px w-6 bg-sky-300/60" />
            Who I am
          </span>
          <p className="text-base leading-7 text-white/85 drop-shadow-[0_2px_20px_rgba(2,6,23,0.8)] sm:text-lg sm:leading-8">
            A full-stack engineer and SaaS builder focused on scalable systems
            that solve real business problems — architectures, automation, and{" "}
            <span className="font-semibold text-white">AI-driven products</span>{" "}
            that run as real products, not prototypes.
          </p>
        </div>

        {/* Right column — flanks the figure on the right */}
        <div
          ref={rightRef}
          className="absolute right-6 top-[16%] max-w-[19rem] text-right sm:right-[5%] sm:top-auto sm:bottom-[20%] sm:max-w-sm"
        >
          <span className="mb-3 inline-flex items-center justify-end gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-200/80">
            What I build
            <span className="h-px w-6 bg-violet-300/60" />
          </span>
          <p className="text-base leading-7 text-white/85 drop-shadow-[0_2px_20px_rgba(2,6,23,0.8)] sm:text-lg sm:leading-8">
            CRM systems, automation engines, and multi-tenant platforms that
            help businesses{" "}
            <span className="font-semibold text-white">scale efficiently</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
