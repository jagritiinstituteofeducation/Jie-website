'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { CATEGORIES } from '@/lib/options'
import { CourseCard, type CourseLite } from './Cards'
import { Icon } from './Icon'

/* ---------------- Home: Long / Short / Academic tabs ---------------- */
export function CourseTabs({ courses }: { courses: CourseLite[] }) {
  const [tab, setTab] = useState<'long' | 'short' | 'academic'>('long')
  const list = courses.filter((c) => c.type === tab).slice(0, 8)
  return (
    <>
      <div className="tabs" role="tablist" style={{ marginBottom: 28 }}>
        {(
          [
            ['long', 'Long Term'],
            ['short', 'Short Term'],
            ['academic', 'Academic'],
          ] as const
        ).map(([k, label]) => (
          <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} type="button">
            {label}
          </button>
        ))}
      </div>
      <div className="grid-4">
        {list.map((c) => (
          <CourseCard key={c.slug} c={c} />
        ))}
      </div>
    </>
  )
}

/* ---------------- Courses page: filters + search ---------------- */
const SKILL_FILTERS: [string, string][] = [
  ['all', 'All'],
  ['long', 'Long Term'],
  ['short', 'Short Term'],
  ['academic', 'Academic Programmes'],
  ...Object.entries(CATEGORIES)
    .filter(([, v]) => v.group === 'skill')
    .map(([k, v]) => [k, v.label] as [string, string]),
]

export function CoursesBrowser({ courses }: { courses: CourseLite[] }) {
  const [filter, setFilter] = useState('all')
  const [q, setQ] = useState('')
  const skill = courses.filter((c) => c.type !== 'academic')
  const academic = courses.filter((c) => c.type === 'academic')
  const match = (c: CourseLite) =>
    !q || `${c.title} ${c.summary} ${CATEGORIES[c.category as keyof typeof CATEGORIES]?.label ?? ''}`.toLowerCase().includes(q.toLowerCase())

  const onlyAcademic = filter === 'academic'
  const skillFilter = filter === 'all' || onlyAcademic ? null : filter
  const skillList = onlyAcademic ? [] : skill.filter((c) => (!skillFilter || c.type === skillFilter || c.category === skillFilter) && match(c))
  const acadList = skillFilter ? [] : academic.filter(match)
  const hideSkill = onlyAcademic || (q !== '' && skillList.length === 0 && acadList.length > 0)
  const hideAcad = !onlyAcademic && acadList.length === 0

  return (
    <>
      <section className="blk" style={{ paddingTop: 44 }}>
        <div className="wrap">
          <div style={{ display: 'flex', gap: 16, justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: 30, alignItems: 'center' }}>
            <div className="filters">
              {SKILL_FILTERS.map(([k, label]) => (
                <button key={k} type="button" aria-pressed={filter === k} onClick={() => setFilter(k)}>
                  {label}
                </button>
              ))}
            </div>
            <div className="fld" style={{ width: 'min(320px,100%)' }}>
              <label htmlFor="cSearch" style={{ position: 'absolute', left: -9999 }}>
                Search courses
              </label>
              <div style={{ position: 'relative' }}>
                <Icon name="search" size="sm" style={{ position: 'absolute', left: 14, top: 16, color: 'var(--muted)' }} />
                <input
                  id="cSearch"
                  type="search"
                  placeholder="Search courses, e.g. Tally, B.Ed"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  style={{ paddingLeft: 42, borderRadius: 999 }}
                />
              </div>
            </div>
          </div>
          {!hideSkill && (
            <div>
              <div className="sec-head" style={{ marginBottom: 18 }}>
                <span className="eyebrow">Career &amp; skill courses</span>
                <h2>Learn a job-ready skill at JIE</h2>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 18 }}>
                Showing {skillList.length} of {skill.length} courses
              </p>
              <div className="grid-3">
                {skillList.length ? (
                  skillList.map((c) => <CourseCard key={c.slug} c={c} />)
                ) : (
                  <p style={{ color: 'var(--muted)' }}>No skill courses match “{q}”. Try another word, or ask a counsellor.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {!hideAcad && (
        <section className="blk bg-lav">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Academic &amp; university programmes</span>
              <h2>From 10th to Ph.D., we guide your admission</h2>
              <p>
                Admission counselling, form filling, documents and study support for school, degree, professional and doctoral
                programmes through recognised boards and universities.
              </p>
            </div>
            <div className="acad-intro">
              {[
                ['users', 'Free admission counselling'],
                ['file', 'Form filling & documents'],
                ['book', 'Study material & guidance'],
                ['cal', 'Exam & result updates'],
              ].map(([i, t]) => (
                <div key={t}>
                  <span className="ic-bub">
                    <Icon name={i} />
                  </span>
                  {t}
                </div>
              ))}
            </div>
            <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 18 }}>
              Showing {acadList.length} of {academic.length} programmes
            </p>
            <div className="grid-3">
              {acadList.map((c) => (
                <CourseCard key={c.slug} c={c} />
              ))}
            </div>
            <p className="note">
              Eligibility shown is the general norm. Final eligibility, fees, duration and mode depend on the board or university.
              Ask a counsellor for your case.
            </p>
          </div>
        </section>
      )}
    </>
  )
}

/* ---------------- Gallery (grid or preview) + lightbox ---------------- */
export type GalleryItem = { id: string | number; title: string; caption?: string | null; album: string; thumb?: string; full?: string }

export function GalleryGrid({
  items,
  albums,
  variant = 'full',
}: {
  items: GalleryItem[]
  albums?: { label: string; value: string }[]
  variant?: 'full' | 'preview'
}) {
  const [album, setAlbum] = useState('all')
  const [open, setOpen] = useState<number | null>(null)
  const list = useMemo(() => items.filter((g) => album === 'all' || g.album === album), [items, album])

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowLeft') setOpen((i) => (i === null ? i : (i - 1 + list.length) % list.length))
      if (e.key === 'ArrowRight') setOpen((i) => (i === null ? i : (i + 1) % list.length))
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, list.length])

  const current = open !== null ? list[open] : null
  return (
    <>
      {albums && (
        <div className="filters" style={{ marginBottom: 30 }}>
          {[{ label: 'All', value: 'all' }, ...albums].map((a) => (
            <button key={a.value} type="button" aria-pressed={album === a.value} onClick={() => setAlbum(a.value)}>
              {a.label}
            </button>
          ))}
        </div>
      )}
      <div className={variant === 'preview' ? 'gal-prev' : 'gal'}>
        {list.map((g, i) => (
          <button key={g.id} type="button" className="gitem" onClick={() => setOpen(i)}>
            {g.thumb ? <img src={g.thumb} alt={`${g.title}${g.caption ? ` – ${g.caption}` : ''}`} loading="lazy" /> : <div className="ph-fb"><Icon name="image" size="lg" /></div>}
            <span className="cap">
              <b>{g.title}</b>
              {g.caption}
            </span>
          </button>
        ))}
      </div>
      {current && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={(e) => e.target === e.currentTarget && setOpen(null)}>
          <button className="x" type="button" aria-label="Close" onClick={() => setOpen(null)}>
            <Icon name="x" />
          </button>
          <button className="pv" type="button" aria-label="Previous photo" onClick={() => setOpen((open! - 1 + list.length) % list.length)}>
            <Icon name="left" />
          </button>
          <figure>
            <img src={current.full ?? current.thumb} alt={current.title} />
            <figcaption>
              <b>{current.title}</b>
              {current.caption ? ` · ${current.caption}` : ''}
            </figcaption>
          </figure>
          <button className="nx" type="button" aria-label="Next photo" onClick={() => setOpen((open! + 1) % list.length)}>
            <Icon name="arrow" />
          </button>
        </div>
      )}
    </>
  )
}

/* ---------------- Testimonials carousel ---------------- */
export function Carousel({ children, heading }: { children: React.ReactNode; heading: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const by = (dx: number) => ref.current?.scrollBy({ left: dx, behavior: 'smooth' })
  return (
    <>
      <div className="row-between">
        {heading}
        <div className="car-nav">
          <button type="button" aria-label="Previous" onClick={() => by(-340)}>
            <Icon name="left" />
          </button>
          <button type="button" aria-label="Next" onClick={() => by(340)}>
            <Icon name="arrow" />
          </button>
        </div>
      </div>
      <div className="tests" ref={ref}>
        {children}
      </div>
    </>
  )
}

/* ---------------- Count-up number (e.g. "2,000+") ---------------- */
/** Renders the final value on the server; counts up from 0 the first time it scrolls into view. */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLElement>(null)
  const m = value.match(/^([^\d]*)([\d,]+)(.*)$/)
  const target = m ? Number(m[2].replace(/,/g, '')) : NaN
  const [shown, setShown] = useState<number | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !Number.isFinite(target) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) return // already on screen: keep the real number
    setShown(0)
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / 1400)
        setShown(Math.round(target * (1 - Math.pow(1 - p, 3))))
        if (p < 1) requestAnimationFrame(tick)
        else setShown(null)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [target])

  if (!m) return <b>{value}</b>
  const [, pre, , post] = m
  const num = shown === null ? m[2] : shown.toLocaleString('en-IN')
  return (
    <b ref={ref}>
      {pre}
      {num}
      {post && <em>{post}</em>}
    </b>
  )
}

/* ---------------- Hero rotating words ---------------- */
export function RotatingWords({ words, interval = 2200 }: { words: string[]; interval?: number }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (words.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setI((n) => (n + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [words.length, interval])
  return (
    <span className="rot" aria-live="off">
      {words.map((w, n) => (
        <span key={w} className={n === i ? 'on' : n === (i - 1 + words.length) % words.length ? 'out' : undefined} aria-hidden={n !== i || undefined}>
          {w}
        </span>
      ))}
    </span>
  )
}
