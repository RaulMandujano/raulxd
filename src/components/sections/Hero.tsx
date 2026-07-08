"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { MagneticButtonLink } from "@/components/ui/MagneticButtonLink";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const DESKTOP = { dir: "desktop", count: 120 } as const;
const MOBILE = { dir: "mobile", count: 75 } as const;
const POSTER = "/hero-poster.webp";

// Fraction of the hero scroll spent scrubbing frames; the remainder holds the
// final night frame while the text lifts away and the page rises over it.
const SCRUB_FRACTION = 0.66;

const framePath = (dir: string, i: number) =>
  `/hero-frames/${dir}/frame_${String(i + 1).padStart(4, "0")}.webp`;

function sceneOpacity(
  p: number,
  inStart: number,
  inEnd: number,
  outStart: number,
  outEnd: number,
) {
  if (p <= inStart) return inStart === 0 ? 1 : 0;
  if (p < inEnd) return (p - inStart) / (inEnd - inStart);
  if (p <= outStart) return 1;
  if (p < outEnd) return 1 - (p - outStart) / (outEnd - outStart);
  return 0;
}

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scene1Ref = useRef<HTMLDivElement | null>(null);
  const scene2Ref = useRef<HTMLDivElement | null>(null);
  const scene3Ref = useRef<HTMLDivElement | null>(null);

  const [ready, setReady] = useState(false);
  const [staticMode, setStaticMode] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    const saveData = Boolean(connection?.saveData);
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const set = isMobile ? MOBILE : DESKTOP;
    const isStatic = reduce || saveData;
    setStaticMode(isStatic);

    const images = new Array<HTMLImageElement | undefined>(set.count);
    let currentIndex = -1;
    let disposed = false;

    const drawCover = (img: HTMLImageElement) => {
      const cw = canvas.width;
      const ch = canvas.height;
      if (!cw || !ch) return;
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = cw / ch;
      let dw: number;
      let dh: number;
      if (ir > cr) {
        dh = ch;
        dw = ch * ir;
      } else {
        dw = cw;
        dh = cw / ir;
      }
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };

    const isLoaded = (img?: HTMLImageElement): img is HTMLImageElement =>
      Boolean(img && img.complete && img.naturalWidth > 0);

    const nearestLoaded = (index: number) => {
      for (let d = 0; d < set.count; d += 1) {
        if (isLoaded(images[index - d])) return images[index - d];
        if (isLoaded(images[index + d])) return images[index + d];
      }
      return undefined;
    };

    const renderIndex = (rawIndex: number) => {
      const index = Math.max(0, Math.min(set.count - 1, rawIndex));
      if (index === currentIndex) return;
      const img = isLoaded(images[index]) ? images[index] : nearestLoaded(index);
      if (img) {
        drawCover(img);
        currentIndex = index;
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      const img = images[Math.max(0, currentIndex)];
      if (isLoaded(img)) drawCover(img);
    };

    const poster = new Image();
    poster.onload = () => {
      if (currentIndex < 0) drawCover(poster);
    };
    poster.src = POSTER;

    resize();
    window.addEventListener("resize", resize);

    const setScene = (el: HTMLDivElement | null, opacity: number) => {
      if (!el) return;
      el.style.opacity = String(opacity);
      el.style.transform = `translate3d(0, ${(1 - opacity) * 18}px, 0)`;
      el.style.pointerEvents = opacity > 0.6 ? "auto" : "none";
    };

    // ---- Static path (reduced motion / data saver): final night scene only.
    if (isStatic) {
      setScene(scene1Ref.current, 0);
      setScene(scene2Ref.current, 0);
      setScene(scene3Ref.current, 1);
      const last = new Image();
      last.onload = () => {
        images[set.count - 1] = last;
        renderIndex(set.count - 1);
        if (!disposed) setReady(true);
      };
      last.onerror = () => {
        if (!disposed) setReady(true);
      };
      last.src = framePath(set.dir, set.count - 1);

      return () => {
        disposed = true;
        window.removeEventListener("resize", resize);
      };
    }

    // ---- Scrub path: preload the whole sequence (first frames prioritized).
    let loadedCount = 0;
    const bumpLoaded = () => {
      loadedCount += 1;
      if (!disposed && loadedCount >= Math.min(set.count, 12)) setReady(true);
    };
    for (let i = 0; i < set.count; i += 1) {
      const img = new Image();
      img.onload = () => {
        images[i] = img;
        if (i === 0) renderIndex(0);
        bumpLoaded();
      };
      img.onerror = bumpLoaded;
      img.src = framePath(set.dir, i);
      images[i] = img;
    }

    setScene(scene1Ref.current, 1);
    setScene(scene2Ref.current, 0);
    setScene(scene3Ref.current, 0);

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        // Frames + text play out over the first SCRUB_FRACTION of the hero;
        // the rest holds the night frame while the sticky text lifts away.
        const p = Math.min(1, self.progress / SCRUB_FRACTION);
        renderIndex(Math.round(p * (set.count - 1)));
        setScene(scene1Ref.current, sceneOpacity(p, 0, 0, 0.18, 0.28));
        setScene(scene2Ref.current, sceneOpacity(p, 0.4, 0.5, 0.62, 0.72));
        setScene(scene3Ref.current, sceneOpacity(p, 0.82, 0.9, 2, 2));
      },
    });

    const refreshTimeout = window.setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      disposed = true;
      window.clearTimeout(refreshTimeout);
      window.removeEventListener("resize", resize);
      trigger.kill();
    };
  }, []);

  return (
    <>
      {/* Fixed cinematic backdrop — sits behind the nav (full-bleed) and holds
          the final night frame while the page rises over it. */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 h-full w-full bg-slate-950 bg-cover bg-center"
        style={{ backgroundImage: `url(${POSTER})` }}
      />

      <section
        ref={sectionRef}
        id="hero"
        className={cn("relative z-[1] w-full", staticMode ? "h-[100svh]" : "h-[300svh]")}
      >
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
          {/* Legibility scrims */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.32)_0%,transparent_20%,transparent_54%,rgba(2,6,23,0.66)_100%)]"
          />

          {/* Loading state */}
          <div
            className={cn(
              "pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-slate-950 transition-opacity duration-700",
              ready ? "opacity-0" : "opacity-100",
            )}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/25 border-t-white" />
              <span className="text-xs font-medium uppercase tracking-[0.28em] text-white/60">
                Loading
              </span>
            </div>
          </div>

          {/* Scene text overlays — real DOM text (SEO-safe, selectable) */}
          <div className="absolute inset-0 z-10">
            {/* Scene 1 — day, close-up */}
            <div
              ref={scene1Ref}
              className="absolute inset-x-0 bottom-[14%] flex flex-col items-center px-6 text-center sm:bottom-[16%]"
            >
              <span className="mb-4 inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.26em] text-white/90 backdrop-blur-md">
                Raul Mandujano
              </span>
              <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.055em] text-white drop-shadow-[0_2px_24px_rgba(2,6,23,0.55)] sm:text-6xl lg:text-7xl">
                Let&apos;s build something.
              </h1>
              <p className="mt-4 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.24em] text-white/70">
                Scroll to begin
                <span className="inline-block h-4 w-px animate-pulse bg-white/60" />
              </p>
            </div>

            {/* Scene 2 — golden hour / dusk */}
            <div
              ref={scene2Ref}
              className="absolute inset-0 flex items-center justify-center px-6 opacity-0"
            >
              <h2 className="max-w-4xl text-center text-4xl font-semibold leading-[1.05] tracking-[-0.05em] text-white drop-shadow-[0_2px_24px_rgba(2,6,23,0.6)] sm:text-5xl lg:text-[3.75rem]">
                Building{" "}
                <span className="bg-gradient-to-r from-sky-300 via-violet-300 to-cyan-200 bg-clip-text text-transparent">
                  systems
                </span>
                , not just code.
              </h2>
            </div>

            {/* Scene 3 — night, full scene */}
            <div
              ref={scene3Ref}
              className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center opacity-0"
            >
              <span className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                Full-Stack Developer · SaaS &amp; AI
              </span>
              <p className="text-5xl font-semibold tracking-[-0.055em] text-white drop-shadow-[0_2px_24px_rgba(2,6,23,0.6)] sm:text-6xl lg:text-7xl">
                Raul Mandujano
              </p>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
                Building scalable products from the ground up — architecture, AI,
                and clean execution.
              </p>
              <div className="mt-9">
                <MagneticButtonLink
                  href="#contact"
                  variant="light"
                  className="hover:-translate-y-0.5"
                >
                  Let&apos;s Connect
                  <ArrowUpRight className="h-4 w-4" />
                </MagneticButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
