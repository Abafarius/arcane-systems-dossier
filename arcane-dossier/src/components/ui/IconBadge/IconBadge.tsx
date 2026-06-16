import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";

type IconBadgeTone = "gold" | "violet" | "blue" | "success" | "neutral";

const tones: Record<IconBadgeTone, string> = {
  gold: "border-[rgba(216,168,79,0.32)] bg-[rgba(216,168,79,0.1)] text-[var(--color-accent-gold)]",
  violet: "border-[rgba(143,108,255,0.32)] bg-[rgba(143,108,255,0.1)] text-[var(--color-accent-violet)]",
  blue: "border-[rgba(93,168,255,0.32)] bg-[rgba(93,168,255,0.1)] text-[var(--color-accent-blue)]",
  success: "border-[rgba(110,231,168,0.32)] bg-[rgba(110,231,168,0.1)] text-[var(--color-success)]",
  neutral: "border-[var(--color-border)] bg-white/[0.04] text-[var(--color-text-secondary)]",
};

interface IconBadgeProps {
  icon: ReactNode;
  label: string;
  tone?: IconBadgeTone;
  className?: string;
}

export function IconBadge({ icon, label, tone = "neutral", className }: IconBadgeProps) {
  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium", tones[tone], className)}>
      <span className="grid size-4 place-items-center">{icon}</span>
      {label}
    </span>
  );
}
