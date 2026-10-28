/** Upload size limits; the HTTP limit in the Payload config is the larger one. */
const MB = 1024 * 1024;

export const MAX_VIDEO_BYTES = 100 * MB;
export const MAX_IMAGE_BYTES = 10 * MB;

export const VIDEO_TOO_LARGE = "Videos must be 100 MB or smaller";
export const IMAGE_TOO_LARGE = "Images must be 10 MB or smaller";

/** An upload's size; the local API may leave `size` unset, so fall back to the buffer. */
export function uploadSize(file: { size?: number; data?: Buffer }): number {
  return file.size || file.data?.length || 0;
}
