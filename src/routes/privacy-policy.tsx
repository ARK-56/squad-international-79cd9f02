import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { site } from "@/lib/site-data";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Meridian BPO" },
      {
        name: "description",
        content:
          "How Meridian BPO collects, uses, stores and protects personal data submitted through this website and during client engagements.",
      },
      { property: "og:title", content: "Privacy Policy | Meridian BPO" },
      { property: "og:description", content: "Our data collection, use and retention practices." },
    ],
  }),
  component: PrivacyPage,
});

const sections = [
  {
    title: "Information we collect",
    body: "We collect information you provide directly — name, company, email, phone number and the details of your enquiry — along with standard technical data such as IP address, browser type and pages visited.",
  },
  {
    title: "How we use information",
    body: "Enquiry data is used to respond to you, prepare proposals and manage our client relationship. Technical data is used to maintain site security and understand which content is useful.",
  },
  {
    title: "Legal basis",
    body: "We process enquiry data on the basis of taking steps at your request prior to entering a contract, and technical data on the basis of our legitimate interest in operating a secure, functional website.",
  },
  {
    title: "Sharing",
    body: "We do not sell personal data. We share it only with service providers that support our operations — scheduling, email, CRM and hosting — under contractual confidentiality obligations.",
  },
  {
    title: "Client data during engagements",
    body: "Where our teams access your systems, access is role-based and time-limited, staff sign confidentiality agreements, and access is revoked at offboarding. We process such data only on your documented instructions.",
  },
  {
    title: "Retention",
    body: "Enquiry records are retained for up to 24 months from last contact unless a contract requires longer. Contractual records are retained as required by applicable law.",
  },
  {
    title: "Your rights",
    body: "Depending on your location you may request access, correction, deletion, restriction or portability of your personal data, and object to certain processing.",
  },
  {
    title: "Cookies",
    body: "We use essential cookies for site functionality and may use analytics cookies to understand aggregate usage. You can control cookies through your browser settings.",
  },
];

function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="Last updated 20 August 2026. This policy explains how we handle personal data."
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
            Questions or requests about this policy can be sent to{" "}
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
