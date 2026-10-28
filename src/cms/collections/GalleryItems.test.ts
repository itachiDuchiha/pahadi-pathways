import sharp from "sharp";
import { APIError, ValidationError } from "payload";
import { describe, expect, it } from "vitest";

import type { GalleryItem } from "@/cms/payload-types";
import { MAX_VIDEO_BYTES } from "@/lib/media/limits";

import { withTempPayload } from "../test/withTempPayload";

const temp = withTempPayload();
const context = { skipRevalidate: true };
const MB = 1024 * 1024;

/**
 * An MP4 of the given size: an `ftyp` box (so the type is detected as
 * video/mp4) followed by one zero-filled `free` box, which passes
 * Payload's ISO base media structure check without real footage.
 */
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

function uploadVideo(size: number, name = "clip.mp4") {
  const data = mp4(size);
  return temp.payload.create({
    collection: "media",
    data: { alt: "A clip" },
    file: { data, mimetype: "video/mp4", name, size: data.length },
    overrideAccess: true,
    context,
  });
}

async function uploadImage(name = "poster.png") {
  const data = await sharp({ create: { width: 1200, height: 675, channels: 3, background: "#336699" } })
    .png()
    .toBuffer();
  return temp.payload.create({
    collection: "media",
    data: { alt: "A poster" },
    file: { data, mimetype: "image/png", name, size: data.length },
    overrideAccess: true,
    context,
  });
}

type ItemMedia = Partial<Pick<GalleryItem, "kind" | "image" | "video" | "poster">>;

function createItem(media: ItemMedia) {
  return temp.payload.create({
    collection: "gallery-items",
    data: {
      kind: "image",
      title: "Road to Kaza",
      category: "Road Journeys",
      location: "Spiti",
      size: "normal",
      order: 0,
      ...media,
    },
    overrideAccess: true,
    context,
  });
}

describe("video uploads", () => {
  it("stores a 1 MB MP4 untouched, without image sizes", async () => {
    const doc = await uploadVideo(MB);

    expect(doc.mimeType).toBe("video/mp4");
    expect(doc.filename).toBe("clip.mp4");
    expect(doc.filesize).toBe(MB);
    expect(doc.width ?? null).toBeNull();
    expect(doc.sizes?.card?.url ?? null).toBeNull();
  });

  it("rejects a video over 100 MB with the size message and stores nothing", async () => {
    const error: unknown = await uploadVideo(MAX_VIDEO_BYTES + MB, "big.mp4").catch((caught: unknown) => caught);
    expect(error).toBeInstanceOf(APIError);
    expect(error).toMatchObject({ message: "Videos must be 100 MB or smaller", status: 413 });
    expect((await temp.payload.count({ collection: "media", overrideAccess: true })).totalDocs).toBe(0);
  });

  it("refuses to delete a video or poster that a gallery item uses", async () => {
    const video = await uploadVideo(MB);
    const poster = await uploadImage();
    await createItem({ kind: "video", video: video.id, poster: poster.id });

    for (const id of [video.id, poster.id]) {
      await expect(
        temp.payload.delete({ collection: "media", id, overrideAccess: true, context })
      ).rejects.toThrow('This file is still used by: gallery-items "Road to Kaza"');
    }
  });
});

describe("gallery items", () => {
  it("defaults to an image item and still requires the image", async () => {
    const image = await uploadImage();
    const doc = await temp.payload.create({
      collection: "gallery-items",
      // `kind` left out on purpose: the default applies.
      data: { title: "Kaza", category: "Valleys", location: "Spiti", image: image.id } as GalleryItem,
      overrideAccess: true,
      context,
    });
    expect(doc.kind).toBe("image");

    await expect(createItem({ kind: "image" })).rejects.toThrow(ValidationError);
  });

  it("requires a poster for a video item", async () => {
    const video = await uploadVideo(MB);

    await expect(createItem({ kind: "video", video: video.id })).rejects.toThrow(ValidationError);

    const poster = await uploadImage();
    const doc = await createItem({ kind: "video", video: video.id, poster: poster.id });
    expect(doc).toMatchObject({ kind: "video" });
    expect(doc.image ?? null).toBeNull();
  });

  it("requires the video to be a video file and the poster an image", async () => {
    const image = await uploadImage();
    const video = await uploadVideo(MB);

    await expect(createItem({ kind: "video", poster: image.id })).rejects.toThrow(ValidationError);
    await expect(createItem({ kind: "video", video: image.id, poster: image.id })).rejects.toThrow(
      ValidationError
    );
    await expect(createItem({ kind: "video", video: video.id, poster: video.id })).rejects.toThrow(
      ValidationError
    );
  });

  it("keeps videos out of image fields elsewhere", async () => {
    const video = await uploadVideo(MB);

    await expect(createItem({ kind: "image", image: video.id })).rejects.toThrow(ValidationError);
    await expect(
      temp.payload.create({
        collection: "experiences",
        data: { title: "Stargazing", description: "Night skies", image: video.id, icon: "Star", order: 0 },
        overrideAccess: true,
        context,
      })
    ).rejects.toThrow(ValidationError);
  });

  it("keeps only the media an item's kind uses, so an API write cannot hide a video in `image`", async () => {
    const image = await uploadImage();
    const video = await uploadVideo(MB);

    const videoItem = await createItem({ kind: "video", video: video.id, poster: image.id, image: video.id });
    expect(videoItem.image ?? null).toBeNull();

    const imageItem = await createItem({ kind: "image", image: image.id, video: video.id, poster: image.id });
    expect(imageItem.video ?? null).toBeNull();
    expect(imageItem.poster ?? null).toBeNull();

    // A partial update without `kind` uses the stored kind.
    const updated = await temp.payload.update({
      collection: "gallery-items",
      id: videoItem.id,
      data: { image: image.id },
      overrideAccess: true,
      context,
    });
    expect(updated).toMatchObject({ kind: "video", image: null });
  });
});
