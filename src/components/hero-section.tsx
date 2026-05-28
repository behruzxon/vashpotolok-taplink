export function HeroSection() {
  return (
    <header className="relative pt-7 pb-3 text-center">
      <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-line-soft bg-bg-glass-strong px-3 py-1.5 backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-accent-glow opacity-75 motion-reduce:hidden" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-accent-glow" />
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-secondary">
          Qarshi · Qashqadaryo
        </span>
      </div>

      <div className="relative mx-auto mt-4 flex items-center justify-center gap-3">
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
        <h1 className="text-[32px] font-extrabold leading-[1.02] tracking-tight text-ink-primary sm:text-[40px]">
          <span className="block bg-gradient-to-br from-white via-white to-ink-secondary bg-clip-text text-transparent">
            VASH POTOLOK
          </span>
        </h1>
      </div>

      <p className="mt-2.5 text-[17px] font-semibold leading-tight text-ink-primary">
        Қашқадарё бўйлаб
        <br />
        <span className="bg-gradient-to-r from-brand-accent-glow to-brand-accent bg-clip-text text-transparent">
          натяжной потолок
        </span>
      </p>

      <p className="mx-auto mt-2 text-[12.5px] font-medium uppercase tracking-[0.18em] text-ink-secondary">
        ўлчов · дизайн · монтаж
      </p>

      {/* Showroom visual — abstract ceiling + LED + horizon */}
      <ShowroomPanel />

      <ul className="mx-auto mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-secondary">
        <li className="inline-flex items-center gap-1.5">
          <Dot /> Bepul maslahat
        </li>
        <li className="text-ink-muted/60">·</li>
        <li className="inline-flex items-center gap-1.5">
          <Dot /> Toza montaj
        </li>
        <li className="text-ink-muted/60">·</li>
        <li className="inline-flex items-center gap-1.5">
          <Dot /> Qarshi va viloyat
        </li>
      </ul>
    </header>
  )
}

function Dot() {
  return (
    <span
      aria-hidden
      className="h-1.5 w-1.5 rounded-full bg-brand-accent-glow shadow-[0_0_8px_rgba(91,155,255,0.9)]"
    />
  )
}

function ShowroomPanel() {
  return (
    <div
      aria-hidden
      className="relative mx-auto mt-4 h-[88px] w-full max-w-[320px] overflow-hidden rounded-2xl border border-line-strong"
      style={{
        background:
          'linear-gradient(180deg, #1A2752 0%, #121C3E 35%, #0C1430 70%, #0A0E1A 100%)',
      }}
    >
      {/* ceiling panel — top zone */}
      <span
        className="absolute inset-x-0 top-0 h-9"
        style={{
          background:
            'linear-gradient(180deg, rgba(91,155,255,0.22) 0%, rgba(91,155,255,0.08) 60%, transparent 100%)',
        }}
      />
      {/* ceiling grid lines */}
      <span
        className="absolute inset-x-4 top-1.5 h-7 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '100% 10px',
        }}
      />
      {/* LED line under ceiling */}
      <span
        className="absolute inset-x-8 top-9 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.95) 50%, transparent 100%)',
          boxShadow: '0 0 16px rgba(91,155,255,0.85)',
        }}
      />
      {/* secondary LED line (perimeter glow) */}
      <span
        className="absolute inset-x-16 top-[46px] h-px opacity-60"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(91,155,255,0.7) 50%, transparent 100%)',
          boxShadow: '0 0 10px rgba(91,155,255,0.5)',
        }}
      />
      {/* horizon — wall ↔ floor */}
      <span
        className="absolute inset-x-0 bottom-[26px] h-px opacity-60"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)',
        }}
      />
      {/* floor gradient */}
      <span
        className="absolute inset-x-0 bottom-0 h-7"
        style={{
          background:
            'linear-gradient(180deg, rgba(8,11,22,0.0) 0%, rgba(8,11,22,0.65) 100%)',
        }}
      />
      {/* corner light bloom */}
      <span
        className="absolute -right-6 top-2 h-20 w-20 rounded-full blur-2xl"
        style={{ background: 'rgba(91,155,255,0.25)' }}
      />
      {/* mini proof chip — top-left */}
      <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur-md">
        <span className="h-1 w-1 rounded-full bg-brand-accent-glow" />
        1 kunda montaj
      </span>
      {/* mini proof chip — bottom-right */}
      <span className="absolute bottom-2.5 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur-md">
        <span className="h-1 w-1 rounded-full bg-gold" />
        Bepul o‘lchov
      </span>
    </div>
  )
}
