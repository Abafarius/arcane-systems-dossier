import type { Variants } from "framer-motion";
import { motionTokens } from "../design-system/tokens/motion";

export const pageTransition = {
  duration: 0.46,
  ease: motionTokens.ease.standard,
};

export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 24,
    scale: 0.985,
    rotateX: 1.2,
    filter: "blur(12px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: "blur(0px)",
    transition: pageTransition,
  },
  exit: {
    opacity: 0,
    y: -16,
    scale: 0.992,
    filter: "blur(10px)",
    transition: { duration: 0.24, ease: motionTokens.ease.standard },
  },
};

export const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 26,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: motionTokens.duration.slow,
      ease: motionTokens.ease.standard,
    },
  },
};

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.04,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: motionTokens.duration.normal,
      ease: motionTokens.ease.standard,
    },
  },
};

export const filterContentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
    scale: 0.99,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: motionTokens.duration.normal,
      ease: motionTokens.ease.standard,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.99,
    filter: "blur(6px)",
    transition: { duration: motionTokens.duration.fast },
  },
};
