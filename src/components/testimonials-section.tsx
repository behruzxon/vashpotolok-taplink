'use client'

import type { TestimonialItem } from '@/data/testimonials'
import { createTelegramBotLink } from '@/data/links'
import { track } from '@/lib/analytics'

type Props = {
  items: TestimonialItem[]
}

const trustBotLink = createTelegramBotLink('trust')

export function TestimonialsSection({ items }: Props) {
  if (items.length === 0) return null

  return (
    <section aria-labelledby="testimonials-title">
      <div className="mb-3 px-1">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-line-soft bg-bg-glass-strong px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-secondary backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-accent-glow shadow-[0_0_8px_rgba(91,155,255,0.9)]" />
          Mijozlar fikri
        </div>
        <h2
          id="testimonials-title"
          className="mt-2 text-[20px] font-bold leading-tight text-ink-primary"
        >
          Mijozlar fikri
        </h2>
        <p className="mt-1 text-[12px] leading-snug text-ink-secondary">
          Har bir buyurtmada tushunarli hisob, toza montaj va mos yechimga e’tibor beramiz.
        </p>
      </div>

      <ul className="flex flex-col gap-2.5">
        {items.map((t) => (
          <TestimonialCard key={t.id} item={t} />
        ))}
      </ul>

      <a
        href={trustBotLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track('click_telegram_bot', { source: 'trust' })}
        aria-label="Shunga o‘xshash buyurtma uchun hisoblatish"
        className="mt-3 flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-grad-button text-[14px] font-semibold text-white shadow-cta transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
          <path d="M21.5 4.2 2.8 11.4c-1 .4-.9 1.8.1 2l4.8 1.4 1.8 5.5c.2.6 1 .8 1.4.3l2.7-3 5 3.7c.8.6 2 .2 2.2-.8l3.4-14.6c.3-1.1-.8-2-1.8-1.6Z" />
        </svg>
        Shunga o‘xshash hisoblatish
      </a>
    </section>
  )
}

function TestimonialCard({ item }: { item: TestimonialItem }) {
  const rating = item.rating ?? 0
  return (
    <li className="group relative isolate overflow-hidden rounded-2xl border border-line-soft bg-bg-glass-strong p-4 backdrop-blur-md transition-colors duration-300 hover:border-line-strong">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand-accent-soft opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 motion-reduce:hidden"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="flex items-center justify-between">
        {rating > 0 ? (
          <Stars value={rating} />
        ) : (
          <span aria-hidden className="h-3 w-3 rounded-full bg-brand-accent-glow shadow-[0_0_8px_rgba(91,155,255,0.9)]" />
        )}
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
          {item.customerLabel}
        </span>
      </div>

      <blockquote className="mt-2.5 flex items-start gap-2 text-[13.5px] leading-snug text-ink-primary">
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="mt-1 h-3.5 w-3.5 shrink-0 text-brand-accent-glow"
          fill="currentColor"
        >
          <path d="M6 5h4v6H8c0 2 1 3 2 3v2c-3 0-4-2-4-5V5zm8 0h4v6h-2c0 2 1 3 2 3v2c-3 0-4-2-4-5V5z" />
        </svg>
        <p>{item.quote}</p>
      </blockquote>

      <div className="mt-3 flex items-center gap-2 text-[11px] text-ink-secondary">
        <span className="inline-flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" className="h-3 w-3 text-brand-accent-glow" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 21s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          {item.location}
        </span>
        <span className="text-ink-muted">·</span>
        <span>{item.projectType}</span>
        {item.areaM2 ? (
          <>
            <span className="text-ink-muted">·</span>
            <span className="tabular-nums">{item.areaM2} m²</span>
          </>
        ) : null}
      </div>
    </li>
  )
}

function Stars({ value }: { value: number }) {
  const total = 5
  const filled = Math.max(0, Math.min(total, Math.round(value)))
  return (
    <div
      role="img"
      aria-label={`Reyting ${filled} ${total} dan`}
      className="flex items-center gap-0.5"
    >
      {Array.from({ length: total }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={
            i < filled ? 'h-3.5 w-3.5 text-gold' : 'h-3.5 w-3.5 text-white/15'
          }
          fill="currentColor"
          aria-hidden
        >
          <path d="m12 3 2.6 6 6.4.6-4.8 4.3 1.4 6.3L12 17l-5.6 3.2L7.8 14 3 9.6l6.4-.6L12 3z" />
        </svg>
      ))}
    </div>
  )
}
