import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../../lib/cn";
import { staggerContainerVariants } from "../../lib/motion";

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "ul";
}

export function StaggerContainer({ children, className, as = "div" }: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion();
  const Component = motion[as];

  if (shouldReduceMotion) {
    const StaticComponent = as;
    return <StaticComponent className={className}>{children}</StaticComponent>;
  }

  return (
    <Component
      className={cn(className)}
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
    >
      {children}
    </Component>
  );
}
