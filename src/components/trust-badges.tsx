import type { TrustIcon, TrustItem } from '@/data/trust'
import { cn } from '@/lib/cn'

type Props = {
  items: TrustItem[]
}

function Icon({ name }: { name: TrustIcon }) {
  const common = {
    className: 'h-5 w-5',
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }
  switch (name) {
    case 'check':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M5 12l4 4 10-10" />
        </svg>
      )
    case 'sparkles':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3z" />
          <path d="M19 14l.9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14z" />
        </svg>
      )
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M12 3l8 3v6c0 5-3.4 8.5-8 9-4.6-.5-8-4-8-9V6l8-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      )
    case 'pin':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M12 21s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      )
    case 'compass':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m15.5 8.5-2.5 5-5 2.5 2.5-5 5-2.5z" />
        </svg>
      )
  }
}

export function TrustBadges({ items }: Props) {
  return (
    <section aria-labelledby="trust-title">
      <div className="mb-3 px-1">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-line-soft bg-bg-surface px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-secondary shadow-soft">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-accent shadow-[0_0_8px_rgba(47,107,255,0.65)]" />
          Ishonch
        </div>
        <h2 id="trust-title" className="mt-2 text-[20px] font-bold leading-tight text-ink-primary">
          Nega bizni tanlaysiz
        </h2>
        <p className="mt-1 text-[12px] text-ink-muted">
          Har bir buyurtma — sizning xotirjamligingiz uchun.
        </p>
      </div>

      <ul className="grid grid-cols-2 gap-2">
        {items.map((t, i) => {
          const isLastOdd = i === items.length - 1 && items.length % 2 === 1
          return (
            <li
              key={t.id}
              className={cn(
                'group relative isolate flex h-full flex-col gap-2 overflow-hidden rounded-2xl border border-line-soft bg-bg-surface p-3 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-card',
                isLastOdd && 'col-span-2 flex-row items-center',
              )}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-accent-soft opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 motion-reduce:hidden"
              />

              <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-accent-soft text-brand-accent ring-1 ring-brand-accent/15 transition-transform duration-300 group-hover:scale-[1.05]">
                <Icon name={t.icon} />
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-bold leading-tight text-ink-primary">
                  {t.title}
                </p>
                <p className="mt-0.5 text-[11px] leading-snug text-ink-secondary">
                  {t.description}
                </p>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
