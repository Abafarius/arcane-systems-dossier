import { Reveal, StaggerContainer, StaggerItem } from "../components/motion";
import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import { MetricCard } from "../components/ui/MetricCard";
import { PageShell } from "../layout/PageShell";
import { SectionShell } from "../layout/SectionShell";

const modes = ["Genre Galaxy", "Mood Map", "Timeline", "Hidden Gems", "Artist Gravity", "Energy / Emotion Map"];
const stars = Array.from({ length: 28 }, (_, index) => ({
  id: index,
  left: `${8 + ((index * 23) % 84)}%`,
  top: `${12 + ((index * 37) % 72)}%`,
  size: 4 + (index % 4) * 2,
}));

export function MusicPage() {
  return (
    <PageShell>
      <SectionShell
        eyebrow="Sonic atlas"
        title="Music constellation as a data visualization showcase"
        description="The MVP shell frames music taste as structured data: artists, moods, genres and personal eras become a constellation map instead of a normal list."
      >
        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <Reveal>
            <Card variant="gradient" className="relative min-h-[420px] overflow-hidden p-7">
              <div className="absolute inset-0 skill-constellation opacity-60" />
              {stars.map((star) => (
                <span
                  key={star.id}
                  className="absolute rounded-full bg-[var(--color-accent-gold)] shadow-[0_0_18px_rgba(216,168,79,0.5)]"
                  style={{ left: star.left, top: star.top, width: star.size, height: star.size }}
                />
              ))}
              <div className="relative z-10 flex h-full min-h-[360px] flex-col justify-between">
                <div>
                  <Badge tone="violet">Pre-MVP concept shell</Badge>
                  <h2 className="mt-5 max-w-xl text-3xl font-semibold tracking-[-0.04em] text-[var(--color-text-primary)]">Sonic Atlas</h2>
                  <p className="mt-4 max-w-xl leading-7 text-[var(--color-text-secondary)]">
                    A future Three.js / 2D fallback visualization where tracks are stars, moods are spatial dimensions and hidden gems become highlighted nodes.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <MetricCard label="Data" value="JSON" description="Replaceable source." />
                  <MetricCard label="View" value="2D/3D" description="Fallback first." />
                  <MetricCard label="Mode" value="Filters" description="Searchable map." />
                </div>
              </div>
            </Card>
          </Reveal>

          <StaggerContainer className="grid gap-4">
            {modes.map((mode, index) => (
              <StaggerItem key={mode}>
                <Card interactive variant="glass" className="p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent-gold)]">Mode 0{index + 1}</p>
                      <h3 className="mt-2 font-semibold text-[var(--color-text-primary)]">{mode}</h3>
                    </div>
                    <Badge tone={index < 2 ? "gold" : "neutral"}>{index < 2 ? "MVP" : "Later"}</Badge>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </SectionShell>
    </PageShell>
  );
}
