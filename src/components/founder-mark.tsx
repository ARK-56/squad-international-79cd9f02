import { site } from "@/lib/site-data";
import founderPhoto from "@/assets/haider-ali.jpg";

/**
 * The founder's portrait, shared by the about page's card and the founder page
 * so the two cannot drift. Sized by the caller, since they use it at very
 * different scales.
 *
 * Square source, cropped square, so object-cover has nothing to crop and the
 * circle never shifts the face off centre.
 *
 * Not lazy: it is the founder page's main image, and at 23KB deferring it only
 * delays the portrait for no saving worth having.
 */
export function FounderMark({ className = "" }: { className?: string }) {
  return (
    <img
      src={founderPhoto}
      alt={`${site.founder.name}, ${site.founder.role} of ${site.name}`}
      className={`shrink-0 rounded-full object-cover ${className}`}
    />
  );
}
