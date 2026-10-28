import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`media_image_quality\` text DEFAULT 'balanced';`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`media_max_image_width\` numeric DEFAULT 2400;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`media_image_quality\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`media_max_image_width\`;`)
}
