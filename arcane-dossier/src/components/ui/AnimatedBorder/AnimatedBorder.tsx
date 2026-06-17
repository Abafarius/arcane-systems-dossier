import type { HTMLAttributes, ReactNode } from "react";
import { InteractiveSurface } from "../InteractiveSurface";

interface AnimatedBorderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function AnimatedBorder({ children, ...props }: AnimatedBorderProps) {
  return (
    <InteractiveSurface as="div" variant="arcane" {...props}>
      {children}
    </InteractiveSurface>
  );
}
