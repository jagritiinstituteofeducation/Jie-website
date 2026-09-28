import type { CollectionConfig } from 'payload'
import { anyone, loggedIn } from './access'

/** Public images used on the website (logo, photos, gallery, partner logos). */
export const Media: CollectionConfig = {
  slug: 'media',
  admin: { group: 'Content' },
  access: { read: anyone, create: loggedIn, update: loggedIn, delete: loggedIn },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'thumbnail', width: 480 },
      { name: 'card', width: 960 },
    ],
    adminThumbnail: 'thumbnail',
  },
  fields: [{ name: 'alt', type: 'text', required: true, label: 'Alt text (describe the image)' }],
}

/** Private files uploaded with admission forms. Only signed-in staff can open them. */
export const Documents: CollectionConfig = {
  slug: 'documents',
  admin: { group: 'Leads', description: 'Files uploaded by applicants. Not visible on the public website.' },
  access: { read: loggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  upload: {
    staticDir: 'private-uploads',
    mimeTypes: ['image/*', 'application/pdf'],
  },
  fields: [{ name: 'label', type: 'text' }],
}
