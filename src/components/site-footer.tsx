import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { services, industries, site } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="surface-dark border-t border-offwhite/10">
      <div className="container-page grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-sm bg-marigold font-display text-lg text-primary-foreground">
              M
            </span>
            <span className="font-display text-xl tracking-wide">{site.name}</span>
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
              <Phone className="size-4 text-marigold" /> {site.phone}
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-marigold" /> {site.address}
            </li>
          </ul>
        </div>

        <FooterCol title="Services">
          {services.map((s) => (
            <FooterLink key={s.slug} to="/services/$slug" params={{ slug: s.slug }}>
              {s.title}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Industries">
          {industries.map((i) => (
            <FooterLink key={i.slug} to="/industries/$slug" params={{ slug: i.slug }}>
              {i.name}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Company">
          <FooterLink to="/about">About</FooterLink>
          <FooterLink to="/case-studies">Case Studies</FooterLink>
          <FooterLink to="/blog">Blog</FooterLink>
          <FooterLink to="/careers">Careers</FooterLink>
          <FooterLink to="/faqs">FAQs</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
          <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
          <FooterLink to="/terms-of-service">Terms of Service</FooterLink>
        </FooterCol>
      </div>

      <div className="border-t border-offwhite/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-offwhite/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Business process outsourcing · Dedicated teams · Global delivery</p>
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

function FooterLink(props: React.ComponentProps<typeof Link>) {
  return (
    <li>
      <Link
        {...props}
        className="text-sm text-offwhite/65 transition-colors hover:text-marigold"
      />
    </li>
  );
}
