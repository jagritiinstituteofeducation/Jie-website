import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" ADD COLUMN "about_hero_background_id" integer;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_about_hero_background_id_media_id_fk" FOREIGN KEY ("about_hero_background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "site_settings_about_about_hero_background_idx" ON "site_settings" USING btree ("about_hero_background_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_about_hero_background_id_media_id_fk";
  
  DROP INDEX "site_settings_about_about_hero_background_idx";
  ALTER TABLE "site_settings" DROP COLUMN "about_hero_background_id";`)
}
