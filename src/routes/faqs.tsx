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
            acceptedAnswer: { "@type": "Answer", text: f.a.join(" ") },
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
        title="Straight answers before you outsource"
        description="From pricing and onboarding to team management, scaling and day-to-day delivery — here are answers to the questions businesses commonly ask before working with Squad International."
      />

      <section className="bg-card py-20 md:py-24">
        <div className="container-page max-w-3xl rounded-xl border border-border bg-background p-6 md:p-10">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base text-charcoal hover:text-marigold">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                {f.a.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        </div>
      </section>

      <CtaBand
        eyebrow="Still have a question?"
        title="Let's talk about your business."
        description="Every outsourcing requirement is different. Book a 30-minute discovery call or message us on WhatsApp to discuss your workload, current challenges and where additional support could make the biggest difference."
      />
    </>
  );
}
