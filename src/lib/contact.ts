/** Small helpers for phone / WhatsApp links. Numbers are stored as 10-digit Indian mobiles. */

export const digits10 = (n: string | null | undefined) => String(n ?? '').replace(/\D/g, '').slice(-10)

/** "8222999106" -> "+91 82229 99106" */
export const prettyPhone = (n: string | null | undefined) => {
  const d = digits10(n)
  return d.length === 10 ? `+91 ${d.slice(0, 5)} ${d.slice(5)}` : String(n ?? '')
}

export const telHref = (n: string | null | undefined) => `tel:+91${digits10(n)}`

export const waHref = (n: string | null | undefined, text?: string) =>
  `https://wa.me/91${digits10(n)}${text ? `?text=${encodeURIComponent(text)}` : ''}`

export const mapsHref = (q: string | null | undefined) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q ?? '')}`

export const mapsEmbed = (q: string | null | undefined) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(q ?? '')}&z=16&output=embed`
