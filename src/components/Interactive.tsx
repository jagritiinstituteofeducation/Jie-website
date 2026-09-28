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

/* ---------------- Courses page: hero + filters + search ---------------- */
const ACAD_ICON: Record<string, string> = { school: 'book', degree: 'cap', medical: 'med', edu: 'users', eng: 'gear', law: 'scale', lib: 'book', phd: 'award' }
const ACAD_GROUPS = Object.entries(CATEGORIES)
  .filter(([, v]) => v.group === 'academic')
  .map(([k, v]) => ({ k, label: v.label, tone: v.tone, icon: ACAD_ICON[k] ?? 'cap' }))
const SKILL_FILTERS: [string, string][] = [
  ['all', 'All'],
  ['long', 'Long Term'],
  ['short', 'Short Term'],
  ['academic', 'Academic Programmes'],
  ...Object.entries(CATEGORIES)
    .filter(([, v]) => v.group === 'skill')
    .map(([k, v]) => [k, v.label] as [string, string]),
]
const CAT_ICON: Record<string, string> = { dev: 'code', design: 'palette', acc: 'calc', mkt: 'mega', sec: 'shield', teach: 'smile', basic: 'monitor' }

export function CoursesBrowser({
  courses,
  maxDiscount = '50%',
  counselHref,
}: {
  courses: CourseLite[]
  maxDiscount?: string
  counselHref: string
}) {
  const [filter, setFilter] = useState('all')
  const [q, setQ] = useState('')
  const resultsRef = useRef<HTMLDivElement>(null)
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
  const total = skillList.length + acadList.length

  const cats = Object.entries(CATEGORIES)
    .filter(([, v]) => v.group === 'skill')
    .map(([k, v]) => ({ k, label: v.label, n: skill.filter((c) => c.category === k).length }))
    .filter((c) => c.n > 0)
  const spotlight = ['full-stack-development', 'digital-marketing', 'b-ed']
    .map((s) => courses.find((c) => c.slug === s))
    .filter((c): c is CourseLite => Boolean(c))
  const jump = (k: string) => {
    setFilter(k)
    requestAnimationFrame(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  return (
    <>
      {/* HERO */}
      <div className="chero">
        <div className="wrap">
          <div className="chero-copy">
            <div className="crumb">
              <a href="/">Home</a> / <span>Courses</span>
            </div>
            <span className="h2o-pill">
              <i />
              Admissions open · New batches every month
            </span>
            <h1>
              Find the <span className="grad-t">course</span> that fits your next step
            </h1>
            <p className="chero-lead">
              {skill.length} career &amp; skill courses taught in our labs, plus admission guidance for {academic.length} academic
              programmes from 10th to Ph.D.
            </p>
            <form
              className="chero-search"
              role="search"
              onSubmit={(e) => {
                e.preventDefault()
                resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
            >
              <Icon name="search" />
              <label htmlFor="cSearch" style={{ position: 'absolute', left: -9999 }}>
                Search courses
              </label>
              <input id="cSearch" type="search" placeholder="Try “Tally”, “Coding”, “B.Ed”…" value={q} onChange={(e) => setQ(e.target.value)} />
              <button className="btn btn-g btn-sm" type="submit">
                Search
              </button>
            </form>
            <div className="chero-cats">
              {cats.map((c) => (
                <button key={c.k} type="button" onClick={() => jump(c.k)}>
                  <Icon name={CAT_ICON[c.k] ?? 'book'} size="sm" />
                  {c.label}
                  <em>{c.n}</em>
                </button>
              ))}
              <button type="button" className="acad" onClick={() => jump('academic')}>
                <Icon name="cap" size="sm" />
                Academic (10th–Ph.D.)
                <em>{academic.length}</em>
              </button>
            </div>
          </div>

          <div className="chero-vis" aria-hidden="true">
            <div className="chero-glow" />
            {spotlight.map((c, i) => (
              <div key={c.slug} className={`mini m${i + 1}`}>
                <div className={`mini-top ${CATEGORIES[c.category as keyof typeof CATEGORIES]?.tone ?? 't-dev'}`}>
                  <span>
                    <Icon name={c.icon ?? 'book'} />
                  </span>
                  <small>{c.type === 'academic' ? 'Academic' : c.type === 'long' ? 'Long Term' : 'Short Term'}</small>
                </div>
                <div className="mini-body">
                  <b>{c.title}</b>
                  <small>
                    <Icon name="clock" size="sm" />
                    {c.duration}
                  </small>
                </div>
              </div>
            ))}
            <div className="gchip mini-chip">
              <span className="ic-bub gold">
                <Icon name="percent" />
              </span>
              <div>
                <small>Scholarship</small>
                <b>Up to {maxDiscount} off</b>
              </div>
            </div>
          </div>
        </div>
        <div className="wrap chero-strip">
          {[
            ['award', 'Certificate with every course'],
            ['monitor', 'Hands-on computer labs'],
            ['users', 'Free demo class'],
            ['percent', `Scholarship up to ${maxDiscount}`],
          ].map(([i, t]) => (
            <span key={t}>
              <Icon name={i} size="sm" />
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* STICKY FILTER BAR */}
      <div className="cbar" ref={resultsRef}>
        <div className="wrap">
          <div className="filters">
            {SKILL_FILTERS.map(([k, label]) => (
              <button key={k} type="button" aria-pressed={filter === k} onClick={() => setFilter(k)}>
                {label}
              </button>
            ))}
          </div>
          <span className="cbar-count">
            {total} {total === 1 ? 'result' : 'results'}
            {(q || filter !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setQ('')
                  setFilter('all')
                }}
              >
                Clear
              </button>
            )}
          </span>
        </div>
      </div>

      {!hideSkill && (
        <section className="blk" style={{ paddingTop: 40 }}>
          <div className="wrap">
            <div className="sec-head" style={{ marginBottom: 24 }}>
              <span className="eyebrow">Career &amp; skill courses</span>
              <h2>Learn a job-ready skill at JIE</h2>
            </div>
            <div className="grid-3">
              {skillList.length ? (
                skillList.map((c) => <CourseCard key={c.slug} c={c} />)
              ) : (
                <p style={{ color: 'var(--muted)' }}>No skill courses match “{q}”. Try another word, or ask a counsellor.</p>
              )}
            </div>
          </div>
        </section>
      )}

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
            {ACAD_GROUPS.map(({ k, label, tone, icon }) => {
              const list = acadList.filter((c) => c.category === k)
              if (!list.length) return null
              return (
                <div className="acad-group" key={k}>
                  <h3 className="acad-group-h">
                    <span className={`dot ${tone}`}>
                      <Icon name={icon} size="sm" />
                    </span>
                    {label}
                    <em>{list.length}</em>
                  </h3>
                  <div className="grid-3">
                    {list.map((c) => (
                      <CourseCard key={c.slug} c={c} />
                    ))}
                  </div>
                </div>
              )
            })}
            <p className="note">
              Eligibility shown is the general norm. Final eligibility, fees, duration and mode depend on the board or university.
              Ask a counsellor for your case.
            </p>
          </div>
        </section>
      )}

      {/* HELP BANNER */}
      <section className="blk">
        <div className="wrap">
          <div className="banner help-banner">
            <div>
              <span className="badge">
                <Icon name="users" size="sm" />
                Free counselling
              </span>
              <h2>Not sure which course fits you?</h2>
              <p>Tell us your goal. A counsellor will suggest the right course, batch and scholarship, usually within one working day.</p>
            </div>
            <div className="acts">
              <a className="btn btn-wa" href={counselHref} target="_blank" rel="noopener">
                <Icon name="wa" size="sm" />
                Ask on WhatsApp
              </a>
              <a className="btn btn-w" href="/scholarship">
                Take Scholarship Test <Icon name="arrow" size="sm" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

/* ---------------- Gallery (bento grid or preview) + lightbox ---------------- */
export type GalleryItem = {
  id: string | number
  title: string
  caption?: string | null
  album: string
  thumb?: string
  full?: string
  w?: number | null
  h?: number | null
}

/** Tile shape for the bento grid, from the photo's own proportions. */
function tileShape(g: GalleryItem, i: number) {
  if (i === 0) return 'big'
  if (!g.w || !g.h) return ''
  const r = g.w / g.h
  if (r >= 1.2) return 'wide'
  if (r <= 0.8) return 'tall'
  return ''
}

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
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: items.length }
    items.forEach((g) => (c[g.album] = (c[g.album] ?? 0) + 1))
    return c
  }, [items])

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
        <div className="gbar">
          <div className="wrap">
            <div className="filters">
              {[{ label: 'All photos', value: 'all' }, ...albums]
                .filter((a) => a.value === 'all' || counts[a.value])
                .map((a) => (
                  <button key={a.value} type="button" aria-pressed={album === a.value} onClick={() => setAlbum(a.value)}>
                    {a.label}
                    <em>{counts[a.value] ?? 0}</em>
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
      <div className={variant === 'preview' ? 'gal-prev' : 'bento wrap'}>
        {list.map((g, i) => (
          <button
            key={g.id}
            type="button"
            className={`gitem ${variant === 'full' ? tileShape(g, i) : ''}`}
            onClick={() => setOpen(i)}
          >
            {g.thumb ? (
              <img src={g.thumb} alt={`${g.title}${g.caption ? ` – ${g.caption}` : ''}`} loading={i < 4 ? 'eager' : 'lazy'} />
            ) : (
              <div className="ph-fb">
                <Icon name="image" size="lg" />
              </div>
            )}
            <span className="cap">
              <b>{g.title}</b>
              {g.caption}
            </span>
            {variant === 'full' && (
              <span className="zoom" aria-hidden="true">
                <Icon name="search" size="sm" />
              </span>
            )}
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
              <span className="lb-count">
                {open! + 1} / {list.length}
              </span>
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
