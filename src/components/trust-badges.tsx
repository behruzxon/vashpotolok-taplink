import type { TrustIcon, TrustItem } from '@/data/trust'

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
  }
}

export function TrustBadges({ items }: Props) {
  return (
    <section aria-labelledby="trust-title">
      <div className="mb-3 px-1">
        <h2 id="trust-title" className="text-[18px] font-bold text-ink-primary">
          Nega bizni tanlaysiz
        </h2>
        <p className="text-[12px] text-ink-muted">
          Har bir buyurtma — sizning xotirjamligingiz uchun.
        </p>
      </div>

      <ul className="grid grid-cols-2 gap-2.5">
        {items.map((t) => (
          <li
            key={t.id}
            className="group relative isolate flex flex-col gap-2 overflow-hidden rounded-2xl border border-line-soft bg-bg-glass-strong p-3.5 backdrop-blur-md transition-colors duration-300 hover:border-line-strong"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-accent-soft opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 motion-reduce:hidden"
            />

            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100"
            />

            <div className="flex items-center gap-2.5">
              <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-accent-glow/30 to-brand-accent/10 text-brand-accent-glow ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-105 group-hover:ring-white/20">
                <Icon name={t.icon} />
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:hidden"
                  style={{
                    boxShadow: '0 0 18px rgba(91, 155, 255, 0.55)',
                  }}
                />
              </span>
              <span className="text-[13px] font-bold leading-tight text-ink-primary">
                {t.title}
              </span>
            </div>

            <p className="text-[11.5px] leading-snug text-ink-secondary">
              {t.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
