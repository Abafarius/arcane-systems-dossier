import { motion } from "framer-motion";
import { getIcon } from "../../../config/iconMap";
import { skillCategoryLabels, skills } from "../../../features/skill-tree/skillData";
import type { SkillCategory } from "../../../features/skill-tree/skillTypes";
import { cn } from "../../../lib/cn";

interface SkillConstellationProps {
  activeCategory: "all" | SkillCategory;
  selectedSkillId: string;
  onSelectSkill: (skillId: string) => void;
}

const categoryPositions: Record<SkillCategory, { x: number; y: number }> = {
  "ai-llm": { x: 49, y: 22 },
  backend: { x: 76, y: 42 },
  frontend: { x: 24, y: 43 },
  "data-finance": { x: 62, y: 74 },
  devops: { x: 82, y: 75 },
  "product-ux": { x: 22, y: 75 },
  research: { x: 49, y: 56 },
};

const toneByCategory: Record<SkillCategory, string> = {
  "ai-llm": "rgba(143,108,255,0.95)",
  backend: "rgba(93,168,255,0.95)",
  frontend: "rgba(216,168,79,0.95)",
  "data-finance": "rgba(110,231,168,0.95)",
  devops: "rgba(169,173,189,0.95)",
  "product-ux": "rgba(216,168,79,0.95)",
  research: "rgba(93,168,255,0.95)",
};

const nodes = skills.slice(0, 18).map((skill, index) => {
  const base = categoryPositions[skill.category];
  const angle = index * 1.9;
  return {
    skill,
    x: Math.max(7, Math.min(93, base.x + Math.cos(angle) * (7 + (index % 3) * 3))),
    y: Math.max(8, Math.min(92, base.y + Math.sin(angle) * (7 + (index % 4) * 2.5))),
  };
});

export function SkillConstellation({ activeCategory, selectedSkillId, onSelectSkill }: SkillConstellationProps) {
  return (
    <div className="relative min-h-[280px] overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[radial-gradient(circle_at_50%_35%,rgba(143,108,255,0.14),transparent_17rem),rgba(255,255,255,0.025)] p-4">
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:34px_34px]" />
      <svg aria-hidden className="absolute inset-0 h-full w-full">
        {nodes.map((node, index) => {
          const origin = categoryPositions[node.skill.category];
          const active = activeCategory === "all" || activeCategory === node.skill.category;
          return (
            <motion.line
              key={`${node.skill.id}-line`}
              x1={`${origin.x}%`}
              y1={`${origin.y}%`}
              x2={`${node.x}%`}
              y2={`${node.y}%`}
              stroke={toneByCategory[node.skill.category]}
              strokeOpacity={active ? 0.28 : 0.06}
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: active ? 1 : 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.015 }}
            />
          );
        })}
      </svg>

      {Object.entries(categoryPositions).map(([category, position]) => {
        const typedCategory = category as SkillCategory;
        const Icon = getIcon(typedCategory === "ai-llm" ? "ai" : typedCategory);
        const active = activeCategory === "all" || activeCategory === typedCategory;
        return (
          <div
            key={category}
            className={cn(
              "absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border bg-black/35 p-2 backdrop-blur-md transition",
              active ? "border-white/[0.18] opacity-100" : "border-white/[0.06] opacity-35",
            )}
            style={{ left: `${position.x}%`, top: `${position.y}%` }}
            title={skillCategoryLabels[typedCategory]}
          >
            <Icon className="size-4" style={{ color: toneByCategory[typedCategory] }} strokeWidth={1.8} />
          </div>
        );
      })}

      {nodes.map((node, index) => {
        const active = activeCategory === "all" || activeCategory === node.skill.category;
        const selected = selectedSkillId === node.skill.id;
        return (
          <motion.button
            key={node.skill.id}
            type="button"
            onClick={() => onSelectSkill(node.skill.id)}
            className={cn(
              "absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border bg-black/45 backdrop-blur-md transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-gold)]",
              selected ? "size-5 border-[rgba(216,168,79,0.8)] shadow-[0_0_30px_rgba(216,168,79,0.32)]" : "size-3 border-white/[0.18]",
              active ? "opacity-100" : "opacity-20",
            )}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: selected ? 1.2 : 1, opacity: active ? 1 : 0.2 }}
            transition={{ type: "spring", stiffness: 420, damping: 28, delay: index * 0.018 }}
            title={node.skill.name}
          >
            <span className="size-1.5 rounded-full" style={{ backgroundColor: toneByCategory[node.skill.category] }} />
          </motion.button>
        );
      })}

      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--color-accent-gold)]">Skill constellation</p>
          <p className="mt-1 max-w-xs text-xs leading-5 text-[var(--color-text-secondary)]">Nodes are connected to domains and project proof.</p>
        </div>
        <p className="font-mono text-[10px] text-[var(--color-text-secondary)]">{activeCategory === "all" ? "ALL" : activeCategory.toUpperCase()}</p>
      </div>
    </div>
  );
}
