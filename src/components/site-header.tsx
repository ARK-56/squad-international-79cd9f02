import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, CalendarDays, MessageCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingDialog } from "@/components/booking-dialog";
import { site, services } from "@/lib/site-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logoAsset from "@/assets/squad-logo.png.asset.json";
const logo = logoAsset.url;

const nav = [
  { to: "/industries", label: "Industries" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/faqs", label: "FAQs" },
  { to: "/careers", label: "Careers" },
];

export function SiteHeader({ variant = "default" }: { variant?: "default" | "overlay" }) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
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
            className="h-8 w-auto transition duration-300"
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="group flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-charcoal data-[state=open]:text-charcoal"
              >
                Services
                <ChevronDown className="size-4 transition-transform group-data-[state=open]:rotate-180" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 rounded-xl border-border bg-background p-2 shadow-lg">
              <DropdownMenuItem asChild className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-charcoal hover:bg-muted focus:bg-muted">
                <Link to="/services">All Services</Link>
              </DropdownMenuItem>
              <div className="my-1 h-px bg-border" />
              {services.map((s) => (
                <DropdownMenuItem key={s.slug} asChild className="cursor-pointer rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-charcoal focus:bg-muted focus:text-charcoal">
                  <Link to="/services/$slug" params={{ slug: s.slug }}>
                    {s.title}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

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
            <button
              type="button"
              onClick={() => setServicesOpen((v) => !v)}
              className="flex items-center justify-between rounded-full px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-charcoal"
            >
              Services
              <ChevronDown className={`size-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            {servicesOpen && (
              <div className="ml-4 flex flex-col gap-1 border-l border-border pl-2">
                <Link
                  to="/services"
                  onClick={() => setOpen(false)}
                  className="rounded-full px-4 py-2 text-sm font-medium text-charcoal hover:bg-muted"
                >
                  All Services
                </Link>
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    onClick={() => setOpen(false)}
                    className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-charcoal"
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            )}
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
