'use client'

import type { VideoItem } from '@/data/videos'
import { track } from '@/lib/analytics'
import { cn } from '@/lib/cn'

type Props = {
  items: VideoItem[]
  instagramLink?: string
}

export function VideoShowcase({ items, instagramLink }: Props) {
  if (items.length === 0) return null

  return (
    <section aria-labelledby="videos-title">
      <div className="mb-3 px-1">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-line-soft bg-bg-surface px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-secondary shadow-soft">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-accent shadow-[0_0_8px_rgba(47,107,255,0.65)]" />
          Video
        </div>
        <h2
          id="videos-title"
          className="mt-2 text-[20px] font-bold leading-tight text-ink-primary"
        >
          Video ishlarimiz
        </h2>
        <p className="mt-1 text-[12px] leading-snug text-ink-secondary">
          Montaj jarayoni va tayyor natijalarni qisqa videolarda ko‘ring.
        </p>
      </div>

      <div className="-mx-5 px-5">
        <ul
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 pr-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="list"
        >
          {items.map((item) => (
            <VideoCard key={item.id} item={item} />
          ))}
        </ul>
      </div>

      {instagramLink ? (
        <a
          href={instagramLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('click_instagram', { source: 'video' })}
          aria-label="Instagramda ko‘proq videolarni ko‘rish"
          className="mt-2 flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border border-line-soft bg-bg-surface px-4 py-3 text-[14px] font-semibold text-ink-primary shadow-soft transition-colors hover:bg-bg-base active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-brand-accent" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
          Instagramda ko‘proq videolarni ko‘rish
          <span aria-hidden className="text-brand-accent">→</span>
        </a>
      ) : null}
    </section>
  )
}

function VideoCard({ item }: { item: VideoItem }) {
  const isFeatured = item.featured === true
  const href = item.instagramUrl ?? item.videoUrl ?? '#'
  const hasLink = href !== '#'
  const destination: 'instagram' | 'video' = item.instagramUrl ? 'instagram' : 'video'

  return (
    <li
      className={cn(
        'group relative shrink-0 snap-start overflow-hidden rounded-3xl border border-line-soft bg-bg-surface shadow-card',
        isFeatured ? 'w-[82%]' : 'w-[70%]',
      )}
    >
      <article className="relative flex h-full flex-col">
        <div className={cn('relative overflow-hidden', isFeatured ? 'aspect-[4/3]' : 'aspect-[4/3.2]')}>
          {item.thumbnail ? (
            // Phase Trust-1+: real thumbnail kelganda next/image bilan almashtirish.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.thumbnail}
              alt={`${item.title} — ${item.location}`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <VideoThumbnailFallback />
          )}

          {/* shine on hover */}
          <span
            aria-hidden
            className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-shine motion-reduce:hidden"
          />

          {/* central play button */}
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/40 backdrop-blur-md transition-transform duration-300 group-hover:scale-110"
          >
            <span className="absolute inset-0 rounded-full" style={{ boxShadow: '0 0 28px rgba(91,155,255,0.55)' }} />
            <svg viewBox="0 0 24 24" className="relative ml-1 h-6 w-6 text-white" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>

          {/* Reels badge top-left */}
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/90 backdrop-blur-md">
            <svg viewBox="0 0 24 24" className="h-3 w-3 text-brand-accent-glow" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <path d="M3 7h18" />
              <path d="m10 11 5 3-5 3z" fill="currentColor" stroke="none" />
            </svg>
            Reels
          </span>

          {/* duration badge top-right */}
          {item.duration ? (
            <span className="absolute right-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-bold tabular-nums text-white backdrop-blur-md">
              {item.duration}
            </span>
          ) : null}

          {/* bottom fade + title */}
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
              <span className="text-white/40">·</span>
              <span>{item.roomType}</span>
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
            target={hasLink ? '_blank' : undefined}
            rel={hasLink ? 'noopener noreferrer' : undefined}
            aria-disabled={!hasLink}
            onClick={(e) => {
              if (!hasLink) {
                e.preventDefault()
                return
              }
              track('click_video', { id: item.id, destination })
              if (destination === 'instagram') {
                track('click_instagram', { source: 'video' })
              }
            }}
            aria-label={`Videoni ko‘rish — ${item.title}`}
            className={cn(
              'mt-auto flex min-h-[44px] items-center justify-center gap-2 rounded-xl text-[13px] font-semibold transition-transform active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base',
              hasLink
                ? 'bg-grad-button text-white shadow-cta'
                : 'cursor-not-allowed bg-line-soft text-ink-muted',
            )}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
            Videoni ko‘rish
          </a>
        </div>
      </article>
    </li>
  )
}

function VideoThumbnailFallback() {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 0%, #2E4595 0%, #121C3E 45%, #0A0E1A 95%)',
        }}
      />
      {/* ceiling panel */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[42%]"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 60%, transparent 100%)',
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
      {/* main LED strip */}
      <div
        aria-hidden
        className="absolute inset-x-6 top-[40%] h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.95) 50%, transparent 100%)',
          boxShadow: '0 0 22px rgba(91,155,255,0.85)',
        }}
      />
      {/* horizon */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-[70%] h-px opacity-50"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)',
        }}
      />
      {/* side bloom */}
      <div
        aria-hidden
        className="absolute -left-8 top-[20%] h-32 w-32 rounded-full blur-3xl"
        style={{ background: 'rgba(91,155,255,0.2)' }}
      />
      <div
        aria-hidden
        className="absolute -right-8 top-[20%] h-32 w-32 rounded-full blur-3xl"
        style={{ background: 'rgba(91,155,255,0.2)' }}
      />
    </>
  )
}
