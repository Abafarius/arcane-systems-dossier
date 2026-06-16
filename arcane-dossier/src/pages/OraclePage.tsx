import { Bot, BrainCircuit, Database, FileSearch, MessageSquare, ShieldCheck, Terminal, Workflow } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "../components/motion";
import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import { MetricCard } from "../components/ui/MetricCard";
import { PipelineGraph, type PipelineStep } from "../components/ui/PipelineGraph";
import { PageShell } from "../layout/PageShell";
import { SectionShell } from "../layout/SectionShell";

const providers = [
  { label: "Static Retrieval", icon: Database, status: "Available", tone: "success" as const, text: "Local JSON knowledge base with grounded responses and source cards." },
  { label: "Ollama", icon: Bot, status: "Advanced demo", tone: "gold" as const, text: "Local provider planned for interviews and technical demos." },
  { label: "Browser LLM", icon: BrainCircuit, status: "Experimental", tone: "violet" as const, text: "Future WebGPU/WebLLM mode, loaded only on demand." },
  { label: "Cloud LLM", icon: ShieldCheck, status: "Disabled", tone: "neutral" as const, text: "Future serverless adapter. No exposed API keys in the frontend." },
];

const pipeline: PipelineStep[] = [
  { label: "Query", description: "User asks about skills, projects, research or experience.", icon: <MessageSquare className="size-4" /> },
  { label: "Retrieve", description: "Local documents are searched before any model call.", icon: <FileSearch className="size-4" /> },
  { label: "Rank", description: "Relevant chunks are prioritized by metadata and score.", icon: <Workflow className="size-4" /> },
  { label: "Provider", description: "Static, Ollama, browser or cloud adapter can respond.", icon: <BrainCircuit className="size-4" /> },
  { label: "Grounded", description: "Answer returns source cards and refuses unknown claims.", icon: <ShieldCheck className="size-4" /> },
];

export function OraclePage() {
  return (
    <PageShell>
      <SectionShell
        eyebrow="Portfolio Oracle"
        title="AI pipeline chamber, not a decorative chatbot"
        description="This page frames the future assistant as a real LLM engineering showcase: static retrieval first, then local Ollama and browser-side experiments as progressive enhancement."
      >
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <Card variant="arcane" className="h-full p-7">
              <div className="light-sweep" />
              <div className="mb-5 flex flex-wrap gap-2">
                <Badge tone="success">Static Retrieval available</Badge>
                <Badge tone="violet">RAG-ready</Badge>
                <Badge tone="gold">No API keys exposed</Badge>
              </div>
              <div className="flex items-start gap-4">
                <div className="grid size-12 shrink-0 place-items-center rounded-2xl border border-[rgba(216,168,79,0.28)] bg-[rgba(216,168,79,0.1)] text-[var(--color-accent-gold)]">
                  <Terminal className="size-6" />
                </div>
                <div>
                  <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--color-text-primary)]">Oracle command surface</h2>
                  <p className="mt-3 leading-7 text-[var(--color-text-secondary)]">A portfolio AI surface designed to show provider abstraction, retrieval discipline and honest answers.</p>
                </div>
              </div>
              <div className="mt-6 rounded-2xl border border-[var(--color-border)] bg-black/20 p-4 font-mono text-sm leading-7 text-[var(--color-text-secondary)]">
                <p><span className="text-[var(--color-accent-gold)]">user</span>: What can Galymzhan build?</p>
                <p><span className="text-[var(--color-accent-violet)]">oracle</span>: I answer from portfolio knowledge only and show source cards.</p>
                <p><span className="text-[var(--color-accent-blue)]">pipeline</span>: query → retrieval → provider → grounded answer</p>
              </div>
            </Card>
          </Reveal>

          <StaggerContainer className="grid gap-4">
            {providers.map((provider) => {
              const Icon = provider.icon;
              return (
                <StaggerItem key={provider.label}>
                  <Card interactive variant="technical" className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex gap-4">
                        <div className="grid size-11 shrink-0 place-items-center rounded-2xl border border-white/[0.08] bg-white/[0.04] text-[var(--color-accent-blue)]">
                          <Icon className="size-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[var(--color-text-primary)]">{provider.label}</h3>
                          <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">{provider.text}</p>
                        </div>
                      </div>
                      <Badge tone={provider.tone}>{provider.status}</Badge>
                    </div>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <MetricCard label="Default mode" value="Static" description="Works on GitHub Pages and other static hosts." />
          <MetricCard label="Answer policy" value="Grounded" description="If the knowledge base lacks an answer, it refuses to invent." />
          <MetricCard label="Architecture" value="Swappable" description="All providers share one interface." />
        </div>

        <div className="mt-6">
          <PipelineGraph steps={pipeline} />
        </div>
      </SectionShell>
    </PageShell>
  );
}
