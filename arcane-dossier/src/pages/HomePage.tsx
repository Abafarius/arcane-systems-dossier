import { Card } from "../components/ui/Card";
import { PageShell } from "../layout/PageShell";
import { SectionShell } from "../layout/SectionShell";
import { HeroSection } from "../sections/HeroSection";
import { ProjectsQuestLog } from "../sections/ProjectsQuestLog";

const capabilities = [
  "AI / LLM / RAG systems",
  "Full-stack architecture",
  "Interactive frontend experiences",
  "Financial analytics and CBDC research",
  "Creative technology and data visualization",
];

export function HomePage() {
  return (
    <PageShell>
      <HeroSection />

      <SectionShell
        eyebrow="Character sheet"
        title="Knowledge Bard, but built like a systems engineer"
        description="The fantasy layer is a premium metaphor: archive, dossier, oracle and skill tree. The actual content stays recruiter-friendly and technical."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {capabilities.map((capability) => (
            <Card key={capability} className="p-5">
              <p className="text-sm font-medium leading-6 text-[var(--color-text-primary)]">{capability}</p>
            </Card>
          ))}
        </div>
      </SectionShell>

      <ProjectsQuestLog />
    </PageShell>
  );
}
