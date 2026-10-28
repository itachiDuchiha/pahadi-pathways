import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_gallery_items_kind" AS ENUM('image', 'video');
  ALTER TABLE "gallery_items" ALTER COLUMN "image_id" DROP NOT NULL;
  ALTER TABLE "gallery_items" ADD COLUMN "kind" "enum_gallery_items_kind" DEFAULT 'image' NOT NULL;
  ALTER TABLE "gallery_items" ADD COLUMN "video_id" integer;
  ALTER TABLE "gallery_items" ADD COLUMN "poster_id" integer;
  ALTER TABLE "gallery_items" ADD CONSTRAINT "gallery_items_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_items" ADD CONSTRAINT "gallery_items_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "gallery_items_video_idx" ON "gallery_items" USING btree ("video_id");
  CREATE INDEX "gallery_items_poster_idx" ON "gallery_items" USING btree ("poster_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // The old schema requires an image, so video items without one are removed.
  await db.execute(sql`DELETE FROM "gallery_items" WHERE "image_id" IS NULL;`)
  await db.execute(sql`
   ALTER TABLE "gallery_items" DROP CONSTRAINT "gallery_items_video_id_media_id_fk";
  
  ALTER TABLE "gallery_items" DROP CONSTRAINT "gallery_items_poster_id_media_id_fk";
  
  DROP INDEX "gallery_items_video_idx";
  DROP INDEX "gallery_items_poster_idx";
  ALTER TABLE "gallery_items" ALTER COLUMN "image_id" SET NOT NULL;
  ALTER TABLE "gallery_items" DROP COLUMN "kind";
  ALTER TABLE "gallery_items" DROP COLUMN "video_id";
  ALTER TABLE "gallery_items" DROP COLUMN "poster_id";
  DROP TYPE "public"."enum_gallery_items_kind";`)
}
