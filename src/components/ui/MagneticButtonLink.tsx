"use client";

import type { HTMLMotionProps } from "framer-motion";
import { m, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

import { cn } from "@/lib/utils";

type MagneticButtonLinkProps = HTMLMotionProps<"a"> & {
  variant?: "dark" | "light";
  magneticStrength?: number;
};

export function MagneticButtonLink({
  children,
  className,
  variant = "dark",
  magneticStrength = 0.18,
  onPointerLeave,
  onPointerMove,
  ...props
}: MagneticButtonLinkProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, {
    damping: 18,
    stiffness: 240,
    mass: 0.28,
  });
  const smoothY = useSpring(y, {
    damping: 18,
    stiffness: 240,
    mass: 0.28,
  });

  return (
    <m.a
      {...props}
      className={cn(
        "button-interactive inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold",
        variant === "dark"
          ? "bg-slate-950 text-white shadow-[0_18px_48px_-18px_rgba(15,23,42,0.72)] [--button-glow-0:rgba(255,255,255,0.12)] [--button-glow-1:rgba(96,165,250,0.34)] [--button-glow-2:rgba(168,85,247,0.28)] [--button-glow-3:rgba(34,197,94,0.14)]"
          : "bg-white text-slate-950 shadow-[0_18px_54px_-18px_rgba(96,165,250,0.22)] [--button-glow-0:rgba(255,255,255,0.28)] [--button-glow-1:rgba(96,165,250,0.28)] [--button-glow-2:rgba(168,85,247,0.22)] [--button-glow-3:rgba(255,255,255,0.2)]",
        className,
      )}
      style={shouldReduceMotion ? undefined : { x: smoothX, y: smoothY }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
      onPointerMove={(event) => {
        onPointerMove?.(event);

        if (shouldReduceMotion || event.pointerType === "touch") {
          return;
        }

        const bounds = event.currentTarget.getBoundingClientRect();
        const offsetX = event.clientX - bounds.left - bounds.width / 2;
        const offsetY = event.clientY - bounds.top - bounds.height / 2;

        x.set(offsetX * magneticStrength);
        y.set(offsetY * magneticStrength);
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event);
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </m.a>
  );
}
