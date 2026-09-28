import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "site_settings_home_rotating_words" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"word" varchar NOT NULL
  );
  
  ALTER TABLE "site_settings" ADD COLUMN "home_hero_background_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "home_banner_background_id" integer;
  ALTER TABLE "site_settings_home_rotating_words" ADD CONSTRAINT "site_settings_home_rotating_words_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "site_settings_home_rotating_words_order_idx" ON "site_settings_home_rotating_words" USING btree ("_order");
  CREATE INDEX "site_settings_home_rotating_words_parent_id_idx" ON "site_settings_home_rotating_words" USING btree ("_parent_id");
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_home_hero_background_id_media_id_fk" FOREIGN KEY ("home_hero_background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_home_banner_background_id_media_id_fk" FOREIGN KEY ("home_banner_background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "site_settings_home_home_hero_background_idx" ON "site_settings" USING btree ("home_hero_background_id");
  CREATE INDEX "site_settings_home_home_banner_background_idx" ON "site_settings" USING btree ("home_banner_background_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings_home_rotating_words" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "site_settings_home_rotating_words" CASCADE;
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_home_hero_background_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_home_banner_background_id_media_id_fk";
  
  DROP INDEX "site_settings_home_home_hero_background_idx";
  DROP INDEX "site_settings_home_home_banner_background_idx";
  ALTER TABLE "site_settings" DROP COLUMN "home_hero_background_id";
  ALTER TABLE "site_settings" DROP COLUMN "home_banner_background_id";`)
}
