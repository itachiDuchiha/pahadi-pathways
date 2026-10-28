import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { ValidationError } from "payload";
import sharp from "sharp";
import { describe, expect, it, vi } from "vitest";

import { withTempPayload } from "../test/withTempPayload";
import { compressUpload } from "./compressUpload";

type HookArgs = Parameters<typeof compressUpload>[0];
type UploadFile = { data: Buffer; mimetype: string; name: string; size: number; tempFilePath?: string };

const temp = withTempPayload();

function png(width: number, height: number): Promise<Buffer> {
  return sharp({ create: { width, height, channels: 3, background: { r: 200, g: 80, b: 40 } } })
    .png()
    .toBuffer();
}

function hookArgs(operation: string, file: UploadFile | undefined, media: Record<string, unknown> = {}) {
  const findGlobal = vi.fn().mockResolvedValue({ media });
  const req = { file, payload: { findGlobal } };
  const args = { operation, req, args: { req } } as unknown as HookArgs;
  return { args, req, findGlobal };
}

describe("compressUpload (hook)", () => {
  it("replaces an uploaded image with a resized WebP using the site settings", async () => {
    const data = await png(2000, 1000);
    const { args, req, findGlobal } = hookArgs(
      "create",
      { data, mimetype: "image/png", name: "river.photo.png", size: data.length },
      { imageQuality: "small", maxImageWidth: 1200 }
    );

    const result = await compressUpload(args);

    expect(result).toBe(args.args);
    expect(findGlobal).toHaveBeenCalledWith({ slug: "site-settings", depth: 0, overrideAccess: true });
    expect(req.file?.mimetype).toBe("image/webp");
    expect(req.file?.name).toBe("river.photo.webp");
    expect(req.file?.size).toBe(req.file?.data.length);
    const meta = await sharp(req.file?.data).metadata();
    expect(meta).toMatchObject({ format: "webp", width: 1200 });
  });

  it("falls back to balanced quality and 2400 px when the settings are empty", async () => {
    const data = await png(3000, 1500);
    const { args, req } = hookArgs("update", { data, mimetype: "image/png", name: "a.png", size: data.length });

    await compressUpload(args);

    expect((await sharp(req.file?.data).metadata()).width).toBe(2400);
  });

  it("reads an upload that was buffered to a temp file and clears the path", async () => {
    const dir = await mkdtemp(path.join(tmpdir(), "thc-upload-"));
    try {
      const tempFilePath = path.join(dir, "upload");
      await writeFile(tempFilePath, await png(500, 300));
      const { args, req } = hookArgs("create", {
        data: Buffer.alloc(0),
        mimetype: "image/png",
        name: "b.png",
        size: 0,
        tempFilePath,
      });

      await compressUpload(args);

      expect(req.file?.tempFilePath).toBeUndefined();
      expect(req.file?.data.length).toBeGreaterThan(0);
      expect((await sharp(req.file?.data).metadata()).format).toBe("webp");
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("leaves non-image uploads and other operations alone", async () => {
    const text = { data: Buffer.from("hello"), mimetype: "text/plain", name: "a.txt", size: 5 };
    const plain = hookArgs("create", text);
    await compressUpload(plain.args);
    expect(plain.req.file).toBe(text);
    expect(plain.findGlobal).not.toHaveBeenCalled();

    const data = await png(100, 100);
    const image = { data, mimetype: "image/png", name: "a.png", size: data.length };
    const read = hookArgs("read", image);
    await compressUpload(read.args);
    expect(read.req.file).toBe(image);

    const none = hookArgs("create", undefined);
    await expect(compressUpload(none.args)).resolves.toBe(none.args.args);
  });

  it("refuses a file that claims to be an image but is not", async () => {
    const { args } = hookArgs("create", {
      data: Buffer.from("not really a png"),
      mimetype: "image/png",
      name: "fake.png",
      size: 16,
    });

    // A 400 APIError, so the admin shows the message instead of a generic server error.
    await expect(compressUpload(args)).rejects.toMatchObject({
      message: "Could not process the image; upload a JPEG, PNG or WebP",
      status: 400,
    });
  });
});

describe("media uploads (Payload)", () => {
  it("stores an uploaded PNG as WebP no wider than the configured maximum", async () => {
    const { payload } = temp;
    await payload.updateGlobal({
      slug: "site-settings",
      data: { media: { imageQuality: "balanced", maxImageWidth: 1600 } },
      overrideAccess: true,
      context: { skipRevalidate: true },
    });
    const data = await png(3000, 2000);

    const doc = await payload.create({
      collection: "media",
      data: { alt: "A wide test image" },
      file: { data, mimetype: "image/png", name: "wide.png", size: data.length },
      overrideAccess: true,
      context: { skipRevalidate: true },
    });

    expect(doc.mimeType).toBe("image/webp");
    expect(doc.filename).toMatch(/\.webp$/);
    expect(doc.width).toBeLessThanOrEqual(1600);
    expect(doc.filesize).toBeLessThan(data.length);
    expect(doc.sizes?.card?.width).toBe(800);
    expect(doc.sizes?.card?.mimeType).toBe("image/webp");
  });

  it("still rejects a file type the media library does not allow", async () => {
    const data = Buffer.from("plain text, not an image");

    await expect(
      temp.payload.create({
        collection: "media",
        data: { alt: "Text" },
        file: { data, mimetype: "text/plain", name: "notes.txt", size: data.length },
        overrideAccess: true,
        context: { skipRevalidate: true },
      })
    ).rejects.toThrow(ValidationError);
    expect((await temp.payload.count({ collection: "media", overrideAccess: true })).totalDocs).toBe(0);
  });
});
