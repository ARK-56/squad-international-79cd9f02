import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { services, industries, site } from "@/lib/site-data";
import logo from "@/assets/squad-logo-black.png";

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
              className="h-8 w-auto brightness-0 invert mix-blend-screen"
            />
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-offwhite/65">
            Dedicated offshore teams for customer support, business assistance, lead generation and
            operational delivery.
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
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-marigold" /> {site.address}
            </li>
          </ul>
          <nav aria-label="Social media" className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
            {site.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-offwhite/65 transition-colors hover:text-marigold"
              >
                {social.name}
              </a>
            ))}
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

