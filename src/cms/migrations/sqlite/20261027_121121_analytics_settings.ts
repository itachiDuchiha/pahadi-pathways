import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`analytics_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`ga_measurement_id\` text,
  	\`clarity_project_id\` text,
  	\`consent_banner_text\` text DEFAULT 'We use cookies for analytics to improve this site. You can accept or decline; declining keeps the site fully usable.' NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`analytics_settings\`;`)
}
