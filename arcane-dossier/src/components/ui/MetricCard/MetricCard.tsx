import type { HTMLAttributes } from "react";
import { cn } from "../../../lib/cn";

interface MetricCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  description?: string;
}

export function MetricCard({ label, value, description, className, ...props }: MetricCardProps) {
  return (
    <div className={cn("rounded-2xl border border-[var(--color-border)] bg-white/[0.035] p-4", className)} {...props}>
      <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-accent-gold)]">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-text-primary)]">{value}</p>
      {description ? <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">{description}</p> : null}
    </div>
  );
}
