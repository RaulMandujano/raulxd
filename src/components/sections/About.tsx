"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = [leftRef.current, rightRef.current];

    if (reduce) {
      gsap.set(targets, { autoAlpha: 1, x: 0, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // Content settles into place from the top and both sides as you scroll,
      // over the static night backdrop.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          end: "top 15%",
          scrub: 0.6,
        },
      });

      tl.from(
        leftRef.current,
        { xPercent: -45, autoAlpha: 0, ease: "power2.out", duration: 0.55 },
        0,
      )
        .from(
          rightRef.current,
          { xPercent: 45, autoAlpha: 0, ease: "power2.out", duration: 0.55 },
          0.18,
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
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Mobile scrim — the stacked copy sits over the figure, so darken it */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.6)_0%,rgba(2,6,23,0.35)_45%,rgba(2,6,23,0.72)_100%)] lg:hidden"
        />
        {/* Desktop side scrims — keep the centre (the figure) clear */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-[42%] bg-[linear-gradient(90deg,rgba(2,6,23,0.82)_0%,rgba(2,6,23,0.35)_55%,transparent_100%)] lg:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] bg-[linear-gradient(270deg,rgba(2,6,23,0.82)_0%,rgba(2,6,23,0.35)_55%,transparent_100%)] lg:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 hidden h-[38%] bg-[linear-gradient(180deg,rgba(2,6,23,0.6)_0%,transparent_100%)] lg:block"
        />

        {/* Content — stacked & centred on mobile, flanking the figure on sm+ */}
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-10 px-6 text-center lg:block lg:gap-0 lg:px-0">
          {/* Left column */}
          <div
            ref={leftRef}
            className="max-w-sm text-center lg:absolute lg:left-[5%] lg:top-1/2 lg:max-w-sm lg:-translate-y-1/2 lg:text-left"
          >
            <span className="mb-2.5 inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-200/80 lg:justify-start">
              <span className="h-px w-6 bg-sky-300/60" />
              Who I am
            </span>
            <p className="text-[15px] leading-7 text-white/85 drop-shadow-[0_2px_20px_rgba(2,6,23,0.85)] lg:text-lg lg:leading-8">
              A full-stack engineer and SaaS builder focused on scalable systems
              that solve real business problems — architectures, automation, and{" "}
              <span className="font-semibold text-white">AI-driven products</span>{" "}
              that run as real products, not prototypes.
            </p>
          </div>

          {/* Right column */}
          <div
            ref={rightRef}
            className="max-w-sm text-center lg:absolute lg:bottom-[20%] lg:right-[5%] lg:max-w-sm lg:text-right"
          >
            <span className="mb-2.5 inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-200/80 lg:justify-end">
              What I build
              <span className="h-px w-6 bg-violet-300/60" />
            </span>
            <p className="text-[15px] leading-7 text-white/85 drop-shadow-[0_2px_20px_rgba(2,6,23,0.85)] lg:text-lg lg:leading-8">
              CRM systems, automation engines, and multi-tenant platforms that
              help businesses{" "}
              <span className="font-semibold text-white">scale efficiently</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
