import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Badge } from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";
import { ProjectOrbit } from "../../components/three/ProjectOrbit";
import { projects, projectCategories, projectCategoryLabels, projectStatusLabels } from "../../features/projects/projectData";
import { filterProjects, type ProjectFilter } from "../../features/projects/projectFilters";
import type { Project, ProjectCategory } from "../../features/projects/projectTypes";
import { SectionShell } from "../../layout/SectionShell";
import { cn } from "../../lib/cn";
import { filterContentVariants, staggerContainerVariants, staggerItemVariants } from "../../lib/motion";

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

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div variants={staggerItemVariants} layout>
      <Card interactive variant="glass" className="group flex h-full flex-col">
        <div className="light-sweep" />
        <div className="mb-5 flex flex-wrap items-center gap-2">
          {project.category.map((category) => (
            <Badge key={category} tone={categoryTone[category]}>
              {projectCategoryLabels[category]}
            </Badge>
          ))}
          <Badge tone="gold">{projectStatusLabels[project.status]}</Badge>
        </div>

        <div className="flex-1">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-text-secondary)]">
            Dossier {String(index + 1).padStart(2, "0")} · {project.year}
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-[var(--color-text-primary)] transition group-hover:text-[var(--color-accent-gold)]">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-[var(--color-accent-blue)]">{project.subtitle}</p>
          <p className="mt-4 leading-7 text-[var(--color-text-secondary)]">{project.shortDescription}</p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.techStack.slice(0, 6).map((tech) => (
            <span key={tech} className="rounded-full border border-white/[0.06] bg-white/[0.05] px-3 py-1 text-xs text-[var(--color-text-secondary)]">
              {tech}
            </span>
          ))}
        </div>

        <Link
          to={`/projects/${project.slug}`}
          className="mt-6 inline-flex w-fit items-center rounded-full border border-[rgba(216,168,79,0.45)] bg-[rgba(216,168,79,0.12)] px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] transition hover:-translate-y-0.5 hover:bg-[rgba(216,168,79,0.22)] hover:shadow-[0_0_30px_rgba(216,168,79,0.16)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-gold)]"
        >
          Open case study <span className="ml-2 transition group-hover:translate-x-1">→</span>
        </Link>
      </Card>
    </motion.div>
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

      {showFilters ? <ProjectOrbit projects={projects} activeFilter={activeFilter} /> : null}

      {showFilters ? (
        <div className="mb-8 flex flex-wrap gap-2 rounded-3xl border border-[var(--color-border)] bg-white/[0.025] p-2">
          {filterOptions.map((option) => {
            const active = activeFilter === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setActiveFilter(option.value)}
                className={cn(
                  "relative rounded-full border px-4 py-2 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-gold)]",
                  active
                    ? "border-[rgba(216,168,79,0.5)] text-[var(--color-text-primary)]"
                    : "border-transparent text-[var(--color-text-secondary)] hover:bg-white/[0.06] hover:text-[var(--color-text-primary)]",
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="projectFilterPill"
                    className="absolute inset-0 rounded-full bg-[rgba(216,168,79,0.14)] shadow-[0_0_24px_rgba(216,168,79,0.12)]"
                    transition={{ type: "spring", stiffness: 360, damping: 32 }}
                  />
                ) : null}
                <span className="relative z-10">{option.label}</span>
              </button>
            );
          })}
        </div>
      ) : null}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          variants={filterContentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div className="grid gap-5 md:grid-cols-2" variants={staggerContainerVariants} initial="hidden" animate="visible">
            {visibleProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </SectionShell>
  );
}
