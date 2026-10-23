import type { Access } from "payload";

export const isAdmin = (({ req }) => req.user?.role === "admin") satisfies Access;

export const isEditorOrAdmin = (({ req }) =>
  req.user?.role === "admin" || req.user?.role === "editor") satisfies Access;

export const publishedOnly = (({ req }) =>
  req.user ? true : { _status: { equals: "published" } }) satisfies Access;

export const deny = (() => false) satisfies Access;

export const serverOnly = (({ req }) =>
  req.context?.internal === true) satisfies Access;
