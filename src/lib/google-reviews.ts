import { createServerFn } from "@tanstack/react-start";

/**
 * Google Business Profile reviews, read through the Places API (New).
 *
 * Setup (both values are server-only — never prefix them with VITE_, that would
 * ship the API key to the browser):
 *   GOOGLE_PLACES_API_KEY  Google Cloud key with "Places API (New)" enabled.
 *   GOOGLE_PLACE_ID        The Place ID for the Squad International listing.
 *                          Find it at https://developers.google.com/maps/documentation/places/web-service/place-id
 *
 * The Places API returns at most five reviews and gives no way to choose which
 * five — Google decides. If the site needs every review, or curated ordering,
 * that requires the Business Profile API with OAuth instead.
 */

export type GoogleReview = {
  author: string;
  photoUrl: string | null;
  authorUrl: string | null;
  rating: number;
  text: string;
  relativeTime: string;
  reviewUrl: string | null;
};

export type GoogleReviewsPayload = {
  /** False when the env vars are absent — callers fall back to static content. */
  configured: boolean;
  rating: number | null;
  totalRatings: number | null;
  mapsUrl: string | null;
  reviews: GoogleReview[];
};

const EMPTY: GoogleReviewsPayload = {
  configured: false,
  rating: null,
  totalRatings: null,
  mapsUrl: null,
  reviews: [],
};

const FIELD_MASK = ["rating", "userRatingCount", "googleMapsUri", "reviews"].join(",");

/**
 * Google's Places policy forbids storing review content long-term, so this is a
 * short in-process cache to avoid billing a request per page view rather than a
 * durable store. It resets whenever the worker isolate recycles.
 */
const CACHE_TTL_MS = 60 * 60 * 1000;
let cache: { at: number; payload: GoogleReviewsPayload } | null = null;

type PlacesResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: Array<{
    rating?: number;
    relativePublishTimeDescription?: string;
    googleMapsUri?: string;
    text?: { text?: string };
    originalText?: { text?: string };
    authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
  }>;
};

function normalise(data: PlacesResponse): GoogleReviewsPayload {
  const reviews = (data.reviews ?? []).flatMap<GoogleReview>((r) => {
    const text = r.text?.text ?? r.originalText?.text ?? "";
    const author = r.authorAttribution?.displayName ?? "";
    // Ratings-only reviews carry no text and would render as an empty card.
    if (!text.trim() || !author.trim()) return [];
    return [
      {
        author,
        photoUrl: r.authorAttribution?.photoUri ?? null,
        authorUrl: r.authorAttribution?.uri ?? null,
        rating: typeof r.rating === "number" ? r.rating : 0,
        text: text.trim(),
        relativeTime: r.relativePublishTimeDescription ?? "",
        reviewUrl: r.googleMapsUri ?? null,
      },
    ];
  });

  return {
    configured: true,
    rating: typeof data.rating === "number" ? data.rating : null,
    totalRatings: typeof data.userRatingCount === "number" ? data.userRatingCount : null,
    mapsUrl: data.googleMapsUri ?? null,
    reviews,
  };
}

export const getGoogleReviews = createServerFn({ method: "GET" }).handler(
  async (): Promise<GoogleReviewsPayload> => {
    const apiKey = process.env["GOOGLE_PLACES_API_KEY"];
    const placeId = process.env["GOOGLE_PLACE_ID"];

    if (!apiKey || !placeId) return EMPTY;

    if (cache && Date.now() - cache.at < CACHE_TTL_MS) return cache.payload;

    try {
      const response = await fetch(
        `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=en`,
        {
          headers: {
            "X-Goog-Api-Key": apiKey,
            "X-Goog-FieldMask": FIELD_MASK,
          },
        },
      );

      if (!response.ok) {
        console.error(
          `Google Places request failed: ${response.status} ${await response.text().catch(() => "")}`,
        );
        // Serve a stale payload rather than dropping the section on a blip.
        return cache?.payload ?? EMPTY;
      }

      const payload = normalise((await response.json()) as PlacesResponse);
      cache = { at: Date.now(), payload };
      return payload;
    } catch (error) {
      console.error("Google Places request threw", error);
      return cache?.payload ?? EMPTY;
    }
  },
);
