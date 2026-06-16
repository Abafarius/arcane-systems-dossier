import type { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { navItems } from "../../config/nav.config";
import { siteConfig } from "../../config/site.config";
import { cn } from "../../lib/cn";

interface PageShellProps {
  children: ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="min-h-screen overflow-hidden">
      <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[rgba(7,8,18,0.76)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link to="/" className="group flex items-center gap-3" aria-label="Go to home page">
            <span className="grid size-9 place-items-center rounded-full border border-[rgba(216,168,79,0.35)] bg-[rgba(216,168,79,0.1)] text-sm text-[var(--color-accent-gold)]">
              AS
            </span>
            <span>
              <span className="block text-sm font-semibold tracking-wide text-[var(--color-text-primary)]">
                {siteConfig.name}
              </span>
              <span className="block text-xs text-[var(--color-text-secondary)]">
                {siteConfig.owner}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-2 md:flex" aria-label="Main navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "rounded-full px-3 py-2 text-sm text-[var(--color-text-secondary)] transition hover:bg-white/5 hover:text-[var(--color-text-primary)]",
                    isActive && "bg-white/[0.08] text-[var(--color-text-primary)]",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-[var(--color-border)] px-5 py-10 text-center text-sm text-[var(--color-text-secondary)]">
        Built as a static-first interactive portfolio system.
      </footer>
    </div>
  );
}
