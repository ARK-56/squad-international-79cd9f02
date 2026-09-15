import { useQuery } from "@tanstack/react-query";
import { getGoogleReviews } from "@/lib/google-reviews";
import { Testimonials, type TestimonialItem } from "@/components/testimonials";
import { site, testimonials } from "@/lib/site-data";

/**
 * How many of the stored reviews this section shows. The array holds twenty, and
 * rendering all of them made this section 3523px tall, 28% of the homepage, in
 * seven rows of three. Six keeps the three by two grid the section was built
 * around, and is close to the five the live Places API returns, so the fallback
 * is not far longer than the real thing.
 *
 * The rest of the array stays as the record of what the listing holds.
 */
const HOMEPAGE_REVIEWS = 6;

/**
 * Renders the Google Business Profile reviews.
 *
 * Without GOOGLE_PLACES_API_KEY / GOOGLE_PLACE_ID this still shows real reviews —
 * the ones transcribed into site-data — along with the real aggregate rating and a
 * link to the listing. Adding the env vars upgrades it to live reviews (up to five,
 * refreshed hourly) with reviewer photos. Either way the section never renders empty
 * and never blocks the page.
 *
 * Deliberately no AggregateRating JSON-LD: Google's structured data policy disallows
 * marking up reviews sourced from Google itself as first-party ratings.
 */
export function GoogleReviews() {
  const { data } = useQuery({
    queryKey: ["google-reviews"],
    queryFn: () => getGoogleReviews(),
    staleTime: 60 * 60 * 1000,
    retry: 1,
  });

  const live = data?.configured && data.reviews.length > 0 ? data : null;

  const items: TestimonialItem[] = live
    ? live.reviews.map((r) => ({
        quote: r.text,
        author: r.author,
        role: r.relativeTime ? `Google review · ${r.relativeTime}` : "Google review",
        rating: r.rating,
        photoUrl: r.photoUrl,
        sourceUrl: r.reviewUrl,
      }))
    : testimonials.slice(0, HOMEPAGE_REVIEWS);

  const rating = live?.rating ?? site.googleRating;
  const total = live?.totalRatings ?? site.googleReviewCount;
  const listingUrl = live?.mapsUrl ?? site.googleReviewsUrl;

  return (
    <Testimonials
      eyebrow="Client feedback"
      title="What our clients say"
      description={`Rated ${rating} out of 5 from ${total} reviews on our Google Business Profile.`}
      items={items}
      footer={
        <a
          href={listingUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-marigold hover:underline"
        >
          Read all {total} reviews on Google
        </a>
      }
    />
  );
}
