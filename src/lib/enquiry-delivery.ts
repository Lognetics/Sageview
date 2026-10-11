import { contact } from "@/content/site";

import type { EnquiryValues } from "./enquiry";

/**
 * THE INTEGRATION POINT.
 *
 * Where a submitted enquiry actually goes. Nothing else in the form, the
 * validation or the API route cares how that happens.
 *
 * Two routes, tried in order:
 *
 *   RESEND_API_KEY        Sends the enquiry as an email to the address in
 *                         ENQUIRY_TO, defaulting to the published contact
 *                         address. The brief is attached to the message, the
 *                         reply-to is set to the sender, so replying from the
 *                         inbox goes straight back to them.
 *
 *   CONTACT_WEBHOOK_URL   POSTs the enquiry as JSON. Zapier, Make, n8n, a
 *                         Slack workflow, a Google Apps Script endpoint.
 *
 * With neither set this returns `notConfigured` and the form tells the
 * visitor plainly to email SageView directly. It never reports a success that
 * did not happen, which is the one behaviour worth protecting here: a contact
 * form that silently swallows enquiries is worse than no form at all.
 */

export type DeliveryResult =
  | { status: "delivered" }
  | { status: "notConfigured" }
  | { status: "failed"; reason: string };

/** Where enquiries land. */
const recipient = () => process.env.ENQUIRY_TO?.trim() || contact.email;

/**
 * The envelope sender.
 *
 * Must be on a domain verified with Resend, which is why it is not simply the
 * visitor's own address: sending as them would fail SPF and land the whole
 * thing in spam. Their address goes in reply-to instead.
 */
const sender = () =>
  process.env.ENQUIRY_FROM?.trim() ||
  `SageView Website <enquiries@sageviewproduction.com>`;

export async function deliverEnquiry(
  enquiry: EnquiryValues,
): Promise<DeliveryResult> {
  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (resendKey) return sendEmail(enquiry, resendKey);

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();
  if (webhookUrl) return postWebhook(enquiry, webhookUrl);

  return { status: "notConfigured" };
}

/* ------------------------------------------------------------------ email */

async function sendEmail(
  enquiry: EnquiryValues,
  apiKey: string,
): Promise<DeliveryResult> {
  const subject = `New enquiry: ${enquiry.fullName}${
    enquiry.projectType ? ` (${enquiry.projectType})` : ""
  }`;

  const payload: Record<string, unknown> = {
    from: sender(),
    to: [recipient()],
    // So hitting reply in the inbox answers the person who wrote in.
    reply_to: enquiry.email,
    subject,
    text: asText(enquiry),
    html: asHtml(enquiry),
  };

  if (enquiry.brief) {
    payload.attachments = [
      { filename: enquiry.brief.name, content: enquiry.brief.data },
    ];
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      // Resend explains refusals in the body, and the reason is usually
      // actionable: an unverified domain, a bad key. Worth surfacing to the
      // server log rather than reporting a bare status code.
      const detail = await response.text().catch(() => "");
      return {
        status: "failed",
        reason: `Email provider responded with ${response.status}${
          detail ? `: ${detail.slice(0, 300)}` : ""
        }`,
      };
    }

    return { status: "delivered" };
  } catch (error) {
    return {
      status: "failed",
      reason: error instanceof Error ? error.message : "Unknown delivery error",
    };
  }
}

/** Fields in a fixed order, so every enquiry reads the same way in the inbox. */
function fields(enquiry: EnquiryValues): [string, string][] {
  return [
    ["Name", enquiry.fullName],
    ["Organisation", enquiry.organization],
    ["Email", enquiry.email],
    ["Phone", enquiry.phone],
    ["Project type", enquiry.projectType],
    ["Timeline", enquiry.timeline],
    ["Budget", enquiry.budget],
    ["Description", enquiry.projectDescription],
    ["Anything else", enquiry.message],
    [
      "Brief",
      enquiry.brief
        ? `${enquiry.brief.name} (attached, ${Math.max(1, Math.round(enquiry.brief.size / 1024))}KB)`
        : "",
    ],
  ].filter(([, value]) => value && value.trim().length > 0) as [
    string,
    string,
  ][];
}

function asText(enquiry: EnquiryValues): string {
  const body = fields(enquiry)
    .map(([label, value]) => `${label}\n${value}`)
    .join("\n\n");
  return `New project enquiry from the SageView website\n\n${body}\n`;
}

/** Minimal inline-styled HTML: mail clients strip stylesheets. */
function asHtml(enquiry: EnquiryValues): string {
  const rows = fields(enquiry)
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:10px 16px 10px 0;vertical-align:top;white-space:nowrap;
                   font:600 11px/1.4 -apple-system,Segoe UI,Roboto,sans-serif;
                   letter-spacing:.08em;text-transform:uppercase;color:#8a8a84;">
          ${escapeHtml(label)}
        </td>
        <td style="padding:10px 0;vertical-align:top;
                   font:400 15px/1.6 -apple-system,Segoe UI,Roboto,sans-serif;color:#101010;">
          ${escapeHtml(value).replace(/\n/g, "<br>")}
        </td>
      </tr>`,
    )
    .join("");

  return `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f1efea;">
  <table role="presentation" cellpadding="0" cellspacing="0"
         style="max-width:640px;margin:0 auto;background:#fff;padding:28px 32px;">
    <tr><td style="padding-bottom:8px;
                   font:600 11px/1.4 -apple-system,Segoe UI,Roboto,sans-serif;
                   letter-spacing:.12em;text-transform:uppercase;color:#a8801f;">
      New project enquiry
    </td></tr>
    <tr><td style="padding-bottom:20px;border-bottom:1px solid #e6e3dc;
                   font:600 22px/1.3 -apple-system,Segoe UI,Roboto,sans-serif;color:#101010;">
      ${escapeHtml(enquiry.fullName)}${
        enquiry.organization ? ` &middot; ${escapeHtml(enquiry.organization)}` : ""
      }
    </td></tr>
    <tr><td style="padding-top:8px;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">${rows}</table>
    </td></tr>
    <tr><td style="padding-top:22px;border-top:1px solid #e6e3dc;
                   font:400 12px/1.5 -apple-system,Segoe UI,Roboto,sans-serif;color:#8a8a84;">
      Sent from the enquiry form at sageviewproduction.com. Reply to this
      message to answer ${escapeHtml(enquiry.fullName)} directly.
    </td></tr>
  </table>
</body></html>`;
}

/** Enquiry text is untrusted input and is being put into markup. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* ---------------------------------------------------------------- webhook */

async function postWebhook(
  enquiry: EnquiryValues,
  webhookUrl: string,
): Promise<DeliveryResult> {
  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "sageview-website",
        receivedAt: new Date().toISOString(),
        enquiry: {
          fullName: enquiry.fullName,
          organization: enquiry.organization,
          email: enquiry.email,
          phone: enquiry.phone,
          projectType: enquiry.projectType,
          projectDescription: enquiry.projectDescription,
          timeline: enquiry.timeline,
          budget: enquiry.budget,
          message: enquiry.message,
          brief: enquiry.brief
            ? {
                name: enquiry.brief.name,
                type: enquiry.brief.type,
                size: enquiry.brief.size,
                data: enquiry.brief.data,
              }
            : null,
        },
      }),
      // Do not let a hanging webhook hold the request open indefinitely.
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      return {
        status: "failed",
        reason: `Webhook responded with ${response.status}`,
      };
    }

    return { status: "delivered" };
  } catch (error) {
    return {
      status: "failed",
      reason: error instanceof Error ? error.message : "Unknown delivery error",
    };
  }
}
