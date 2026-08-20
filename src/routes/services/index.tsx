import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingDialog } from "@/components/booking-dialog";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { services, site } from "@/lib/site-data";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "BPO Services | Support, Assistance & Lead Generation" },
      {
        name: "description",
        content:
          "Explore Squad International services: customer support, virtual and business assistance, lead generation, dedicated pods, operational management and growth support.",
      },
      { property: "og:title", content: "BPO Services | Squad International" },
      {
        property: "og:description",
        content: "Six delivery lines staffed, trained and supervised by Squad International.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Delivery capability, staffed and supervised"
        description="Every service line comes with trained specialists, documented process, quality sampling and reporting against agreed SLAs."
      >
        <BookingDialog>
          <Button variant="marigold" size="lg">
            <CalendarDays /> Book a Meeting
          </Button>
        </BookingDialog>
      </PageHero>

      <section className="container-page py-20 md:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <article
              key={s.slug}
              className="flex flex-col rounded-lg border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:border-marigold"
            >
              <h2 className="text-2xl text-charcoal">{s.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.summary}</p>
              <ul className="mt-6 space-y-2">
                {s.outcomes.map((o) => (
                  <li key={o} className="flex gap-2 text-sm text-charcoal">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-marigold" />
                    {o}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button variant="charcoal" asChild>
                  <Link to="/services/$slug" params={{ slug: s.slug }}>
                    View service <ArrowRight />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
