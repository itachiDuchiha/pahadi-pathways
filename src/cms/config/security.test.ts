import { tmpdir } from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { site } from "@/config/site";

import { securityConfig } from "./security";

describe("securityConfig", () => {
  it("throws when PAYLOAD_SECRET is missing", () => {
    expect(() => securityConfig({})).toThrow(/PAYLOAD_SECRET/);
  });

  it("throws when PAYLOAD_SECRET is 31 characters", () => {
    expect(() => securityConfig({ PAYLOAD_SECRET: "a".repeat(31) })).toThrow(
      /PAYLOAD_SECRET/
    );
  });

  it("accepts a 32-character secret and returns the hardened settings", () => {
    const secret = "a".repeat(32);
    const config = securityConfig({ PAYLOAD_SECRET: secret });

    expect(config.secret).toBe(secret);
    expect(config.graphQL.disable).toBe(true);
    expect(config.cors).toEqual([site.url]);
    expect(config.csrf).toEqual([site.url]);
    expect(config.serverURL).toBe(site.url);
    expect(config.upload.limits.fileSize).toBe(100 * 1024 * 1024);
    expect(config.upload.requestSizeLimit).toBeGreaterThan(config.upload.limits.fileSize);
    expect(config.upload.responseOnLimit).toBe("Files must be 100 MB or smaller");
    // Uploads stream to disk, so a large body is never held in memory.
    expect(config.upload.useTempFiles).toBe(true);
    expect(config.upload.tempFileDir).toBe(path.join(tmpdir(), "thc-uploads"));
    expect(config.cookiePrefix).toBe("thc");
  });

  it("takes the upload temp directory from UPLOAD_TEMP_DIR", () => {
    const config = securityConfig({ PAYLOAD_SECRET: "a".repeat(32), UPLOAD_TEMP_DIR: "/srv/thc/tmp" });
    expect(config.upload.tempFileDir).toBe("/srv/thc/tmp");
  });
});
