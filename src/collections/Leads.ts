import type { CollectionAfterChangeHook, CollectionConfig } from 'payload'
import { notifyNewLead, type LeadKind } from '../emails/notify'
import { loggedIn } from './access'

/** Leads are created by the website's server actions (overrideAccess) and only staff can see them. */
const staffOnly = { read: loggedIn, create: loggedIn, update: loggedIn, delete: loggedIn }

const emailOnCreate =
  (kind: LeadKind): CollectionAfterChangeHook =>
  async ({ doc, operation, req }) => {
    if (operation === 'create') await notifyNewLead(req, kind, doc)
    return doc
  }

const contactFields = [
  {
    type: 'row',
    fields: [
      { name: 'name', type: 'text', required: true },
      { name: 'phone', type: 'text', required: true },
      { name: 'email', type: 'email' },
    ],
  },
] as CollectionConfig['fields']

const notes = { name: 'notes', type: 'textarea', label: 'Staff notes', admin: { position: 'sidebar' } } as const

export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  admin: {
    useAsTitle: 'name',
    group: 'Leads',
    defaultColumns: ['name', 'phone', 'course', 'status', 'createdAt'],
    description: 'Enquiry and demo-class requests from the website forms.',
  },
  access: staffOnly,
  defaultSort: '-createdAt',
  hooks: { afterChange: [emailOnCreate('enquiry')] },
  fields: [
    ...contactFields,
    {
      type: 'row',
      fields: [
        { name: 'course', type: 'text' },
        { name: 'batch', type: 'text' },
      ],
    },
    { name: 'message', type: 'textarea' },
    { name: 'source', type: 'text', admin: { readOnly: true, description: 'Page the form was sent from.' } },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      admin: { position: 'sidebar' },
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Demo booked', value: 'demo' },
        { label: 'Enrolled', value: 'enrolled' },
        { label: 'Not interested', value: 'closed' },
      ],
    },
    notes,
  ],
}

export const ScholarshipRegistrations: CollectionConfig = {
  slug: 'scholarship-registrations',
  labels: { singular: 'Scholarship registration', plural: 'Scholarship registrations' },
  admin: {
    useAsTitle: 'name',
    group: 'Leads',
    defaultColumns: ['name', 'phone', 'course', 'mode', 'status', 'createdAt'],
  },
  access: staffOnly,
  defaultSort: '-createdAt',
  hooks: { afterChange: [emailOnCreate('scholarship')] },
  fields: [
    ...contactFields,
    {
      type: 'row',
      fields: [
        { name: 'qualification', type: 'text', required: true },
        { name: 'course', type: 'text', required: true },
        { name: 'mode', type: 'text', defaultValue: 'Online' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'registered',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Registered', value: 'registered' },
        { label: 'Test link sent', value: 'link-sent' },
        { label: 'Test taken', value: 'taken' },
        { label: 'Result shared', value: 'result' },
      ],
    },
    { name: 'score', type: 'number', label: 'Score (%)', admin: { position: 'sidebar' } },
    { name: 'scholarshipPercent', type: 'number', label: 'Scholarship (%)', admin: { position: 'sidebar' } },
    notes,
  ],
}

export const Admissions: CollectionConfig = {
  slug: 'admissions',
  labels: { singular: 'Admission application', plural: 'Admission applications' },
  admin: {
    useAsTitle: 'name',
    group: 'Leads',
    defaultColumns: ['name', 'phone', 'course', 'batch', 'status', 'createdAt'],
  },
  access: staffOnly,
  defaultSort: '-createdAt',
  hooks: { afterChange: [emailOnCreate('admission')] },
  fields: [
    ...contactFields,
    {
      type: 'row',
      fields: [
        { name: 'dob', type: 'date', label: 'Date of birth', admin: { date: { pickerAppearance: 'dayOnly' } } },
        { name: 'guardian', type: 'text', label: 'Parent / guardian' },
      ],
    },
    { name: 'address', type: 'textarea', required: true },
    {
      type: 'row',
      fields: [
        { name: 'course', type: 'text', required: true },
        { name: 'batch', type: 'text', required: true },
        { name: 'qualification', type: 'text', required: true },
      ],
    },
    { name: 'scholarshipCode', type: 'text' },
    {
      type: 'row',
      fields: [
        { name: 'idProof', type: 'upload', relationTo: 'documents', label: 'ID proof' },
        { name: 'photo', type: 'upload', relationTo: 'documents', label: 'Passport photo' },
        { name: 'marksheet', type: 'upload', relationTo: 'documents', label: 'Marksheet' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'submitted',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Submitted', value: 'submitted' },
        { label: 'Under review', value: 'reviewing' },
        { label: 'Approved', value: 'approved' },
        { label: 'Fee paid / enrolled', value: 'enrolled' },
        { label: 'Rejected', value: 'rejected' },
      ],
    },
    notes,
  ],
}
