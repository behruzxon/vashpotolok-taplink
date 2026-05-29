'use client'

import { ceilingTypes, roomTypes } from '@/data/price-options'
import { formatPriceRange, type ProEstimateResult } from '@/lib/pro-price-estimate'
import { createTelegramBotLink } from '@/data/links'
import { track } from '@/lib/analytics'
import { EstimateBreakdown } from './estimate-breakdown'

type Props = {
  result: ProEstimateResult
  roomTypeId: string
  ceilingTypeId: string
  onRestart: () => void
}

export function ResultStep({
  result,
  roomTypeId,
  ceilingTypeId,
  onRestart,
}: Props) {
  const room = roomTypes.find((r) => r.id === roomTypeId)
  const ceiling = ceilingTypes.find((c) => c.id === ceilingTypeId)

  const botLink = createTelegramBotLink(result.payload)
  const isValid = result.valid && result.totalMax > 0

  return (
    <div className="flex flex-col gap-4">
      <div className="relative overflow-hidden rounded-2xl border border-brand-accent/25 bg-gradient-to-br from-brand-accent-soft via-bg-surface to-bg-surface p-5 shadow-[0_12px_40px_-16px_rgba(47,107,255,0.45)]">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-brand-accent-soft blur-3xl"
        />
        <div className="relative">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-primary">
              Taxminiy diapazon
            </p>
            <span className="rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-success">
              Tayyor
            </span>
          </div>
          <p className="mt-2 bg-gradient-to-br from-brand-primary via-brand-accent to-ink-primary bg-clip-text text-[30px] font-extrabold leading-tight text-transparent tabular-nums sm:text-[34px]">
            {formatPriceRange(result.totalMin, result.totalMax)}
          </p>
          <p className="mt-1.5 text-[12px] text-ink-secondary">
            <span className="font-semibold text-ink-primary tabular-nums">{result.areaM2} m²</span>
            <span className="mx-1.5 text-ink-muted">·</span>
            <span>perimetr <span className="tabular-nums">{result.perimeterM} m</span></span>
          </p>
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-2 rounded-2xl border border-line-soft bg-bg-base p-3 text-[12px]">
        <SummaryRow label="Xona" value={room?.label ?? '—'} />
        <SummaryRow label="Maydon" value={`${result.areaM2} m²`} />
        <SummaryRow label="Potolok" value={ceiling?.label ?? '—'} full />
      </dl>

      <EstimateBreakdown items={result.breakdown} />

      <div className="flex items-start gap-2.5 rounded-2xl border border-gold/30 bg-gold-soft px-3.5 py-3">
        <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-gold" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v4" />
          <path d="M12 16h.01" />
        </svg>
        <p className="text-[11.5px] leading-snug text-ink-secondary">
          <span className="font-semibold text-ink-primary">Bu taxminiy hisob.</span>{' '}
          Aniq narx o‘lchov va yakuniy tanlovdan keyin belgilanadi.
        </p>
      </div>

      <a
        href={isValid ? botLink : undefined}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={!isValid}
        onClick={(e) => {
          if (!isValid) {
            e.preventDefault()
            return
          }
          track('click_pro_calculator_telegram', {
            payload: result.payload,
            totalMin: result.totalMin,
            totalMax: result.totalMax,
          })
          track('click_telegram_bot', { source: 'price' })
        }}
        className={[
          'group flex min-h-[56px] items-center justify-center gap-2 rounded-2xl px-4 py-3 text-[15px] font-semibold transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base',
          isValid
            ? 'bg-grad-button text-white shadow-cta'
            : 'cursor-not-allowed bg-line-soft text-ink-muted',
        ].join(' ')}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
          <path d="M21.5 4.2 2.8 11.4c-1 .4-.9 1.8.1 2l4.8 1.4 1.8 5.5c.2.6 1 .8 1.4.3l2.7-3 5 3.7c.8.6 2 .2 2.2-.8l3.4-14.6c.3-1.1-.8-2-1.8-1.6Z" />
        </svg>
        Aniq narxni Telegramda olish
      </a>

      <button
        type="button"
        onClick={onRestart}
        className="rounded text-center text-[12px] font-semibold text-ink-secondary underline-offset-4 hover:text-brand-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
      >
        Qayta hisoblash
      </button>
    </div>
  )
}

function SummaryRow({ label, value, full }: { label: string; value: string; full?: boolean }) {
  return (
    <div className={full ? 'col-span-2 flex flex-col' : 'flex flex-col'}>
      <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
        {label}
      </dt>
      <dd className="mt-0.5 text-[12.5px] font-semibold text-ink-primary">
        {value}
      </dd>
    </div>
  )
}
