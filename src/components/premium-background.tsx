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
        className="absolute inset-0 opacity-[0.6]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(15,23,42,0.07) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage:
            'radial-gradient(70% 50% at 50% 0%, #000 0%, transparent 65%)',
          WebkitMaskImage:
            'radial-gradient(70% 50% at 50% 0%, #000 0%, transparent 65%)',
        }}
      />

      {/* top accent strip — soft blue skylight */}
      <div
        className="absolute inset-x-0 top-0 h-px opacity-80"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(96,165,250,0) 10%, rgba(96,165,250,0.55) 50%, rgba(96,165,250,0) 90%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-28 opacity-70"
        style={{
          background:
            'radial-gradient(70% 100% at 50% 0%, rgba(96,165,250,0.32) 0%, transparent 70%)',
          filter: 'blur(18px)',
        }}
      />

      {/* ambient halo */}
      <div className="absolute left-1/2 top-0 h-[55vh] w-[120vw] -translate-x-1/2 bg-grad-glow opacity-90 animate-glow-pulse motion-reduce:animate-none" />

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
