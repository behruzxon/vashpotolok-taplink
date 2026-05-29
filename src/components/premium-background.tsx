export function PremiumBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg-base"
    >
      {/* base sky → off-white */}
      <div className="absolute inset-0 bg-grad-hero" />

      {/* subtle dot grid — premium interior texture */}
      <div
        className="absolute inset-0 opacity-[0.7]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(15,23,42,0.08) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          maskImage:
            'radial-gradient(72% 55% at 50% 0%, #000 0%, transparent 65%)',
          WebkitMaskImage:
            'radial-gradient(72% 55% at 50% 0%, #000 0%, transparent 65%)',
        }}
      />

      {/* very subtle ceiling-line pattern — hero zone hint */}
      <div
        className="absolute inset-x-0 top-0 h-[180px] opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(29,78,216,0.10) 1px, transparent 1px)',
          backgroundSize: '100% 28px',
          maskImage:
            'linear-gradient(180deg, #000 0%, #000 40%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(180deg, #000 0%, #000 40%, transparent 100%)',
        }}
      />

      {/* top accent strip — soft blue skylight */}
      <div
        className="absolute inset-x-0 top-0 h-px opacity-90"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(96,165,250,0) 10%, rgba(96,165,250,0.65) 50%, rgba(96,165,250,0) 90%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-32 opacity-80"
        style={{
          background:
            'radial-gradient(70% 100% at 50% 0%, rgba(96,165,250,0.40) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      {/* ambient halo */}
      <div className="absolute left-1/2 top-0 h-[60vh] w-[120vw] -translate-x-1/2 bg-grad-glow opacity-90 animate-glow-pulse motion-reduce:animate-none" />

      {/* gentle bottom fade to soft gray */}
      <div
        className="absolute inset-x-0 bottom-0 h-[40vh] opacity-70"
        style={{
          background:
            'radial-gradient(80% 60% at 50% 100%, rgba(226,232,240,0.65), transparent 70%)',
        }}
      />
    </div>
  )
}
