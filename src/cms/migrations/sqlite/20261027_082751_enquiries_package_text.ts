import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`enquiries\` ADD \`package_slug\` text;`)
  await db.run(sql`ALTER TABLE \`enquiries\` ADD \`package_title\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`enquiries\` DROP COLUMN \`package_slug\`;`)
  await db.run(sql`ALTER TABLE \`enquiries\` DROP COLUMN \`package_title\`;`)
}
