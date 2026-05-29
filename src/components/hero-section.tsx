export function HeroSection() {
  return (
    <header className="relative pt-7 pb-3 text-center">
      <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-line-soft bg-bg-surface px-3 py-1.5 shadow-soft">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-accent opacity-75 motion-reduce:hidden" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-accent" />
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-secondary">
          Qarshi · Qashqadaryo
        </span>
      </div>

      <div className="relative mx-auto mt-4 flex items-center justify-center gap-3">
        <span
          aria-hidden
          className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-accent to-brand-primary-700 shadow-[0_10px_28px_-8px_rgba(47,107,255,0.55)]"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-transparent opacity-60"
          />
          <span className="relative text-[16px] font-extrabold tracking-tight text-white">
            PX
          </span>
        </span>
        <h1 className="text-[32px] font-extrabold leading-[1.02] tracking-tight text-ink-primary sm:text-[40px]">
          <span className="block bg-gradient-to-br from-ink-primary via-brand-primary to-brand-accent bg-clip-text text-transparent">
            Potolok X
          </span>
        </h1>
      </div>

      <p className="mt-3 text-[17px] font-semibold leading-tight text-ink-primary">
        Qashqadaryo bo‘ylab
        <br />
        <span className="bg-gradient-to-r from-brand-accent to-brand-primary bg-clip-text text-transparent">
          natijnoy potolok
        </span>
      </p>

      <p className="mx-auto mt-2 text-[12.5px] font-medium uppercase tracking-[0.18em] text-ink-secondary">
        O‘lchov · Dizayn · Montaj
      </p>

      {/* Showroom visual — light premium interior */}
      <ShowroomPanel />

      <ul className="mx-auto mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-secondary">
        <li className="inline-flex items-center gap-1.5">
          <Dot /> Taxminiy hisob
        </li>
        <li className="text-ink-muted/60">·</li>
        <li className="inline-flex items-center gap-1.5">
          <Dot /> Toza montaj
        </li>
        <li className="text-ink-muted/60">·</li>
        <li className="inline-flex items-center gap-1.5">
          <Dot /> Telegram orqali maslahat
        </li>
      </ul>
    </header>
  )
}

function Dot() {
  return (
    <span
      aria-hidden
      className="h-1.5 w-1.5 rounded-full bg-brand-accent shadow-[0_0_8px_rgba(47,107,255,0.55)]"
    />
  )
}

function ShowroomPanel() {
  return (
    <div
      aria-hidden
      className="relative mx-auto mt-4 h-[92px] w-full max-w-[320px] overflow-hidden rounded-2xl border border-line-soft bg-bg-surface shadow-card"
    >
      {/* ceiling panel — bright top zone */}
      <span
        className="absolute inset-x-0 top-0 h-12"
        style={{
          background:
            'linear-gradient(180deg, #EFF6FF 0%, #FFFFFF 100%)',
        }}
      />
      {/* ceiling grid lines */}
      <span
        className="absolute inset-x-4 top-2 h-9 opacity-[0.6]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(29,78,216,0.10) 1px, transparent 1px)',
          backgroundSize: '100% 12px',
        }}
      />
      {/* main LED line — under ceiling */}
      <span
        className="absolute inset-x-8 top-11 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(47,107,255,0.85) 50%, transparent 100%)',
          boxShadow: '0 0 16px rgba(47,107,255,0.45)',
        }}
      />
      {/* perimeter accent LED */}
      <span
        className="absolute inset-x-16 top-[50px] h-px opacity-60"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(96,165,250,0.65) 50%, transparent 100%)',
          boxShadow: '0 0 10px rgba(96,165,250,0.35)',
        }}
      />
      {/* horizon — wall ↔ floor */}
      <span
        className="absolute inset-x-0 bottom-7 h-px opacity-40"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(15,23,42,0.18) 50%, transparent 100%)',
        }}
      />
      {/* soft floor shade */}
      <span
        className="absolute inset-x-0 bottom-0 h-7"
        style={{
          background:
            'linear-gradient(180deg, rgba(241,245,249,0) 0%, rgba(226,232,240,0.55) 100%)',
        }}
      />
      {/* corner light bloom */}
      <span
        className="absolute -right-4 top-1 h-20 w-20 rounded-full blur-2xl"
        style={{ background: 'rgba(96,165,250,0.30)' }}
      />
      {/* mini proof chip — top-left */}
      <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-bg-surface/95 px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.14em] text-ink-secondary shadow-soft">
        <span className="h-1 w-1 rounded-full bg-brand-accent" />
        1 kunda montaj
      </span>
      {/* mini proof chip — bottom-right */}
      <span className="absolute bottom-2.5 right-3 inline-flex items-center gap-1.5 rounded-full bg-bg-surface/95 px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.14em] text-ink-secondary shadow-soft">
        <span className="h-1 w-1 rounded-full bg-gold" />
        Bepul o‘lchov
      </span>
    </div>
  )
}
