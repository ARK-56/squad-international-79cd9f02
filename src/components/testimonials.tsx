import { type ReactNode } from "react";
import { Star } from "lucide-react";
import { testimonials } from "@/lib/site-data";

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
  /** 1-5. Shown as a figure beside a single star. */
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

/**
 * One card in the wall. A fixed width rather than a fluid one, so the cards stay
 * a consistent size as the row slides and the quotes keep a steady measure.
 */
function ReviewCard({ item }: { item: TestimonialItem }) {
  return (
    <figure className="mr-5 flex w-[19rem] shrink-0 flex-col rounded-xl border border-offwhite/10 bg-offwhite/[0.04] p-6 text-left sm:w-[21rem]">
      <div className="flex items-start gap-3">
        {item.photoUrl ? (
          <img
            src={item.photoUrl}
            alt=""
            loading="lazy"
            referrerPolicy="no-referrer"
            className="size-10 shrink-0 rounded-full object-cover"
          />
        ) : (
          /* The Takeout export carries no reviewer photos, so most cards land here. */
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-marigold text-sm font-semibold text-charcoal">
            {initials(item.author)}
          </span>
        )}
        {/* min-w-0 lets the two lines truncate instead of pushing the rating out. */}
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-offwhite">{item.author}</span>
          <span className="block truncate text-xs text-offwhite/60">{item.role}</span>
        </span>
        {typeof item.rating === "number" && (
          <span
            className="flex shrink-0 items-center gap-1 text-sm font-semibold text-offwhite"
            aria-label={`${item.rating} out of 5 stars`}
          >
            {item.rating.toFixed(1)}
            <Star aria-hidden className="size-3.5 fill-marigold text-marigold" />
          </span>
        )}
      </div>

      <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-offwhite/85">
        &ldquo;{item.quote}&rdquo;
      </blockquote>

      {item.sourceUrl && (
        <figcaption className="mt-5 border-t border-offwhite/10 pt-4">
          <a
            href={item.sourceUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Read ${item.author}'s review on Google`}
            className="inline-flex items-center gap-2 text-xs text-offwhite/60 transition-colors hover:text-marigold"
          >
            <GoogleMark className="size-3.5" />
            Read on Google
          </a>
        </figcaption>
      )}
    </figure>
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
  if (items.length === 0) return null;

  /*
   * Two rows running opposite ways. Split rather than repeated, so the same
   * review is never on screen twice at once, and the top row is the longer half
   * when the count is odd.
   */
  const half = Math.ceil(items.length / 2);
  const rows = [items.slice(0, half), items.slice(half)].filter((r) => r.length > 0);

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
        Full width rather than inside container-page: the rows are meant to run
        off both edges, which is what the mask on review-row fades.
      */}
      <div className="mt-14 flex flex-col gap-5">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="review-row">
            <div
              className={`review-track flex ${rowIndex % 2 === 1 ? "review-track-reverse" : ""}`}
            >
              {/*
                The row's cards twice. The animation travels half the track, so
                the second copy arrives exactly where the first began and the
                loop has no seam. That only holds because the spacing is a
                trailing margin on each card rather than a gap on the track: a
                gap leaves the track one gap short of twice a copy, and the loop
                jumps by that much every pass.

                Only the first copy is exposed to assistive tech, which would
                otherwise read every review out twice.
              */}
              {[0, 1].map((copy) => (
                <div key={copy} className="flex" aria-hidden={copy === 1 || undefined}>
                  {row.map((t, index) => (
                    <ReviewCard key={`${t.author}-${index}`} item={t} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {footer && <div className="container-page mt-10 text-center">{footer}</div>}
    </section>
  );
}
