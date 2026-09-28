import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Course, Faculty } from '@/payload-types'
import { getCourse, getCourses, getFaculty, getSettings, getTestimonials } from '@/lib/cms'
import { ACADEMIC_DOCUMENTS, ACADEMIC_STEPS } from '@/lib/academic'
import { CATEGORIES, type CategoryKey } from '@/lib/options'
import { prettyPhone, telHref, waHref } from '@/lib/contact'
import { CourseCard, FacultyCard, FaqList, TestimonialCard, toLite } from '@/components/Cards'
import { courseGroups } from '@/components/Chrome'
import { EnquiryForm } from '@/components/Forms'
import { Icon } from '@/components/Icon'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = await getCourse((await params).slug)
  return c ? { title: c.title, description: c.summary } : { title: 'Course not found' }
}

const catLabel = (k: string) => CATEGORIES[k as CategoryKey]?.label ?? ''

export default async function CoursePage({ params }: Props) {
  const { slug } = await params
  const [c, all, s, tests, team] = await Promise.all([getCourse(slug), getCourses(), getSettings(), getTestimonials(), getFaculty()])
  if (!c) notFound()

  const academic = c.type === 'academic'
  const related = all
    .filter((x) => x.slug !== c.slug && (academic ? x.type === 'academic' : x.type !== 'academic'))
    .sort((a, b) => Number(b.category === c.category) - Number(a.category === c.category))
    .slice(0, 3)
  const wa = (t: string) => waHref(s.mainNumber, t)
  const coordinator = team.find((f) => /admission/i.test(f.role))

  return (
    <>
      <div className="cd-hero">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Home</Link> / <Link href="/courses">Courses</Link> / <span>{c.title}</span>
          </div>
          <div className="badges">
            <span className="badge">{academic ? 'Academic programme' : c.type === 'long' ? 'Long Term' : 'Short Term'}</span>
            <span className="badge">{catLabel(c.category)}</span>
          </div>
          <h1>{c.title}</h1>
          <p className="lead">{c.summary}</p>
          <div className="badges">
            <span className="badge"><Icon name="clock" size="sm" />{c.duration}</span>
            {academic ? (
              <>
                <span className="badge"><Icon name="cap" size="sm" />{c.eligibility}</span>
                <span className="badge"><Icon name="users" size="sm" />Admission guidance</span>
              </>
            ) : (
              <>
                <span className="badge"><Icon name="monitor" size="sm" />Classroom + lab</span>
                <span className="badge"><Icon name="award" size="sm" />Certificate</span>
                {c.level && <span className="badge"><Icon name="cap" size="sm" />{c.level}</span>}
              </>
            )}
          </div>
          <div className="ctas">
            <Link className="btn btn-g" href="/admission">
              {academic ? 'Apply for admission' : 'Enroll Now'} <Icon name="arrow" size="sm" />
            </Link>
            <a
              className="btn btn-w"
              href={wa(academic ? `Hi JIE, I want to know eligibility and fees for ${c.title}.` : `Hi JIE, please send me the brochure and fees for ${c.title}.`)}
              target="_blank"
              rel="noopener"
            >
              <Icon name={academic ? 'wa' : 'file'} size="sm" />
              {academic ? 'Check eligibility on WhatsApp' : 'Get brochure on WhatsApp'}
            </a>
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="facts">
          <div><small>Duration</small><b>{c.duration}</b></div>
          {academic ? (
            <>
              <div><small>Eligibility</small><b>{c.eligibility}</b></div>
              <div><small>Mode</small><b>As per board / university</b></div>
            </>
          ) : (
            <>
              <div><small>Batches</small><b>Morning · Evening · Weekend</b></div>
              <div><small>Level</small><b>{c.level}</b></div>
            </>
          )}
          <div>
            <small>Fees</small>
            <b><a href={wa(`Hi JIE, what is the fee for ${c.title}?`)} target="_blank" rel="noopener">Ask on WhatsApp</a></b>
          </div>
          <div>{academic ? <><small>JIE support</small><b>Counselling to exams</b></> : <><small>Language</small><b>Hindi &amp; English</b></>}</div>
        </div>

        <div className="cd-grid">
          <div className="cd-main">
            {c.whoFor && (
              <div>
                <h2>Who it’s for</h2>
                <p style={{ fontSize: 17 }}>{c.whoFor}</p>
              </div>
            )}
            {academic ? <AcademicBody c={c} coordinator={coordinator} /> : <SkillBody c={c} tests={tests} />}
            <div>
              <h2>{academic ? 'Related programmes' : 'Related courses'}</h2>
              <div className="grid-3">{related.map((r) => <CourseCard key={r.slug} c={toLite(r)} />)}</div>
            </div>
            {academic && (
              <p className="note" style={{ margin: 0 }}>
                Eligibility, duration and fees follow the rules of the board or university and can change each session.
              </p>
            )}
          </div>
          <aside className="cd-side">
            <div className="side-card">
              <EnquiryForm
                source={`Course page – ${c.title}`}
                groups={courseGroups(all)}
                defaultCourse={c.title}
                title={academic ? 'Get free admission counselling' : 'Book a free demo class'}
                waNumber={s.mainNumber}
                callHref={telHref(s.mainNumber)}
                callLabel={prettyPhone(s.mainNumber)}
              />
            </div>
            {!academic && (
              <div className="side-note" style={{ marginTop: 14 }}>
                <Icon name="percent" />
                <span>
                  Save up to {s.scholarship?.maxDiscount ?? '50%'} with the <Link href="/scholarship"><b>Scholarship Test</b></Link>
                </span>
              </div>
            )}
          </aside>
        </div>
      </div>
    </>
  )
}

function SkillBody({ c, tests }: { c: Course; tests: Awaited<ReturnType<typeof getTestimonials>> }) {
  const fac = c.faculty && typeof c.faculty === 'object' ? (c.faculty as Faculty) : null
  const key = c.title.split(' ')[0].toLowerCase()
  const matching = tests.filter((t) => t.course.toLowerCase().includes(key))
  const faqs = [
    { question: `Do I need experience for ${c.title}?`, answer: c.level?.startsWith('Beginner') ? 'No. The course starts from the basics.' : 'Basic computer or coding knowledge helps. Ask a counsellor if you are unsure.' },
    { question: 'How long is the course?', answer: `${c.title} runs for ${c.duration}, with practical lab work in every class.` },
    { question: 'Will I get a certificate?', answer: 'Yes. You receive a JIE certificate after completing the course and assessment.' },
    { question: 'Can I use a scholarship?', answer: 'Yes. Your JIE Scholarship Test result applies to this course fee.' },
  ]
  return (
    <>
      {(c.modules?.length ?? 0) > 0 && (
        <>
          <div>
            <h2>What you’ll learn</h2>
            <ul className="checks">{c.modules!.map((m) => <li key={m.id ?? m.title}><Icon name="check" /><span>{m.title}</span></li>)}</ul>
          </div>
          <div>
            <h2>Syllabus</h2>
            <div className="acc">
              {c.modules!.map((m, i) => (
                <details key={m.id ?? m.title} open={i === 0}>
                  <summary><span className="mn">Module {i + 1}</span>{m.title}<Icon name="down" /></summary>
                  <p>{m.description}</p>
                </details>
              ))}
            </div>
          </div>
        </>
      )}
      {(c.tools?.length ?? 0) > 0 && (
        <div>
          <h2>Tools &amp; software</h2>
          <div className="tools">{c.tools!.map((t) => <span key={t.id ?? t.name}>{t.name}</span>)}</div>
        </div>
      )}
      {(c.projects?.length ?? 0) > 0 && (
        <div>
          <h2>Projects you’ll build</h2>
          <div className="projs">
            {c.projects!.map((p) => (
              <div className="proj" key={p.id ?? p.title}><span className="ic-bub"><Icon name={c.icon ?? 'book'} /></span><b>{p.title}</b></div>
            ))}
          </div>
        </div>
      )}
      <div>
        <h2>Your certificate</h2>
        <div className="cert">
          <div className="cert-in">
            <small>Certificate of completion</small>
            <span className="nm">Your Name</span>
            <span style={{ color: 'var(--muted)' }}>has successfully completed</span>
            <b style={{ color: 'var(--blue)', fontSize: 18 }}>{c.title}</b>
            <span style={{ color: 'var(--muted)', fontSize: 13 }}>Jagriti Institute of Education · Delhi</span>
          </div>
        </div>
      </div>
      <Careers c={c} heading="Career opportunities" />
      {fac && (
        <div>
          <h2>Your faculty</h2>
          <div className="fac" style={{ gridTemplateColumns: 'minmax(0,340px)' }}><FacultyCard f={fac} /></div>
        </div>
      )}
      {matching.length > 0 && (
        <div>
          <h2>What students say</h2>
          <div className="tests" style={{ gridAutoColumns: 'minmax(280px,1fr)' }}>{matching.map((t) => <TestimonialCard key={t.id} t={t} tinted />)}</div>
        </div>
      )}
      <div><h2>FAQs</h2><FaqList items={faqs} flush /></div>
    </>
  )
}

function AcademicBody({ c, coordinator }: { c: Course; coordinator?: Faculty }) {
  const heading = c.category === 'medical' ? 'Courses covered' : ['school', 'edu'].includes(c.category) && c.slug !== 'b-ed-special' ? 'Subjects & focus areas' : 'Streams & specialisations'
  const faqs = [
    { question: `Am I eligible for ${c.title}?`, answer: `The general eligibility is: ${c.eligibility}. Rules differ between boards and universities, so share your marksheets with a counsellor and we will confirm.` },
    { question: 'How long does it take?', answer: `${c.title} usually takes ${c.duration}, depending on the board or university and the mode you choose.` },
    { question: 'Does JIE award this degree or certificate?', answer: 'No. The degree or certificate is awarded by the board or university you are admitted to. JIE guides your admission and supports you through the programme.' },
    { question: 'Can I study while working?', answer: 'Many programmes are available in distance or online mode. Ask a counsellor which options suit your schedule.' },
  ]
  return (
    <>
      {(c.streams?.length ?? 0) > 0 && (
        <div>
          <h2>{heading}</h2>
          <div className="tools">{c.streams!.map((t) => <span key={t.id ?? t.name}>{t.name}</span>)}</div>
        </div>
      )}
      <div>
        <h2>How JIE helps you</h2>
        <div className="acc">
          {ACADEMIC_STEPS.map(([t, p], i) => (
            <details key={t} open={i === 0}>
              <summary><span className="mn">Step {i + 1}</span>{t}<Icon name="down" /></summary>
              <p>{p}</p>
            </details>
          ))}
        </div>
      </div>
      <div>
        <h2>Documents required</h2>
        <ul className="doclist">{ACADEMIC_DOCUMENTS.map((d) => <li key={d}><Icon name="file" />{d}</li>)}</ul>
      </div>
      <Careers c={c} heading={`What’s next after ${c.title.split(' (')[0]}`} />
      {coordinator && (
        <div>
          <h2>Your admission coordinator</h2>
          <div className="fac" style={{ gridTemplateColumns: 'minmax(0,340px)' }}><FacultyCard f={coordinator} /></div>
        </div>
      )}
      <div><h2>FAQs</h2><FaqList items={faqs} flush /></div>
    </>
  )
}

function Careers({ c, heading }: { c: Course; heading: string }) {
  if (!c.careers?.length) return null
  return (
    <div>
      <h2>{heading}</h2>
      <div className="careers">{c.careers.map((r) => <span key={r.id ?? r.title}><Icon name="brief" size="sm" />{r.title}</span>)}</div>
    </div>
  )
}
