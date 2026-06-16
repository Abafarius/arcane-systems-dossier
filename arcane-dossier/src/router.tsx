import { HashRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { MusicPage } from "./pages/MusicPage";
import { OraclePage } from "./pages/OraclePage";
import { ProjectCaseStudyPage } from "./pages/ProjectCaseStudyPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ResumePage } from "./pages/ResumePage";
import { SystemPage } from "./pages/SystemPage";

export function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectCaseStudyPage />} />
        <Route path="/oracle" element={<OraclePage />} />
        <Route path="/music" element={<MusicPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/system" element={<SystemPage />} />
      </Routes>
    </HashRouter>
  );
}
