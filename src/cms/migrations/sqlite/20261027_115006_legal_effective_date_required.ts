import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // A row saved before the date became required keeps working: an empty
  // date takes the default instead of failing the copy.
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_legal_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`grievance_officer_name\` text,
  	\`grievance_officer_email\` text,
  	\`grievance_officer_phone\` text,
  	\`data_contact_email\` text,
  	\`effective_date\` text DEFAULT '2026-10-27T00:00:00.000Z' NOT NULL,
  	\`deletion_window_months\` numeric DEFAULT 6 NOT NULL,
  	\`retention_statement\` text DEFAULT 'We keep enquiry records to maintain a history of your requests.' NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_legal_settings\`("id", "grievance_officer_name", "grievance_officer_email", "grievance_officer_phone", "data_contact_email", "effective_date", "deletion_window_months", "retention_statement", "updated_at", "created_at") SELECT "id", "grievance_officer_name", "grievance_officer_email", "grievance_officer_phone", "data_contact_email", COALESCE("effective_date", '2026-10-27T00:00:00.000Z'), "deletion_window_months", "retention_statement", "updated_at", "created_at" FROM \`legal_settings\`;`)
  await db.run(sql`DROP TABLE \`legal_settings\`;`)
  await db.run(sql`ALTER TABLE \`__new_legal_settings\` RENAME TO \`legal_settings\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_legal_settings\` (
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
  await db.run(sql`INSERT INTO \`__new_legal_settings\`("id", "grievance_officer_name", "grievance_officer_email", "grievance_officer_phone", "data_contact_email", "effective_date", "deletion_window_months", "retention_statement", "updated_at", "created_at") SELECT "id", "grievance_officer_name", "grievance_officer_email", "grievance_officer_phone", "data_contact_email", "effective_date", "deletion_window_months", "retention_statement", "updated_at", "created_at" FROM \`legal_settings\`;`)
  await db.run(sql`DROP TABLE \`legal_settings\`;`)
  await db.run(sql`ALTER TABLE \`__new_legal_settings\` RENAME TO \`legal_settings\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
}
