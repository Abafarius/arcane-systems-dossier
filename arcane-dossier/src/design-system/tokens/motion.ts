export const motionTokens = {
  duration: {
    fast: 0.18,
    normal: 0.32,
    slow: 0.62,
  },
  ease: {
    standard: [0.22, 1, 0.36, 1] as const,
    out: [0.16, 1, 0.3, 1] as const,
  },
  spring: {
    soft: { type: "spring", stiffness: 220, damping: 28 },
    snappy: { type: "spring", stiffness: 320, damping: 26 },
  },
} as const;
