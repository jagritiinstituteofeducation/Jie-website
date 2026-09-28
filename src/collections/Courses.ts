import type { CollectionConfig, FieldHook } from 'payload'
import { CATEGORY_OPTIONS, COURSE_TYPES, ICON_OPTIONS } from '../lib/options'
import { anyone, loggedIn } from './access'

const slugify = (s: string) =>
  s.toLowerCase().replace(/[()]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

const fillSlug: FieldHook = ({ value, data }) =>
  typeof value === 'string' && value.trim() ? slugify(value) : data?.title ? slugify(String(data.title)) : value

const isAcademic = (data: Record<string, unknown> | undefined) => data?.type === 'academic'
const isSkill = (data: Record<string, unknown> | undefined) => !isAcademic(data)

/** Skill courses (long / short term) and academic programmes (10th to Ph.D.). */
export const Courses: CollectionConfig = {
  slug: 'courses',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'type', 'category', 'duration', 'showOnWebsite'],
    description: 'Every course and academic programme shown on the website.',
  },
  access: { read: anyone, create: loggedIn, update: loggedIn, delete: loggedIn },
  defaultSort: 'order',
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { position: 'sidebar', description: 'Web address: /courses/<slug>. Filled from the title if left empty.' },
      hooks: { beforeValidate: [fillSlug] },
    },
    {
      type: 'row',
      fields: [
        { name: 'type', type: 'select', required: true, options: [...COURSE_TYPES], defaultValue: 'long' },
        { name: 'category', type: 'select', required: true, options: CATEGORY_OPTIONS },
        { name: 'icon', type: 'select', options: ICON_OPTIONS, defaultValue: 'book' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'duration', type: 'text', required: true, admin: { placeholder: 'e.g. 6 months' } },
        { name: 'level', type: 'text', admin: { condition: isSkill, placeholder: 'e.g. Beginner' } },
        {
          name: 'eligibility',
          type: 'text',
          admin: { condition: isAcademic, placeholder: 'e.g. 12th pass' },
        },
      ],
    },
    { name: 'summary', type: 'textarea', required: true, label: 'One-line summary (shown on cards)' },
    { name: 'whoFor', type: 'textarea', label: 'Who it’s for' },
    {
      name: 'modules',
      type: 'array',
      label: 'Syllabus modules',
      admin: { condition: isSkill },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'tools',
      type: 'array',
      label: 'Tools & software',
      admin: { condition: isSkill },
      fields: [{ name: 'name', type: 'text', required: true }],
    },
    {
      name: 'streams',
      type: 'array',
      label: 'Streams / subjects / courses covered',
      admin: { condition: isAcademic },
      fields: [{ name: 'name', type: 'text', required: true }],
    },
    {
      name: 'projects',
      type: 'array',
      label: 'Projects students build',
      admin: { condition: isSkill },
      fields: [{ name: 'title', type: 'text', required: true }],
    },
    {
      name: 'careers',
      type: 'array',
      label: 'Careers / what’s next',
      fields: [{ name: 'title', type: 'text', required: true }],
    },
    {
      name: 'faculty',
      type: 'relationship',
      relationTo: 'faculty',
      admin: { condition: isSkill, position: 'sidebar' },
    },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar', description: 'Lower shows first.' } },
    { name: 'showOnWebsite', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
  ],
}
