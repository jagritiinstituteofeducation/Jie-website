import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { resendAdapter } from '@payloadcms/email-resend'
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

const databaseUri = process.env.DATABASE_URI || ''

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
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
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
})
