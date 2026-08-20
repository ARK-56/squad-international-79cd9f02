import { createFileRoute } from "@tanstack/react-router";
import teamImage from "@/assets/team-about.jpg";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { SectionHeading } from "@/components/section-heading";
import { stats } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Squad International | Operational Support Partner" },
      {
        name: "description",
        content:
          "Squad International is an outsourcing partner providing dedicated teams, customer and operational management, and growth support for scaling businesses.",
      },
      { property: "og:title", content: "About Squad International" },
      {
        property: "og:description",
        content: "Who we are, how we operate, and the principles behind every engagement.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    title: "Ownership",
    body: "Every engagement has a named lead who is accountable for delivery, not a shared inbox.",
  },
  {
    title: "Documentation",
    body: "If it is not written down, it is not a process. SOPs are owned, versioned and reviewed.",
  },
  {
    title: "Measurement",
    body: "We agree the metrics before launch and report against them, including when they slip.",
  },
  {
    title: "Restraint",
    body: "We say no to work we cannot deliver well. Overselling costs both sides more than it earns.",
  },
];

const milestones = [
  { phase: "Discovery", detail: "Objectives, audience, services and conversion goals confirmed." },
  { phase: "Design", detail: "Operating model, roles, SLAs and reporting agreed in writing." },
  { phase: "Build", detail: "Recruit, train and certify the team against your standards." },
  { phase: "Transition", detail: "Phased handover with parallel running and QA safeguards." },
  { phase: "Run", detail: "Weekly reporting, QA sampling and coaching cadence." },
  { phase: "Improve", detail: "Quarterly reviews for scope, automation and cost efficiency." },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="An outsourcing partner built around accountability"
        description="We provide dedicated teams and business support functions — combining operational execution, customer management, lead generation and growth support under one delivery model."
      />

      <section className="container-page grid items-center gap-14 py-20 lg:grid-cols-2 md:py-24">
        <div className="overflow-hidden rounded-lg border border-border">
          <img
            src={teamImage}
            alt="Squad International delivery team in a planning session"
            width={1400}
            height={900}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <SectionHeading
            eyebrow="Who we are"
            title="Operations people, not a staffing broker"
            description="We do not hand you a CV and disappear. We design the operating model, hire against it, train the team, run quality control and report on performance — the same way an internal operations leader would."
          />
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            That model works because it removes the two things that make outsourcing fail: unclear
            ownership and undocumented process. Our clients keep control of priorities and standards;
            we take responsibility for capacity, continuity and quality.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-6">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl text-charcoal">{s.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="surface-dark py-20 md:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Principles"
            title="How we work"
            tone="light"
            description="Four commitments that shape every engagement."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-lg border border-offwhite/10 bg-offwhite/[0.04] p-7">
                <h3 className="text-lg text-offwhite">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-offwhite/65">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20 md:py-24">
        <SectionHeading
          eyebrow="Engagement path"
          title="From first call to steady state"
          description="A predictable sequence, so you always know what happens next."
        />
        <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {milestones.map((m, idx) => (
            <li key={m.phase} className="rounded-lg border border-border bg-card p-7">
              <span className="font-display text-3xl text-marigold">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg text-charcoal">{m.phase}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <CtaBand />
    </>
  );
}
