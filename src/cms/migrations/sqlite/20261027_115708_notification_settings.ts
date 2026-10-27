import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`notification_settings_trip_recipients\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`email\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`notification_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`notification_settings_trip_recipients_order_idx\` ON \`notification_settings_trip_recipients\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`notification_settings_trip_recipients_parent_id_idx\` ON \`notification_settings_trip_recipients\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`notification_settings_contact_recipients\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`email\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`notification_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`notification_settings_contact_recipients_order_idx\` ON \`notification_settings_contact_recipients\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`notification_settings_contact_recipients_parent_id_idx\` ON \`notification_settings_contact_recipients\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`notification_settings_package_recipients\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`email\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`notification_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`notification_settings_package_recipients_order_idx\` ON \`notification_settings_package_recipients\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`notification_settings_package_recipients_parent_id_idx\` ON \`notification_settings_package_recipients\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`notification_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`trip_send_email\` integer DEFAULT true,
  	\`contact_send_email\` integer DEFAULT true,
  	\`package_send_email\` integer DEFAULT true,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`notification_settings_trip_recipients\`;`)
  await db.run(sql`DROP TABLE \`notification_settings_contact_recipients\`;`)
  await db.run(sql`DROP TABLE \`notification_settings_package_recipients\`;`)
  await db.run(sql`DROP TABLE \`notification_settings\`;`)
}
