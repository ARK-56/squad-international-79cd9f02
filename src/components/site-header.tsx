import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
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
// Wide enough for two columns of title + description, but never wider than the
// viewport on a small laptop.
const menuClass =
  "w-[min(44rem,calc(100vw-3rem))] rounded-xl border-border bg-background p-3 shadow-lg";
const menuLeadClass =
  "cursor-pointer rounded-lg px-3 py-2 text-sm font-semibold text-charcoal hover:bg-muted focus:bg-muted";
// flex-col/items-start override the primitive's single-line centring so the
// description can sit under the title.
const menuItemClass =
  "cursor-pointer flex-col items-start gap-0 whitespace-normal rounded-lg px-3 py-2.5 hover:bg-muted focus:bg-muted";

/** Title over description, matching the two-line treatment used on the page cards. */
function MenuItemText({ title, description }: { title: string; description: string }) {
  return (
    <>
      <span className="text-sm font-semibold text-charcoal">{title}</span>
      <span className="mt-1 text-xs leading-relaxed text-muted-foreground">{description}</span>
    </>
  );
}
const mobileLinkClass =
  "rounded-full px-4 py-2.5 text-sm font-medium text-offwhite/70 hover:bg-offwhite/10 hover:text-offwhite";
const mobileSubLinkClass =
  "rounded-full px-4 py-2 text-sm text-offwhite/60 hover:bg-offwhite/10 hover:text-offwhite";

/**
 * Nav dropdown that opens on hover, while keeping click and keyboard working.
 *
 * Radix's DropdownMenu is click-driven by design, so the open state is lifted here
 * and driven by pointer events. Three details matter:
 *   - modal={false}: a modal menu locks page scroll, which is wrong for something
 *     that opens just by passing the cursor over it.
 *   - a short close delay, so crossing the gap between trigger and menu does not
 *     dismiss it.
 *
 * Radix focuses the menu on open and there is no public prop to skip that, so a
 * hover also moves focus into the menu. It is returned to the trigger on close.
 */
function HoverDropdown({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const clearTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  // Hover only where there is a real pointer. Touch keeps tap-to-open, and small
  // screens use the separate accordion menu anyway.
  const canHover = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const handleEnter = () => {
    if (!canHover()) return;
    clearTimer();
    setOpen(true);
  };

  /**
   * Closing is driven by the pointer's position rather than a mouseleave handler.
   * The menu is portaled to the body and sits a few pixels below the trigger, so
   * leave events fire while the cursor is still travelling between the two; testing
   * whether the pointer is inside either box is unambiguous and covers the gap.
   */
  useEffect(() => {
    if (!open || !canHover()) return;

    const onMove = (e: PointerEvent) => {
      const boxes = [triggerRef.current, contentRef.current]
        .filter((el) => el !== null)
        .map((el) => el.getBoundingClientRect());
      // Pad so the gap between trigger and menu still counts as "inside".
      const pad = 16;
      const inside = boxes.some(
        (b) =>
          e.clientX >= b.left - pad &&
          e.clientX <= b.right + pad &&
          e.clientY >= b.top - pad &&
          e.clientY <= b.bottom + pad,
      );
      if (inside) {
        clearTimer();
      } else if (!closeTimer.current) {
        closeTimer.current = setTimeout(() => {
          closeTimer.current = null;
          setOpen(false);
        }, 120);
      }
    };

    document.addEventListener("pointermove", onMove);
    return () => {
      document.removeEventListener("pointermove", onMove);
      clearTimer();
    };
  }, [open]);

  useEffect(() => clearTimer, []);

  return (
    <DropdownMenu
      open={open}
      onOpenChange={(next) => {
        clearTimer();
        setOpen(next);
      }}
      modal={false}
    >
      <DropdownMenuTrigger asChild onPointerEnter={handleEnter}>
        <button ref={triggerRef} type="button" className={triggerClass}>
          {label}
          <ChevronDown className={chevronClass} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        ref={contentRef}
        align="start"
        sideOffset={10}
        // The panel is wide enough that a start-aligned menu on the right-hand
        // triggers runs past the viewport at 1024px; this lets Radix shift it back.
        collisionPadding={16}
        className={menuClass}
        onPointerEnter={handleEnter}
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

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
          <HoverDropdown label="Services">
            <DropdownMenuItem asChild className={menuLeadClass}>
              <Link to="/services">All Services →</Link>
            </DropdownMenuItem>
            <div className="my-1 h-px bg-border" />
            <div className="grid gap-0.5 sm:grid-cols-2">
              {services.map((s) => (
                <DropdownMenuItem key={s.slug} asChild className={menuItemClass}>
                  <Link to="/services/$slug" params={{ slug: s.slug }}>
                    <MenuItemText title={s.title} description={s.short} />
                  </Link>
                </DropdownMenuItem>
              ))}
            </div>
          </HoverDropdown>

          <HoverDropdown label="Industries">
            <DropdownMenuItem asChild className={menuLeadClass}>
              <Link to="/industries">All Industries →</Link>
            </DropdownMenuItem>
            <div className="my-1 h-px bg-border" />
            <div className="grid gap-0.5 sm:grid-cols-2">
              {industries.map((i) => (
                <DropdownMenuItem key={i.slug} asChild className={menuItemClass}>
                  <Link to="/industries/$slug" params={{ slug: i.slug }}>
                    <MenuItemText title={i.name} description={i.tagline} />
                  </Link>
                </DropdownMenuItem>
              ))}
            </div>
          </HoverDropdown>

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
