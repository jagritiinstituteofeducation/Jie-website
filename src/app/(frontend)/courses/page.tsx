import type { Metadata } from 'next'
import { getCourses, getSettings, getUniversityPrograms } from '@/lib/cms'
import { waHref } from '@/lib/contact'
import { toLite } from '@/components/Cards'
import { CoursesBrowser } from '@/components/Interactive'
import type { UniProgram } from '@/components/FullCatalogue'

export const metadata: Metadata = {
  title: 'Courses',
  description: 'Career and skill courses at JIE, plus admission guidance for academic programmes from 10th to Ph.D. and the full list of university degrees and diplomas.',
}

export default async function CoursesPage() {
  const [courses, s, uni] = await Promise.all([getCourses(), getSettings(), getUniversityPrograms()])
  // Only the name and key subjects go to the browser.
  const programs: UniProgram[] = uni.map((p) => ({ id: p.id, faculty: p.faculty, name: p.name, subjects: p.specialization }))
  return (
    <CoursesBrowser
      courses={courses.map(toLite)}
      maxDiscount={s.scholarship?.maxDiscount ?? '50%'}
      counselHref={waHref(s.mainNumber, 'Hi JIE, please help me choose the right course.')}
      programs={programs}
    />
  )
}
