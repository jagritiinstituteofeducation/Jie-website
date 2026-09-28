import type { GlobalConfig } from 'payload'

/** One place for contact details and site-wide content, editable in Admin -> Site Settings. */
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: { group: 'Settings' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Institute',
          fields: [
            { name: 'instituteName', type: 'text', required: true, defaultValue: 'Jagriti Institute of Education' },
            {
              name: 'tagline',
              type: 'text',
              defaultValue: 'Unlock Your Potential, Inspire Excellence, and Transform Your Future with Education.',
            },
            { name: 'logo', type: 'upload', relationTo: 'media' },
            {
              name: 'stats',
              type: 'array',
              label: 'Numbers shown on the home page',
              maxRows: 4,
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'value', type: 'text', required: true, admin: { placeholder: '2,000+' } },
                    { name: 'label', type: 'text', required: true, admin: { placeholder: 'Projects completed' } },
                  ],
                },
              ],
            },
            {
              name: 'partners',
              type: 'array',
              label: 'Industry partners',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'name', type: 'text', required: true },
                    { name: 'tagline', type: 'text' },
                  ],
                },
                { name: 'logo', type: 'upload', relationTo: 'media' },
              ],
            },
          ],
        },
        {
          label: 'Home page',
          name: 'home',
          fields: [
            {
              name: 'heroBackground',
              type: 'upload',
              relationTo: 'media',
              label: 'Hero background photo',
              admin: { description: 'Wide or square photo shown behind the top section of the home page (a dark overlay keeps the text readable).' },
            },
            {
              name: 'bannerBackground',
              type: 'upload',
              relationTo: 'media',
              label: 'Scholarship banner background photo',
            },
            {
              name: 'rotatingWords',
              type: 'array',
              label: 'Rotating words in the hero (“Become job-ready in …”)',
              maxRows: 6,
              fields: [{ name: 'word', type: 'text', required: true }],
            },
          ],
        },
        {
          label: 'About page',
          name: 'about',
          fields: [
            {
              name: 'heroBackground',
              type: 'upload',
              relationTo: 'media',
              label: 'About hero background photo',
              admin: { description: 'Photo of the centre shown behind the top of the About page (a dark overlay keeps the text readable).' },
            },
          ],
        },
        {
          label: 'Director',
          name: 'director',
          fields: [
            { name: 'name', type: 'text', defaultValue: 'Mr. Neeraj Dahiya' },
            { name: 'title', type: 'text', defaultValue: 'Director, Jagriti Institute of Education' },
            { name: 'photo', type: 'upload', relationTo: 'media' },
            {
              name: 'message',
              type: 'textarea',
              label: 'Welcome text (Director’s desk section)',
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            {
              name: 'mainNumber',
              type: 'text',
              required: true,
              defaultValue: '8222999106',
              label: 'Main number (Call & WhatsApp buttons)',
              admin: { description: '10-digit Indian mobile number, without +91.' },
            },
            {
              name: 'otherNumbers',
              type: 'array',
              label: 'Other phone numbers',
              fields: [{ name: 'number', type: 'text', required: true }],
            },
            { name: 'email', type: 'email' },
            {
              name: 'address',
              type: 'textarea',
              defaultValue:
                'U 75, First Floor, Kalra Complex, Shakarpur, near Laxmi Nagar Metro Gate No. 2, next to Shree Ganesh Corner, Delhi 110092',
            },
            { name: 'mapQuery', type: 'text', defaultValue: 'Kalra Complex Shakarpur Delhi 110092', label: 'Google Maps search text' },
            {
              name: 'officeHours',
              type: 'array',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'days', type: 'text', required: true },
                    { name: 'hours', type: 'text', required: true },
                  ],
                },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'instagramUrl', type: 'text' },
                { name: 'facebookUrl', type: 'text' },
                { name: 'studentLoginUrl', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Scholarship',
          name: 'scholarship',
          fields: [
            { name: 'maxDiscount', type: 'text', defaultValue: '50%', label: 'Maximum fee waiver' },
            {
              name: 'slabs',
              type: 'array',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'score', type: 'text', required: true, admin: { placeholder: '90% and above' } },
                    { name: 'reward', type: 'text', required: true, admin: { placeholder: '50% off' } },
                    { name: 'tag', type: 'text', admin: { placeholder: 'Gold scholar' } },
                  ],
                },
              ],
            },
            {
              name: 'note',
              type: 'text',
              defaultValue:
                'Slabs are indicative. Final slabs are announced with each test cycle, and the scholarship applies to the course fee only.',
            },
          ],
        },
        {
          label: 'Notifications',
          fields: [
            {
              name: 'notificationEmails',
              type: 'array',
              label: 'Send new enquiries, registrations and applications to',
              admin: { description: 'If empty, ADMIN_NOTIFY_EMAIL from the server settings is used.' },
              fields: [{ name: 'email', type: 'email', required: true }],
            },
          ],
        },
      ],
    },
  ],
}
