export function HeroSection() {
  return (
    <header className="relative pt-8 pb-4 text-center">
      <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-line-soft bg-bg-glass-strong px-3 py-1.5 backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-accent-glow opacity-75 motion-reduce:hidden" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-accent-glow" />
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-secondary">
          Qarshi · Qashqadaryo
        </span>
      </div>

      <div className="relative mx-auto mt-5 flex items-center justify-center gap-3">
        <span
          aria-hidden
          className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-accent to-brand-primary-700 shadow-[0_8px_24px_-6px_rgba(61,126,255,0.55)] ring-1 ring-white/20"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-transparent opacity-60"
          />
          <span className="relative text-[15px] font-extrabold tracking-tight text-white">
            VP
          </span>
        </span>
        <h1 className="text-[34px] font-extrabold leading-[1.05] tracking-tight text-ink-primary sm:text-[40px]">
          <span className="block bg-gradient-to-br from-white via-white to-ink-secondary bg-clip-text text-transparent">
            VASH POTOLOK
          </span>
        </h1>
      </div>

      <p className="mt-3 text-[18px] font-semibold leading-tight text-ink-primary">
        Қашқадарё бўйлаб
        <br />
        <span className="bg-gradient-to-r from-brand-accent-glow to-brand-accent bg-clip-text text-transparent">
          натяжной потолок
        </span>
      </p>

      <p className="mx-auto mt-3 max-w-[300px] text-[14px] leading-snug text-ink-secondary">
        Ўлчовдан монтажгача тайёр ечим
      </p>

      <ul className="mx-auto mt-4 flex flex-wrap items-center justify-center gap-1.5">
        {[
          { label: 'Bepul o‘lchov', icon: 'ruler' as const },
          { label: 'Toza montaj', icon: 'spark' as const },
          { label: 'Kafolat shartlari', icon: 'shield' as const },
        ].map((chip) => (
          <li
            key={chip.label}
            className="inline-flex items-center gap-1.5 rounded-full border border-line-soft bg-white/[0.04] px-2.5 py-1 backdrop-blur-md"
          >
            <ChipIcon name={chip.icon} />
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-secondary">
              {chip.label}
            </span>
          </li>
        ))}
      </ul>
    </header>
  )
}

function ChipIcon({ name }: { name: 'ruler' | 'spark' | 'shield' }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    className: 'h-3 w-3 text-brand-accent-glow',
  }
  switch (name) {
    case 'ruler':
      return (
        <svg {...common}>
          <path d="M3 17 17 3l4 4L7 21z" />
          <path d="M7 13l2 2" />
          <path d="M11 9l2 2" />
          <path d="M15 5l2 2" />
        </svg>
      )
    case 'spark':
      return (
        <svg {...common}>
          <path d="M12 3v4" />
          <path d="M12 17v4" />
          <path d="M3 12h4" />
          <path d="M17 12h4" />
          <path d="m5.5 5.5 2.5 2.5" />
          <path d="m16 16 2.5 2.5" />
        </svg>
      )
    case 'shield':
      return (
        <svg {...common}>
          <path d="M12 3l8 3v6c0 5-3.4 8.5-8 9-4.6-.5-8-4-8-9V6l8-3z" />
        </svg>
      )
  }
}
