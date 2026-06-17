import type { HTMLAttributes, ReactNode } from "react";
import { useMouseGlow } from "../../../hooks/useMouseGlow";
import { cn } from "../../../lib/cn";

export type InteractiveSurfaceVariant = "default" | "glass" | "technical" | "arcane" | "elevated";

interface InteractiveSurfaceProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: "article" | "div" | "section";
  interactive?: boolean;
  variant?: InteractiveSurfaceVariant;
  density?: "compact" | "normal" | "spacious";
}

const variantClasses: Record<InteractiveSurfaceVariant, string> = {
  default: "border-[var(--color-border)] bg-[var(--color-surface-elevated)]",
  glass: "border-white/[0.12] bg-[rgba(16,19,32,0.66)] backdrop-blur-xl",
  technical:
    "border-[rgba(93,168,255,0.2)] bg-[linear-gradient(145deg,rgba(10,15,28,0.84),rgba(6,8,18,0.76))]",
  arcane:
    "border-[rgba(216,168,79,0.24)] bg-[linear-gradient(145deg,rgba(35,25,12,0.34),rgba(24,16,44,0.32),rgba(7,8,18,0.78))]",
  elevated: "border-white/[0.14] bg-[rgba(20,24,40,0.84)] shadow-[0_34px_120px_rgba(0,0,0,0.44)]",
};

const densityClasses: Record<NonNullable<InteractiveSurfaceProps["density"]>, string> = {
  compact: "p-4",
  normal: "p-6",
  spacious: "p-7 md:p-8",
};

export function InteractiveSurface({
  children,
  as = "article",
  className,
  interactive = false,
  variant = "glass",
  density = "normal",
  ...props
}: InteractiveSurfaceProps) {
  const Component = as;
  const { glowHandlers, glowStyle } = useMouseGlow();

  return (
    <Component
      className={cn(
        "group/surface interactive-surface relative isolate overflow-hidden rounded-3xl border shadow-[0_24px_80px_rgba(0,0,0,0.30)]",
        "transition-[transform,border-color,box-shadow,background-color] duration-300 ease-out",
        variantClasses[variant],
        densityClasses[density],
        interactive && "cursor-pointer hover:-translate-y-1 hover:border-[rgba(216,168,79,0.46)] hover:shadow-[0_30px_120px_rgba(0,0,0,0.44),0_0_46px_rgba(216,168,79,0.11)]",
        className,
      )}
      style={{ ...glowStyle, ...props.style }}
      {...(interactive ? glowHandlers : {})}
      {...props}
    >
      <span className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-[var(--mouse-opacity,0)] transition-opacity duration-300 [background:radial-gradient(420px_circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(216,168,79,0.18),rgba(143,108,255,0.08)_34%,transparent_62%)]" />
      <span className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/surface:opacity-100 [background:linear-gradient(135deg,rgba(216,168,79,0.34),rgba(143,108,255,0.18),rgba(93,168,255,0.16),rgba(216,168,79,0.1))]" />
      <span className="pointer-events-none absolute inset-px rounded-[calc(1.5rem-1px)] bg-[linear-gradient(145deg,rgba(7,8,18,0.42),rgba(7,8,18,0.12))]" />
      <span className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] [background-size:34px_34px] [mask-image:linear-gradient(180deg,black,transparent_88%)]" />
      <span className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity duration-500 group-hover/surface:opacity-100" />
      <div className="relative z-10">{children}</div>
    </Component>
  );
}
