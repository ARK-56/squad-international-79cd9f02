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
    <section className="surface-dark relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-marigold/20 blur-3xl"
      />
      <div className="container-page relative py-20 md:py-28">
        <span className="eyebrow">
          <span className="h-px w-8 bg-marigold" />
          {eyebrow}
        </span>
        <h1 className="mt-5 max-w-4xl text-4xl leading-[0.95] md:text-6xl">{title}</h1>
        {description && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-offwhite/70 md:text-lg">
            {description}
          </p>
        )}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
