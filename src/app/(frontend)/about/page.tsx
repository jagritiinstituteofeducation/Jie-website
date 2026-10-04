import type { Metadata } from 'next'
import Link from 'next/link'
import { getCourses, getFaculty, getGallery, getSettings } from '@/lib/cms'
import { mediaAlt, mediaUrl } from '@/lib/cms-media'
import { waHref } from '@/lib/contact'
import { TeamMarquee } from '@/components/Cards'
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
  const [s, faculty, gallery, courses] = await Promise.all([getSettings(), getFaculty(), getGallery(), getCourses()])
  const group = gallery.find((g) => g.album === 'classroom') ?? gallery[0]
  const cert = gallery.find((g) => g.album === 'certification') ?? gallery[1]
  const winners = gallery.find((g) => /all winners/i.test(g.title)) ?? gallery[2]
  const independence = gallery.find((g) => /79th/i.test(g.title)) ?? gallery.find((g) => g.album === 'celebrations')
  const teamPhoto = gallery.find((g) => /teachers/i.test(g.title)) ?? group
  const counselling = gallery.find((g) => /counselling/i.test(g.title)) ?? group
  const d = s.director ?? {}
  const stats = (s.stats ?? []).slice(1, 3)
  const heroBg = mediaUrl(s.about?.heroBackground)
  const skillCount = courses.filter((c) => c.type !== 'academic').length
  const academicCount = courses.length - skillCount

  return (
    <>
      {/* HERO */}
      <div className={`ahero${heroBg ? ' has-photo' : ''}`}>
        {heroBg && (
          <div className="ahero-bg" aria-hidden="true">
            <img src={heroBg} alt="" fetchPriority="high" />
          </div>
        )}
        <div className="ahero-shade" aria-hidden="true" />
        <div className="wrap">
          <div className="ahero-copy">
            <div className="crumb">
              <Link href="/">Home</Link> / <span>About Us</span>
            </div>
            <span className="h2o-pill">
              <i />
              Shakarpur, Delhi · 2 min from Laxmi Nagar Metro
            </span>
            <h1>
              About <span className="grad-t">Jagriti</span> Institute of Education
            </h1>
            <p className="ahero-lead">{s.tagline}</p>
            <div className="ahero-chips">
              <div>
                <b>{skillCount}</b>
                <small>Career &amp; skill courses</small>
              </div>
              <div>
                <b>{academicCount}</b>
                <small>Academic programmes</small>
              </div>
              {stats.map((st) => (
                <div key={st.id ?? st.label}>
                  <b>{st.value}</b>
                  <small>{st.label}</small>
                </div>
              ))}
            </div>
            <div className="h2o-ctas">
              <Link className="btn btn-g" href="/courses">
                Explore courses <Icon name="arrow" size="sm" />
              </Link>
              <Link className="btn btn-ghost" href="/contact">
                <Icon name="pin" size="sm" />
                Visit the centre
              </Link>
            </div>
          </div>

          <div className="collage" aria-hidden={!group}>
            {group && (
              <figure className="c1">
                <img src={mediaUrl(group.image, 'card')} alt={mediaAlt(group.image, group.title)} />
                <figcaption>{group.title}</figcaption>
              </figure>
            )}
            {cert && (
              <figure className="c2">
                <img src={mediaUrl(cert.image, 'thumbnail')} alt={mediaAlt(cert.image, cert.title)} />
                <figcaption>{cert.title}</figcaption>
              </figure>
            )}
            {winners && (
              <figure className="c3">
                <img src={mediaUrl(winners.image, 'thumbnail')} alt={mediaAlt(winners.image, winners.title)} />
                <figcaption>{winners.title}</figcaption>
              </figure>
            )}
            <div className="gchip c4">
              <span className="ic-bub gold">
                <Icon name="award" />
              </span>
              <div>
                <small>Every batch</small>
                <b>Certification Day</b>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STORY */}
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
            <blockquote className="story-quote">
              <Icon name="target" />
              Learn by doing, build real projects, and leave with skills you can use from day one.
            </blockquote>
          </div>
        </div>
      </section>

      {/* MISSION / VISION */}
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

      {/* VALUES */}
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

      <section className="blk bg-lav2">
        <div className="wrap">
          {d.message && (
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
          )}

          {/* Chairman: Purnima Ma'am */}
          <div className="msg msg-chair">
            <img className="chair-photo" src="/team/purnima-maam.jpg" alt="Purnima Ma’am, Chairman of Jagriti Institute of Education" loading="lazy" />
            <div>
              <span className="eyebrow">Chairman’s message</span>
              <blockquote style={{ marginTop: 12 }}>
                At Jagriti Institute of Education, we specialise in high-quality computer education, with a wide range of IT courses
                for beginners and advanced learners. Our expert instructors bring real-world insight, so students gain practical
                skills in the latest technologies, software and programming languages. Whether you want to upgrade your skills or
                start a new career, JIE is your trusted partner for professional growth.
              </blockquote>
              <cite>
                <b>Purnima Ma’am</b>
                <br />
                Chairman, Jagriti Institute of Education
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="blk">
        <div className="wrap">
          <div className="sec-head center"><span className="eyebrow">Our team</span><h2>The people behind your progress</h2></div>
          <TeamMarquee people={faculty} />
        </div>
      </section>

      {/* MILESTONES */}
      <section className="blk ms">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Our journey</span>
            <h2>Milestones we are proud of</h2>
            <p>From Certification Day to new partnerships, every step is about students who learn by doing.</p>
          </div>
          <ol className="ms-track">
            <li className="ms-item">
              <span className="ms-dot"><Icon name="award" /></span>
              <div className="ms-card">
                <div className="ms-media">
                  {cert && <img src={mediaUrl(cert.image, 'card')} alt={mediaAlt(cert.image, cert.title)} loading="lazy" />}
                </div>
                <div className="ms-body">
                  <span className="ms-date">Jul 2025</span>
                  <h3>Certification Day</h3>
                  <p>Certificates and awards for top performers in HTML, Photoshop, MS Word and Tally Prime.</p>
                </div>
              </div>
            </li>
            <li className="ms-item">
              <span className="ms-dot"><Icon name="star" /></span>
              <div className="ms-card">
                <div className="ms-media">
                  {independence && <img src={mediaUrl(independence.image, 'card')} alt={mediaAlt(independence.image, independence.title)} loading="lazy" />}
                </div>
                <div className="ms-body">
                  <span className="ms-date">Aug 2025</span>
                  <h3>79th Independence Day</h3>
                  <p>Teachers and students celebrated together at the centre.</p>
                </div>
              </div>
            </li>
            <li className="ms-item">
              <span className="ms-dot"><Icon name="brief" /></span>
              <div className="ms-card">
                <div className="ms-media">
                  {teamPhoto && <img src={mediaUrl(teamPhoto.image, 'card')} alt={mediaAlt(teamPhoto.image, teamPhoto.title)} loading="lazy" />}
                  <div className="ms-over ms-over-logos">
                    {(s.partners ?? []).map((p) =>
                      mediaUrl(p.logo) ? <img key={p.id ?? p.name} src={mediaUrl(p.logo)} alt={`${p.name} logo`} loading="lazy" /> : null,
                    )}
                  </div>
                </div>
                <div className="ms-body">
                  <span className="ms-date">Partners</span>
                  <h3>Industry partnerships</h3>
                  <p>Pixel Brush, Cracka and Xsecurity work with JIE on student projects.</p>
                </div>
              </div>
            </li>
            <li className="ms-item">
              <span className="ms-dot now"><Icon name="trend" /></span>
              <div className="ms-card">
                <div className="ms-media">
                  {counselling && <img src={mediaUrl(counselling.image, 'card')} alt={mediaAlt(counselling.image, counselling.title)} loading="lazy" />}
                  <div className="ms-over ms-over-nums">
                    <div><b>{skillCount}</b><small>Skill courses</small></div>
                    <div><b>{academicCount}</b><small>Academic programmes</small></div>
                  </div>
                </div>
                <div className="ms-body">
                  <span className="ms-date live">Today</span>
                  <h3>Skill courses &amp; academic programmes</h3>
                  <p>Career and skill courses at the centre, plus admission guidance from 10th to Ph.D.</p>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* FACILITIES */}
      <section className="blk">
        <div className="wrap">
          <div className="sec-head center"><span className="eyebrow">Facilities</span><h2>Everything you need to learn by doing</h2></div>
          <div className="grid-4 facilities">
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

      {/* CTA */}
      <section className="blk" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div
            className={`banner${group ? ' photo-banner' : ''}`}
            style={group ? { ['--banner-img' as string]: `url("${mediaUrl(group.image, 'card')}")` } : undefined}
          >
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
