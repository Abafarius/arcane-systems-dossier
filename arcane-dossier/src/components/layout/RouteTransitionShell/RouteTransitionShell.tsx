import type { ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { PageTransition } from "../../motion";

export function RouteTransitionShell({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <PageTransition key={location.pathname}>{children}</PageTransition>
    </AnimatePresence>
  );
}
