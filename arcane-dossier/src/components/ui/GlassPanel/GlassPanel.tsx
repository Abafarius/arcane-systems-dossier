import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../../lib/cn";

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  interactive?: boolean;
}

export function GlassPanel({ children, className, interactive = false, ...props }: GlassPanelProps) {
  return (
    <div
      className={cn(
        "glass-panel rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 backdrop-blur-xl",
        interactive && "interactive-lift",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
