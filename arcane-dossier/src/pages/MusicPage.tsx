import { Card } from "../components/ui/Card";
import { PageShell } from "../layout/PageShell";
import { SectionShell } from "../layout/SectionShell";

export function MusicPage() {
  return (
    <PageShell>
      <SectionShell
        eyebrow="Sonic atlas"
        title="Music constellation will become the data visualization showcase"
        description="For now this page is reserved for the 2D/3D music map MVP."
      >
        <Card>
          <p className="text-[var(--color-text-secondary)]">
            Planned modes: Genre Galaxy, Mood Map, Timeline, Hidden Gems, Artist Gravity and Energy / Emotion Map.
          </p>
        </Card>
      </SectionShell>
    </PageShell>
  );
}
