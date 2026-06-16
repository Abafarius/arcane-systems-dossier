import projects from "../../data/projects.json";
import { Card } from "../../components/ui/Card";
import { SectionShell } from "../../layout/SectionShell";

export function ProjectsQuestLog() {
  return (
    <SectionShell
      id="projects"
      eyebrow="Quest log"
      title="Projects as technical case studies"
      description="Each project is presented as proof of architecture, problem solving and product thinking — not just a screenshot gallery."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.id} interactive>
            <div className="mb-5 flex flex-wrap gap-2">
              {project.category.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-[var(--color-border)] px-2.5 py-1 text-xs uppercase tracking-[0.16em] text-[var(--color-accent-gold)]"
                >
                  {category}
                </span>
              ))}
            </div>
            <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[var(--color-text-primary)]">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-[var(--color-accent-blue)]">{project.subtitle}</p>
            <p className="mt-4 leading-7 text-[var(--color-text-secondary)]">
              {project.shortDescription}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-[var(--color-text-secondary)]">
                  {tech}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
