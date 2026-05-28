'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'
import { track } from '@/lib/analytics'
import { createTelegramBotLink } from '@/data/links'

type Props = {
  phone: string
}

const stickyBotLink = createTelegramBotLink('sticky')

export function StickyBottomCTA({ phone }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const threshold = Math.min(window.innerHeight * 0.25, 220)
      setVisible(window.scrollY > threshold)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={cn(
        'pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(env(safe-area-inset-bottom),12px)] pt-3 transition-all duration-500 ease-out',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0',
      )}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-bg-base via-bg-base/85 to-transparent"
      />
      <div className="pointer-events-auto relative flex w-full max-w-[480px] items-center gap-2 rounded-2xl border border-line-strong bg-bg-elevated/85 p-2 shadow-card backdrop-blur-2xl">
        <a
          href={stickyBotLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('click_telegram_bot', { source: 'sticky' })}
          className="group flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-xl bg-grad-button text-[14px] font-semibold text-white shadow-cta transition-transform active:scale-[0.98]"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
            <path d="M21.5 4.2 2.8 11.4c-1 .4-.9 1.8.1 2l4.8 1.4 1.8 5.5c.2.6 1 .8 1.4.3l2.7-3 5 3.7c.8.6 2 .2 2.2-.8l3.4-14.6c.3-1.1-.8-2-1.8-1.6Z"/>
          </svg>
          Telegram bot
        </a>

        <a
          href={phone}
          onClick={() => track('click_call', { source: 'sticky' })}
          aria-label="Qo‘ng‘iroq qilish"
          className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl bg-grad-button-green text-white shadow-cta-green transition-transform active:scale-[0.95]"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
            <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.2 1.9Z"/>
          </svg>
        </a>
      </div>
    </div>
  )
}
