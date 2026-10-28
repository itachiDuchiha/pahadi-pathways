import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_gallery_items\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`category\` text NOT NULL,
  	\`location\` text NOT NULL,
  	\`size\` text DEFAULT 'normal' NOT NULL,
  	\`kind\` text DEFAULT 'image' NOT NULL,
  	\`image_id\` integer,
  	\`video_id\` integer,
  	\`poster_id\` integer,
  	\`caption\` text,
  	\`order\` numeric DEFAULT 0 NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`video_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  // Existing rows are images: \`kind\` takes its default and the new relations stay empty.
  await db.run(sql`INSERT INTO \`__new_gallery_items\`("id", "title", "category", "location", "size", "image_id", "caption", "order", "updated_at", "created_at") SELECT "id", "title", "category", "location", "size", "image_id", "caption", "order", "updated_at", "created_at" FROM \`gallery_items\`;`)
  await db.run(sql`DROP TABLE \`gallery_items\`;`)
  await db.run(sql`ALTER TABLE \`__new_gallery_items\` RENAME TO \`gallery_items\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`gallery_items_image_idx\` ON \`gallery_items\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`gallery_items_video_idx\` ON \`gallery_items\` (\`video_id\`);`)
  await db.run(sql`CREATE INDEX \`gallery_items_poster_idx\` ON \`gallery_items\` (\`poster_id\`);`)
  await db.run(sql`CREATE INDEX \`gallery_items_order_idx\` ON \`gallery_items\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`gallery_items_updated_at_idx\` ON \`gallery_items\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`gallery_items_created_at_idx\` ON \`gallery_items\` (\`created_at\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // The old schema requires an image, so video items without one are removed.
  await db.run(sql`DELETE FROM \`gallery_items\` WHERE \`image_id\` IS NULL;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_gallery_items\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`category\` text NOT NULL,
  	\`location\` text NOT NULL,
  	\`size\` text DEFAULT 'normal' NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`caption\` text,
  	\`order\` numeric DEFAULT 0 NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_gallery_items\`("id", "title", "category", "location", "size", "image_id", "caption", "order", "updated_at", "created_at") SELECT "id", "title", "category", "location", "size", "image_id", "caption", "order", "updated_at", "created_at" FROM \`gallery_items\`;`)
  await db.run(sql`DROP TABLE \`gallery_items\`;`)
  await db.run(sql`ALTER TABLE \`__new_gallery_items\` RENAME TO \`gallery_items\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`gallery_items_image_idx\` ON \`gallery_items\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`gallery_items_order_idx\` ON \`gallery_items\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`gallery_items_updated_at_idx\` ON \`gallery_items\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`gallery_items_created_at_idx\` ON \`gallery_items\` (\`created_at\`);`)
}
