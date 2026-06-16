import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../../lib/cn";

interface AnimatedBorderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function AnimatedBorder({ children, className, ...props }: AnimatedBorderProps) {
  return (
    <div className={cn("gradient-border", className)} {...props}>
      {children}
    </div>
  );
}
