import { MessageCircle } from "lucide-react";
import { site } from "@/lib/site-data";

export function WhatsAppFab() {
  return (
    <a
      href={site.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      // Not a Button component, but it reads as one, so it takes the same pop.
      className="btn-pop fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-marigold bg-charcoal px-4 py-3 text-sm font-semibold text-offwhite shadow-[var(--shadow-elevated)]"
    >
      <MessageCircle className="size-5 text-marigold" />
      <span className="hidden sm:inline">Chat With Us</span>
    </a>
  );
}
