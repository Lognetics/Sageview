import { NextResponse } from "next/server";

import { parseEnquiry, validateEnquiry } from "@/lib/enquiry";
import { deliverEnquiry } from "@/lib/enquiry-delivery";

/** Never prerendered, never cached — this route only ever handles POSTs. */
export const dynamic = "force-dynamic";

/**
 * Project enquiry endpoint.
 *
 * Responsibilities, in order: reject junk, re-validate everything the client
 * validated, hand off to the configured delivery channel, and report exactly
 * what happened. A successful HTTP response is only returned when the enquiry
 * actually reached its destination.
 */
export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, reason: "invalid", message: "We couldn't read that request." },
      { status: 400 },
    );
  }

  const enquiry = parseEnquiry(body);

  // Honeypot: respond exactly as we would to a valid submission so that a bot
  // learns nothing, but do not forward anything.
  if (enquiry.website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const errors = validateEnquiry(enquiry);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      {
        ok: false,
        reason: "validation",
        message: "Some details need a second look.",
        errors,
      },
      { status: 422 },
    );
  }

  const result = await deliverEnquiry(enquiry);

  if (result.status === "delivered") {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  if (result.status === "notConfigured") {
    // 503, not 200. The message is written for the visitor, not the developer.
    return NextResponse.json(
      {
        ok: false,
        reason: "notConfigured",
        message:
          "Our enquiry form isn't connected to a mailbox yet, so this hasn't been sent. Please email us directly and we'll pick it up straight away.",
      },
      { status: 503 },
    );
  }

  // Log the underlying cause for the operator; never surface it to the visitor.
  console.error("[contact] delivery failed:", result.reason);

  return NextResponse.json(
    {
      ok: false,
      reason: "delivery",
      message:
        "Something went wrong on our side and your enquiry didn't reach us. Please try again, or email us directly.",
    },
    { status: 502 },
  );
}
