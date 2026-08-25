import { Link } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

/**
 * Trail for the nested detail pages, replacing the single back-link those pages
 * used to carry. Parents are a literal union so TanStack's Link keeps its
 * type-safe route checking.
 */
type ParentPath = "/services" | "/industries" | "/case-studies" | "/blog";

export function Breadcrumbs({
  parent,
  parentLabel,
  current,
  tone = "dark",
  center = false,
}: {
  parent: ParentPath;
  parentLabel: string;
  current: string;
  tone?: "dark" | "light";
  center?: boolean;
}) {
  const link =
    tone === "dark"
      ? "text-offwhite/60 hover:text-marigold"
      : "text-muted-foreground hover:text-marigold";
  const currentClass = tone === "dark" ? "text-marigold" : "text-charcoal";
  const separator = tone === "dark" ? "text-offwhite/30" : "text-muted-foreground/50";

  return (
    <Breadcrumb>
      <BreadcrumbList
        className={`text-[11px] uppercase tracking-[0.18em] ${center ? "justify-center" : ""}`}
      >
        <BreadcrumbItem>
          <BreadcrumbLink asChild className={link}>
            <Link to="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className={separator} />
        <BreadcrumbItem>
          <BreadcrumbLink asChild className={link}>
            <Link to={parent}>{parentLabel}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className={separator} />
        <BreadcrumbItem>
          <BreadcrumbPage className={currentClass}>{current}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
