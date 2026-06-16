import type { Project, ProjectCategory } from "./projectTypes";

export type ProjectFilter = "all" | ProjectCategory;

export function filterProjects(projects: Project[], filter: ProjectFilter) {
  if (filter === "all") {
    return projects;
  }

  return projects.filter((project) => project.category.includes(filter));
}
