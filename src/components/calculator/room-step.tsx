'use client'

import { roomTypes } from '@/data/price-options'
import { trackEvent } from '@/lib/analytics'
import { cn } from '@/lib/cn'

type Props = {
  selectedId: string
  onSelect: (id: string) => void
}

function RoomIcon({ id }: { id: string }) {
  const common = {
    viewBox: '0 0 32 32',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    className: 'h-7 w-7',
  }
  switch (id) {
    case 'zal':
      return (
        <svg {...common}>
          {/* katta xona — sofa + ceiling glow */}
          <path d="M4 11h24" />
          <path d="M6 11v10h20V11" />
          <path d="M8 21v3" />
          <path d="M24 21v3" />
          <path d="M9 17h14" />
          <path d="M11 13c0 1.5 2 2 5 2s5-.5 5-2" />
          <circle cx="16" cy="7" r="1.2" />
          <path d="M13 6.2 11.5 4.5" />
          <path d="M19 6.2 20.5 4.5" />
        </svg>
      )
    case 'yotoqxona':
      return (
        <svg {...common}>
          {/* bed silhouette */}
          <path d="M4 22V11" />
          <path d="M28 22v-7" />
          <path d="M4 15h24" />
          <path d="M4 22h24" />
          <path d="M9 15v-3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" />
          <rect x="10" y="11.5" width="5" height="2.5" rx="0.8" />
          <rect x="17" y="11.5" width="5" height="2.5" rx="0.8" />
        </svg>
      )
    case 'oshxona':
      return (
        <svg {...common}>
          {/* kitchen — stove + hood */}
          <path d="M5 6h22" />
          <path d="M7 6v6h18V6" />
          <path d="M10 12v2" />
          <path d="M22 12v2" />
          <rect x="6" y="14" width="20" height="12" rx="1.5" />
          <circle cx="11" cy="20" r="2" />
          <circle cx="21" cy="20" r="2" />
          <path d="M6 18h20" />
        </svg>
      )
    case 'koridor':
      return (
        <svg {...common}>
          {/* corridor — perspective hall */}
          <path d="M4 6h24" />
          <path d="M4 26h24" />
          <path d="M9 6 11 26" />
          <path d="M23 6 21 26" />
          <path d="M14 12v8" />
          <path d="M18 12v8" />
          <path d="M14 16h4" />
        </svg>
      )
    default:
      return (
        <svg {...common}>
          <rect x="6" y="6" width="20" height="20" rx="2" />
        </svg>
      )
  }
}

export function RoomStep({ selectedId, onSelect }: Props) {
  return (
    <ul className="grid grid-cols-2 gap-2.5">
      {roomTypes.map((room) => {
        const active = room.id === selectedId
        return (
          <li key={room.id}>
            <button
              type="button"
              onClick={() => {
                onSelect(room.id)
                trackEvent('pro_room_selected', { id: room.id })
              }}
              aria-pressed={active}
              className={cn(
                'group relative flex h-full w-full flex-col items-start gap-2 overflow-hidden rounded-2xl border p-3.5 text-left transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base',
                active
                  ? 'border-brand-accent-glow bg-brand-accent-soft shadow-[0_0_24px_-4px_rgba(91,155,255,0.45)]'
                  : 'border-line-soft bg-white/[0.04] hover:border-line-strong',
              )}
            >
              <span
                aria-hidden
                className={cn(
                  'pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full blur-2xl transition-opacity duration-500',
                  active ? 'bg-brand-accent-soft opacity-100' : 'bg-brand-accent-soft opacity-0 group-hover:opacity-60',
                )}
              />
              <span
                className={cn(
                  'relative flex h-10 w-10 items-center justify-center rounded-xl ring-1 transition-colors',
                  active
                    ? 'bg-brand-accent-soft text-brand-accent-glow ring-brand-accent/40'
                    : 'bg-white/[0.05] text-ink-secondary ring-white/10',
                )}
              >
                <RoomIcon id={room.id} />
              </span>
              <span className="text-[14px] font-bold leading-tight text-ink-primary">
                {room.label}
              </span>
              <span className="text-[11px] leading-snug text-ink-secondary">
                {room.hint}
              </span>
              {active ? (
                <span
                  aria-hidden
                  className="absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-grad-button text-white shadow-[0_0_12px_rgba(91,155,255,0.6)]"
                >
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12l4 4 10-10" />
                  </svg>
                </span>
              ) : null}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
