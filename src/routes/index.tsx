import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  MessageCircle,
  ShieldCheck,
  Clock,
  Users,
  LineChart,
  CheckCircle2,
} from "lucide-react";
import heroImage from "@/assets/hero-operations.jpg";
import teamImage from "@/assets/team-about.jpg";
import { Button } from "@/components/ui/button";
import { BookingDialog } from "@/components/booking-dialog";
import { CtaBand } from "@/components/cta-band";
import { Testimonials } from "@/components/testimonials";
import { ClientSpotlight } from "@/components/client-spotlight";
import { FeatureSplit, FlowMedia, OrbitMedia } from "@/components/feature-split";

import { SectionHeading } from "@/components/section-heading";
import { services, industries, caseStudies, stats, faqs, site } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Squad International | Dedicated Offshore Teams & Business Support" },
      {
        name: "description",
        content:
          "Squad International builds dedicated offshore teams for customer support, virtual assistance, lead generation and operational delivery. Book a discovery call today.",
      },
      { property: "og:title", content: "Squad International | Dedicated Offshore Teams" },
      {
        property: "og:description",
        content:
          "Customer support, virtual assistance, lead generation and managed operations pods — trained, supervised and measured.",
      },
    ],
  }),
  component: Home,
});

const differentiators = [
  {
    icon: Users,
    title: "Dedicated, not shared",
    body: "Your team works exclusively on your account, in your tools, under a named team lead.",
  },
  {
    icon: ShieldCheck,
    title: "Quality you can audit",
    body: "Weekly QA sampling, calibrated scorecards and coaching plans you can review any time.",
  },
  {
    icon: Clock,
    title: "Coverage that fits",
    body: "Business hours, extended hours or full follow-the-sun shifts across three regions.",
  },
  {
    icon: LineChart,
    title: "Measured on outcomes",
    body: "SLAs agreed before launch, reported weekly, reviewed in a monthly business review.",
  },
];

function Home() {
  return (
    <>
      <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-charcoal">
        {/* Full-bleed background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Offshore support agents working on an operations floor"
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/90 via-charcoal/60 to-charcoal" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-5xl px-6 pb-20 pt-32 text-center md:pt-36">
          <div className="mb-6 flex items-center justify-center gap-4">
            <div className="h-px w-8 bg-marigold" />
            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-marigold">
              {site.name}
            </span>
            <div className="h-px w-8 bg-marigold" />
          </div>

          <h1 className="font-display text-5xl uppercase leading-none tracking-tight text-offwhite md:text-7xl lg:text-9xl">
            Dedicated <br /> <span className="text-marigold">Offshore</span> Teams
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg font-light leading-relaxed text-offwhite/70 md:text-xl">
            Scale your business with high-performing remote teams integrated seamlessly into your
            workflow. Expert talent, managed for you.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <BookingDialog>
              <Button variant="marigold" size="xl" className="group relative uppercase tracking-widest">
                <CalendarDays /> Start Scaling
                <div className="absolute -bottom-1 -right-1 size-3 bg-offwhite" />
              </Button>
            </BookingDialog>
            <Button variant="outlineLight" size="xl" asChild className="uppercase tracking-widest">
              <a href={site.whatsapp} target="_blank" rel="noreferrer">
                <MessageCircle /> Explore Services
              </a>
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 opacity-50">
          <span className="text-[10px] uppercase tracking-[0.5em] text-offwhite">Scroll</span>
          <div className="h-12 w-px bg-marigold" />
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="container-page grid grid-cols-2 gap-8 py-10 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-4xl text-charcoal">{s.value}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Services"
            title="Capability you can switch on"
            description="Six delivery lines, staffed and supervised by us, working inside your systems."
          />
          <Button variant="outlineDark" asChild>
            <Link to="/services">
              All services <ArrowRight />
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group flex flex-col rounded-lg border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-marigold hover:shadow-[var(--shadow-elevated)]"
            >
              <h3 className="text-xl text-charcoal">{s.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{s.short}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-charcoal group-hover:text-marigold">
                Explore service <ArrowRight className="size-4" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <figure className="group relative h-64 overflow-hidden rounded-xl md:h-72">
            <img
              src={heroImage}
              alt="Support specialists collaborating in an operations centre"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/90 to-transparent px-6 pb-6 pt-16 text-sm font-medium text-offwhite">
              Teams trained in your tools and workflows
            </figcaption>
          </figure>
          <figure className="group relative h-64 overflow-hidden rounded-xl md:h-72">
            <img
              src={teamImage}
              alt="Dedicated team members collaborating on client work"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/90 to-transparent px-6 pb-6 pt-16 text-sm font-medium text-offwhite">
              Named specialists accountable to your outcomes
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="surface-dark py-20 md:py-28">
        <div className="container-page">
          <div className="grid items-end gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <SectionHeading
              eyebrow="Why Squad"
              title="Outsourcing without the usual trade-offs"
              description="The reason teams stay with us is boring and deliberate: documented process, named ownership and reporting that holds up."
              tone="light"
            />
            <figure className="relative h-56 overflow-hidden rounded-xl border border-offwhite/10 md:h-72">
              <img
                src={heroImage}
                alt="Operations team working together across shared systems"
                loading="lazy"
                className="h-full w-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/20 to-transparent" />
              <figcaption className="absolute bottom-6 left-6 max-w-xs text-lg leading-snug text-offwhite">
                Clear ownership, visible quality and reporting that holds up.
              </figcaption>
            </figure>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((d) => (
              <div key={d.title} className="rounded-lg border border-offwhite/10 bg-offwhite/[0.04] p-7">
                <d.icon className="size-7 text-marigold" />
                <h3 className="mt-5 text-lg text-offwhite">{d.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-offwhite/65">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeatureSplit
        eyebrow="How it works"
        title="Stand up a team in weeks, not quarters"
        description="We document your process, hire against it, train in your tools and go live under an agreed SLA — with a named team lead accountable from day one."
        bullets={[
          "Discovery call and scope in the first week",
          "Recruitment and vetting against your role profile",
          "Shadowing, certification and a staged go-live",
        ]}
        actions={
          <BookingDialog>
            <Button variant="marigold" size="lg">
              <CalendarDays /> Book a Meeting
            </Button>
          </BookingDialog>
        }
        media={
          <FlowMedia
            badge="Live in 10–14 days"
            steps={[
              { label: "Week 1", value: "Discovery, process mapping and role scoping" },
              { label: "Week 2", value: "Recruit, vet and assign your named team lead" },
              { label: "Week 3", value: "Tool access, shadowing and QA calibration" },
              { label: "Go live", value: "SLA reporting and weekly performance review" },
            ]}
          />
        }
      />

      <FeatureSplit
        tone="muted"
        reverse
        eyebrow="Your pod"
        title="One dedicated pod, every role covered"
        description="Instead of shared agents on a ticket queue, you get a defined pod: specialists for each workstream, a supervisor who owns quality, and reporting you can audit."
        bullets={[
          "Exclusive to your account, in your systems",
          "Supervisor-led QA sampling every week",
          "Scale the pod up or down as volume moves",
        ]}
        actions={
          <Button variant="outlineDark" size="lg" asChild>
            <Link to="/services">
              Explore services <ArrowRight />
            </Link>
          </Button>
        }
        media={
          <OrbitMedia
            center="Your pod"
            roles={[
              "Support Agent",
              "Team Lead",
              "QA Analyst",
              "Virtual Assistant",
              "SDR",
              "Back Office",
            ]}
          />
        }
      />


      <ClientSpotlight />

      <section className="container-page py-20 md:py-28">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_0.85fr]">
          <SectionHeading
            eyebrow="Industries"
            title="Operating knowledge, not generic scripts"
            description="We staff and train against the realities of your sector."
          />
          <figure className="relative h-48 overflow-hidden rounded-xl md:h-56">
            <img
              src={teamImage}
              alt="Support team working together to solve client needs"
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-charcoal/35" />
          </figure>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((i) => (
            <Link
              key={i.slug}
              to="/industries/$slug"
              params={{ slug: i.slug }}
              className="group rounded-lg border border-border bg-card p-7 transition-colors hover:border-marigold"
            >
              <h3 className="text-lg text-charcoal group-hover:text-marigold">{i.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{i.short}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-card py-20 md:py-28">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Proof"
              title="Results our clients can point at"
              description="Three engagements, three very different problems."
            />
            <Button variant="outlineDark" asChild>
              <Link to="/case-studies">
                All case studies <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {caseStudies.map((c) => (
              <Link
                key={c.slug}
                to="/case-studies/$slug"
                params={{ slug: c.slug }}
                className="group flex flex-col rounded-lg border border-border bg-background p-7 transition-all hover:-translate-y-1 hover:border-marigold"
              >
                <span className="eyebrow">{c.industry}</span>
                <h3 className="mt-3 text-lg text-charcoal">{c.client}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {c.challenge}
                </p>
                <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-5">
                  {c.results.map((r) => (
                    <div key={r.label}>
                      <p className="font-display text-xl text-marigold">{r.value}</p>
                      <p className="mt-1 text-[11px] leading-tight text-muted-foreground">
                        {r.label}
                      </p>
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="FAQs"
            title="The questions buyers ask first"
            description="If yours isn't here, the FAQ page goes deeper — or just ask us directly."
          />
          <div className="divide-y divide-border border-y border-border">
            {faqs.slice(0, 4).map((f) => (
              <div key={f.q} className="py-6">
                <h3 className="text-base text-charcoal">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </div>
            ))}
            <div className="py-6">
              <Button variant="outlineDark" asChild>
                <Link to="/faqs">
                  Read all FAQs <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      <CtaBand />
    </>
  );
}
