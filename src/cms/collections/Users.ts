import type { CollectionConfig } from "payload";

import { isAdmin, isAdminField, isAdminOrSelf, isEditorOrAdmin } from "../access";
import { blockAnonymousCreate } from "../hooks/blockAnonymousCreate";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    tokenExpiration: 2 * 60 * 60,
    cookies: {
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
    },
  },
  access: {
    create: isAdmin,
    read: isEditorOrAdmin,
    // Everyone can change their own password; the role and email fields
    // below stay admin-only, so an editor cannot promote themselves.
    update: isAdminOrSelf,
    delete: isAdmin,
    unlock: isAdmin,
  },
  hooks: {
    beforeOperation: [blockAnonymousCreate],
  },
  fields: [
    {
      // Merged into Payload's built-in email field.
      name: "email",
      type: "email",
      required: true,
      access: { update: isAdminField },
    },
    {
      name: "role",
      type: "select",
      required: true,
      access: { update: isAdminField },
      defaultValue: "editor",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
    },
  ],
};
