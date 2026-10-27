import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "legal_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"grievance_officer_name" varchar,
  	"grievance_officer_email" varchar,
  	"grievance_officer_phone" varchar,
  	"data_contact_email" varchar,
  	"effective_date" timestamp(3) with time zone,
  	"deletion_window_months" numeric DEFAULT 6 NOT NULL,
  	"retention_statement" varchar DEFAULT 'We keep enquiry records to maintain a history of your requests.' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "legal_settings" CASCADE;`)
}
