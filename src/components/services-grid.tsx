import type { Service, ServiceIcon } from '@/data/services'
import { cn } from '@/lib/cn'

type Props = {
  items: Service[]
}

function ServiceIconSVG({ name }: { name: ServiceIcon }) {
  const common = { className: 'h-5 w-5', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }
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

export function ServicesGrid({ items }: Props) {
  return (
    <section aria-labelledby="services-title">
      <div className="mb-3 flex items-center justify-between px-1">
        <h2 id="services-title" className="text-[18px] font-bold text-ink-primary">
          Nimani qilamiz
        </h2>
        <span className="text-[11px] font-medium uppercase tracking-wider text-ink-muted">
          5 yo‘nalish
        </span>
      </div>

      <ul className="grid grid-cols-2 gap-2.5">
        {items.map((s, i) => {
          const isLastOdd = i === items.length - 1 && items.length % 2 === 1
          return (
            <li
              key={s.id}
              className={cn(
                'relative overflow-hidden rounded-2xl border border-line-soft bg-bg-glass-strong p-3 backdrop-blur-md',
                isLastOdd && 'col-span-2',
              )}
            >
              <span aria-hidden className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-brand-accent-soft blur-2xl" />
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-accent-soft text-brand-accent-glow ring-1 ring-white/10">
                  <ServiceIconSVG name={s.icon} />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-semibold leading-tight text-ink-primary">
                    {s.title}
                  </p>
                  {s.subtitle ? (
                    <p className="truncate text-[12px] leading-tight text-ink-muted">
                      {s.subtitle}
                    </p>
                  ) : null}
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
