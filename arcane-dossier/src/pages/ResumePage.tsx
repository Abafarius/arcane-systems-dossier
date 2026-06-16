import resume from "../data/resume.json";
import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import { PageShell } from "../layout/PageShell";
import { SectionShell } from "../layout/SectionShell";

type Contact = {
  label: string;
  value: string;
  href: string;
};

type ExperienceItem = {
  role: string;
  organization: string;
  location: string;
  period: string;
  type: string;
  summary: string;
  highlights: string[];
  relatedProjects: string[];
};

type EducationItem = {
  degree: string;
  field: string;
  institution: string;
  period: string;
  highlights: string[];
};

type SkillGroup = {
  group: string;
  items: string[];
};

type ResearchItem = {
  title: string;
  description: string;
  methods: string[];
  keywords: string[];
};

type PublicationItem = {
  title: string;
  publisher: string;
  issue: string;
  date: string;
  role: string;
  description: string;
  url: string;
  tags: string[];
};

type CertificationItem = {
  title: string;
  issuer: string;
  date: string;
  summary: string;
  url: string;
  tags: string[];
};

type AwardItem = {
  title: string;
  issuer: string;
  date: string;
  summary: string;
  tags: string[];
};

type LanguageItem = {
  name: string;
  level: string;
};

type ResumeData = {
  name: string;
  alternateName: string;
  title: string;
  location: string;
  summary: string;
  positioning: string[];
  roles: string[];
  highlights: string[];
  experience: ExperienceItem[];
  education: EducationItem[];
  skillGroups: SkillGroup[];
  featuredProjects: string[];
  research: ResearchItem[];
  publications: PublicationItem[];
  certifications: CertificationItem[];
  awards: AwardItem[];
  languages: LanguageItem[];
  contacts: Contact[];
};

const resumeData = resume as ResumeData;

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 text-sm leading-6 text-[var(--color-text-secondary)]">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--color-accent-gold)]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ResumeSectionTitle({ children }: { children: string }) {
  return (
    <h3 className="mb-5 text-xl font-semibold tracking-[-0.03em] text-[var(--color-text-primary)]">
      {children}
    </h3>
  );
}

function TagList({ tags, tone = "neutral" }: { tags: string[]; tone?: "neutral" | "gold" | "violet" | "blue" }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge key={tag} tone={tone}>
          {tag}
        </Badge>
      ))}
    </div>
  );
}

function ContactLink({ contact }: { contact: Contact }) {
  if (!contact.href) {
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-white/[0.04] p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent-gold)]">{contact.label}</p>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{contact.value}</p>
      </div>
    );
  }

  const external = contact.href.startsWith("http");

  return (
    <a
      href={contact.href}
      className="block rounded-2xl border border-[var(--color-border)] bg-white/[0.04] p-4 transition hover:border-[rgba(216,168,79,0.45)] hover:bg-white/[0.07]"
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent-gold)]">{contact.label}</p>
      <p className="mt-2 text-sm text-[var(--color-text-primary)]">{contact.value}</p>
    </a>
  );
}

function OptionalExternalLink({ href, children }: { href: string; children: string }) {
  if (!href) {
    return null;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="mt-4 inline-flex text-sm font-medium text-[var(--color-accent-blue)] transition hover:text-[var(--color-accent-gold)]"
    >
      {children} →
    </a>
  );
}

export function ResumePage() {
  return (
    <PageShell>
      <SectionShell
        eyebrow="Resume"
        title="Recruiter-friendly technical profile"
        description="A clean resume view that keeps the portfolio ATS-friendly: summary, career timeline, role fit, education, skills, research, publications, awards, languages and contacts."
      >
        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <Card className="p-7">
            <div className="flex flex-wrap gap-2">
              {resumeData.positioning.map((item, index) => (
                <Badge key={item} tone={index === 0 ? "gold" : index === 1 ? "blue" : "neutral"}>
                  {item}
                </Badge>
              ))}
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-[-0.055em] text-[var(--color-text-primary)] md:text-6xl">
              {resumeData.name}
            </h1>
            <p className="mt-2 text-lg text-[var(--color-text-secondary)]">{resumeData.alternateName}</p>
            <p className="mt-5 text-xl leading-8 text-[var(--color-text-primary)]">{resumeData.title}</p>
            <p className="mt-5 max-w-3xl leading-7 text-[var(--color-text-secondary)]">{resumeData.summary}</p>
            <p className="mt-5 text-sm text-[var(--color-text-secondary)]">{resumeData.location}</p>
          </Card>

          <Card className="p-7">
            <ResumeSectionTitle>Best fit roles</ResumeSectionTitle>
            <div className="flex flex-wrap gap-2">
              {resumeData.roles.map((role) => (
                <Badge key={role} tone="violet">
                  {role}
                </Badge>
              ))}
            </div>
          </Card>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="p-7">
            <ResumeSectionTitle>Career timeline</ResumeSectionTitle>
            <div className="space-y-7">
              {resumeData.experience.map((item) => (
                <div key={`${item.organization}-${item.role}-${item.period}`} className="border-l border-[rgba(216,168,79,0.35)] pl-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="gold">{item.type}</Badge>
                    <Badge>{item.period}</Badge>
                  </div>
                  <h4 className="mt-3 text-lg font-semibold text-[var(--color-text-primary)]">{item.role}</h4>
                  <p className="mt-1 text-sm text-[var(--color-accent-blue)]">{item.organization}</p>
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{item.location}</p>
                  <p className="mt-4 leading-7 text-[var(--color-text-secondary)]">{item.summary}</p>
                  <div className="mt-4">
                    <BulletList items={item.highlights} />
                  </div>
                  {item.relatedProjects.length > 0 && (
                    <div className="mt-4">
                      <TagList tags={item.relatedProjects} tone="blue" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-7">
            <ResumeSectionTitle>Proof highlights</ResumeSectionTitle>
            <BulletList items={resumeData.highlights} />
          </Card>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="p-7">
            <ResumeSectionTitle>Publications & research</ResumeSectionTitle>
            <div className="space-y-7">
              {resumeData.publications.map((item) => (
                <div key={item.title}>
                  <div className="flex flex-wrap gap-2">
                    <Badge tone="gold">{item.publisher}</Badge>
                    <Badge>{item.issue}</Badge>
                    <Badge>{item.date}</Badge>
                  </div>
                  <h4 className="mt-3 text-lg font-semibold text-[var(--color-text-primary)]">{item.title}</h4>
                  <p className="mt-3 leading-7 text-[var(--color-text-secondary)]">{item.description}</p>
                  <div className="mt-4">
                    <TagList tags={item.tags} tone="blue" />
                  </div>
                  <OptionalExternalLink href={item.url}>Open publication</OptionalExternalLink>
                </div>
              ))}

              {resumeData.research.map((item) => (
                <div key={item.title} className="border-t border-[var(--color-border)] pt-6">
                  <h4 className="text-lg font-semibold text-[var(--color-text-primary)]">{item.title}</h4>
                  <p className="mt-3 leading-7 text-[var(--color-text-secondary)]">{item.description}</p>
                  <div className="mt-4">
                    <TagList tags={[...item.methods, ...item.keywords]} tone="blue" />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-7">
            <ResumeSectionTitle>Core skill groups</ResumeSectionTitle>
            <div className="space-y-6">
              {resumeData.skillGroups.map((group) => (
                <div key={group.group}>
                  <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-gold)]">
                    {group.group}
                  </h4>
                  <TagList tags={group.items} />
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          <Card className="p-7 lg:col-span-2">
            <ResumeSectionTitle>Education</ResumeSectionTitle>
            <div className="space-y-6">
              {resumeData.education.map((item) => (
                <div key={`${item.degree}-${item.field}`} className="border-l border-[rgba(216,168,79,0.35)] pl-5">
                  <h4 className="text-lg font-semibold text-[var(--color-text-primary)]">
                    {item.degree} · {item.field}
                  </h4>
                  <p className="mt-1 text-sm text-[var(--color-accent-blue)]">{item.institution}</p>
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{item.period}</p>
                  <div className="mt-4">
                    <BulletList items={item.highlights} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid gap-5">
            <Card className="p-7">
              <ResumeSectionTitle>Languages</ResumeSectionTitle>
              <div className="space-y-4">
                {resumeData.languages.map((language) => (
                  <div key={language.name}>
                    <p className="font-medium text-[var(--color-text-primary)]">{language.name}</p>
                    <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{language.level}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-7">
              <ResumeSectionTitle>Contact</ResumeSectionTitle>
              <div className="grid gap-3">
                {resumeData.contacts.map((contact) => (
                  <ContactLink key={contact.label} contact={contact} />
                ))}
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <Card className="p-7">
            <ResumeSectionTitle>Certifications</ResumeSectionTitle>
            <div className="space-y-6">
              {resumeData.certifications.map((item) => (
                <div key={item.title}>
                  <div className="flex flex-wrap gap-2">
                    <Badge tone="gold">{item.issuer}</Badge>
                    <Badge>{item.date}</Badge>
                  </div>
                  <h4 className="mt-3 text-lg font-semibold text-[var(--color-text-primary)]">{item.title}</h4>
                  <p className="mt-3 leading-7 text-[var(--color-text-secondary)]">{item.summary}</p>
                  <div className="mt-4">
                    <TagList tags={item.tags} tone="blue" />
                  </div>
                  <OptionalExternalLink href={item.url}>Open certificate</OptionalExternalLink>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-7">
            <ResumeSectionTitle>Awards</ResumeSectionTitle>
            <div className="space-y-6">
              {resumeData.awards.map((item) => (
                <div key={item.title}>
                  <div className="flex flex-wrap gap-2">
                    <Badge tone="gold">{item.issuer}</Badge>
                    <Badge>{item.date}</Badge>
                  </div>
                  <h4 className="mt-3 text-lg font-semibold text-[var(--color-text-primary)]">{item.title}</h4>
                  <p className="mt-3 leading-7 text-[var(--color-text-secondary)]">{item.summary}</p>
                  <div className="mt-4">
                    <TagList tags={item.tags} tone="violet" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </SectionShell>
    </PageShell>
  );
}
