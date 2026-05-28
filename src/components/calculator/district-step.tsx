'use client'

import { districtOptions } from '@/data/price-options'
import { trackEvent } from '@/lib/analytics'
import { cn } from '@/lib/cn'

type Props = {
  selectedId: string
  onSelect: (id: string) => void
}

export function DistrictStep({ selectedId, onSelect }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <p className="flex items-start gap-2 rounded-xl border border-line-soft bg-white/[0.03] px-3 py-2 text-[11px] leading-snug text-ink-secondary">
        <svg viewBox="0 0 24 24" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-accent-glow" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v4" />
          <path d="M12 16h.01" />
        </svg>
        <span>
          <span className="font-semibold text-ink-primary">Qashqadaryo bo‘ylab narx bir xil.</span>{' '}
          Tuman tanlovi faqat kontakt uchun ishlatiladi.
        </span>
      </p>

      <ul className="grid grid-cols-2 gap-2">
        {districtOptions.map((d) => {
          const active = d.id === selectedId
          return (
            <li key={d.id}>
              <button
                type="button"
                onClick={() => {
                  onSelect(d.id)
                  trackEvent('pro_district_selected', { id: d.id })
                }}
                aria-pressed={active}
                className={cn(
                  'group relative flex h-full min-h-[48px] w-full items-center gap-2 overflow-hidden rounded-xl border px-3 py-2 text-left transition-all duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base',
                  active
                    ? 'border-brand-accent-glow bg-brand-accent-soft shadow-[0_0_18px_-6px_rgba(91,155,255,0.5)]'
                    : 'border-line-soft bg-white/[0.04] hover:border-line-strong',
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors',
                    active
                      ? 'border-brand-accent-glow bg-grad-button shadow-[0_0_10px_rgba(91,155,255,0.6)]'
                      : 'border-line-strong bg-white/[0.04]',
                  )}
                >
                  {active ? (
                    <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12l4 4 10-10" />
                    </svg>
                  ) : null}
                </span>
                <span className="truncate text-[12.5px] font-semibold leading-tight text-ink-primary">
                  {d.label}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
