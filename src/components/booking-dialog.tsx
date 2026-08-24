import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Clock, Globe, LoaderCircle, Video } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { site } from "@/lib/site-data";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

const CALENDLY_SRC = "https://assets.calendly.com/assets/external/widget.js";

/** Shared across dialog instances so widget.js is only ever fetched once. */
let loader: Promise<void> | null = null;

function loadCalendly(): Promise<void> {
  if (window.Calendly) return Promise.resolve();
  if (loader) return loader;

  loader = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${CALENDLY_SRC}"]`);
    const script = existing ?? document.createElement("script");

    script.addEventListener(
      "load",
      () =>
        window.Calendly
          ? resolve()
          : reject(new Error("Calendly widget.js loaded without exposing window.Calendly")),
      { once: true },
    );
    script.addEventListener("error", () => reject(new Error("Calendly widget.js failed to load")), {
      once: true,
    });

    if (!existing) {
      script.src = CALENDLY_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
  });

  // A failed load shouldn't poison every later attempt.
  loader.catch(() => {
    loader = null;
  });

  return loader;
}

function CalendlyInline({ onReady }: { onReady: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let cancelled = false;

    const params = new URLSearchParams({
      hide_gdpr_banner: "1",
      background_color: "ffffff",
      text_color: "2b2f36",
      primary_color: "e0a33a",
    });
    // Resolved here rather than via state: a render round-trip landed after the
    // widget had already initialised, so the timezone never reached it.
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timezone) params.set("timezone", timezone);

    loadCalendly()
      .then(() => {
        if (cancelled || !containerRef.current) return;
        // initInlineWidget targets an explicit element, so it works no matter when
        // the container mounts. The previous code called initInlineWidgets() — a
        // method this script does not expose — so every reopen silently did nothing
        // and only the very first open worked, via widget.js's initial page scan.
        window.Calendly?.initInlineWidget({
          url: `${site.calendly}?${params.toString()}`,
          parentElement: containerRef.current,
        });
        containerRef.current
          .querySelector("iframe")
          ?.addEventListener("load", onReady, { once: true });
      })
      .catch((error: unknown) => {
        console.error(error);
        // Drop the spinner so the dialog isn't stuck loading forever.
        if (!cancelled) onReady();
      });

    return () => {
      cancelled = true;
      // Radix keeps the node mounted through the close animation; emptying it means
      // the next open starts from a clean container instead of a stale widget.
      container.replaceChildren();
    };
  }, [onReady]);

  useEffect(() => {
    // Calendly's own "the scheduler is live" signal, and the only one that fires
    // reliably once the embedded app has booted.
    const onMessage = (event: MessageEvent) => {
      const name = (event.data as { event?: unknown } | null)?.event;
      if (typeof name === "string" && name.startsWith("calendly.")) onReady();
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [onReady]);

  return <div ref={containerRef} className="h-[520px] w-full" />;
}

export function BookingDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (nextOpen) setIsLoading(true);
  };
  const handleReady = useCallback(() => setIsLoading(false), []);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[95vw] gap-0 overflow-hidden border-border bg-background p-0 sm:max-w-4xl">
        <DialogTitle className="sr-only">Book a discovery call</DialogTitle>
        <div className="grid md:grid-cols-[minmax(0,260px)_1fr]">
          <aside className="border-b border-border bg-offwhite p-6 md:border-b-0 md:border-r">
            <span className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {site.name}
            </span>
            <h3 className="font-display mt-5 text-2xl uppercase leading-tight tracking-tight text-charcoal">
              Discovery Call
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              A 30-minute call to scope your roles, volumes and timelines — and show you exactly how
              a dedicated pod would run.
            </p>
            <span className="mt-5 block h-1 w-12 bg-marigold" />
            <ul className="mt-5 space-y-3 text-sm text-charcoal">
              <li className="flex items-center gap-2">
                <Clock className="size-4 text-marigold" /> 30 minutes
              </li>
              <li className="flex items-center gap-2">
                <Video className="size-4 text-marigold" /> Google Meet / Zoom
              </li>
              <li className="flex items-center gap-2">
                <Globe className="size-4 text-marigold" /> Your local time zone
              </li>
            </ul>
          </aside>
          <div className="relative bg-background">
            {isLoading && open && (
              <div className="absolute inset-0 z-10 grid place-items-center bg-background">
                <div className="flex flex-col items-center gap-3 text-center">
                  <LoaderCircle className="size-7 animate-spin text-marigold" aria-hidden="true" />
                  <p className="text-sm font-medium text-charcoal">Loading available times…</p>
                </div>
              </div>
            )}
            {open ? <CalendlyInline onReady={handleReady} /> : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
