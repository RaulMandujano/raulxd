import type { Transition, Variants, ViewportOptions } from "framer-motion";

export const smoothEase = [0.22, 1, 0.36, 1] as const;

export const smoothTransition: Transition = {
  duration: 0.8,
  ease: smoothEase,
};

export const fastTransition: Transition = {
  duration: 0.34,
  ease: smoothEase,
};

export const sectionViewport: ViewportOptions = {
  once: true,
  amount: 0.25,
};

export const heroMotionProps = {
  initial: "hidden",
  animate: "visible",
} as const;

export const sectionMotionProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: sectionViewport,
} as const;

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.1,
    },
  },
};

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothTransition,
  },
};

export const hoverLiftProps = {
  whileHover: {
    scale: 1.02,
    y: -4,
  },
  transition: fastTransition,
} as const;
