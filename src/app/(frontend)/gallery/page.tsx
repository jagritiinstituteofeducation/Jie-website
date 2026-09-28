import type { Metadata } from 'next'
import Link from 'next/link'
import type { Gallery } from '@/payload-types'
import { getGallery, getSettings } from '@/lib/cms'
import { mediaAlt, mediaUrl } from '@/lib/cms-media'
import { GALLERY_ALBUMS } from '@/lib/options'
import { GalleryGrid, type GalleryItem } from '@/components/Interactive'
import { Icon } from '@/components/Icon'

export const metadata: Metadata = { title: 'Gallery', description: 'Certification days, course toppers and celebrations at Jagriti Institute of Education.' }

const toItem = (g: Gallery): GalleryItem => {
  const img = typeof g.image === 'object' && g.image ? g.image : null
  return {
    id: g.id,
    title: g.title,
    caption: g.caption,
    album: g.album,
    thumb: mediaUrl(g.image, 'card'),
    full: mediaUrl(g.image),
    w: img?.width,
    h: img?.height,
  }
}

export default async function GalleryPage() {
  const [gallery, s] = await Promise.all([getGallery(), getSettings()])
  const albums = new Set(gallery.map((g) => g.album)).size
  const pick = (re: RegExp) => gallery.find((g) => re.test(g.title))
  const mosaic = [pick(/certification/i), pick(/all winners/i), pick(/79th/i), pick(/counselling/i) ?? pick(/teachers/i)].filter(
    (g): g is Gallery => Boolean(g),
  )

  return (
    <>
      {/* HERO */}
      <div className="ghero">
        <div className="wrap">
          <div className="ghero-copy">
            <div className="crumb">
              <Link href="/">Home</Link> / <span>Gallery</span>
            </div>
            <span className="h2o-pill">
              <i />
              Real moments from our Shakarpur centre
            </span>
            <h1>
              Life at <span className="grad-t">JIE</span>
            </h1>
            <p className="ghero-lead">
              Certification days, course toppers, celebrations and everyday moments with our students and faculty.
            </p>
            <div className="ghero-stats">
              <div><b>{gallery.length}</b><small>Photos</small></div>
              <div><b>{albums}</b><small>Albums</small></div>
              <div><b>{gallery.filter((g) => g.isTopper).length}</b><small>Course toppers</small></div>
            </div>
          </div>
          <div className="ghero-mosaic" aria-hidden="true">
            {mosaic.map((g, i) => (
              <figure key={g.id} className={`gm gm${i + 1}`}>
                <img src={mediaUrl(g.image, 'card')} alt={mediaAlt(g.image, g.title)} />
              </figure>
            ))}
            <div className="gchip gm-chip">
              <span className="ic-bub gold"><Icon name="award" /></span>
              <div><small>Every batch</small><b>Certification Day</b></div>
            </div>
          </div>
        </div>
      </div>

      {/* GALLERY */}
      <section className="gsec">
        <GalleryGrid albums={[...GALLERY_ALBUMS]} items={gallery.map(toItem)} />
      </section>

      {/* CTA */}
      <section className="blk" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="banner gcta">
            <div>
              <span className="badge"><Icon name="insta" size="sm" />More on Instagram</span>
              <h2>Be part of the next photo</h2>
              <p>Join a batch, build real projects, and celebrate with us on Certification Day.</p>
            </div>
            <div className="acts">
              {s.instagramUrl && (
                <a className="btn btn-w" href={s.instagramUrl} target="_blank" rel="noopener">
                  <Icon name="insta" size="sm" />
                  Follow us
                </a>
              )}
              <Link className="btn btn-g" href="/admission">
                Enroll Now <Icon name="arrow" size="sm" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
