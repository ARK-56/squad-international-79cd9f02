import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { posts } from "@/lib/site-data";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Outsourcing Insights Blog | Squad International" },
      {
        name: "description",
        content:
          "Practical writing on outsourcing, customer support operations, lead generation, SOPs and quality control for teams scaling their operations.",
      },
      { property: "og:title", content: "Outsourcing Insights Blog | Squad International" },
      {
        property: "og:description",
        content: "Field notes on support operations, SOPs, quality control and pipeline generation.",
      },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Field notes on running operations"
        description="What we've learned building and managing support, assistance and pipeline teams."
      />

      <section className="container-page py-20 md:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((p) => (
            <article
              key={p.slug}
              className="flex flex-col rounded-lg border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:border-marigold"
            >
              <span className="eyebrow">{p.category}</span>
              <h2 className="mt-3 text-xl text-charcoal">{p.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
              <p className="mt-5 text-xs uppercase tracking-wider text-muted-foreground">
                {new Date(p.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}{" "}
                · {p.readingTime}
              </p>
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-charcoal hover:text-marigold"
              >
                Read article <ArrowRight className="size-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
