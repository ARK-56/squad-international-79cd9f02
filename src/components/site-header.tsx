import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, CalendarDays, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site-data";

const nav = [
  { to: "/services", label: "Services" },
  { to: "/industries", label: "Industries" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/faqs", label: "FAQs" },
  { to: "/careers", label: "Careers" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-offwhite/10 bg-charcoal/95 text-offwhite backdrop-blur">
      <div className="container-page flex h-18 items-center justify-between gap-6 py-3">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-sm bg-marigold font-display text-lg text-primary-foreground">
            M
          </span>
          <span className="font-display text-xl leading-none tracking-wide">{site.name}</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-medium text-offwhite/75 transition-colors hover:text-marigold [&.active]:text-marigold"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="outlineLight" size="sm" asChild>
            <a href={site.whatsapp} target="_blank" rel="noreferrer">
              <MessageCircle /> WhatsApp
            </a>
          </Button>
          <Button variant="marigold" size="sm" asChild>
            <a href={site.calendly} target="_blank" rel="noreferrer">
              <CalendarDays /> Book a Meeting
            </a>
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-10 w-10 place-items-center rounded-sm border border-offwhite/20 lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-offwhite/10 bg-charcoal lg:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-sm px-2 py-2.5 text-sm font-medium text-offwhite/80 hover:bg-offwhite/5 hover:text-marigold"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="rounded-sm px-2 py-2.5 text-sm font-medium text-offwhite/80 hover:bg-offwhite/5 hover:text-marigold"
            >
              Contact
            </Link>
            <div className="mt-3 flex flex-col gap-2">
              <Button variant="marigold" asChild>
                <a href={site.calendly} target="_blank" rel="noreferrer">
                  <CalendarDays /> Book a Meeting
                </a>
              </Button>
              <Button variant="outlineLight" asChild>
                <a href={site.whatsapp} target="_blank" rel="noreferrer">
                  <MessageCircle /> Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
