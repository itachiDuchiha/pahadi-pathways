import { describe, expect, it } from "vitest";

import type { Legal } from "@/lib/cms/types";

import {
  DEFAULT_RETENTION_STATEMENT,
  formatEffectiveDate,
  privacySections,
  termsSections,
  type Section,
} from "./legal-copy";

const legal: Legal = {
  dataContactEmail: "privacy@example.com",
  effectiveDate: "2026-10-27",
  deletionWindowMonths: 6,
  retentionStatement: DEFAULT_RETENTION_STATEMENT,
};

const noAnalytics = { analyticsEnabled: false, vendors: [] };

function text(sections: Section[]): string {
  return sections.flatMap((section) => [section.heading, ...section.paragraphs]).join("\n");
}

describe("privacySections", () => {
  const privacy = text(privacySections(legal, noAnalytics));

  it("states the owner's sentences verbatim", () => {
    expect(privacy).toContain(
      "We do not sell or share your data with third parties, except the service providers we use to deliver email and, when enabled, measure site usage."
    );
    expect(privacy).toContain("We keep enquiry records to maintain a history of your requests.");
    expect(privacy).toContain(
      "If you want your data deleted, email us at privacy@example.com and it will be deleted within 6 months."
    );
  });

  it("says data is collected only for responding to and following up enquiries", () => {
    expect(privacy).toMatch(/only[^.]*respond to your enquiry[^.]*follow up/);
  });

  it("lists the rights under the DPDP Act", () => {
    expect(privacy).toContain("Digital Personal Data Protection Act, 2023");
    for (const right of ["access", "correct", "erase", "grievance redressal"]) {
      expect(privacy).toContain(right);
    }
  });

  it("uses the configured deletion window and retention statement", () => {
    const custom = text(
      privacySections(
        { ...legal, deletionWindowMonths: 3, retentionStatement: "We keep records for two years." },
        noAnalytics
      )
    );

    expect(custom).toContain("it will be deleted within 3 months.");
    expect(custom).toContain("We keep records for two years.");
    expect(custom).not.toContain(DEFAULT_RETENTION_STATEMENT);
    expect(text(privacySections({ ...legal, deletionWindowMonths: 1 }, noAnalytics))).toContain(
      "deleted within 1 month."
    );
  });

  it("shows a placeholder until a grievance officer is set", () => {
    const section = privacySections(legal, noAnalytics).find((s) => s.heading === "Grievance Officer");

    expect(section?.paragraphs).toEqual(["Grievance officer details will be published here."]);
  });

  it("shows the grievance officer's name, email and phone when set", () => {
    const withOfficer = privacySections(
      { ...legal, grievanceOfficer: { name: "A. Officer", email: "grievance@example.com", phone: "+91 90000 00000" } },
      noAnalytics
    );
    const section = withOfficer.find((s) => s.heading === "Grievance Officer");
    const body = section?.paragraphs.join("\n") ?? "";

    expect(body).toContain("A. Officer");
    expect(body).toContain("grievance@example.com");
    expect(body).toContain("+91 90000 00000");
    expect(body).not.toContain("will be published here");
  });

  it("mentions analytics only when it is enabled, naming the vendors", () => {
    expect(privacy).not.toMatch(/Google Analytics|Clarity|analytics cookies/);

    const withAnalytics = text(
      privacySections(legal, { analyticsEnabled: true, vendors: ["Google Analytics", "Microsoft Clarity"] })
    );

    expect(withAnalytics).toContain("Google Analytics and Microsoft Clarity");
    expect(withAnalytics).toMatch(/only after you accept/);
  });
});

describe("termsSections", () => {
  const terms = text(termsSections(legal));

  it("covers enquiries, prices, package terms, travel conditions and the law", () => {
    expect(terms).toMatch(/not a confirmed booking/);
    expect(terms).toMatch(/indicative/);
    expect(terms).toMatch(/per adult/);
    expect(terms).toMatch(/confirmed[^.]*in writing before any payment/);
    expect(terms).toMatch(/cancellation terms/);
    expect(terms).toMatch(/weather/);
    expect(terms).toMatch(/laws of India/);
  });

  it("repeats the data clause and links to the privacy policy", () => {
    expect(terms).toContain(
      "We do not sell or share your data with third parties, except the service providers we use to deliver email and, when enabled, measure site usage."
    );
    expect(terms).toContain(
      "If you want your data deleted, email us at privacy@example.com and it will be deleted within 6 months."
    );
    expect(terms).toContain("](/privacy)");
  });

  it("gives the site email for questions", () => {
    expect(text(termsSections(legal, "hello@example.com"))).toContain("hello@example.com");
  });
});

describe("formatEffectiveDate", () => {
  it("formats a day in India time", () => {
    expect(formatEffectiveDate("2026-10-27")).toBe("27 October 2026");
    // Midnight in India, as the admin date picker stores it.
    expect(formatEffectiveDate("2026-10-26T18:30:00.000Z")).toBe("27 October 2026");
  });
});
