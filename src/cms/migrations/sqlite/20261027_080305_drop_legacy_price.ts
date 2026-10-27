import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // `pricing.basePricePerAdult` becomes the only price. Copy the legacy
  // price into it wherever it is still empty, so no package loses its price.
  await db.run(sql`UPDATE \`packages\` SET \`pricing_base_price_per_adult\` = \`price\` WHERE \`pricing_base_price_per_adult\` IS NULL;`)
  await db.run(sql`UPDATE \`_packages_v\` SET \`version_pricing_base_price_per_adult\` = \`version_price\` WHERE \`version_pricing_base_price_per_adult\` IS NULL;`)
  await db.run(sql`ALTER TABLE \`packages\` DROP COLUMN \`price\`;`)
  await db.run(sql`ALTER TABLE \`_packages_v\` DROP COLUMN \`version_price\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`packages\` ADD \`price\` numeric;`)
  await db.run(sql`ALTER TABLE \`_packages_v\` ADD \`version_price\` numeric;`)
  await db.run(sql`UPDATE \`packages\` SET \`price\` = \`pricing_base_price_per_adult\`;`)
  await db.run(sql`UPDATE \`_packages_v\` SET \`version_price\` = \`version_pricing_base_price_per_adult\`;`)
}
