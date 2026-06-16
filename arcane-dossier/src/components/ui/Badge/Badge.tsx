import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../../lib/cn";

type BadgeTone = "gold" | "violet" | "blue" | "neutral" | "success";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  tone?: BadgeTone;
}

const tones: Record<BadgeTone, string> = {
  gold: "border-[rgba(216,168,79,0.4)] bg-[rgba(216,168,79,0.1)] text-[var(--color-accent-gold)]",
  violet: "border-[rgba(143,108,255,0.4)] bg-[rgba(143,108,255,0.1)] text-[var(--color-accent-violet)]",
  blue: "border-[rgba(93,168,255,0.4)] bg-[rgba(93,168,255,0.1)] text-[var(--color-accent-blue)]",
  neutral: "border-[var(--color-border)] bg-white/[0.05] text-[var(--color-text-secondary)]",
  success: "border-[rgba(110,231,168,0.38)] bg-[rgba(110,231,168,0.1)] text-[var(--color-success)]",
};

export function Badge({ children, className, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium leading-none",
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
