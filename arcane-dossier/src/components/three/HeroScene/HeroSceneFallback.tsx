interface HeroSceneFallbackProps {
  reason?: "loading" | "reduced-motion" | "disabled";
  compact?: boolean;
}

const fallbackCopy = {
  loading: "Loading lightweight 3D archive scene...",
  "reduced-motion": "Reduced motion is active. The interactive scene is replaced with a static archive core visual.",
  disabled: "3D hero scene is disabled by feature flag. Static archive core fallback is active.",
} as const;

const fallbackPills = ["Static-first", "RAG-ready", "Local AI path", "Design tokens"] as const;

export function HeroSceneFallback({ reason = "loading", compact = false }: HeroSceneFallbackProps) {
  return (
    <div
      className={
        compact
          ? "absolute inset-0 overflow-hidden rounded-[2rem] border border-white/[0.11] bg-[linear-gradient(145deg,rgba(19,22,38,0.88),rgba(8,9,20,0.96))]"
          : "relative min-h-[460px] overflow-hidden rounded-[2rem] border border-white/[0.11] bg-[linear-gradient(145deg,rgba(19,22,38,0.88),rgba(8,9,20,0.96))] shadow-[0_30px_100px_rgba(0,0,0,0.45)] sm:min-h-[520px]"
      }
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(216,168,79,0.22),transparent_20rem),radial-gradient(circle_at_65%_65%,rgba(143,108,255,0.22),transparent_18rem)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:42px_42px]" />

      <div className="absolute left-1/2 top-[43%] size-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(216,168,79,0.35)] bg-[rgba(216,168,79,0.08)] shadow-[0_0_120px_rgba(216,168,79,0.22)]" />
      <div className="absolute left-1/2 top-[43%] size-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(143,108,255,0.18)]" />
      <div className="absolute left-[16%] top-[22%] h-px w-[68%] rotate-12 bg-gradient-to-r from-transparent via-[rgba(216,168,79,0.42)] to-transparent" />
      <div className="absolute left-[22%] top-[66%] h-px w-[58%] -rotate-12 bg-gradient-to-r from-transparent via-[rgba(143,108,255,0.42)] to-transparent" />

      <div className="relative z-10 flex min-h-[460px] flex-col justify-between p-5 sm:min-h-[520px] sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-accent-gold)]">
              Arcane Archive Core
            </p>
            <p className="mt-2 max-w-sm text-xs leading-5 text-[var(--color-text-secondary)]">
              {fallbackCopy[reason]}
            </p>
          </div>
          <div className="rounded-full border border-[rgba(110,231,168,0.28)] bg-[rgba(110,231,168,0.09)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-success)]">
            Fallback ready
          </div>
        </div>

        <div className="mt-auto grid gap-2 sm:grid-cols-2">
          {fallbackPills.map((pill) => (
            <div key={pill} className="rounded-xl border border-white/[0.08] bg-white/[0.045] px-3 py-2 text-sm text-[var(--color-text-primary)] backdrop-blur-sm">
              {pill}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
