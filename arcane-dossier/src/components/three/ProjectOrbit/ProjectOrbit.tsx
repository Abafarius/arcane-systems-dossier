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

const positions = [
  { x: 18, y: 30 },
  { x: 43, y: 20 },
  { x: 68, y: 30 },
  { x: 80, y: 58 },
  { x: 56, y: 76 },
  { x: 28, y: 70 },
  { x: 38, y: 48 },
  { x: 64, y: 50 },
] as const;

const shortLabels: Record<string, string> = {
  "pbi-monitor": "PBI Monitor",
  "ai-telegram-assistant": "AI Assistant",
  fincat: "FinCat",
  "abafar-convertor": "Converter",
  "learning-clicker": "Learning Game",
  "cbdc-research": "CBDC Research",
};

function getShortLabel(project: Project) {
  return shortLabels[project.slug] ?? project.title.replace(" / ", " ").slice(0, 18);
}

export function ProjectOrbit({ projects, activeFilter }: ProjectOrbitProps) {
  const nodes = projects.map((project, index) => {
    const primaryCategory = project.category[0];
    return {
      project,
      ...positions[index % positions.length],
      color: categoryColor[primaryCategory],
      primaryCategory,
    };
  });

  return (
    <div className="relative mb-8 overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[radial-gradient(circle_at_52%_42%,rgba(143,108,255,0.12),transparent_18rem),rgba(255,255,255,0.025)] p-5 md:p-6">
      <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="relative z-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_330px]">
        <div className="relative min-h-[340px] overflow-hidden rounded-[1.5rem] border border-white/[0.06] bg-black/[0.12]">
          <svg aria-hidden className="absolute inset-0 h-full w-full">
            <defs>
              <radialGradient id="orbitGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(216,168,79,0.22)" />
                <stop offset="70%" stopColor="rgba(143,108,255,0.08)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <ellipse cx="50%" cy="50%" rx="31%" ry="24%" fill="none" stroke="rgba(216,168,79,0.13)" strokeWidth="1" />
            <ellipse cx="50%" cy="50%" rx="41%" ry="32%" fill="none" stroke="rgba(143,108,255,0.11)" strokeWidth="1" />
            <ellipse cx="50%" cy="50%" rx="24%" ry="38%" fill="none" stroke="rgba(93,168,255,0.08)" strokeWidth="1" transform="rotate(-22 50 50)" />
            {nodes.map((node) => {
              const active = activeFilter === "all" || node.project.category.includes(activeFilter);
              return (
                <motion.line
                  key={`${node.project.id}-line`}
                  x1="50%"
                  y1="50%"
                  x2={`${node.x}%`}
                  y2={`${node.y}%`}
                  stroke={node.color}
                  strokeOpacity={active ? 0.24 : 0.06}
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: active ? 1 : 0.42 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                />
              );
            })}
          </svg>

          <div className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-3xl border border-[rgba(216,168,79,0.34)] bg-[rgba(7,8,18,0.62)] text-center shadow-[0_0_50px_rgba(216,168,79,0.12)] backdrop-blur-md">
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-accent-gold)]">Core</span>
          </div>

          {nodes.map((node, index) => {
            const active = activeFilter === "all" || node.project.category.includes(activeFilter);
            const Icon = getIcon(node.primaryCategory);
            return (
              <motion.div
                key={node.project.id}
                className="absolute"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                initial={{ scale: 0.86, opacity: 0 }}
                animate={{ scale: active ? 1 : 0.94, opacity: active ? 1 : 0.28 }}
                transition={{ type: "spring", stiffness: 300, damping: 28, delay: index * 0.035 }}
              >
                <Link
                  to={`/projects/${node.project.slug}`}
                  className={cn(
                    "group inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border bg-[rgba(7,8,18,0.62)] px-3 py-2 text-xs text-[var(--color-text-primary)] shadow-[0_0_28px_rgba(0,0,0,0.28)] backdrop-blur-md transition hover:-translate-y-[calc(50%+3px)] hover:border-[rgba(216,168,79,0.58)] hover:bg-[rgba(20,24,40,0.74)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-gold)]",
                    active ? "border-white/[0.14]" : "border-white/[0.05]",
                  )}
                  title={node.project.title}
                >
                  <Icon className="size-4 shrink-0" style={{ color: node.color }} strokeWidth={1.8} />
                  <span className="max-w-[8.8rem] truncate font-mono text-[11px]">{getShortLabel(node.project)}</span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="relative z-10 flex flex-col justify-center">
          <p className="kicker-label text-[var(--color-accent-gold)]">Project Orbit Map</p>
          <h3 className="mt-3 text-2xl font-semibold text-[var(--color-text-primary)]">Projects as a readable technical map</h3>
          <p className="mt-3 text-sm leading-6 text-[var(--color-text-secondary)]">
            Nodes stay inside the dossier panel. Filters dim unrelated work, while cards below remain the accessible source of truth.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {Array.from(new Set(projects.flatMap((project) => project.category))).slice(0, 6).map((category) => (
              <span key={category} className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-[var(--color-text-secondary)]">
                {projectCategoryLabels[category]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
