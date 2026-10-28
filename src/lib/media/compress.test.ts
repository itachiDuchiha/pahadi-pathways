import sharp from "sharp";
import { describe, expect, it } from "vitest";

import { compressImage, isCompressibleImage, QUALITY_BY_LEVEL } from "./compress";

function png(width: number, height: number): Promise<Buffer> {
  return sharp({ create: { width, height, channels: 3, background: { r: 40, g: 120, b: 200 } } })
    .png()
    .toBuffer();
}

describe("compressImage", () => {
  it("re-encodes a large PNG as WebP capped at the maximum width", async () => {
    const input = await png(3000, 2000);
    const result = await compressImage(input, { quality: 80, maxWidth: 2400 });
    const meta = await sharp(result.data).metadata();

    expect(meta.format).toBe("webp");
    expect(meta.width).toBe(2400);
    expect(result.width).toBe(2400);
    expect(result.height).toBe(1600);
    expect(result.data.length).toBeLessThan(input.length);
  });

  it("never enlarges a smaller image", async () => {
    const result = await compressImage(await png(1000, 600), { quality: 80, maxWidth: 2400 });
    const meta = await sharp(result.data).metadata();

    expect(meta.width).toBe(1000);
    expect(result).toMatchObject({ width: 1000, height: 600 });
  });

  it("turns an EXIF-rotated JPEG upright", async () => {
    const input = await sharp({ create: { width: 400, height: 200, channels: 3, background: "#888" } })
      .jpeg()
      .withMetadata({ orientation: 6 })
      .toBuffer();
    const result = await compressImage(input, { quality: 80, maxWidth: 2400 });
    const meta = await sharp(result.data).metadata();

    expect(meta.height).toBeGreaterThan(meta.width);
    expect(result.height).toBeGreaterThan(result.width);
  });

  it("rejects data that is not an image", async () => {
    await expect(compressImage(Buffer.from("not an image"), { quality: 80, maxWidth: 2400 })).rejects.toThrow();
  });
});

describe("isCompressibleImage", () => {
  it("accepts the raster formats the media library allows", () => {
    for (const type of ["image/jpeg", "image/png", "image/webp", "image/avif"]) {
      expect(isCompressibleImage(type)).toBe(true);
    }
  });

  it("leaves other types alone", () => {
    for (const type of ["image/svg+xml", "image/gif", "text/plain", "application/pdf", ""]) {
      expect(isCompressibleImage(type)).toBe(false);
    }
  });
});

describe("QUALITY_BY_LEVEL", () => {
  it("maps each level to a WebP quality", () => {
    expect(QUALITY_BY_LEVEL).toEqual({ small: 65, balanced: 80, sharp: 90 });
  });
});
