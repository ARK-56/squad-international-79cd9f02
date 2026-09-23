import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { BRAND_PATHS, BrandIcon, type IconLink } from "@/lib/brand-marks";
import { site } from "@/lib/site-data";

/**
 * The directory and review listings, as a section rather than a row of icons in
 * the footer. Someone checking a supplier's credentials is on the about or
 * contact page already, and the listings carry more weight named and spaced out
 * than they did as badges among the socials.
 *
 * Trustpilot and Upwork publish marks; Clutch and GoodFirms do not, so those two
 * keep the lettered badge rather than being handed an invented glyph.
 */
export function BusinessProfiles({ items = site.profiles }: { items?: IconLink[] }) {
  return (
    <section className="border-y border-border bg-card">
      <div className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="Verify us"
          title="Where you can check our work"
          description="We are listed and reviewed on the platforms buyers use to vet an outsourcing partner. Every profile below is ours."
        />

        <ul className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(13rem,1fr))] gap-3">
          {items.map((p) => {
            const path = BRAND_PATHS[p.name];
            return (
              <li key={p.name}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="card-pop group flex items-center gap-3 rounded-lg border border-border bg-background p-5 hover:border-marigold"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-border text-charcoal transition-colors group-hover:border-marigold group-hover:text-marigold">
                    {path ? (
                      <BrandIcon path={path} className="size-5" />
                    ) : (
                      <span className="text-[13px] font-semibold uppercase leading-none">
                        {p.short ?? p.name.slice(0, 2)}
                      </span>
                    )}
                  </span>
                  <span className="min-w-0 flex-1 text-sm font-semibold text-charcoal">
                    {p.name}
                  </span>
                  {/* The link leaves the site, so it says so. */}
                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-marigold" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
