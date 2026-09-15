import { useQuery } from "@tanstack/react-query";
import { getGoogleReviews } from "@/lib/google-reviews";
import { Testimonials, type TestimonialItem } from "@/components/testimonials";
import { site, testimonials } from "@/lib/site-data";

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
    : testimonials;

  /*
   * All twenty, uncapped. The section is two sliding rows now rather than a
   * grid, so length costs no height: more reviews make the loop longer, not the
   * page. The cap existed only while every review was a row of the grid.
   */

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
