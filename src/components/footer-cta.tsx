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
      <GlassCard glow className="relative overflow-hidden p-5 text-center">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-accent-soft blur-3xl opacity-80"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -left-16 -bottom-16 h-40 w-40 rounded-full bg-call/15 blur-3xl"
        />
        <div className="relative">
          <div className="mx-auto inline-flex items-center gap-1.5 rounded-full border border-brand-accent/30 bg-brand-accent-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-brand-accent-glow">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-accent-glow shadow-[0_0_8px_rgba(91,155,255,0.9)]" />
            Bepul maslahat
          </div>
          <h3 className="mt-3 text-[22px] font-extrabold leading-tight text-ink-primary">
            Bugun bepul maslahat oling
          </h3>
          <p className="mt-1.5 text-[12px] text-ink-secondary">
            Qashqadaryo bo‘ylab
            <span className="mx-1.5 text-ink-muted">·</span>
            har kuni 09:00–20:00
          </p>

          <a
            href={phone}
            onClick={() => track('click_call', { source: 'footer' })}
            aria-label={`Qo'ng'iroq qilish ${phoneDisplay}`}
            className="group mx-auto mt-5 inline-flex min-h-[58px] items-center justify-center gap-2.5 rounded-2xl bg-grad-button-green px-6 text-[18px] font-extrabold tracking-wide text-white shadow-cta-green transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-call focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.2 1.9Z"/>
              </svg>
            </span>
            <span className="tabular-nums">{phoneDisplay}</span>
          </a>

          <p className="mt-5 text-[11px] text-ink-muted">
            © {new Date().getFullYear()} VashPotolok · Qarshi, Qashqadaryo
          </p>
        </div>
      </GlassCard>
    </footer>
  )
}
