import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Menu, X, CalendarDays, MessageCircle, ChevronDown, ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
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
// Width is passed per dropdown rather than shared: Services carries capability
// chips and a "View service" line under each summary and wants the extra room,
// while Industries is still just a title over a one-line tagline.
const menuClass = "rounded-xl border-border bg-background p-3 shadow-lg";
const SERVICES_MENU_WIDTH = "w-[min(56rem,calc(100vw-3rem))]";
const INDUSTRIES_MENU_WIDTH = "w-[min(44rem,calc(100vw-3rem))]";
const menuLeadClass =
  "cursor-pointer rounded-lg px-3 py-2 text-sm font-semibold text-charcoal hover:bg-muted focus:bg-muted";
// flex-col/items-start override the primitive's single-line centring so the
// description can sit under the title.
const menuItemClass =
  "cursor-pointer flex-col items-start gap-0 whitespace-normal rounded-lg px-3 py-2.5 hover:bg-muted focus:bg-muted";

/** Title over description, matching the two-line treatment used on the page cards. */
function MenuItemText({
  title,
  description,
  highlights,
}: {
  title: string;
  description: string;
  /**
   * Capability chips, carrying the service cards' treatment into the menu. Only
   * the services have them; industries have no equivalent field.
   */
  highlights?: string[];
}) {
  const hasChips = Boolean(highlights && highlights.length > 0);
  return (
    <>
      <span className="text-sm font-semibold text-charcoal">{title}</span>
      <span className="mt-1 text-xs leading-relaxed text-muted-foreground">{description}</span>
      {hasChips && highlights && (
        /*
         * mt-auto sinks the chips and the affordance to the foot of the item. The
         * grid gives every row the same height, so the slack from a shorter
         * summary or a one-line title collects above the chips rather than as a
         * gap under the title, which is what reserving two title lines used to
         * do. It also lines the chips up across a row.
         */
        <span className="mt-auto flex w-full flex-col pt-4">
          {/*
            bg-card rather than the cards' bg-background: the panel is already
            bg-background, so that would leave the chips with no fill against it.
            card is lighter than both the panel and the item's muted hover, so the
            chips hold their edge in either state.
          */}
          <span className="flex flex-wrap gap-1.5">
            {highlights.map((h) => (
              <span
                key={h}
                className="rounded-full border border-border bg-card px-2.5 py-0.5 text-[11px] font-medium text-charcoal"
              >
                {h}
              </span>
            ))}
          </span>
          {/*
            Visual affordance only. The whole item is already the link, so reading
            these words out would just repeat what the item does.
          */}
          <span
            aria-hidden="true"
            className="mt-2.5 inline-flex items-center gap-1.5 pb-1 text-xs font-semibold text-charcoal"
          >
            View service <ArrowRight className="size-3.5" />
          </span>
        </span>
      )}
    </>
  );
}
const mobileLinkClass =
  "rounded-full px-4 py-2.5 text-sm font-medium text-offwhite/70 hover:bg-offwhite/10 hover:text-offwhite";
const mobileSubLinkClass =
  "rounded-full px-4 py-2 text-sm text-offwhite/60 hover:bg-offwhite/10 hover:text-offwhite";

/** Only one nav dropdown is open at a time, so the header tracks which. */
type NavMenu = "services" | "industries";

/** A measured box a panel can be sized and aligned to. */
type PanelBox = { width: number; left: number };

/**
 * Hover only where there is a real pointer. Touch keeps tap-to-open, and small
 * screens use the separate accordion menu anyway.
 */
const canHover = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/**
 * Nav dropdown, opening on either hover or click.
 *
 * Radix's DropdownMenu is click-driven by design, so openOn="click" is the
 * primitive as shipped, and openOn="hover" layers pointer handling over it. Two
 * details matter for the hover variant:
 *   - modal={false}: a modal menu locks page scroll, which is wrong for something
 *     that opens just by passing the cursor over it.
 *   - a short close delay, so crossing the gap between trigger and menu does not
 *     dismiss it.
 *
 * Which menu is open lives in the header rather than in each dropdown. Radix
 * dismisses a menu on outside *pointerdown*, which a hover never produces, so
 * without a single owner, hovering Services while Industries was clicked open
 * would leave both panels on screen at once.
 *
 * Radix focuses the menu on open and there is no public prop to skip that, so a
 * hover also moves focus into the menu. It is returned to the trigger on close.
 */
function NavDropdown({
  id,
  label,
  openOn,
  openMenu,
  onOpenChange,
  menuWidth,
  matchBox,
  children,
}: {
  id: NavMenu;
  label: string;
  openOn: "hover" | "click";
  openMenu: NavMenu | null;
  onOpenChange: (id: NavMenu, open: boolean) => void;
  /** Tailwind width class for the panel; the two menus hold different content. */
  menuWidth: string;
  /**
   * When given, the panel takes this box's width and starts at its left edge
   * instead of the trigger's, which is how the services menu spans the header
   * bar. Null until measured, so the class width above is the fallback and also
   * what the server renders.
   */
  matchBox?: PanelBox | null;
  children: ReactNode;
}) {
  const open = openMenu === id;
  const hover = openOn === "hover";
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const clearTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const handleEnter = () => {
    if (!hover || !canHover()) return;
    clearTimer();
    onOpenChange(id, true);
  };

  /**
   * Closing is driven by the pointer's position rather than a mouseleave handler.
   * The menu is portaled to the body and sits a few pixels below the trigger, so
   * leave events fire while the cursor is still travelling between the two; testing
   * whether the pointer is inside either box is unambiguous and covers the gap.
   */
  useEffect(() => {
    if (!open || !hover || !canHover()) return;

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
          onOpenChange(id, false);
        }, 120);
      }
    };

    document.addEventListener("pointermove", onMove);
    return () => {
      document.removeEventListener("pointermove", onMove);
      clearTimer();
    };
  }, [open, hover, id, onOpenChange]);

  useEffect(() => clearTimer, []);

  /**
   * Radix aligns the panel to the trigger, so spanning the header bar means
   * offsetting by the distance between the two. Recomputed whenever the menu
   * opens as well as when the box changes, since the trigger moves with the
   * layout while the offset itself is only read at open time.
   */
  const [alignOffset, setAlignOffset] = useState(0);
  useEffect(() => {
    const el = triggerRef.current;
    if (!matchBox || !el) {
      setAlignOffset(0);
      return;
    }
    setAlignOffset(Math.round(matchBox.left - el.getBoundingClientRect().left));
  }, [matchBox, open]);

  return (
    <DropdownMenu
      open={open}
      onOpenChange={(next) => {
        clearTimer();
        onOpenChange(id, next);
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
        alignOffset={alignOffset}
        sideOffset={10}
        // The panel is wide enough that a start-aligned menu on the right-hand
        // triggers runs past the viewport at 1024px; this lets Radix shift it back.
        // A matched panel already sits inside the header's own 24px inset, so this
        // never fires for it.
        collisionPadding={16}
        className={matchBox ? menuClass : `${menuWidth} ${menuClass}`}
        style={matchBox ? { width: matchBox.width } : undefined}
        onPointerEnter={handleEnter}
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<NavMenu | null>(null);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const [bar, setBar] = useState<PanelBox | null>(null);

  /**
   * The services panel is sized and placed to the header bar, so it has to be
   * measured. CSS cannot express that box: it is max-w-[84rem] inside the
   * header's own 24px padding, and calc(100vw - 3rem) would be wrong by the width
   * of the scrollbar, since 100vw counts it and the bar does not. That error is
   * platform-dependent, which is worse than being merely approximate.
   */
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setBar({ width: Math.round(r.width), left: Math.round(r.left) });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Stable, so the hover dropdown can list it as an effect dependency without
  // rebinding its pointermove listener on every render.
  const handleMenuChange = useCallback((id: NavMenu, next: boolean) => {
    setOpenMenu((current) => (next ? id : current === id ? null : current));
  }, []);

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
        ref={barRef}
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
          <NavDropdown
            id="services"
            label="Services"
            openOn="hover"
            openMenu={openMenu}
            onOpenChange={handleMenuChange}
            menuWidth={SERVICES_MENU_WIDTH}
            matchBox={bar}
          >
            {/*
              A narrow intro column beside the services themselves. The lead row
              that used to sit across the top is gone; its link is the button at
              the foot of this column instead.
            */}
            <div className="@container grid grid-cols-[17rem_1fr] gap-5">
              <div className="flex flex-col justify-between rounded-lg bg-muted/60 p-5">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-marigold">
                    What we do
                  </span>
                  <p className="mt-3 font-display text-xl uppercase leading-tight text-charcoal">
                    Capabilities you can switch on
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    Six service lines built around the way your business works, from customer
                    support to the back office.
                  </p>
                </div>
                {/*
                  A menu item rather than a Button, so it stays in Radix's keyboard
                  order with the services; buttonVariants only lends it the look.
                */}
                <DropdownMenuItem
                  asChild
                  className={`${buttonVariants({ variant: "outlineDark", size: "sm" })} mt-5 w-full cursor-pointer justify-center`}
                >
                  <Link to="/services">
                    All services <ArrowRight />
                  </Link>
                </DropdownMenuItem>
              </div>

              {/*
                Three across only once the panel is wide enough to afford it. The
                intro column is a fixed 17rem, so at 1024 a third column squeezed
                each service to 213px and pushed its chips onto three rows; two
                columns keep them readable. Measured against the panel rather than
                the viewport, since the panel tracks the header bar, not the window.
              */}
              <div className="grid auto-rows-fr grid-cols-2 gap-0.5 @[68rem]:grid-cols-3">
                {services.map((s) => (
                  <DropdownMenuItem key={s.slug} asChild className={menuItemClass}>
                    <Link to="/services/$slug" params={{ slug: s.slug }}>
                      <MenuItemText
                        title={s.title}
                        description={s.short}
                        highlights={s.highlights}
                      />
                    </Link>
                  </DropdownMenuItem>
                ))}
              </div>
            </div>
          </NavDropdown>

          <NavDropdown
            id="industries"
            label="Industries"
            openOn="click"
            openMenu={openMenu}
            onOpenChange={handleMenuChange}
            menuWidth={INDUSTRIES_MENU_WIDTH}
          >
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
          </NavDropdown>

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
