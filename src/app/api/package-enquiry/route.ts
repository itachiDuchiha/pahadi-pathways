
import { NextResponse } from "next/server";

function cleanText(value: unknown, maxLength = 1000): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    const toEmail =
      process.env.TRIP_ENQUIRY_EMAIL ||
      "thehimalayancompass@gmail.com";

    if (!apiKey || !fromEmail) {
      console.error("Package enquiry email configuration is missing.");

      return NextResponse.json(
        { success: false, message: "Email service is not configured." },
        { status: 500 }
      );
    }

    const body: unknown = await request.json();

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { success: false, message: "Invalid request." },
        { status: 400 }
      );
    }

    const data = body as Record<string, unknown>;

    const name = cleanText(data.name, 100);
    const phone = cleanText(data.phone, 30);
    const email = cleanText(data.email, 254);
    const travelDate = cleanText(data.travelDate, 100);
    const packageName = cleanText(data.packageName, 200);
    const stay = cleanText(data.stay, 100);
    const meals = cleanText(data.meals, 100);
    const vehicle = cleanText(data.vehicle, 100);
    const adultsValue = Number(data.adults);
    const children = Array.isArray(data.children)
      ? data.children
          .slice(0, 20)
          .map((age) => cleanText(String(age), 10))
          .filter(Boolean)
      : [];

    const packageCost = cleanText(String(data.packageCost ?? ""), 50);
    const gst = cleanText(String(data.gst ?? ""), 50);
    const estimatedTotal = cleanText(
      String(data.estimatedTotal ?? ""),
      50
    );

    if (!name || !phone || !packageName) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide your name, phone number, and package.",
        },
        { status: 400 }
      );
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (
      !Number.isInteger(adultsValue) ||
      adultsValue < 1 ||
      adultsValue > 10
    ) {
      return NextResponse.json(
        { success: false, message: "Please select 1 to 10 adults." },
        { status: 400 }
      );
    }

    const fields: [string, string][] = [
      ["Customer Name", name],
      ["Phone Number", phone],
      ["Email", email || "Not provided"],
      ["Package", packageName],
      ["Travel Date", travelDate || "Not provided"],
      ["Adults", String(adultsValue)],
      [
        "Children",
        children.length
          ? `${children.length} (${children.map((age) => `Age ${age}`).join(", ")})`
          : "None",
      ],
      ["Stay Preference", stay || "Not specified"],
      ["Meal Preference", meals || "Not specified"],
      ["Vehicle Preference", vehicle || "Not specified"],
      ["Package Cost", packageCost || "Not provided"],
      ["GST", gst || "Not provided"],
      ["Estimated Total", estimatedTotal || "Not provided"],
    ];

    const rows = fields
      .map(
        ([label, value]) => `
          <tr>
            <td style="padding:12px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#10264A;vertical-align:top;">
              ${escapeHtml(label)}
            </td>
            <td style="padding:12px;border-bottom:1px solid #e5e7eb;color:#374151;white-space:pre-wrap;">
              ${escapeHtml(value)}
            </td>
          </tr>
        `
      )
      .join("");

    const html = `
      <div style="background:#f7f5f0;padding:30px;font-family:Arial,sans-serif;color:#1f2937;">
        <div style="max-width:650px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
          <div style="background:#10264A;padding:25px 30px;">
            <h1 style="margin:0;color:#D4AF37;font-size:24px;">The Himalayan Compass</h1>
            <p style="margin:8px 0 0;color:#ffffff;">New Package Booking Enquiry</p>
          </div>
          <div style="padding:25px 30px;">
            <p>A customer has submitted a package booking enquiry through your website.</p>
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              ${rows}
            </table>
          </div>
          <div style="padding:18px 30px;background:#f9fafb;color:#6b7280;font-size:12px;">
            The Himalayan Compass — Explore the Himalayas.
          </div>
        </div>
      </div>
    `;

    const text = fields
      .map(([label, value]) => `${label}: ${value}`)
      .join("\n");

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject: `Package enquiry: ${packageName} — ${name}`,
        reply_to: email || undefined,
        html,
        text,
      }),
    });

    if (!resendResponse.ok) {
      const errorDetails = await resendResponse.text();
      console.error("Package enquiry email failed:", errorDetails);

      return NextResponse.json(
        {
          success: false,
          message: "We could not send your enquiry. Please try again.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your package enquiry has been sent successfully.",
    });
  } catch (error) {
    console.error("Package enquiry error:", error);

    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
