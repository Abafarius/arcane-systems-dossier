import { Reveal, StaggerContainer, StaggerItem } from "../components/motion";
import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import { MetricCard } from "../components/ui/MetricCard";
import { PageShell } from "../layout/PageShell";
import { SectionShell } from "../layout/SectionShell";

const providers = [
  { label: "Static Retrieval", status: "Available", tone: "success" as const, text: "Local JSON knowledge base with grounded responses and source cards." },
  { label: "Ollama", status: "Advanced demo", tone: "gold" as const, text: "Local provider planned for interviews and technical demos." },
  { label: "Browser LLM", status: "Experimental", tone: "violet" as const, text: "Future WebGPU/WebLLM mode, loaded only on demand." },
  { label: "Cloud LLM", status: "Disabled", tone: "neutral" as const, text: "Future serverless adapter. No exposed API keys in the frontend." },
];

const pipeline = ["Query", "Retrieve", "Rank", "Context", "Provider", "Grounded answer"];

export function OraclePage() {
  return (
    <PageShell>
      <SectionShell
        eyebrow="Portfolio Oracle"
        title="A provider-agnostic AI assistant surface"
        description="This page frames the future assistant as a real LLM engineering showcase: static retrieval first, then local Ollama and browser-side experiments as progressive enhancement."
      >
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <Card variant="gradient" className="h-full p-7">
              <div className="light-sweep" />
              <div className="mb-5 flex flex-wrap gap-2">
                <Badge tone="success">Static Retrieval available</Badge>
                <Badge tone="violet">RAG-ready</Badge>
                <Badge tone="gold">No API keys exposed</Badge>
              </div>
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--color-text-primary)]">Oracle command surface</h2>
              <div className="mt-6 rounded-2xl border border-[var(--color-border)] bg-black/20 p-4 font-mono text-sm leading-7 text-[var(--color-text-secondary)]">
                <p><span className="text-[var(--color-accent-gold)]">user</span>: What can Galymzhan build?</p>
                <p><span className="text-[var(--color-accent-violet)]">oracle</span>: I can answer from portfolio knowledge only and show source cards.</p>
                <p><span className="text-[var(--color-accent-blue)]">pipeline</span>: query → retrieval → context → grounded answer</p>
              </div>
            </Card>
          </Reveal>

          <StaggerContainer className="grid gap-4">
            {providers.map((provider) => (
              <StaggerItem key={provider.label}>
                <Card interactive variant="glass" className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-[var(--color-text-primary)]">{provider.label}</h3>
                      <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">{provider.text}</p>
                    </div>
                    <Badge tone={provider.tone}>{provider.status}</Badge>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <MetricCard label="Default mode" value="Static" description="Works on GitHub Pages and other static hosts." />
          <MetricCard label="Answer policy" value="Grounded" description="If the knowledge base lacks an answer, it refuses to invent." />
          <MetricCard label="Architecture" value="Swappable" description="All providers share one interface." />
        </div>

        <Card variant="glass" className="mt-6 p-6">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-accent-gold)]">RAG pipeline preview</p>
          <div className="grid gap-3 md:grid-cols-6">
            {pipeline.map((step, index) => (
              <div key={step} className="rounded-2xl border border-[var(--color-border)] bg-white/[0.035] p-4 text-center">
                <p className="text-xs text-[var(--color-text-secondary)]">0{index + 1}</p>
                <p className="mt-2 font-medium text-[var(--color-text-primary)]">{step}</p>
              </div>
            ))}
          </div>
        </Card>
      </SectionShell>
    </PageShell>
  );
}
