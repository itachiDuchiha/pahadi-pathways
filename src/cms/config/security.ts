import { site } from "@/config/site";

export const MIN_SECRET_LENGTH = 32;

export function securityConfig(env: NodeJS.ProcessEnv) {
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
    upload: { limits: { fileSize: 10 * 1024 * 1024 } },
    cookiePrefix: "thc",
  };
}
