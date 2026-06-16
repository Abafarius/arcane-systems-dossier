import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { siteConfig } from "../../config/site.config";

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
            The 3D scene will be added later. This placeholder already keeps the premium dossier mood without blocking the MVP.
          </p>
        </div>
      </Card>
    </section>
  );
}
