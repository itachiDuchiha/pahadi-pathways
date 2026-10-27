import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_packages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__packages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_destinations_category" AS ENUM('Featured Journeys', 'Along the Way', 'Hidden Himachal', 'Culture & Soul');
  CREATE TYPE "public"."enum_destinations_layout" AS ENUM('dedicated', 'shared');
  CREATE TYPE "public"."enum_destinations_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__destinations_v_version_category" AS ENUM('Featured Journeys', 'Along the Way', 'Hidden Himachal', 'Culture & Soul');
  CREATE TYPE "public"."enum__destinations_v_version_layout" AS ENUM('dedicated', 'shared');
  CREATE TYPE "public"."enum__destinations_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_gallery_items_size" AS ENUM('normal', 'large');
  CREATE TYPE "public"."enum_experiences_icon" AS ENUM('Camera', 'Compass', 'Footprints', 'Home', 'Landmark', 'Mountain', 'Star', 'Utensils');
  CREATE TYPE "public"."enum_enquiries_source" AS ENUM('trip', 'contact', 'package');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_pricing_settings_vehicle_options_key" AS ENUM('sedan', 'ertiga', 'crysta');
  CREATE TABLE "packages_itinerary" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "packages_hidden_itinerary" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "packages_includes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "packages_exclusions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "packages_stay_plan" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "packages_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "packages_ideal_for" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "packages_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "packages_itinerary_days_places" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "packages_itinerary_days_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "packages_itinerary_days" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"day" numeric,
  	"title" varchar,
  	"start" varchar,
  	"end" varchar,
  	"stay" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "packages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"title" varchar,
  	"image_id" integer,
  	"hero_image_id" integer,
  	"duration" varchar,
  	"rating" numeric,
  	"pickup" varchar,
  	"popular" boolean DEFAULT false,
  	"pricing_base_price_per_adult" numeric,
  	"pricing_vehicle_rates_sedan" numeric,
  	"pricing_vehicle_rates_ertiga" numeric,
  	"pricing_vehicle_rates_crysta" numeric,
  	"summary" varchar,
  	"overview" varchar,
  	"travel_note" varchar,
  	"best_time" varchar,
  	"vehicle" varchar,
  	"tour_type" varchar,
  	"max_altitude" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_packages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_packages_v_version_itinerary" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_packages_v_version_hidden_itinerary" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_packages_v_version_includes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_packages_v_version_exclusions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_packages_v_version_stay_plan" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_packages_v_version_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_packages_v_version_ideal_for" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_packages_v_version_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_packages_v_version_itinerary_days_places" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_packages_v_version_itinerary_days_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_packages_v_version_itinerary_days" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"day" numeric,
  	"title" varchar,
  	"start" varchar,
  	"end" varchar,
  	"stay" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_packages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_title" varchar,
  	"version_image_id" integer,
  	"version_hero_image_id" integer,
  	"version_duration" varchar,
  	"version_rating" numeric,
  	"version_pickup" varchar,
  	"version_popular" boolean DEFAULT false,
  	"version_pricing_base_price_per_adult" numeric,
  	"version_pricing_vehicle_rates_sedan" numeric,
  	"version_pricing_vehicle_rates_ertiga" numeric,
  	"version_pricing_vehicle_rates_crysta" numeric,
  	"version_summary" varchar,
  	"version_overview" varchar,
  	"version_travel_note" varchar,
  	"version_best_time" varchar,
  	"version_vehicle" varchar,
  	"version_tour_type" varchar,
  	"version_max_altitude" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__packages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "destinations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"name" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"full_description" varchar,
  	"image_id" integer,
  	"category" "enum_destinations_category",
  	"layout" "enum_destinations_layout" DEFAULT 'shared',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_destinations_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "destinations_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_destinations_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_name" varchar,
  	"version_subtitle" varchar,
  	"version_description" varchar,
  	"version_full_description" varchar,
  	"version_image_id" integer,
  	"version_category" "enum__destinations_v_version_category",
  	"version_layout" "enum__destinations_v_version_layout" DEFAULT 'shared',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__destinations_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_destinations_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"city" varchar NOT NULL,
  	"tour" varchar NOT NULL,
  	"review" varchar NOT NULL,
  	"rating" numeric NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "gallery_items" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"category" varchar NOT NULL,
  	"location" varchar NOT NULL,
  	"size" "enum_gallery_items_size" DEFAULT 'normal' NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "experiences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"icon" "enum_experiences_icon" NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "enquiries_selections_child_ages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"age" numeric NOT NULL
  );
  
  CREATE TABLE "enquiries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"source" "enum_enquiries_source" NOT NULL,
  	"name" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"email" varchar,
  	"message" varchar,
  	"travel_date" timestamp(3) with time zone,
  	"destination" varchar,
  	"adults" numeric,
  	"children" numeric,
  	"budget_per_person" numeric,
  	"package_id" integer,
  	"package_slug" varchar,
  	"package_title" varchar,
  	"selections_stay" varchar,
  	"selections_meals" varchar,
  	"selections_vehicle" varchar,
  	"computed_price_package_cost" numeric,
  	"computed_price_gst" numeric,
  	"computed_price_gst_percent" numeric,
  	"computed_price_estimated_total" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"packages_id" integer,
  	"destinations_id" integer,
  	"testimonials_id" integer,
  	"gallery_items_id" integer,
  	"experiences_id" integer,
  	"enquiries_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pricing_settings_stay_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"delta" numeric NOT NULL
  );
  
  CREATE TABLE "pricing_settings_meal_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"delta" numeric NOT NULL
  );
  
  CREATE TABLE "pricing_settings_vehicle_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"key" "enum_pricing_settings_vehicle_options_key" NOT NULL,
  	"per_day_upgrade" numeric DEFAULT 0 NOT NULL,
  	"per_day_upgrade_spiti" numeric
  );
  
  CREATE TABLE "pricing_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"gst_percent" numeric DEFAULT 5 NOT NULL,
  	"child_free_under_age" numeric DEFAULT 5 NOT NULL,
  	"child_percent_of_adult" numeric DEFAULT 25 NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"phone_display" varchar,
  	"phone_e164" varchar,
  	"whatsapp" varchar,
  	"email" varchar,
  	"instagram" varchar,
  	"facebook" varchar,
  	"tagline" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "packages_itinerary" ADD CONSTRAINT "packages_itinerary_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "packages_hidden_itinerary" ADD CONSTRAINT "packages_hidden_itinerary_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "packages_includes" ADD CONSTRAINT "packages_includes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "packages_exclusions" ADD CONSTRAINT "packages_exclusions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "packages_stay_plan" ADD CONSTRAINT "packages_stay_plan_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "packages_highlights" ADD CONSTRAINT "packages_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "packages_ideal_for" ADD CONSTRAINT "packages_ideal_for_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "packages_faqs" ADD CONSTRAINT "packages_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "packages_itinerary_days_places" ADD CONSTRAINT "packages_itinerary_days_places_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."packages_itinerary_days"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "packages_itinerary_days_details" ADD CONSTRAINT "packages_itinerary_days_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."packages_itinerary_days"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "packages_itinerary_days" ADD CONSTRAINT "packages_itinerary_days_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "packages" ADD CONSTRAINT "packages_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "packages" ADD CONSTRAINT "packages_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_packages_v_version_itinerary" ADD CONSTRAINT "_packages_v_version_itinerary_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_packages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_packages_v_version_hidden_itinerary" ADD CONSTRAINT "_packages_v_version_hidden_itinerary_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_packages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_packages_v_version_includes" ADD CONSTRAINT "_packages_v_version_includes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_packages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_packages_v_version_exclusions" ADD CONSTRAINT "_packages_v_version_exclusions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_packages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_packages_v_version_stay_plan" ADD CONSTRAINT "_packages_v_version_stay_plan_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_packages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_packages_v_version_highlights" ADD CONSTRAINT "_packages_v_version_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_packages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_packages_v_version_ideal_for" ADD CONSTRAINT "_packages_v_version_ideal_for_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_packages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_packages_v_version_faqs" ADD CONSTRAINT "_packages_v_version_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_packages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_packages_v_version_itinerary_days_places" ADD CONSTRAINT "_packages_v_version_itinerary_days_places_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_packages_v_version_itinerary_days"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_packages_v_version_itinerary_days_details" ADD CONSTRAINT "_packages_v_version_itinerary_days_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_packages_v_version_itinerary_days"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_packages_v_version_itinerary_days" ADD CONSTRAINT "_packages_v_version_itinerary_days_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_packages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_packages_v" ADD CONSTRAINT "_packages_v_parent_id_packages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."packages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_packages_v" ADD CONSTRAINT "_packages_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_packages_v" ADD CONSTRAINT "_packages_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "destinations" ADD CONSTRAINT "destinations_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "destinations_rels" ADD CONSTRAINT "destinations_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."destinations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "destinations_rels" ADD CONSTRAINT "destinations_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_destinations_v" ADD CONSTRAINT "_destinations_v_parent_id_destinations_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."destinations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_destinations_v" ADD CONSTRAINT "_destinations_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_destinations_v_rels" ADD CONSTRAINT "_destinations_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_destinations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_destinations_v_rels" ADD CONSTRAINT "_destinations_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_items" ADD CONSTRAINT "gallery_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiences" ADD CONSTRAINT "experiences_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "enquiries_selections_child_ages" ADD CONSTRAINT "enquiries_selections_child_ages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."enquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "enquiries" ADD CONSTRAINT "enquiries_package_id_packages_id_fk" FOREIGN KEY ("package_id") REFERENCES "public"."packages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_packages_fk" FOREIGN KEY ("packages_id") REFERENCES "public"."packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_destinations_fk" FOREIGN KEY ("destinations_id") REFERENCES "public"."destinations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_items_fk" FOREIGN KEY ("gallery_items_id") REFERENCES "public"."gallery_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_experiences_fk" FOREIGN KEY ("experiences_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_enquiries_fk" FOREIGN KEY ("enquiries_id") REFERENCES "public"."enquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_settings_stay_options" ADD CONSTRAINT "pricing_settings_stay_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_settings_meal_options" ADD CONSTRAINT "pricing_settings_meal_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_settings_vehicle_options" ADD CONSTRAINT "pricing_settings_vehicle_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "packages_itinerary_order_idx" ON "packages_itinerary" USING btree ("_order");
  CREATE INDEX "packages_itinerary_parent_id_idx" ON "packages_itinerary" USING btree ("_parent_id");
  CREATE INDEX "packages_hidden_itinerary_order_idx" ON "packages_hidden_itinerary" USING btree ("_order");
  CREATE INDEX "packages_hidden_itinerary_parent_id_idx" ON "packages_hidden_itinerary" USING btree ("_parent_id");
  CREATE INDEX "packages_includes_order_idx" ON "packages_includes" USING btree ("_order");
  CREATE INDEX "packages_includes_parent_id_idx" ON "packages_includes" USING btree ("_parent_id");
  CREATE INDEX "packages_exclusions_order_idx" ON "packages_exclusions" USING btree ("_order");
  CREATE INDEX "packages_exclusions_parent_id_idx" ON "packages_exclusions" USING btree ("_parent_id");
  CREATE INDEX "packages_stay_plan_order_idx" ON "packages_stay_plan" USING btree ("_order");
  CREATE INDEX "packages_stay_plan_parent_id_idx" ON "packages_stay_plan" USING btree ("_parent_id");
  CREATE INDEX "packages_highlights_order_idx" ON "packages_highlights" USING btree ("_order");
  CREATE INDEX "packages_highlights_parent_id_idx" ON "packages_highlights" USING btree ("_parent_id");
  CREATE INDEX "packages_ideal_for_order_idx" ON "packages_ideal_for" USING btree ("_order");
  CREATE INDEX "packages_ideal_for_parent_id_idx" ON "packages_ideal_for" USING btree ("_parent_id");
  CREATE INDEX "packages_faqs_order_idx" ON "packages_faqs" USING btree ("_order");
  CREATE INDEX "packages_faqs_parent_id_idx" ON "packages_faqs" USING btree ("_parent_id");
  CREATE INDEX "packages_itinerary_days_places_order_idx" ON "packages_itinerary_days_places" USING btree ("_order");
  CREATE INDEX "packages_itinerary_days_places_parent_id_idx" ON "packages_itinerary_days_places" USING btree ("_parent_id");
  CREATE INDEX "packages_itinerary_days_details_order_idx" ON "packages_itinerary_days_details" USING btree ("_order");
  CREATE INDEX "packages_itinerary_days_details_parent_id_idx" ON "packages_itinerary_days_details" USING btree ("_parent_id");
  CREATE INDEX "packages_itinerary_days_order_idx" ON "packages_itinerary_days" USING btree ("_order");
  CREATE INDEX "packages_itinerary_days_parent_id_idx" ON "packages_itinerary_days" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "packages_slug_idx" ON "packages" USING btree ("slug");
  CREATE INDEX "packages_image_idx" ON "packages" USING btree ("image_id");
  CREATE INDEX "packages_hero_image_idx" ON "packages" USING btree ("hero_image_id");
  CREATE INDEX "packages_updated_at_idx" ON "packages" USING btree ("updated_at");
  CREATE INDEX "packages_created_at_idx" ON "packages" USING btree ("created_at");
  CREATE INDEX "packages__status_idx" ON "packages" USING btree ("_status");
  CREATE INDEX "_packages_v_version_itinerary_order_idx" ON "_packages_v_version_itinerary" USING btree ("_order");
  CREATE INDEX "_packages_v_version_itinerary_parent_id_idx" ON "_packages_v_version_itinerary" USING btree ("_parent_id");
  CREATE INDEX "_packages_v_version_hidden_itinerary_order_idx" ON "_packages_v_version_hidden_itinerary" USING btree ("_order");
  CREATE INDEX "_packages_v_version_hidden_itinerary_parent_id_idx" ON "_packages_v_version_hidden_itinerary" USING btree ("_parent_id");
  CREATE INDEX "_packages_v_version_includes_order_idx" ON "_packages_v_version_includes" USING btree ("_order");
  CREATE INDEX "_packages_v_version_includes_parent_id_idx" ON "_packages_v_version_includes" USING btree ("_parent_id");
  CREATE INDEX "_packages_v_version_exclusions_order_idx" ON "_packages_v_version_exclusions" USING btree ("_order");
  CREATE INDEX "_packages_v_version_exclusions_parent_id_idx" ON "_packages_v_version_exclusions" USING btree ("_parent_id");
  CREATE INDEX "_packages_v_version_stay_plan_order_idx" ON "_packages_v_version_stay_plan" USING btree ("_order");
  CREATE INDEX "_packages_v_version_stay_plan_parent_id_idx" ON "_packages_v_version_stay_plan" USING btree ("_parent_id");
  CREATE INDEX "_packages_v_version_highlights_order_idx" ON "_packages_v_version_highlights" USING btree ("_order");
  CREATE INDEX "_packages_v_version_highlights_parent_id_idx" ON "_packages_v_version_highlights" USING btree ("_parent_id");
  CREATE INDEX "_packages_v_version_ideal_for_order_idx" ON "_packages_v_version_ideal_for" USING btree ("_order");
  CREATE INDEX "_packages_v_version_ideal_for_parent_id_idx" ON "_packages_v_version_ideal_for" USING btree ("_parent_id");
  CREATE INDEX "_packages_v_version_faqs_order_idx" ON "_packages_v_version_faqs" USING btree ("_order");
  CREATE INDEX "_packages_v_version_faqs_parent_id_idx" ON "_packages_v_version_faqs" USING btree ("_parent_id");
  CREATE INDEX "_packages_v_version_itinerary_days_places_order_idx" ON "_packages_v_version_itinerary_days_places" USING btree ("_order");
  CREATE INDEX "_packages_v_version_itinerary_days_places_parent_id_idx" ON "_packages_v_version_itinerary_days_places" USING btree ("_parent_id");
  CREATE INDEX "_packages_v_version_itinerary_days_details_order_idx" ON "_packages_v_version_itinerary_days_details" USING btree ("_order");
  CREATE INDEX "_packages_v_version_itinerary_days_details_parent_id_idx" ON "_packages_v_version_itinerary_days_details" USING btree ("_parent_id");
  CREATE INDEX "_packages_v_version_itinerary_days_order_idx" ON "_packages_v_version_itinerary_days" USING btree ("_order");
  CREATE INDEX "_packages_v_version_itinerary_days_parent_id_idx" ON "_packages_v_version_itinerary_days" USING btree ("_parent_id");
  CREATE INDEX "_packages_v_parent_idx" ON "_packages_v" USING btree ("parent_id");
  CREATE INDEX "_packages_v_version_version_slug_idx" ON "_packages_v" USING btree ("version_slug");
  CREATE INDEX "_packages_v_version_version_image_idx" ON "_packages_v" USING btree ("version_image_id");
  CREATE INDEX "_packages_v_version_version_hero_image_idx" ON "_packages_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_packages_v_version_version_updated_at_idx" ON "_packages_v" USING btree ("version_updated_at");
  CREATE INDEX "_packages_v_version_version_created_at_idx" ON "_packages_v" USING btree ("version_created_at");
  CREATE INDEX "_packages_v_version_version__status_idx" ON "_packages_v" USING btree ("version__status");
  CREATE INDEX "_packages_v_created_at_idx" ON "_packages_v" USING btree ("created_at");
  CREATE INDEX "_packages_v_updated_at_idx" ON "_packages_v" USING btree ("updated_at");
  CREATE INDEX "_packages_v_latest_idx" ON "_packages_v" USING btree ("latest");
  CREATE UNIQUE INDEX "destinations_slug_idx" ON "destinations" USING btree ("slug");
  CREATE INDEX "destinations_image_idx" ON "destinations" USING btree ("image_id");
  CREATE INDEX "destinations_updated_at_idx" ON "destinations" USING btree ("updated_at");
  CREATE INDEX "destinations_created_at_idx" ON "destinations" USING btree ("created_at");
  CREATE INDEX "destinations__status_idx" ON "destinations" USING btree ("_status");
  CREATE INDEX "destinations_rels_order_idx" ON "destinations_rels" USING btree ("order");
  CREATE INDEX "destinations_rels_parent_idx" ON "destinations_rels" USING btree ("parent_id");
  CREATE INDEX "destinations_rels_path_idx" ON "destinations_rels" USING btree ("path");
  CREATE INDEX "destinations_rels_media_id_idx" ON "destinations_rels" USING btree ("media_id");
  CREATE INDEX "_destinations_v_parent_idx" ON "_destinations_v" USING btree ("parent_id");
  CREATE INDEX "_destinations_v_version_version_slug_idx" ON "_destinations_v" USING btree ("version_slug");
  CREATE INDEX "_destinations_v_version_version_image_idx" ON "_destinations_v" USING btree ("version_image_id");
  CREATE INDEX "_destinations_v_version_version_updated_at_idx" ON "_destinations_v" USING btree ("version_updated_at");
  CREATE INDEX "_destinations_v_version_version_created_at_idx" ON "_destinations_v" USING btree ("version_created_at");
  CREATE INDEX "_destinations_v_version_version__status_idx" ON "_destinations_v" USING btree ("version__status");
  CREATE INDEX "_destinations_v_created_at_idx" ON "_destinations_v" USING btree ("created_at");
  CREATE INDEX "_destinations_v_updated_at_idx" ON "_destinations_v" USING btree ("updated_at");
  CREATE INDEX "_destinations_v_latest_idx" ON "_destinations_v" USING btree ("latest");
  CREATE INDEX "_destinations_v_rels_order_idx" ON "_destinations_v_rels" USING btree ("order");
  CREATE INDEX "_destinations_v_rels_parent_idx" ON "_destinations_v_rels" USING btree ("parent_id");
  CREATE INDEX "_destinations_v_rels_path_idx" ON "_destinations_v_rels" USING btree ("path");
  CREATE INDEX "_destinations_v_rels_media_id_idx" ON "_destinations_v_rels" USING btree ("media_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "gallery_items_image_idx" ON "gallery_items" USING btree ("image_id");
  CREATE INDEX "gallery_items_order_idx" ON "gallery_items" USING btree ("order");
  CREATE INDEX "gallery_items_updated_at_idx" ON "gallery_items" USING btree ("updated_at");
  CREATE INDEX "gallery_items_created_at_idx" ON "gallery_items" USING btree ("created_at");
  CREATE INDEX "experiences_image_idx" ON "experiences" USING btree ("image_id");
  CREATE INDEX "experiences_order_idx" ON "experiences" USING btree ("order");
  CREATE INDEX "experiences_updated_at_idx" ON "experiences" USING btree ("updated_at");
  CREATE INDEX "experiences_created_at_idx" ON "experiences" USING btree ("created_at");
  CREATE INDEX "enquiries_selections_child_ages_order_idx" ON "enquiries_selections_child_ages" USING btree ("_order");
  CREATE INDEX "enquiries_selections_child_ages_parent_id_idx" ON "enquiries_selections_child_ages" USING btree ("_parent_id");
  CREATE INDEX "enquiries_source_idx" ON "enquiries" USING btree ("source");
  CREATE INDEX "enquiries_package_idx" ON "enquiries" USING btree ("package_id");
  CREATE INDEX "enquiries_updated_at_idx" ON "enquiries" USING btree ("updated_at");
  CREATE INDEX "enquiries_created_at_idx" ON "enquiries" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_packages_id_idx" ON "payload_locked_documents_rels" USING btree ("packages_id");
  CREATE INDEX "payload_locked_documents_rels_destinations_id_idx" ON "payload_locked_documents_rels" USING btree ("destinations_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_gallery_items_id_idx" ON "payload_locked_documents_rels" USING btree ("gallery_items_id");
  CREATE INDEX "payload_locked_documents_rels_experiences_id_idx" ON "payload_locked_documents_rels" USING btree ("experiences_id");
  CREATE INDEX "payload_locked_documents_rels_enquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("enquiries_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "pricing_settings_stay_options_order_idx" ON "pricing_settings_stay_options" USING btree ("_order");
  CREATE INDEX "pricing_settings_stay_options_parent_id_idx" ON "pricing_settings_stay_options" USING btree ("_parent_id");
  CREATE INDEX "pricing_settings_meal_options_order_idx" ON "pricing_settings_meal_options" USING btree ("_order");
  CREATE INDEX "pricing_settings_meal_options_parent_id_idx" ON "pricing_settings_meal_options" USING btree ("_parent_id");
  CREATE INDEX "pricing_settings_vehicle_options_order_idx" ON "pricing_settings_vehicle_options" USING btree ("_order");
  CREATE INDEX "pricing_settings_vehicle_options_parent_id_idx" ON "pricing_settings_vehicle_options" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "packages_itinerary" CASCADE;
  DROP TABLE "packages_hidden_itinerary" CASCADE;
  DROP TABLE "packages_includes" CASCADE;
  DROP TABLE "packages_exclusions" CASCADE;
  DROP TABLE "packages_stay_plan" CASCADE;
  DROP TABLE "packages_highlights" CASCADE;
  DROP TABLE "packages_ideal_for" CASCADE;
  DROP TABLE "packages_faqs" CASCADE;
  DROP TABLE "packages_itinerary_days_places" CASCADE;
  DROP TABLE "packages_itinerary_days_details" CASCADE;
  DROP TABLE "packages_itinerary_days" CASCADE;
  DROP TABLE "packages" CASCADE;
  DROP TABLE "_packages_v_version_itinerary" CASCADE;
  DROP TABLE "_packages_v_version_hidden_itinerary" CASCADE;
  DROP TABLE "_packages_v_version_includes" CASCADE;
  DROP TABLE "_packages_v_version_exclusions" CASCADE;
  DROP TABLE "_packages_v_version_stay_plan" CASCADE;
  DROP TABLE "_packages_v_version_highlights" CASCADE;
  DROP TABLE "_packages_v_version_ideal_for" CASCADE;
  DROP TABLE "_packages_v_version_faqs" CASCADE;
  DROP TABLE "_packages_v_version_itinerary_days_places" CASCADE;
  DROP TABLE "_packages_v_version_itinerary_days_details" CASCADE;
  DROP TABLE "_packages_v_version_itinerary_days" CASCADE;
  DROP TABLE "_packages_v" CASCADE;
  DROP TABLE "destinations" CASCADE;
  DROP TABLE "destinations_rels" CASCADE;
  DROP TABLE "_destinations_v" CASCADE;
  DROP TABLE "_destinations_v_rels" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "gallery_items" CASCADE;
  DROP TABLE "experiences" CASCADE;
  DROP TABLE "enquiries_selections_child_ages" CASCADE;
  DROP TABLE "enquiries" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "pricing_settings_stay_options" CASCADE;
  DROP TABLE "pricing_settings_meal_options" CASCADE;
  DROP TABLE "pricing_settings_vehicle_options" CASCADE;
  DROP TABLE "pricing_settings" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."enum_packages_status";
  DROP TYPE "public"."enum__packages_v_version_status";
  DROP TYPE "public"."enum_destinations_category";
  DROP TYPE "public"."enum_destinations_layout";
  DROP TYPE "public"."enum_destinations_status";
  DROP TYPE "public"."enum__destinations_v_version_category";
  DROP TYPE "public"."enum__destinations_v_version_layout";
  DROP TYPE "public"."enum__destinations_v_version_status";
  DROP TYPE "public"."enum_gallery_items_size";
  DROP TYPE "public"."enum_experiences_icon";
  DROP TYPE "public"."enum_enquiries_source";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_pricing_settings_vehicle_options_key";`)
}
