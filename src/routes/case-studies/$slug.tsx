import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CtaBand } from "@/components/cta-band";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { caseStudies, industries, services } from "@/lib/site-data";

export const Route = createFileRoute("/case-studies/$slug")({
  loader: ({ params }) => {
    const study = caseStudies.find((c) => c.slug === params.slug);
    if (!study) throw notFound();
    // The industry and service are stored as display labels, so resolve them to
    // slugs here and let the page link out only when a match actually exists.
    return {
      ...study,
      industrySlug: industries.find((i) => i.name === study.industry)?.slug ?? null,
      serviceSlug: services.find((s) => s.title === study.service)?.slug ?? null,
    };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.client} Case Study | Squad International` },
          { name: "description", content: loaderData.challenge.slice(0, 155) },
          { property: "og:title", content: `${loaderData.client} Case Study | Squad International` },
          { property: "og:description", content: loaderData.challenge.slice(0, 155) },
        ]
      : [],
  }),
  component: CaseStudyDetail,
});

function CaseStudyDetail() {
  const study = Route.useLoaderData();

  return (
    <>
      <section className="surface-dark">
        <div className="container-page pb-20 pt-36 md:pb-24 md:pt-40">
          <Breadcrumbs parent="/case-studies" parentLabel="Case Studies" current={study.client} />
          <h1 className="mt-5 max-w-4xl text-4xl md:text-6xl">{study.client}</h1>
          <p className="mt-4 text-sm uppercase tracking-wider text-offwhite/55">
            {study.industrySlug ? (
              <Link
                to="/industries/$slug"
                params={{ slug: study.industrySlug }}
                className="transition-colors hover:text-marigold"
              >
                {study.industry}
              </Link>
            ) : (
              study.industry
            )}
            {" · "}
            {study.serviceSlug ? (
              <Link
                to="/services/$slug"
                params={{ slug: study.serviceSlug }}
                className="transition-colors hover:text-marigold"
              >
                {study.service}
              </Link>
            ) : (
              study.service
            )}
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {study.results.map((r) => (
              <div key={r.label} className="rounded-md border border-offwhite/10 bg-offwhite/[0.04] p-5">
                <p className="font-display text-3xl text-marigold">{r.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-offwhite/60">{r.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page grid gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] md:py-24">
        <div>
          <h2 className="text-2xl text-charcoal">The challenge</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{study.challenge}</p>

          <h2 className="mt-12 text-2xl text-charcoal">What we did</h2>
          <ol className="mt-6 space-y-5">
            {study.approach.map((a, idx) => (
              <li key={a} className="flex gap-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-sm bg-charcoal font-display text-marigold">
                  {idx + 1}
                </span>
                <p className="pt-1.5 text-sm leading-relaxed text-charcoal">{a}</p>
              </li>
            ))}
          </ol>
        </div>

        <aside className="h-fit rounded-lg border border-marigold/40 bg-accent/40 p-8">
          <p className="font-display text-xl leading-snug text-charcoal">"{study.quote.text}"</p>
          <p className="mt-5 text-sm font-medium text-muted-foreground">— {study.quote.author}</p>
        </aside>
      </section>

      <CtaBand title="Want a result like this one?" />
    </>
  );
}
