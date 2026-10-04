import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "university_programs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"faculty" varchar NOT NULL,
  	"code" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"specialization" varchar,
  	"duration" varchar,
  	"eligibility" varchar,
  	"fees" varchar,
  	"existing_course_id" integer,
  	"order" numeric DEFAULT 0,
  	"show_on_website" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "university_programs_id" integer;
  ALTER TABLE "university_programs" ADD CONSTRAINT "university_programs_existing_course_id_courses_id_fk" FOREIGN KEY ("existing_course_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "university_programs_faculty_idx" ON "university_programs" USING btree ("faculty");
  CREATE INDEX "university_programs_existing_course_idx" ON "university_programs" USING btree ("existing_course_id");
  CREATE INDEX "university_programs_updated_at_idx" ON "university_programs" USING btree ("updated_at");
  CREATE INDEX "university_programs_created_at_idx" ON "university_programs" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_university_programs_fk" FOREIGN KEY ("university_programs_id") REFERENCES "public"."university_programs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_university_programs_id_idx" ON "payload_locked_documents_rels" USING btree ("university_programs_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "university_programs" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "university_programs" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_university_programs_fk";
  
  DROP INDEX "payload_locked_documents_rels_university_programs_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "university_programs_id";`)
}
