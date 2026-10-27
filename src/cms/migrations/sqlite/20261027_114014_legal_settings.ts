import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`legal_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`grievance_officer_name\` text,
  	\`grievance_officer_email\` text,
  	\`grievance_officer_phone\` text,
  	\`data_contact_email\` text,
  	\`effective_date\` text,
  	\`deletion_window_months\` numeric DEFAULT 6 NOT NULL,
  	\`retention_statement\` text DEFAULT 'We keep enquiry records to maintain a history of your requests.' NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`legal_settings\`;`)
}
