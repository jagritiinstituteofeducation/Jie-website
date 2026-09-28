import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { getCourses, getSettings } from '@/lib/cms'
import { mediaUrl } from '@/lib/cms-media'
import { telHref, waHref } from '@/lib/contact'
import { MobileBar, SiteFooter, UtilityBar } from '@/components/Chrome'
import { SiteHeader } from '@/components/SiteHeader'
import './styles.css'

// Content comes from the CMS on every request, so edits in /admin show up immediately
// (and `next build` does not need a database connection).
export const dynamic = 'force-dynamic'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
  title: { default: 'Jagriti Institute of Education', template: '%s | JIE' },
  description:
    'Hands-on IT, design, accounting and teaching courses, plus admission guidance from 10th to Ph.D. Shakarpur, near Laxmi Nagar Metro Gate 2, Delhi.',
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const [s, courses] = await Promise.all([getSettings(), getCourses()])
  const popular = ['digital-marketing', 'full-stack-development', 'e-accounting', 'ethical-hacking', 'tally-gst', 'ntt-nptt']
    .map((slug) => courses.find((c) => c.slug === slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c))

  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <UtilityBar s={s} />
        <SiteHeader
          logoUrl={mediaUrl(s.logo)}
          courses={courses.map((c) => ({ slug: c.slug, title: c.title, type: c.type }))}
          callHref={telHref(s.mainNumber)}
          waHref={waHref(s.mainNumber)}
        />
        <main>{children}</main>
        <SiteFooter s={s} popular={popular} />
        <MobileBar s={s} />
      </body>
    </html>
  )
}
