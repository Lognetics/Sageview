import type { EnquiryValues } from "./enquiry";

/**
 * THE INTEGRATION POINT.
 *
 * This is the only file that needs to change to connect the enquiry form to a
 * real destination. Everything else: the form, the validation, the API route,
 * the UI states, is already finished and does not care how delivery happens.
 *
 * Currently supported without writing any code:
 *
 *   CONTACT_WEBHOOK_URL   POSTs the enquiry as JSON. Works out of the box with
 *                         Zapier, Make, n8n, a Slack workflow, a Google Apps
 *                         Script endpoint, or any custom handler.
 *
 * To send email instead, replace the body of `deliverEnquiry` with a call to
 * your provider (Resend, Postmark, SendGrid, AWS SES…) and return
 * `{ ok: true }`.
 *
 * Until something is configured this returns `notConfigured`, and the form
 * tells the visitor plainly to email SageView directly. It never reports a
 * success that did not happen.
 */

export type DeliveryResult =
  | { status: "delivered" }
  | { status: "notConfigured" }
  | { status: "failed"; reason: string };

export async function deliverEnquiry(
  enquiry: EnquiryValues,
): Promise<DeliveryResult> {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

  if (!webhookUrl) {
    return { status: "notConfigured" };
  }

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
