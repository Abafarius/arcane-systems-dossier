import { Card } from "../components/ui/Card";
import { PageShell } from "../layout/PageShell";
import { SectionShell } from "../layout/SectionShell";

const layers = ["Static-first deployment", "Token-driven design system", "Feature-based architecture", "Swappable AI providers", "Lazy 3D scenes"];

export function SystemPage() {
  return (
    <PageShell>
      <SectionShell
        eyebrow="System case study"
        title="This portfolio is also a product architecture demo"
        description="The system page explains how the site itself is built, scaled and deployed."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {layers.map((layer) => (
            <Card key={layer}>
              <p className="font-medium text-[var(--color-text-primary)]">{layer}</p>
            </Card>
          ))}
        </div>
      </SectionShell>
    </PageShell>
  );
}
