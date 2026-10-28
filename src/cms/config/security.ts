import { site } from "@/config/site";
import { MAX_VIDEO_BYTES } from "@/lib/media/limits";

export const MIN_SECRET_LENGTH = 32;

export function securityConfig(env: Readonly<Record<string, string | undefined>>) {
  const secret = env.PAYLOAD_SECRET ?? "";

  if (secret.length < MIN_SECRET_LENGTH) {
    throw new Error(
      `PAYLOAD_SECRET is required and must be at least ${MIN_SECRET_LENGTH} characters`
    );
  }

  return {
    secret,
    serverURL: site.url,
    cors: [site.url],
    csrf: [site.url],
    graphQL: { disable: true },
    // Sized for the largest upload (a video); the Media hooks hold images
    // to their own, smaller limit. The request limit leaves room for the
    // form fields around the file.
    upload: {
      limits: { fileSize: MAX_VIDEO_BYTES },
      requestSizeLimit: MAX_VIDEO_BYTES + 1024 * 1024,
      responseOnLimit: "Files must be 100 MB or smaller",
    },
    cookiePrefix: "thc",
  };
}
