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

      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: true }}
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
            the cards level now that more than one is visible at a time.

            The basis subtracts its share of the gutter because CarouselContent's
            -ml-5 makes the track 20px wider than the visible window, so a flat 40%
            measures against the wrong width and lands at 2.46 cards. 40% - 8px
            (0.4 x 20px) resolves to exactly two fifths of the window at any size.
          */}
          <CarouselContent className="-ml-5">
            {items.map((t, index) => (
              <CarouselItem
                key={`${t.author}-${index}`}
                className="basis-[86%] pl-5 md:basis-[calc(50%-0.625rem)] lg:basis-[calc(40%-0.5rem)]"
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
                        className="ml-auto shrink-0 text-xs font-medium text-marigold hover:underline"
                      >
                        Google
                      </a>
                    )}
                  </figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
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
