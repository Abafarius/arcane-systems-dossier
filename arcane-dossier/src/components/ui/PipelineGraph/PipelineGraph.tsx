import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Card } from "../Card";

export interface PipelineStep {
  label: string;
  description: string;
  icon?: ReactNode;
}

interface PipelineGraphProps {
  steps: PipelineStep[];
}

export function PipelineGraph({ steps }: PipelineGraphProps) {
  return (
    <Card variant="technical" className="p-6">
      <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-accent-gold)]">Interactive pipeline</p>
      <div className="grid gap-4 md:grid-cols-5">
        {steps.map((step, index) => (
          <motion.div key={step.label} className="relative" whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 360, damping: 28 }}>
            {index < steps.length - 1 ? (
              <span className="pointer-events-none absolute left-[calc(100%-0.5rem)] top-1/2 hidden h-px w-6 bg-gradient-to-r from-[rgba(216,168,79,0.36)] to-transparent md:block" />
            ) : null}
            <div className="h-full rounded-2xl border border-[var(--color-border)] bg-black/20 p-4 text-center transition hover:border-[rgba(216,168,79,0.42)] hover:bg-white/[0.045]">
              <div className="mx-auto grid size-10 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-[var(--color-accent-blue)]">
                {step.icon ?? String(index + 1).padStart(2, "0")}
              </div>
              <p className="mt-3 font-medium text-[var(--color-text-primary)]">{step.label}</p>
              <p className="mt-2 text-xs leading-5 text-[var(--color-text-secondary)]">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
