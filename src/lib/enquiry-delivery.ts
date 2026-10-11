import { contact, site } from "@/content/site";

import type { EnquiryValues } from "./enquiry";

/**
 * THE INTEGRATION POINT.
 *
 * Where a submitted enquiry actually goes. Nothing else in the form, the
 * validation or the API route cares how that happens.
 *
 * Three routes, tried in order. The last needs no configuration at all, so
 * the form works on a fresh deploy:
 *
 *   RESEND_API_KEY        Best quality. Mail is sent from the company's own
 *                         verified domain, so it is not relayed by anyone and
 *                         will not be filtered. Needs an account and DNS.
 *
 *   CONTACT_WEBHOOK_URL   POSTs the enquiry as JSON. Zapier, Make, n8n, a
 *                         Slack workflow, a Google Apps Script endpoint.
 *
 *   FormSubmit           The default, and the reason this works out of the
 *                         box: a free relay that needs no account, no key and
 *                         no DNS. The first enquiry triggers a confirmation
 *                         email to the recipient, and one click activates the
 *                         address for good.
 *
 * The trade-off of the default is worth stating plainly: enquiries, including
 * any attached brief, pass through a third party's servers. That is normal for
 * a contact form and fine for new-business enquiries, but it is a reason to
 * move to Resend once there is a moment to set it up.
 *
 * Whatever the route, this never reports a success that did not happen. A
 * contact form that silently swallows enquiries is worse than no form at all.
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

  // Set ENQUIRY_RELAY=off to disable the fallback and have the form tell
  // visitors to email directly instead.
  if (process.env.ENQUIRY_RELAY?.trim() === "off") {
    return { status: "notConfigured" };
  }

  return postRelay(enquiry);
}

/* ------------------------------------------------------------------ relay */

/**
 * FormSubmit: email delivery with nothing to set up.
 *
 * Sent as multipart rather than JSON so the brief can travel as a real file
 * attachment; the JSON endpoint accepts fields only. Field order here is the
 * order they appear in the email, so the message reads top to bottom the way
 * the form does.
 *
 * `_replyto` makes replying from the inbox answer the enquirer. `_captcha` is
 * off because the honeypot in the API route has already rejected bots, and a
 * challenge no human ever sees cannot be solved by anyone.
 *
 * The origin headers are required, not decorative: the relay refuses requests
 * that carry none, on the assumption they come from a page opened off disk.
 * A server-side fetch sends no origin of its own, so it has to be stated.
 */
async function postRelay(enquiry: EnquiryValues): Promise<DeliveryResult> {
  const to = recipient();
  const form = new FormData();

  form.append("_subject", subjectFor(enquiry));
  form.append("_replyto", enquiry.email);
  form.append("_template", "table");
  form.append("_captcha", "false");

  for (const [label, value] of fields(enquiry)) {
    form.append(label, value);
  }

  if (enquiry.brief) {
    const bytes = Buffer.from(enquiry.brief.data, "base64");
    form.append(
      "attachment",
      new Blob([new Uint8Array(bytes)], {
        type: enquiry.brief.type || "application/octet-stream",
      }),
      enquiry.brief.name,
    );
  }

  try {
    const response = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(to)}`,
      {
        method: "POST",
        body: form,
        headers: { Origin: site.url, Referer: `${site.url}/start-a-project` },
        signal: AbortSignal.timeout(15_000),
      },
    );

    const body: unknown = await response.json().catch(() => null);
    const result = (body ?? {}) as { success?: string | boolean; message?: string };
    const ok =
      response.ok && (result.success === true || result.success === "true");

    if (!ok) {
      /*
        The relay holds the very first enquiry while it emails the recipient a
        one-click confirmation, and says so in the message. Passing that
        through is far more useful than a status code, because the fix is in
        an inbox rather than in the code.
      */
      const needsActivation = /activat/i.test(result.message ?? "");
      return {
        status: "failed",
        reason: needsActivation
          ? `Delivery is not active yet: ${to} has been sent an "Activate Form" link and it needs to be clicked once. (${result.message})`
          : (result.message ??
            `Relay responded with ${response.status}.`),
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

/* ------------------------------------------------------------------ email */

async function sendEmail(
  enquiry: EnquiryValues,
  apiKey: string,
): Promise<DeliveryResult> {
  const subject = subjectFor(enquiry);

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

function subjectFor(enquiry: EnquiryValues): string {
  return `New enquiry: ${enquiry.fullName}${
    enquiry.projectType ? ` (${enquiry.projectType})` : ""
  }`;
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
