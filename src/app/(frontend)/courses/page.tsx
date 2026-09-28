import type { Metadata } from 'next'
import { getCourses } from '@/lib/cms'
import { toLite } from '@/components/Cards'
import { PageHero } from '@/components/Chrome'
import { CoursesBrowser } from '@/components/Interactive'

export const metadata: Metadata = {
  title: 'Courses',
  description: 'Career and skill courses at JIE, plus admission guidance for academic programmes from 10th to Ph.D.',
}

export default async function CoursesPage() {
  const courses = await getCourses()
  const skill = courses.filter((c) => c.type !== 'academic').length
  return (
    <>
      <PageHero
        crumb="Courses"
        title={<>Explore our <span className="hl">courses</span></>}
        lead={`${skill} career and skill courses, plus academic programmes from 10th to Ph.D. Filter by what you want to learn.`}
      />
      <CoursesBrowser courses={courses.map(toLite)} />
    </>
  )
}
