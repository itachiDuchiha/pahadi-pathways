import path from "node:path";
import { fileURLToPath } from "node:url";

import { buildConfig } from "payload";
import sharp from "sharp";

import { Media } from "./cms/collections/Media";
import { Users } from "./cms/collections/Users";
import { ensureAdmin } from "./cms/bootstrap/ensureAdmin";
import { buildDbAdapter } from "./cms/config/db";
import { securityConfig } from "./cms/config/security";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  ...securityConfig(process.env),
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: dirname,
      importMapFile: path.resolve(dirname, "app/(payload)/ramram/importMap.js"),
    },
    components: {
      views: {
        createFirstUser: {
          Component: "/cms/admin/AdminNotInitialised#AdminNotInitialised",
          path: "/create-first-user",
        },
      },
    },
  },
  routes: { admin: "/ramram" },
  collections: [Users, Media],
  db: buildDbAdapter(process.env),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "cms/payload-types.ts"),
  },
  onInit: async (payload) => {
    await ensureAdmin(payload, process.env);
  },
});
