import { createFileRoute } from "@tanstack/react-router";

import { site } from "@/lib/site-data";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Squad International" },
      {
        name: "description",
        content:
          "How Squad International collects, uses, stores and protects personal data submitted through this website and during client engagements.",
      },
      { property: "og:title", content: "Privacy Policy | Squad International" },
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
    <article className="bg-charcoal text-offwhite">
      <div className="container-page max-w-3xl py-24 md:py-32">
        <h1 className="text-4xl md:text-5xl text-offwhite">Privacy Policy</h1>
        <p className="mt-3 text-sm text-offwhite/50">Last updated: 20 August 2026</p>

        <p className="mt-10 text-sm font-semibold uppercase leading-7 tracking-wide text-offwhite">
          Please read this privacy policy carefully. It explains what personal data
          Squad International collects, how we use and store it, who we share it with, and the
          rights you have over it.
        </p>

        <div className="mt-6 h-px w-16 bg-marigold" />

        <div className="mt-12 space-y-10">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="text-2xl text-offwhite">{s.title}</h2>
              <p className="mt-3 text-base leading-8 text-offwhite/70">{s.body}</p>
            </section>
          ))}
          <section>
            <h2 className="text-2xl text-offwhite">Contact</h2>
            <p className="mt-3 text-base leading-8 text-offwhite/70">
              Questions or requests about this policy can be sent to{" "}
              <a href={`mailto:${site.email}`} className="text-marigold underline underline-offset-4">
                {site.email}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}

