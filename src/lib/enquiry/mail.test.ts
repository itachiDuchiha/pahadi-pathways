import { describe, expect, it } from "vitest";

import { sanitizeSubject } from "./mail";

describe("sanitizeSubject", () => {
  it("strips bidirectional control characters", () => {
    expect(sanitizeSubject("Trip ‮enquiry⁦ from Asha⁩")).toBe(
      "Trip enquiry from Asha"
    );
  });

  it("clamps to 120 code points without splitting a surrogate pair", () => {
    const subject = `${"a".repeat(119)}\u{1F3D4}`;

    expect(Array.from(subject)).toHaveLength(120);
    expect(sanitizeSubject(`${subject}b`)).toBe(subject);
  });
});
