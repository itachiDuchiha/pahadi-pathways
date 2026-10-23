import type { CollectionConfig } from "payload";

import { isAdmin, isEditorOrAdmin } from "../access";
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
    update: isAdmin,
    delete: isAdmin,
    unlock: isAdmin,
  },
  hooks: {
    beforeOperation: [blockAnonymousCreate],
  },
  fields: [
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
    },
  ],
};
