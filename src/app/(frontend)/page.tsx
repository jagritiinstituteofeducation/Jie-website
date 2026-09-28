import Link from 'next/link'
import { getCourses, getFaculty, getFaqs, getGallery, getSettings, getTestimonials } from '@/lib/cms'
import { mediaAlt, mediaUrl } from '@/lib/cms-media'
import { mapsEmbed, prettyPhone, telHref, waHref } from '@/lib/contact'
import { FaqList, TeamMarquee, TestimonialCard, toLite } from '@/components/Cards'
import { courseGroups } from '@/components/Chrome'
import { EnquiryForm } from '@/components/Forms'
import { Carousel, CountUp, CourseTabs, GalleryGrid, RotatingWords } from '@/components/Interactive'
import { Icon } from '@/components/Icon'

const WHY = [
  ['monitor', 'Hands-on labs', 'Every class happens at a computer. You practise on the same tools employers use, from Tally Prime to Premiere Pro.'],
  ['users', 'Expert faculty', 'Learn from practitioners who teach what they do every day.'],
  ['award', 'Certificates that count', 'Finish your course, pass the assessment, and collect your certificate on Certification Day.'],
  ['percent', 'Scholarship test', 'Deserving students save on fees. Take the JIE Scholarship Test and let your score speak.'],
  ['clock', 'Flexible batches', 'Morning, afternoon and weekend batches for school students, college students and working professionals.'],
  ['train', 'Easy to reach', 'Kalra Complex, Shakarpur. Walk two minutes from Laxmi Nagar Metro Gate No. 2.'],
]
const STEPS = [
  ['Enquire', 'Call, WhatsApp or fill the form. A counsellor helps you choose a course.'],
  ['Free demo class', 'Sit in a real class at our Shakarpur centre before you decide.'],
  ['Enroll', 'Pick your batch, submit your documents, and start learning.'],
  ['Get certified', 'Build your projects, clear the assessment, and celebrate on Certification Day.'],
]

export default async function HomePage() {
  const [s, courses, faculty, tests, gallery, faqs] = await Promise.all([
    getSettings(),
    getCourses(),
    getFaculty(),
    getTestimonials(),
    getGallery(),
    getFaqs('general'),
  ])
  const d = s.director ?? {}
  const directorPhoto = mediaUrl(d.photo, 'card')
  const skillCount = courses.filter((c) => c.type !== 'academic').length
  const ticker = courses.filter((c) => c.type !== 'academic')
  const home = s.home ?? {}
  const heroBg = mediaUrl(home.heroBackground)
  const bannerBg = mediaUrl(home.bannerBackground, 'card')
  const words = (home.rotatingWords ?? []).map((w) => w.word).filter(Boolean)
  const rotating = words.length ? words : ['Coding', 'Design', 'Accounting', 'Digital Marketing', 'Teaching']
  const strip = gallery.filter((g) => mediaUrl(g.image, 'thumbnail'))

  return (
    <>
      {/* HERO */}
      <div className={`h2o${heroBg ? ' has-photo' : ''}`}>
        {heroBg && (
          <div className="h2o-bg" aria-hidden="true">
            <img src={heroBg} alt="" fetchPriority="high" />
          </div>
        )}
        <div className="h2o-shade" aria-hidden="true" />
        <span className="h2o-mark" aria-hidden="true">JIE</span>
        <div className="wrap">
          <div className="h2o-copy reveal">
            <span className="h2o-pill"><i />Admissions open · New batches every month</span>
            <h1>
              Welcome to <span className="grad-t">Jagriti</span> Institute of Education
            </h1>
            <p className="h2o-rotate">
              Become job-ready in{' '}
              <RotatingWords words={rotating} />
            </p>
            <p className="h2o-lead">
              Hands-on IT, design, accounting and teaching courses that make you job-ready. Learn in real labs, build real projects,
              and graduate with a certificate you can show.
            </p>
            <div className="h2o-ctas">
              <Link className="btn btn-g" href="/admission">
                Enroll Now <Icon name="arrow" size="sm" />
              </Link>
              <Link className="btn btn-ghost" href="/scholarship">
                <Icon name="percent" size="sm" />
                Take Scholarship Test
              </Link>
            </div>
            <div className="h2o-proof">
              <div className="avs">
                {tests.slice(0, 5).map((t) => {
                  const src = mediaUrl(t.photo, 'thumbnail')
                  return src ? <img key={t.id} src={src} alt={t.name} /> : null
                })}
                <span>+</span>
              </div>
              <div>
                <span className="stars">★★★★★</span>
                <br />
                <small>Loved by students across East Delhi</small>
              </div>
            </div>
            <div className="h2o-facts glass">
              <div><b>{skillCount}</b><small>Courses</small></div>
              <div><b>{s.stats?.[1]?.value ?? '2,000+'}</b><small>Projects</small></div>
              <div><b>2 min</b><small>from Laxmi Nagar Metro</small></div>
            </div>
          </div>

          <div className="h2o-vis">
            <div className="arch-glow" aria-hidden="true" />
            <div className="arch-ring" aria-hidden="true" />
            <figure className="arch">
              {directorPhoto && <img src={directorPhoto} alt={mediaAlt(d.photo, `${d.name}, Director`)} />}
              <figcaption>
                <span className="lbl">Director</span>
                <b>{d.name}</b>
                <small>{s.instituteName}</small>
              </figcaption>
            </figure>
            <div className="gchip g1"><span className="ic-bub"><Icon name="trend" /></span><div><small>Grow with IT skills</small><b>100% practical</b></div></div>
            <div className="gchip g2"><span className="ic-bub gold"><Icon name="award" /></span><div><small>Certification Day</small><b>Every batch</b></div></div>
            <div className="gchip g3"><span className="ic-bub"><Icon name="code" /></span><div><small>Computer labs</small><b>Hands-on every class</b></div></div>
          </div>
        </div>
        <span className="scroll-cue" aria-hidden="true"><i /></span>
      </div>

      <Link className="sch-strip" href="/scholarship">
        <span className="wrap">
          <span className="badge">New</span>
          <span>
            <b>JIE Scholarship Test is open.</b> Save up to {s.scholarship?.maxDiscount ?? '50%'} on your course fee.
          </span>
          <span className="go">
            Register free <Icon name="arrow" size="sm" />
          </span>
        </span>
      </Link>

      <div className="ticker" aria-label="Courses we teach">
        <div className="track">
          {[...ticker, ...ticker].map((c, i) => (
            <Link key={`${c.slug}-${i}`} href={`/courses/${c.slug}`} tabIndex={i < ticker.length ? undefined : -1} aria-hidden={i >= ticker.length || undefined}>
              <span className="ic-bub"><Icon name={c.icon ?? 'book'} /></span>
              {c.title}
            </Link>
          ))}
        </div>
      </div>

      {/* STATS + PARTNERS */}
      <div className="wrap">
        <div className="trust reveal" style={{ marginTop: 48 }}>
          {(s.stats ?? []).map((st) => (
            <div className="stat" key={st.id ?? st.label}>
              <CountUp value={st.value} />
              <span>{st.label}</span>
            </div>
          ))}
        </div>
        {(s.partners?.length ?? 0) > 0 && (
          <div className="partners">
            <small>Industry partners</small>
            {s.partners!.map((p) => (
              <div className="partner" key={p.id ?? p.name}>
                {mediaUrl(p.logo) && <img src={mediaUrl(p.logo)} alt={`${p.name} logo`} />}
                <span><b>{p.name}</b>{p.tagline}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DIRECTOR */}
      <section className="blk">
        <div className="wrap dir">
          <div className="frame">
            {directorPhoto && <img src={directorPhoto} alt={mediaAlt(d.photo, `${d.name}, Director`)} loading="lazy" />}
            <div className="tag">
              <span className="ic-bub" style={{ width: 46, height: 46 }}><Icon name="award" /></span>
              <div><b>{d.name}</b><small>Director, JIE</small></div>
            </div>
          </div>
          <div style={{ display: 'grid', gap: 18 }}>
            <span className="eyebrow">From the Director’s desk</span>
            <h2>
              Led by <span className="hl">{d.name}</span>, built around every student
            </h2>
            <p style={{ fontSize: 17 }}>{d.message}</p>
            <div className="pts">
              {['Hands-on lab training', 'Personal mentoring', 'Industry-focused syllabus', 'Recognised certificates'].map((p) => (
                <div key={p}><Icon name="check" />{p}</div>
              ))}
            </div>
            <div>
              <span className="sig">{d.name?.replace(/^Mr\.?\s*/, '')}</span>
              <br />
              <small style={{ color: 'var(--muted)' }}>{d.title}</small>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 4 }}>
              <Link className="btn btn-g" href="/about">
                Know more about JIE <Icon name="arrow" size="sm" />
              </Link>
              <a className="btn btn-wa" href={waHref(s.mainNumber, 'Hi JIE, I would like to book a counselling session.')} target="_blank" rel="noopener">
                <Icon name="wa" size="sm" />
                Book a counselling session
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section className="blk bg-lav2">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Our courses</span>
            <h2>Pick the skill that fits your next step</h2>
            <p>From a first computer course to a year-long diploma, and admission guidance from 10th to Ph.D.</p>
          </div>
          <CourseTabs courses={courses.map(toLite)} />
          <div className="center-row">
            <Link className="btn btn-o" href="/courses">
              View all courses <Icon name="arrow" size="sm" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="blk bg-lav">
        <div className="wrap">
          <div className="sec-head center"><span className="eyebrow">Why choose JIE</span><h2>Learning that feels like the real job</h2></div>
          <div className="why">
            {WHY.map(([i, t, p]) => (
              <div className="it" key={t}>
                <span className="ic-bub"><Icon name={i} /></span>
                <h3>{t}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="blk">
        <div className="wrap">
          <div className={`banner${bannerBg ? ' photo-banner' : ''}`} style={bannerBg ? { ['--banner-img' as string]: `url("${bannerBg}")` } : undefined}>
            <div>
              <span className="badge"><Icon name="star" size="sm" />Scholarship test open</span>
              <h2>Take the JIE Scholarship Test and save up to {s.scholarship?.maxDiscount ?? '50%'} on your fees</h2>
              <p>A short 30-minute test. Your score decides your discount, and results reach you on WhatsApp.</p>
            </div>
            <div className="acts">
              <Link className="btn btn-w" href="/scholarship">
                Register for the test <Icon name="arrow" size="sm" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="blk bg-lav2" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="sec-head center"><span className="eyebrow">How it works</span><h2>From first call to certificate in four steps</h2></div>
          <div className="steps">
            {STEPS.map(([t, p], i) => (
              <div className="step" key={t}>
                <div className="n">{i + 1}</div>
                <h4>{t}</h4>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="blk">
        <div className="wrap">
          <div className="sec-head center"><span className="eyebrow">Meet the team</span><h2>Mentors and guides behind your progress</h2></div>
          <TeamMarquee people={faculty} />
        </div>
      </section>

      {/* PHOTO STRIP */}
      {strip.length > 3 && (
        <div className="photo-strip" aria-label="Moments at JIE">
          <div className="ps-track">
            {[...strip, ...strip].map((g, i) => (
              <figure key={`${g.id}-${i}`} aria-hidden={i >= strip.length || undefined}>
                <img src={mediaUrl(g.image, 'thumbnail')} alt={i < strip.length ? mediaAlt(g.image, g.title) : ''} loading="lazy" />
                <figcaption>{g.title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}

      {/* TESTIMONIALS */}
      <section className="blk bg-lav">
        <div className="wrap">
          <Carousel heading={<div className="sec-head"><span className="eyebrow">What our students say</span><h2>Real students, real skills</h2></div>}>
            {tests.map((t) => <TestimonialCard key={t.id} t={t} />)}
          </Carousel>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="blk">
        <div className="wrap">
          <div className="row-between">
            <div className="sec-head"><span className="eyebrow">Life at JIE</span><h2>Winners, celebrations and Certification Day</h2></div>
            <Link className="link-arrow" href="/gallery">View full gallery <Icon name="arrow" size="sm" /></Link>
          </div>
          <GalleryGrid
            variant="preview"
            items={gallery.slice(0, 5).map((g) => ({ id: g.id, title: g.title, caption: g.caption, album: g.album, thumb: mediaUrl(g.image, 'card'), full: mediaUrl(g.image) }))}
          />
        </div>
      </section>

      {/* ENQUIRY + MAP */}
      <section className="blk bg-lav2">
        <div className="wrap enq">
          <div className="form-card">
            <EnquiryForm source="Home page" groups={courseGroups(courses)} waNumber={s.mainNumber} callHref={telHref(s.mainNumber)} callLabel={prettyPhone(s.mainNumber)} />
          </div>
          <div className="map">
            <iframe title="JIE location map" loading="lazy" src={mapsEmbed(s.mapQuery)} />
            <div className="pin">
              <Icon name="pin" />
              <div><b style={{ color: 'var(--navy)' }}>U 75, First Floor, Kalra Complex</b><br />Shakarpur, near Laxmi Nagar Metro Gate No. 2</div>
            </div>
          </div>
        </div>
      </section>

      <section className="blk">
        <div className="wrap">
          <div className="sec-head center"><span className="eyebrow">FAQs</span><h2>Questions parents and students ask</h2></div>
          <FaqList items={faqs} />
        </div>
      </section>
    </>
  )
}
