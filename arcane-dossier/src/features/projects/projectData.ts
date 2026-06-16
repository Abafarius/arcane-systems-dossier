import projectsJson from "../../data/projects.json";
import type { Project, ProjectCategory, ProjectStatus } from "./projectTypes";

export const projects = projectsJson as Project[];

export const projectCategoryLabels: Record<ProjectCategory, string> = {
  ai: "AI",
  backend: "Backend",
  frontend: "Frontend",
  data: "Data",
  finance: "Finance",
  "creative-coding": "Creative Coding",
  research: "Research",
  desktop: "Desktop",
  automation: "Automation",
  product: "Product",
};

export const projectStatusLabels: Record<ProjectStatus, string> = {
  completed: "Completed",
  "in-progress": "In progress",
  prototype: "Prototype",
  research: "Research",
  active: "Active product",
};

export const projectCategories: ProjectCategory[] = [
  "ai",
  "backend",
  "frontend",
  "data",
  "finance",
  "creative-coding",
  "research",
  "desktop",
  "automation",
  "product",
];

export function getProjectBySlug(slug: string | undefined) {
  return projects.find((project) => project.slug === slug);
}
