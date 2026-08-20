import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, MessageCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingDialog } from "@/components/booking-dialog";
import { CtaBand } from "@/components/cta-band";
import { services, site } from "@/lib/site-data";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return service;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} | Meridian BPO Services` },
          { name: "description", content: loaderData.short },
          { property: "og:title", content: `${loaderData.title} | Meridian BPO` },
          { property: "og:description", content: loaderData.short },
        ]
      : [],
  }),
  component: ServiceDetail,
});

function ServiceDetail() {
  const service = Route.useLoaderData();
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <section className="surface-dark">
        <div className="container-page py-20 md:py-24">
          <Link to="/services" className="eyebrow hover:opacity-80">
            <span className="h-px w-8 bg-marigold" /> Services
          </Link>
          <h1 className="mt-5 max-w-4xl text-4xl md:text-6xl">{service.title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-offwhite/70 md:text-lg">
            {service.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <BookingDialog>
              <Button variant="marigold" size="lg">
                <CalendarDays /> Book a Meeting
              </Button>
            </BookingDialog>
            <Button variant="outlineLight" size="lg" asChild>
              <a href={site.whatsapp} target="_blank" rel="noreferrer">
                <MessageCircle /> Chat With Us
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="container-page grid gap-8 py-10 sm:grid-cols-3">
          {service.outcomes.map((o) => (
            <div key={o} className="flex gap-3">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-marigold" />
              <p className="text-sm font-medium text-charcoal">{o}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page grid gap-14 py-20 lg:grid-cols-[1.1fr_0.9fr] md:py-24">
        <div>
          <h2 className="text-3xl text-charcoal">What the team handles</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {service.capabilities.map((c) => (
              <li
                key={c}
                className="rounded-md border border-border bg-card px-5 py-4 text-sm text-charcoal"
              >
                {c}
              </li>
            ))}
          </ul>

          <h2 className="mt-16 text-3xl text-charcoal">How we deliver it</h2>
          <ol className="mt-8 space-y-6">
            {service.process.map((p, idx) => (
              <li key={p.step} className="flex gap-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-charcoal font-display text-lg text-marigold">
                  {idx + 1}
                </span>
                <div>
                  <h3 className="text-lg text-charcoal">{p.step}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <aside className="h-fit rounded-lg border border-border bg-card p-8 lg:sticky lg:top-28">
          <h2 className="text-xl text-charcoal">Ideal for</h2>
          <ul className="mt-5 space-y-3">
            {service.idealFor.map((i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-marigold" />
                {i}
              </li>
            ))}
          </ul>
          <div className="mt-8 border-t border-border pt-6">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Not sure which shape fits? A 30-minute call is usually enough to size the team.
            </p>
            <BookingDialog>
              <Button variant="marigold" className="mt-5 w-full" size="lg">
                <CalendarDays /> Book a Meeting
              </Button>
            </BookingDialog>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <h3 className="text-sm tracking-[0.18em] text-marigold">Other services</h3>
            <ul className="mt-4 space-y-3">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: o.slug }}
                    className="group inline-flex items-center gap-2 text-sm font-medium text-charcoal hover:text-marigold"
                  >
                    {o.title} <ArrowRight className="size-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <CtaBand title={`Let's scope your ${service.title.toLowerCase()} team`} />
    </>
  );
}
