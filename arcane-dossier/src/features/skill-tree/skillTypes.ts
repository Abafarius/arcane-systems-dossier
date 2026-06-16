export type SkillCategory =
  | "ai-llm"
  | "backend"
  | "frontend"
  | "data-finance"
  | "devops"
  | "product-ux"
  | "research";

export type SkillLevel = "foundation" | "working" | "strong" | "advanced";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  description: string;
  relatedProjects: string[];
  tags: string[];
  proofExamples: string[];
}
