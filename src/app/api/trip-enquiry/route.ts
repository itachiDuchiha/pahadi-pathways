
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const DESTINATIONS: Record<string, string> = {
  shimla: "Shimla",
  manali: "Manali",
  spiti: "Spiti Valley",
  kinnaur: "Kinnaur",
  lahaul: "Lahaul",
  jibhi: "Jibhi",
  dharamshala: "Dharamshala",
  multiple: "Multiple destinations",
  unsure: "Not sure yet",
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    const recipient = process.env.TRIP_ENQUIRY_EMAIL;

    if (!apiKey || !fromEmail || !recipient) {
      console.error("Trip enquiry email configuration is incomplete.");

      return NextResponse.json(
        {
          error:
            "Our enquiry service is being configured. Please try again shortly.",
        },
        { status: 503 }
      );
    }

    const body: unknown = await request.json();

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { error: "Invalid enquiry details." },
        { status: 400 }
      );
    }

    const data = body as Record<string, unknown>;

    const name =
      typeof data.name === "string" ? data.name.trim() : "";
    const phone =
      typeof data.phone === "string" ? data.phone.trim() : "";
    const email =
      typeof data.email === "string" ? data.email.trim() : "";
    const travelDate =
      typeof data.travelDate === "string" ? data.travelDate : "";
    const destination =
      typeof data.destination === "string" ? data.destination : "";
    const adults = data.adults;
    const children = data.children;
    const budget = data.budgetPerPerson;
    const message =
      typeof data.message === "string" ? data.message.trim() : "";

    if (!name || name.length > 100) {
      return NextResponse.json(
        { error: "Please enter a valid name." },
        { status: 400 }
      );
    }

    if (!phone || phone.length > 30 || !/[0-9]{7,}/.test(phone)) {
      return NextResponse.json(
        { error: "Please enter a valid phone number." },
        { status: 400 }
      );
    }

    if (
      email.length > 254 ||
      (email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    ) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (
      typeof adults !== "number" ||
      !Number.isInteger(adults) ||
      adults < 1 ||
      adults > 15
    ) {
      return NextResponse.json(
        { error: "Please check the number of adults." },
        { status: 400 }
      );
    }

    if (
      typeof children !== "number" ||
      !Number.isInteger(children) ||
      children < 0 ||
      children > 10
    ) {
      return NextResponse.json(
        { error: "Please check the number of children." },
        { status: 400 }
      );
    }

    if (
      typeof budget !== "number" ||
      !Number.isFinite(budget) ||
      budget < 15000 ||
      budget > 100000
    ) {
      return NextResponse.json(
        { error: "Please check your selected budget." },
        { status: 400 }
      );
    }

    if (
      destination !== "" &&
      !Object.prototype.hasOwnProperty.call(DESTINATIONS, destination)
    ) {
      return NextResponse.json(
        { error: "Please select a valid destination." },
        { status: 400 }
      );
    }

    if (message.length > 2000) {
      return NextResponse.json(
        { error: "Please shorten your additional requirements." },
        { status: 400 }
      );
    }

    if (travelDate !== "") {
      const validDate = /^\d{4}-\d{2}-\d{2}$/.test(travelDate);
      const parsedDate = new Date(`${travelDate}T00:00:00.000Z`);

      if (
        !validDate ||
        Number.isNaN(parsedDate.getTime()) ||
        parsedDate.toISOString().slice(0, 10) !== travelDate
      ) {
        return NextResponse.json(
          { error: "Please enter a valid travel date." },
          { status: 400 }
        );
      }
    }

    const destinationName = destination
      ? DESTINATIONS[destination]
      : "Not specified";

    const formattedBudget = `₹${budget.toLocaleString("en-IN")}`;

    const emailRows: Array<[string, string]> = [
      ["Name", name],
      ["Phone", phone],
      ["Email", email || "Not provided"],
      ["Destination", destinationName],
      ["Travel date", travelDate || "Flexible / not specified"],
      ["Adults", String(adults)],
      ["Children", String(children)],
      ["Budget per person", formattedBudget],
      ["Additional requirements", message || "None specified"],
    ];

    const htmlRows = emailRows
      .map(
        ([label, value]) => `
          <tr>
            <td style="padding:10px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#10264A;vertical-align:top;">
              ${escapeHtml(label)}
            </td>
            <td style="padding:10px;border-bottom:1px solid #e5e7eb;color:#374151;white-space:pre-wrap;overflow-wrap:anywhere;">
              ${escapeHtml(value)}
            </td>
          </tr>
        `
      )
      .join("");

    const textBody = [
      "New trip enquiry — The Himalayan Compass",
      "",
      ...emailRows.map(([label, value]) => `${label}: ${value}`),
      "",
      "Reply to this enquiry to follow up with the traveller.",
    ].join("\n");

    const resend = new Resend(apiKey);

    const { data: emailResult, error } = await resend.emails.send({
      from: fromEmail,
      to: [recipient],
      ...(email ? { replyTo: email } : {}),
      subject: `New Trip Enquiry — ${name}`,
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;color:#374151;max-width:680px;margin:0 auto;">
          <div style="background:#10264A;padding:24px;border-radius:10px 10px 0 0;">
            <p style="margin:0 0 8px;color:#D4AF37;font-size:12px;letter-spacing:2px;font-weight:bold;">
              THE HIMALAYAN COMPASS
            </p>
            <h1 style="margin:0;color:#ffffff;font-size:23px;">
              New Trip Enquiry
            </h1>
          </div>

          <div style="padding:22px;background:#ffffff;border:1px solid #e5e7eb;border-top:0;">
            <p style="margin-top:0;line-height:1.6;">
              A traveller has submitted a new trip planning request through your website.
            </p>

            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tbody>
                ${htmlRows}
              </tbody>
            </table>

            <p style="margin:22px 0 0;font-size:12px;color:#6b7280;">
              This enquiry was submitted through The Himalayan Compass website.
            </p>
          </div>
        </div>
      `,
      text: textBody,
    });

    if (error) {
      console.error("Resend email error:", error);

      return NextResponse.json(
        {
          error:
            "We couldn't send your enquiry right now. Please try again shortly.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your trip enquiry was sent successfully.",
        id: emailResult?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Trip enquiry API error:", error);

    return NextResponse.json(
      {
        error:
          "Something went wrong while submitting your enquiry. Please try again.",
      },
      { status: 500 }
    );
  }
}
