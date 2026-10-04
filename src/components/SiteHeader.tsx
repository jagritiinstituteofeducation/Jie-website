'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Icon } from './Icon'

type NavCourse = { slug: string; title: string; type: string }
type Props = { logoUrl?: string; courses: NavCourse[]; callHref: string; waHref: string }

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/courses', label: 'Courses', mega: true },
  { href: '/scholarship', label: 'Scholarship' },
  { href: '/admission', label: 'Admission' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact Us' },
]

function Brand({ logoUrl }: { logoUrl?: string }) {
  return (
    <Link className="brand" href="/" aria-label="Jagriti Institute of Education home">
      {logoUrl ? <img src={logoUrl} alt="Jagriti Institute of Education logo" /> : <span className="logo-fb">JIE</span>}
    </Link>
  )
}

export function SiteHeader({ logoUrl, courses, callHref, waHref }: Props) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))
  const group = (t: string) => courses.filter((c) => c.type === t)

  return (
    <>
      <header className={`site${scrolled ? ' scrolled' : ''}`}>
        <div className="wrap">
          <Brand logoUrl={logoUrl} />
          <nav className="main" aria-label="Main">
            {NAV.map((n) =>
              n.mega ? (
                <div key={n.href} className={`dd${isActive(n.href) ? ' active' : ''}`}>
                  <Link href={n.href} className="dd-btn" aria-haspopup="true">
                    {n.label} <Icon name="down" size="sm" />
                  </Link>
                  <div className="mega three" role="menu">
                    {[
                      ['academic', 'Academic programmes'],
                      ['long', 'Long-term programmes'],
                      ['short', 'Short-term courses'],
                    ].map(([t, h]) => (
                      <div key={t} className={`mega-col ${t}`}>
                        <h5>{h}</h5>
                        <div className="mega-links">
                          {group(t).map((c) => (
                            <Link key={c.slug} href={`/courses/${c.slug}`}>
                              {c.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                    <Link className="all link-arrow" href="/courses">
                      View all courses <Icon name="arrow" size="sm" />
                    </Link>
                  </div>
                </div>
              ) : (
                <Link key={n.href} href={n.href} className={isActive(n.href) ? 'active' : undefined}>
                  {n.label}
                </Link>
              ),
            )}
          </nav>
          <Link className="btn btn-g btn-sm hdr-cta" href="/admission">
            Enroll Now
          </Link>
          <button className="burger" type="button" aria-label="Open menu" onClick={() => setOpen(true)}>
            <Icon name="menu" />
          </button>
        </div>
      </header>

      <div className="drawer" hidden={!open}>
        <div className="top">
          <Brand logoUrl={logoUrl} />
          <button className="burger" type="button" aria-label="Close menu" style={{ display: 'grid', margin: 0 }} onClick={() => setOpen(false)}>
            <Icon name="x" />
          </button>
        </div>
        {NAV.map((n) => (
          <Link key={n.href} href={n.href}>
            {n.label}
          </Link>
        ))}
        <div className="acts">
          <a className="btn btn-o" href={callHref}>
            <Icon name="phone" size="sm" />
            Call
          </a>
          <a className="btn btn-wa" href={waHref} target="_blank" rel="noopener">
            <Icon name="wa" size="sm" />
            WhatsApp
          </a>
        </div>
        <Link className="btn btn-g" href="/admission" style={{ marginTop: 10 }}>
          Enroll Now
        </Link>
      </div>
    </>
  )
}
