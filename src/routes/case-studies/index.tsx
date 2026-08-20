import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { caseStudies } from "@/lib/site-data";

export const Route = createFileRoute("/case-studies/")({
  head: () => ({
    meta: [
      { title: "BPO Case Studies | Measurable Outsourcing Results" },
      {
        name: "description",
        content:
          "Real outsourcing engagements: peak-season support, outbound pipeline generation and 24/7 logistics desks — with the numbers behind them.",
      },
      { property: "og:title", content: "BPO Case Studies | Meridian BPO" },
      {
        property: "og:description",
        content: "Three engagements, three problems solved, with measurable outcomes.",
      },
    ],
  }),
  component: CaseStudiesPage,
});

function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="Engagements, not testimonials"
        description="What the problem was, what we changed, and what the numbers did afterwards."
      />

      <section className="container-page space-y-6 py-20 md:py-24">
        {caseStudies.map((c) => (
          <article
            key={c.slug}
            className="grid gap-8 rounded-lg border border-border bg-card p-8 md:grid-cols-[1.2fr_0.8fr] md:p-10"
          >
            <div>
              <span className="eyebrow">
                {c.industry} · {c.service}
              </span>
              <h2 className="mt-3 text-2xl text-charcoal md:text-3xl">{c.client}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{c.challenge}</p>
              <Link
                to="/case-studies/$slug"
                params={{ slug: c.slug }}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-charcoal hover:text-marigold"
              >
                Read the full story <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4 self-center border-t border-border pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
              {c.results.map((r) => (
                <div key={r.label}>
                  <p className="font-display text-2xl text-marigold">{r.value}</p>
                  <p className="mt-1 text-[11px] leading-tight text-muted-foreground">{r.label}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>

      <CtaBand />
    </>
  );
}
