import type { Metadata } from 'next'
import { getGallery } from '@/lib/cms'
import { mediaUrl } from '@/lib/cms-media'
import { GALLERY_ALBUMS } from '@/lib/options'
import { PageHero } from '@/components/Chrome'
import { GalleryGrid } from '@/components/Interactive'

export const metadata: Metadata = { title: 'Gallery' }

export default async function GalleryPage() {
  const gallery = await getGallery()
  return (
    <>
      <PageHero
        crumb="Gallery"
        title={<>Life at <span className="hl">JIE</span></>}
        lead="Certification days, course toppers, celebrations and everyday moments from our Shakarpur centre."
      />
      <section className="blk" style={{ paddingTop: 44 }}>
        <div className="wrap">
          <GalleryGrid
            albums={[...GALLERY_ALBUMS]}
            items={gallery.map((g) => ({ id: g.id, title: g.title, caption: g.caption, album: g.album, thumb: mediaUrl(g.image, 'card'), full: mediaUrl(g.image) }))}
          />
        </div>
      </section>
    </>
  )
}
