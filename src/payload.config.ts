import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { resendAdapter } from '@payloadcms/email-resend'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media, Documents } from './collections/Media'
import { Courses } from './collections/Courses'
import { UniversityPrograms } from './collections/UniversityPrograms'
import { Faculty, Testimonials, Gallery, Faqs } from './collections/Content'
import { Enquiries, ScholarshipRegistrations, Admissions } from './collections/Leads'
import { SiteSettings } from './globals/SiteSettings'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// DATABASE_URI, or the variables Vercel's Neon integration sets automatically.
const databaseUri = process.env.DATABASE_URI || process.env.DATABASE_URL || process.env.POSTGRES_URL || ''

// Public address of the site. On Vercel this falls back to the production domain.
const serverURL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '')

// Neon Postgres in every real environment. In development the schema is pushed
// automatically; for production run `npm run migrate:create` then `npm run migrate` (see README).
// Local-only option: DATABASE_URI=file:./local.db runs on a SQLite file so the site can be
// tried on a laptop before Neon is set up. Never use this in production.
const db = databaseUri.startsWith('file:')
  ? (await import('@payloadcms/db-sqlite')).sqliteAdapter({ client: { url: databaseUri } })
  : postgresAdapter({
      pool: { connectionString: databaseUri },
      // Applies any pending migrations when the production server starts.
      prodMigrations: migrations,
    })

export default buildConfig({
  serverURL,
  secret: process.env.PAYLOAD_SECRET || '',
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' | JIE Admin' },
  },
  collections: [Courses, UniversityPrograms, Faculty, Testimonials, Gallery, Faqs, Media, Enquiries, ScholarshipRegistrations, Admissions, Documents, Users],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db,
  // Resend. Without an API key, emails are printed to the server console instead.
  email: process.env.RESEND_API_KEY
    ? resendAdapter({
        apiKey: process.env.RESEND_API_KEY,
        defaultFromAddress: process.env.EMAIL_FROM_ADDRESS || 'onboarding@resend.dev',
        defaultFromName: process.env.EMAIL_FROM_NAME || 'Jagriti Institute of Education',
      })
    : undefined,
  sharp,
  plugins: [
    // Vercel's disk is temporary, so on Vercel photos and applicant documents are stored in Vercel Blob.
    // Without BLOB_READ_WRITE_TOKEN (local development) files stay in the media/ and private-uploads/ folders.
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      token: process.env.BLOB_READ_WRITE_TOKEN,
      // Random file names, so stored files cannot be guessed. Documents are still served only to signed-in staff.
      addRandomSuffix: true,
      collections: { media: true, documents: true },
    }),
  ],
})
