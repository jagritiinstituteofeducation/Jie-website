import Link from 'next/link'
import type { Course, SiteSetting } from '@/payload-types'
import { mediaUrl } from '@/lib/cms-media'
import { prettyPhone, telHref, waHref } from '@/lib/contact'
import type { CourseGroups } from './Forms'
import { Icon } from './Icon'

export const courseGroups = (courses: Course[]): CourseGroups => ({
  long: courses.filter((c) => c.type === 'long').map((c) => c.title),
  short: courses.filter((c) => c.type === 'short').map((c) => c.title),
  academic: courses.filter((c) => c.type === 'academic').map((c) => c.title),
})

export function UtilityBar({ s }: { s: SiteSetting }) {
  return (
    <div className="util">
      <div className="wrap">
        <div className="grp">
          <span>
            <Icon name="pin" size="sm" />
            Near Laxmi Nagar Metro, Gate No. 2
          </span>
          <a href={telHref(s.mainNumber)}>
            <Icon name="phone" size="sm" />
            {prettyPhone(s.mainNumber)}
          </a>
          <a href={waHref(s.mainNumber)} target="_blank" rel="noopener">
            <Icon name="wa" size="sm" />
            WhatsApp: {prettyPhone(s.mainNumber).replace('+91 ', '')}
          </a>
        </div>
        <div className="grp">
          {s.instagramUrl && (
            <a href={s.instagramUrl} target="_blank" rel="noopener" aria-label="Instagram">
              <Icon name="insta" size="sm" />
            </a>
          )}
          {s.facebookUrl && (
            <a href={s.facebookUrl} target="_blank" rel="noopener" aria-label="Facebook">
              <Icon name="fb" size="sm" />
            </a>
          )}
          {s.studentLoginUrl && (
            <a href={s.studentLoginUrl} target="_blank" rel="noopener">
              Student Login
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export function SiteFooter({ s, popular }: { s: SiteSetting; popular: Course[] }) {
  const logo = mediaUrl(s.logo)
  return (
    <footer className="site">
      <div className="wrap">
        <div className="cols">
          <div className="fbrand">
            <span className="logo">{logo ? <img src={logo} alt="JIE logo" /> : <span className="logo-fb">JIE</span>}</span>
            <p>{s.tagline}</p>
            <div className="soc">
              {s.instagramUrl && (
                <a href={s.instagramUrl} target="_blank" rel="noopener" aria-label="Instagram">
                  <Icon name="insta" size="sm" />
                </a>
              )}
              {s.facebookUrl && (
                <a href={s.facebookUrl} target="_blank" rel="noopener" aria-label="Facebook">
                  <Icon name="fb" size="sm" />
                </a>
              )}
              <a href={waHref(s.mainNumber)} target="_blank" rel="noopener" aria-label="WhatsApp">
                <Icon name="wa" size="sm" />
              </a>
            </div>
          </div>
          <div>
            <h4>Popular courses</h4>
            <ul>
              {popular.map((c) => (
                <li key={c.slug}>
                  <Link href={`/courses/${c.slug}`}>{c.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Quick links</h4>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/scholarship">Scholarship Test</Link></li>
              <li><Link href="/admission">Admission</Link></li>
              <li><Link href="/gallery">Gallery</Link></li>
              {s.studentLoginUrl && (
                <li>
                  <a href={s.studentLoginUrl} target="_blank" rel="noopener">Student Login</a>
                </li>
              )}
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul className="fcontact">
              <li>
                <Icon name="pin" size="sm" />
                <span>{s.address}</span>
              </li>
              <li>
                <Icon name="phone" size="sm" />
                <span>
                  <a href={telHref(s.mainNumber)}>{prettyPhone(s.mainNumber)}</a> (Call &amp; WhatsApp)
                  {(s.otherNumbers ?? []).map((n) => (
                    <span key={n.id ?? n.number}>
                      <br />
                      <a href={telHref(n.number)}>{prettyPhone(n.number)}</a>
                    </span>
                  ))}
                </span>
              </li>
              {(s.officeHours ?? []).slice(0, 1).map((h) => (
                <li key={h.id ?? h.days}>
                  <Icon name="clock" size="sm" />
                  <span>
                    {h.days}, {h.hours}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="fbottom">
          <span>© {new Date().getFullYear()} {s.instituteName}. All rights reserved.</span>
          <nav>
            <Link href="/contact">Privacy Policy</Link>
            <Link href="/contact">Terms</Link>
            <Link href="/admission">Refund Policy</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export function MobileBar({ s }: { s: SiteSetting }) {
  return (
    <>
      <div className="mbar">
        <a className="call" href={telHref(s.mainNumber)}>
          <Icon name="phone" size="sm" />
          Call
        </a>
        <a className="wa" href={waHref(s.mainNumber)} target="_blank" rel="noopener">
          <Icon name="wa" size="sm" />
          WhatsApp
        </a>
        <Link className="enq" href="/contact">
          Enquire now
        </Link>
      </div>
      <a className="fab" href={waHref(s.mainNumber)} target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
        <Icon name="wa" />
      </a>
    </>
  )
}

/** Page hero used on inner pages. */
export function PageHero({ crumb, title, lead, children }: { crumb: string; title: React.ReactNode; lead?: string; children?: React.ReactNode }) {
  return (
    <div className="phero">
      <div className="wrap">
        <div className="crumb">
          <Link href="/">Home</Link> / <span>{crumb}</span>
        </div>
        <h1>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
    </div>
  )
}
