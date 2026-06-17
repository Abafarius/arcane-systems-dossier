import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../../lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-[rgba(216,168,79,0.52)] bg-[rgba(216,168,79,0.16)] text-[var(--color-text-primary)] shadow-[0_0_24px_rgba(216,168,79,0.08)] hover:bg-[rgba(216,168,79,0.24)] hover:shadow-[0_0_34px_rgba(216,168,79,0.22)]",
  secondary:
    "border-[rgba(143,108,255,0.44)] bg-[rgba(143,108,255,0.13)] text-[var(--color-text-primary)] shadow-[0_0_24px_rgba(143,108,255,0.08)] hover:bg-[rgba(143,108,255,0.22)] hover:shadow-[0_0_34px_rgba(143,108,255,0.20)]",
  ghost:
    "border-[var(--color-border)] bg-white/[0.025] text-[var(--color-text-secondary)] hover:border-[rgba(216,168,79,0.32)] hover:bg-white/[0.065] hover:text-[var(--color-text-primary)]",
};

export function Button({ children, className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "interactive-lift shimmer-button inline-flex items-center justify-center gap-2 rounded-full border px-5 py-2.5 font-mono text-[13px] font-semibold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-gold)] active:translate-y-0",
        variants[variant],
        className,
      )}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  );
}
