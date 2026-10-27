import { randomBytes } from 'node:crypto'

import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/*
  Stay and meal options move from a flat per-adult delta to a delta per
  adult per night, with optional per-package lists.

  Data conversion:
  - The five seeded packages get their own lists: each site-wide option's
    old flat delta divided by the package's nights, unrounded, so their
    quotes stay exactly the same. Every version of those packages gets the
    same rows, so the admin edits and restores keep them.
  - The site-wide options get round per-night defaults for new packages:
    Deluxe 0, Premium 300, Luxury 600, MAP 0, CP -300. An option with any
    other label gets its old delta divided by 8, rounded.
*/

const SEEDED_SLUGS = [
  'shimla-kinnaur-spiti-chandratal',
  'shimla-manali-getaway',
  'himachal-grand-circuit',
  'shimla-manali-jibhi',
  'shimla-kinnaur-spiti-kalpa',
]

const STAY_DEFAULTS: Record<string, [perNight: number, flat: number]> = {
  Deluxe: [0, 0],
  Premium: [300, 2500],
  Luxury: [600, 5000],
}

const MEAL_DEFAULTS: Record<string, [perNight: number, flat: number]> = {
  'Breakfast + Dinner (MAP)': [0, 0],
  'Breakfast Only (CP)': [-300, -2500],
}

/** The app's rule: the N count in the duration, else days - 1, at least 1. */
function nightsOf(duration: string): number {
  const nights = Number(duration.match(/(\d+)\s*N/i)?.[1])
  const days = Number(duration.match(/(\d+)\s*D/i)?.[1])
  return Math.max(1, nights || days - 1 || 1)
}

type Option = { label: string; delta: number }
type Db = MigrateUpArgs['db']

async function options(db: Db, table: 'stay' | 'meal'): Promise<Option[]> {
  const query =
    table === 'stay'
      ? sql`SELECT "label", "delta_per_night" AS "delta" FROM "pricing_settings_stay_options" ORDER BY "_order"`
      : sql`SELECT "label", "delta_per_night" AS "delta" FROM "pricing_settings_meal_options" ORDER BY "_order"`
  const { rows } = await db.execute(query)
  return rows.map((row) => ({ label: String(row.label ?? ''), delta: Number(row.delta ?? 0) }))
}

async function seedPackageOptions(db: Db, stay: Option[], meals: Option[]): Promise<void> {
  const { rows: packages } = await db.execute(
    sql`SELECT "id", "duration" FROM "packages" WHERE "slug" IN ${SEEDED_SLUGS}`
  )

  for (const pkg of packages) {
    const id = Number(pkg.id)
    const nights = nightsOf(String(pkg.duration ?? ''))
    const rows = (list: Option[]) =>
      list.map((option, order) => ({
        order: order + 1,
        uuid: randomBytes(12).toString('hex'),
        label: option.label,
        perNight: option.delta / nights,
      }))
    const stayRows = rows(stay)
    const mealRows = rows(meals)

    for (const row of stayRows) {
      await db.execute(sql`INSERT INTO "packages_pricing_stay_options" ("_order", "_parent_id", "id", "label", "delta_per_night") VALUES (${row.order}, ${id}, ${row.uuid}, ${row.label}, ${row.perNight})`)
    }
    for (const row of mealRows) {
      await db.execute(sql`INSERT INTO "packages_pricing_meal_options" ("_order", "_parent_id", "id", "label", "delta_per_night") VALUES (${row.order}, ${id}, ${row.uuid}, ${row.label}, ${row.perNight})`)
    }

    const { rows: versions } = await db.execute(sql`SELECT "id" FROM "_packages_v" WHERE "parent_id" = ${id}`)
    for (const version of versions) {
      const versionId = Number(version.id)
      for (const row of stayRows) {
        await db.execute(sql`INSERT INTO "_packages_v_version_pricing_stay_options" ("_order", "_parent_id", "label", "delta_per_night", "_uuid") VALUES (${row.order}, ${versionId}, ${row.label}, ${row.perNight}, ${row.uuid})`)
      }
      for (const row of mealRows) {
        await db.execute(sql`INSERT INTO "_packages_v_version_pricing_meal_options" ("_order", "_parent_id", "label", "delta_per_night", "_uuid") VALUES (${row.order}, ${versionId}, ${row.label}, ${row.perNight}, ${row.uuid})`)
      }
    }
  }
}

/** Rewrites each site-wide option: known labels to `pick` of their pair, others with `fallback`. */
async function convertGlobals(
  db: Db,
  pick: 0 | 1,
  fallback: (delta: number) => number
): Promise<void> {
  for (const [table, defaults] of [
    ['stay', STAY_DEFAULTS],
    ['meal', MEAL_DEFAULTS],
  ] as const) {
    for (const option of await options(db, table)) {
      const known = defaults[option.label.trim()]
      const value = known ? known[pick] : fallback(option.delta)
      if (table === 'stay') {
        await db.execute(sql`UPDATE "pricing_settings_stay_options" SET "delta_per_night" = ${value} WHERE "label" = ${option.label}`)
      } else {
        await db.execute(sql`UPDATE "pricing_settings_meal_options" SET "delta_per_night" = ${value} WHERE "label" = ${option.label}`)
      }
    }
  }
}

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "packages_pricing_stay_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"delta_per_night" numeric
  );
  
  CREATE TABLE "packages_pricing_meal_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"delta_per_night" numeric
  );
  
  CREATE TABLE "_packages_v_version_pricing_stay_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"delta_per_night" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_packages_v_version_pricing_meal_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"delta_per_night" numeric,
  	"_uuid" varchar
  );
  
  ALTER TABLE "pricing_settings_stay_options" RENAME COLUMN "delta" TO "delta_per_night";
  ALTER TABLE "pricing_settings_meal_options" RENAME COLUMN "delta" TO "delta_per_night";
  ALTER TABLE "packages_pricing_stay_options" ADD CONSTRAINT "packages_pricing_stay_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "packages_pricing_meal_options" ADD CONSTRAINT "packages_pricing_meal_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_packages_v_version_pricing_stay_options" ADD CONSTRAINT "_packages_v_version_pricing_stay_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_packages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_packages_v_version_pricing_meal_options" ADD CONSTRAINT "_packages_v_version_pricing_meal_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_packages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "packages_pricing_stay_options_order_idx" ON "packages_pricing_stay_options" USING btree ("_order");
  CREATE INDEX "packages_pricing_stay_options_parent_id_idx" ON "packages_pricing_stay_options" USING btree ("_parent_id");
  CREATE INDEX "packages_pricing_meal_options_order_idx" ON "packages_pricing_meal_options" USING btree ("_order");
  CREATE INDEX "packages_pricing_meal_options_parent_id_idx" ON "packages_pricing_meal_options" USING btree ("_parent_id");
  CREATE INDEX "_packages_v_version_pricing_stay_options_order_idx" ON "_packages_v_version_pricing_stay_options" USING btree ("_order");
  CREATE INDEX "_packages_v_version_pricing_stay_options_parent_id_idx" ON "_packages_v_version_pricing_stay_options" USING btree ("_parent_id");
  CREATE INDEX "_packages_v_version_pricing_meal_options_order_idx" ON "_packages_v_version_pricing_meal_options" USING btree ("_order");
  CREATE INDEX "_packages_v_version_pricing_meal_options_parent_id_idx" ON "_packages_v_version_pricing_meal_options" USING btree ("_parent_id");`)

  // The renamed columns still hold the flat deltas here.
  await seedPackageOptions(db, await options(db, 'stay'), await options(db, 'meal'))
  await convertGlobals(db, 0, (delta) => Math.round(delta / 8))
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Back to flat deltas; the per-package lists are dropped with their tables.
  await convertGlobals(db, 1, (perNight) => perNight * 8)
  await db.execute(sql`
   DROP TABLE "packages_pricing_stay_options" CASCADE;
  DROP TABLE "packages_pricing_meal_options" CASCADE;
  DROP TABLE "_packages_v_version_pricing_stay_options" CASCADE;
  DROP TABLE "_packages_v_version_pricing_meal_options" CASCADE;
  ALTER TABLE "pricing_settings_stay_options" RENAME COLUMN "delta_per_night" TO "delta";
  ALTER TABLE "pricing_settings_meal_options" RENAME COLUMN "delta_per_night" TO "delta";`)
}
