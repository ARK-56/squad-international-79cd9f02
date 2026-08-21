import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Clock, Globe, LoaderCircle, Video } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { site } from "@/lib/site-data";

function CalendlyInline({ open, onReady }: { open: boolean; onReady: () => void }) {
  const [timezone, setTimezone] = useState("");

  useEffect(() => {
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  useEffect(() => {
    if (!open) return;
    const src = "https://assets.calendly.com/assets/external/widget.js";
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (existing) {
      // @ts-expect-error Calendly global injected by the widget script
      window.Calendly?.initInlineWidgets?.();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    let frame: HTMLIFrameElement | null = null;
    const watchForFrame = () => {
      const nextFrame = document.querySelector<HTMLIFrameElement>(".calendly-inline-widget iframe");
      if (!nextFrame || nextFrame === frame) return;
      frame = nextFrame;
      frame.addEventListener("load", onReady, { once: true });
    };

    watchForFrame();
    const observer = new MutationObserver(watchForFrame);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [onReady, open]);

  return (
    <div
      className="calendly-inline-widget h-[520px] w-full"
      data-url={`${site.calendly}?hide_gdpr_banner=1&background_color=ffffff&text_color=2b2f36&primary_color=e0a33a`}
      data-timezone={timezone}
    />
  );
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
              A 30-minute call to scope your roles, volumes and timelines — and show you exactly
              how a dedicated pod would run.
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
            {open ? <CalendlyInline open={open} onReady={handleReady} /> : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
