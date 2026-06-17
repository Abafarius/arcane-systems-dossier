import type { HTMLAttributes, ReactNode } from "react";
import { InteractiveSurface } from "../InteractiveSurface";

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  interactive?: boolean;
}

export function GlassPanel({ children, interactive = false, ...props }: GlassPanelProps) {
  return (
    <InteractiveSurface as="div" variant="glass" interactive={interactive} {...props}>
      {children}
    </InteractiveSurface>
  );
}
