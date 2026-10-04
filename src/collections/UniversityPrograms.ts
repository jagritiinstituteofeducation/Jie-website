import type { CollectionConfig } from 'payload'
import { anyone, loggedIn } from './access'

/** Full university catalogue (degrees, diplomas, certificates), shown behind the
    "View full list of all courses & diplomas" button on the Courses page. */
export const UniversityPrograms: CollectionConfig = {
  slug: 'university-programs',
  labels: { singular: 'University programme', plural: 'University programmes' },
  admin: {
    useAsTitle: 'name',
    group: 'Content',
    defaultColumns: ['name', 'code', 'faculty', 'duration', 'existingCourse'],
    description: 'The complete list of university courses & diplomas on the Courses page.',
    listSearchableFields: ['name', 'code', 'faculty', 'specialization'],
  },
  access: { read: anyone, create: loggedIn, update: loggedIn, delete: loggedIn },
  defaultSort: 'order',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'faculty', type: 'text', required: true, index: true, admin: { description: 'Group heading, e.g. "Commerce".' } },
        { name: 'code', type: 'text', required: true, admin: { description: 'Short name, e.g. "B.Com." or "PG Diploma".' } },
      ],
    },
    { name: 'name', type: 'text', required: true },
    { name: 'specialization', type: 'textarea', admin: { description: 'Separate options with " / " or commas.' } },
    {
      type: 'row',
      fields: [
        { name: 'duration', type: 'text', admin: { description: 'e.g. "6 semesters" or "6 months".' } },
        { name: 'eligibility', type: 'text' },
      ],
    },
    {
      name: 'fees',
      type: 'text',
      access: { read: ({ req }) => Boolean(req.user) },
      admin: { description: 'Internal reference only. Not shown on the website.' },
    },
    {
      name: 'existingCourse',
      label: 'Already on the website as',
      type: 'relationship',
      relationTo: 'courses',
      admin: {
        position: 'sidebar',
        description: 'Links this row to an existing course page ("Details"). Leave empty to mark it "New" with an Enquire button.',
      },
    },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
    { name: 'showOnWebsite', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
  ],
}
