import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../../lib/cn";

interface CardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  interactive?: boolean;
}

export function Card({ children, className, interactive = false, ...props }: CardProps) {
  return (
    <article
      className={cn(
        "rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur",
        interactive && "transition hover:-translate-y-1 hover:border-[rgba(216,168,79,0.42)] hover:bg-white/[0.06]",
        className,
      )}
      {...props}
    >
      {children}
    </article>
  );
}
