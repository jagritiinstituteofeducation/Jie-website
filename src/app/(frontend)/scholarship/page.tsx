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

const TIERS = ['gold', 'silver', 'merit', 'plain']
const TIER_ICON = ['award', 'star', 'check', 'users']

const INFO = [
  ['users', 'Who can apply', ['School students (Class 9 and above)', 'College students and graduates', 'Working professionals', 'Anyone joining a JIE course']],
  ['file', 'Test pattern', ['30 multiple-choice questions', '30 minutes, no negative marking', 'Online, or at the Shakarpur centre', 'English and Hindi']],
  ['book', 'Syllabus', ['Basic computer awareness', 'Logical reasoning', 'Basic maths and aptitude', 'General English']],
] as const

const STEPS = [
  ['file', 'Register', 'Fill the short form below'],
  ['wa', 'Get test link', 'Sent to your WhatsApp'],
  ['clock', 'Take the test', '30 minutes, online or at the centre'],
  ['trend', 'Get your result', 'Score and discount on WhatsApp'],
  ['award', 'Claim it', 'Use it at admission'],
]

export default async function ScholarshipPage() {
  const [s, courses, gallery, faqs] = await Promise.all([getSettings(), getCourses(), getGallery(), getFaqs('scholarship')])
  const sch = s.scholarship ?? {}
  const max = sch.maxDiscount ?? '50%'
  const maxNum = Number.parseInt(max, 10) || 50
  const slabs = sch.slabs ?? []
  const toppers = gallery.filter((g) => g.isTopper)

  return (
    <>
      {/* HERO */}
      <div className="shero">
        <div className="wrap">
          <div className="shero-copy">
            <div className="crumb">
              <Link href="/">Home</Link> / <span>Scholarship Test</span>
            </div>
            <span className="h2o-pill gold-pill">
              <i />
              Scholarship Test open · Registration is free
            </span>
            <h1>
              Earn up to <span className="gold-t">{max} off</span> your course fee
            </h1>
            <p className="shero-lead">
              Take a short 30-minute test. Your score decides your scholarship, and the result reaches you on WhatsApp.
            </p>
            <div className="h2o-ctas">
              <a className="btn btn-gold" href="#register">
                Register free <Icon name="arrow" size="sm" />
              </a>
              <a
                className="btn btn-ghost"
                href={waHref(s.mainNumber, 'Hi JIE, I want to know the next scholarship test date.')}
                target="_blank"
                rel="noopener"
              >
                <Icon name="wa" size="sm" />
                Ask the next test date
              </a>
            </div>
            <div className="shero-facts">
              {[
                ['file', '30 questions'],
                ['clock', '30 minutes'],
                ['monitor', 'Online or at the centre'],
                ['wa', 'Result on WhatsApp'],
              ].map(([i, t]) => (
                <span key={t}>
                  <Icon name={i} size="sm" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="shero-vis" aria-hidden="true">
            <div className="ring" style={{ ['--p' as string]: maxNum }}>
              <div className="ring-in">
                <small>up to</small>
                <b>{max}</b>
                <small>fee waiver</small>
              </div>
            </div>
            {slabs.slice(0, 3).map((r, i) => (
              <div key={r.id ?? r.score} className={`tier-chip t${i + 1} ${TIERS[i]}`}>
                <span>
                  <Icon name={TIER_ICON[i]} size="sm" />
                </span>
                <div>
                  <b>{r.tag || r.reward}</b>
                  <small>{r.score}</small>
                </div>
              </div>
            ))}
            <div className="spark s1" />
            <div className="spark s2" />
            <div className="spark s3" />
          </div>
        </div>
      </div>

      {/* WHO / PATTERN / SYLLABUS */}
      <section className="blk">
        <div className="wrap">
          <div className="info-grid sinfo">
            {INFO.map(([i, t, list], n) => (
              <div className="info" key={t}>
                <div className="sinfo-head">
                  <span className="ic-bub"><Icon name={i} /></span>
                  <em>0{n + 1}</em>
                </div>
                <h3>{t}</h3>
                <ul>
                  {list.map((l) => (
                    <li key={l}>
                      <Icon name="check" size="sm" />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REWARD TIERS */}
      {slabs.length > 0 && (
        <section className="blk bg-lav" style={{ paddingTop: 64 }}>
          <div className="wrap">
            <div className="sec-head center">
              <span className="eyebrow">Discount slabs</span>
              <h2>Your score decides your scholarship</h2>
            </div>
            <div className="tiers">
              {slabs.map((r, i) => (
                <div key={r.id ?? r.score} className={`tier ${TIERS[i] ?? 'plain'}`}>
                  {i === 0 && <span className="tier-ribbon">Top reward</span>}
                  <span className="tier-medal">
                    <Icon name={TIER_ICON[i] ?? 'users'} />
                  </span>
                  <small>{r.tag}</small>
                  <b>{r.reward}</b>
                  <span className="tier-score">Score {r.score}</span>
                </div>
              ))}
            </div>
            {sch.note && <p className="note" style={{ textAlign: 'center' }}>{sch.note}</p>}
          </div>
        </section>
      )}

      {/* HOW IT WORKS */}
      <section className="blk">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">How it works</span>
            <h2>Five steps to your scholarship</h2>
          </div>
          <ol className="sflow">
            {STEPS.map(([i, t, p], n) => (
              <li key={t}>
                <span className="sflow-n">
                  <Icon name={i} />
                  <em>{n + 1}</em>
                </span>
                <b>{t}</b>
                <small>{p}</small>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* REGISTER */}
      <section className="blk sreg" id="register">
        <div className="wrap sreg-grid">
          <div className="sreg-side">
            <span className="eyebrow">Register</span>
            <h2>Book your seat for the next test</h2>
            <p>Registration is free. We send the test link and date to the WhatsApp number you enter.</p>
            <ul className="sreg-perks">
              <li><Icon name="percent" />Up to {max} off your course fee</li>
              <li><Icon name="clock" />Only 30 minutes, no negative marking</li>
              <li><Icon name="monitor" />Take it online or at the centre</li>
              <li><Icon name="users" />Free counselling for every participant</li>
            </ul>
            <div className="side-note">
              <Icon name="shield" style={{ color: 'var(--cyan)' }} />
              Your details are used only to contact you about the test.
            </div>
          </div>
          <div className="form-card">
            <h3>Scholarship test registration</h3>
            <p className="sub">Takes less than a minute.</p>
            <ScholarshipForm groups={courseGroups(courses)} waNumber={s.mainNumber} />
          </div>
        </div>
      </section>

      {/* TOPPERS */}
      {toppers.length > 0 && (
        <section className="blk">
          <div className="wrap">
            <div className="sec-head center">
              <span className="eyebrow">Our toppers</span>
              <h2>Students who topped their courses</h2>
            </div>
            <div className="winners stoppers">
              {toppers.map((g) => {
                const pos = /(\d+)(st|nd|rd|th) position/i.exec(g.caption ?? '')
                return (
                  <div className="win" key={g.id}>
                    <div className="im">
                      <img src={mediaUrl(g.image, 'thumbnail')} alt={mediaAlt(g.image, g.title)} loading="lazy" />
                      {pos && (
                        <span className={`pos p${pos[1]}`}>
                          <Icon name="award" size="sm" />
                          {pos[1]}
                          {pos[2]}
                        </span>
                      )}
                    </div>
                    <div className="tx">
                      <b>{g.title}</b>
                      <small>{g.caption}</small>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="blk bg-lav">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">FAQs</span>
            <h2>Scholarship questions</h2>
          </div>
          <FaqList items={faqs} />
        </div>
      </section>
    </>
  )
}
