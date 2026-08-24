import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { site } from "./site-data";

/**
 * Delivers contact-form enquiries through Resend.
 *
 * Setup (all server-only — never prefix these with VITE_, that ships the key to
 * the browser):
 *   RESEND_API_KEY  API key from https://resend.com/api-keys
 *   ENQUIRY_FROM    Sender, e.g. "Squad International <website@squadinternational.net>".
 *                   The domain must be verified in Resend; unverified senders are
 *                   rejected. Resend's onboarding@resend.dev works for testing but
 *                   only delivers to the account owner's own address.
 *   ENQUIRY_TO      Recipient. Defaults to the address in site-data.
 *
 * Called through a server function, so the key stays on the server and the CSRF
 * middleware in src/start.ts already covers the endpoint.
 */

const enquirySchema = z.object({
  name: z.string().trim().min(1, "Enter your name").max(120),
  company: z.string().trim().min(1, "Enter your company").max(160),
  email: z.string().trim().email("Enter a valid work email").max(200),
  phone: z.string().trim().max(60),
  service: z.string().trim().min(1).max(160),
  message: z.string().trim().min(10, "Tell us a little more about what you need").max(5000),
  /**
   * Honeypot — hidden in the UI, so anything here is a bot. Deliberately lenient:
   * rejecting it in the schema would throw a validation error back at the caller,
   * whereas the handler drops it silently so bots get no signal to retry.
   */
  company_website: z.string().max(200),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
export type EnquiryResult = { ok: true } | { ok: false; message: string };

const GENERIC_FAILURE =
  "We couldn't send that just now. Please email or message us on WhatsApp and we'll pick it up.";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildBody(input: EnquiryInput) {
  const rows: [string, string][] = [
    ["Name", input.name],
    ["Company", input.company],
    ["Email", input.email],
    ["Phone", input.phone || "—"],
    ["Service", input.service],
  ];

  const text = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    input.message,
  ].join("\n");

  const html = [
    `<h2 style="margin:0 0 16px">New enquiry from ${escapeHtml(site.name)}</h2>`,
    '<table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">',
    ...rows.map(
      ([label, value]) =>
        `<tr><td style="color:#6b7280">${label}</td><td><strong>${escapeHtml(value)}</strong></td></tr>`,
    ),
    "</table>",
    '<p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">',
    escapeHtml(input.message),
    "</p>",
  ].join("");

  return { text, html };
}

export const sendEnquiry = createServerFn({ method: "POST" })
  .validator((data: unknown) => enquirySchema.parse(data))
  .handler(async ({ data }): Promise<EnquiryResult> => {
    // A bot filled the hidden field. Report success so it does not retry, but
    // send nothing.
    if (data.company_website) return { ok: true };

    const apiKey = process.env["RESEND_API_KEY"];
    const from = process.env["ENQUIRY_FROM"];
    const to = process.env["ENQUIRY_TO"] ?? site.email;

    if (!apiKey || !from) {
      console.error(
        "Enquiry not sent: RESEND_API_KEY and ENQUIRY_FROM must both be set. Enquiry was from " +
          data.email,
      );
      return { ok: false, message: GENERIC_FAILURE };
    }

    const { text, html } = buildBody(data);

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          // Replying in the mail client goes straight back to the enquirer.
          reply_to: data.email,
          subject: `New enquiry — ${data.company} (${data.service})`,
          text,
          html,
        }),
      });

      if (!response.ok) {
        console.error(
          `Resend rejected the enquiry: ${response.status} ${await response.text().catch(() => "")}`,
        );
        return { ok: false, message: GENERIC_FAILURE };
      }

      return { ok: true };
    } catch (error) {
      console.error("Resend request threw", error);
      return { ok: false, message: GENERIC_FAILURE };
    }
  });
