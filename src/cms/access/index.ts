import type { Access, FieldAccess } from "payload";

/** True for a signed-in admin. */
export function isAdminUser(user: { role?: unknown } | null | undefined): boolean {
  return user?.role === "admin";
}

export const isAdmin = (({ req }) => isAdminUser(req.user)) satisfies Access;

/** Field-level counterpart of `isAdmin`. */
export const isAdminField: FieldAccess = ({ req }) => isAdminUser(req.user);

/** Admins may update anyone; any other signed-in user only themselves. */
export const isAdminOrSelf = (({ req }) => {
  if (!req.user) return false;
  return isAdminUser(req.user) || { id: { equals: req.user.id } };
}) satisfies Access;

export const isEditorOrAdmin = (({ req }) =>
  req.user?.role === "admin" || req.user?.role === "editor") satisfies Access;

export const publishedOnly = (({ req }) =>
  req.user ? true : { _status: { equals: "published" } }) satisfies Access;

export const deny = (() => false) satisfies Access;

export const serverOnly = (({ req }) =>
  req.context?.internal === true) satisfies Access;
