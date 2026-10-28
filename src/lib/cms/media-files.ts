import fs from "node:fs";
import path from "node:path";

/** Whether an uploaded file is still in the media directory (`MEDIA_DIR`, default `media`). */
export function mediaFileExists(filename: string, exists: (path: string) => boolean = fs.existsSync): boolean {
  return exists(path.resolve(process.env.MEDIA_DIR ?? "media", path.basename(filename)));
}
