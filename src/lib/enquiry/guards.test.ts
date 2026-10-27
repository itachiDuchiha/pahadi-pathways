import { afterEach, describe, expect, it, vi } from "vitest";

import { checkOrigin, clientIp, MAX_BODY_BYTES, readJson } from "./guards";

const siteUrl = "https://thehimalayancompass.in";

function post(headers: Record<string, string>, body = "{}") {
  return new Request("https://thehimalayancompass.in/api/trip-enquiry", {
    method: "POST",
    headers,
    body,
  });
}

describe("checkOrigin", () => {
  it("accepts a matching Origin", () => {
    expect(checkOrigin(post({ origin: siteUrl }), siteUrl)).toBe(true);
  });

  it("rejects a foreign Origin", () => {
    expect(checkOrigin(post({ origin: "https://evil.example" }), siteUrl)).toBe(false);
  });

  it("falls back to the Referer host", () => {
    expect(
      checkOrigin(post({ referer: "https://evil.example/page" }), siteUrl)
    ).toBe(false);
    expect(checkOrigin(post({ referer: `${siteUrl}/contact` }), siteUrl)).toBe(true);
  });

  it("accepts a request with neither header", () => {
    expect(checkOrigin(post({}), siteUrl)).toBe(true);
  });
});

describe("clientIp", () => {
  it("uses the first x-forwarded-for entry", () => {
    expect(clientIp(post({ "x-forwarded-for": "198.51.100.7, 10.0.0.1" }))).toBe(
      "198.51.100.7"
    );
  });

  it("falls back to x-real-ip, then cf-connecting-ip, then unknown", () => {
    expect(clientIp(post({ "x-real-ip": "198.51.100.8" }))).toBe("198.51.100.8");
    expect(clientIp(post({ "cf-connecting-ip": "198.51.100.9" }))).toBe("198.51.100.9");
    expect(
      clientIp(post({ "x-real-ip": "198.51.100.8", "cf-connecting-ip": "198.51.100.9" }))
    ).toBe("198.51.100.8");
    expect(clientIp(post({}))).toBe("unknown");
  });
});

describe("rateLimitKey", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it("keys the limiter by route and client IP", async () => {
    const { rateLimitKey } = await import("./guards");
    expect(rateLimitKey("trip-enquiry", post({ "x-forwarded-for": "198.51.100.7" }))).toBe(
      "trip-enquiry:198.51.100.7"
    );
  });

  it("uses the first non-empty x-forwarded-for entry", async () => {
    const { rateLimitKey } = await import("./guards");
    expect(rateLimitKey("trip-enquiry", post({ "x-forwarded-for": ", 9.9.9.9" }))).toBe(
      "trip-enquiry:9.9.9.9"
    );
  });

  it("uses a shared invalid bucket when a header is present but empty", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { rateLimitKey } = await import("./guards");
    expect(rateLimitKey("trip-enquiry", post({ "x-forwarded-for": "" }))).toBe(
      "trip-enquiry:invalid"
    );
    expect(rateLimitKey("trip-enquiry", post({ "x-forwarded-for": " , " }))).toBe(
      "trip-enquiry:invalid"
    );
    expect(rateLimitKey("trip-enquiry", post({ "x-real-ip": " " }))).toBe(
      "trip-enquiry:invalid"
    );
    expect(warn).not.toHaveBeenCalled();
  });

  it("skips the limiter when the client IP is unknown and warns once per process", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { rateLimitKey } = await import("./guards");

    expect(rateLimitKey("trip-enquiry", post({}))).toBeNull();
    expect(rateLimitKey("package-enquiry", post({}))).toBeNull();
    expect(rateLimitKey("trip-enquiry", post({}))).toBeNull();

    expect(warn).toHaveBeenCalledTimes(1);
    expect(String(warn.mock.calls[0][0])).toMatch(/client IP is unknown.*rate limiting is disabled/i);
  });
});

describe("readJson", () => {
  it("returns 413 when content-length exceeds the limit", async () => {
    const result = await readJson(
      post({ "content-length": String(MAX_BODY_BYTES + 1) })
    );
    expect(result).toEqual({ ok: false, status: 413 });
  });

  it("returns 413 when the actual body exceeds the limit", async () => {
    const body = JSON.stringify({ pad: "x".repeat(MAX_BODY_BYTES) });
    const result = await readJson(
      new Request(siteUrl, { method: "POST", body })
    );
    expect(result).toEqual({ ok: false, status: 413 });
  });

  it("returns 400 on malformed JSON", async () => {
    expect(await readJson(post({}, "{bad json"))).toEqual({ ok: false, status: 400 });
  });

  it("returns the parsed body", async () => {
    expect(await readJson(post({}, '{"a":1}'))).toEqual({ ok: true, body: { a: 1 } });
  });
});
