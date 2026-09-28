import type { Metadata } from 'next'
import Link from 'next/link'
import { getFaculty, getGallery, getSettings } from '@/lib/cms'
import { mediaAlt, mediaUrl } from '@/lib/cms-media'
import { waHref } from '@/lib/contact'
import { FacultyCard } from '@/components/Cards'
import { PageHero } from '@/components/Chrome'
import { Icon } from '@/components/Icon'

export const metadata: Metadata = { title: 'About Us' }

const VALUES = [
  ['laptop', 'Learning by doing', 'Every course is built around practical labs and real projects.'],
  ['heart', 'Personal attention', 'Tailored learning paths and faculty who know every student by name.'],
  ['brief', 'Industry relevance', 'Tools and syllabi that employers use today.'],
  ['award', 'Recognition', 'Certificates, Certification Day and awards for top performers.'],
  ['percent', 'Accessibility', 'Affordable local training, plus a scholarship test that rewards merit.'],
  ['smile', 'Community', 'Celebrations, fun activities and a close teacher–student bond.'],
]
const FACILITIES = [
  ['monitor', 'Computer labs', 'One learner per system, with licensed software.'],
  ['layout', 'Smart classrooms', 'Projector-led sessions for theory and demos.'],
  ['wifi', 'High-speed Wi-Fi', 'For research, cloud tools and live projects.'],
  ['book', 'Study material', 'Notes and practice files for every course.'],
]

export default async function AboutPage() {
  const [s, faculty, gallery] = await Promise.all([getSettings(), getFaculty(), getGallery()])
  const group = gallery.find((g) => g.album === 'classroom') ?? gallery[0]
  const cert = gallery.find((g) => g.album === 'certification') ?? gallery[1]
  const d = s.director ?? {}
  const stats = (s.stats ?? []).slice(1, 3)

  return (
    <>
      <PageHero crumb="About Us" title={<>About <span className="hl">Jagriti</span> Institute of Education</>} lead={s.tagline ?? undefined} />

      <section className="blk">
        <div className="wrap split">
          <div className="photo-stack">
            <div className="photo" style={{ aspectRatio: '4/3' }}>
              {group && <img src={mediaUrl(group.image, 'card')} alt={mediaAlt(group.image, group.title)} />}
            </div>
            <div className="small" style={{ aspectRatio: '1' }}>
              {cert && <img src={mediaUrl(cert.image, 'thumbnail')} alt={mediaAlt(cert.image, cert.title)} />}
            </div>
          </div>
          <div style={{ display: 'grid', gap: 18 }}>
            <span className="eyebrow">Our story</span>
            <h2>A neighbourhood institute with an industry mindset</h2>
            <p>
              Jagriti Institute of Education (JIE) teaches practical computer and professional skills in Shakarpur, East Delhi. Our
              courses prepare learners for careers in IT, software development, design, digital marketing, accounting and teaching.
            </p>
            <p>
              We keep batches small and classes hands-on. Every learner follows a path shaped to their goal, whether that is a first
              computer course, a year-long diploma, a teacher-training certificate or a university degree.
            </p>
            <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', marginTop: 6 }}>
              {stats.map((st, i) => (
                <div className="stat" key={st.id ?? st.label} style={i ? { border: 0, padding: 0 } : undefined}>
                  <b>{st.value}</b>
                  <span>{st.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="blk bg-lav" style={{ paddingTop: 64 }}>
        <div className="wrap mv">
          <div className="it m">
            <span className="ic-bub"><Icon name="target" /></span>
            <h3>Our mission</h3>
            <p>To shape personalised, transformative learning experiences, guiding every learner along a tailored path that builds practical skills and industry knowledge.</p>
          </div>
          <div className="it v">
            <span className="ic-bub"><Icon name="eye" /></span>
            <h3>Our vision</h3>
            <p>To help every learner unlock their potential, inspire excellence, and transform their future with education.</p>
          </div>
        </div>
      </section>

      <section className="blk">
        <div className="wrap">
          <div className="sec-head center"><span className="eyebrow">Core values</span><h2>What we stand for</h2></div>
          <div className="why">
            {VALUES.map(([i, t, p]) => (
              <div className="it" key={t}>
                <span className="ic-bub"><Icon name={i} /></span>
                <h3>{t}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {d.message && (
        <section className="blk bg-lav2">
          <div className="wrap">
            <div className="msg">
              {mediaUrl(d.photo) ? (
                <img className="av" src={mediaUrl(d.photo, 'thumbnail')} alt={mediaAlt(d.photo, d.name ?? '')} style={{ objectFit: 'cover', objectPosition: '50% 20%' }} />
              ) : (
                <div className="av">{d.name?.[4] ?? 'J'}</div>
              )}
              <div>
                <span className="eyebrow">Director’s message</span>
                <blockquote style={{ marginTop: 12 }}>{d.message}</blockquote>
                <cite>
                  <b>{d.name}</b>
                  <br />
                  {d.title}
                </cite>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="blk">
        <div className="wrap">
          <div className="sec-head center"><span className="eyebrow">Our team</span><h2>The people behind your progress</h2></div>
          <div className="fac">{faculty.map((f) => <FacultyCard key={f.id} f={f} />)}</div>
        </div>
      </section>

      <section className="blk bg-lav">
        <div className="wrap split" style={{ alignItems: 'start' }}>
          <div style={{ display: 'grid', gap: 16 }}>
            <span className="eyebrow">Milestones</span>
            <h2>Recent moments we are proud of</h2>
            <p>JIE celebrates every achievement, from a first-position certificate in MS Word to a completed diploma.</p>
          </div>
          <div className="tl">
            {[
              ['Aug 2025', '79th Independence Day', 'Teachers and students celebrated together at the centre.'],
              ['Jul 2025', 'Certification Day', 'Certificates and awards for top performers in HTML, Photoshop, MS Word and Tally Prime.'],
              ['Partners', 'Industry partnerships', 'Pixel Brush, Cracka and Xsecurity work with JIE on student projects.'],
              ['Today', 'Skill courses & academic programmes', 'Career and skill courses at the centre, plus admission guidance from 10th to Ph.D.'],
            ].map(([y, t, p]) => (
              <div className="row" key={t}>
                <div className="yr">{y}</div>
                <div className="tx"><h4>{t}</h4><p>{p}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="blk">
        <div className="wrap">
          <div className="sec-head center"><span className="eyebrow">Facilities</span><h2>Everything you need to learn by doing</h2></div>
          <div className="grid-4">
            {FACILITIES.map(([i, t, p]) => (
              <div className="info" key={t}>
                <span className="ic-bub"><Icon name={i} /></span>
                <h4>{t}</h4>
                <p style={{ color: 'var(--muted)', fontSize: 15 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="blk" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="banner">
            <div>
              <h2>Visit us near Laxmi Nagar Metro Gate 2</h2>
              <p>Meet the faculty, see the labs, and sit in a free demo class.</p>
            </div>
            <div className="acts">
              <Link className="btn btn-w" href="/contact">Get directions</Link>
              <a className="btn btn-wa" href={waHref(s.mainNumber)} target="_blank" rel="noopener">
                <Icon name="wa" size="sm" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
