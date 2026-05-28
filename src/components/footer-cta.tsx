'use client'

import { GlassCard } from './primitives/glass-card'
import { track } from '@/lib/analytics'

type Props = {
  phone: string
  phoneDisplay: string
}

export function FooterCTA({ phone, phoneDisplay }: Props) {
  return (
    <footer className="pt-2">
      <GlassCard className="p-5 text-center">
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-accent-glow">
          Bepul maslahat
        </p>
        <h3 className="mt-2 text-[20px] font-bold leading-tight text-ink-primary">
          Bugun bepul maslahat oling
        </h3>
        <p className="mt-1 text-[12px] text-ink-secondary">
          Қашқадарё бўйлаб · ҳар куни 09:00–20:00
        </p>

        <a
          href={phone}
          onClick={() => track('click_call', { source: 'footer' })}
          aria-label={`Qo'ng'iroq qilish ${phoneDisplay}`}
          className="mx-auto mt-4 inline-flex min-h-[56px] items-center justify-center gap-2 rounded-2xl bg-grad-button-green px-5 text-[18px] font-extrabold tracking-wide text-white shadow-cta-green transition-transform active:scale-[0.98]"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
            <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.2 1.9Z"/>
          </svg>
          <span className="tabular-nums">{phoneDisplay}</span>
        </a>

        <p className="mt-5 text-[11px] text-ink-muted">
          © {new Date().getFullYear()} VashPotolok · Qarshi, Qashqadaryo
        </p>
      </GlassCard>
    </footer>
  )
}
