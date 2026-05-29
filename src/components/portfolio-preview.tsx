'use client'

import type { PortfolioItem } from '@/data/portfolio'
import { createTelegramBotLink } from '@/data/links'
import { track } from '@/lib/analytics'
import { cn } from '@/lib/cn'

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
  const isFeatured = item.featured === true
  const href = createTelegramBotLink('portfolio')

  return (
    <li
      className={cn(
        'group relative shrink-0 snap-start overflow-hidden rounded-3xl border border-line-soft bg-bg-surface shadow-card',
        isFeatured ? 'w-[82%]' : 'w-[70%]',
      )}
    >
      <article className="relative flex h-full flex-col">
        <div
          className={cn(
            'relative overflow-hidden',
            isFeatured ? 'aspect-[4/3]' : 'aspect-[4/3.2]',
          )}
        >
          {item.image ? (
            // Phase 2.5: next/image bilan almashtiriladi (real fotosurat kelganda).
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.image}
              alt={`${item.title} — ${item.location}`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <RenderPlaceholder gradient={item.gradient} />
          )}

          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                'radial-gradient(60% 40% at 50% 0%, rgba(255,255,255,0.18), transparent 70%)',
            }}
          />

          <span
            aria-hidden
            className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-shine motion-reduce:hidden"
          />

          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-accent-glow shadow-[0_0_8px_rgba(91,155,255,0.9)]" />
            Ish namunasi
          </span>

          {item.areaM2 ? (
            <span className="absolute right-3 top-3 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-bold tabular-nums text-white backdrop-blur-md">
              {item.areaM2} m²
            </span>
          ) : null}

          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-2/3"
            style={{
              background:
                'linear-gradient(to top, rgba(8,11,22,0.92) 0%, rgba(8,11,22,0.55) 45%, transparent 100%)',
            }}
          />

          <div className="absolute inset-x-0 bottom-0 p-4">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/70">
              <svg viewBox="0 0 24 24" className="h-3 w-3 text-brand-accent-glow" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 21s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              {item.location}
            </p>
            <h3 className="mt-1 text-[16px] font-bold leading-tight text-white drop-shadow-sm">
              {item.title}
            </h3>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 bg-bg-surface p-4">
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
