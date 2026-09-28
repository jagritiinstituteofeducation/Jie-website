'use server'

import { cms } from '@/lib/cms'

/**
 * Form handlers. Each one validates input, saves a lead in Payload (Neon Postgres) and the
 * collection's afterChange hook emails staff + the visitor through Resend.
 */

export type FormResult = { ok: true; name: string } | { ok: false; error: string } | null

const get = (fd: FormData, key: string, max = 300) => String(fd.get(key) ?? '').trim().slice(0, max)
const phone10 = (p: string) => p.replace(/\D/g, '').slice(-10)
const validEmail = (e: string) => !e || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
/** Hidden "website" field: real visitors never fill it, simple bots do. */
const isBot = (fd: FormData) => get(fd, 'website') !== ''

function checkContact(fd: FormData): { name: string; phone: string; email: string } | string {
  const name = get(fd, 'name', 120)
  const phone = phone10(get(fd, 'phone', 20))
  const email = get(fd, 'email', 200)
  if (name.length < 2) return 'Please enter your name.'
  if (phone.length !== 10) return 'Please enter a 10-digit mobile number.'
  if (!validEmail(email)) return 'Please enter a valid email address, or leave it empty.'
  return { name, phone, email }
}

export async function submitEnquiry(_prev: FormResult, fd: FormData): Promise<FormResult> {
  if (isBot(fd)) return { ok: true, name: '' }
  const c = checkContact(fd)
  if (typeof c === 'string') return { ok: false, error: c }
  const course = get(fd, 'course', 200)
  if (!course) return { ok: false, error: 'Please choose a course.' }
  try {
    const payload = await cms()
    await payload.create({
      collection: 'enquiries',
      overrideAccess: true,
      data: {
        name: c.name,
        phone: c.phone,
        email: c.email || undefined,
        course,
        batch: get(fd, 'batch', 40),
        message: get(fd, 'message', 2000),
        source: get(fd, 'source', 200),
      },
    })
    return { ok: true, name: c.name }
  } catch (err) {
    console.error('submitEnquiry failed', err)
    return { ok: false, error: 'Something went wrong while sending. Please call or WhatsApp us instead.' }
  }
}

export async function submitScholarship(_prev: FormResult, fd: FormData): Promise<FormResult> {
  if (isBot(fd)) return { ok: true, name: '' }
  const c = checkContact(fd)
  if (typeof c === 'string') return { ok: false, error: c }
  const qualification = get(fd, 'qualification', 80)
  const course = get(fd, 'course', 200)
  if (!qualification) return { ok: false, error: 'Please choose your class or qualification.' }
  if (!course) return { ok: false, error: 'Please choose a course.' }
  if (fd.get('consent') !== 'on') return { ok: false, error: 'Please tick the box to agree to be contacted.' }
  try {
    const payload = await cms()
    await payload.create({
      collection: 'scholarship-registrations',
      overrideAccess: true,
      data: { name: c.name, phone: c.phone, email: c.email || undefined, qualification, course, mode: get(fd, 'mode', 60) || 'Online' },
    })
    return { ok: true, name: c.name }
  } catch (err) {
    console.error('submitScholarship failed', err)
    return { ok: false, error: 'Something went wrong while registering. Please call or WhatsApp us instead.' }
  }
}

const MAX_FILE = 5 * 1024 * 1024
const okType = (t: string) => t.startsWith('image/') || t === 'application/pdf'

export async function submitAdmission(_prev: FormResult, fd: FormData): Promise<FormResult> {
  if (isBot(fd)) return { ok: true, name: '' }
  const c = checkContact(fd)
  if (typeof c === 'string') return { ok: false, error: c }
  const required = { address: get(fd, 'address', 500), course: get(fd, 'course', 200), batch: get(fd, 'batch', 60), qualification: get(fd, 'qualification', 80) }
  const missing = Object.entries(required).find(([, v]) => !v)
  if (missing) return { ok: false, error: `Please fill in your ${missing[0]}.` }
  if (fd.get('consent') !== 'on') return { ok: false, error: 'Please confirm your details are correct.' }

  const files: Record<'idProof' | 'photo' | 'marksheet', File | null> = { idProof: null, photo: null, marksheet: null }
  for (const key of Object.keys(files) as (keyof typeof files)[]) {
    const f = fd.get(key)
    if (f instanceof File && f.size > 0) {
      if (f.size > MAX_FILE) return { ok: false, error: `${f.name} is larger than 5 MB. Please upload a smaller file.` }
      if (!okType(f.type)) return { ok: false, error: `${f.name} must be a photo or a PDF.` }
      files[key] = f
    }
  }

  try {
    const payload = await cms()
    const uploaded: Partial<Record<keyof typeof files, number>> = {}
    for (const [key, f] of Object.entries(files) as [keyof typeof files, File | null][]) {
      if (!f) continue
      const doc = await payload.create({
        collection: 'documents',
        overrideAccess: true,
        data: { label: `${c.name} – ${key}` },
        file: { data: Buffer.from(await f.arrayBuffer()), mimetype: f.type, name: f.name, size: f.size },
      })
      uploaded[key] = doc.id
    }
    const dob = get(fd, 'dob', 20)
    await payload.create({
      collection: 'admissions',
      overrideAccess: true,
      data: {
        name: c.name,
        phone: c.phone,
        email: c.email || undefined,
        dob: dob ? new Date(dob).toISOString() : undefined,
        guardian: get(fd, 'guardian', 120),
        ...required,
        scholarshipCode: get(fd, 'scholarshipCode', 60),
        ...uploaded,
      },
    })
    return { ok: true, name: c.name }
  } catch (err) {
    console.error('submitAdmission failed', err)
    return { ok: false, error: 'Something went wrong while submitting. Please call or WhatsApp us instead.' }
  }
}
