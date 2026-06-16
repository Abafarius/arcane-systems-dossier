import { Card } from "../../ui/Card";

interface HeroSceneFallbackProps {
  reason?: "loading" | "reduced-motion" | "disabled";
}

const fallbackCopy = {
  loading: "Loading lightweight 3D archive scene...",
  "reduced-motion": "Reduced motion mode is active. The 3D layer is replaced with a static premium visual.",
  disabled: "3D hero scene is disabled by feature flag. Static visual fallback is active.",
} as const;

export function HeroSceneFallback({ reason = "loading" }: HeroSceneFallbackProps) {
  return (
    <Card className="relative min-h-[430px] overflow-hidden p-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(216,168,79,0.2),transparent_22rem),radial-gradient(circle_at_65%_65%,rgba(143,108,255,0.2),transparent_18rem)]" />
      <div className="absolute left-1/2 top-1/2 size-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(216,168,79,0.35)] bg-[rgba(216,168,79,0.08)] shadow-[0_0_120px_rgba(216,168,79,0.24)]" />
      <div className="absolute left-[16%] top-[18%] h-px w-[68%] rotate-12 bg-gradient-to-r from-transparent via-[rgba(216,168,79,0.45)] to-transparent" />
      <div className="absolute left-[22%] top-[70%] h-px w-[58%] -rotate-12 bg-gradient-to-r from-transparent via-[rgba(143,108,255,0.45)] to-transparent" />
      <div className="relative z-10 flex min-h-[430px] flex-col justify-end p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-accent-gold)]">
          Live system concept
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
          Static-first portfolio with AI and interactive data layers.
        </h2>
        <p className="mt-4 text-sm leading-6 text-[var(--color-text-secondary)]">
          {fallbackCopy[reason]}
        </p>
      </div>
    </Card>
  );
}
