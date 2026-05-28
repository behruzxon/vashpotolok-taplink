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
      return (
        <svg viewBox="0 0 48 48" className="h-10 w-12" aria-hidden>
          <defs>
            <linearGradient id="cp-odno" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.6)" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="44" height="44" rx="8" fill="url(#cp-odno)" opacity="0.18" />
          <rect x="2" y="2" width="44" height="44" rx="8" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
        </svg>
      )
    case 'gulli':
      return (
        <svg viewBox="0 0 48 48" className="h-10 w-12" aria-hidden>
          <rect x="2" y="2" width="44" height="44" rx="8" fill="rgba(91,155,255,0.10)" />
          {[12, 24, 36].map((cx) =>
            [12, 24, 36].map((cy) => (
              <g key={`${cx}-${cy}`} transform={`translate(${cx} ${cy})`}>
                <circle r="2" fill="rgba(91,155,255,0.85)" />
                <circle r="0.8" fill="rgba(255,255,255,0.9)" />
              </g>
            )),
          )}
          <rect x="2" y="2" width="44" height="44" rx="8" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
        </svg>
      )
    case 'naqsh':
      return (
        <svg viewBox="0 0 48 48" className="h-10 w-12" aria-hidden>
          <rect x="2" y="2" width="44" height="44" rx="8" fill="rgba(91,155,255,0.10)" />
          <g fill="none" stroke="rgba(91,155,255,0.85)" strokeWidth="1.2" strokeLinecap="round">
            <path d="M8 24 L24 8 L40 24 L24 40 Z" />
            <path d="M16 24 L24 16 L32 24 L24 32 Z" />
            <circle cx="24" cy="24" r="3" />
          </g>
          <rect x="2" y="2" width="44" height="44" rx="8" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
        </svg>
      )
    case 'mramor':
      return (
        <svg viewBox="0 0 48 48" className="h-10 w-12" aria-hidden>
          <defs>
            <linearGradient id="cp-mra" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
              <stop offset="50%" stopColor="rgba(217,184,114,0.18)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.10)" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="44" height="44" rx="8" fill="url(#cp-mra)" />
          <g fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="0.8" strokeLinecap="round">
            <path d="M4 14 C 14 10, 22 22, 30 14 S 44 18, 44 18" />
            <path d="M4 30 C 12 26, 20 36, 30 30 S 44 36, 44 36" opacity="0.7" />
            <path d="M6 22 C 14 18, 20 26, 28 22 S 42 26, 42 26" opacity="0.5" />
          </g>
          <rect x="2" y="2" width="44" height="44" rx="8" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
        </svg>
      )
    case 'uv-pechat':
      return (
        <svg viewBox="0 0 48 48" className="h-10 w-12" aria-hidden>
          <defs>
            <linearGradient id="cp-uv" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(91,155,255,0.6)" />
              <stop offset="60%" stopColor="rgba(217,184,114,0.45)" />
              <stop offset="100%" stopColor="rgba(91,155,255,0.25)" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="44" height="44" rx="8" fill="url(#cp-uv)" opacity="0.7" />
          <g fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 34 L18 22 L26 30 L32 24 L40 34 Z" fill="rgba(255,255,255,0.18)" />
            <circle cx="34" cy="14" r="2.4" fill="rgba(255,255,255,0.9)" />
          </g>
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
