import type { Metadata } from 'next'
import Link from 'next/link'
import { getCourses, getFaqs, getSettings, getTestimonials } from '@/lib/cms'
import { mediaUrl } from '@/lib/cms-media'
import { waHref } from '@/lib/contact'
import { FaqList } from '@/components/Cards'
import { courseGroups } from '@/components/Chrome'
import { AdmissionForm } from '@/components/Forms'
import { Icon } from '@/components/Icon'

export const metadata: Metadata = { title: 'Admission', description: 'Apply online for admission to Jagriti Institute of Education.' }

const STEPS = [
  ['phone', 'Enquiry', 'Call, WhatsApp or apply online'],
  ['users', 'Counselling & demo', 'Meet a counsellor, attend a free class'],
  ['file', 'Admission form', 'Online or at the centre'],
  ['upload', 'Documents', 'ID proof, photo, marksheet'],
  ['award', 'Fee & batch', 'Pay and get your batch'],
]

const DOCS = [
  ['file', 'Aadhaar card or any government ID'],
  ['image', 'Two passport-size photographs'],
  ['cap', 'Latest marksheet or qualification proof'],
  ['award', 'Scholarship result (if any)'],
]

const PAY = [
  ['rupee', 'Cash', 'At the centre'],
  ['phone2', 'UPI', 'Any UPI app'],
  ['cal', 'Instalments', 'On long-term courses'],
]

export default async function AdmissionPage() {
  const [s, courses, faqs, tests] = await Promise.all([getSettings(), getCourses(), getFaqs('admission'), getTestimonials()])
  const max = s.scholarship?.maxDiscount ?? '50%'
  const faces = tests.filter((t) => mediaUrl(t.photo, 'thumbnail')).slice(0, 5)

  return (
    <>
      {/* HERO */}
      <div className="adhero">
        <div className="wrap">
          <div className="adhero-copy">
            <div className="crumb">
              <Link href="/">Home</Link> / <span>Admission</span>
            </div>
            <span className="h2o-pill">
              <i />
              Admissions open · New batches every month
            </span>
            <h1>
              Your journey starts with <span className="grad-t">one simple form</span>
            </h1>
            <p className="adhero-lead">
              Choose a course, pick a batch and apply online in four short steps. Our admissions desk confirms your seat and fee,
              usually within one working day.
            </p>
            <div className="h2o-ctas">
              <a className="btn btn-g" href="#apply">
                Start application <Icon name="arrow" size="sm" />
              </a>
              <a className="btn btn-ghost" href={waHref(s.mainNumber, 'Hi JIE, I need help with my admission.')} target="_blank" rel="noopener">
                <Icon name="wa" size="sm" />
                Get help on WhatsApp
              </a>
            </div>
            <div className="adhero-facts">
              {[
                ['clock', 'Takes about 3 minutes'],
                ['upload', 'Upload documents online'],
                ['percent', `Scholarship up to ${max} applies`],
                ['cal', 'Instalments available'],
              ].map(([i, t]) => (
                <span key={t}>
                  <Icon name={i} size="sm" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="adhero-vis" aria-hidden="true">
            <div className="adhero-glow" />
            <div className="appcard">
              <div className="appcard-top">
                <span className="dots"><i /><i /><i /></span>
                <small>Online admission form</small>
              </div>
              <div className="appcard-body">
                {[
                  ['Personal details', 'done'],
                  ['Course & batch', 'done'],
                  ['Documents', 'active'],
                  ['Review & submit', ''],
                ].map(([label, state], i) => (
                  <div key={label} className={`appstep ${state}`}>
                    <span>{state === 'done' ? <Icon name="check" size="sm" /> : i + 1}</span>
                    <b>{label}</b>
                    {state === 'active' && <em>In progress</em>}
                  </div>
                ))}
                <div className="appbar"><i /></div>
                <div className="appfields">
                  <div><small>Course</small><b>Full Stack Development</b></div>
                  <div><small>Batch</small><b>Morning</b></div>
                </div>
              </div>
            </div>
            <div className="gchip ok-chip">
              <span className="ic-bub ok"><Icon name="check" /></span>
              <div><small>Application</small><b>Received!</b></div>
            </div>
          </div>
        </div>
      </div>

      {/* PROCESS */}
      <section className="blk">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Admission process</span>
            <h2>Five steps to your first class</h2>
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

      {/* APPLY */}
      <section className="blk adapply" id="apply">
        <div className="wrap adapply-grid">
          <aside className="adapply-side">
            <div className="adcard">
              <span className="eyebrow">Documents required</span>
              <ul className="adcheck">
                {DOCS.map(([i, t]) => (
                  <li key={t}>
                    <span><Icon name={i} size="sm" /></span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="adcard">
              <span className="eyebrow">Fees &amp; payment</span>
              <div className="adpay">
                {PAY.map(([i, t, p]) => (
                  <div key={t}>
                    <Icon name={i} />
                    <b>{t}</b>
                    <small>{p}</small>
                  </div>
                ))}
              </div>
              <p className="note" style={{ margin: 0 }}>
                Course fees vary by programme. Ask a counsellor on WhatsApp for the current fee and any scholarship you qualify for.
              </p>
            </div>
            <a className="adhelp" href={waHref(s.mainNumber, 'Hi JIE, I need help with the admission form.')} target="_blank" rel="noopener">
              <span><Icon name="wa" /></span>
              <div>
                <b>Need help with the form?</b>
                <small>Chat with our admissions desk on WhatsApp</small>
              </div>
              <Icon name="arrow" size="sm" />
            </a>
          </aside>
          <div className="form-card adform">
            <AdmissionForm groups={courseGroups(courses)} waNumber={s.mainNumber} />
          </div>
        </div>
      </section>

      {/* TRUST BAND */}
      {faces.length > 0 && (
        <section className="blk adtrust">
          <div className="wrap adtrust-in">
            <div className="adtrust-faces">
              {faces.map((t) => (
                <img key={t.id} src={mediaUrl(t.photo, 'thumbnail')} alt={t.name} />
              ))}
            </div>
            <div>
              <h3>Join students like {faces.slice(0, 3).map((t) => t.name).join(', ')} and more</h3>
              <p>Hands-on classes, supportive faculty and a certificate you can show. Your seat is one form away.</p>
            </div>
            <a className="btn btn-g" href="#apply">
              Apply now <Icon name="arrow" size="sm" />
            </a>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="blk">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">FAQs</span>
            <h2>Admission questions</h2>
          </div>
          <FaqList items={faqs} />
        </div>
      </section>
    </>
  )
}
