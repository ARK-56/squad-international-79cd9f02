import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function FeatureSplit({
  eyebrow,
  title,
  description,
  bullets,
  actions,
  media,
  reverse = false,
  tone = "light",
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  bullets?: string[];
  actions?: ReactNode;
  media: ReactNode;
  reverse?: boolean;
  tone?: "light" | "muted";
}) {
  return (
    <section className={cn(tone === "muted" ? "bg-card" : "bg-background")}>
      <div className="container-page grid items-center gap-12 py-20 lg:grid-cols-2 lg:gap-16 md:py-28">
        <div className={cn(reverse && "lg:order-2")}>
          <span className="eyebrow">
            <span className="h-px w-8 bg-marigold" /> {eyebrow}
          </span>
          <h2 className="font-display mt-5 max-w-xl text-balance text-4xl uppercase leading-[0.95] tracking-tight text-charcoal md:text-5xl lg:text-6xl">
            {title}
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {description}
          </p>
          {bullets && (
            <ul className="mt-7 space-y-3">
              {bullets.map((b) => (
                <li key={b} className="flex gap-3 text-sm text-charcoal">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-marigold" />
                  {b}
                </li>
              ))}
            </ul>
          )}
          {actions && <div className="mt-9 flex flex-wrap gap-3">{actions}</div>}
        </div>

        <div className={cn("relative", reverse && "lg:order-1")}>{media}</div>
      </div>
    </section>
  );
}

export function FlowMedia({
  steps,
  badge,
}: {
  steps: { label: string; value: string }[];
  badge?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-offwhite p-6 sm:p-10">
      <div className="relative space-y-4">
        {steps.map((s, i) => (
          <div
            key={s.value}
            // Same card-pop as the card grids. No hover shadow here: these already
            // carry the elevated shadow permanently, so only the border changes.
            className="card-pop rounded-lg border border-border bg-background p-4 shadow-[var(--shadow-elevated)] hover:border-marigold"
            style={{ marginLeft: `${i * 7}%` }}
          >
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {s.label}
            </p>
            <p className="mt-1.5 text-sm font-semibold text-charcoal">{s.value}</p>
          </div>
        ))}
      </div>
      {badge && (
        <div className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-charcoal px-4 py-2 text-xs font-semibold uppercase tracking-wider text-marigold">
          {badge}
        </div>
      )}
    </div>
  );
}

export function OrbitMedia({ center, roles }: { center: string; roles: string[] }) {
  const items = roles.slice(0, 6);
  return (
    <div className="@container relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-offwhite">
      <div className="absolute left-1/2 top-1/2 aspect-square w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-marigold/30 bg-marigold/10" />
      <div className="absolute left-1/2 top-1/2 aspect-square w-[44%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-charcoal/15" />
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-charcoal px-5 py-3 text-sm font-semibold text-offwhite shadow-[var(--shadow-elevated)]">
        {center}
      </div>
      {/*
        The labels live on a square layer so their six positions describe a true
        circle. Previously each was placed with a percentage of height against a
        percentage of width inside a 4:3 box, which is an ellipse: rotating that
        would swing the pills in and out rather than carrying them around.
      */}
      {/*
        The labels are a fixed size while the box is not, so a small box leaves the
        widest pill almost touching the edge as it swings past. The orbit tightens
        on a narrow box to keep that clearance. It is a container query rather than
        a breakpoint because this box is one column of a grid that collapses: at
        1024px it is narrower than it is at 768px, where the layout is single column.
      */}
      <div className="orbit-ring absolute left-1/2 top-1/2 aspect-square w-[62%] -translate-x-1/2 -translate-y-1/2 @max-[480px]:w-[50%]">
        {items.map((role, i) => {
          const angle = (i / items.length) * 2 * Math.PI - Math.PI / 2;
          const top = 50 + Math.sin(angle) * 50;
          const left = 50 + Math.cos(angle) * 50;
          return (
            <span
              key={role}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ top: `${top}%`, left: `${left}%` }}
            >
              <span className="orbit-pill block whitespace-nowrap rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-charcoal shadow-sm">
                {role}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
