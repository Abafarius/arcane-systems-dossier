import {
  Bot,
  Boxes,
  BrainCircuit,
  CircuitBoard,
  Code2,
  Cpu,
  Database,
  FileText,
  GraduationCap,
  LineChart,
  Mail,
  Music,
  Network,
  Orbit,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Terminal,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type IconKey =
  | "ai"
  | "backend"
  | "frontend"
  | "data"
  | "finance"
  | "creative-coding"
  | "research"
  | "desktop"
  | "automation"
  | "product"
  | "projects"
  | "skills"
  | "oracle"
  | "music"
  | "resume"
  | "system"
  | "email"
  | "github"
  | "education"
  | "default";

export const iconMap: Record<IconKey, LucideIcon> = {
  ai: BrainCircuit,
  backend: Database,
  frontend: Code2,
  data: LineChart,
  finance: ShieldCheck,
  "creative-coding": Sparkles,
  research: ScrollText,
  desktop: Cpu,
  automation: Workflow,
  product: Boxes,
  projects: Orbit,
  skills: Network,
  oracle: Bot,
  music: Music,
  resume: FileText,
  system: CircuitBoard,
  email: Mail,
  github: Code2,
  education: GraduationCap,
  default: Terminal,
};

export function getIcon(key: string) {
  return iconMap[(key as IconKey) in iconMap ? (key as IconKey) : "default"];
}
