import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../../lib/cn";

interface CardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  interactive?: boolean;
  variant?: "default" | "glass" | "gradient";
}

export function Card({ children, className, interactive = false, variant = "default", ...props }: CardProps) {
  return (
    <article
      className={cn(
        "group/card relative overflow-hidden rounded-3xl border p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl",
        variant === "default" && "border-[var(--color-border)] bg-[var(--color-surface-elevated)]",
        variant === "glass" && "glass-panel border-[var(--color-border)] bg-[rgba(16,19,32,0.64)]",
        variant === "gradient" && "gradient-border bg-[rgba(16,19,32,0.72)]",
        interactive && "interactive-lift cursor-pointer",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />
      {children}
    </article>
  );
}
