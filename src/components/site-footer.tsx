import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { SubscribeForm } from "@/components/subscribe-form";
import { services, industries, site } from "@/lib/site-data";
import logo from "@/assets/squad-logo.png";

/**
 * Filled brand marks, drawn inline rather than taken from lucide.
 *
 * lucide's social glyphs are outline approximations — its LinkedIn in particular
 * is not the real mark — and mixing 2px outlines with a filled TikTok read
 * unevenly. These are the official shapes, all solid, all on a 24x24 box.
 */
const BRAND_PATHS: Record<string, string> = {
  LinkedIn:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  Instagram:
    "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.9.423.423.683.82.9 1.382.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.9 1.382-.419.423-.824.683-1.38.9-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.9-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.846-10.405a1.441 1.441 0 0 1-2.88 0 1.44 1.44 0 0 1 2.88 0z",
  Facebook:
    "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  YouTube:
    "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  TikTok:
    "M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
};

function BrandIcon({ path, className }: { path: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d={path} />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-offwhite px-4 pb-6 pt-10 md:px-6">
      <div className="mx-auto w-full max-w-[84rem] overflow-hidden rounded-[2rem] bg-charcoal text-offwhite">
      {/* Tighter row gap than column gap: the socials/signup row sat too far below
          the link columns with a uniform 40px. */}
      <div className="grid gap-x-10 gap-y-6 px-8 pt-16 md:grid-cols-2 md:px-12 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <img
              src={logo}
              alt={`${site.name} logo`}
              className="h-8 w-auto brightness-0 invert"
            />
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-offwhite/65">
            {site.boilerplate}
          </p>
          <ul className="mt-5 space-y-2 text-sm text-offwhite/65">
            <li className="flex items-center gap-2">
              <Mail className="size-4 text-marigold" />
              <a href={`mailto:${site.email}`} className="hover:text-marigold">
                {site.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 text-marigold" />
              <a href={site.phoneHref} className="hover:text-marigold">
                {site.phone}
              </a>
            </li>
          </ul>
        </div>

        <FooterCol title="Services">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="text-sm text-offwhite/65 transition-colors hover:text-marigold"
              >
                {s.title}
              </Link>
            </li>
          ))}
        </FooterCol>

        {/* See the offices block below: the two tall columns span both rows so
            the short ones leave a row for it rather than a gap. */}
        <FooterCol title="Industries" className="lg:row-span-2">
          {industries.map((i) => (
            <li key={i.slug}>
              <Link
                to="/industries/$slug"
                params={{ slug: i.slug }}
                className="text-sm text-offwhite/65 transition-colors hover:text-marigold"
              >
                {i.name}
              </Link>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Company" className="lg:row-span-2">
          {[
            { to: "/about", label: "About" },
            { to: "/case-studies", label: "Case Studies" },
            { to: "/blog", label: "Blog" },
            { to: "/careers", label: "Careers" },
            { to: "/faqs", label: "FAQs" },
            { to: "/contact", label: "Contact" },
            { to: "/privacy-policy", label: "Privacy Policy" },
            { to: "/terms-of-service", label: "Terms of Service" },
          ].map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="text-sm text-offwhite/65 transition-colors hover:text-marigold"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </FooterCol>

        {/*
          The offices take the second row beneath the brand and Services columns,
          the space their shorter lists leave while Industries and Company run on
          past them. Two across rather than three: the block is half the footer
          here, not all of it.
        */}
        <div className="grid gap-6 sm:grid-cols-2 md:col-span-2">
          {site.locations.map((loc) => (
            <div key={loc.city} className="flex items-start gap-2 text-sm text-offwhite/65">
              <MapPin className="mt-0.5 size-4 shrink-0 text-marigold" />
              <span>
                <span className="block text-[11px] uppercase tracking-[0.18em] text-marigold">
                  {loc.city}
                </span>
                {loc.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/*
        Socials under the brand column and the signup across the Services and
        Industries columns, so the field lines up with those headings. The same
        four-column track as above keeps that alignment now that this is a row of
        its own rather than the grid's second row.
      */}
      <div className="grid gap-x-10 gap-y-6 px-8 pb-16 pt-10 md:grid-cols-2 md:px-12 lg:grid-cols-4">
        <nav aria-label="Social media" className="flex flex-wrap gap-2">
          {site.socials.map((social) => {
            const path = BRAND_PATHS[social.name];
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                // The icon is decorative, so the link carries the accessible name.
                aria-label={social.name}
                title={social.name}
                className="grid size-9 place-items-center rounded-full border border-offwhite/15 text-offwhite/65 transition-colors hover:border-marigold hover:text-marigold"
              >
                {path ? (
                  <BrandIcon path={path} className="size-4" />
                ) : (
                  <span className="text-[10px] font-medium">{social.name.slice(0, 2)}</span>
                )}
              </a>
            );
          })}
        </nav>

        <div className="md:col-span-2">
          <SubscribeForm />
        </div>

        {/* The row's fourth column, which the signup does not reach. */}
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-marigold">Find us on</p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
            {site.profiles.map((p) => (
              <li key={p.name}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-offwhite/65 transition-colors hover:text-marigold"
                >
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-offwhite/10">
        <div className="flex flex-col items-center justify-between gap-3 px-8 py-6 text-xs text-offwhite/50 sm:flex-row md:px-12">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Business Process Outsourcing · Dedicated Teams · Business Support</p>
        </div>
      </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="text-sm tracking-[0.18em] text-marigold">{title}</h3>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

