const MISSING_SCHEMA = /no such table|relation "[^"]+" does not exist/i;

/** True when the error (or one it wraps) says the schema has not been migrated. */
export function isMissingSchemaError(error: unknown): boolean {
  for (let current = error, depth = 0; current && depth < 5; depth++) {
    if (current instanceof Error) {
      if (MISSING_SCHEMA.test(current.message)) return true;
      current = current.cause;
    } else {
      return MISSING_SCHEMA.test(String(current));
    }
  }
  return false;
}
