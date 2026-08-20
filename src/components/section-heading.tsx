export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
}) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <span className={`eyebrow ${centered ? "justify-center" : ""}`}>
          <span className="h-px w-8 bg-marigold" />
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-4 text-3xl md:text-4xl ${tone === "light" ? "text-offwhite" : "text-charcoal"}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-sm leading-relaxed md:text-base ${
            tone === "light" ? "text-offwhite/70" : "text-muted-foreground"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
