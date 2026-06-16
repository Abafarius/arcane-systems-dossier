import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";
import { projects, projectCategories, projectCategoryLabels, projectStatusLabels } from "../../features/projects/projectData";
import { filterProjects, type ProjectFilter } from "../../features/projects/projectFilters";
import type { Project } from "../../features/projects/projectTypes";
import { SectionShell } from "../../layout/SectionShell";
import { cn } from "../../lib/cn";

interface ProjectsQuestLogProps {
  showFilters?: boolean;
  limit?: number;
  title?: string;
  description?: string;
}

const filterOptions: { value: ProjectFilter; label: string }[] = [
  { value: "all", label: "All" },
  ...projectCategories.map((category) => ({
    value: category,
    label: projectCategoryLabels[category],
  })),
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card interactive className="flex h-full flex-col">
      <div className="mb-5 flex flex-wrap items-center gap-2">
        {project.category.map((category) => (
          <Badge key={category} tone={category === "ai" ? "violet" : category === "finance" ? "blue" : "neutral"}>
            {projectCategoryLabels[category]}
          </Badge>
        ))}
        <Badge tone="gold">{projectStatusLabels[project.status]}</Badge>
      </div>

      <div className="flex-1">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-text-secondary)]">{project.year}</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-[var(--color-text-primary)]">
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-[var(--color-accent-blue)]">{project.subtitle}</p>
        <p className="mt-4 leading-7 text-[var(--color-text-secondary)]">{project.shortDescription}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.techStack.slice(0, 6).map((tech) => (
          <span key={tech} className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-[var(--color-text-secondary)]">
            {tech}
          </span>
        ))}
      </div>

      <Link
        to={`/projects/${project.slug}`}
        className="mt-6 inline-flex w-fit items-center rounded-full border border-[rgba(216,168,79,0.45)] bg-[rgba(216,168,79,0.12)] px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] transition hover:bg-[rgba(216,168,79,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-gold)]"
      >
        Open case study
      </Link>
    </Card>
  );
}

export function ProjectsQuestLog({
  showFilters = false,
  limit,
  title = "Projects as technical case studies",
  description = "Each project is presented as proof of architecture, problem solving and product thinking — not just a screenshot gallery.",
}: ProjectsQuestLogProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");

  const visibleProjects = useMemo(() => {
    const filteredProjects = filterProjects(projects, activeFilter);
    return typeof limit === "number" ? filteredProjects.slice(0, limit) : filteredProjects;
  }, [activeFilter, limit]);

  return (
    <SectionShell id="projects" eyebrow="Quest log" title={title} description={description}>
      {showFilters ? (
        <div className="mb-8 flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setActiveFilter(option.value)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-gold)]",
                activeFilter === option.value
                  ? "border-[rgba(216,168,79,0.5)] bg-[rgba(216,168,79,0.16)] text-[var(--color-text-primary)]"
                  : "border-[var(--color-border)] bg-white/[0.03] text-[var(--color-text-secondary)] hover:bg-white/[0.07] hover:text-[var(--color-text-primary)]",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </SectionShell>
  );
}
