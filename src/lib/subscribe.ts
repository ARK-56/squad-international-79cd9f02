import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { buildBody, sendEmail, GENERIC_FAILURE, type SendResult } from "./email";
import { site } from "./site-data";

/**
 * Newsletter signups from the footer.
 *
 * With RESEND_AUDIENCE_ID set, addresses go into that Resend audience, which is
 * a real subscriber list you can send to. Without it, the signup is emailed to
 * the inbox instead so nothing is silently dropped while the audience is being
 * set up. Create one at https://resend.com/audiences.
 *
 * Server-only, like the rest: RESEND_API_KEY and ENQUIRY_FROM live in ./email.
 */

const subscribeSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(200),
  /** Honeypot — lenient on purpose so the handler can drop bots silently. */
  company_website: z.string().max(200),
});

export type SubscribeInput = z.infer<typeof subscribeSchema>;

export const subscribe = createServerFn({ method: "POST" })
  .validator((data: unknown) => subscribeSchema.parse(data))
  .handler(async ({ data }): Promise<SendResult> => {
    if (data.company_website) return { ok: true };

    const apiKey = process.env["RESEND_API_KEY"];
    const audienceId = process.env["RESEND_AUDIENCE_ID"];

    if (apiKey && audienceId) {
      try {
        const response = await fetch(
          `https://api.resend.com/audiences/${encodeURIComponent(audienceId)}/contacts`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: data.email, unsubscribed: false }),
          },
        );

        if (response.ok) return { ok: true };

        console.error(
          `Resend rejected the subscriber: ${response.status} ${await response.text().catch(() => "")}`,
        );
        return { ok: false, message: GENERIC_FAILURE };
      } catch (error) {
        console.error("Resend audience request threw", error);
        return { ok: false, message: GENERIC_FAILURE };
      }
    }

    // No audience configured yet — email it through so the address is not lost.
    const { text, html } = buildBody("New newsletter subscriber", [["Email", data.email]], {
      label: "Note",
      text: "Set RESEND_AUDIENCE_ID to add subscribers straight to a Resend audience instead of emailing them here.",
    });

    return sendEmail({
      to: process.env["ENQUIRY_TO"] ?? site.email,
      replyTo: data.email,
      subject: `New subscriber — ${data.email}`,
      text,
      html,
      context: "subscription",
    });
  });
