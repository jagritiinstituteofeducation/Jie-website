import Link from 'next/link'
import type { Course, Faculty, Faq, Testimonial } from '@/payload-types'
import { CATEGORIES, type CategoryKey } from '@/lib/options'
import { mediaAlt, mediaUrl } from '@/lib/cms-media'
import { Icon } from './Icon'

/** Minimal course shape used by cards (safe to pass to client components). */
export type CourseLite = Pick<Course, 'slug' | 'title' | 'type' | 'category' | 'icon' | 'duration' | 'level' | 'eligibility' | 'summary'>

export const toLite = (c: Course): CourseLite => ({
  slug: c.slug,
  title: c.title,
  type: c.type,
  category: c.category,
  icon: c.icon,
  duration: c.duration,
  level: c.level,
  eligibility: c.eligibility,
  summary: c.summary,
})

const cat = (k: string) => CATEGORIES[k as CategoryKey] ?? CATEGORIES.dev

export function CourseCard({ c }: { c: CourseLite }) {
  const academic = c.type === 'academic'
  const badge = academic ? cat(c.category).label : c.type === 'long' ? 'Long Term' : 'Short Term'
  return (
    <Link className="ccard" href={`/courses/${c.slug}`}>
      <div className={`top ${cat(c.category).tone}`}>
        <span className="big">
          <Icon name={c.icon ?? 'book'} size="lg" />
        </span>
        <span className={`badge ${academic ? 'b-acad' : c.type === 'long' ? 'b-long' : 'b-short'}`}>{badge}</span>
      </div>
      <div className="body">
        <h3>{c.title}</h3>
        <p>{c.summary}</p>
        <div className="meta">
          <span>
            <Icon name="clock" />
            {c.duration}
          </span>
          {academic ? (
            <span>
              <Icon name="cap" />
              {c.eligibility}
            </span>
          ) : (
            <>
              <span>
                <Icon name="award" />
                Certificate
              </span>
              {c.level && (
                <span>
                  <Icon name="cap" />
                  {c.level}
                </span>
              )}
            </>
          )}
        </div>
        <span className="go">
          {academic ? 'View details' : 'View course'} <Icon name="arrow" size="sm" />
        </span>
      </div>
    </Link>
  )
}

export function FacultyCard({ f }: { f: Faculty }) {
  const src = mediaUrl(f.photo, 'thumbnail')
  return (
    <div className="fcard">
      <div className="ph" />
      <div className="fav">{src && <img src={src} alt={mediaAlt(f.photo, f.name)} loading="lazy" />}</div>
      <div className="bd">
        <h3>{f.name}</h3>
        <span className="sub">{f.role}</span>
        {f.bio && <p>{f.bio}</p>}
      </div>
    </div>
  )
}

export function TestimonialCard({ t, tinted }: { t: Testimonial; tinted?: boolean }) {
  const src = mediaUrl(t.photo, 'thumbnail')
  return (
    <div className="tcard" style={tinted ? { background: 'var(--lav-2)' } : undefined}>
      <div className="head">
        {src ? <img className="ph" src={src} alt={`${t.name}, JIE student`} /> : <span className="av">{t.name[0]}</span>}
        <div>
          <b>{t.name}</b>
          <small>{t.course}</small>
        </div>
        <span className="q">“</span>
      </div>
      <span className="stars">★★★★★</span>
      <p>{t.quote}</p>
    </div>
  )
}

export function FaqList({ items, flush }: { items: Pick<Faq, 'question' | 'answer'>[]; flush?: boolean }) {
  return (
    <div className="faq" style={flush ? { margin: 0 } : undefined}>
      {items.map((q) => (
        <details key={q.question}>
          <summary>
            {q.question}
            <Icon name="down" />
          </summary>
          <p>{q.answer}</p>
        </details>
      ))}
    </div>
  )
}
