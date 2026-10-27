import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // A Sedan rate equal to the base price pins the Sedan quote, so a later
  // base-price change never reached it. Clear those rates; an empty Sedan
  // rate falls back to the base price.
  await db.execute(sql`
   UPDATE "packages" SET "pricing_vehicle_rates_sedan" = NULL WHERE "pricing_vehicle_rates_sedan" = "pricing_base_price_per_adult";
  UPDATE "_packages_v" SET "version_pricing_vehicle_rates_sedan" = NULL WHERE "version_pricing_vehicle_rates_sedan" = "version_pricing_base_price_per_adult";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Data-only: the cleared rates equalled the base price, so nothing to restore.
}
