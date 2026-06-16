import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";

interface TechNodeProps {
  label: string;
  description?: string;
  icon?: ReactNode;
  active?: boolean;
  className?: string;
}

export function TechNode({ label, description, icon, active = false, className }: TechNodeProps) {
  return (
    <div
      className={cn(
        "group relative rounded-2xl border bg-white/[0.035] p-4 transition duration-300 hover:-translate-y-1 hover:border-[rgba(216,168,79,0.38)] hover:bg-white/[0.055]",
        active ? "border-[rgba(216,168,79,0.48)] shadow-[0_0_34px_rgba(216,168,79,0.08)]" : "border-[var(--color-border)]",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        {icon ? <span className="grid size-9 place-items-center rounded-xl border border-white/[0.08] bg-black/20 text-[var(--color-accent-gold)]">{icon}</span> : null}
        <div>
          <p className="font-medium text-[var(--color-text-primary)]">{label}</p>
          {description ? <p className="mt-1 text-xs leading-5 text-[var(--color-text-secondary)]">{description}</p> : null}
        </div>
      </div>
    </div>
  );
}
