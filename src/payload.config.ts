import path from "node:path";
import { fileURLToPath } from "node:url";

import { buildConfig } from "payload";
import sharp from "sharp";

import { Destinations } from "./cms/collections/Destinations";
import { Enquiries } from "./cms/collections/Enquiries";
import { Experiences } from "./cms/collections/Experiences";
import { GalleryItems } from "./cms/collections/GalleryItems";
import { Media } from "./cms/collections/Media";
import { Packages } from "./cms/collections/Packages";
import { Testimonials } from "./cms/collections/Testimonials";
import { Users } from "./cms/collections/Users";
import { bootstrapAdmin } from "./cms/bootstrap/ensureAdmin";
import { buildDbAdapter } from "./cms/config/db";
import { securityConfig } from "./cms/config/security";
import { PricingSettings } from "./cms/globals/PricingSettings";
import { SiteSettings } from "./cms/globals/SiteSettings";

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
  collections: [Packages, Destinations, Testimonials, GalleryItems, Experiences, Enquiries, Media, Users],
  globals: [PricingSettings, SiteSettings],
  db: buildDbAdapter(process.env),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "cms/payload-types.ts"),
    // Tests boot Payload; keep them from rewriting the committed types.
    autoGenerate: process.env.NODE_ENV !== "test",
  },
  onInit: async (payload) => {
    await bootstrapAdmin(payload, process.env);
  },
});
