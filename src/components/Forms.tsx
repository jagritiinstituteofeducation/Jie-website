'use client'

import { startTransition, useActionState, useRef, useState } from 'react'
import { submitAdmission, submitEnquiry, submitScholarship, type FormResult } from '@/app/(frontend)/actions'
import { BATCHES } from '@/lib/options'
import { Icon } from './Icon'

export type CourseGroups = { long: string[]; short: string[]; academic: string[] }

/** Submits through a server action without React's automatic form reset, so a failed
 *  submission keeps everything the visitor typed. */
function useSubmit(fn: (prev: FormResult, fd: FormData) => Promise<FormResult>) {
  const [state, dispatch, pending] = useActionState<FormResult, FormData>(fn, null)
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    startTransition(() => dispatch(fd))
  }
  return { state, pending, onSubmit }
}

function CourseOptions({ groups }: { groups: CourseGroups }) {
  return (
    <>
      <option value="">Select a course</option>
      <optgroup label="Long term">{groups.long.map((c) => <option key={c}>{c}</option>)}</optgroup>
      <optgroup label="Short term">{groups.short.map((c) => <option key={c}>{c}</option>)}</optgroup>
      <optgroup label="Academic programmes">{groups.academic.map((c) => <option key={c}>{c}</option>)}</optgroup>
    </>
  )
}

/** Invisible to people; bots that fill every field get silently ignored. */
const Honeypot = () => (
  <div aria-hidden="true" style={{ position: 'absolute', left: -9999, width: 1, height: 1, overflow: 'hidden' }}>
    <label>
      Website <input name="website" tabIndex={-1} autoComplete="off" />
    </label>
  </div>
)

function Done({ title, text, waHref }: { title: string; text: React.ReactNode; waHref?: string }) {
  return (
    <div className="done" role="status">
      <span className="ic-bub">
        <Icon name="check" size="lg" />
      </span>
      <h3>{title}</h3>
      <p style={{ color: 'var(--muted)' }}>{text}</p>
      {waHref && (
        <a className="btn btn-wa btn-sm" href={waHref} target="_blank" rel="noopener">
          <Icon name="wa" size="sm" />
          Chat on WhatsApp now
        </a>
      )}
    </div>
  )
}

const ErrorLine = ({ state }: { state: FormResult }) =>
  state && !state.ok ? (
    <p role="alert" style={{ color: 'var(--err)', fontSize: 14, margin: 0 }}>
      {state.error}
    </p>
  ) : null

/* ---------------- Enquiry / demo class ---------------- */
export function EnquiryForm({
  source,
  groups,
  defaultCourse,
  title = 'Book a free counselling call',
  waNumber,
  callLabel,
  callHref,
}: {
  source: string
  groups: CourseGroups
  defaultCourse?: string
  title?: string
  waNumber: string
  callLabel: string
  callHref: string
}) {
  const { state, pending, onSubmit } = useSubmit(submitEnquiry)
  if (state?.ok)
    return (
      <Done
        title={`Thank you${state.name ? `, ${state.name.split(' ')[0]}` : ''}!`}
        text="We have received your enquiry. A counsellor will call or WhatsApp you within one working day."
        waHref={`https://wa.me/91${waNumber}`}
      />
    )
  return (
    <>
      <h3>{title}</h3>
      <p className="sub">Tell us what you want to learn. A counsellor will get back to you within one working day.</p>
      <form className="form" onSubmit={onSubmit} style={{ position: 'relative' }}>
        <Honeypot />
        <input type="hidden" name="source" value={source} />
        <div className="two">
          <div className="fld">
            <label htmlFor={`${source}-n`}>Your name</label>
            <input id={`${source}-n`} name="name" required autoComplete="name" minLength={2} />
          </div>
          <div className="fld">
            <label htmlFor={`${source}-p`}>Mobile / WhatsApp</label>
            <input id={`${source}-p`} name="phone" required inputMode="tel" pattern="[0-9+ ]{10,14}" placeholder="10-digit mobile" />
          </div>
        </div>
        <div className="fld">
          <label htmlFor={`${source}-e`}>Email (optional, for a confirmation)</label>
          <input id={`${source}-e`} name="email" type="email" autoComplete="email" />
        </div>
        <div className="fld">
          <label htmlFor={`${source}-c`}>Course</label>
          <select id={`${source}-c`} name="course" required defaultValue={defaultCourse ?? ''}>
            <CourseOptions groups={groups} />
          </select>
        </div>
        <div className="fld">
          <label htmlFor={`${source}-b`}>Preferred batch</label>
          <select id={`${source}-b`} name="batch">
            {BATCHES.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>
        <ErrorLine state={state} />
        <button className="btn btn-g" type="submit" disabled={pending}>
          {pending ? 'Sending…' : 'Send enquiry'} <Icon name="arrow" size="sm" />
        </button>
        <p className="note" style={{ margin: 0 }}>
          Or call <a href={callHref}>{callLabel}</a>
        </p>
      </form>
    </>
  )
}

/* ---------------- Scholarship test registration ---------------- */
export function ScholarshipForm({ groups, waNumber }: { groups: CourseGroups; waNumber: string }) {
  const { state, pending, onSubmit } = useSubmit(submitScholarship)
  if (state?.ok)
    return (
      <Done
        title={`You're registered${state.name ? `, ${state.name.split(' ')[0]}` : ''}!`}
        text="We will send the test link and date to your WhatsApp number."
        waHref={`https://wa.me/91${waNumber}`}
      />
    )
  return (
    <form className="form" onSubmit={onSubmit} style={{ position: 'relative' }}>
      <Honeypot />
      <div className="two">
        <div className="fld">
          <label htmlFor="sName">Full name</label>
          <input id="sName" name="name" required autoComplete="name" minLength={2} />
        </div>
        <div className="fld">
          <label htmlFor="sPhone">WhatsApp number</label>
          <input id="sPhone" name="phone" required inputMode="tel" pattern="[0-9+ ]{10,14}" placeholder="10-digit mobile" />
        </div>
      </div>
      <div className="fld">
        <label htmlFor="sEmail">Email (optional)</label>
        <input id="sEmail" name="email" type="email" autoComplete="email" />
      </div>
      <div className="two">
        <div className="fld">
          <label htmlFor="sClass">Class / qualification</label>
          <select id="sClass" name="qualification" required defaultValue="">
            <option value="">Select</option>
            {['Class 9–10', 'Class 11–12', 'College student', 'Graduate', 'Working professional'].map((q) => (
              <option key={q}>{q}</option>
            ))}
          </select>
        </div>
        <div className="fld">
          <label htmlFor="sCourse">Course of interest</label>
          <select id="sCourse" name="course" required defaultValue="">
            <CourseOptions groups={groups} />
          </select>
        </div>
      </div>
      <div className="fld">
        <label htmlFor="sMode">Test mode</label>
        <select id="sMode" name="mode">
          <option>Online</option>
          <option>At the Shakarpur centre</option>
        </select>
      </div>
      <label className="chk">
        <input type="checkbox" name="consent" required /> I agree to be contacted by JIE on call and WhatsApp.
      </label>
      <ErrorLine state={state} />
      <button className="btn btn-g" type="submit" disabled={pending}>
        {pending ? 'Registering…' : 'Register for the test'}
      </button>
    </form>
  )
}

/* ---------------- Admission (4 steps, one submit) ---------------- */
const STEPS = ['Personal', 'Course & batch', 'Documents', 'Review']

export function AdmissionForm({ groups, waNumber }: { groups: CourseGroups; waNumber: string }) {
  const { state, pending, onSubmit } = useSubmit(submitAdmission)
  const [step, setStep] = useState(0)
  const [files, setFiles] = useState<Record<string, string>>({})
  const [review, setReview] = useState<[string, string][]>([])
  const formRef = useRef<HTMLFormElement>(null)

  if (state?.ok)
    return (
      <Done
        title={`Application received${state.name ? `, ${state.name.split(' ')[0]}` : ''}`}
        text="Our admissions desk will confirm your batch and fee. Please bring your original documents to the centre."
        waHref={`https://wa.me/91${waNumber}`}
      />
    )

  const next = () => {
    const form = formRef.current!
    const current = form.querySelector<HTMLElement>(`[data-step="${step}"]`)!
    const fields = [...current.querySelectorAll<HTMLInputElement | HTMLSelectElement>('input,select,textarea')]
    const bad = fields.find((f) => !f.checkValidity())
    if (bad) {
      bad.reportValidity()
      return
    }
    if (step === 2) {
      const fd = new FormData(form)
      const v = (k: string) => String(fd.get(k) ?? '') || '—'
      setReview([
        ['Name', v('name')], ['Phone', v('phone')], ['Email', v('email')], ['Date of birth', v('dob')],
        ['Course', v('course')], ['Batch', v('batch')], ['Qualification', v('qualification')], ['Scholarship code', v('scholarshipCode')],
        ['Documents', Object.values(files).join(', ') || 'Will bring to the centre'],
      ])
    }
    setStep(step + 1)
  }

  const fileField = (id: string, label: string, hint: string, icon: string, accept: string) => (
    <label className="drop" htmlFor={id}>
      <Icon name={icon} size="lg" style={{ color: 'var(--cyan)' }} />
      <span>
        <b style={{ color: 'var(--navy)' }}>{label}</b>
        <br />
        <small className="fn">{files[id] ? `✓ ${files[id]}` : hint}</small>
      </span>
      <input
        id={id}
        name={id}
        type="file"
        accept={accept}
        onChange={(e) => setFiles((f) => ({ ...f, [id]: e.target.files?.[0]?.name ?? '' }))}
      />
    </label>
  )

  return (
    <>
      <h3>Online admission form</h3>
      <p className="sub">Takes about 3 minutes. Your application goes straight to our admissions desk.</p>
      <div className="progress">
        {STEPS.map((s, i) => (
          <div key={s} className={i <= step ? 'on' : undefined}>
            <i />
            <small>{s}</small>
          </div>
        ))}
      </div>
      <form className="form" onSubmit={onSubmit} ref={formRef} style={{ position: 'relative' }}>
        <Honeypot />
        <div data-step="0" className="form" hidden={step !== 0}>
          <div className="two">
            <div className="fld">
              <label htmlFor="aName">Full name</label>
              <input id="aName" name="name" required autoComplete="name" minLength={2} />
            </div>
            <div className="fld">
              <label htmlFor="aPhone">Mobile / WhatsApp</label>
              <input id="aPhone" name="phone" required inputMode="tel" pattern="[0-9+ ]{10,14}" />
            </div>
          </div>
          <div className="two">
            <div className="fld">
              <label htmlFor="aEmail">Email (optional)</label>
              <input id="aEmail" name="email" type="email" autoComplete="email" />
            </div>
            <div className="fld">
              <label htmlFor="aDob">Date of birth</label>
              <input id="aDob" name="dob" type="date" required />
            </div>
          </div>
          <div className="fld">
            <label htmlFor="aGuard">Parent / guardian name (for students)</label>
            <input id="aGuard" name="guardian" />
          </div>
          <div className="fld">
            <label htmlFor="aAddr">Address</label>
            <input id="aAddr" name="address" required autoComplete="street-address" />
          </div>
        </div>

        <div data-step="1" className="form" hidden={step !== 1}>
          <div className="fld">
            <label htmlFor="aCourse">Course</label>
            <select id="aCourse" name="course" required defaultValue="">
              <CourseOptions groups={groups} />
            </select>
          </div>
          <div className="two">
            <div className="fld">
              <label htmlFor="aBatch">Preferred batch</label>
              <select id="aBatch" name="batch" required defaultValue="">
                <option value="">Select</option>
                {BATCHES.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>
            <div className="fld">
              <label htmlFor="aQual">Highest qualification</label>
              <select id="aQual" name="qualification" required defaultValue="">
                <option value="">Select</option>
                {['Class 10', 'Class 12', 'Graduate', 'Post-graduate', 'Other'].map((q) => (
                  <option key={q}>{q}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="fld">
            <label htmlFor="aSch">Scholarship code (if any)</label>
            <input id="aSch" name="scholarshipCode" placeholder="e.g. JIE-GOLD-1234" />
          </div>
        </div>

        <div data-step="2" className="form" hidden={step !== 2}>
          {fileField('idProof', 'ID proof', 'PDF or photo, max 5 MB', 'file', 'image/*,.pdf')}
          {fileField('photo', 'Passport photo', 'JPG or PNG, max 5 MB', 'image', 'image/*')}
          {fileField('marksheet', 'Latest marksheet', 'Optional, you can bring it to the centre', 'file', 'image/*,.pdf')}
        </div>

        <div data-step="3" className="form" hidden={step !== 3}>
          <div className="review">
            {review.map(([k, v]) => (
              <div key={k}>
                <span>{k}</span>
                <b>{v}</b>
              </div>
            ))}
          </div>
          <label className="chk">
            <input type="checkbox" name="consent" required={step === 3} /> I confirm these details are correct and agree to the JIE
            admission and refund policy.
          </label>
          <ErrorLine state={state} />
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between', flexWrap: 'wrap', marginTop: 6 }}>
          {step > 0 && (
            <button className="btn btn-o" type="button" onClick={() => setStep(step - 1)}>
              <Icon name="left" size="sm" />
              Back
            </button>
          )}
          {step < 3 ? (
            <button className="btn btn-g" type="button" onClick={next} style={{ marginLeft: 'auto' }}>
              Continue <Icon name="arrow" size="sm" />
            </button>
          ) : (
            <button className="btn btn-g" type="submit" disabled={pending} style={{ marginLeft: 'auto' }}>
              {pending ? 'Submitting…' : 'Submit application'} <Icon name="arrow" size="sm" />
            </button>
          )}
        </div>
      </form>
    </>
  )
}
