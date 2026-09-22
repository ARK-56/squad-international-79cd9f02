import {
  HeartPulse,
  ShoppingBag,
  Cloud,
  Truck,
  Briefcase,
  Building2,
  UtensilsCrossed,
  Layers,
  type LucideIcon,
} from "lucide-react";

/**
 * One icon per industry, keyed by slug rather than array position so reordering
 * the industries cannot silently reassign them.
 *
 * A stethoscope would repeat the medical billing service's mark, so healthcare
 * takes the pulse line instead: the menus sit next to each other and the two
 * should not read as the same entry.
 *
 * Lives here rather than in site-data because these are React components and
 * that file is content only, with no React imports. Mirrors service-icons.
 */
const INDUSTRY_ICONS: Record<string, LucideIcon> = {
  healthcare: HeartPulse,
  "ecommerce-retail": ShoppingBag,
  "saas-technology": Cloud,
  logistics: Truck,
  // The slug predates the rename to Professional & Business Services.
  "financial-services": Briefcase,
  "real-estate": Building2,
  "restaurants-hospitality": UtensilsCrossed,
};

/** Layers covers an industry added later, so a new one is never left bare. */
export function industryIcon(slug: string): LucideIcon {
  return INDUSTRY_ICONS[slug] ?? Layers;
}
