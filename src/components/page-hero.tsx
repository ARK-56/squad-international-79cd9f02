import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-offwhite">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-marigold/15 blur-3xl"
      />
      <div className="container-page relative flex flex-col items-center py-24 text-center md:py-32">
        <span className="eyebrow justify-center text-marigold">
          <span className="h-px w-8 bg-marigold" />
          {eyebrow}
        </span>
        <h1 className="mt-6 max-w-4xl text-5xl leading-[0.92] tracking-tight text-charcoal md:text-7xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>
        )}
        {children && (
          <div className="mt-9 flex flex-wrap justify-center gap-3">{children}</div>
        )}
      </div>
    </section>
  );
}
