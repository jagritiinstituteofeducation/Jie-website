import type { Metadata } from 'next'
import { getCourses, getSettings } from '@/lib/cms'
import { waHref } from '@/lib/contact'
import { toLite } from '@/components/Cards'
import { CoursesBrowser } from '@/components/Interactive'

export const metadata: Metadata = {
  title: 'Courses',
  description: 'Career and skill courses at JIE, plus admission guidance for academic programmes from 10th to Ph.D.',
}

export default async function CoursesPage() {
  const [courses, s] = await Promise.all([getCourses(), getSettings()])
  return (
    <CoursesBrowser
      courses={courses.map(toLite)}
      maxDiscount={s.scholarship?.maxDiscount ?? '50%'}
      counselHref={waHref(s.mainNumber, 'Hi JIE, please help me choose the right course.')}
    />
  )
}
