import type { Metadata } from 'next'
import Link from 'next/link'
import { getCourses, getFaqs, getSettings } from '@/lib/cms'
import { mapsEmbed, mapsHref, prettyPhone, telHref, waHref } from '@/lib/contact'
import { FaqList } from '@/components/Cards'
import { courseGroups } from '@/components/Chrome'
import { EnquiryForm } from '@/components/Forms'
import { Icon } from '@/components/Icon'

export const metadata: Metadata = { title: 'Contact Us', description: 'Call, WhatsApp or visit Jagriti Institute of Education near Laxmi Nagar Metro Gate 2, Delhi.' }

const REACH = [
  ['train', 'Take the metro', 'Blue Line to Laxmi Nagar and exit from Gate No. 2.'],
  ['pin', 'Find the landmark', 'Walk to Shree Ganesh Corner. Kalra Complex is right next to it.'],
  ['arrow', 'Come upstairs', 'Go up to the first floor and look for unit U 75.'],
]

export default async function ContactPage() {
  const [s, courses, faqs] = await Promise.all([getSettings(), getCourses(), getFaqs('general')])
  const others = (s.otherNumbers ?? []).map((n) => n.number)
  const hours = s.officeHours ?? []
  const firstHours = hours[0]

  return (
    <>
      {/* HERO */}
      <div className="cthero">
        <div className="wrap">
          <div className="cthero-copy">
            <div className="crumb">
              <Link href="/">Home</Link> / <span>Contact Us</span>
            </div>
            <span className="h2o-pill">
              <i />
              {firstHours ? `Open ${firstHours.days}, ${firstHours.hours}` : 'We would love to hear from you'}
            </span>
            <h1>
              Let’s talk about <span className="grad-t">your next step</span>
            </h1>
            <p className="cthero-lead">
              Call, WhatsApp or visit us. A counsellor will answer your questions about courses, fees, batches and scholarships.
            </p>
            <div className="cthero-actions">
              <a className="cta-tile" href={telHref(s.mainNumber)}>
                <span><Icon name="phone" /></span>
                <div><small>Call us</small><b>{prettyPhone(s.mainNumber)}</b></div>
              </a>
              <a className="cta-tile wa" href={waHref(s.mainNumber, 'Hi JIE, I have a question about your courses.')} target="_blank" rel="noopener">
                <span><Icon name="wa" /></span>
                <div><small>WhatsApp</small><b>Chat with us</b></div>
              </a>
              <a className="cta-tile visit" href={mapsHref(s.mapQuery)} target="_blank" rel="noopener">
                <span><Icon name="pin" /></span>
                <div><small>Visit</small><b>Get directions</b></div>
              </a>
            </div>
          </div>

          <div className="route" aria-hidden="true">
            <div className="route-grid" />
            <div className="route-node metro">
              <span><Icon name="train" /></span>
              <div><b>Laxmi Nagar Metro</b><small>Gate No. 2</small></div>
            </div>
            <svg className="route-path" viewBox="0 0 400 300" preserveAspectRatio="none">
              <path d="M70 230 C 150 230, 170 130, 250 120 S 330 80, 330 70" />
            </svg>
            <span className="route-walk">
              <Icon name="clock" size="sm" />
              2 min walk
            </span>
            <div className="route-node jie">
              <span className="pin">
                <Icon name="pin" />
              </span>
              <div><b>Jagriti Institute</b><small>U 75, Kalra Complex</small></div>
            </div>
          </div>
        </div>
      </div>

      {/* DETAILS */}
      <section className="blk ctinfo">
        <div className="wrap ctinfo-grid">
          <div className="ctcard">
            <span className="ic-bub"><Icon name="phone" /></span>
            <h3>Phone &amp; WhatsApp</h3>
            <a className="ctmain" href={telHref(s.mainNumber)}>{prettyPhone(s.mainNumber)}</a>
            <small className="ctlabel">Call &amp; WhatsApp</small>
            {others.length > 0 && (
              <div className="ctnums">
                {others.map((n) => (
                  <a key={n} href={telHref(n)}>{prettyPhone(n)}</a>
                ))}
              </div>
            )}
            {s.email && <a className="ctmail" href={`mailto:${s.email}`}><Icon name="mail" size="sm" />{s.email}</a>}
          </div>
          <div className="ctcard">
            <span className="ic-bub"><Icon name="pin" /></span>
            <h3>Visit the centre</h3>
            <p>{s.address}</p>
            <a className="link-arrow" href={mapsHref(s.mapQuery)} target="_blank" rel="noopener">
              Open in Google Maps <Icon name="arrow" size="sm" />
            </a>
          </div>
          <div className="ctcard">
            <span className="ic-bub"><Icon name="clock" /></span>
            <h3>Office hours</h3>
            <ul className="cthours">
              {hours.map((h) => (
                <li key={h.id ?? h.days}>
                  <span>{h.days}</span>
                  <b>{h.hours}</b>
                </li>
              ))}
            </ul>
            <small className="ctlabel">WhatsApp replies within working hours</small>
          </div>
        </div>
      </section>

      {/* FORM + MAP */}
      <section className="blk ctform">
        <div className="wrap enq">
          <div className="form-card ctform-card">
            <EnquiryForm source="Contact page" groups={courseGroups(courses)} waNumber={s.mainNumber} callHref={telHref(s.mainNumber)} callLabel={prettyPhone(s.mainNumber)} />
          </div>
          <div className="map ctmap">
            <iframe title="JIE location map" loading="lazy" src={mapsEmbed(s.mapQuery)} />
            <div className="pin">
              <Icon name="pin" />
              <div>
                <b style={{ color: 'var(--navy)' }}>{s.instituteName}</b>
                <br />
                <span style={{ color: 'var(--muted)', fontSize: 13 }}>Near Laxmi Nagar Metro Gate No. 2</span>
              </div>
              <a className="btn btn-g btn-sm" href={mapsHref(s.mapQuery)} target="_blank" rel="noopener">
                Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* HOW TO REACH */}
      <section className="blk bg-lav">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">How to reach</span>
            <h2>Two minutes from the metro</h2>
          </div>
          <ol className="sflow three">
            {REACH.map(([i, t, p], n) => (
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

      {/* SOCIAL */}
      <section className="blk">
        <div className="wrap">
          <div className="ctsocial">
            <div>
              <span className="eyebrow">Stay connected</span>
              <h2>Follow JIE for results, events and new batches</h2>
            </div>
            <div className="ctsocial-links">
              {s.instagramUrl && (
                <a className="soc-card ig" href={s.instagramUrl} target="_blank" rel="noopener">
                  <Icon name="insta" />
                  <b>Instagram</b>
                  <small>@jieducation2025</small>
                </a>
              )}
              {s.facebookUrl && (
                <a className="soc-card fb" href={s.facebookUrl} target="_blank" rel="noopener">
                  <Icon name="fb" />
                  <b>Facebook</b>
                  <small>Jagriti Institute</small>
                </a>
              )}
              <a className="soc-card wa" href={waHref(s.mainNumber)} target="_blank" rel="noopener">
                <Icon name="wa" />
                <b>WhatsApp</b>
                <small>{prettyPhone(s.mainNumber)}</small>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="blk bg-lav2">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">FAQs</span>
            <h2>Before you visit</h2>
          </div>
          <FaqList items={faqs} />
        </div>
      </section>
    </>
  )
}
