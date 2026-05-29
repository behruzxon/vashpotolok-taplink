export function HeroSection() {
  return (
    <header className="relative pt-6 pb-2 text-center">
      {/* Location badge */}
      <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-line-soft bg-bg-surface px-3 py-1.5 shadow-soft">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-accent opacity-75 motion-reduce:hidden" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-accent" />
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-secondary">
          Qarshi · Qashqadaryo
        </span>
      </div>

      {/* Logo + wordmark — bigger, balanced */}
      <div className="relative mx-auto mt-4 flex items-center justify-center gap-3">
        <span className="relative flex h-[60px] w-[60px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-line-soft bg-bg-surface shadow-[0_10px_28px_-10px_rgba(15,23,42,0.22)] ring-1 ring-line-soft/50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/potolok-x-logo.jpg"
            alt="Potolok X logo"
            loading="eager"
            decoding="async"
            className="h-full w-full object-contain object-center"
          />
        </span>
        <h1 className="text-[34px] font-extrabold leading-[1.0] tracking-tight text-ink-primary sm:text-[42px]">
          <span className="block bg-gradient-to-br from-ink-primary via-brand-primary to-brand-accent bg-clip-text text-transparent">
            Potolok X
          </span>
        </h1>
      </div>

      {/* Main offer */}
      <p className="mx-auto mt-3 max-w-[340px] text-[19px] font-bold leading-[1.15] text-ink-primary sm:text-[22px]">
        Qashqadaryo bo‘ylab{' '}
        <span className="bg-gradient-to-r from-brand-accent to-brand-primary bg-clip-text text-transparent">
          natijnoy potolok xizmati
        </span>
      </p>

      <p className="mx-auto mt-2 max-w-[320px] text-[13.5px] leading-snug text-ink-secondary">
        Xonangiz uchun o‘lchov, dizayn va montaj — bir joyda.
      </p>

      {/* Microline accent */}
      <p className="mx-auto mt-3 inline-flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-brand-primary">
        <svg viewBox="0 0 24 24" className="h-3 w-3 text-brand-accent" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 2 4 7v6c0 5 3 8 8 9 5-1 8-4 8-9V7l-8-5z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
        Taxminiy narxni 1 daqiqada hisoblang
      </p>

      {/* Premium showroom card — taller, brighter, more contrast */}
      <ShowroomPanel />

      {/* Trust pills — 3 white chips with shadow */}
      <ul className="mx-auto mt-4 flex flex-wrap items-center justify-center gap-1.5">
        {[
          'Taxminiy hisob',
          'Toza montaj',
          'Telegram maslahat',
        ].map((label) => (
          <li
            key={label}
            className="inline-flex items-center gap-1.5 rounded-full border border-line-soft bg-bg-surface px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink-secondary shadow-soft"
          >
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-brand-accent shadow-[0_0_8px_rgba(47,107,255,0.6)]"
            />
            {label}
          </li>
        ))}
      </ul>
    </header>
  )
}

function ShowroomPanel() {
  return (
    <div
      aria-hidden
      className="relative mx-auto mt-5 h-[124px] w-full max-w-[340px] overflow-hidden rounded-3xl border border-line-strong bg-bg-surface shadow-[0_14px_38px_-14px_rgba(15,23,42,0.22),0_2px_8px_rgba(15,23,42,0.06)] ring-1 ring-brand-accent-soft"
    >
      {/* ceiling panel — bright top zone with subtle blue tint */}
      <span
        className="absolute inset-x-0 top-0 h-16"
        style={{
          background:
            'linear-gradient(180deg, #E0EAFF 0%, #F3F7FF 60%, #FFFFFF 100%)',
        }}
      />
      {/* ceiling grid lines — clearer */}
      <span
        className="absolute inset-x-5 top-2.5 h-12 opacity-90"
        style={{
          backgroundImage:
            'linear-gradient(rgba(29,78,216,0.18) 1px, transparent 1px)',
          backgroundSize: '100% 11px',
        }}
      />
      {/* main LED line — brighter, glowing */}
      <span
        className="absolute inset-x-10 top-[58px] h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(47,107,255,1) 50%, transparent 100%)',
          boxShadow: '0 0 20px rgba(47,107,255,0.65), 0 0 6px rgba(255,255,255,0.9)',
        }}
      />
      {/* secondary perimeter LED */}
      <span
        className="absolute inset-x-20 top-[68px] h-px opacity-75"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(96,165,250,0.85) 50%, transparent 100%)',
          boxShadow: '0 0 14px rgba(96,165,250,0.55)',
        }}
      />
      {/* horizon — wall ↔ floor — softer */}
      <span
        className="absolute inset-x-0 bottom-10 h-px opacity-50"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(15,23,42,0.25) 50%, transparent 100%)',
        }}
      />
      {/* soft floor depth */}
      <span
        className="absolute inset-x-0 bottom-0 h-10"
        style={{
          background:
            'linear-gradient(180deg, rgba(226,232,240,0) 0%, rgba(203,213,225,0.55) 100%)',
        }}
      />
      {/* corner light blooms — left + right */}
      <span
        className="absolute -left-6 top-2 h-24 w-24 rounded-full blur-2xl"
        style={{ background: 'rgba(96,165,250,0.32)' }}
      />
      <span
        className="absolute -right-6 top-2 h-24 w-24 rounded-full blur-2xl"
        style={{ background: 'rgba(47,107,255,0.22)' }}
      />
      {/* mini proof chip — top-left */}
      <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-bg-surface px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-ink-primary shadow-[0_4px_10px_rgba(15,23,42,0.10)] ring-1 ring-line-soft">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
        1 kunda montaj
      </span>
      {/* mini proof chip — bottom-right */}
      <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-bg-surface px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-ink-primary shadow-[0_4px_10px_rgba(15,23,42,0.10)] ring-1 ring-line-soft">
        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
        Bepul o‘lchov
      </span>
    </div>
  )
}
