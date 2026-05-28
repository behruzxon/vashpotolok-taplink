export function PremiumBackground() {
  const particles = Array.from({ length: 14 }, (_, i) => i)
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg-base"
    >
      <div className="absolute inset-0 bg-grad-hero" />

      <div className="absolute left-1/2 top-0 h-[60vh] w-[120vw] -translate-x-1/2 bg-grad-glow opacity-90 animate-glow-pulse motion-reduce:animate-none" />

      <div
        className="absolute -left-1/2 top-[-40vh] h-[120vh] w-[200vw] opacity-[0.18] animate-spin-slow motion-reduce:animate-none"
        style={{
          background:
            'conic-gradient(from 90deg at 50% 50%, rgba(91,155,255,0) 0deg, rgba(91,155,255,0.6) 90deg, rgba(91,155,255,0) 180deg, rgba(217,184,114,0.4) 270deg, rgba(91,155,255,0) 360deg)',
          filter: 'blur(80px)',
        }}
      />

      <div className="absolute inset-0">
        {particles.map((i) => {
          const left = (i * 53) % 100
          const size = 2 + ((i * 7) % 4)
          const duration = 50 + ((i * 11) % 40)
          const delay = (i * 3.7) % 30
          return (
            <span
              key={i}
              className="absolute block rounded-full bg-white/40 animate-float-up motion-reduce:hidden"
              style={{
                left: `${left}%`,
                bottom: '-10vh',
                width: `${size}px`,
                height: `${size}px`,
                animationDuration: `${duration}s`,
                animationDelay: `-${delay}s`,
                filter: 'blur(0.5px)',
              }}
            />
          )
        })}
      </div>

      <div
        className="absolute inset-x-0 bottom-0 h-[60vh] opacity-80"
        style={{
          background:
            'radial-gradient(80% 60% at 50% 100%, rgba(10,14,26,0.95), transparent 70%)',
        }}
      />
    </div>
  )
}
