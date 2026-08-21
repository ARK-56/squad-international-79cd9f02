import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/site-data";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "Outsourcing FAQs | Pricing, Onboarding & Security" },
      {
        name: "description",
        content:
          "Answers on BPO pricing, onboarding timelines, quality control, data security, team management and scaling dedicated offshore teams.",
      },
      { property: "og:title", content: "Outsourcing FAQs | Squad International" },
      {
        property: "og:description",
        content: "Pricing, onboarding, quality control, security and scalability — answered plainly.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQs"
        title="Straight answers to the usual objections"
        description="Pricing, onboarding, quality, security and continuity — what buyers ask before signing."
      />

      <section className="bg-card py-20 md:py-24">
        <div className="container-page max-w-3xl rounded-xl border border-border bg-background p-6 md:p-10">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base text-charcoal hover:text-marigold">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <CtaBand title="Still have a question we haven't answered?" />
    </>
  );
}
