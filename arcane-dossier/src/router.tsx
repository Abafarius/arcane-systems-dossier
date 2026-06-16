import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { RouteTransitionShell } from "./components/layout/RouteTransitionShell";
import { HomePage } from "./pages/HomePage";
import { MusicPage } from "./pages/MusicPage";
import { OraclePage } from "./pages/OraclePage";
import { ProjectCaseStudyPage } from "./pages/ProjectCaseStudyPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ResumePage } from "./pages/ResumePage";
import { SkillsPage } from "./pages/SkillsPage";
import { SystemPage } from "./pages/SystemPage";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <RouteTransitionShell>
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectCaseStudyPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/oracle" element={<OraclePage />} />
        <Route path="/music" element={<MusicPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/system" element={<SystemPage />} />
      </Routes>
    </RouteTransitionShell>
  );
}

export function AppRouter() {
  return (
    <HashRouter>
      <AnimatedRoutes />
    </HashRouter>
  );
}
