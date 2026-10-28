import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { handleEndpoints } from "payload";
import sharp from "sharp";
import { describe, expect, it } from "vitest";

import { MAX_VIDEO_BYTES } from "@/lib/media/limits";
import { sweepUploadTemp } from "@/lib/media/upload-temp";

import { withTempPayload } from "../test/withTempPayload";

// Uploads through the REST endpoint, the way the admin sends them: the
// multipart body is streamed to UPLOAD_TEMP_DIR before any hook runs.
const temp = withTempPayload();
const MB = 1024 * 1024;

function mp4(size: number): Buffer {
  const data = Buffer.alloc(size);
  data.writeUInt32BE(24, 0);
  data.write("ftypisom", 4, "latin1");
  data.writeUInt32BE(0x200, 12);
  data.write("isommp41", 16, "latin1");
  data.writeUInt32BE(size - 24, 24);
  data.write("free", 28, "latin1");
  return data;
}

async function editorToken(): Promise<string> {
  const email = "editor-http@example.test";
  const password = "a-long-test-password";
  await temp.payload.create({
    collection: "users",
    data: { email, password, role: "editor" },
    overrideAccess: true,
    context: { skipRevalidate: true, internal: true },
  });
  const { token } = await temp.payload.login({ collection: "users", data: { email, password } });
  if (!token) throw new Error("no token");
  return token;
}

async function post(
  file: { data: Buffer; type: string; name: string },
  token?: string,
  collection = "media"
): Promise<Response> {
  const form = new FormData();
  form.append("file", new Blob([new Uint8Array(file.data)], { type: file.type }), file.name);
  form.append("_payload", JSON.stringify({ alt: "Uploaded over HTTP" }));
  // Encode the form up front: a streamed FormData body keeps writing after
  // Payload cancels it at the size limit, an unhandled error in Node.
  const encoded = new Response(form);
  const headers = new Headers({ "Content-Type": encoded.headers.get("Content-Type") ?? "" });
  if (token) headers.set("Authorization", `JWT ${token}`);
  const request = new Request(`http://localhost:3000/api/${collection}`, {
    method: "POST",
    body: await encoded.arrayBuffer(),
    headers,
  });
  return handleEndpoints({
    config: temp.payload.config,
    request,
    payloadInstanceCacheKey: `test-${path.basename(temp.dir)}`,
  });
}

async function tempFilesLeft(): Promise<string[]> {
  const dir = path.join(temp.dir, "upload-tmp");
  return existsSync(dir) ? readdir(dir) : [];
}

describe("media uploads over HTTP (temp files)", () => {
  // Encoding a 3000x2000 image plus three sizes outruns the 5 s default
  // when the whole suite runs in parallel.
  it("compresses an image streamed to a temp file and removes the temp file", { timeout: 30_000 }, async () => {
    const token = await editorToken();
    const data = await sharp({ create: { width: 3000, height: 2000, channels: 3, background: "#884422" } })
      .png()
      .toBuffer();

    const response = await post({ data, type: "image/png", name: "wide.png" }, token);
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body.doc).toMatchObject({ mimeType: "image/webp", width: 2400 });
    expect(body.doc.filename).toMatch(/\.webp$/);
    expect(await tempFilesLeft()).toEqual([]);
  });

  it("stores a video streamed to a temp file unchanged and removes the temp file", async () => {
    const token = await editorToken();
    const data = mp4(2 * MB);

    const response = await post({ data, type: "video/mp4", name: "clip.mp4" }, token);
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body.doc).toMatchObject({ mimeType: "video/mp4", filename: "clip.mp4", filesize: 2 * MB });
    const stored = await readFile(path.join(temp.dir, "media", "clip.mp4"));
    expect(stored.equals(data)).toBe(true);
    expect(await tempFilesLeft()).toEqual([]);
  });

  it("refuses an anonymous upload and removes its temp file", async () => {
    const response = await post({ data: mp4(MB), type: "video/mp4", name: "anon.mp4" });

    expect(response.status).toBe(403);
    expect(await tempFilesLeft()).toEqual([]);
    expect((await temp.payload.count({ collection: "media", overrideAccess: true })).totalDocs).toBe(0);
  });

  it("stops a file over 100 MB at the upload limit and removes the partial temp file", async () => {
    const token = await editorToken();

    const response = await post({ data: mp4(MAX_VIDEO_BYTES + 1), type: "video/mp4", name: "big.mp4" }, token);
    const body = await response.json();

    expect(response.status).toBe(413);
    expect(JSON.stringify(body)).toContain("Files must be 100 MB or smaller");
    expect(await tempFilesLeft()).toEqual([]);
  });

  it("leaves a temp file from a non-upload endpoint to the sweeper, which removes it", async () => {
    // Payload removes temp files only for upload collections; this shows
    // the body really went to disk and why the periodic sweep exists.
    const response = await post({ data: mp4(MB), type: "video/mp4", name: "stray.mp4" }, undefined, "testimonials");

    expect(response.status).toBe(403);
    expect(await tempFilesLeft()).toHaveLength(1);
    expect(await sweepUploadTemp(path.join(temp.dir, "upload-tmp"), { maxAgeMs: 0, now: Date.now() + 1000 })).toBe(1);
    expect(await tempFilesLeft()).toEqual([]);
  });
});
