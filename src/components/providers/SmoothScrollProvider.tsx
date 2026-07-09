"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import Lenis from "lenis";
import Snap from "lenis/snap";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { SCENE_SNAP_PROGRESS, SCRUB_FRACTION } from "@/lib/heroTimeline";

gsap.registerPlugin(ScrollTrigger);

type SmoothScrollProviderProps = {
  children: ReactNode;
};

export function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      return;
    }

    // Drive Lenis from GSAP's ticker (autoRaf off) and keep ScrollTrigger in
    // sync on every Lenis scroll, so pinned/scrubbed triggers (the hero) stay
    // jitter-free with the smooth-scroll layer.
    const lenis = new Lenis({
      autoRaf: false,
      anchors: true,
      lerp: 0.085,
      stopInertiaOnNavigate: true,
      syncTouch: false,
      wheelMultiplier: 0.95,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Gentle scroll-snap: once the hero video finishes and the user scrolls
    // down, the scroll "settles" onto the About section. Proximity type with a
    // single snap point (About) keeps the rest of the page free-scrolling.
    const snap = new Snap(lenis, {
      type: "proximity",
      duration: 0.9,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      distanceThreshold: "40%",
      debounce: 400,
    });

    let removeAboutSnap: (() => void) | undefined;
    const aboutEl = document.querySelector<HTMLElement>("#about");
    if (aboutEl) {
      removeAboutSnap = snap.addElement(aboutEl, {
        align: ["start"],
        ignoreSticky: true,
      });
    }

    // Snap to each hero message so scrolling settles exactly on the frame where
    // the message reads — a deliberate, slide-by-slide feel through the video.
    const heroEl = document.querySelector<HTMLElement>("#hero");
    let sceneRemovers: Array<() => void> = [];
    const addSceneSnaps = () => {
      sceneRemovers.forEach((remove) => remove());
      sceneRemovers = [];
      if (!heroEl) return;
      const heroTop = heroEl.getBoundingClientRect().top + window.scrollY;
      const scrubRange = heroEl.offsetHeight - window.innerHeight;
      const range = SCRUB_FRACTION * scrubRange; // scrollY where the night is held
      sceneRemovers = SCENE_SNAP_PROGRESS.map((p) =>
        snap.add(Math.round(heroTop + p * range)),
      );
    };
    addSceneSnaps();
    const onResize = () => addSceneSnaps();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      sceneRemovers.forEach((remove) => remove());
      removeAboutSnap?.();
      snap.destroy();
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  return children;
}
