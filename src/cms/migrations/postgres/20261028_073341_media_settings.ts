import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_site_settings_media_image_quality" AS ENUM('small', 'balanced', 'sharp');
  ALTER TABLE "site_settings" ADD COLUMN "media_image_quality" "enum_site_settings_media_image_quality" DEFAULT 'balanced';
  ALTER TABLE "site_settings" ADD COLUMN "media_max_image_width" numeric DEFAULT 2400;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" DROP COLUMN "media_image_quality";
  ALTER TABLE "site_settings" DROP COLUMN "media_max_image_width";
  DROP TYPE "public"."enum_site_settings_media_image_quality";`)
}
