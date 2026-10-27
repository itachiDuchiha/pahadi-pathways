import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "analytics_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"ga_measurement_id" varchar,
  	"clarity_project_id" varchar,
  	"consent_banner_text" varchar DEFAULT 'We use cookies for analytics to improve this site. You can accept or decline; declining keeps the site fully usable.' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "analytics_settings" CASCADE;`)
}
