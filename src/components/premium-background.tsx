export function PremiumBackground() {
  const particles = Array.from({ length: 9 }, (_, i) => i)
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg-base"
    >
      {/* base radial */}
      <div className="absolute inset-0 bg-grad-hero" />

      {/* subtle grid texture — luxury interior feel */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage:
            'radial-gradient(70% 50% at 50% 0%, #000 0%, transparent 70%)',
          WebkitMaskImage:
            'radial-gradient(70% 50% at 50% 0%, #000 0%, transparent 70%)',
        }}
      />

      {/* top LED line — premium ceiling vibe */}
      <div
        className="absolute inset-x-0 top-0 h-px opacity-90"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(91,155,255,0) 10%, rgba(91,155,255,0.65) 50%, rgba(91,155,255,0) 90%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-24 opacity-70"
        style={{
          background:
            'radial-gradient(70% 100% at 50% 0%, rgba(91,155,255,0.55) 0%, transparent 70%)',
          filter: 'blur(14px)',
        }}
      />

      {/* ceiling halo */}
      <div className="absolute left-1/2 top-0 h-[60vh] w-[120vw] -translate-x-1/2 bg-grad-glow opacity-90 animate-glow-pulse motion-reduce:animate-none" />

      {/* conic shimmer — slower, narrower */}
      <div
        className="absolute -left-1/2 top-[-40vh] h-[120vh] w-[200vw] opacity-[0.12] animate-spin-slow motion-reduce:animate-none"
        style={{
          background:
            'conic-gradient(from 90deg at 50% 50%, rgba(91,155,255,0) 0deg, rgba(91,155,255,0.5) 90deg, rgba(91,155,255,0) 180deg, rgba(217,184,114,0.3) 270deg, rgba(91,155,255,0) 360deg)',
          filter: 'blur(90px)',
        }}
      />

      {/* premium soft particles — fewer, slightly softer */}
      <div className="absolute inset-0">
        {particles.map((i) => {
          const left = (i * 53) % 100
          const size = 2 + ((i * 7) % 3)
          const duration = 60 + ((i * 11) % 40)
          const delay = (i * 4.1) % 30
          return (
            <span
              key={i}
              className="absolute block rounded-full bg-white/30 animate-float-up motion-reduce:hidden"
              style={{
                left: `${left}%`,
                bottom: '-10vh',
                width: `${size}px`,
                height: `${size}px`,
                animationDuration: `${duration}s`,
                animationDelay: `-${delay}s`,
                filter: 'blur(0.6px)',
              }}
            />
          )
        })}
      </div>

      {/* bottom soft fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-[60vh] opacity-90"
        style={{
          background:
            'radial-gradient(80% 60% at 50% 100%, rgba(10,14,26,0.95), transparent 70%)',
        }}
      />
    </div>
  )
}
