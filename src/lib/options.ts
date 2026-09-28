/** Option lists shared by the CMS schema and the website. */

export const COURSE_TYPES = [
  { label: 'Long-term programme', value: 'long' },
  { label: 'Short-term course', value: 'short' },
  { label: 'Academic programme', value: 'academic' },
] as const

/** Category → display name + card gradient class (see styles.css `.t-*`). */
export const CATEGORIES = {
  // skill courses
  dev: { label: 'IT & Development', tone: 't-dev', group: 'skill' },
  design: { label: 'Design & Media', tone: 't-design', group: 'skill' },
  acc: { label: 'Accounting', tone: 't-acc', group: 'skill' },
  mkt: { label: 'Marketing', tone: 't-mkt', group: 'skill' },
  sec: { label: 'Cyber Security', tone: 't-sec', group: 'skill' },
  teach: { label: 'Teaching', tone: 't-teach', group: 'skill' },
  basic: { label: 'Computer Basics', tone: 't-basic', group: 'skill' },
  // academic programmes
  school: { label: 'School', tone: 't-school', group: 'academic' },
  degree: { label: 'Degree', tone: 't-degree', group: 'academic' },
  medical: { label: 'Medical', tone: 't-medical', group: 'academic' },
  edu: { label: 'Education', tone: 't-edu', group: 'academic' },
  eng: { label: 'Engineering', tone: 't-eng', group: 'academic' },
  law: { label: 'Law', tone: 't-law', group: 'academic' },
  lib: { label: 'Library Science', tone: 't-lib', group: 'academic' },
  phd: { label: 'Research', tone: 't-phd', group: 'academic' },
} as const
export type CategoryKey = keyof typeof CATEGORIES

export const CATEGORY_OPTIONS = Object.entries(CATEGORIES).map(([value, c]) => ({ label: c.label, value }))

/** Icons available for course cards (names match src/components/icons.ts). */
export const COURSE_ICONS = [
  'mega', 'code', 'laptop', 'db', 'calc', 'shield', 'film', 'smile', 'monitor', 'layout', 'palette',
  'phone2', 'book', 'cap', 'med', 'users', 'heart', 'gear', 'scale', 'award',
] as const
export const ICON_OPTIONS = COURSE_ICONS.map((v) => ({ label: v, value: v }))

export const GALLERY_ALBUMS = [
  { label: 'Certification Day', value: 'certification' },
  { label: 'Winners', value: 'winners' },
  { label: 'Celebrations', value: 'celebrations' },
  { label: 'Classroom & Labs', value: 'classroom' },
] as const

export const FAQ_CATEGORIES = [
  { label: 'General', value: 'general' },
  { label: 'Scholarship', value: 'scholarship' },
  { label: 'Admission', value: 'admission' },
] as const

export const BATCHES = ['Morning', 'Afternoon', 'Evening', 'Weekend'] as const
