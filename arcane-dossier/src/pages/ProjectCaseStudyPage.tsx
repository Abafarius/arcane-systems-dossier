import { Link, useParams } from "react-router-dom";
import { Reveal, StaggerContainer, StaggerItem } from "../components/motion";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { MetricCard } from "../components/ui/MetricCard";
import { getProjectBySlug, projectCategoryLabels, projectStatusLabels, projects } from "../features/projects/projectData";
import type { ProjectCategory } from "../features/projects/projectTypes";
import { PageShell } from "../layout/PageShell";
import { SectionShell } from "../layout/SectionShell";

const categoryTone: Record<ProjectCategory, "gold" | "violet" | "blue" | "neutral" | "success"> = {
  ai: "violet",
  backend: "blue",
  frontend: "gold",
  data: "success",
  finance: "blue",
  "creative-coding": "violet",
  research: "gold",
  desktop: "neutral",
  automation: "success",
  product: "gold",
};

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 text-sm leading-6 text-[var(--color-text-secondary)]">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--color-accent-gold)] shadow-[0_0_14px_rgba(216,168,79,0.42)]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ProjectCaseStudyPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <PageShell>
        <SectionShell
          eyebrow="Missing dossier"
          title="Project not found"
          description="This case study does not exist yet. Return to the project quest log and choose an available project."
        >
          <Link to="/projects">
            <Button>Back to projects</Button>
          </Link>
        </SectionShell>
      </PageShell>
    );
  }

  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const previousProject = projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
        <Reveal>
          <Link to="/projects" className="link-underline text-sm text-[var(--color-text-secondary)] transition hover:text-[var(--color-accent-gold)]">
            ← Back to project quest log
          </Link>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_380px]">
          <Reveal>
            <div>
              <div className="mb-5 flex flex-wrap gap-2">
                {project.category.map((category) => (
                  <Badge key={category} tone={categoryTone[category]}>
                    {projectCategoryLabels[category]}
                  </Badge>
                ))}
                <Badge tone="gold">{projectStatusLabels[project.status]}</Badge>
                <Badge tone="neutral">{project.year}</Badge>
              </div>

              <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.055em] text-[var(--color-text-primary)] md:text-6xl">
                {project.title}
              </h1>
              <p className="mt-4 text-xl leading-8 text-[var(--color-accent-blue)]">{project.subtitle}</p>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--color-text-secondary)]">{project.shortDescription}</p>
            </div>
          </Reveal>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Card variant="gradient" className="p-6">
              <div className="light-sweep" />
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-accent-gold)]">Case study signal</p>
              <h2 className="mt-3 text-xl font-semibold text-[var(--color-text-primary)]">Why it matters</h2>
              <p className="mt-4 leading-7 text-[var(--color-text-secondary)]">{project.whyItMatters}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.proofTags.map((tag) => (
                  <Badge key={tag} tone="neutral">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-8 lg:px-8">
        <StaggerContainer className="grid gap-5 lg:grid-cols-3">
          <StaggerItem>
            <Card variant="glass" className="h-full">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-gold)]">Problem</p>
              <p className="mt-4 leading-7 text-[var(--color-text-secondary)]">{project.problem}</p>
            </Card>
          </StaggerItem>
          <StaggerItem>
            <Card variant="glass" className="h-full">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-gold)]">Solution</p>
              <p className="mt-4 leading-7 text-[var(--color-text-secondary)]">{project.solution}</p>
            </Card>
          </StaggerItem>
          <StaggerItem>
            <Card variant="glass" className="h-full">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-gold)]">My role</p>
              <div className="mt-4">
                <BulletList items={project.myRole} />
              </div>
            </Card>
          </StaggerItem>
        </StaggerContainer>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <Card variant="glass">
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Tech stack</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge key={tech} tone="neutral">
                    {tech}
                  </Badge>
                ))}
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.05}>
            <Card variant="glass">
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Core features</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <div key={feature} className="interactive-lift rounded-xl border border-[var(--color-border)] bg-white/[0.035] p-4 text-sm text-[var(--color-text-secondary)]">
                    {feature}
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <Reveal>
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-accent-gold)]">Architecture</p>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--color-text-primary)] md:text-4xl">
              How the system is structured
            </h2>
          </div>
        </Reveal>

        <StaggerContainer className="grid gap-5 md:grid-cols-2">
          {project.architecture.map((block) => (
            <StaggerItem key={block.title}>
              <Card interactive variant="glass" className="h-full">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">{block.title}</h3>
                <div className="mt-4">
                  <BulletList items={block.items} />
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-10 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <Card variant="glass" className="h-full">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Result</h2>
            <div className="mt-5">
              <BulletList items={project.result} />
            </div>
          </Card>
        </Reveal>
        <Reveal delay={0.05}>
          <Card variant="glass" className="h-full">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">What I learned</h2>
            <div className="mt-5">
              <BulletList items={project.whatILearned} />
            </div>
          </Card>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <Reveal>
          <Card variant="glass">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Screenshots / artifacts</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {project.screenshots.map((screenshot) => (
                <div key={screenshot.src} className="rounded-2xl border border-dashed border-[var(--color-border)] bg-white/[0.025] p-5">
                  <div className="skill-constellation grid aspect-video place-items-center rounded-xl text-center text-sm text-[var(--color-text-secondary)]">
                    Screenshot placeholder
                  </div>
                  <p className="mt-4 text-sm font-medium text-[var(--color-text-primary)]">{screenshot.alt}</p>
                  {screenshot.caption ? <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{screenshot.caption}</p> : null}
                </div>
              ))}
            </div>
          </Card>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 pt-6 lg:px-8">
        <Card variant="gradient" className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Project links</h2>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Replace placeholders with GitHub, live demo or documentation links when ready.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                className="interactive-lift rounded-full border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-text-secondary)] transition hover:border-[rgba(216,168,79,0.45)] hover:text-[var(--color-text-primary)]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </Card>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <Link to={`/projects/${previousProject.slug}`}>
            <MetricCard label="Previous dossier" value={previousProject.title} description="Move through the portfolio case-study archive." className="interactive-lift h-full" />
          </Link>
          <Link to={`/projects/${nextProject.slug}`}>
            <MetricCard label="Next dossier" value={nextProject.title} description="Continue to the next technical proof point." className="interactive-lift h-full" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
