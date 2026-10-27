/**
 * Options shared by every public read: only published documents, the
 * same access rules an anonymous visitor gets, media populated one level
 * deep, and no pagination.
 */
export const PUBLIC_READ = {
  draft: false,
  overrideAccess: false,
  depth: 1,
  pagination: false,
} as const;
