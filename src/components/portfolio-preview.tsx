'use client'

import type { PortfolioItem } from '@/data/portfolio'
import { createTelegramBotLink } from '@/data/links'
import { track } from '@/lib/analytics'

type Props = {
  items: PortfolioItem[]
  portfolioLink?: string
}

const portfolioBotLink = createTelegramBotLink('portfolio')

export function PortfolioPreview({ items, portfolioLink }: Props) {
  return (
    <section aria-labelledby="portfolio-title">
      <div className="mb-3 flex items-end justify-between gap-3 px-1">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-line-soft bg-bg-surface px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-secondary shadow-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-accent shadow-[0_0_8px_rgba(47,107,255,0.65)]" />
            Ish namunalari
          </div>
          <h2 id="portfolio-title" className="mt-2 text-[20px] font-bold leading-tight text-ink-primary">
            Ishlarimizdan namunalar
          </h2>
          <p className="mt-1 text-[12px] leading-snug text-ink-secondary">
            Har bir xona uchun alohida yechim:<br />o‘lchov, dizayn va montaj bir joyda.
          </p>
        </div>
        {portfolioLink ? (
          <a
            href={portfolioLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('click_instagram', { source: 'portfolio' })}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line-soft bg-bg-surface px-3.5 py-2 text-[12px] font-semibold text-ink-primary shadow-soft transition-colors hover:bg-bg-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-brand-accent" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            Instagram
            <span aria-hidden className="text-brand-accent">→</span>
          </a>
        ) : null}
      </div>

      <div className="-mx-5 px-5">
        <ul
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 pr-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="list"
        >
          {items.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </ul>
      </div>

      <a
        href={portfolioBotLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track('click_telegram_bot', { source: 'portfolio' })}
        className="mt-2 flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border border-line-soft bg-bg-surface px-4 py-3 text-[14px] font-semibold text-ink-primary shadow-soft transition-colors hover:bg-bg-base active:scale-[0.98]"
      >
        <span className="text-brand-accent">★</span>
        Shunday yechim sizga ham — botda hisoblating
      </a>
    </section>
  )
}

function RenderPlaceholder({ gradient }: { gradient: string }) {
  return (
    <>
      <div className="absolute inset-0" style={{ background: gradient }} aria-hidden />
      {/* darker base — interior depth */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, transparent 45%, rgba(8,11,22,0.55) 80%, rgba(8,11,22,0.85) 100%)',
        }}
      />
      {/* ceiling panel — top zone */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[42%]"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 60%, transparent 100%)',
        }}
      />
      {/* ceiling grid lines */}
      <div
        aria-hidden
        className="absolute inset-x-3 top-2 h-[36%] opacity-[0.28]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)',
          backgroundSize: '100% 12px',
        }}
      />
      {/* main LED strip — center */}
      <div
        aria-hidden
        className="absolute inset-x-6 top-[40%] h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.95) 50%, transparent 100%)',
          boxShadow: '0 0 20px rgba(91,155,255,0.85)',
        }}
      />
      {/* perimeter LED — lower */}
      <div
        aria-hidden
        className="absolute inset-x-12 top-[46%] h-px opacity-70"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(91,155,255,0.7) 50%, transparent 100%)',
          boxShadow: '0 0 12px rgba(91,155,255,0.6)',
        }}
      />
      {/* horizon line — wall ↔ floor */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-[70%] h-px opacity-50"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)',
        }}
      />
      {/* wall vignette — corners */}
      <div
        aria-hidden
        className="absolute -left-8 top-[20%] h-32 w-32 rounded-full blur-3xl"
        style={{ background: 'rgba(91,155,255,0.18)' }}
      />
      <div
        aria-hidden
        className="absolute -right-8 top-[20%] h-32 w-32 rounded-full blur-3xl"
        style={{ background: 'rgba(91,155,255,0.18)' }}
      />
    </>
  )
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
  const href = createTelegramBotLink('portfolio')

  return (
    <li className="group relative w-[86%] max-w-[360px] shrink-0 snap-start overflow-hidden rounded-3xl border border-line-soft bg-bg-surface shadow-card">
      <article className="relative flex h-full flex-col">
        {/* Image zone — pure photo, 9:16 portrait, full-bleed cover */}
        {item.image ? (
          <div className="relative aspect-[9/16] overflow-hidden bg-bg-base">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="h-full w-full object-cover object-center"
            />
          </div>
        ) : (
          // Fallback placeholder (no real image): keep abstract render
          <div className="relative aspect-[9/16] overflow-hidden">
            <RenderPlaceholder gradient={item.gradient} />
          </div>
        )}

        {/* Body — all text moved here, below image */}
        <div className="flex flex-1 flex-col gap-3 bg-bg-surface p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-secondary">
              <svg viewBox="0 0 24 24" className="h-3 w-3 text-brand-accent" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 21s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              {item.location}
            </p>
            {item.areaM2 ? (
              <span className="rounded-full border border-line-soft bg-bg-base px-2.5 py-0.5 text-[11px] font-bold tabular-nums text-ink-primary">
                {item.areaM2} m²
              </span>
            ) : null}
          </div>

          <h3 className="text-[17px] font-bold leading-tight text-ink-primary">
            {item.title}
          </h3>

          <p className="text-[12px] font-semibold uppercase tracking-wider text-brand-primary">
            {item.serviceType}
          </p>

          <p className="text-[13px] leading-snug text-ink-secondary">
            {item.result}
          </p>

          {item.tags.length > 0 ? (
            <ul className="flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-line-soft bg-bg-base px-2 py-0.5 text-[10px] font-medium text-ink-secondary"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          ) : null}

          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              track('click_portfolio', { itemId: item.id })
              track('click_telegram_bot', { source: 'portfolio' })
            }}
            className="mt-auto flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-grad-button text-[13px] font-semibold text-white shadow-cta transition-transform active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
              <path d="M21.5 4.2 2.8 11.4c-1 .4-.9 1.8.1 2l4.8 1.4 1.8 5.5c.2.6 1 .8 1.4.3l2.7-3 5 3.7c.8.6 2 .2 2.2-.8l3.4-14.6c.3-1.1-.8-2-1.8-1.6Z"/>
            </svg>
            Shunga o‘xshash hisoblatish
          </a>
        </div>
      </article>
    </li>
  )
}
