import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Badge } from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { projects } from "../../features/projects/projectData";
import {
  skillCategories,
  skillCategoryDescriptions,
  skillCategoryLabels,
  skillLevelLabels,
  skillLevelScores,
  skills,
} from "../../features/skill-tree/skillData";
import type { Skill, SkillCategory } from "../../features/skill-tree/skillTypes";
import { SectionShell } from "../../layout/SectionShell";
import { cn } from "../../lib/cn";
import { filterContentVariants, staggerContainerVariants, staggerItemVariants } from "../../lib/motion";

type SkillFilter = "all" | SkillCategory;

const categoryTones: Record<SkillCategory, "gold" | "violet" | "blue" | "neutral" | "success"> = {
  "ai-llm": "violet",
  backend: "blue",
  frontend: "gold",
  "data-finance": "success",
  devops: "neutral",
  "product-ux": "gold",
  research: "blue",
};

function getProjectTitle(projectId: string) {
  return projects.find((project) => project.id === projectId)?.title ?? projectId;
}

function getProjectSlug(projectId: string) {
  return projects.find((project) => project.id === projectId)?.slug;
}

function getLevelWidth(skill: Skill) {
  return `${skillLevelScores[skill.level] * 25}%`;
}

export function SkillTreeSection() {
  const [activeFilter, setActiveFilter] = useState<SkillFilter>("all");
  const [selectedSkillId, setSelectedSkillId] = useState(skills[0]?.id ?? "");

  const filteredSkills = useMemo(() => {
    if (activeFilter === "all") {
      return skills;
    }

    return skills.filter((skill) => skill.category === activeFilter);
  }, [activeFilter]);

  const selectedSkill =
    skills.find((skill) => skill.id === selectedSkillId) ?? filteredSkills[0] ?? skills[0];

  const categoryStats = useMemo(
    () =>
      skillCategories.map((category) => ({
        category,
        count: skills.filter((skill) => skill.category === category).length,
      })),
    [],
  );

  if (!selectedSkill) {
    return null;
  }

  return (
    <SectionShell
      id="skills"
      eyebrow="Skill tree"
      title="Capabilities mapped to real project proof"
      description="This section avoids fake RPG numbers. Every skill is connected to projects, proof examples and practical context. It is a recruiter-friendly skill tree, not a decoration."
    >
      <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
        <Card variant="glass" className="h-fit p-4 lg:sticky lg:top-28">
          <div className="skill-constellation mb-4 rounded-2xl border border-[var(--color-border)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-accent-gold)]">
              Domains
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
              Filter the capability graph by technical domain.
            </p>
          </div>

          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className={cn(
                "relative flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left text-sm transition",
                activeFilter === "all"
                  ? "border-[rgba(216,168,79,0.45)] text-[var(--color-text-primary)]"
                  : "border-transparent text-[var(--color-text-secondary)] hover:bg-white/[0.05] hover:text-[var(--color-text-primary)]",
              )}
            >
              {activeFilter === "all" ? <motion.span layoutId="skillFilterPill" className="absolute inset-0 rounded-xl bg-[rgba(216,168,79,0.12)]" /> : null}
              <span className="relative z-10">All capabilities</span>
              <span className="relative z-10 text-xs text-[var(--color-text-secondary)]">{skills.length}</span>
            </button>

            {categoryStats.map(({ category, count }) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveFilter(category)}
                className={cn(
                  "relative flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left text-sm transition",
                  activeFilter === category
                    ? "border-[rgba(143,108,255,0.42)] text-[var(--color-text-primary)]"
                    : "border-transparent text-[var(--color-text-secondary)] hover:bg-white/[0.05] hover:text-[var(--color-text-primary)]",
                )}
              >
                {activeFilter === category ? <motion.span layoutId="skillFilterPill" className="absolute inset-0 rounded-xl bg-[rgba(143,108,255,0.12)]" /> : null}
                <span className="relative z-10">{skillCategoryLabels[category]}</span>
                <span className="relative z-10 text-xs text-[var(--color-text-secondary)]">{count}</span>
              </button>
            ))}
          </div>
        </Card>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {activeFilter !== "all" ? (
                <motion.div key={activeFilter} variants={filterContentVariants} initial="hidden" animate="visible" exit="exit">
                  <Card variant="gradient" className="p-5">
                    <Badge tone={categoryTones[activeFilter]}>{skillCategoryLabels[activeFilter]}</Badge>
                    <p className="mt-3 text-sm leading-6 text-[var(--color-text-secondary)]">
                      {skillCategoryDescriptions[activeFilter]}
                    </p>
                  </Card>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                variants={staggerContainerVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-4 md:grid-cols-2"
              >
                {filteredSkills.map((skill) => {
                  const isSelected = selectedSkill.id === skill.id;

                  return (
                    <motion.button
                      variants={staggerItemVariants}
                      layout
                      key={skill.id}
                      type="button"
                      onClick={() => setSelectedSkillId(skill.id)}
                      className="text-left"
                    >
                      <Card
                        interactive
                        variant="glass"
                        className={cn(
                          "h-full p-5",
                          isSelected &&
                            "border-[rgba(216,168,79,0.48)] bg-[rgba(216,168,79,0.08)]",
                        )}
                      >
                        <div className="mb-4 flex flex-wrap items-center gap-2">
                          <Badge tone={categoryTones[skill.category]}>
                            {skillCategoryLabels[skill.category]}
                          </Badge>
                          <Badge tone="neutral">{skillLevelLabels[skill.level]}</Badge>
                        </div>

                        <h3 className="text-lg font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]">
                          {skill.name}
                        </h3>
                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-[var(--color-text-secondary)]">
                          {skill.description}
                        </p>

                        <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent-violet)] via-[var(--color-accent-blue)] to-[var(--color-accent-gold)]"
                            initial={{ width: 0 }}
                            whileInView={{ width: getLevelWidth(skill) }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </div>
                      </Card>
                    </motion.button>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          <Card variant="gradient" className="h-fit p-6 xl:sticky xl:top-28">
            <div className="light-sweep" />
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge tone={categoryTones[selectedSkill.category]}>
                {skillCategoryLabels[selectedSkill.category]}
              </Badge>
              <Badge tone="gold">{skillLevelLabels[selectedSkill.level]}</Badge>
            </div>

            <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--color-text-primary)]">
              {selectedSkill.name}
            </h3>
            <p className="mt-3 text-sm leading-6 text-[var(--color-text-secondary)]">
              {selectedSkill.description}
            </p>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-gold)]">
                Related projects
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedSkill.relatedProjects.map((projectId) => {
                  const slug = getProjectSlug(projectId);
                  const title = getProjectTitle(projectId);

                  return slug ? (
                    <Link key={projectId} to={`/projects/${slug}`}>
                      <Badge tone="blue" className="transition hover:border-[rgba(216,168,79,0.48)] hover:text-[var(--color-accent-gold)]">
                        {title}
                      </Badge>
                    </Link>
                  ) : (
                    <Badge key={projectId} tone="neutral">
                      {title}
                    </Badge>
                  );
                })}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-gold)]">
                Proof examples
              </p>
              <ul className="mt-3 space-y-3 text-sm leading-6 text-[var(--color-text-secondary)]">
                {selectedSkill.proofExamples.map((example) => (
                  <li key={example} className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--color-accent-gold)]" />
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-gold)]">
                Tags
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedSkill.tags.map((tag) => (
                  <Badge key={tag} tone="neutral">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/projects">
                <Button variant="primary">View project proof</Button>
              </Link>
              <Link to="/resume">
                <Button variant="ghost">Recruiter resume</Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </SectionShell>
  );
}
