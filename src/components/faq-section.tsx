'use client'

import type { FAQItem } from '@/data/faq'
import { createTelegramBotLink } from '@/data/links'
import { track } from '@/lib/analytics'

type Props = {
  items: FAQItem[]
}

const faqBotLink = createTelegramBotLink('trust')

export function FAQSection({ items }: Props) {
  if (items.length === 0) return null

  return (
    <section aria-labelledby="faq-title">
      <div className="mb-3 px-1">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-line-soft bg-bg-surface px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-secondary shadow-soft">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-accent shadow-[0_0_8px_rgba(47,107,255,0.65)]" />
          Savol — javob
        </div>
        <h2
          id="faq-title"
          className="mt-2 text-[20px] font-bold leading-tight text-ink-primary"
        >
          Tez-tez beriladigan savollar
        </h2>
        <p className="mt-1 text-[12px] leading-snug text-ink-secondary">
          Asosiy savollarga qisqa va aniq javoblar.
        </p>
      </div>

      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.id}>
            <details className="group relative overflow-hidden rounded-2xl border border-line-soft bg-bg-surface shadow-soft transition-all duration-300 open:border-line-strong open:shadow-card">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base">
                <span className="text-[13.5px] font-semibold leading-tight text-ink-primary">
                  {item.question}
                </span>
                <span
                  aria-hidden
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-bg-base text-ink-secondary transition-transform duration-300 group-open:rotate-180 group-open:bg-brand-accent-soft group-open:text-brand-primary"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <div className="border-t border-line-soft px-3.5 py-3">
                <p className="text-[12.5px] leading-relaxed text-ink-secondary">
                  {item.answer}
                </p>
              </div>
            </details>
          </li>
        ))}
      </ul>

      <a
        href={faqBotLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track('click_telegram_bot', { source: 'trust' })}
        aria-label="Savolingizni Telegramda yozish"
        className="mt-3 flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border border-line-soft bg-bg-surface px-4 py-3 text-[14px] font-semibold text-ink-primary shadow-soft transition-colors hover:bg-bg-base active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-brand-accent" fill="currentColor" aria-hidden>
          <path d="M21.5 4.2 2.8 11.4c-1 .4-.9 1.8.1 2l4.8 1.4 1.8 5.5c.2.6 1 .8 1.4.3l2.7-3 5 3.7c.8.6 2 .2 2.2-.8l3.4-14.6c.3-1.1-.8-2-1.8-1.6Z" />
        </svg>
        Savolingiz bormi? Telegramda yozing
        <span aria-hidden className="text-brand-accent">→</span>
      </a>
    </section>
  )
}
