/**
 * Shared Resend transport for the site's transactional email.
 *
 * Server-only — never prefix these with VITE_, that ships the key to the browser:
 *   RESEND_API_KEY  API key from https://resend.com/api-keys
 *   ENQUIRY_FROM    Sender, e.g. "Squad International <website@squadinternational.net>".
 *                   The domain must be verified in Resend or sends are rejected.
 */

export type SendResult = { ok: true } | { ok: false; message: string };

export const GENERIC_FAILURE =
  "We couldn't send that just now. Please email or message us on WhatsApp and we'll pick it up.";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Renders a label/value table plus a free-text block, as both text and HTML. */
export function buildBody(
  heading: string,
  rows: [string, string][],
  body: { label: string; text: string },
) {
  const text = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    `${body.label}:`,
    body.text,
  ].join("\n");

  const html = [
    `<h2 style="margin:0 0 16px">${escapeHtml(heading)}</h2>`,
    '<table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">',
    ...rows.map(
      ([label, value]) =>
        `<tr><td style="color:#6b7280">${escapeHtml(label)}</td><td><strong>${escapeHtml(value)}</strong></td></tr>`,
    ),
    "</table>",
    `<p style="font-family:sans-serif;font-size:14px;color:#6b7280;margin-top:20px">${escapeHtml(body.label)}</p>`,
    '<p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">',
    escapeHtml(body.text),
    "</p>",
  ].join("");

  return { text, html };
}

export async function sendEmail(options: {
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
  /** Included in the log line when the send cannot be attempted. */
  context: string;
}): Promise<SendResult> {
  const apiKey = process.env["RESEND_API_KEY"];
  const from = process.env["ENQUIRY_FROM"];

  if (!apiKey || !from) {
    console.error(
      `${options.context} not sent: RESEND_API_KEY and ENQUIRY_FROM must both be set. From ${options.replyTo}`,
    );
    return { ok: false, message: GENERIC_FAILURE };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [options.to],
        reply_to: options.replyTo,
        subject: options.subject,
        text: options.text,
        html: options.html,
      }),
    });

    if (!response.ok) {
      console.error(
        `Resend rejected ${options.context}: ${response.status} ${await response.text().catch(() => "")}`,
      );
      return { ok: false, message: GENERIC_FAILURE };
    }

    return { ok: true };
  } catch (error) {
    console.error(`Resend request threw for ${options.context}`, error);
    return { ok: false, message: GENERIC_FAILURE };
  }
}
