import { useState } from "react";
import { motion } from "framer-motion";
import { Music, RadioTower, Search, Sparkles, Waves } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "../components/motion";
import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import { MetricCard } from "../components/ui/MetricCard";
import { PageShell } from "../layout/PageShell";
import { SectionShell } from "../layout/SectionShell";
import { cn } from "../lib/cn";

const modes = ["Genre Galaxy", "Mood Map", "Timeline", "Hidden Gems", "Artist Gravity", "Energy / Emotion Map"];
type MusicTrack = { title: string; genre: string; mood: string; x: number; y: number; tone: "gold" | "violet" | "blue" | "success" };

const tracks: MusicTrack[] = [
  { title: "Dark club pressure", genre: "Electro / Techno", mood: "Dangerous", x: 18, y: 34, tone: "gold" },
  { title: "Hypnotic bassline", genre: "Brostep", mood: "Locked-in", x: 42, y: 22, tone: "violet" },
  { title: "Odd pop artifact", genre: "Alt pop", mood: "Uncanny", x: 62, y: 48, tone: "blue" },
  { title: "Hidden gem", genre: "Indie", mood: "Personal", x: 78, y: 26, tone: "success" },
  { title: "Late-night system", genre: "Darkwave", mood: "Neon", x: 32, y: 70, tone: "violet" },
  { title: "Sonic atlas core", genre: "Mixed", mood: "Signature", x: 70, y: 76, tone: "gold" },
];

const toneClass = {
  gold: "bg-[var(--color-accent-gold)] shadow-[0_0_24px_rgba(216,168,79,0.58)]",
  violet: "bg-[var(--color-accent-violet)] shadow-[0_0_24px_rgba(143,108,255,0.58)]",
  blue: "bg-[var(--color-accent-blue)] shadow-[0_0_24px_rgba(93,168,255,0.58)]",
  success: "bg-[var(--color-success)] shadow-[0_0_24px_rgba(110,231,168,0.46)]",
};

export function MusicPage() {
  const [activeMode, setActiveMode] = useState(modes[0]);
  const [activeTrack, setActiveTrack] = useState(tracks[0]);

  return (
    <PageShell>
      <SectionShell
        eyebrow="Sonic atlas"
        title="Music constellation as a data visualization showcase"
        description="The MVP shell frames music taste as structured data: artists, moods, genres and personal eras become a constellation map instead of a normal list."
      >
        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <Reveal>
            <Card variant="arcane" className="relative min-h-[500px] overflow-hidden p-7">
              <div className="absolute inset-0 architecture-grid opacity-60" />
              <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-70" aria-hidden>
                {tracks.map((track, index) => (
                  <motion.line
                    key={`${track.title}-line`}
                    x1="50%"
                    y1="50%"
                    x2={`${track.x}%`}
                    y2={`${track.y}%`}
                    stroke="rgba(216,168,79,0.22)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.08 }}
                  />
                ))}
              </svg>

              {tracks.map((track, index) => (
                <motion.button
                  key={track.title}
                  type="button"
                  onClick={() => setActiveTrack(track)}
                  className="absolute z-10 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/[0.18] bg-black/45 p-2 backdrop-blur-md transition hover:border-[rgba(216,168,79,0.55)]"
                  style={{ left: `${track.x}%`, top: `${track.y}%` }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: activeTrack.title === track.title ? 1.28 : 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 420, damping: 28, delay: index * 0.05 }}
                  title={track.title}
                >
                  <span className={cn("size-2.5 rounded-full", toneClass[track.tone])} />
                </motion.button>
              ))}

              <div className="relative z-20 flex h-full min-h-[440px] flex-col justify-between">
                <div>
                  <Badge tone="violet">Pre-MVP interactive shell</Badge>
                  <h2 className="mt-5 max-w-xl text-4xl font-semibold tracking-[-0.05em] text-[var(--color-text-primary)]">Sonic Atlas</h2>
                  <p className="mt-4 max-w-xl leading-7 text-[var(--color-text-secondary)]">
                    A future Three.js / 2D fallback visualization where tracks are stars, moods are spatial dimensions and hidden gems become highlighted nodes.
                  </p>
                </div>

                <div className="rounded-3xl border border-[var(--color-border)] bg-black/30 p-5 backdrop-blur-md">
                  <div className="mb-3 flex items-center gap-3 text-[var(--color-accent-gold)]">
                    <RadioTower className="size-5" />
                    <span className="font-mono text-xs uppercase tracking-[0.22em]">selected signal</span>
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">{activeTrack.title}</h3>
                  <p className="mt-2 text-sm text-[var(--color-accent-blue)]">{activeTrack.genre}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">Mood vector: {activeTrack.mood}. This is mock data now, built for real exported music data later.</p>
                </div>
              </div>
            </Card>
          </Reveal>

          <div className="space-y-5">
            <div className="grid gap-3 sm:grid-cols-3">
              <MetricCard label="Data" value="JSON" description="Replaceable source." />
              <MetricCard label="View" value="2D/3D" description="Fallback first." />
              <MetricCard label="Mode" value="Filters" description="Searchable map." />
            </div>

            <StaggerContainer className="grid gap-4">
              {modes.map((mode, index) => (
                <StaggerItem key={mode}>
                  <button type="button" onClick={() => setActiveMode(mode)} className="w-full text-left">
                    <Card interactive variant={activeMode === mode ? "gradient" : "glass"} className="p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="grid size-10 place-items-center rounded-2xl border border-white/[0.08] bg-white/[0.04] text-[var(--color-accent-gold)]">
                            {index % 3 === 0 ? <Music className="size-5" /> : index % 3 === 1 ? <Waves className="size-5" /> : <Search className="size-5" />}
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent-gold)]">Mode 0{index + 1}</p>
                            <h3 className="mt-1 font-semibold text-[var(--color-text-primary)]">{mode}</h3>
                          </div>
                        </div>
                        <Badge tone={index < 2 ? "gold" : "neutral"}>{activeMode === mode ? "Active" : index < 2 ? "MVP" : "Later"}</Badge>
                      </div>
                    </Card>
                  </button>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <Card variant="technical" className="p-5">
              <div className="flex items-start gap-3">
                <Sparkles className="mt-1 size-5 text-[var(--color-accent-violet)]" />
                <p className="text-sm leading-6 text-[var(--color-text-secondary)]">
                  Full data-driven Music Galaxy comes next: real track metadata, clusters, mood vectors and search.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </SectionShell>
    </PageShell>
  );
}
