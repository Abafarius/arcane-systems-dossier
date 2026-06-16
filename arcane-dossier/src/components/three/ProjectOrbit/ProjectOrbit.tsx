import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getIcon } from "../../../config/iconMap";
import { projectCategoryLabels } from "../../../features/projects/projectData";
import type { Project, ProjectCategory } from "../../../features/projects/projectTypes";
import type { ProjectFilter } from "../../../features/projects/projectFilters";
import { cn } from "../../../lib/cn";

interface ProjectOrbitProps {
  projects: Project[];
  activeFilter: ProjectFilter;
}

const categoryColor: Record<ProjectCategory, string> = {
  ai: "#8f6cff",
  backend: "#5da8ff",
  frontend: "#d8a84f",
  data: "#6ee7a8",
  finance: "#5da8ff",
  "creative-coding": "#8f6cff",
  research: "#d8a84f",
  desktop: "#a9adbd",
  automation: "#6ee7a8",
  product: "#d8a84f",
};

export function ProjectOrbit({ projects, activeFilter }: ProjectOrbitProps) {
  const nodes = projects.map((project, index) => {
    const angle = (index / Math.max(projects.length, 1)) * Math.PI * 2 - Math.PI / 2;
    const radius = 38 + (index % 3) * 9;
    const primaryCategory = project.category[0];
    return {
      project,
      x: 50 + Math.cos(angle) * radius,
      y: 50 + Math.sin(angle) * radius * 0.72,
      color: categoryColor[primaryCategory],
      primaryCategory,
    };
  });

  return (
    <div className="relative mb-8 overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[radial-gradient(circle_at_50%_45%,rgba(143,108,255,0.13),transparent_18rem),rgba(255,255,255,0.025)] p-5">
      <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:40px_40px]" />
      <div className="relative z-10 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="relative min-h-[320px]">
          {[42, 62, 82].map((size, index) => (
            <motion.div
              key={size}
              className="absolute left-1/2 top-1/2 rounded-full border border-white/[0.08]"
              style={{ width: `${size}%`, height: `${size}%`, marginLeft: `-${size / 2}%`, marginTop: `-${size / 2}%` }}
              animate={{ rotate: index % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 32 + index * 12, repeat: Infinity, ease: "linear" }}
            />
          ))}

          <div className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-3xl border border-[rgba(216,168,79,0.34)] bg-black/30 text-center shadow-[0_0_50px_rgba(216,168,79,0.12)] backdrop-blur-md">
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-accent-gold)]">Orbit</span>
          </div>

          {nodes.map((node, index) => {
            const active = activeFilter === "all" || node.project.category.includes(activeFilter);
            const Icon = getIcon(node.primaryCategory);
            return (
              <motion.div
                key={node.project.id}
                className="absolute"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: active ? 1 : 0.72, opacity: active ? 1 : 0.24 }}
                transition={{ type: "spring", stiffness: 360, damping: 26, delay: index * 0.04 }}
              >
                <Link
                  to={`/projects/${node.project.slug}`}
                  className={cn(
                    "group -translate-x-1/2 -translate-y-1/2 inline-flex items-center gap-2 rounded-full border bg-black/42 px-3 py-2 text-xs text-[var(--color-text-primary)] shadow-[0_0_28px_rgba(0,0,0,0.28)] backdrop-blur-md transition hover:-translate-y-[calc(50%+4px)] hover:border-[rgba(216,168,79,0.55)]",
                    active ? "border-white/[0.14]" : "border-white/[0.04]",
                  )}
                  title={node.project.title}
                >
                  <Icon className="size-4" style={{ color: node.color }} strokeWidth={1.8} />
                  <span className="hidden max-w-28 truncate sm:inline">{node.project.title}</span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="relative z-10 flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-accent-gold)]">Project Orbit Map</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-text-primary)]">Projects as a navigable technical universe</h3>
          <p className="mt-3 text-sm leading-6 text-[var(--color-text-secondary)]">
            Filters dim unrelated nodes, while readable cards below remain the primary accessible content.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {Array.from(new Set(projects.flatMap((project) => project.category))).slice(0, 6).map((category) => (
              <span key={category} className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs text-[var(--color-text-secondary)]">
                {projectCategoryLabels[category]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
