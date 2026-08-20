import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { site } from "@/lib/site-data";

export const Route = createFileRoute("/terms-of-service")({
  head: () => ({
    meta: [
      { title: "Terms of Service | Meridian BPO" },
      {
        name: "description",
        content:
          "The terms governing use of the Meridian BPO website, including acceptable use, intellectual property, disclaimers and limitation of liability.",
      },
      { property: "og:title", content: "Terms of Service | Meridian BPO" },
      { property: "og:description", content: "Terms governing use of this website." },
    ],
  }),
  component: TermsPage,
});

const sections = [
  {
    title: "Acceptance of terms",
    body: "By accessing this website you agree to these terms. If you do not agree, please do not use the site.",
  },
  {
    title: "Website content",
    body: "Content is provided for general information about our services. Service descriptions, timelines and figures are indicative and do not constitute an offer or guarantee of results.",
  },
  {
    title: "Engagements",
    body: "Any services we provide are governed by a separate written agreement covering scope, pricing, service levels, confidentiality and termination. Nothing on this website varies those terms.",
  },
  {
    title: "Acceptable use",
    body: "You agree not to misuse the site, attempt unauthorised access, scrape content at scale, or use it for unlawful purposes.",
  },
  {
    title: "Intellectual property",
    body: "All text, design, graphics and marks on this website are owned by us or licensed to us and may not be reproduced without written permission.",
  },
  {
    title: "Third-party links",
    body: "The site links to third-party tools such as scheduling and messaging services. We are not responsible for their content, availability or privacy practices.",
  },
  {
    title: "Disclaimer and liability",
    body: "The site is provided on an 'as is' basis without warranties of any kind. To the fullest extent permitted by law we exclude liability for indirect or consequential loss arising from use of the site.",
  },
  {
    title: "Changes",
    body: "We may update these terms from time to time. Continued use of the site after changes are published constitutes acceptance of the revised terms.",
  },
];

function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        description="Last updated 20 August 2026. These terms govern your use of this website."
      />
      <section className="container-page max-w-3xl space-y-10 py-20 md:py-24">
        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="text-xl text-charcoal">{s.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
          </div>
        ))}
        <div>
          <h2 className="text-xl text-charcoal">Contact</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Questions about these terms? Email{" "}
            <a href={`mailto:${site.email}`} className="text-charcoal underline hover:text-marigold">
              {site.email}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
