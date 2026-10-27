import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // A row saved before the date became required takes the default first.
  await db.execute(sql`
   ALTER TABLE "legal_settings" ALTER COLUMN "effective_date" SET DEFAULT '2026-10-27T00:00:00.000Z';
  UPDATE "legal_settings" SET "effective_date" = '2026-10-27T00:00:00.000Z' WHERE "effective_date" IS NULL;
  ALTER TABLE "legal_settings" ALTER COLUMN "effective_date" SET NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "legal_settings" ALTER COLUMN "effective_date" DROP DEFAULT;
  ALTER TABLE "legal_settings" ALTER COLUMN "effective_date" DROP NOT NULL;`)
}
