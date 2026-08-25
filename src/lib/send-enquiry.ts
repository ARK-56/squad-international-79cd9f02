import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { buildBody, sendEmail, type SendResult } from "./email";
import { site } from "./site-data";

/**
 * Delivers contact-form enquiries through Resend. See ./email.ts for the
 * required environment variables; ENQUIRY_TO overrides the recipient, which
 * otherwise falls back to the address in site-data.
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
export type EnquiryResult = SendResult;

export const sendEnquiry = createServerFn({ method: "POST" })
  .validator((data: unknown) => enquirySchema.parse(data))
  .handler(async ({ data }): Promise<SendResult> => {
    // A bot filled the hidden field. Report success so it does not retry, but
    // send nothing.
    if (data.company_website) return { ok: true };

    const to = process.env["ENQUIRY_TO"] ?? site.email;

    const { text, html } = buildBody(
      `New enquiry from ${site.name}`,
      [
        ["Name", data.name],
        ["Company", data.company],
        ["Email", data.email],
        ["Phone", data.phone || "—"],
        ["Service", data.service],
      ],
      { label: "What they need covered", text: data.message },
    );

    return sendEmail({
      to,
      // Replying in the mail client goes straight back to the enquirer.
      replyTo: data.email,
      subject: `New enquiry — ${data.company} (${data.service})`,
      text,
      html,
      context: "enquiry",
    });
  });
