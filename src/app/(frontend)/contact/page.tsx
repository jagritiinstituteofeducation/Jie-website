import type { Metadata } from 'next'
import { getCourses, getFaqs, getSettings } from '@/lib/cms'
import { mapsEmbed, mapsHref, prettyPhone, telHref } from '@/lib/contact'
import { FaqList } from '@/components/Cards'
import Link from 'next/link'
import { courseGroups } from '@/components/Chrome'
import { EnquiryForm } from '@/components/Forms'
import { Icon } from '@/components/Icon'

export const metadata: Metadata = { title: 'Contact Us' }

export default async function ContactPage() {
  const [s, courses, faqs] = await Promise.all([getSettings(), getCourses(), getFaqs('general')])
  const numbers = [s.mainNumber, ...(s.otherNumbers ?? []).map((n) => n.number)]
  return (
    <>
      <div className="phero">
        <div className="wrap" style={{ paddingBottom: 100 }}>
          <PageHeroInner />
        </div>
      </div>
      <div className="wrap">
        <div className="ccards">
          <div className="cc">
            <span className="ic-bub"><Icon name="phone" /></span>
            <h3>Call or WhatsApp</h3>
            <div className="lines">
              {numbers.map((n, i) => (
                <a key={n} href={telHref(n)}>
                  {i === 0 ? <><b>{prettyPhone(n)}</b> (Call &amp; WhatsApp)</> : prettyPhone(n)}
                </a>
              ))}
              {s.email && <a href={`mailto:${s.email}`}>{s.email}</a>}
            </div>
          </div>
          <div className="cc">
            <span className="ic-bub"><Icon name="pin" /></span>
            <h3>Visit us</h3>
            <div className="lines"><span>{s.address}</span></div>
          </div>
          <div className="cc">
            <span className="ic-bub"><Icon name="clock" /></span>
            <h3>Office hours</h3>
            <div className="lines">
              {(s.officeHours ?? []).map((h) => <span key={h.id ?? h.days}>{h.days}: {h.hours}</span>)}
              <span style={{ color: 'var(--muted)', fontSize: 13.5, marginTop: 6 }}>WhatsApp replies within working hours</span>
            </div>
          </div>
        </div>
      </div>

      <section className="blk">
        <div className="wrap enq">
          <div className="form-card">
            <EnquiryForm source="Contact page" groups={courseGroups(courses)} waNumber={s.mainNumber} callHref={telHref(s.mainNumber)} callLabel={prettyPhone(s.mainNumber)} />
          </div>
          <div className="map">
            <iframe title="JIE location map" loading="lazy" src={mapsEmbed(s.mapQuery)} />
            <div className="pin">
              <Icon name="pin" />
              <div>
                <b style={{ color: 'var(--navy)' }}>{s.instituteName}</b>
                <br />
                <a href={mapsHref(s.mapQuery)} target="_blank" rel="noopener">Open in Google Maps</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blk bg-lav" style={{ paddingTop: 64 }}>
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow">How to reach</span><h2>Two minutes from the metro</h2></div>
          <div className="reach">
            <div className="it"><span className="ic-bub"><Icon name="train" /></span><div><h4>By metro</h4><p>Take the Blue Line to Laxmi Nagar and exit from Gate No. 2.</p></div></div>
            <div className="it"><span className="ic-bub"><Icon name="pin" /></span><div><h4>Landmark</h4><p>Walk to Shree Ganesh Corner. Kalra Complex is right next to it.</p></div></div>
            <div className="it"><span className="ic-bub"><Icon name="arrow" /></span><div><h4>Find us</h4><p>Go up to the first floor and look for unit U 75.</p></div></div>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 30, flexWrap: 'wrap' }}>
            {s.instagramUrl && <a className="btn btn-o" href={s.instagramUrl} target="_blank" rel="noopener"><Icon name="insta" size="sm" />Instagram</a>}
            {s.facebookUrl && <a className="btn btn-o" href={s.facebookUrl} target="_blank" rel="noopener"><Icon name="fb" size="sm" />Facebook</a>}
          </div>
        </div>
      </section>

      <section className="blk">
        <div className="wrap">
          <div className="sec-head center"><span className="eyebrow">FAQs</span><h2>Before you visit</h2></div>
          <FaqList items={faqs} />
        </div>
      </section>
    </>
  )
}

function PageHeroInner() {
  return (
    <>
      <div className="crumb"><Link href="/">Home</Link> / <span>Contact Us</span></div>
      <h1>We’d love to help you <span className="hl">choose</span> the right course</h1>
      <p className="lead">Call, WhatsApp or visit us. A counsellor will answer your questions about courses, fees and batches.</p>
    </>
  )
}
