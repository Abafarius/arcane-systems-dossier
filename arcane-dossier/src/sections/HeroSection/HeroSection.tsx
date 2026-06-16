import { useMemo, useState, lazy, Suspense } from "react";
import { useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Cpu, Sparkles, Terminal, Workflow } from "lucide-react";
import { HeroSceneFallback } from "../../components/three/HeroScene/HeroSceneFallback";
import { featureFlags } from "../../config/featureFlags";
import { siteConfig } from "../../config/site.config";

const LazyHeroScene = lazy(() =>
  import("../../components/three/HeroScene/HeroScene").then((module) => ({ default: module.HeroScene })),
);

const systemPills = [
  { label: "Static-first", value: "online" },
  { label: "RAG-ready", value: "indexed" },
  { label: "Ollama", value: "local demo" },
  { label: "Three.js", value: "lazy layer" },
] as const;

const telemetry = [
  { label: "Content", value: "JSON-driven" },
  { label: "AI", value: "Provider-ready" },
  { label: "Render", value: "R3F isolated" },
] as const;

function HeroVisual() {
  const [expanded, setExpanded] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const shouldRenderThree = useMemo(
    () => featureFlags.enableThreeHero && !prefersReducedMotion,
    [prefersReducedMotion],
  );

  if (!shouldRenderThree) {
    return <HeroSceneFallback reason={featureFlags.enableThreeHero ? "reduced-motion" : "disabled"} />;
  }

  return (
    <button
      type="button"
      aria-pressed={expanded}
      onClick={() => setExpanded((current) => !current)}
      className="group relative min-h-[460px] w-full overflow-hidden rounded-[2rem] text-left border border-white/[0.11] bg-[linear-gradient(145deg,rgba(19,22,38,0.88),rgba(8,9,20,0.96))] shadow-[0_30px_100px_rgba(0,0,0,0.45)] transition duration-500 hover:border-[rgba(216,168,79,0.35)] hover:shadow-[0_34px_120px_rgba(143,108,255,0.18)] sm:min-h-[520px]">
      <div className="pointer-events-none absolute -inset-32 opacity-0 blur-3xl transition duration-700 group-hover:opacity-100">
        <div className="h-full w-full animate-[spin_18s_linear_infinite] bg-[conic-gradient(from_120deg,transparent,rgba(216,168,79,0.16),transparent,rgba(143,108,255,0.18),transparent)]" />
      </div>

      <Suspense fallback={<HeroSceneFallback reason="loading" compact />}>
        <LazyHeroScene expanded={expanded} />
      </Suspense>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(216,168,79,0.12),transparent_18rem),radial-gradient(circle_at_72%_64%,rgba(143,108,255,0.14),transparent_22rem),linear-gradient(180deg,rgba(7,8,18,0.1),rgba(7,8,18,0.92))]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.04)_42%,transparent_52%)]" />

      <div className="pointer-events-none absolute inset-0 z-10">
        {["RAG", "LLM", "FINTECH", "DATA", "FRONTEND", "SYSTEMS"].map((label, index) => (
          <span
            key={label}
            className="absolute rounded-full border border-white/[0.10] bg-black/[0.20] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--color-text-secondary)] shadow-[0_0_28px_rgba(143,108,255,0.10)] backdrop-blur-md transition duration-500 group-hover:text-[var(--color-accent-gold)]"
            style={{
              left: `${12 + ((index * 17) % 68)}%`,
              top: `${24 + ((index * 29) % 48)}%`,
              transform: `translateY(${expanded ? -6 + index : 0}px)`,
            }}
          >
            {label}
          </span>
        ))}
      </div>

      <div className="relative z-20 flex min-h-[460px] flex-col justify-between p-5 sm:min-h-[520px] sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-accent-gold)]">
              Arcane Archive Core
            </p>
            <p className="mt-2 max-w-sm text-xs leading-5 text-[var(--color-text-secondary)]">
              Click the archive core to expand the knowledge engine. Static content stays readable while the visual layer reacts.
            </p>
          </div>
          <div className="rounded-full border border-[rgba(110,231,168,0.28)] bg-[rgba(110,231,168,0.09)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-success)] shadow-[0_0_24px_rgba(110,231,168,0.12)]">
            {expanded ? "Core expanded" : "System online"}
          </div>
        </div>

        <div className="mx-auto my-10 w-full max-w-sm rounded-2xl border border-white/[0.08] bg-black/[0.18] p-4 backdrop-blur-md sm:max-w-md">
          <div className="grid gap-2 sm:grid-cols-2">
            {systemPills.map((pill) => (
              <div key={pill.label} className="rounded-xl border border-white/[0.08] bg-white/[0.045] px-3 py-2">
                <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-secondary)]">{pill.label}</p>
                <p className="mt-1 text-sm font-semibold text-[var(--color-text-primary)]">{pill.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {telemetry.map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/[0.08] bg-[rgba(7,8,18,0.58)] px-4 py-3 backdrop-blur-md">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--color-accent-gold)]">{item.label}</p>
              <p className="mt-1 text-sm text-[var(--color-text-primary)]">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </button>
  );
}

export function HeroSection() {
  return (
    <section className="relative mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
      <div className="pointer-events-none absolute left-8 top-20 h-56 w-56 rounded-full bg-[rgba(216,168,79,0.08)] blur-3xl" />
      <div className="pointer-events-none absolute bottom-24 right-10 h-72 w-72 rounded-full bg-[rgba(143,108,255,0.1)] blur-3xl" />

      <div className="relative z-10">
        <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[rgba(216,168,79,0.2)] bg-[rgba(216,168,79,0.07)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-[var(--color-accent-gold)] shadow-[0_0_40px_rgba(216,168,79,0.08)]">
          <span className="size-1.5 rounded-full bg-[var(--color-accent-gold)] shadow-[0_0_18px_rgba(216,168,79,0.9)]" />
          {siteConfig.tagline}
        </div>

        <h1 className="max-w-4xl text-5xl font-semibold leading-[0.92] tracking-[-0.075em] text-[var(--color-text-primary)] md:text-7xl lg:text-8xl">
          {siteConfig.owner}
        </h1>

        <div className="mt-7 flex flex-wrap gap-2">
          {siteConfig.roles.map((role) => (
            <span
              key={role}
              className="rounded-full border border-white/[0.11] bg-white/[0.045] px-3 py-1.5 text-sm text-[var(--color-text-secondary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm"
            >
              {role}
            </span>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--color-text-secondary)] md:text-xl">
          {siteConfig.description}
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Link to="/projects">
            <Button className="shadow-[0_0_34px_rgba(216,168,79,0.12)] hover:shadow-[0_0_46px_rgba(216,168,79,0.24)]">
              <Sparkles className="size-4" /> View Projects
            </Button>
          </Link>
          <Link to="/oracle">
            <Button variant="secondary" className="hover:shadow-[0_0_46px_rgba(143,108,255,0.22)]">
              <Terminal className="size-4" /> Ask Portfolio Oracle
            </Button>
          </Link>
          <Link to="/music">
            <Button variant="ghost"><Workflow className="size-4" /> Explore Music Map</Button>
          </Link>
        </div>

        <div className="mt-7 max-w-2xl rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-3 text-sm leading-6 text-[var(--color-text-secondary)] backdrop-blur-sm">
          <Cpu className="mr-2 inline size-4 text-[var(--color-accent-blue)]" /><span className="text-[var(--color-text-primary)]">Proof line:</span> Static-first portfolio · RAG architecture · Three.js visual layer · Data-driven content · Local AI demo path.
        </div>
      </div>

      <HeroVisual />
    </section>
  );
}
