import { Boxes, BrainCircuit, Code2, Database, Gauge, Network, Orbit, Palette, ShieldCheck } from "lucide-react";
import { StaggerContainer, StaggerItem } from "../components/motion";
import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import { MetricCard } from "../components/ui/MetricCard";
import { TechNode } from "../components/ui/TechNode";
import { PageShell } from "../layout/PageShell";
import { SectionShell } from "../layout/SectionShell";

const layers = [
  { title: "Static-first deployment", icon: ShieldCheck, text: "Core experience works as static files on GitHub Pages, Cloudflare Pages, Vercel or Netlify." },
  { title: "Data-driven content", icon: Database, text: "Projects, skills, resume and future knowledge base live in structured JSON data files." },
  { title: "Token-driven design", icon: Palette, text: "Colors, spacing, radii, typography and motion are centralized so the theme can evolve without rewrites." },
  { title: "Isolated 3D layer", icon: Orbit, text: "Three.js stays in the visual layer and never owns the portfolio content." },
  { title: "Provider-ready AI", icon: BrainCircuit, text: "Static retrieval, browser LLM, Ollama and cloud adapters share one future interface." },
  { title: "Performance strategy", icon: Gauge, text: "Lazy 3D, reduced motion support, static fallback surfaces and readable content-first pages." },
];

const blueprint = [
  { label: "Data", description: "JSON documents", icon: <Database className="size-5" /> },
  { label: "UI", description: "Reusable components", icon: <Boxes className="size-5" /> },
  { label: "Motion", description: "Shared variants", icon: <Network className="size-5" /> },
  { label: "3D", description: "R3F isolated", icon: <Orbit className="size-5" /> },
  { label: "AI", description: "Provider adapters", icon: <BrainCircuit className="size-5" /> },
];

export function SystemPage() {
  return (
    <PageShell>
      <SectionShell
        eyebrow="System case study"
        title="This portfolio is also a product architecture demo"
        description="The system page explains how the site itself is built, scaled and deployed. It turns the portfolio into an additional case study."
      >
        <div className="mb-6 grid gap-5 md:grid-cols-3">
          <MetricCard label="Runtime" value="Static" description="No always-on backend required." />
          <MetricCard label="Content" value="JSON" description="Data separated from rendering." />
          <MetricCard label="Visual layer" value="R3F" description="Lazy and isolated Three.js." />
        </div>

        <Card variant="technical" className="mb-6 overflow-hidden p-6">
          <div className="absolute inset-0 architecture-grid opacity-40" />
          <div className="relative z-10">
            <div className="mb-5 flex items-center gap-3">
              <Code2 className="size-5 text-[var(--color-accent-gold)]" />
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-accent-gold)]">Architecture blueprint</p>
            </div>
            <div className="grid gap-4 md:grid-cols-5">
              {blueprint.map((node, index) => (
                <div key={node.label} className="relative">
                  {index < blueprint.length - 1 ? <span className="absolute left-[calc(100%-0.25rem)] top-1/2 hidden h-px w-5 bg-gradient-to-r from-[rgba(216,168,79,0.36)] to-transparent md:block" /> : null}
                  <TechNode label={node.label} description={node.description} icon={node.icon} active={index === 0 || index === 3} />
                </div>
              ))}
            </div>
          </div>
        </Card>

        <StaggerContainer className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {layers.map((layer, index) => {
            const Icon = layer.icon;
            return (
              <StaggerItem key={layer.title}>
                <Card interactive variant={index === 0 ? "gradient" : index === 3 ? "arcane" : "glass"} className="h-full">
                  <div className="light-sweep" />
                  <div className="flex items-start gap-4">
                    <div className="grid size-11 shrink-0 place-items-center rounded-2xl border border-white/[0.08] bg-white/[0.04] text-[var(--color-accent-gold)]">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <Badge tone={index % 3 === 0 ? "gold" : index % 3 === 1 ? "blue" : "violet"}>Layer {String(index + 1).padStart(2, "0")}</Badge>
                      <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-[var(--color-text-primary)]">{layer.title}</h3>
                      <p className="mt-3 leading-7 text-[var(--color-text-secondary)]">{layer.text}</p>
                    </div>
                  </div>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </SectionShell>
    </PageShell>
  );
}
