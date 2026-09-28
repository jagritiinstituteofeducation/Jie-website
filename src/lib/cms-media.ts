import type { Media } from '@/payload-types'

/** URL of an upload field value (populated doc or id). Safe to use in client components. */
export function mediaUrl(m: number | Media | null | undefined, size?: 'thumbnail' | 'card'): string | undefined {
  if (!m || typeof m !== 'object') return undefined
  return (size && m.sizes?.[size]?.url) || m.url || undefined
}

export function mediaAlt(m: number | Media | null | undefined, fallback = ''): string {
  return m && typeof m === 'object' ? m.alt || fallback : fallback
}
