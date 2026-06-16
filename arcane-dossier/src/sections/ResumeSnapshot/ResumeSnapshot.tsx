import resume from "../../data/resume.json";
import { Badge } from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";
import { SectionShell } from "../../layout/SectionShell";

type ResumeSnapshotData = typeof resume;

const resumeData: ResumeSnapshotData = resume;

export function ResumeSnapshot() {
  return (
    <SectionShell
      id="resume-snapshot"
      eyebrow="Recruiter view"
      title="Traditional resume signal, without losing the flagship feel"
      description="The site can be explored like an interactive dossier, but the core profile stays clear: role fit, education, skills, research and contact path."
    >
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <div className="mb-5 flex flex-wrap gap-2">
            {resumeData.roles.slice(0, 4).map((role, index) => (
              <Badge key={role} tone={index === 0 ? "gold" : "neutral"}>
                {role}
              </Badge>
            ))}
          </div>
          <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[var(--color-text-primary)]">
            {resumeData.title}
          </h3>
          <p className="mt-4 leading-7 text-[var(--color-text-secondary)]">{resumeData.summary}</p>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Proof highlights</h3>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--color-text-secondary)]">
            {resumeData.highlights.slice(0, 4).map((highlight) => (
              <li key={highlight} className="flex gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--color-accent-gold)]" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </SectionShell>
  );
}
