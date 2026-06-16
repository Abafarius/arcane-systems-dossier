import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../../lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-[rgba(216,168,79,0.45)] bg-[rgba(216,168,79,0.16)] text-[var(--color-text-primary)] hover:bg-[rgba(216,168,79,0.24)]",
  secondary:
    "border-[rgba(143,108,255,0.38)] bg-[rgba(143,108,255,0.12)] text-[var(--color-text-primary)] hover:bg-[rgba(143,108,255,0.2)]",
  ghost:
    "border-[var(--color-border)] bg-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/5",
};

export function Button({ children, className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full border px-5 py-2.5 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-gold)]",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
