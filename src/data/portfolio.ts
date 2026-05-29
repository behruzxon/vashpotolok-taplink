export type PortfolioItem = {
  id: string
  title: string
  location: string
  areaM2?: number
  serviceType: string
  result: string
  image?: string
  beforeImage?: string
  afterImage?: string
  gradient: string
  tags: string[]
  featured?: boolean
}

/**
 * Phase Bio-Ready: agar hech qaysi item'da `image` field bo'lmasa,
 * Portfolio section avtomatik **hidden** bo'ladi. Real foto'lar
 * `public/portfolio/<id>.webp` ga qo'yiladi va item'lar `image: '/portfolio/<id>.webp'`
 * field bilan ulanadi.
 *
 *   → docs/PORTFOLIO_PHOTO_GUIDE.md
 */
export function hasRealPortfolioImages(items: PortfolioItem[]): boolean {
  return items.some((item) => typeof item.image === 'string' && item.image.length > 0)
}

export const portfolio: PortfolioItem[] = [
  {
    id: 'zal-led-24',
    title: 'Zal uchun LED натяжной потолок',
    location: 'Qarshi',
    areaM2: 24,
    serviceType: 'LED yoritish + натяжной потолок',
    result: 'Xona yorug‘ligi va ko‘rinishi premium darajaga chiqdi.',
    gradient:
      'radial-gradient(120% 80% at 30% 0%, #8FB3FF 0%, #2E4A9A 35%, #0E1428 90%)',
    tags: ['zal', 'led', 'premium'],
    featured: true,
  },
  {
    id: 'yotoq-matoviy-18',
    title: 'Yotoqxona uchun sokin dizayn',
    location: 'Qashqadaryo',
    areaM2: 18,
    serviceType: 'Matoviy натяжной потолок',
    result: 'Minimal, toza va sokin ko‘rinish.',
    gradient:
      'linear-gradient(140deg, #1A2244 0%, #0A0E1A 55%, #2A3464 100%)',
    tags: ['yotoqxona', 'matoviy'],
  },
  {
    id: 'oshxona-amaliy-14',
    title: 'Oshxona uchun amaliy yechim',
    location: 'Qarshi',
    areaM2: 14,
    serviceType: 'Oson tozalanadigan потолок',
    result: 'Oshxona uchun yorug‘ va toza muhit.',
    gradient:
      'radial-gradient(120% 80% at 80% 10%, #E9CE89 0%, #5C4422 35%, #0A0E1A 95%)',
    tags: ['oshxona', 'amaliy'],
  },
  {
    id: 'koridor-led-10',
    title: 'Koridor uchun zamonaviy chiziqli LED',
    location: 'Qarshi',
    areaM2: 10,
    serviceType: 'LED liniya + потолок',
    result: 'Kichik joy kengroq va zamonaviy ko‘rindi.',
    gradient:
      'radial-gradient(120% 80% at 50% 0%, #B7CCFF 0%, #3A5BA8 35%, #0E1428 100%)',
    tags: ['koridor', 'led'],
  },
]
