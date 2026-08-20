import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { industries } from "@/lib/site-data";

export const Route = createFileRoute("/industries/")({
  head: () => ({
    meta: [
      { title: "Industries We Support | Meridian BPO" },
      {
        name: "description",
        content:
          "Outsourced teams for e-commerce, SaaS, healthcare, logistics, financial services and real estate — staffed and trained around sector-specific operations.",
      },
      { property: "og:title", content: "Industries We Support | Meridian BPO" },
      {
        property: "og:description",
        content: "Sector-specific outsourcing teams with operating knowledge, not generic scripts.",
      },
    ],
  }),
  component: IndustriesPage,
});

function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Teams trained on your sector's realities"
        description="Support and operations work differently in a warehouse, a clinic and a SaaS platform. We staff, script and measure accordingly."
      />

      <section className="container-page py-20 md:py-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((i) => (
            <Link
              key={i.slug}
              to="/industries/$slug"
              params={{ slug: i.slug }}
              className="group flex flex-col rounded-lg border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:border-marigold"
            >
              <h2 className="text-xl text-charcoal">{i.name}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{i.short}</p>
              <div className="mt-6 grid grid-cols-3 gap-2 border-t border-border pt-5">
                {i.metrics.map((m) => (
                  <div key={m.label}>
                    <p className="font-display text-lg text-marigold">{m.value}</p>
                    <p className="mt-1 text-[11px] leading-tight text-muted-foreground">{m.label}</p>
                  </div>
                ))}
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-charcoal group-hover:text-marigold">
                View industry <ArrowRight className="size-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
