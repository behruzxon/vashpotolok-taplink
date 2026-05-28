'use client'

import { useMemo } from 'react'
import {
  AREA_MAX_M2,
  AREA_MIN_M2,
  SIDE_MAX_M,
  SIDE_MIN_M,
  type RoomShapeMode,
} from '@/data/price-options'
import { parseDecimal } from '@/lib/pro-price-estimate'
import { cn } from '@/lib/cn'

type Props = {
  mode: RoomShapeMode
  lengthM: string
  widthM: string
  areaM2: string
  onModeChange: (m: RoomShapeMode) => void
  onLengthChange: (v: string) => void
  onWidthChange: (v: string) => void
  onAreaChange: (v: string) => void
}

export function SizeStep({
  mode,
  lengthM,
  widthM,
  areaM2,
  onModeChange,
  onLengthChange,
  onWidthChange,
  onAreaChange,
}: Props) {
  const derived = useMemo(() => {
    if (mode === 'dimensions') {
      const l = parseDecimal(lengthM)
      const w = parseDecimal(widthM)
      if (!Number.isFinite(l) || !Number.isFinite(w) || l <= 0 || w <= 0) {
        return { area: 0, perimeter: 0, valid: false }
      }
      return { area: l * w, perimeter: 2 * (l + w), valid: true }
    }
    const a = parseDecimal(areaM2)
    if (!Number.isFinite(a) || a <= 0) return { area: 0, perimeter: 0, valid: false }
    const side = Math.sqrt(a)
    return { area: a, perimeter: side * 4, valid: true }
  }, [mode, lengthM, widthM, areaM2])

  const inRange =
    derived.valid && derived.area >= AREA_MIN_M2 && derived.area <= AREA_MAX_M2

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-1.5 rounded-2xl border border-line-soft bg-white/[0.04] p-1">
        <ModeButton active={mode === 'dimensions'} onClick={() => onModeChange('dimensions')}>
          Uzunlik × eni
        </ModeButton>
        <ModeButton active={mode === 'area'} onClick={() => onModeChange('area')}>
          Faqat m²
        </ModeButton>
      </div>

      {mode === 'dimensions' ? (
        <div className="grid grid-cols-2 gap-2.5">
          <NumericField
            label="Uzunlik (m)"
            value={lengthM}
            onChange={onLengthChange}
            min={SIDE_MIN_M}
            max={SIDE_MAX_M}
            placeholder="6"
          />
          <NumericField
            label="Eni (m)"
            value={widthM}
            onChange={onWidthChange}
            min={SIDE_MIN_M}
            max={SIDE_MAX_M}
            placeholder="4"
          />
        </div>
      ) : (
        <NumericField
          label="Maydon (m²)"
          value={areaM2}
          onChange={onAreaChange}
          min={AREA_MIN_M2}
          max={AREA_MAX_M2}
          placeholder="24"
        />
      )}

      <div className="rounded-2xl border border-line-soft bg-bg-base/40 p-4">
        <div className="grid grid-cols-2 gap-3">
          <PreviewMetric
            label="Maydon"
            value={derived.valid ? `${roundDec(derived.area)} m²` : '—'}
            highlight={inRange}
          />
          <PreviewMetric
            label="Perimetr"
            value={derived.valid ? `${roundDec(derived.perimeter)} m` : '—'}
          />
        </div>
        {derived.valid && !inRange ? (
          <p className="mt-2 text-[11px] font-semibold text-call/90">
            Maydon {AREA_MIN_M2}–{AREA_MAX_M2} m² oralig‘ida bo‘lishi kerak.
          </p>
        ) : null}
      </div>

      <p className="flex items-start gap-2 text-[11.5px] leading-snug text-ink-muted">
        <svg viewBox="0 0 24 24" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-accent-glow" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v4" />
          <path d="M12 16h.01" />
        </svg>
        Agar aniq o‘lchamni bilmasangiz, taxminiy m² kiriting. Usta kelganda aniq o‘lchov olinadi.
      </p>
    </div>
  )
}

function roundDec(n: number): string {
  return (Math.round(n * 10) / 10).toString()
}

function ModeButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'flex min-h-[40px] items-center justify-center rounded-xl text-[12.5px] font-semibold transition-all',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base',
        active
          ? 'bg-grad-button text-white shadow-[0_0_14px_-2px_rgba(91,155,255,0.6)]'
          : 'text-ink-secondary hover:bg-white/[0.04]',
      )}
    >
      {children}
    </button>
  )
}

function NumericField({
  label,
  value,
  onChange,
  min,
  max,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  min: number
  max: number
  placeholder?: string
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
        {label}
      </span>
      <input
        type="text"
        inputMode="decimal"
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        placeholder={placeholder}
        aria-label={label}
        className="h-12 rounded-xl border border-line-strong bg-white/[0.04] px-3 text-[16px] font-bold tabular-nums text-ink-primary placeholder:text-ink-muted/60 focus:border-brand-accent-glow focus:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-brand-accent/40"
      />
      <span className="text-[10px] text-ink-muted">{min}–{max}</span>
    </label>
  )
}

function PreviewMetric({
  label,
  value,
  highlight,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
        {label}
      </p>
      <p
        className={cn(
          'mt-0.5 text-[22px] font-extrabold leading-none tabular-nums',
          highlight ? 'text-brand-accent-glow' : 'text-ink-primary',
        )}
      >
        {value}
      </p>
    </div>
  )
}
