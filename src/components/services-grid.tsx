'use client'

import type { Service, ServiceIcon } from '@/data/services'
import { createTelegramBotLink } from '@/data/links'
import { trackEvent } from '@/lib/analytics'
import { cn } from '@/lib/cn'

type Props = {
  items: Service[]
}

const servicesBotLink = createTelegramBotLink('services')

function ServiceIconSVG({ name, size = 5 }: { name: ServiceIcon; size?: number }) {
  const common = {
    className: cn(size === 6 ? 'h-6 w-6' : 'h-5 w-5'),
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }
  switch (name) {
    case 'ceiling':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M3 6h18" />
          <path d="M5 6c0 4 2 7 7 7s7-3 7-7" />
          <path d="M12 13v6" />
        </svg>
      )
    case 'led':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M9 18h6" />
          <path d="M10 21h4" />
          <path d="M12 3a6 6 0 0 0-4 10c.6.7 1 1.4 1 2v1h6v-1c0-.6.4-1.3 1-2A6 6 0 0 0 12 3z" />
        </svg>
      )
    case 'cornice':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M3 5h18" />
          <path d="M3 9h18" />
          <path d="M5 9v10" />
          <path d="M19 9v10" />
        </svg>
      )
    case 'lamp':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M12 3v3" />
          <circle cx="12" cy="11" r="5" />
          <path d="M9 17h6l-1 4h-4z" />
        </svg>
      )
    case 'design':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M3 21l4-1 11-11-3-3L4 17z" />
          <path d="M14 6l3 3" />
          <path d="M16 3l5 5-2 2-5-5z" />
        </svg>
      )
  }
}

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  )
}

export function ServicesGrid({ items }: Props) {
  const featured = items.find((s) => s.featured)
  const rest = items.filter((s) => !s.featured)

  return (
    <section aria-labelledby="services-title">
      <div className="mb-3 flex items-end justify-between px-1">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-line-soft bg-bg-surface px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-secondary shadow-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-accent shadow-[0_0_8px_rgba(47,107,255,0.65)]" />
            5 yechim
          </div>
          <h2 id="services-title" className="mt-2 text-[20px] font-bold leading-tight text-ink-primary">
            Xonangiz uchun tayyor yechimlar
          </h2>
          <p className="mt-1 text-[12px] leading-snug text-ink-secondary">
            Material, yoritish va montaj bo‘yicha eng ko‘p tanlanadigan variantlar.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        {featured ? <FeaturedCard service={featured} /> : null}

        <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {rest.map((s) => (
            <li
              key={s.id}
              className="group relative overflow-hidden rounded-2xl border border-line-soft bg-bg-surface p-3.5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-accent/30 hover:shadow-card motion-reduce:transition-none motion-reduce:hover:transform-none"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-brand-accent-soft blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="flex items-center gap-3">
                <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-accent-soft text-brand-accent ring-1 ring-brand-accent/15 transition-all duration-300 group-hover:scale-[1.06] group-hover:shadow-[0_4px_12px_-4px_rgba(47,107,255,0.45)]">
                  <ServiceIconSVG name={s.icon} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[14.5px] font-semibold leading-tight text-ink-primary">
                    {s.title}
                  </p>
                  {s.subtitle ? (
                    <p className="mt-0.5 text-[12px] leading-snug text-ink-secondary">
                      {s.subtitle}
                    </p>
                  ) : null}
                </div>
                <span
                  aria-hidden
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-bg-base text-ink-muted transition-all duration-300 group-hover:bg-brand-accent-soft group-hover:text-brand-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </li>
          ))}
        </ul>

        <a
          href={servicesBotLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('click_services_cta', { source: 'services' })}
          aria-label="Telegram botda mos variantni tanlash"
          className="group mt-1 flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-line-soft bg-bg-surface px-4 py-3 text-[13.5px] font-semibold text-ink-primary shadow-soft transition-colors hover:border-brand-accent/30 hover:bg-bg-base active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-brand-accent" fill="currentColor" aria-hidden>
            <path d="M21.5 4.2 2.8 11.4c-1 .4-.9 1.8.1 2l4.8 1.4 1.8 5.5c.2.6 1 .8 1.4.3l2.7-3 5 3.7c.8.6 2 .2 2.2-.8l3.4-14.6c.3-1.1-.8-2-1.8-1.6Z" />
          </svg>
          Telegram botda mos variant
          <span aria-hidden className="text-brand-accent transition-transform duration-200 group-hover:translate-x-0.5">→</span>
        </a>
      </div>
    </section>
  )
}

function FeaturedCard({ service }: { service: Service }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border-[1.5px] border-brand-accent/35 bg-gradient-to-br from-brand-accent-soft via-bg-surface to-bg-surface p-4 shadow-[0_14px_38px_-14px_rgba(47,107,255,0.30),0_2px_8px_rgba(15,23,42,0.06)] ring-1 ring-brand-accent/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-14px_rgba(47,107,255,0.40),0_4px_12px_rgba(15,23,42,0.08)] motion-reduce:transition-none motion-reduce:hover:transform-none">
      {/* Soft top-right ambient glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-accent-soft blur-3xl opacity-70 transition-opacity duration-500 group-hover:opacity-100"
      />

      {service.badge ? (
        <div className="relative mb-2.5 flex">
          <span className="inline-flex items-center gap-1 rounded-full border border-brand-accent/30 bg-brand-accent-soft px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.14em] text-brand-primary">
            <span aria-hidden className="h-1 w-1 rounded-full bg-brand-accent" />
            {service.badge}
          </span>
        </div>
      ) : null}

      <div className="relative flex items-center gap-3.5">
        <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-bg-surface text-brand-primary ring-1 ring-brand-accent/30 shadow-[0_6px_18px_-6px_rgba(47,107,255,0.45)] transition-all duration-300 group-hover:scale-[1.06] group-hover:shadow-[0_10px_24px_-6px_rgba(47,107,255,0.55)]">
          <ServiceIconSVG name={service.icon} size={6} />
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-[16px] font-bold leading-tight text-ink-primary">
            {service.title}
          </p>
          {service.subtitle ? (
            <p className="mt-1 text-[12.5px] leading-snug text-ink-secondary">
              {service.subtitle}
            </p>
          ) : null}
        </div>

        <span
          aria-hidden
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-accent-soft text-brand-primary transition-all duration-300 group-hover:bg-grad-button group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </article>
  )
}
