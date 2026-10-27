import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "notification_settings_trip_recipients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL
  );
  
  CREATE TABLE "notification_settings_contact_recipients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL
  );
  
  CREATE TABLE "notification_settings_package_recipients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL
  );
  
  CREATE TABLE "notification_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"trip_send_email" boolean DEFAULT true,
  	"contact_send_email" boolean DEFAULT true,
  	"package_send_email" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "notification_settings_trip_recipients" ADD CONSTRAINT "notification_settings_trip_recipients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."notification_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "notification_settings_contact_recipients" ADD CONSTRAINT "notification_settings_contact_recipients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."notification_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "notification_settings_package_recipients" ADD CONSTRAINT "notification_settings_package_recipients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."notification_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "notification_settings_trip_recipients_order_idx" ON "notification_settings_trip_recipients" USING btree ("_order");
  CREATE INDEX "notification_settings_trip_recipients_parent_id_idx" ON "notification_settings_trip_recipients" USING btree ("_parent_id");
  CREATE INDEX "notification_settings_contact_recipients_order_idx" ON "notification_settings_contact_recipients" USING btree ("_order");
  CREATE INDEX "notification_settings_contact_recipients_parent_id_idx" ON "notification_settings_contact_recipients" USING btree ("_parent_id");
  CREATE INDEX "notification_settings_package_recipients_order_idx" ON "notification_settings_package_recipients" USING btree ("_order");
  CREATE INDEX "notification_settings_package_recipients_parent_id_idx" ON "notification_settings_package_recipients" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "notification_settings_trip_recipients" CASCADE;
  DROP TABLE "notification_settings_contact_recipients" CASCADE;
  DROP TABLE "notification_settings_package_recipients" CASCADE;
  DROP TABLE "notification_settings" CASCADE;`)
}
