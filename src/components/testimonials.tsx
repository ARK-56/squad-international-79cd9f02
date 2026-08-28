import { useEffect, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { testimonials } from "@/lib/site-data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
}

export type TestimonialItem = {
  quote: string;
  author: string;
  role: string;
  /** 1-5. Renders a star row when present. */
  rating?: number;
  photoUrl?: string | null;
  /** Links the card back to its source, e.g. the review on Google. */
  sourceUrl?: string | null;
};

/**
 * Google's "G", drawn inline because lucide dropped its brand marks.
 *
 * The four colours are fixed rather than currentColor: a single-colour G is not
 * the Google mark, and the point of showing it is that it is recognisable at a
 * glance. It sits on the dark card, where all four read clearly.
 */
function GoogleMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function Stars({ rating }: { rating: number }) {
  const rounded = Math.round(rating);
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden
          className={i < rounded ? "size-4 fill-marigold text-marigold" : "size-4 text-offwhite/25"}
        />
      ))}
    </span>
  );
}

export function Testimonials({
  eyebrow = "Testimonials",
  title = "Real teams, real results",
  description = "Hear directly from operations, revenue and support leaders about what changed after their pod went live.",
  items = testimonials,
  footer,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  items?: TestimonialItem[];
  footer?: ReactNode;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!api) return;

    const updateSelectedIndex = () => setSelectedIndex(api.selectedScrollSnap());
    updateSelectedIndex();
    api.on("select", updateSelectedIndex);
    api.on("reInit", updateSelectedIndex);

    return () => {
      api.off("select", updateSelectedIndex);
      api.off("reInit", updateSelectedIndex);
    };
  }, [api]);

  if (items.length === 0) return null;

  return (
    <section className="surface-dark overflow-hidden py-20 md:py-28">
      <div className="container-page text-center">
        <span className="inline-flex items-center rounded-full border border-offwhite/20 bg-offwhite/[0.06] px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-marigold">
          {eyebrow}
        </span>
        <h2 className="font-display mx-auto mt-6 max-w-3xl text-balance text-4xl uppercase leading-[0.95] tracking-tight text-offwhite sm:text-5xl">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-offwhite/65 md:text-base">
          {description}
        </p>
      </div>

      {/*
        Desktop shows all six reviews as a 3x2 grid; below lg it stays a slider,
        since six stacked cards make for a long scroll on a phone.

        Embla is switched off at lg rather than rendering the list twice, so the
        markup and the DOM stay single. With active:false it tears down the engine
        and drops its inline transform, leaving the container free to be restyled
        from a flex track into a grid by the classes below.
      */}
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
          breakpoints: { "(min-width: 1024px)": { active: false } },
        }}
        className="container-page relative mt-14"
      >
        <div className="border-y border-dashed border-offwhite/20 py-6">
          {/*
            Two and a half cards in view on desktop, so the clipped third signals
            there is more to scroll. Narrower cards need smaller type and padding
            than the old single full-width card carried. Phones get one card plus a
            sliver and tablets two, since a third of a 375px screen is unreadable.

            Every item sits on one flex line, so they all stretch to the tallest
            quote; h-full passes that height down to the card itself, which keeps
            the cards level now that more than one is visible at a time. A grid
            sizes each row on its own content instead, which split the two rows by
            58px, so auto-rows-fr makes every row take the same share. It is used
            in preference to grid-rows-2 because the live Google feed can return
            fewer than six reviews, and a fixed two would then leave an empty row.

            The basis subtracts its share of the gutter because CarouselContent's
            -ml-5 makes the track 20px wider than the visible window, so a flat 50%
            measures against the wrong width. 50% - 10px (0.5 x 20px) resolves to
            exactly half the window at any size. At lg the negative margin and the
            per-item padding are both dropped in favour of a real grid gap.
          */}
          <CarouselContent className="-ml-5 lg:ml-0 lg:grid lg:auto-rows-fr lg:grid-cols-3 lg:gap-5">
            {items.map((t, index) => (
              <CarouselItem
                key={`${t.author}-${index}`}
                className="basis-[86%] pl-5 md:basis-[calc(50%-0.625rem)] lg:basis-auto lg:pl-0"
              >
                <figure className="flex h-full flex-col justify-between rounded-lg border border-offwhite/10 bg-offwhite/[0.04] p-6 sm:p-7">
                  <div>
                    {typeof t.rating === "number" && (
                      <div className="mb-4 flex">
                        <Stars rating={t.rating} />
                      </div>
                    )}
                    <blockquote className="text-base leading-relaxed text-offwhite md:text-lg">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                  </div>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-offwhite/10 pt-5">
                    {t.photoUrl ? (
                      <img
                        src={t.photoUrl}
                        alt=""
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="size-10 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-marigold text-sm font-semibold text-charcoal">
                        {initials(t.author)}
                      </span>
                    )}
                    {/* min-w-0 lets the two lines truncate instead of pushing the link out. */}
                    <span className="min-w-0 text-left">
                      <span className="block truncate text-sm font-semibold text-offwhite">
                        {t.author}
                      </span>
                      <span className="block truncate text-xs text-offwhite/60">{t.role}</span>
                    </span>
                    {t.sourceUrl && (
                      <a
                        href={t.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        // The mark is decorative, so the link carries the accessible
                        // name, and title gives sighted users the same wording the
                        // text link used to spell out.
                        aria-label={`Read ${t.author}'s review on Google`}
                        title="Read on Google"
                        className="ml-auto grid size-8 shrink-0 place-items-center rounded-full border border-offwhite/15 transition-colors hover:border-marigold"
                      >
                        <GoogleMark className="size-4" />
                      </a>
                    )}
                  </figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>

        {/* Nothing to page through once the grid shows every review. */}
        <div className="mt-6 flex items-center justify-between gap-4 lg:hidden">
          <div className="flex items-center gap-2" aria-label="Choose a review">
            {items.map((t, index) => (
              <button
                key={`${t.author}-${index}`}
                type="button"
                onClick={() => api?.scrollTo(index)}
                aria-label={`Show review ${index + 1} by ${t.author}`}
                aria-current={selectedIndex === index ? "true" : undefined}
                className={`h-2 rounded-full transition-all ${
                  selectedIndex === index
                    ? "w-7 bg-marigold"
                    : "w-2 bg-offwhite/30 hover:bg-offwhite/60"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => api?.scrollPrev()}
              aria-label="Previous review"
              className="grid size-10 place-items-center rounded-full border border-offwhite/25 text-offwhite transition-colors hover:border-marigold hover:bg-marigold hover:text-charcoal"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => api?.scrollNext()}
              aria-label="Next review"
              className="grid size-10 place-items-center rounded-full border border-offwhite/25 text-offwhite transition-colors hover:border-marigold hover:bg-marigold hover:text-charcoal"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        <span className="pointer-events-none absolute -left-1.5 top-4 text-marigold">+</span>
        <span className="pointer-events-none absolute -right-1.5 top-4 text-marigold">+</span>
        <span className="pointer-events-none absolute -bottom-2 -left-1.5 text-marigold">+</span>
        <span className="pointer-events-none absolute -bottom-2 -right-1.5 text-marigold">+</span>
      </Carousel>

      {footer && <div className="container-page mt-10 text-center">{footer}</div>}
    </section>
  );
}
