/**
 * Fills an empty database with the content of the original website.
 * Run once after setting up .env:   npm run seed
 * It skips if courses already exist (so it never overwrites edits made in /admin).
 */
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '../payload.config'
import { academicPrograms, faqs, gallery, skillCourses, testimonials } from './data'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const MEDIA = path.resolve(dirname, '../../seed-media')

const payload = await getPayload({ config })
const log = (m: string) => payload.logger.info(`[seed] ${m}`)

const existing = await payload.count({ collection: 'courses' })
if (existing.totalDocs > 0) {
  log(`Database already has ${existing.totalDocs} courses, nothing to do. Edit content in /admin.`)
  process.exit(0)
}

async function upload(rel: string, alt: string): Promise<number> {
  const doc = await payload.create({ collection: 'media', data: { alt }, filePath: path.join(MEDIA, rel) })
  return doc.id
}

// ---------- brand + settings ----------
log('Uploading logo, Director photo and partner logos…')
const logo = await upload('brand/jie-logo.png', 'Jagriti Institute of Education logo')
const director = await upload('brand/director-neeraj-dahiya.jpg', 'Mr. Neeraj Dahiya, Director of Jagriti Institute of Education')
const bannerBackground = await upload('gallery/WhatsApp-Image-2025-07-25-at-2.30.10-PM.jpeg', 'All winners of JIE with their certificates')
const partners = [
  { name: 'Pixel Brush', tagline: 'Graphic designers', logo: await upload('partners/pixel-brush.png', 'Pixel Brush logo') },
  { name: 'Cracka', tagline: 'Ethical hackers', logo: await upload('partners/cracka.png', 'Cracka logo') },
  { name: 'Xsecurity', tagline: 'Software developers', logo: await upload('partners/xsecurity.png', 'Xsecurity logo') },
]

await payload.updateGlobal({
  slug: 'site-settings',
  data: {
    instituteName: 'Jagriti Institute of Education',
    tagline: 'Unlock Your Potential, Inspire Excellence, and Transform Your Future with Education.',
    logo,
    stats: [
      { value: String(skillCourses.length), label: 'Career & skill courses' },
      { value: '2,000+', label: 'Projects completed' },
      { value: '3,000+', label: 'Client businesses served' },
      { value: '4', label: 'Helpline numbers' },
    ],
    partners,
    home: {
      bannerBackground,
      rotatingWords: ['Coding', 'Design', 'Accounting', 'Digital Marketing', 'Teaching'].map((word) => ({ word })),
    },
    director: {
      name: 'Mr. Neeraj Dahiya',
      title: 'Director, Jagriti Institute of Education',
      photo: director,
      message:
        'Under the guidance of our Director, Mr. Neeraj Dahiya, Jagriti Institute of Education brings practical, industry-ready computer education to Shakarpur and East Delhi. The focus is simple: learn by doing, build real projects, and leave with skills you can use from day one.',
    },
    mainNumber: '8222999106',
    otherNumbers: [{ number: '9996999106' }, { number: '7053104444' }, { number: '7062044447' }],
    address:
      'U 75, First Floor, Kalra Complex, Shakarpur, near Laxmi Nagar Metro Gate No. 2, next to Shree Ganesh Corner, Delhi 110092',
    mapQuery: 'Kalra Complex Shakarpur Delhi 110092',
    officeHours: [
      { days: 'Monday – Saturday', hours: '8:00 am – 5:00 pm' },
      { days: 'Sunday', hours: '10:00 am – 2:00 pm' },
    ],
    instagramUrl: 'https://www.instagram.com/jieducation2025',
    facebookUrl: 'https://www.facebook.com/share/1EcXnrvJ9m/',
    studentLoginUrl: 'https://jagritiie.com/login/',
    scholarship: {
      maxDiscount: '50%',
      slabs: [
        { score: '90% and above', reward: '50% off', tag: 'Gold scholar' },
        { score: '75% – 89%', reward: '30% off', tag: 'Silver scholar' },
        { score: '60% – 74%', reward: '15% off', tag: 'Merit scholar' },
        { score: 'Below 60%', reward: 'Free counselling session', tag: 'Participant' },
      ],
    },
  },
})

// ---------- team ----------
log('Creating team…')
const team = [
  { key: 'aarti', name: 'Aarti Mam', role: 'Admission Coordinator', bio: 'Helps students find their perfect academic path, guiding future leaders through the enrollment process, career counselling and student support.' },
  { key: 'chetan', name: 'Chetan Sir', role: 'Software Development', bio: 'A dedicated software trainer known for his clear teaching style and deep programming knowledge.' },
  { key: 'sagar', name: 'Sagar Sir', role: 'E-Accounting', bio: 'An E-Accounting instructor recognised for his command of digital accounting tools, Tally and GST.' },
  { key: 'ashutosh', name: 'Ashutosh Sir', role: 'Ethical Hacking', bio: 'A highly skilled ethical hacking instructor focused on cybersecurity and real-world threat defence.' },
]
const facultyId: Record<string, number> = {}
for (const [i, f] of team.entries()) {
  const photo = await upload(`faculty/${f.key}.jpg`, `${f.name}, ${f.role}`)
  const doc = await payload.create({ collection: 'faculty', data: { name: f.name, role: f.role, bio: f.bio, photo, order: i } })
  facultyId[f.key] = doc.id
}

// ---------- courses ----------
log(`Creating ${skillCourses.length} skill courses and ${academicPrograms.length} academic programmes…`)
type Skill = (typeof skillCourses)[number] & { f?: string }
for (const [i, raw] of skillCourses.entries()) {
  const c = raw as Skill
  await payload.create({
    collection: 'courses',
    data: {
      title: c.n,
      slug: c.s,
      type: c.t === 'Long' ? 'long' : 'short',
      category: c.c as never,
      icon: c.i as never,
      duration: c.d,
      level: c.lvl,
      summary: c.o,
      whoFor: c.who,
      modules: c.m.map(([title, description]) => ({ title, description })),
      tools: c.tools.map((name) => ({ name })),
      projects: c.proj.map((title) => ({ title })),
      careers: c.car.map((title) => ({ title })),
      faculty: c.f ? facultyId[c.f] : undefined,
      order: i,
    },
  })
}
for (const [i, a] of academicPrograms.entries()) {
  await payload.create({
    collection: 'courses',
    data: {
      title: a.n,
      slug: a.s,
      type: 'academic',
      category: a.c as never,
      icon: a.i as never,
      duration: a.d,
      eligibility: a.e,
      summary: a.o,
      whoFor: a.who,
      streams: a.st.map((name) => ({ name })),
      careers: a.car.map((title) => ({ title })),
      order: 100 + i,
    },
  })
}

// ---------- testimonials ----------
log('Creating testimonials…')
for (const [i, t] of testimonials.entries()) {
  const photo = await upload(`students/${t.n.toLowerCase()}.jpg`, `${t.n}, JIE student`)
  await payload.create({ collection: 'testimonials', data: { name: t.n, course: t.c, quote: t.q, photo, order: i } })
}

// ---------- gallery ----------
log('Uploading gallery…')
const ALBUM: Record<string, 'certification' | 'winners' | 'celebrations' | 'classroom'> = {
  'Certification Day': 'certification',
  Winners: 'winners',
  Celebrations: 'celebrations',
  'Classroom & Labs': 'classroom',
}
// Display order on the Gallery page: big moments first, then celebrations, then individual toppers.
const GALLERY_ORDER = [
  'Certification Day', 'All winners of JIE', 'Teachers & students', 'Career counselling',
  '79th Independence Day', 'Independence Day', 'Teacher and students',
  'Manish', 'Jafreen', 'Prince', 'Fiza Naaz', 'Anju', 'Ashika',
]
const galleryOrder = (title: string, fallback: number) => {
  const i = GALLERY_ORDER.indexOf(title)
  return i >= 0 ? i : 100 + fallback
}
for (const [i, g] of gallery.entries()) {
  const image = await upload(`gallery/${g.f.split('/').pop()}`, `${g.t} – ${g.d}`)
  await payload.create({
    collection: 'gallery',
    data: { title: g.t, caption: g.d, album: ALBUM[g.a] ?? 'winners', image, isTopper: /position/i.test(g.d), order: galleryOrder(g.t, i) },
  })
}

{
  const image = await upload('brand/hero-counselling-room.jpg', 'Career counselling session at the Jagriti Institute of Education centre')
  await payload.create({
    collection: 'gallery',
    data: { title: 'Career counselling', caption: 'Counselling session at the Shakarpur centre', album: 'classroom', image, isTopper: false, order: galleryOrder('Career counselling', gallery.length) },
  })
}

// ---------- FAQs ----------
log('Creating FAQs…')
for (const [category, list] of Object.entries(faqs)) {
  for (const [i, [question, answer]] of list.entries()) {
    await payload.create({ collection: 'faqs', data: { question, answer, category: category as 'general', order: i } })
  }
}

log('Done. Open /admin to create your admin account and review the content.')
process.exit(0)
