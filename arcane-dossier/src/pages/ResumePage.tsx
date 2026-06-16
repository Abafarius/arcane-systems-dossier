import { Card } from "../components/ui/Card";
import { PageShell } from "../layout/PageShell";
import { SectionShell } from "../layout/SectionShell";

export function ResumePage() {
  return (
    <PageShell>
      <SectionShell
        eyebrow="Resume"
        title="ATS-friendly resume page"
        description="This page will hold the clean recruiter version: summary, education, skills, projects, research, languages and contacts."
      >
        <Card>
          <p className="text-[var(--color-text-secondary)]">
            Next step: move all resume content into resume.json and render it here without hardcoding.
          </p>
        </Card>
      </SectionShell>
    </PageShell>
  );
}
