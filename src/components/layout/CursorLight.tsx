"use client";

import { useEffect, useState } from "react";
import {
  m,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

export function CursorLight() {
  const shouldReduceMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const pointerX = useMotionValue(-240);
  const pointerY = useMotionValue(-240);
  const glowX = useSpring(pointerX, {
    damping: 28,
    stiffness: 180,
    mass: 0.3,
  });
  const glowY = useSpring(pointerY, {
    damping: 28,
    stiffness: 180,
    mass: 0.3,
  });

  const translateX = useMotionTemplate`calc(${glowX}px - 16rem)`;
  const translateY = useMotionTemplate`calc(${glowY}px - 16rem)`;

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const updateDesktopState = () => {
      setIsDesktop(mediaQuery.matches);
    };

    updateDesktopState();
    mediaQuery.addEventListener("change", updateDesktopState);

    return () => {
      mediaQuery.removeEventListener("change", updateDesktopState);
    };
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!isDesktop || shouldReduceMotion) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
    };

    const handlePointerLeave = () => {
      pointerX.set(-240);
      pointerY.set(-240);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [isDesktop, pointerX, pointerY, shouldReduceMotion]);

  if (!isDesktop || shouldReduceMotion) {
    return null;
  }

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1]">
      <m.div
        className="absolute h-[32rem] w-[32rem] rounded-full opacity-60 blur-3xl"
        style={{
          x: translateX,
          y: translateY,
          background:
            "radial-gradient(circle, rgba(96,165,250,0.12) 0%, rgba(168,85,247,0.09) 34%, rgba(15,23,42,0.04) 56%, transparent 74%)",
        }}
      />
    </div>
  );
}
