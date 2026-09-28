import type { CollectionConfig } from 'payload'
import { FAQ_CATEGORIES, GALLERY_ALBUMS } from '../lib/options'
import { anyone, loggedIn } from './access'

const publicContent = { read: anyone, create: loggedIn, update: loggedIn, delete: loggedIn }
const order = { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar', description: 'Lower shows first.' } } as const

export const Faculty: CollectionConfig = {
  slug: 'faculty',
  labels: { singular: 'Team member', plural: 'Team' },
  admin: { useAsTitle: 'name', group: 'Content', defaultColumns: ['name', 'role', 'order'] },
  access: publicContent,
  defaultSort: 'order',
  fields: [
    { name: 'name', type: 'text', required: true, admin: { placeholder: 'e.g. Chetan Sir' } },
    { name: 'role', type: 'text', required: true, admin: { placeholder: 'e.g. Software Development' } },
    { name: 'bio', type: 'textarea' },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Square photo with the face in the centre works best.' },
    },
    order,
  ],
}

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: { useAsTitle: 'name', group: 'Content', defaultColumns: ['name', 'course', 'order'] },
  access: publicContent,
  defaultSort: 'order',
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'course', type: 'text', required: true },
    { name: 'quote', type: 'textarea', required: true },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    order,
  ],
}

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  labels: { singular: 'Gallery photo', plural: 'Gallery' },
  admin: { useAsTitle: 'title', group: 'Content', defaultColumns: ['title', 'album', 'isTopper', 'order'] },
  access: publicContent,
  defaultSort: 'order',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'caption', type: 'text' },
    { name: 'album', type: 'select', required: true, options: [...GALLERY_ALBUMS], defaultValue: 'winners' },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'isTopper',
      type: 'checkbox',
      label: 'Show under “Our toppers” on the Scholarship page',
      defaultValue: false,
    },
    order,
  ],
}

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  admin: { useAsTitle: 'question', group: 'Content', defaultColumns: ['question', 'category', 'order'] },
  access: publicContent,
  defaultSort: 'order',
  fields: [
    { name: 'question', type: 'text', required: true },
    { name: 'answer', type: 'textarea', required: true },
    { name: 'category', type: 'select', required: true, options: [...FAQ_CATEGORIES], defaultValue: 'general' },
    order,
  ],
}
