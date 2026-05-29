'use client'

import { CtaButton } from './primitives/cta-button'
import { track } from '@/lib/analytics'
import type { Links } from '@/data/links'

type Props = {
  links: Pick<Links, 'telegramBot' | 'phone' | 'catalog' | 'instagram' | 'phoneDisplay'>
}

export function MainCTAButtons({ links }: Props) {
  return (
    <nav aria-label="Asosiy CTA" className="flex flex-col gap-2.5">
      <CtaButton
        href={links.telegramBot}
        variant="primary"
        label="Narxni hisoblash"
        sublabel="Telegram bot orqali 1 daqiqada"
        ariaLabel="Narxni Telegram bot orqali hisoblash"
        icon={
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
            <path d="M21.5 4.2 2.8 11.4c-1 .4-.9 1.8.1 2l4.8 1.4 1.8 5.5c.2.6 1 .8 1.4.3l2.7-3 5 3.7c.8.6 2 .2 2.2-.8l3.4-14.6c.3-1.1-.8-2-1.8-1.6Zm-3.4 4-7.4 6.7-.3 3.2-1.5-4.6 9.2-5.3Z"/>
          </svg>
        }
        onClick={() => track('click_telegram_bot', { source: 'hero' })}
      />

      <div className="grid grid-cols-2 gap-2.5">
        <CtaButton
          href={links.phone}
          variant="secondary"
          compact
          external={false}
          label="Qo‘ng‘iroq"
          ariaLabel={`Qo'ng'iroq qilish ${links.phoneDisplay}`}
          icon={
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
              <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.2 1.9Z"/>
            </svg>
          }
          onClick={() => track('click_call', { source: 'hero' })}
        />

        <CtaButton
          href={links.catalog}
          variant="tertiary"
          compact
          label="Katalog"
          ariaLabel="Katalogni Telegramda ochish"
          icon={
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
              <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
              <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
              <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" />
            </svg>
          }
          onClick={() => track('click_catalog', { source: 'hero' })}
        />
      </div>

      <CtaButton
        href={links.instagram}
        variant="ghost"
        compact
        label="Instagram · Real ishlar"
        ariaLabel="Instagram profil"
        icon={
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
        }
        onClick={() => track('click_instagram', { source: 'cta' })}
      />
    </nav>
  )
}
