import { ICONS } from './icons'

type Props = { name: string; size?: 'sm' | 'lg'; className?: string; style?: React.CSSProperties }

/** Inline SVG icon from the site's icon set. Unknown names fall back to "book". */
export function Icon({ name, size, className, style }: Props) {
  const paths = (ICONS as Record<string, string>)[name] ?? ICONS.book
  return (
    <svg
      className={['ic', size, className].filter(Boolean).join(' ')}
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={style}
      dangerouslySetInnerHTML={{ __html: paths }}
    />
  )
}
