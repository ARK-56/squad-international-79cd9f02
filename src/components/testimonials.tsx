import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
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

export function Testimonials({
  eyebrow = "Testimonials",
  title = "Real teams, real results",
  description = "Hear directly from operations, revenue and support leaders about what changed after their pod went live.",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
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
          <CarouselContent className="ml-0">
            {testimonials.map((t) => (
              <CarouselItem key={t.author} className="basis-full pl-0">
                <figure className="mx-auto flex min-h-[300px] max-w-3xl flex-col justify-between rounded-lg border border-offwhite/10 bg-offwhite/[0.04] p-8 sm:p-10">
                  <blockquote className="text-2xl leading-snug text-offwhite md:text-[1.75rem]">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-10 flex items-center gap-4 border-t border-offwhite/10 pt-6">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-marigold text-sm font-semibold text-charcoal">
                      {initials(t.author)}
                    </span>
                    <span className="text-left">
                      <span className="block text-sm font-semibold text-offwhite">{t.author}</span>
                      <span className="block text-sm text-offwhite/60">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2" aria-label="Choose a review">
            {testimonials.map((t, index) => (
              <button
                key={t.author}
                type="button"
                onClick={() => api?.scrollTo(index)}
                aria-label={`Show review ${index + 1} by ${t.author}`}
                aria-current={selectedIndex === index ? "true" : undefined}
                className={`h-2 rounded-full transition-all ${
                  selectedIndex === index ? "w-7 bg-marigold" : "w-2 bg-offwhite/30 hover:bg-offwhite/60"
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
    </section>
  );
}
