import { StaggerContainer, StaggerItem } from "../components/motion";
import { Card } from "../components/ui/Card";
import { PageShell } from "../layout/PageShell";
import { SectionShell } from "../layout/SectionShell";
import { HeroSection } from "../sections/HeroSection";
import { ProjectsQuestLog } from "../sections/ProjectsQuestLog";
import { ResumeSnapshot } from "../sections/ResumeSnapshot";
import { SkillTreeSection } from "../sections/SkillTreeSection";

const capabilities = [
  {
    title: "AI / LLM / RAG systems",
    detail: "Grounded assistant architecture, local AI experiments and provider-aware thinking.",
  },
  {
    title: "Full-stack architecture",
    detail: "Backend APIs, authentication, roles, PostgreSQL and maintainable product structure.",
  },
  {
    title: "Interactive frontend",
    detail: "React, TypeScript, motion, design systems and Three.js visual layers.",
  },
  {
    title: "Finance + data",
    detail: "Financial analytics, CBDC research, dashboard workflows and internal tools.",
  },
  {
    title: "Creative technology",
    detail: "Dossier-style interfaces, skill maps, music visualization and product storytelling.",
  },
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
        <StaggerContainer className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {capabilities.map((capability) => (
            <StaggerItem key={capability.title}>
              <Card interactive variant="glass" className="h-full p-5">
                <div className="light-sweep" />
                <p className="text-sm font-semibold leading-6 text-[var(--color-text-primary)]">{capability.title}</p>
                <p className="mt-3 text-sm leading-6 text-[var(--color-text-secondary)]">{capability.detail}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </SectionShell>

      <SkillTreeSection />
      <ProjectsQuestLog />
      <ResumeSnapshot />
    </PageShell>
  );
}
