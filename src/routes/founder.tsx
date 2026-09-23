import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, CalendarDays, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingDialog } from "@/components/booking-dialog";
import { FounderMark } from "@/components/founder-mark";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/lib/site-data";

export const Route = createFileRoute("/founder")({
  head: () => ({
    meta: [
      { title: `${site.founder.name}, ${site.founder.role} | ${site.name}` },
      { name: "description", content: site.founder.summary },
      {
        property: "og:title",
        content: `${site.founder.name}, ${site.founder.role} | ${site.name}`,
      },
      { property: "og:description", content: site.founder.summary },
      { property: "og:type", content: "profile" },
    ],
    /**
     * A Person in its own right, pointing back at the Organization the root
     * declares. The root already names him as its founder; this says the same
     * from his side, so the two resolve to one entity rather than two.
     */
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": `${site.url}/founder#person`,
          name: site.founder.name,
          jobTitle: site.founder.role,
          description: site.founder.summary,
          url: `${site.url}/founder`,
          worksFor: { "@id": `${site.url}/#organization` },
          sameAs: site.founder.profiles.map((p) => p.url),
        }),
      },
    ],
  }),
  component: FounderPage,
});

function FounderPage() {
  return (
    <>
      <PageHero
        eyebrow="Leadership"
        title={site.founder.name}
        description={site.founder.summary}
      />

      <section className="container-page py-20 md:py-24">
        {/*
          The mark sits beside the story rather than above it, so the column of
          text keeps a readable measure instead of running the page width.
        */}
        <div className="grid gap-12 lg:grid-cols-[18rem_1fr] lg:gap-16">
          <div>
            <FounderMark className="size-40" />
            <p className="mt-6 text-lg text-charcoal">{site.founder.name}</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-marigold">
              {site.founder.role}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {site.founder.profiles.map((p) => (
                <li key={p.name}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-charcoal transition-colors hover:border-marigold hover:text-marigold"
                  >
                    {p.name}
                    <ArrowUpRight className="size-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionHeading eyebrow="In his words" title="Why the company exists" />
            <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              {site.founder.bio.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
            <p className="mt-8 text-sm text-muted-foreground">
              More on the company on the{" "}
              <Link to="/about" className="font-medium text-charcoal hover:text-marigold">
                about page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="surface-dark py-20 md:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Next step"
            title="Talk to the team he built"
            description="Tell us what needs covering and we will come back with a proposed team shape."
            tone="light"
          />
          <div className="mt-10 flex flex-wrap gap-3">
            <BookingDialog>
              <Button variant="marigold" size="lg">
                <CalendarDays /> Book a Free Consultation
              </Button>
            </BookingDialog>
            <Button variant="outlineLight" size="lg" asChild>
              <a href={site.whatsapp} target="_blank" rel="noreferrer">
                <MessageCircle /> WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
