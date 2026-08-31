import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingDialog } from "@/components/booking-dialog";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { CtaBand } from "@/components/cta-band";
import { industries } from "@/lib/site-data";

export const Route = createFileRoute("/industries/")({
  head: () => ({
    meta: [
      { title: "Industries We Support | Squad International" },
      {
        name: "description",
        content:
          "Outsourced support for e-commerce, SaaS, healthcare, logistics, financial services and real estate — built around the way your industry works.",
      },
      { property: "og:title", content: "Industries We Support | Squad International" },
      {
        property: "og:description",
        content: "Teams built around how your industry works.",
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
        title="Teams built around how your industry works"
        description="Every industry has different workflows, customer expectations and operational demands. We build dedicated outsourced support around the way your business works — helping you reduce overhead, increase capacity and keep operations moving."
      />

      <section className="container-page py-20 md:py-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((i) => (
            <Link
              key={i.slug}
              to="/industries/$slug"
              params={{ slug: i.slug }}
              className="group flex flex-col rounded-lg border border-border bg-card p-8 card-pop hover:border-marigold hover:shadow-[var(--shadow-elevated)]"
            >
              <h2 className="text-xs uppercase tracking-[0.18em] text-marigold">{i.name}</h2>
              <p className="mt-3 text-lg leading-snug text-charcoal">{i.headline}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{i.short}</p>
              <div className="mt-6 border-t border-border pt-5">
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  Key focus
                </p>
                <ul className="mt-3 space-y-1.5">
                  {i.keyFocus.map((k) => (
                    <li key={k} className="flex gap-2 text-sm text-charcoal">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-marigold" />
                      {k}
                    </li>
                  ))}
                </ul>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-charcoal group-hover:text-marigold">
                View industry <ArrowRight className="size-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="surface-dark py-20 md:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Built around your business"
            title="Different industry. Different workflow. Same goal."
            description="The right outsourcing model should fit your business — not force your business into a fixed structure. We build support around your processes, workload and requirements, giving you the capacity you need while helping keep operating costs under control."
            tone="light"
          />
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-offwhite/65">
            Start with what you need today and scale as your business grows.
          </p>
          <div className="mt-10">
            <BookingDialog>
              <Button variant="marigold" size="lg">
                <CalendarDays /> Book a Free Consultation
              </Button>
            </BookingDialog>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
