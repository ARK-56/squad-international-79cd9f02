import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, CalendarDays, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingDialog } from "@/components/booking-dialog";
import { site } from "@/lib/site-data";
import logoAsset from "@/assets/squad-logo.png.asset.json";
const logo = logoAsset.url;

const nav = [
  { to: "/services", label: "Services" },
  { to: "/industries", label: "Industries" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/faqs", label: "FAQs" },
  { to: "/careers", label: "Careers" },
];

export function SiteHeader({ variant = "default" }: { variant?: "default" | "overlay" }) {
  const [open, setOpen] = useState(false);
  const isOverlay = variant === "overlay";

  return (
    <header
      className={`top-0 z-50 px-4 py-3 md:px-6 ${isOverlay ? "absolute inset-x-0" : "sticky"}`}
    >
      <div className="mx-auto flex w-full max-w-[84rem] items-center justify-between gap-6 rounded-full border border-border bg-background px-5 py-2.5 shadow-sm md:px-7">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img
            src={logo}
            alt={`${site.name} logo`}
            className={`h-8 w-auto transition duration-300 ${isOverlay ? "brightness-0 invert" : ""}`}
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-charcoal [&.active]:text-charcoal"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="ghost" size="sm" className="rounded-full bg-muted text-charcoal hover:bg-muted/70" asChild>
            <a href={site.whatsapp} target="_blank" rel="noreferrer">
              <MessageCircle /> WhatsApp
            </a>
          </Button>
          <BookingDialog>
            <Button variant="charcoal" size="sm" className="rounded-full">
              <CalendarDays /> Book a Meeting
            </Button>
          </BookingDialog>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-10 w-10 place-items-center rounded-full border border-border text-charcoal lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="mx-auto mt-2 w-full max-w-[84rem] rounded-3xl border border-border bg-background p-4 shadow-sm lg:hidden">
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-full px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-charcoal"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="rounded-full px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-charcoal"
            >
              Contact
            </Link>
            <div className="mt-3 flex flex-col gap-2">
              <BookingDialog>
                <Button variant="charcoal" className="rounded-full">
                  <CalendarDays /> Book a Meeting
                </Button>
              </BookingDialog>
              <Button variant="outlineDark" className="rounded-full" asChild>
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
