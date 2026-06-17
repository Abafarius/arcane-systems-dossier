import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navItems } from "../../config/nav.config";
import { getIcon } from "../../config/iconMap";
import { siteConfig } from "../../config/site.config";
import { cn } from "../../lib/cn";

interface PageShellProps {
  children: ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  const location = useLocation();

  return (
    <div className="page-atmosphere min-h-screen overflow-hidden bg-[var(--color-background)]">
      <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[rgba(7,8,18,0.72)] backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link to="/" className="group flex items-center gap-3" aria-label="Go to home page">
            <span className="relative grid size-10 place-items-center rounded-full border border-[rgba(216,168,79,0.38)] bg-[rgba(216,168,79,0.1)] text-sm text-[var(--color-accent-gold)] shadow-[0_0_30px_rgba(216,168,79,0.08)] transition group-hover:border-[rgba(216,168,79,0.7)] group-hover:shadow-[0_0_34px_rgba(216,168,79,0.18)]">
              <span className="absolute inset-1 rounded-full border border-white/[0.04]" />
              AS
            </span>
            <span>
              <span className="block font-heading text-sm font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]">
                {siteConfig.name}
              </span>
              <span className="block font-mono text-[11px] text-[var(--color-text-secondary)]">
                {siteConfig.owner}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 rounded-full border border-[var(--color-border)] bg-white/[0.03] p-1 md:flex" aria-label="Main navigation">
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.href);
              const Icon = getIcon(item.icon);

              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "relative inline-flex items-center gap-2 rounded-full px-3.5 py-2 font-mono text-[13px] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-gold)]",
                    isActive ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full border border-white/[0.08] bg-white/[0.08] shadow-[0_0_24px_rgba(143,108,255,0.16)]"
                      transition={{ type: "spring", stiffness: 360, damping: 32 }}
                    />
                  ) : null}
                  <Icon className="relative z-10 size-4" strokeWidth={1.8} />
                  <span className="relative z-10">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="relative z-10">{children}</main>

      <footer className="relative z-10 border-t border-[var(--color-border)] px-5 py-10 text-center text-sm text-[var(--color-text-secondary)]">
        <span className="text-[var(--color-accent-gold)]">Arcane Systems Dossier</span> · static-first interactive portfolio system · designed to stay readable without the effects.
      </footer>
    </div>
  );
}
