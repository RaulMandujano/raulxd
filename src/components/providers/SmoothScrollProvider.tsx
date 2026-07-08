"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import Lenis from "lenis";
import Snap from "lenis/snap";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

    return () => {
      removeAboutSnap?.();
      snap.destroy();
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  return children;
}
