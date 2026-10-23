import { describe, expect, it } from "vitest";

import { escapeHtml, renderEnquiryHtml } from "./html";

const WARNING =
  "Reply-To is the address the visitor typed. Verify before sharing documents or payment links.";

describe("escapeHtml", () => {
  it("escapes markup-significant characters", () => {
    expect(escapeHtml("<b>&\"'")).toBe("&lt;b&gt;&amp;&quot;&#39;");
  });
});

describe("renderEnquiryHtml", () => {
  it("includes the Reply-To warning when replyTo is set", () => {
    const html = renderEnquiryHtml({
      heading: "New Trip Enquiry",
      intro: "Intro",
      rows: [["Name", "Asha"]],
      replyTo: "asha@example.com",
    });
    expect(html).toContain(WARNING);
  });

  it("omits the warning when there is no replyTo", () => {
    const html = renderEnquiryHtml({
      heading: "New Trip Enquiry",
      intro: "Intro",
      rows: [["Name", "Asha"]],
    });
    expect(html).not.toContain(WARNING);
  });

  it("escapes visitor-supplied row values", () => {
    const html = renderEnquiryHtml({
      heading: "H",
      intro: "I",
      rows: [["Name", "<script>alert(1)</script>"]],
    });
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
  });

  it("adds the pricing note for package enquiries", () => {
    const html = renderEnquiryHtml({
      heading: "New Package Booking Enquiry",
      intro: "I",
      rows: [["Package", "X"]],
      kind: "package",
    });
    expect(html).toContain("Prices computed by the website at submission time.");
  });
});
