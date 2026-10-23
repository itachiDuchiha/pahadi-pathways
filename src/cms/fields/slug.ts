import { ValidationError, type FieldHook, type TextField } from "payload";

/** Lower-case kebab case: words of a-z0-9 joined by single hyphens. */
export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const SLUG_MESSAGE =
  "Slug must be lower-case letters and digits separated by single hyphens, for example shimla-manali-getaway";

export function validateSlug(value: unknown): true | string {
  if (typeof value === "string" && SLUG_PATTERN.test(value)) return true;

  return SLUG_MESSAGE;
}

/**
 * Payload skips `validate` on draft saves, so a malformed slug would slip
 * into a draft. This hook runs for drafts too; an absent slug is left to
 * the required check on publish.
 */
const rejectMalformedSlug: FieldHook = ({ value, data, collection, req }) => {
  if (value === undefined || value === null) return value;
  // A publish runs `validate`, which reports this alongside other fields.
  if (data?._status === "published") return value;

  const result = validateSlug(value);
  if (result === true) return value;

  throw new ValidationError({
    collection: collection?.slug,
    errors: [{ path: "slug", message: result }],
    req,
  });
};

/** The URL slug shared by every routable collection. */
export function slugField(): TextField {
  return {
    name: "slug",
    type: "text",
    required: true,
    unique: true,
    index: true,
    validate: (value) => validateSlug(value),
    hooks: { beforeChange: [rejectMalformedSlug] },
    admin: {
      position: "sidebar",
      description: "Used in the page URL. Lower-case words separated by hyphens.",
    },
  };
}
