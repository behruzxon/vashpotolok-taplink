'use client'

import { ceilingTypes, type PremiumLevel } from '@/data/price-options'
import { trackEvent } from '@/lib/analytics'
import { cn } from '@/lib/cn'

type Props = {
  selectedId: string
  onSelect: (id: string) => void
}

const levelLabel: Record<PremiumLevel, string> = {
  standard: 'Standard',
  comfort: 'Comfort',
  premium: 'Premium',
}

const levelStyle: Record<PremiumLevel, string> = {
  standard: 'bg-white/[0.06] text-ink-secondary border-line-soft',
  comfort: 'bg-brand-accent-soft text-brand-accent-glow border-brand-accent/30',
  premium: 'bg-gold-soft text-gold border-gold/40',
}

function CeilingPreview({ id }: { id: string }) {
  switch (id) {
    case 'odnotonniy':
      // Tekis silliq gradient — bir rangli sodda yuza
      return (
        <svg viewBox="0 0 48 48" className="h-10 w-12" aria-hidden>
          <defs>
            <linearGradient id="cp-odno" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.32)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.10)" />
            </linearGradient>
            <radialGradient id="cp-odno-glow" cx="0.3" cy="0.2" r="0.7">
              <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
          </defs>
          <rect x="2" y="2" width="44" height="44" rx="8" fill="url(#cp-odno)" />
          <rect x="2" y="2" width="44" height="44" rx="8" fill="url(#cp-odno-glow)" />
          <rect x="2" y="2" width="44" height="44" rx="8" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        </svg>
      )
    case 'gulli':
      // Gul petali (4 ta yaproq + markaz)
      return (
        <svg viewBox="0 0 48 48" className="h-10 w-12" aria-hidden>
          <rect x="2" y="2" width="44" height="44" rx="8" fill="rgba(91,155,255,0.10)" />
          <g transform="translate(24 24)">
            {[0, 90, 180, 270].map((deg) => (
              <ellipse
                key={deg}
                cx="0"
                cy="-9"
                rx="3.4"
                ry="6.8"
                fill="rgba(91,155,255,0.78)"
                transform={`rotate(${deg})`}
              />
            ))}
            <circle r="3" fill="rgba(255,255,255,0.95)" />
            <circle r="1.4" fill="rgba(91,155,255,0.95)" />
          </g>
          {/* 4 ta kichik dekorativ nuqta burchaklarda */}
          {[
            [8, 8], [40, 8], [8, 40], [40, 40],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="1.4" fill="rgba(91,155,255,0.55)" />
          ))}
          <rect x="2" y="2" width="44" height="44" rx="8" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
        </svg>
      )
    case 'naqsh':
      // Geometrik ornament — 2 ta overlap rhombus + sharqona accent
      return (
        <svg viewBox="0 0 48 48" className="h-10 w-12" aria-hidden>
          <rect x="2" y="2" width="44" height="44" rx="8" fill="rgba(91,155,255,0.10)" />
          <g fill="none" stroke="rgba(91,155,255,0.9)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            {/* tashqi rhombus */}
            <path d="M24 7 L41 24 L24 41 L7 24 Z" />
            {/* o'rta rhombus 45° aylantirilgan kvadrat */}
            <path d="M14 14 L34 14 L34 34 L14 34 Z" opacity="0.6" />
            {/* ichki rhombus */}
            <path d="M24 14 L34 24 L24 34 L14 24 Z" />
            {/* markaz to'rt cho'qqi */}
            <path d="M21 24 L24 21 L27 24 L24 27 Z" fill="rgba(91,155,255,0.85)" />
          </g>
          <rect x="2" y="2" width="44" height="44" rx="8" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
        </svg>
      )
    case 'mramor':
      // Mramor tomirlari — kuchaytirilgan ko'p qatlamli wavy veins
      return (
        <svg viewBox="0 0 48 48" className="h-10 w-12" aria-hidden>
          <defs>
            <linearGradient id="cp-mra" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
              <stop offset="45%" stopColor="rgba(217,184,114,0.22)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.12)" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="44" height="44" rx="8" fill="url(#cp-mra)" />
          <g fill="none" strokeLinecap="round">
            {/* asosiy tomir — qalin */}
            <path d="M3 12 C 14 7, 22 22, 30 14 S 44 18, 47 12" stroke="rgba(255,255,255,0.75)" strokeWidth="1.1" />
            {/* ikkinchi tomir — yumshoq */}
            <path d="M2 28 C 12 22, 20 36, 30 28 S 44 36, 47 30" stroke="rgba(255,255,255,0.55)" strokeWidth="0.9" opacity="0.85" />
            {/* uchinchi tomir — eng nozik */}
            <path d="M4 38 C 14 34, 22 44, 30 38 S 44 42, 47 38" stroke="rgba(217,184,114,0.55)" strokeWidth="0.7" opacity="0.7" />
            {/* qisqa accent tomirlari */}
            <path d="M10 6 C 14 10, 16 16, 18 22" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" opacity="0.6" />
            <path d="M36 18 C 40 22, 41 28, 42 34" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" opacity="0.6" />
          </g>
          <rect x="2" y="2" width="44" height="44" rx="8" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        </svg>
      )
    case 'uv-pechat':
      // Photo frame + tog' va quyosh — print/rasm signali
      return (
        <svg viewBox="0 0 48 48" className="h-10 w-12" aria-hidden>
          <defs>
            <linearGradient id="cp-uv-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(91,155,255,0.55)" />
              <stop offset="100%" stopColor="rgba(217,184,114,0.45)" />
            </linearGradient>
          </defs>
          {/* photo frame outer */}
          <rect x="2" y="2" width="44" height="44" rx="8" fill="rgba(91,155,255,0.10)" />
          {/* inner photo area */}
          <rect x="7" y="8" width="34" height="32" rx="3" fill="url(#cp-uv-sky)" />
          {/* sun */}
          <circle cx="32" cy="16" r="3" fill="rgba(255,255,255,0.95)" />
          {/* mountains */}
          <path d="M7 32 L15 22 L21 28 L28 20 L35 28 L41 24 L41 40 L7 40 Z" fill="rgba(255,255,255,0.30)" />
          <path d="M7 36 L13 28 L20 33 L26 26 L34 33 L41 28 L41 40 L7 40 Z" fill="rgba(91,155,255,0.65)" opacity="0.75" />
          {/* frame border */}
          <rect x="7" y="8" width="34" height="32" rx="3" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1" />
          <rect x="2" y="2" width="44" height="44" rx="8" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
        </svg>
      )
    default:
      return null
  }
}

export function CeilingStep({ selectedId, onSelect }: Props) {
  return (
    <ul className="flex flex-col gap-2">
      {ceilingTypes.map((c) => {
        const active = c.id === selectedId
        return (
          <li key={c.id}>
            <button
              type="button"
              onClick={() => {
                onSelect(c.id)
                trackEvent('pro_ceiling_selected', { id: c.id })
              }}
              aria-pressed={active}
              className={cn(
                'flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base',
                active
                  ? 'border-brand-accent-glow bg-brand-accent-soft shadow-[0_0_24px_-4px_rgba(91,155,255,0.45)]'
                  : 'border-line-soft bg-white/[0.04] hover:border-line-strong',
              )}
            >
              <span
                className={cn(
                  'relative flex h-12 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl ring-1 transition-colors',
                  active ? 'ring-brand-accent/40' : 'ring-white/10',
                )}
              >
                <CeilingPreview id={c.id} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="block truncate text-[14px] font-bold leading-tight text-ink-primary">
                    {c.label}
                  </span>
                  <span
                    className={cn(
                      'shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em]',
                      levelStyle[c.premiumLevel],
                    )}
                  >
                    {levelLabel[c.premiumLevel]}
                  </span>
                </span>
                <span className="mt-0.5 block text-[11.5px] leading-snug text-ink-secondary">
                  {c.hint}
                </span>
              </span>
              <span
                aria-hidden
                className={cn(
                  'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors',
                  active
                    ? 'border-brand-accent-glow bg-grad-button shadow-[0_0_12px_rgba(91,155,255,0.6)]'
                    : 'border-line-strong bg-white/[0.04]',
                )}
              >
                {active ? (
                  <svg viewBox="0 0 24 24" className="h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12l4 4 10-10" />
                  </svg>
                ) : null}
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
