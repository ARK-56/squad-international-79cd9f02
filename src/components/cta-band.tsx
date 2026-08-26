import { CalendarDays, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingDialog } from "@/components/booking-dialog";
import { site } from "@/lib/site-data";

export function CtaBand({
  eyebrow = "Next step",
  title = "Need a little help? We've got you covered!",
  description = "Book a 30-minute discovery call, or message us on WhatsApp — we reply the same working day.",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  return (
    <section className="border-y border-border bg-offwhite">
      <div className="container-page flex flex-col items-center py-20 text-center md:py-28">
        <span className="eyebrow">
          <span className="h-px w-8 bg-marigold" /> {eyebrow}
        </span>
        <h2 className="font-display mt-5 max-w-4xl text-balance text-4xl uppercase leading-[0.95] tracking-tight text-charcoal sm:text-5xl md:text-6xl lg:text-7xl">
          {title}
        </h2>
        <span className="mt-6 block h-1 w-16 bg-marigold" />
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {description}
        </p>
        <div className="mt-10 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <BookingDialog>
            <Button variant="marigold" size="xl">
              <CalendarDays /> Book a Meeting
            </Button>
          </BookingDialog>

          <Button variant="outlineDark" size="xl" asChild>
            <a href={site.whatsapp} target="_blank" rel="noreferrer">
              <MessageCircle /> Chat With Us
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
