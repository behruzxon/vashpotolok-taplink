'use client'

import type { ReactNode } from 'react'
import { GlassCard } from '../primitives/glass-card'
import { cn } from '@/lib/cn'

export const TOTAL_STEPS = 6

type Props = {
  step: number | 'result'
  title: string
  subtitle?: string
  children: ReactNode
  back?: { onClick: () => void; disabled?: boolean }
  next?: { onClick: () => void; disabled?: boolean; label: string }
}

export function CalculatorShell({ step, title, subtitle, children, back, next }: Props) {
  const isResult = step === 'result'
  const stepIndex = isResult ? TOTAL_STEPS : (step as number)

  return (
    <GlassCard glow className="overflow-hidden p-5">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-brand-accent-glow/70 to-transparent"
      />
      <div>
        <div className="flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-accent/30 bg-brand-accent-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-brand-accent-glow shadow-[0_0_18px_-6px_rgba(91,155,255,0.5)]">
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden>
              <path d="M12 2 4 6v6c0 5 3.4 9.5 8 10 4.6-.5 8-5 8-10V6l-8-4Z" />
            </svg>
            Pro kalkulyator
          </div>
          {isResult ? (
            <span className="rounded-full border border-success/30 bg-success/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-success">
              Hisob tayyor
            </span>
          ) : (
            <span className="text-[11px] font-bold tabular-nums text-ink-secondary">
              <span className="text-ink-primary">{stepIndex}</span>
              <span className="opacity-50">/{TOTAL_STEPS}</span>
            </span>
          )}
        </div>

        <div className="mt-3 flex gap-1">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => {
            const filled = isResult || i < stepIndex
            const current = !isResult && i === stepIndex - 1
            return (
              <span
                key={i}
                className={cn(
                  'relative h-1.5 flex-1 overflow-hidden rounded-full transition-all duration-500',
                  filled
                    ? current
                      ? 'bg-grad-button shadow-[0_0_14px_rgba(91,155,255,0.7)]'
                      : 'bg-brand-accent/80'
                    : 'bg-white/[0.08]',
                )}
              >
                {current ? (
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shine motion-reduce:hidden"
                  />
                ) : null}
              </span>
            )
          })}
        </div>

        <div className="mt-4">
          <h2 className="text-[18px] font-bold leading-tight text-ink-primary">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-1 text-[12.5px] leading-snug text-ink-secondary">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-4 min-h-[260px]">
        <div key={String(step)} className="animate-step-in motion-reduce:animate-none">
          {children}
        </div>
      </div>

      {back || next ? (
        <div className="mt-5 flex items-center gap-2">
          {back ? (
            <button
              type="button"
              onClick={back.onClick}
              disabled={back.disabled}
              aria-label="Orqaga"
              className={cn(
                'flex min-h-[48px] items-center justify-center rounded-xl border px-4 text-[13px] font-semibold transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base',
                back.disabled
                  ? 'cursor-not-allowed border-line-soft bg-white/[0.02] text-ink-muted opacity-50'
                  : 'border-line-strong bg-white/[0.05] text-ink-primary hover:bg-white/[0.10]',
              )}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
          ) : null}
          {next ? (
            <button
              type="button"
              onClick={next.onClick}
              disabled={next.disabled}
              className={cn(
                'flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl px-4 text-[14px] font-semibold transition-transform active:scale-[0.98]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base',
                next.disabled
                  ? 'cursor-not-allowed bg-white/[0.05] text-ink-muted'
                  : 'bg-grad-button text-white shadow-cta',
              )}
            >
              {next.label}
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          ) : null}
        </div>
      ) : null}
    </GlassCard>
  )
}
