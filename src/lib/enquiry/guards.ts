export const MAX_BODY_BYTES = 16_384;

function hostOf(value: string | null): string | null {
  if (!value) return null;

  try {
    return new URL(value).host;
  } catch {
    return null;
  }
}

/**
 * True when the Origin (or, failing that, Referer) host matches `siteUrl`,
 * or when neither header is present (non-browser clients). A header that is
 * present but unparseable counts as a mismatch.
 */
export function checkOrigin(request: Request, siteUrl: string): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const header = origin ?? referer;

  if (header === null) return true;

  const expected = hostOf(siteUrl);
  const actual = hostOf(header);

  return expected !== null && actual !== null && actual === expected;
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (forwarded) return forwarded;

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  return "unknown";
}

/** True when the declared Content-Length is over the body limit. */
export function declaredBodyTooLarge(request: Request): boolean {
  const declared = Number(request.headers.get("content-length"));
  return Number.isFinite(declared) && declared > MAX_BODY_BYTES;
}

/**
 * Reads at most MAX_BODY_BYTES of the body and parses it as JSON. The
 * declared Content-Length is checked first, then the bytes actually
 * received, so a missing or false header cannot bypass the limit.
 */
export async function readJson(
  request: Request
): Promise<{ ok: true; body: unknown } | { ok: false; status: 400 | 413 }> {
  if (declaredBodyTooLarge(request)) return { ok: false, status: 413 };

  if (!request.body) return { ok: false, status: 400 };

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let received = 0;

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;

    received += value.byteLength;

    if (received > MAX_BODY_BYTES) {
      await reader.cancel();
      return { ok: false, status: 413 };
    }

    chunks.push(value);
  }

  const bytes = new Uint8Array(received);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    return { ok: true, body: JSON.parse(new TextDecoder().decode(bytes)) };
  } catch {
    return { ok: false, status: 400 };
  }
}
