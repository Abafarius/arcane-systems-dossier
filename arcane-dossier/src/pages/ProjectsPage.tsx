import { PageShell } from "../layout/PageShell";
import { ProjectsQuestLog } from "../sections/ProjectsQuestLog";

export function ProjectsPage() {
  return (
    <PageShell>
      <ProjectsQuestLog
        showFilters
        title="Project Quest Log"
        description="Filter the portfolio by technical signal: AI, backend, frontend, finance, data, research and creative coding. Each card opens into a structured case study."
      />
    </PageShell>
  );
}
