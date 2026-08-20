import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/lib/site-data";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers at Meridian BPO | Support, SDR & Operations Roles" },
      {
        name: "description",
        content:
          "Join Meridian BPO. Open roles in customer support, virtual assistance, sales development, quality assurance and team leadership across global delivery centres.",
      },
      { property: "og:title", content: "Careers at Meridian BPO" },
      {
        property: "og:description",
        content: "Structured training, real career paths and dedicated client accounts.",
      },
    ],
  }),
  component: CareersPage,
});

const roles = [
  {
    title: "Customer Support Specialist",
    type: "Full-time · Shift-based",
    location: "Hybrid / Remote",
    summary: "Handle voice, chat and email support for a dedicated client account.",
  },
  {
    title: "Executive Virtual Assistant",
    type: "Full-time · Day shift",
    location: "Remote",
    summary: "Support founders and executives with calendar, inbox and reporting workflows.",
  },
  {
    title: "Sales Development Representative",
    type: "Full-time · Night shift",
    location: "Hybrid",
    summary: "Run outbound sequences and book qualified meetings for B2B clients.",
  },
  {
    title: "Quality Assurance Analyst",
    type: "Full-time",
    location: "Hybrid",
    summary: "Score interactions, run calibration sessions and drive coaching plans.",
  },
  {
    title: "Team Lead — Operations",
    type: "Full-time",
    location: "On-site",
    summary: "Own delivery, scheduling and performance for a client pod of 8-15 people.",
  },
  {
    title: "Back-Office Operations Associate",
    type: "Full-time",
    location: "On-site",
    summary: "Process orders, claims and documentation to accuracy and turnaround SLAs.",
  },
];

const benefits = [
  "Structured onboarding and paid training",
  "Clear promotion paths into QA and team lead roles",
  "Health coverage and shift allowances",
  "Modern delivery centres with reliable infrastructure",
  "Long-term client accounts, not rotating campaigns",
  "Performance bonuses tied to published scorecards",
];

function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build a career, not just a shift"
        description="We hire people who want to get good at operations — and we invest in training, coaching and progression to make that possible."
      >
        <Button variant="marigold" size="lg" asChild>
          <a href={`mailto:${site.email}?subject=Application`}>
            <Mail /> Send your CV
          </a>
        </Button>
      </PageHero>

      <section className="container-page py-20 md:py-24">
        <SectionHeading eyebrow="Open roles" title="Currently hiring" />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {roles.map((r) => (
            <article
              key={r.title}
              className="flex flex-col rounded-lg border border-border bg-card p-7 transition-colors hover:border-marigold"
            >
              <h3 className="text-lg text-charcoal">{r.title}</h3>
              <p className="mt-2 text-xs uppercase tracking-wider text-marigold">
                {r.type} · {r.location}
              </p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{r.summary}</p>
              <Button variant="outlineDark" className="mt-6 self-start" asChild>
                <a href={`mailto:${site.email}?subject=Application: ${r.title}`}>Apply now</a>
              </Button>
            </article>
          ))}
        </div>
      </section>

      <section className="surface-dark py-20 md:py-24">
        <div className="container-page">
          <SectionHeading eyebrow="Why join" title="What we offer" tone="light" />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <li
                key={b}
                className="rounded-md border border-offwhite/10 bg-offwhite/[0.04] px-6 py-5 text-sm text-offwhite/80"
              >
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
