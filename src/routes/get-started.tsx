import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingDialog } from "@/components/booking-dialog";
import { EnquiryForm } from "@/components/enquiry-form";
import { site } from "@/lib/site-data";
import logo from "@/assets/squad-logo.png";

/**
 * A landing page for paid traffic, deliberately without the site chrome. The
 * header, footer and WhatsApp button are suppressed for this route in __root.tsx,
 * so the only things to do here are book a call or send the form. The logo is an
 * image rather than a link home for the same reason.
 *
 * The proof points below are all checkable: the Google rating and review count
 * come from the live listing, and the rest describe how the engagement works. The
 * homepage stat band is deliberately not reused, since 500+, 98% and 60% are
 * placeholders the copy deck flagged and this is the page that would be pointed at
 * from an advert.
 */
const proofPoints = [
  "A 30-minute call is enough to size the roles, coverage and cost",
  "Teams built around your workflows, tools and standards",
  "Coverage across the hours your customers actually contact you",
  "Start with what you need now and scale as the workload grows",
];

export const Route = createFileRoute("/get-started")({
  head: () => ({
    meta: [
      { title: "Book a Free Consultation | Squad International" },
      {
        name: "description",
        content:
          "Book a 30-minute consultation with Squad International, or send an enquiry. Dedicated offshore teams for customer support, lead generation and back-office operations.",
      },
      { property: "og:title", content: "Book a Free Consultation | Squad International" },
      {
        property: "og:description",
        content:
          "Tell us what needs covering and we'll come back with a proposed team shape. No obligation.",
      },
      // A campaign landing page has no business in search results competing with
      // the pages that describe the service.
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: GetStartedPage,
});

function GetStartedPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Masthead: the mark only, with no way out of the page. */}
      <header className="border-b border-border">
        <div className="container-page flex items-center justify-between py-5">
          <img src={logo} alt={`${site.name} logo`} className="h-8 w-auto" />
          <a
            href={site.phoneHref}
            className="text-sm font-medium text-charcoal transition-colors hover:text-marigold"
          >
            {site.phone}
          </a>
        </div>
      </header>

      <main className="container-page grid items-start gap-12 py-14 lg:grid-cols-[1fr_0.95fr] lg:gap-16 lg:py-20">
        <div>
          <span className="eyebrow text-marigold">{site.tagline}</span>
          <h1 className="font-display mt-5 text-4xl uppercase leading-[0.95] tracking-tight text-charcoal sm:text-5xl lg:text-6xl">
            Support that works
            <br />
            like part of your business
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Add dependable capacity across customer support, sales, administration and day-to-day
            operations, while your internal team stays focused on higher-value work. Tell us what
            needs covering and we will come back with a proposed team shape.
          </p>

          <ul className="mt-8 space-y-3">
            {proofPoints.map((point) => (
              <li key={point} className="flex gap-3 text-sm leading-relaxed text-charcoal">
                <Check className="mt-0.5 size-4 shrink-0 text-marigold" />
                {point}
              </li>
            ))}
          </ul>

          {/* The booking half of the page. The form is the other half, on the right. */}
          <div className="mt-9 rounded-lg border border-border bg-card p-6">
            <p className="text-sm font-semibold text-charcoal">Would rather talk than type?</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Pick a 30-minute slot that suits you. No obligation.
            </p>
            <BookingDialog>
              <Button variant="marigold" size="lg" className="mt-5 w-full sm:w-auto">
                <CalendarDays /> Book a Free Consultation
              </Button>
            </BookingDialog>
          </div>

          {/* Real numbers from the live Google listing, not the placeholder stats. */}
          <div className="mt-8 flex items-center gap-3">
            <span className="flex items-center gap-0.5" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="size-4 fill-marigold text-marigold" />
              ))}
            </span>
            <p className="text-sm text-muted-foreground">
              Rated {site.googleRating} out of 5 from {site.googleReviewCount} reviews on Google
            </p>
          </div>
        </div>

        <EnquiryForm
          heading="Tell us what you need"
          description="A few details is enough to start. We reply within one working day."
          submitLabel="Send enquiry"
          className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-elevated)] sm:p-8 lg:sticky lg:top-8"
        />
      </main>

      {/* Legal only: these have to stay reachable, nothing else does. */}
      <footer className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-marigold">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-marigold">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
