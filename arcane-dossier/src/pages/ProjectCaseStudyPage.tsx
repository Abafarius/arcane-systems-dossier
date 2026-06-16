import { Link, useParams } from "react-router-dom";
import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import { getProjectBySlug, projectCategoryLabels, projectStatusLabels } from "../features/projects/projectData";
import { PageShell } from "../layout/PageShell";
import { SectionShell } from "../layout/SectionShell";

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 text-sm leading-6 text-[var(--color-text-secondary)]">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--color-accent-gold)]" />
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
          <Link
            to="/projects"
            className="inline-flex rounded-full border border-[rgba(216,168,79,0.45)] bg-[rgba(216,168,79,0.14)] px-5 py-2.5 text-sm font-medium text-[var(--color-text-primary)] transition hover:bg-[rgba(216,168,79,0.22)]"
          >
            Back to projects
          </Link>
        </SectionShell>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
        <Link to="/projects" className="text-sm text-[var(--color-text-secondary)] transition hover:text-[var(--color-accent-gold)]">
          ← Back to project quest log
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <div className="mb-5 flex flex-wrap gap-2">
              {project.category.map((category) => (
                <Badge key={category} tone={category === "ai" ? "violet" : category === "finance" ? "blue" : "neutral"}>
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

          <Card>
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Why it matters</h2>
            <p className="mt-4 leading-7 text-[var(--color-text-secondary)]">{project.whyItMatters}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.proofTags.map((tag) => (
                <Badge key={tag} tone="neutral">
                  {tag}
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-8 lg:grid-cols-3 lg:px-8">
        <Card>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-gold)]">Problem</p>
          <p className="mt-4 leading-7 text-[var(--color-text-secondary)]">{project.problem}</p>
        </Card>
        <Card>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-gold)]">Solution</p>
          <p className="mt-4 leading-7 text-[var(--color-text-secondary)]">{project.solution}</p>
        </Card>
        <Card>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-gold)]">My role</p>
          <div className="mt-4">
            <BulletList items={project.myRole} />
          </div>
        </Card>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <Card>
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Tech stack</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} tone="neutral">
                  {tech}
                </Badge>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Core features</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {project.features.map((feature) => (
                <div key={feature} className="rounded-xl border border-[var(--color-border)] bg-white/[0.035] p-4 text-sm text-[var(--color-text-secondary)]">
                  {feature}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-accent-gold)]">Architecture</p>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--color-text-primary)] md:text-4xl">
            How the system is structured
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {project.architecture.map((block) => (
            <Card key={block.title}>
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">{block.title}</h3>
              <div className="mt-4">
                <BulletList items={block.items} />
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-10 lg:grid-cols-2 lg:px-8">
        <Card>
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Result</h2>
          <div className="mt-5">
            <BulletList items={project.result} />
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">What I learned</h2>
          <div className="mt-5">
            <BulletList items={project.whatILearned} />
          </div>
        </Card>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <Card>
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Screenshots / artifacts</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {project.screenshots.map((screenshot) => (
              <div key={screenshot.src} className="rounded-2xl border border-dashed border-[var(--color-border)] bg-white/[0.025] p-5">
                <div className="grid aspect-video place-items-center rounded-xl bg-[rgba(255,255,255,0.04)] text-center text-sm text-[var(--color-text-secondary)]">
                  Screenshot placeholder
                </div>
                <p className="mt-4 text-sm font-medium text-[var(--color-text-primary)]">{screenshot.alt}</p>
                {screenshot.caption ? <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{screenshot.caption}</p> : null}
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 pt-6 lg:px-8">
        <Card className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Project links</h2>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Replace placeholders with GitHub, live demo or documentation links when ready.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                className="rounded-full border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-text-secondary)] transition hover:border-[rgba(216,168,79,0.45)] hover:text-[var(--color-text-primary)]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </Card>
      </section>
    </PageShell>
  );
}
