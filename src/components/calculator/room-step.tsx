'use client'

import { roomTypes } from '@/data/price-options'
import { trackEvent } from '@/lib/analytics'
import { cn } from '@/lib/cn'

type Props = {
  selectedId: string
  onSelect: (id: string) => void
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
                'relative flex h-full w-full flex-col items-start gap-1 overflow-hidden rounded-2xl border p-3 text-left transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base',
                active
                  ? 'border-brand-accent-glow bg-brand-accent-soft shadow-[0_0_24px_-4px_rgba(91,155,255,0.45)]'
                  : 'border-line-soft bg-white/[0.04] hover:border-line-strong',
              )}
            >
              <span className="text-[22px] leading-none" aria-hidden>{room.icon}</span>
              <span className="text-[14px] font-bold leading-tight text-ink-primary">
                {room.label}
              </span>
              <span className="text-[11px] leading-snug text-ink-secondary">
                {room.hint}
              </span>
              {active ? (
                <span
                  aria-hidden
                  className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-grad-button text-white shadow-[0_0_12px_rgba(91,155,255,0.6)]"
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
