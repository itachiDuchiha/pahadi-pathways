import { getPayload, type Payload } from "payload";

/**
 * The Payload Local API client for server-side reads. Payload caches the
 * instance per process, so repeated calls are cheap. The config is
 * imported lazily: it validates the environment when it loads, and
 * modules that only need the mappers or types should not pay for that.
 */
export async function getPayloadClient(): Promise<Payload> {
  const { default: config } = await import("@payload-config");
  return getPayload({ config });
}
