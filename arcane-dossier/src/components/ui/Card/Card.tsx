import type { HTMLAttributes, ReactNode } from "react";
import { useMouseGlow } from "../../../hooks/useMouseGlow";
import { cn } from "../../../lib/cn";

interface CardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  interactive?: boolean;
  variant?: "default" | "glass" | "gradient" | "technical" | "arcane" | "elevated";
}

const variants: Record<NonNullable<CardProps["variant"]>, string> = {
  default: "border-[var(--color-border)] bg-[var(--color-surface-elevated)]",
  glass: "glass-panel border-[var(--color-border)] bg-[rgba(16,19,32,0.64)]",
  gradient: "gradient-border bg-[rgba(16,19,32,0.72)]",
  technical: "border-[rgba(93,168,255,0.22)] bg-[linear-gradient(145deg,rgba(12,17,31,0.82),rgba(7,8,18,0.72))]",
  arcane: "border-[rgba(216,168,79,0.24)] bg-[linear-gradient(145deg,rgba(31,22,12,0.38),rgba(15,10,31,0.42),rgba(7,8,18,0.72))]",
  elevated: "border-white/[0.14] bg-[rgba(20,24,40,0.82)] shadow-[0_34px_120px_rgba(0,0,0,0.42)]",
};

export function Card({ children, className, interactive = false, variant = "default", ...props }: CardProps) {
  const { glowHandlers, glowStyle } = useMouseGlow();

  return (
    <article
      className={cn(
        "group/card mouse-glow-card relative overflow-hidden rounded-3xl border p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl",
        variants[variant],
        interactive && "interactive-lift cursor-pointer",
        className,
      )}
      style={{ ...glowStyle, ...props.style }}
      {...(interactive ? glowHandlers : {})}
      {...props}
    >
      <span className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />
      <span className="pointer-events-none absolute inset-y-8 right-0 w-px bg-gradient-to-b from-transparent via-[rgba(216,168,79,0.22)] to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />
      <div className="relative z-10">{children}</div>
    </article>
  );
}
