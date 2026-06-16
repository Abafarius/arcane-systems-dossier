import { useMemo, lazy, Suspense } from "react";
import { useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { HeroSceneFallback } from "../../components/three/HeroScene/HeroSceneFallback";
import { featureFlags } from "../../config/featureFlags";
import { siteConfig } from "../../config/site.config";

const LazyHeroScene = lazy(() =>
  import("../../components/three/HeroScene/HeroScene").then((module) => ({ default: module.HeroScene })),
);

function HeroVisual() {
  const prefersReducedMotion = useReducedMotion();
  const shouldRenderThree = useMemo(
    () => featureFlags.enableThreeHero && !prefersReducedMotion,
    [prefersReducedMotion],
  );

  if (!shouldRenderThree) {
    return (
      <HeroSceneFallback reason={featureFlags.enableThreeHero ? "reduced-motion" : "disabled"} />
    );
  }

  return (
    <Card className="relative min-h-[430px] overflow-hidden p-0">
      <Suspense fallback={<HeroSceneFallback reason="loading" />}>
        <LazyHeroScene />
      </Suspense>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(216,168,79,0.16),transparent_22rem),radial-gradient(circle_at_70%_70%,rgba(143,108,255,0.16),transparent_19rem)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[rgba(7,8,18,0.94)] via-[rgba(7,8,18,0.52)] to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.045)_48%,transparent_54%)]" />

      <div className="relative z-10 flex min-h-[430px] flex-col justify-end p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-accent-gold)]">
          Live system concept
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
          Static-first portfolio with AI and interactive data layers.
        </h2>
        <p className="mt-4 text-sm leading-6 text-[var(--color-text-secondary)]">
          Lightweight Three.js archive core: lazy-loaded, isolated from UI, and safe to disable through feature flags or reduced motion preferences.
        </p>
      </div>
    </Card>
  );
}

export function HeroSection() {
  return (
    <section className="relative mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl items-center gap-10 px-5 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
      <div className="relative z-10">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-accent-gold)]">
          {siteConfig.tagline}
        </p>
        <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.065em] text-[var(--color-text-primary)] md:text-7xl lg:text-8xl">
          {siteConfig.owner}
        </h1>
        <div className="mt-6 flex flex-wrap gap-2">
          {siteConfig.roles.map((role) => (
            <span
              key={role}
              className="rounded-full border border-[var(--color-border)] bg-white/[0.04] px-3 py-1.5 text-sm text-[var(--color-text-secondary)]"
            >
              {role}
            </span>
          ))}
        </div>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--color-text-secondary)] md:text-xl">
          {siteConfig.description}
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link to="/projects"><Button>View Projects</Button></Link>
          <Link to="/oracle"><Button variant="secondary">Ask Portfolio Oracle</Button></Link>
          <Link to="/music"><Button variant="ghost">Explore Music Map</Button></Link>
        </div>
      </div>

      <HeroVisual />
    </section>
  );
}
