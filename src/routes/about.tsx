import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, MessageCircle } from "lucide-react";
import teamImage from "@/assets/team-about.jpg";
import { Button } from "@/components/ui/button";
import { BookingDialog } from "@/components/booking-dialog";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { aboutStats, site } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Squad International | Your Business Companion" },
      {
        name: "description",
        content:
          "Since 2019, Squad International has helped businesses reduce operational pressure, increase capacity and keep important work moving through reliable outsourcing and business support.",
      },
      { property: "og:title", content: "About Squad International" },
      {
        property: "og:description",
        content: "Your business companion for smarter outsourcing.",
      },
    ],
  }),
  component: AboutPage,
});

const approach = [
  {
    title: "Built around your business",
    body: "We tailor teams, workflows and responsibilities around your needs, giving you support that fits the way your business already works.",
  },
  {
    title: "Flexible scaling",
    body: "Start with the support you need today and scale your team as your workload, customer base and business requirements grow.",
  },
  {
    title: "Dedicated & reliable teams",
    body: "Your work is handled by dedicated people who understand your processes, follow your standards and deliver consistent support you can rely on.",
  },
  {
    title: "Partnership mindset",
    body: "We aim to become a dependable extension of your team, working closely with you to support your goals and keep your business moving forward.",
  },
];

const process = [
  {
    step: "Discover",
    lead: "Understand your needs",
    body: "We start by understanding your business, current processes, workload and the areas where additional support can create the most value.",
  },
  {
    step: "Design",
    lead: "Build your solution",
    body: "We define the responsibilities, workflows and support structure around your business requirements.",
  },
  {
    step: "Deploy",
    lead: "Build your team",
    body: "The right resources are selected and prepared around your processes, tools and expectations.",
  },
  {
    step: "Deliver",
    lead: "Execute & manage",
    body: "Your dedicated team begins handling the agreed responsibilities with ongoing communication, consistency and accountability.",
  },
  {
    step: "Scale",
    lead: "Grow with your business",
    body: "As your workload and requirements change, your support can grow and adapt with your business.",
  },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Your business companion for smarter outsourcing"
        description="Since 2019, Squad International has been helping businesses reduce operational pressure, increase capacity and keep important work moving through reliable outsourcing and business support solutions. We work as an extension of your team — giving you the support you need without the cost and complexity of building every function in-house."
      />

      <section className="container-page grid items-center gap-14 py-20 lg:grid-cols-2 md:py-24">
        <div>
          <SectionHeading
            eyebrow="Who we are"
            title="Built to support the way your business works"
          />
          <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              Squad International started in 2019 with a focus on telemarketing and business
              support. Since then, we have grown into a broader BPO partner supporting businesses
              across customer service, lead generation, virtual assistance, healthcare operations,
              e-commerce and bookkeeping.
            </p>
            <p>
              Today, we are trusted by businesses across different markets and industries to provide
              dependable people, consistent execution and flexible support.
            </p>
            <p>
              Our role is simple: understand what your business needs, build support around your
              workflow and help your internal team stay focused on the work that drives growth.
            </p>
          </div>
        </div>
        <figure className="overflow-hidden rounded-xl border border-border">
          <img
            src={teamImage}
            alt="Squad International team working together"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </figure>
      </section>

      <section className="border-y border-border bg-card">
        <div className="container-page grid grid-cols-2 gap-8 py-10 lg:grid-cols-4">
          {aboutStats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-4xl text-charcoal">{s.value}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-20 md:py-24">
        <SectionHeading
          eyebrow="Our approach"
          title="Support built around your business"
          description="Every business operates differently. That is why we focus on flexible support, dedicated resources and long-term working relationships instead of forcing clients into a fixed outsourcing model."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {approach.map((a) => (
            <div key={a.title} className="rounded-lg border border-border bg-card p-7">
              <h3 className="text-lg text-charcoal">{a.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="surface-dark py-20 md:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="How we get started"
            title="From business needs to business impact"
            description="A simple, structured process designed to make outsourcing easy."
            tone="light"
          />
          <ol className="mt-12 space-y-5">
            {process.map((p, idx) => (
              <li
                key={p.step}
                className="flex gap-5 rounded-lg border border-offwhite/10 bg-offwhite/[0.04] p-7"
              >
                <span className="font-display text-2xl text-marigold">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg uppercase tracking-wide text-offwhite">
                    {p.step} — {p.lead}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-offwhite/65">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-page py-20 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl uppercase leading-tight tracking-tight text-charcoal md:text-4xl">
            You stay focused on the business. We help keep the work moving.
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            Outsourcing should give your business more capacity — not another problem to manage.
            Whether you need one dedicated resource or support across multiple business functions,
            Squad International helps you build the right team around your workflow while keeping
            operating costs under control.
          </p>
        </div>
      </section>

      <section className="surface-dark py-20 md:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Next step"
            title="Ready to add capacity without adding the overhead?"
            description="Tell us where your business needs support. We'll help you understand what can be outsourced and build a solution around the way your business works."
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
