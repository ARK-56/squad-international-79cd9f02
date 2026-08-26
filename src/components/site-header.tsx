import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, CalendarDays, MessageCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingDialog } from "@/components/booking-dialog";
import { site, services, industries } from "@/lib/site-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/squad-logo.png";

/**
 * Careers, FAQs and Blog are reachable from the footer rather than here, so the
 * primary nav stays short. Services and Industries are both dropdowns.
 */
const nav = [
  { to: "/case-studies", label: "Case Studies" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const triggerClass =
  "group flex items-center gap-1 text-sm font-medium text-offwhite/70 transition-colors hover:text-offwhite data-[state=open]:text-offwhite";
const chevronClass = "size-4 transition-transform group-data-[state=open]:rotate-180";
const menuClass = "w-64 rounded-xl border-border bg-background p-2 shadow-lg";
const menuLeadClass =
  "cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-charcoal hover:bg-muted focus:bg-muted";
const menuItemClass =
  "cursor-pointer rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-charcoal focus:bg-muted focus:text-charcoal";
const mobileLinkClass =
  "rounded-full px-4 py-2.5 text-sm font-medium text-offwhite/70 hover:bg-offwhite/10 hover:text-offwhite";
const mobileSubLinkClass =
  "rounded-full px-4 py-2 text-sm text-offwhite/60 hover:bg-offwhite/10 hover:text-offwhite";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Fixed rather than sticky so the translucent bar sits over the hero instead
  // of pushing it down, then goes solid once the page scrolls under it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-3 md:px-6">
      <div
        className={`mx-auto flex w-full max-w-[84rem] items-center justify-between gap-6 rounded-full border px-5 py-2.5 transition-colors duration-300 md:px-7 ${
          scrolled
            ? "border-offwhite/10 bg-charcoal shadow-lg"
            : "border-offwhite/15 bg-charcoal/50 backdrop-blur-md"
        }`}
      >
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img
            src={logo}
            alt={`${site.name} logo`}
            className="h-8 w-auto brightness-0 invert transition duration-300"
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button type="button" className={triggerClass}>
                Services
                <ChevronDown className={chevronClass} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className={menuClass}>
              <DropdownMenuItem asChild className={menuLeadClass}>
                <Link to="/services">All Services</Link>
              </DropdownMenuItem>
              <div className="my-1 h-px bg-border" />
              {services.map((s) => (
                <DropdownMenuItem key={s.slug} asChild className={menuItemClass}>
                  <Link to="/services/$slug" params={{ slug: s.slug }}>
                    {s.title}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button type="button" className={triggerClass}>
                Industries
                <ChevronDown className={chevronClass} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className={menuClass}>
              <DropdownMenuItem asChild className={menuLeadClass}>
                <Link to="/industries">All Industries</Link>
              </DropdownMenuItem>
              <div className="my-1 h-px bg-border" />
              {industries.map((i) => (
                <DropdownMenuItem key={i.slug} asChild className={menuItemClass}>
                  <Link to="/industries/$slug" params={{ slug: i.slug }}>
                    {i.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-medium text-offwhite/70 transition-colors hover:text-offwhite [&.active]:text-offwhite"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full bg-offwhite/10 text-offwhite hover:bg-offwhite/20 hover:text-offwhite"
            asChild
          >
            <a href={site.whatsapp} target="_blank" rel="noreferrer">
              <MessageCircle /> WhatsApp
            </a>
          </Button>
          <BookingDialog>
            <Button variant="marigold" size="sm" className="rounded-full">
              <CalendarDays /> Book a Meeting
            </Button>
          </BookingDialog>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-10 w-10 place-items-center rounded-full border border-offwhite/25 text-offwhite lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="mx-auto mt-2 w-full max-w-[84rem] rounded-3xl border border-offwhite/10 bg-charcoal p-4 shadow-lg lg:hidden">
          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => setServicesOpen((v) => !v)}
              className="flex items-center justify-between rounded-full px-4 py-2.5 text-sm font-medium text-offwhite/70 hover:bg-offwhite/10 hover:text-offwhite"
            >
              Services
              <ChevronDown
                className={`size-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {servicesOpen && (
              <div className="ml-4 flex flex-col gap-1 border-l border-offwhite/15 pl-2">
                <Link to="/services" onClick={() => setOpen(false)} className={mobileLinkClass}>
                  All Services
                </Link>
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    onClick={() => setOpen(false)}
                    className={mobileSubLinkClass}
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={() => setIndustriesOpen((v) => !v)}
              className="flex items-center justify-between rounded-full px-4 py-2.5 text-sm font-medium text-offwhite/70 hover:bg-offwhite/10 hover:text-offwhite"
            >
              Industries
              <ChevronDown
                className={`size-4 transition-transform ${industriesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {industriesOpen && (
              <div className="ml-4 flex flex-col gap-1 border-l border-offwhite/15 pl-2">
                <Link to="/industries" onClick={() => setOpen(false)} className={mobileLinkClass}>
                  All Industries
                </Link>
                {industries.map((i) => (
                  <Link
                    key={i.slug}
                    to="/industries/$slug"
                    params={{ slug: i.slug }}
                    onClick={() => setOpen(false)}
                    className={mobileSubLinkClass}
                  >
                    {i.name}
                  </Link>
                ))}
              </div>
            )}

            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={mobileLinkClass}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <BookingDialog>
                <Button variant="marigold" className="rounded-full">
                  <CalendarDays /> Book a Meeting
                </Button>
              </BookingDialog>
              <Button variant="outlineLight" className="rounded-full" asChild>
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
