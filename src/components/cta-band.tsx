import { CalendarDays, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site-data";

export function CtaBand({
  title = "Ready to see what a dedicated team could take off your plate?",
  description = "Book a 30-minute discovery call, or send us a message on WhatsApp and we'll reply the same working day.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="bg-marigold">
      <div className="container-page flex flex-col items-start gap-8 py-16 md:flex-row md:items-center md:justify-between md:py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl leading-tight text-charcoal md:text-4xl">{title}</h2>
          <p className="mt-4 text-sm leading-relaxed text-charcoal/75 md:text-base">{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="charcoal" size="xl" asChild>
            <a href={site.calendly} target="_blank" rel="noreferrer">
              <CalendarDays /> Book a Meeting
            </a>
          </Button>
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
