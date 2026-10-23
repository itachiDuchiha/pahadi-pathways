import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`packages_itinerary\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`packages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`packages_itinerary_order_idx\` ON \`packages_itinerary\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`packages_itinerary_parent_id_idx\` ON \`packages_itinerary\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`packages_hidden_itinerary\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`packages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`packages_hidden_itinerary_order_idx\` ON \`packages_hidden_itinerary\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`packages_hidden_itinerary_parent_id_idx\` ON \`packages_hidden_itinerary\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`packages_includes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`packages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`packages_includes_order_idx\` ON \`packages_includes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`packages_includes_parent_id_idx\` ON \`packages_includes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`packages_exclusions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`packages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`packages_exclusions_order_idx\` ON \`packages_exclusions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`packages_exclusions_parent_id_idx\` ON \`packages_exclusions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`packages_stay_plan\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`packages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`packages_stay_plan_order_idx\` ON \`packages_stay_plan\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`packages_stay_plan_parent_id_idx\` ON \`packages_stay_plan\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`packages_highlights\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`packages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`packages_highlights_order_idx\` ON \`packages_highlights\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`packages_highlights_parent_id_idx\` ON \`packages_highlights\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`packages_ideal_for\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`packages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`packages_ideal_for_order_idx\` ON \`packages_ideal_for\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`packages_ideal_for_parent_id_idx\` ON \`packages_ideal_for\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`packages_faqs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`packages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`packages_faqs_order_idx\` ON \`packages_faqs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`packages_faqs_parent_id_idx\` ON \`packages_faqs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`packages_itinerary_days_places\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`packages_itinerary_days\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`packages_itinerary_days_places_order_idx\` ON \`packages_itinerary_days_places\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`packages_itinerary_days_places_parent_id_idx\` ON \`packages_itinerary_days_places\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`packages_itinerary_days_details\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`packages_itinerary_days\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`packages_itinerary_days_details_order_idx\` ON \`packages_itinerary_days_details\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`packages_itinerary_days_details_parent_id_idx\` ON \`packages_itinerary_days_details\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`packages_itinerary_days\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`day\` numeric,
  	\`title\` text,
  	\`start\` text,
  	\`end\` text,
  	\`stay\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`packages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`packages_itinerary_days_order_idx\` ON \`packages_itinerary_days\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`packages_itinerary_days_parent_id_idx\` ON \`packages_itinerary_days\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`packages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`title\` text,
  	\`image_id\` integer,
  	\`hero_image_id\` integer,
  	\`duration\` text,
  	\`rating\` numeric,
  	\`pickup\` text,
  	\`price\` numeric,
  	\`popular\` integer DEFAULT false,
  	\`pricing_base_price_per_adult\` numeric,
  	\`pricing_vehicle_rates_sedan\` numeric,
  	\`pricing_vehicle_rates_ertiga\` numeric,
  	\`pricing_vehicle_rates_crysta\` numeric,
  	\`summary\` text,
  	\`overview\` text,
  	\`travel_note\` text,
  	\`best_time\` text,
  	\`vehicle\` text,
  	\`tour_type\` text,
  	\`max_altitude\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`packages_slug_idx\` ON \`packages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`packages_image_idx\` ON \`packages\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`packages_hero_image_idx\` ON \`packages\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`packages_updated_at_idx\` ON \`packages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`packages_created_at_idx\` ON \`packages\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`packages__status_idx\` ON \`packages\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_packages_v_version_itinerary\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`item\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_packages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_packages_v_version_itinerary_order_idx\` ON \`_packages_v_version_itinerary\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_packages_v_version_itinerary_parent_id_idx\` ON \`_packages_v_version_itinerary\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_packages_v_version_hidden_itinerary\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`item\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_packages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_packages_v_version_hidden_itinerary_order_idx\` ON \`_packages_v_version_hidden_itinerary\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_packages_v_version_hidden_itinerary_parent_id_idx\` ON \`_packages_v_version_hidden_itinerary\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_packages_v_version_includes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`item\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_packages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_packages_v_version_includes_order_idx\` ON \`_packages_v_version_includes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_packages_v_version_includes_parent_id_idx\` ON \`_packages_v_version_includes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_packages_v_version_exclusions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`item\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_packages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_packages_v_version_exclusions_order_idx\` ON \`_packages_v_version_exclusions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_packages_v_version_exclusions_parent_id_idx\` ON \`_packages_v_version_exclusions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_packages_v_version_stay_plan\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`item\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_packages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_packages_v_version_stay_plan_order_idx\` ON \`_packages_v_version_stay_plan\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_packages_v_version_stay_plan_parent_id_idx\` ON \`_packages_v_version_stay_plan\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_packages_v_version_highlights\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`item\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_packages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_packages_v_version_highlights_order_idx\` ON \`_packages_v_version_highlights\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_packages_v_version_highlights_parent_id_idx\` ON \`_packages_v_version_highlights\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_packages_v_version_ideal_for\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`item\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_packages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_packages_v_version_ideal_for_order_idx\` ON \`_packages_v_version_ideal_for\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_packages_v_version_ideal_for_parent_id_idx\` ON \`_packages_v_version_ideal_for\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_packages_v_version_faqs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_packages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_packages_v_version_faqs_order_idx\` ON \`_packages_v_version_faqs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_packages_v_version_faqs_parent_id_idx\` ON \`_packages_v_version_faqs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_packages_v_version_itinerary_days_places\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`item\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_packages_v_version_itinerary_days\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_packages_v_version_itinerary_days_places_order_idx\` ON \`_packages_v_version_itinerary_days_places\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_packages_v_version_itinerary_days_places_parent_id_idx\` ON \`_packages_v_version_itinerary_days_places\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_packages_v_version_itinerary_days_details\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_packages_v_version_itinerary_days\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_packages_v_version_itinerary_days_details_order_idx\` ON \`_packages_v_version_itinerary_days_details\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_packages_v_version_itinerary_days_details_parent_id_idx\` ON \`_packages_v_version_itinerary_days_details\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_packages_v_version_itinerary_days\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`day\` numeric,
  	\`title\` text,
  	\`start\` text,
  	\`end\` text,
  	\`stay\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_packages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_packages_v_version_itinerary_days_order_idx\` ON \`_packages_v_version_itinerary_days\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_packages_v_version_itinerary_days_parent_id_idx\` ON \`_packages_v_version_itinerary_days\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_packages_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_slug\` text,
  	\`version_title\` text,
  	\`version_image_id\` integer,
  	\`version_hero_image_id\` integer,
  	\`version_duration\` text,
  	\`version_rating\` numeric,
  	\`version_pickup\` text,
  	\`version_price\` numeric,
  	\`version_popular\` integer DEFAULT false,
  	\`version_pricing_base_price_per_adult\` numeric,
  	\`version_pricing_vehicle_rates_sedan\` numeric,
  	\`version_pricing_vehicle_rates_ertiga\` numeric,
  	\`version_pricing_vehicle_rates_crysta\` numeric,
  	\`version_summary\` text,
  	\`version_overview\` text,
  	\`version_travel_note\` text,
  	\`version_best_time\` text,
  	\`version_vehicle\` text,
  	\`version_tour_type\` text,
  	\`version_max_altitude\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`packages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_packages_v_parent_idx\` ON \`_packages_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_packages_v_version_version_slug_idx\` ON \`_packages_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_packages_v_version_version_image_idx\` ON \`_packages_v\` (\`version_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_packages_v_version_version_hero_image_idx\` ON \`_packages_v\` (\`version_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_packages_v_version_version_updated_at_idx\` ON \`_packages_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_packages_v_version_version_created_at_idx\` ON \`_packages_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_packages_v_version_version__status_idx\` ON \`_packages_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_packages_v_created_at_idx\` ON \`_packages_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_packages_v_updated_at_idx\` ON \`_packages_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_packages_v_latest_idx\` ON \`_packages_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`destinations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`name\` text,
  	\`subtitle\` text,
  	\`description\` text,
  	\`full_description\` text,
  	\`image_id\` integer,
  	\`category\` text,
  	\`layout\` text DEFAULT 'shared',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`destinations_slug_idx\` ON \`destinations\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`destinations_image_idx\` ON \`destinations\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`destinations_updated_at_idx\` ON \`destinations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`destinations_created_at_idx\` ON \`destinations\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`destinations__status_idx\` ON \`destinations\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`destinations_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`destinations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`destinations_rels_order_idx\` ON \`destinations_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`destinations_rels_parent_idx\` ON \`destinations_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`destinations_rels_path_idx\` ON \`destinations_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`destinations_rels_media_id_idx\` ON \`destinations_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`_destinations_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_slug\` text,
  	\`version_name\` text,
  	\`version_subtitle\` text,
  	\`version_description\` text,
  	\`version_full_description\` text,
  	\`version_image_id\` integer,
  	\`version_category\` text,
  	\`version_layout\` text DEFAULT 'shared',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`destinations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_destinations_v_parent_idx\` ON \`_destinations_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_destinations_v_version_version_slug_idx\` ON \`_destinations_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_destinations_v_version_version_image_idx\` ON \`_destinations_v\` (\`version_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_destinations_v_version_version_updated_at_idx\` ON \`_destinations_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_destinations_v_version_version_created_at_idx\` ON \`_destinations_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_destinations_v_version_version__status_idx\` ON \`_destinations_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_destinations_v_created_at_idx\` ON \`_destinations_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_destinations_v_updated_at_idx\` ON \`_destinations_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_destinations_v_latest_idx\` ON \`_destinations_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_destinations_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_destinations_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_destinations_v_rels_order_idx\` ON \`_destinations_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_destinations_v_rels_parent_idx\` ON \`_destinations_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_destinations_v_rels_path_idx\` ON \`_destinations_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_destinations_v_rels_media_id_idx\` ON \`_destinations_v_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`testimonials\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`city\` text NOT NULL,
  	\`tour\` text NOT NULL,
  	\`review\` text NOT NULL,
  	\`rating\` numeric NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`testimonials_updated_at_idx\` ON \`testimonials\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`testimonials_created_at_idx\` ON \`testimonials\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`gallery_items\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`category\` text NOT NULL,
  	\`location\` text NOT NULL,
  	\`size\` text DEFAULT 'normal' NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`caption\` text NOT NULL,
  	\`order\` numeric DEFAULT 0 NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`gallery_items_image_idx\` ON \`gallery_items\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`gallery_items_order_idx\` ON \`gallery_items\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`gallery_items_updated_at_idx\` ON \`gallery_items\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`gallery_items_created_at_idx\` ON \`gallery_items\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`experiences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`icon\` text NOT NULL,
  	\`order\` numeric DEFAULT 0 NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`experiences_image_idx\` ON \`experiences\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`experiences_order_idx\` ON \`experiences\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`experiences_updated_at_idx\` ON \`experiences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`experiences_created_at_idx\` ON \`experiences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	\`sizes_card_url\` text,
  	\`sizes_card_width\` numeric,
  	\`sizes_card_height\` numeric,
  	\`sizes_card_mime_type\` text,
  	\`sizes_card_filesize\` numeric,
  	\`sizes_card_filename\` text,
  	\`sizes_hero_url\` text,
  	\`sizes_hero_width\` numeric,
  	\`sizes_hero_height\` numeric,
  	\`sizes_hero_mime_type\` text,
  	\`sizes_hero_filesize\` numeric,
  	\`sizes_hero_filename\` text,
  	\`sizes_og_url\` text,
  	\`sizes_og_width\` numeric,
  	\`sizes_og_height\` numeric,
  	\`sizes_og_mime_type\` text,
  	\`sizes_og_filesize\` numeric,
  	\`sizes_og_filename\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_card_sizes_card_filename_idx\` ON \`media\` (\`sizes_card_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_hero_sizes_hero_filename_idx\` ON \`media\` (\`sizes_hero_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_og_sizes_og_filename_idx\` ON \`media\` (\`sizes_og_filename\`);`)
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`role\` text DEFAULT 'editor' NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`reset_password_requested_at\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`packages_id\` integer,
  	\`destinations_id\` integer,
  	\`testimonials_id\` integer,
  	\`gallery_items_id\` integer,
  	\`experiences_id\` integer,
  	\`media_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`packages_id\`) REFERENCES \`packages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`destinations_id\`) REFERENCES \`destinations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`testimonials_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`gallery_items_id\`) REFERENCES \`gallery_items\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`experiences_id\`) REFERENCES \`experiences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_packages_id_idx\` ON \`payload_locked_documents_rels\` (\`packages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_destinations_id_idx\` ON \`payload_locked_documents_rels\` (\`destinations_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_testimonials_id_idx\` ON \`payload_locked_documents_rels\` (\`testimonials_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_gallery_items_id_idx\` ON \`payload_locked_documents_rels\` (\`gallery_items_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_experiences_id_idx\` ON \`payload_locked_documents_rels\` (\`experiences_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`pricing_settings_stay_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`delta\` numeric NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pricing_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pricing_settings_stay_options_order_idx\` ON \`pricing_settings_stay_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pricing_settings_stay_options_parent_id_idx\` ON \`pricing_settings_stay_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pricing_settings_meal_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`delta\` numeric NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pricing_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pricing_settings_meal_options_order_idx\` ON \`pricing_settings_meal_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pricing_settings_meal_options_parent_id_idx\` ON \`pricing_settings_meal_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pricing_settings_vehicle_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`key\` text NOT NULL,
  	\`per_day_upgrade\` numeric DEFAULT 0 NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pricing_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pricing_settings_vehicle_options_order_idx\` ON \`pricing_settings_vehicle_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pricing_settings_vehicle_options_parent_id_idx\` ON \`pricing_settings_vehicle_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pricing_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`gst_percent\` numeric DEFAULT 5 NOT NULL,
  	\`child_free_under_age\` numeric DEFAULT 5 NOT NULL,
  	\`child_percent_of_adult\` numeric DEFAULT 25 NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`site_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`phone_display\` text,
  	\`phone_e164\` text,
  	\`whatsapp\` text,
  	\`email\` text,
  	\`instagram\` text,
  	\`facebook\` text,
  	\`tagline\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`packages_itinerary\`;`)
  await db.run(sql`DROP TABLE \`packages_hidden_itinerary\`;`)
  await db.run(sql`DROP TABLE \`packages_includes\`;`)
  await db.run(sql`DROP TABLE \`packages_exclusions\`;`)
  await db.run(sql`DROP TABLE \`packages_stay_plan\`;`)
  await db.run(sql`DROP TABLE \`packages_highlights\`;`)
  await db.run(sql`DROP TABLE \`packages_ideal_for\`;`)
  await db.run(sql`DROP TABLE \`packages_faqs\`;`)
  await db.run(sql`DROP TABLE \`packages_itinerary_days_places\`;`)
  await db.run(sql`DROP TABLE \`packages_itinerary_days_details\`;`)
  await db.run(sql`DROP TABLE \`packages_itinerary_days\`;`)
  await db.run(sql`DROP TABLE \`packages\`;`)
  await db.run(sql`DROP TABLE \`_packages_v_version_itinerary\`;`)
  await db.run(sql`DROP TABLE \`_packages_v_version_hidden_itinerary\`;`)
  await db.run(sql`DROP TABLE \`_packages_v_version_includes\`;`)
  await db.run(sql`DROP TABLE \`_packages_v_version_exclusions\`;`)
  await db.run(sql`DROP TABLE \`_packages_v_version_stay_plan\`;`)
  await db.run(sql`DROP TABLE \`_packages_v_version_highlights\`;`)
  await db.run(sql`DROP TABLE \`_packages_v_version_ideal_for\`;`)
  await db.run(sql`DROP TABLE \`_packages_v_version_faqs\`;`)
  await db.run(sql`DROP TABLE \`_packages_v_version_itinerary_days_places\`;`)
  await db.run(sql`DROP TABLE \`_packages_v_version_itinerary_days_details\`;`)
  await db.run(sql`DROP TABLE \`_packages_v_version_itinerary_days\`;`)
  await db.run(sql`DROP TABLE \`_packages_v\`;`)
  await db.run(sql`DROP TABLE \`destinations\`;`)
  await db.run(sql`DROP TABLE \`destinations_rels\`;`)
  await db.run(sql`DROP TABLE \`_destinations_v\`;`)
  await db.run(sql`DROP TABLE \`_destinations_v_rels\`;`)
  await db.run(sql`DROP TABLE \`testimonials\`;`)
  await db.run(sql`DROP TABLE \`gallery_items\`;`)
  await db.run(sql`DROP TABLE \`experiences\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`pricing_settings_stay_options\`;`)
  await db.run(sql`DROP TABLE \`pricing_settings_meal_options\`;`)
  await db.run(sql`DROP TABLE \`pricing_settings_vehicle_options\`;`)
  await db.run(sql`DROP TABLE \`pricing_settings\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
}
