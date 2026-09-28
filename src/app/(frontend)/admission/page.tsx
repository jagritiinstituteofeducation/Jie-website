import type { Metadata } from 'next'
import { getCourses, getFaqs, getSettings } from '@/lib/cms'
import { waHref } from '@/lib/contact'
import { FaqList } from '@/components/Cards'
import { courseGroups, PageHero } from '@/components/Chrome'
import { AdmissionForm } from '@/components/Forms'
import { Icon } from '@/components/Icon'

export const metadata: Metadata = { title: 'Admission', description: 'Apply online for admission to Jagriti Institute of Education.' }

export default async function AdmissionPage() {
  const [s, courses, faqs] = await Promise.all([getSettings(), getCourses(), getFaqs('admission')])
  return (
    <>
      <PageHero
        crumb="Admission"
        title={<>Admissions <span className="hl">open</span></>}
        lead="New batches start every month. Choose a course, pick a batch, and apply online in four short steps."
      >
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <span className="badge b-long"><Icon name="cal" size="sm" />Monthly batches</span>
          <span className="badge b-short"><Icon name="clock" size="sm" />Morning · Afternoon · Evening</span>
          <span className="badge b-gold"><Icon name="percent" size="sm" />Scholarship applies</span>
        </div>
      </PageHero>

      <section className="blk">
        <div className="wrap">
          <div className="sec-head center"><span className="eyebrow">Admission process</span><h2>Five steps to your first class</h2></div>
          <div className="proc">
            {[
              ['phone', 'Enquiry', 'Call, WhatsApp or apply online'],
              ['users', 'Counselling & demo', 'Meet a counsellor, attend a free class'],
              ['file', 'Admission form', 'Online or at the centre'],
              ['upload', 'Documents', 'ID proof, photo, marksheet'],
              ['cal', 'Fee & batch', 'Pay and get your batch'],
            ].map(([i, t, p]) => (
              <div className="st" key={t}><span className="ic-bub"><Icon name={i} /></span><b>{t}</b><small>{p}</small></div>
            ))}
          </div>
        </div>
      </section>

      <section className="blk bg-lav2">
        <div className="wrap adm-grid">
          <div style={{ display: 'grid', gap: 26 }}>
            <div style={{ display: 'grid', gap: 14 }}>
              <span className="eyebrow">Documents required</span>
              <ul className="doclist">
                <li><Icon name="file" />Aadhaar card or any government ID</li>
                <li><Icon name="image" />Two passport-size photographs</li>
                <li><Icon name="cap" />Latest marksheet or qualification proof</li>
                <li><Icon name="award" />Scholarship result (if any)</li>
              </ul>
            </div>
            <div style={{ display: 'grid', gap: 14 }}>
              <span className="eyebrow">Fees &amp; payment</span>
              <div className="pay">
                <div><Icon name="rupee" style={{ color: 'var(--cyan)' }} /><b>Cash</b><small>At the centre</small></div>
                <div><Icon name="phone2" style={{ color: 'var(--cyan)' }} /><b>UPI</b><small>Any UPI app</small></div>
                <div><Icon name="cal" style={{ color: 'var(--cyan)' }} /><b>Instalments</b><small>On long-term courses</small></div>
              </div>
              <p className="note" style={{ margin: 0 }}>
                Course fees vary by programme. Ask a counsellor on WhatsApp for the current fee and any scholarship you qualify for.
              </p>
            </div>
            <div className="side-note">
              <Icon name="wa" style={{ color: '#1FAF55' }} />
              <span>
                Need help with the form?{' '}
                <a href={waHref(s.mainNumber)} target="_blank" rel="noopener"><b>Chat on WhatsApp</b></a>
              </span>
            </div>
          </div>
          <div className="form-card">
            <AdmissionForm groups={courseGroups(courses)} waNumber={s.mainNumber} />
          </div>
        </div>
      </section>

      <section className="blk">
        <div className="wrap">
          <div className="sec-head center"><span className="eyebrow">FAQs</span><h2>Admission questions</h2></div>
          <FaqList items={faqs} />
        </div>
      </section>
    </>
  )
}
