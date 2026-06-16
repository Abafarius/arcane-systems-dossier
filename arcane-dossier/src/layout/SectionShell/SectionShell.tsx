import type { ReactNode } from "react";
import { Reveal } from "../../components/motion";
import { cn } from "../../lib/cn";

interface SectionShellProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  id?: string;
  className?: string;
}

export function SectionShell({ eyebrow, title, description, children, id, className }: SectionShellProps) {
  return (
    <section id={id} className={cn("mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24", className)}>
      <Reveal>
        <div className="mb-10 max-w-3xl">
          {eyebrow ? (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-accent-gold)]">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--color-text-primary)] md:text-5xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-base leading-7 text-[var(--color-text-secondary)] md:text-lg">
              {description}
            </p>
          ) : null}
        </div>
      </Reveal>
      <Reveal delay={0.05}>{children}</Reveal>
    </section>
  );
}
