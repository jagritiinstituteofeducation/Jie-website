import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Course, Faculty, Faq, Gallery, SiteSetting, Testimonial } from '@/payload-types'

/** Server-only helpers the website uses to read content from Payload. */
export const cms = cache(() => getPayload({ config }))

export const getSettings = cache(async (): Promise<SiteSetting> => (await cms()).findGlobal({ slug: 'site-settings', depth: 1 }))

export const getCourses = cache(async (): Promise<Course[]> => {
  const res = await (await cms()).find({
    collection: 'courses',
    where: { showOnWebsite: { equals: true } },
    sort: 'order',
    limit: 200,
    depth: 1,
  })
  return res.docs
})

export const getCourse = cache(async (slug: string): Promise<Course | null> => {
  const res = await (await cms()).find({
    collection: 'courses',
    where: { slug: { equals: slug }, showOnWebsite: { equals: true } },
    limit: 1,
    depth: 2,
  })
  return res.docs[0] ?? null
})

export const getFaculty = cache(async (): Promise<Faculty[]> =>
  (await (await cms()).find({ collection: 'faculty', sort: 'order', limit: 50, depth: 1 })).docs,
)

export const getTestimonials = cache(async (): Promise<Testimonial[]> =>
  (await (await cms()).find({ collection: 'testimonials', sort: 'order', limit: 50, depth: 1 })).docs,
)

export const getGallery = cache(async (): Promise<Gallery[]> =>
  (await (await cms()).find({ collection: 'gallery', sort: 'order', limit: 200, depth: 1 })).docs,
)

export const getFaqs = cache(async (category: Faq['category']): Promise<Faq[]> =>
  (await (await cms()).find({ collection: 'faqs', where: { category: { equals: category } }, sort: 'order', limit: 50 })).docs,
)

export const getUniversityPrograms = cache(async () =>
  (
    await (await cms()).find({
      collection: 'university-programs',
      where: { showOnWebsite: { equals: true } },
      sort: 'order',
      limit: 500,
      depth: 0,
      select: { faculty: true, name: true, specialization: true },
    })
  ).docs,
)

export { mediaAlt, mediaUrl } from './cms-media'
