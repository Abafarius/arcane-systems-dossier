import skillsJson from "../../data/skills.json";
import type { Skill, SkillCategory, SkillLevel } from "./skillTypes";

export const skills = skillsJson as Skill[];

export const skillCategoryLabels: Record<SkillCategory, string> = {
  "ai-llm": "AI / LLM",
  backend: "Backend",
  frontend: "Frontend",
  "data-finance": "Data / Finance",
  devops: "DevOps",
  "product-ux": "Product / UX",
  research: "Research",
};

export const skillCategoryDescriptions: Record<SkillCategory, string> = {
  "ai-llm": "RAG, local models, retrieval pipelines and provider abstraction.",
  backend: "APIs, auth, databases and maintainable backend architecture.",
  frontend: "React/Vue interfaces, modular UI and interactive product surfaces.",
  "data-finance": "Analytics, econometrics, dashboard thinking and fintech context.",
  devops: "Dockerized development, deployment basics and reproducible environments.",
  "product-ux": "Internal tools, workflow design and recruiter-friendly storytelling.",
  research: "Structured investigation, thesis work and evidence-based conclusions.",
};

export const skillLevelLabels: Record<SkillLevel, string> = {
  foundation: "Foundation",
  working: "Working",
  strong: "Strong",
  advanced: "Advanced",
};

export const skillLevelScores: Record<SkillLevel, number> = {
  foundation: 1,
  working: 2,
  strong: 3,
  advanced: 4,
};

export const skillCategories: SkillCategory[] = [
  "ai-llm",
  "backend",
  "frontend",
  "data-finance",
  "devops",
  "product-ux",
  "research",
];

export function getSkillsByCategory(category: SkillCategory) {
  return skills.filter((skill) => skill.category === category);
}
