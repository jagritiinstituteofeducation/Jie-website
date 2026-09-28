# Jagriti Institute of Education website

Next.js 16 website with **Payload CMS 3** (admin panel at `/admin`), **Neon** Postgres as the database and **Resend** for emails.
It is the same design as the original single-file site (`jie-website/index.html`); every course, photo, phone number and FAQ is now edited in the admin panel instead of in code.

## What's inside

| Area | Where |
| --- | --- |
| Website pages: Home, About, Courses, Course detail, Gallery, Scholarship, Admission, Contact | `src/app/(frontend)` |
| Admin panel and REST/GraphQL API | `src/app/(payload)` → `/admin`, `/api` |
| Content types: Courses (skill + academic), Team, Testimonials, Gallery, FAQs, Media | `src/collections` |
| Leads from the forms: Enquiries, Scholarship registrations, Admission applications (+ uploaded documents) | `src/collections/Leads.ts` |
| Site Settings: phones, WhatsApp, hours, address, Director, stats, partners, scholarship slabs, alert emails | `src/globals/SiteSettings.ts` |
| Form handling (validation, spam trap, saving) | `src/app/(frontend)/actions.ts` |
| Email alerts + confirmations (Resend) | `src/emails/notify.ts` |
| First-time content + photos | `src/seed`, `seed-media/` |

How a form works: the visitor submits → a server action validates it and saves it in Neon → the collection hook emails the staff (addresses in **Site Settings → Notifications**) and, if the visitor gave an email, sends them a confirmation. Leads and uploaded documents are visible only to logged-in staff.

## 1. Requirements

- Node.js 20.9 or newer (22 LTS recommended): https://nodejs.org
- A Neon account: https://neon.tech
- A Resend account with your domain verified: https://resend.com

## 2. Set up the services

**Neon**
1. Create a project (region: Singapore / `aws-ap-southeast-1` is closest to Delhi).
2. Open **Connect**, turn on **Connection pooling**, and copy the connection string. It looks like
   `postgresql://…@ep-xxxx-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require`.

**Resend**
1. **Domains → Add domain** → `jagritiie.com`, then add the DNS records Resend shows you at your domain registrar and wait for “Verified”.
2. **API Keys → Create API key** (sending access).

## 3. Configure

```bash
npm install
```

Copy `.env.example` to `.env` and fill in:

| Variable | Value |
| --- | --- |
| `DATABASE_URI` | Neon pooled connection string |
| `PAYLOAD_SECRET` | a long random string (`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`) |
| `NEXT_PUBLIC_SERVER_URL` | `http://localhost:3000` locally, `https://jagritiie.com` in production |
| `RESEND_API_KEY` | your Resend key |
| `EMAIL_FROM_ADDRESS` / `EMAIL_FROM_NAME` | e.g. `admissions@jagritiie.com` / `Jagriti Institute of Education` (must be on the verified domain) |
| `ADMIN_NOTIFY_EMAIL` | where lead alerts go if Site Settings has none (comma-separate several) |

Without `RESEND_API_KEY`, emails are printed in the terminal instead of sent. Useful while testing.

## 4. Create the database and load the content

```bash
npm run migrate   # creates all tables in Neon
npm run seed      # adds the 32 courses/programmes, team, testimonials, gallery, FAQs, settings and photos
npm run dev       # http://localhost:3000
```

Open http://localhost:3000/admin and create the first admin account (your email + a strong password).
The seed only runs on an empty database, so it never overwrites edits made in the admin panel.

## 5. Everyday editing (no code)

- **Courses → Courses**: add or edit a course or academic programme. Type decides where it shows (Long / Short / Academic). Untick *Show on website* to hide one.
- **Content → Team / Testimonials / Gallery / FAQs**: photos are uploaded here. Tick *Show under “Our toppers”* on a gallery photo to list it on the Scholarship page.
- **Settings → Site Settings**: phone numbers, WhatsApp number, office hours, address, Director photo and message, home-page numbers, partners, scholarship slabs, and who receives lead emails.
- **Leads**: every enquiry, scholarship registration and admission application, with a status and staff notes. Uploaded ID proofs / photos / marksheets are in **Leads → Documents**.

## 6. Deploy (Vercel recommended)

1. Push this folder to a GitHub repository (the `.env` file is ignored and must not be committed).
2. Import it in Vercel, add the same environment variables (with `NEXT_PUBLIC_SERVER_URL=https://your-domain`), and deploy. Pending migrations run automatically when the production server starts.
3. **Uploads:** Vercel's disk is temporary, so uploaded images and documents need cloud storage in production. Add Payload's Vercel Blob storage plugin (`@payloadcms/storage-vercel-blob`) or the S3 plugin (`@payloadcms/storage-s3`) for the `media` and `documents` collections before going live, then re-run the seed or re-upload photos. On a normal VPS/Node host (e.g. `npm run build && npm start` behind Nginx) the local `media/` and `private-uploads/` folders work as they are; back them up.

## Changing the content model

After editing anything in `src/collections` or `src/globals`:

```bash
npm run generate:types          # updates src/payload-types.ts
npm run migrate:create my-change  # writes a migration for Neon
npm run migrate                 # applies it (production applies it automatically on start)
```

## Try it without Neon (local only)

Set `DATABASE_URI=file:./local.db` in `.env` to run on a local SQLite file, then `npm run seed` and `npm run dev`.
This is only for trying the site on your own computer. Production must use Neon.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | start the site locally with hot reload |
| `npm run build` / `npm start` | production build / start |
| `npm run seed` | fill an empty database with the original site's content |
| `npm run migrate` | apply database migrations |
| `npm run migrate:create <name>` | create a migration after changing collections |
| `npm run generate:types` | regenerate TypeScript types from the CMS schema |
| `npm run typecheck` | TypeScript check |
