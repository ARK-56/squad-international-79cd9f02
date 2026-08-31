import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** A single run of digits with optional non-digit decoration: "500+", "98%". */
type Countable = { prefix: string; target: number; suffix: string };

/**
 * Returns null for anything that is not one number, which is how "24/7" opts out:
 * it holds two figures and so has nothing to count towards.
 */
function parseCountable(value: string): Countable | null {
  const match = /^(\D*)(\d+)(\D*)$/.exec(value);
  if (!match) return null;
  // The groups always participate when the match succeeds; the fallbacks are only
  // here to satisfy noUncheckedIndexedAccess.
  return { prefix: match[1] ?? "", target: Number(match[2]), suffix: match[3] ?? "" };
}

const DURATION_MS = 1400;
/** Fast start, slow settle, so the last digits are readable as they land. */
const easeOut = (progress: number) => 1 - (1 - progress) ** 3;

/**
 * A statistic that counts up from zero the first time it is scrolled into view.
 *
 * The failure mode is the thing worth understanding here. A number that animates
 * from zero has to show a zero at some point, and "0+ trained specialists" left
 * on screen is far worse than no animation at all. So the zero is only ever shown
 * once the observer has proved it is delivering callbacks:
 *
 *   - The state is seeded with the real figure, so the server, crawlers and anyone
 *     without JS get "500+", never "0+".
 *   - The zero is written from inside the observer's own first callback, which the
 *     spec guarantees for every observed element. If that callback never arrives,
 *     nothing is overwritten and the real figure stays put.
 *   - A visitor who has asked for reduced motion is left with the static figure.
 *
 * Reading the zero out of the first callback also removes the need to measure the
 * element: a band already on screen simply reports isIntersecting on that first
 * callback and counts immediately.
 *
 * It runs once per visit; the observer disconnects as soon as it has counted.
 */
export function StatValue({ value, className }: { value: string; className?: string }) {
  const countable = useMemo(() => parseCountable(value), [value]);
  const ref = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(value);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let zeroed = false;

    const start = () => {
      if (!countable) {
        // Nothing to count, so it arrives with a fade instead.
        setFade(true);
        return;
      }
      const from = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - from) / DURATION_MS);
        const current = Math.round(easeOut(progress) * countable.target);
        setText(`${countable.prefix}${current}${countable.suffix}`);
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          start();
        } else if (!zeroed) {
          zeroed = true;
          if (countable) setText(`${countable.prefix}0${countable.suffix}`);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [countable]);

  return (
    <span ref={ref} className={cn(fade && "animate-in fade-in duration-1000", className)}>
      {text}
    </span>
  );
}
