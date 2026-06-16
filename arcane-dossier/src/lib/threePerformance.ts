export const threePerformance = {
  dpr: [1, 1.45] as [number, number],
  antialias: true,
  powerPreference: "high-performance" as const,
};

export function shouldPreferStaticVisual() {
  if (typeof window === "undefined") return false;
  const lowMemoryDevice = "deviceMemory" in navigator && Number((navigator as Navigator & { deviceMemory?: number }).deviceMemory) <= 4;
  const narrowViewport = window.innerWidth < 720;
  return lowMemoryDevice && narrowViewport;
}
