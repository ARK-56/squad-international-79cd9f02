import { testimonials } from "@/lib/site-data";

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

      <div className="relative mt-14 border-y border-dashed border-offwhite/20">
        <div className="flex gap-6 overflow-x-auto px-6 pb-6 pt-6 [scrollbar-width:none] md:px-10 [&::-webkit-scrollbar]:hidden">
          {testimonials.map((t) => (
            <figure
              key={t.author}
              className="flex min-h-[300px] w-[85vw] max-w-[520px] shrink-0 flex-col justify-between rounded-lg border border-offwhite/10 bg-offwhite/[0.04] p-8 sm:w-[520px]"
            >
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
          ))}
        </div>
        <span className="pointer-events-none absolute -left-1.5 -top-2 text-marigold">+</span>
        <span className="pointer-events-none absolute -right-1.5 -top-2 text-marigold">+</span>
        <span className="pointer-events-none absolute -bottom-2 -left-1.5 text-marigold">+</span>
        <span className="pointer-events-none absolute -bottom-2 -right-1.5 text-marigold">+</span>
      </div>
    </section>
  );
}
