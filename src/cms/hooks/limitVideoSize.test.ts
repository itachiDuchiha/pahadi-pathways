import { describe, expect, it } from "vitest";

import { MAX_VIDEO_BYTES } from "@/lib/media/limits";

import { limitVideoSize } from "./limitVideoSize";

type HookArgs = Parameters<typeof limitVideoSize>[0];

function run(file: { mimetype: string; size: number } | undefined, data: Record<string, unknown> = { alt: "a" }) {
  return limitVideoSize({ data, req: { file }, operation: "create" } as unknown as HookArgs);
}

describe("limitVideoSize", () => {
  it("accepts a video of exactly 100 MB and returns the data", async () => {
    const data = { alt: "a" };
    await expect(run({ mimetype: "video/mp4", size: MAX_VIDEO_BYTES }, data)).resolves.toBe(data);
  });

  it("rejects a video one byte over 100 MB with a 413", async () => {
    await expect(run({ mimetype: "video/webm", size: MAX_VIDEO_BYTES + 1 })).rejects.toMatchObject({
      message: "Videos must be 100 MB or smaller",
      status: 413,
    });
  });

  it("leaves images and requests without a file alone", async () => {
    await expect(run({ mimetype: "image/png", size: MAX_VIDEO_BYTES + 1 })).resolves.toEqual({ alt: "a" });
    await expect(run(undefined)).resolves.toEqual({ alt: "a" });
  });
});
