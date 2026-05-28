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
          <div className="inline-flex items-center gap-1.5 rounded-full border border-line-soft bg-bg-glass-strong px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-secondary backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-accent-glow shadow-[0_0_8px_rgba(91,155,255,0.9)]" />
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
            className="shrink-0 rounded-full border border-line-soft bg-bg-glass-strong px-3 py-1.5 text-[11px] font-semibold text-ink-primary backdrop-blur-md transition-colors hover:bg-white/[0.10]"
          >
            Instagram →
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
        className="mt-2 flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border border-line-soft bg-bg-glass-strong px-4 py-3 text-[14px] font-semibold text-ink-primary backdrop-blur-md transition-colors hover:bg-white/[0.10] active:scale-[0.98]"
      >
        <span className="text-brand-accent-glow">★</span>
        Shunday yechim sizga ham — botda hisoblating
      </a>
    </section>
  )
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
  const isFeatured = item.featured === true
  const href = createTelegramBotLink('portfolio')

  return (
    <li
      className={cn(
        'group relative shrink-0 snap-start overflow-hidden rounded-3xl border border-line-strong shadow-card',
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
            <>
              <div className="absolute inset-0" style={{ background: item.gradient }} aria-hidden />
              {/* abstract ceiling panel — LED line pattern */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.22]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.95) 1px, transparent 1px)',
                  backgroundSize: '100% 28px',
                  maskImage:
                    'linear-gradient(180deg, #000 0%, #000 50%, transparent 100%)',
                  WebkitMaskImage:
                    'linear-gradient(180deg, #000 0%, #000 50%, transparent 100%)',
                }}
              />
              {/* central LED strip */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-8 top-[18%] h-px"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.85) 50%, transparent 100%)',
                  boxShadow: '0 0 16px rgba(91,155,255,0.7)',
                }}
              />
            </>
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

        <div className="flex flex-1 flex-col gap-3 bg-bg-elevated/80 p-4 backdrop-blur-xl">
          <p className="text-[12px] font-semibold uppercase tracking-wider text-brand-accent-glow">
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
                  className="rounded-full border border-line-soft bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium text-ink-secondary"
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
