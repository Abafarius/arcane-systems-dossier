import type { HTMLAttributes, ReactNode } from "react";
import { InteractiveSurface, type InteractiveSurfaceVariant } from "../InteractiveSurface";

interface CardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  interactive?: boolean;
  variant?: InteractiveSurfaceVariant | "gradient";
}

function normalizeVariant(variant: CardProps["variant"]): InteractiveSurfaceVariant {
  if (variant === "gradient") return "arcane";
  return variant ?? "default";
}

export function Card({ children, interactive = false, variant = "default", ...props }: CardProps) {
  return (
    <InteractiveSurface interactive={interactive} variant={normalizeVariant(variant)} {...props}>
      {children}
    </InteractiveSurface>
  );
}
