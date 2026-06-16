import { Card } from "../components/ui/Card";
import { PageShell } from "../layout/PageShell";
import { SectionShell } from "../layout/SectionShell";

export function OraclePage() {
  return (
    <PageShell>
      <SectionShell
        eyebrow="Portfolio Oracle"
        title="AI assistant layer comes after the static foundation"
        description="Next we will build a static retrieval assistant first, then add Ollama and browser LLM providers."
      >
        <Card>
          <p className="text-[var(--color-text-secondary)]">
            Planned pipeline: Query → Retrieval → Context → Provider → Grounded Answer → Source Cards.
          </p>
        </Card>
      </SectionShell>
    </PageShell>
  );
}
