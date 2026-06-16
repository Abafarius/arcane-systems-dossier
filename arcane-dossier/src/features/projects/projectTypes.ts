export type ProjectCategory =
  | "ai"
  | "backend"
  | "frontend"
  | "data"
  | "finance"
  | "creative-coding"
  | "research"
  | "desktop"
  | "automation"
  | "product";

export type ProjectStatus = "completed" | "in-progress" | "prototype" | "research" | "active";

export interface ProjectLink {
  label: string;
  url: string;
  type: "github" | "demo" | "docs" | "case-study" | "private";
}

export interface ProjectScreenshot {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectArchitectureBlock {
  title: string;
  items: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ProjectCategory[];
  status: ProjectStatus;
  year: number;
  shortDescription: string;
  problem: string;
  solution: string;
  myRole: string[];
  techStack: string[];
  architecture: ProjectArchitectureBlock[];
  features: string[];
  result: string[];
  whatILearned: string[];
  whyItMatters: string;
  screenshots: ProjectScreenshot[];
  links: ProjectLink[];
  proofTags: string[];
}
