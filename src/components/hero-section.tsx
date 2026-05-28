export function HeroSection() {
  return (
    <header className="relative pt-10 pb-6 text-center">
      <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-line-soft bg-bg-glass-strong px-3 py-1.5 backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-accent-glow opacity-75 motion-reduce:hidden" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-accent-glow" />
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-secondary">
          Qarshi · Qashqadaryo
        </span>
      </div>

      <h1 className="mt-5 text-[34px] font-extrabold leading-[1.05] tracking-tight text-ink-primary sm:text-[40px]">
        <span className="block bg-gradient-to-br from-white via-white to-ink-secondary bg-clip-text text-transparent">
          VASH POTOLOK
        </span>
      </h1>

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
    </header>
  )
}
