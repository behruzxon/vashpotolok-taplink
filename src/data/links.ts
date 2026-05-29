export type Links = {
  telegramBot: string
  telegramProfile: string
  catalog: string
  instagram: string
  youtube: string
  phone: string
  phoneDisplay: string
}

const TELEGRAM_BOT_BASE = 'https://t.me/vashpotolokbot'

export type TelegramSource =
  | 'hero'
  | 'price'
  | 'portfolio'
  | 'sticky'
  | 'footer'
  | 'services'
  | 'trust'

/**
 * Telegram bot deep-link with `?start=<source>` attribution.
 * Bot tomonida `/start` payloadi orqali lead manbasi aniqlanadi.
 */
export function createTelegramBotLink(source?: TelegramSource | string): string {
  if (!source) return TELEGRAM_BOT_BASE
  return `${TELEGRAM_BOT_BASE}?start=${encodeURIComponent(source)}`
}

export const links: Links = {
  telegramBot: createTelegramBotLink('hero'),
  telegramProfile: 'https://t.me/vashpotolok',
  catalog: 'https://t.me/vashpotolokuz',
  instagram: 'https://www.instagram.com/potolok_x',
  youtube: 'https://www.youtube.com/@Behruzxonusta',
  phone: 'tel:+998908866666',
  phoneDisplay: '+998 90 886 66 66',
}
