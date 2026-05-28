'use client'

import { cn } from '@/lib/cn'

type Props = {
  label: string
  hint?: string
  unit: 'meter' | 'piece' | 'fixed'
  value: number
  min: number
  max: number
  onChange: (next: number) => void
}

const unitLabel: Record<Props['unit'], string> = {
  meter: 'm',
  piece: 'dona',
  fixed: '',
}

export function QuantityControl({ label, hint, unit, value, min, max, onChange }: Props) {
  const active = value > 0
  const clamp = (n: number) => Math.min(max, Math.max(min, n))
  const dec = () => onChange(clamp(value - 1))
  const inc = () => onChange(clamp(value + 1))

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-3 rounded-2xl border p-3 transition-colors',
        active
          ? 'border-brand-accent-glow bg-brand-accent-soft shadow-[0_0_18px_-6px_rgba(91,155,255,0.45)]'
          : 'border-line-soft bg-white/[0.04]',
      )}
    >
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-bold leading-tight text-ink-primary">{label}</p>
        {hint ? (
          <p className="mt-0.5 text-[11px] leading-snug text-ink-secondary">{hint}</p>
        ) : null}
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={dec}
          disabled={value <= min}
          aria-label={`${label}: ${unitLabel[unit] || 'qiymat'} kamaytirish`}
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors active:scale-95',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base',
            value <= min
              ? 'cursor-not-allowed border-line-soft bg-white/[0.02] text-ink-muted opacity-50'
              : 'border-line-strong bg-white/[0.05] text-ink-primary hover:bg-white/[0.10]',
          )}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
            <path d="M5 12h14" />
          </svg>
        </button>

        <div className="flex min-w-[58px] flex-col items-center px-1">
          <span className="text-[18px] font-extrabold leading-none tabular-nums text-ink-primary">
            {value}
          </span>
          {unitLabel[unit] ? (
            <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
              {unitLabel[unit]}
            </span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={inc}
          disabled={value >= max}
          aria-label={`${label}: ${unitLabel[unit] || 'qiymat'} oshirish`}
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors active:scale-95',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base',
            value >= max
              ? 'cursor-not-allowed border-line-soft bg-white/[0.02] text-ink-muted opacity-50'
              : 'border-line-strong bg-white/[0.05] text-ink-primary hover:bg-white/[0.10]',
          )}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
        </button>
      </div>
    </div>
  )
}
