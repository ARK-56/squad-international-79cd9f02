import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Globe, Linkedin, Instagram, Facebook, Youtube } from "lucide-react";
import type { ComponentType } from "react";
import { services, industries, site } from "@/lib/site-data";
import logo from "@/assets/squad-logo.png";

/**
 * lucide ships no TikTok glyph, so it is the one brand mark drawn inline.
 *
 * The viewBox is inset rather than the natural "0 0 24 24": this path is solid
 * and fills its box edge to edge, where the surrounding lucide icons are 2px
 * outlines drawing to about 83% of theirs. Without the inset it renders visibly
 * larger and heavier than its neighbours.
 */
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="-2 -2 28 28" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

/** Keyed by the names in site.socials; an unmapped network falls back to its label. */
const socialIcons: Record<string, ComponentType<{ className?: string }>> = {
  LinkedIn: Linkedin,
  Instagram: Instagram,
  Facebook: Facebook,
  YouTube: Youtube,
  TikTok: TikTokIcon,
};

export function SiteFooter() {
  return (
    <footer className="bg-offwhite px-4 pb-6 pt-10 md:px-6">
      <div className="mx-auto w-full max-w-[84rem] overflow-hidden rounded-[2rem] bg-charcoal text-offwhite">
      <div className="grid gap-10 px-8 py-16 md:grid-cols-2 md:px-12 lg:grid-cols-4">
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
              <Mail className="size-4 text-marigold" /> {site.email}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 text-marigold" />
              <a href={site.phoneHref} className="hover:text-marigold">
                {site.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Globe className="size-4 text-marigold" />
              <a
                href={`https://${site.website}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-marigold"
              >
                {site.website}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-marigold" /> {site.address}
            </li>
          </ul>
          <nav aria-label="Social media" className="mt-6 flex flex-wrap gap-2">
            {site.socials.map((social) => {
              const Icon = socialIcons[social.name];
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
                  {Icon ? (
                    <Icon className="size-4" />
                  ) : (
                    <span className="text-[10px] font-medium">{social.name.slice(0, 2)}</span>
                  )}
                </a>
              );
            })}
          </nav>
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

        <FooterCol title="Industries">
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

        <FooterCol title="Company">
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
      </div>

      <div className="border-t border-offwhite/10">
        <div className="flex flex-col items-center justify-between gap-3 px-8 py-6 text-xs text-offwhite/50 sm:flex-row md:px-12">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Business process outsourcing · Dedicated teams · Global delivery</p>
        </div>
      </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm tracking-[0.18em] text-marigold">{title}</h3>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

