'use client'

import { useId, useMemo, useRef, useState } from 'react'
import { Icon } from './Icon'

/** One row of the university catalogue as sent to the browser: only the name and key subjects. */
export type UniProgram = {
  id: number | string
  faculty: string
  name: string
  subjects?: string | null
}

const FACULTY_ICON: Record<string, string> = {
  'Arts & Humanities': 'book',
  Science: 'eye',
  Commerce: 'rupee',
  Management: 'brief',
  'Computer Science & Applications': 'laptop',
  'Library Science': 'book',
  Education: 'cap',
  'Journalism & Mass Communication': 'mega',
  Engineering: 'gear',
  Agriculture: 'target',
  'Naturopathy & Yoga': 'heart',
  'Fashion Design & Animation': 'palette',
  'Environmental Science': 'target',
  'Information & Communication Technology': 'wifi',
  'Social Science': 'users',
  'Paramedical Science': 'med',
  Biotechnology: 'shield',
  'Research (Ph.D. & M.Phil.)': 'award',
}

/** "View full list of all courses & diplomas": every course / diploma name with its key subjects, grouped by faculty. */
export function FullCatalogue({ programs }: { programs: UniProgram[] }) {
  const [open, setOpen] = useState(false)
  const [faculty, setFaculty] = useState('all')
  const [q, setQ] = useState('')
  const topRef = useRef<HTMLDivElement>(null)
  const panelId = useId()

  const faculties = useMemo(() => [...new Set(programs.map((p) => p.faculty))], [programs])

  if (!programs.length) return null

  const needle = q.trim().toLowerCase()
  const rows = programs.filter(
    (p) => (faculty === 'all' || p.faculty === faculty) && (!needle || `${p.name} ${p.subjects ?? ''}`.toLowerCase().includes(needle)),
  )
  const groups = faculties.map((name) => ({ name, rows: rows.filter((r) => r.faculty === name) })).filter((g) => g.rows.length)

  const toggle = () => {
    const next = !open
    setOpen(next)
    if (!next) topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="blk fcat" aria-labelledby={`${panelId}-h`}>
      <div className="wrap" ref={topRef}>
        <div className="fcat-head">
          <div>
            <span className="eyebrow">Complete list</span>
            <h2 id={`${panelId}-h`}>All courses &amp; diplomas</h2>
          </div>
          <button type="button" className={`fcat-toggle${open ? ' on' : ''}`} aria-expanded={open} aria-controls={panelId} onClick={toggle}>
            <Icon name="book" size="sm" />
            {open ? 'Hide full list' : 'View full list of all courses & diplomas'}
            <span className="fcat-chev" aria-hidden="true">
              <Icon name="down" size="sm" />
            </span>
          </button>
        </div>

        <div id={panelId} className="fcat-panel" hidden={!open}>
          <div className="fcat-tools">
            <label className="fcat-search">
              <Icon name="search" size="sm" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search a course, diploma or subject…"
                aria-label="Search all courses and diplomas"
              />
            </label>
          </div>
          <div className="fcat-chips" role="group" aria-label="Filter by faculty">
            <button type="button" className={faculty === 'all' ? 'on' : ''} aria-pressed={faculty === 'all'} onClick={() => setFaculty('all')}>
              All
            </button>
            {faculties.map((name) => (
              <button type="button" key={name} className={faculty === name ? 'on' : ''} aria-pressed={faculty === name} onClick={() => setFaculty(name)}>
                {name}
              </button>
            ))}
          </div>

          {groups.map((g) => (
            <div className="fcat-group" key={g.name}>
              <h3>
                <span className="dot">
                  <Icon name={FACULTY_ICON[g.name] ?? 'cap'} size="sm" />
                </span>
                {g.name}
              </h3>
              <ul className="fcat-list">
                {g.rows.map((p) => (
                  <li key={p.id}>
                    <b>{p.name}</b>
                    {p.subjects && (
                      <small>
                        <span>Key subjects:</span> {p.subjects}
                      </small>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {!groups.length && (
            <div className="fcat-empty">
              <p>No course or diploma matches your search.</p>
              <button
                type="button"
                className="btn btn-o"
                onClick={() => {
                  setFaculty('all')
                  setQ('')
                }}
              >
                Clear search
              </button>
            </div>
          )}

          <div className="fcat-foot">
            <button type="button" className="fcat-toggle on" aria-expanded={open} aria-controls={panelId} onClick={toggle}>
              Hide full list
              <span className="fcat-chev" aria-hidden="true">
                <Icon name="down" size="sm" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
