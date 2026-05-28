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
                'flex w-full items-start gap-3 rounded-2xl border p-3 text-left transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base',
                active
                  ? 'border-brand-accent-glow bg-brand-accent-soft shadow-[0_0_24px_-4px_rgba(91,155,255,0.45)]'
                  : 'border-line-soft bg-white/[0.04] hover:border-line-strong',
              )}
            >
              <span
                aria-hidden
                className={cn(
                  'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors',
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
            </button>
          </li>
        )
      })}
    </ul>
  )
}
