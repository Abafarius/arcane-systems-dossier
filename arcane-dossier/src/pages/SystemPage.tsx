import { StaggerContainer, StaggerItem } from "../components/motion";
import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import { MetricCard } from "../components/ui/MetricCard";
import { PageShell } from "../layout/PageShell";
import { SectionShell } from "../layout/SectionShell";

const layers = [
  { title: "Static-first deployment", text: "Core experience works as static files on GitHub Pages, Cloudflare Pages, Vercel or Netlify." },
  { title: "Data-driven content", text: "Projects, skills, resume and future knowledge base live in structured JSON data files." },
  { title: "Token-driven design", text: "Colors, spacing, radii and motion are centralized so the theme can evolve without rewrites." },
  { title: "Isolated 3D layer", text: "Three.js stays in the visual layer and never owns the portfolio content." },
  { title: "Provider-ready AI", text: "Static retrieval, browser LLM, Ollama and cloud adapters share one future interface." },
  { title: "Performance strategy", text: "Lazy 3D, reduced motion support, static fallback surfaces and readable content-first pages." },
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

        <StaggerContainer className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {layers.map((layer, index) => (
            <StaggerItem key={layer.title}>
              <Card interactive variant={index === 0 ? "gradient" : "glass"} className="h-full">
                <div className="light-sweep" />
                <Badge tone={index % 3 === 0 ? "gold" : index % 3 === 1 ? "blue" : "violet"}>Layer {String(index + 1).padStart(2, "0")}</Badge>
                <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-[var(--color-text-primary)]">{layer.title}</h3>
                <p className="mt-3 leading-7 text-[var(--color-text-secondary)]">{layer.text}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </SectionShell>
    </PageShell>
  );
}
