import type { Metadata } from 'next'
import Link from 'next/link'
import { getCourses, getFaqs, getGallery, getSettings } from '@/lib/cms'
import { mediaAlt, mediaUrl } from '@/lib/cms-media'
import { waHref } from '@/lib/contact'
import { FaqList } from '@/components/Cards'
import { courseGroups } from '@/components/Chrome'
import { ScholarshipForm } from '@/components/Forms'
import { Icon } from '@/components/Icon'

export const metadata: Metadata = { title: 'Scholarship Test', description: 'Take the JIE Scholarship Test and save on your course fee.' }

const BADGE = ['b-gold', 'b-long', 'b-short', 'b-plain']

export default async function ScholarshipPage() {
  const [s, courses, gallery, faqs] = await Promise.all([getSettings(), getCourses(), getGallery(), getFaqs('scholarship')])
  const sch = s.scholarship ?? {}
  const max = sch.maxDiscount ?? '50%'
  const toppers = gallery.filter((g) => g.isTopper)

  return (
    <>
      <div className="sch-hero">
        <div className="wrap">
          <div>
            <div className="crumb"><Link href="/">Home</Link> / <span>Scholarship Test</span></div>
            <h1 style={{ marginTop: 14 }}>JIE Scholarship Test</h1>
            <p>Earn up to {max} off your course fee. Register in one minute, take a 30-minute test, and get your result on WhatsApp.</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 26 }}>
              <a className="btn btn-w" href="#register">Register now <Icon name="arrow" size="sm" /></a>
              <a className="btn btn-wa" href={waHref(s.mainNumber, 'Hi JIE, I want to know the next scholarship test date.')} target="_blank" rel="noopener">
                <Icon name="wa" size="sm" />
                Ask the next test date
              </a>
            </div>
          </div>
          <div className="big">{max}<small>maximum fee waiver</small></div>
        </div>
      </div>

      <section className="blk">
        <div className="wrap">
          <div className="info-grid">
            {[
              ['users', 'Who can apply', ['School students (Class 9 and above)', 'College students and graduates', 'Working professionals', 'Anyone joining a JIE course']],
              ['file', 'Test pattern', ['30 multiple-choice questions', '30 minutes, no negative marking', 'Online, or at the Shakarpur centre', 'English and Hindi']],
              ['book', 'Syllabus', ['Basic computer awareness', 'Logical reasoning', 'Basic maths and aptitude', 'General English']],
            ].map(([i, t, list]) => (
              <div className="info" key={t as string}>
                <span className="ic-bub"><Icon name={i as string} /></span>
                <h3>{t}</h3>
                <ul>{(list as string[]).map((l) => <li key={l}>{l}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {(sch.slabs?.length ?? 0) > 0 && (
        <section className="blk bg-lav" style={{ paddingTop: 64 }}>
          <div className="wrap">
            <div className="sec-head"><span className="eyebrow">Discount slabs</span><h2>Your score decides your scholarship</h2></div>
            <div className="tbl-wrap">
              <table className="slab">
                <thead><tr><th>Test score</th><th>Scholarship on course fee</th><th>Tag</th></tr></thead>
                <tbody>
                  {sch.slabs!.map((r, i) => (
                    <tr key={r.id ?? r.score}>
                      <td><b>{r.score}</b></td>
                      <td>{r.reward}</td>
                      <td>{r.tag && <span className={`badge ${BADGE[i] ?? 'b-plain'}`}>{r.tag}</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {sch.note && <p className="note">{sch.note}</p>}
          </div>
        </section>
      )}

      <section className="blk">
        <div className="wrap">
          <div className="sec-head center"><span className="eyebrow">How it works</span><h2>Five steps to your scholarship</h2></div>
          <div className="flow">
            {[
              ['Register', 'Fill the short form below'],
              ['Get test link', 'Sent to your WhatsApp'],
              ['Take the test', '30 minutes, online or at the centre'],
              ['Get your result', 'Score and discount on WhatsApp'],
              ['Claim it', 'Use it at admission'],
            ].map(([t, p], i) => (
              <div className="st" key={t}><span className="n">{i + 1}</span><b>{t}</b><small>{p}</small></div>
            ))}
          </div>
        </div>
      </section>

      <section className="blk bg-lav2" id="register">
        <div className="wrap split" style={{ alignItems: 'start' }}>
          <div style={{ display: 'grid', gap: 16 }}>
            <span className="eyebrow">Register</span>
            <h2>Book your seat for the next test</h2>
            <p>Registration is free. We send the test link and date to the WhatsApp number you enter.</p>
            <div className="side-note"><Icon name="shield" style={{ color: 'var(--cyan)' }} />Your details are used only to contact you about the test.</div>
          </div>
          <div className="form-card">
            <ScholarshipForm groups={courseGroups(courses)} waNumber={s.mainNumber} />
          </div>
        </div>
      </section>

      {toppers.length > 0 && (
        <section className="blk">
          <div className="wrap">
            <div className="sec-head"><span className="eyebrow">Our toppers</span><h2>Students who topped their courses</h2></div>
            <div className="winners">
              {toppers.map((g) => (
                <div className="win" key={g.id}>
                  <div className="im"><img src={mediaUrl(g.image, 'thumbnail')} alt={mediaAlt(g.image, g.title)} loading="lazy" /></div>
                  <div className="tx"><b>{g.title}</b><small>{g.caption}</small></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="blk bg-lav">
        <div className="wrap">
          <div className="sec-head center"><span className="eyebrow">FAQs</span><h2>Scholarship questions</h2></div>
          <FaqList items={faqs} />
        </div>
      </section>
    </>
  )
}
