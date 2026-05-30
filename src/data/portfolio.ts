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
    title: 'Zal uchun UV pechatli dizayn',
    location: 'Qarshi',
    areaM2: 24,
    serviceType: 'UV pechat + natijnoy potolok',
    result: 'Zal uchun yorqin va noodatiy ko‘rinish berdi.',
    image: '/portfolio/qarshi-zal-gulli.jpg',
    gradient:
      'radial-gradient(120% 80% at 30% 0%, #8FB3FF 0%, #2E4A9A 35%, #0E1428 90%)',
    tags: ['zal', 'uvpechat', 'premium'],
    featured: true,
  },
  {
    id: 'yotoq-matoviy-18',
    title: 'Xona uchun naqshli premium dizayn',
    location: 'Qashqadaryo',
    areaM2: 18,
    serviceType: 'Naqshli natijnoy potolok',
    result: 'Naqshli bezaklar xonaga hashamatli ko‘rinish berdi.',
    image: '/portfolio/qarshi-yotoqxona-odnotonniy.jpg',
    gradient:
      'linear-gradient(140deg, #1A2244 0%, #0A0E1A 55%, #2A3464 100%)',
    tags: ['naqsh', 'premium', 'xona'],
  },
  {
    id: 'oshxona-amaliy-14',
    title: 'Xona uchun gulli premium dizayn',
    location: 'Qarshi',
    areaM2: 14,
    serviceType: 'Gulli natijnoy potolok',
    result: 'Chiroyli gullar va bezaklar interyerga premium kayfiyat berdi.',
    image: '/portfolio/qarshi-oshxona-mramor.jpg',
    gradient:
      'radial-gradient(120% 80% at 80% 10%, #E9CE89 0%, #5C4422 35%, #0A0E1A 95%)',
    tags: ['gulli', 'premium', 'xona'],
  },
  {
    id: 'koridor-led-10',
    title: 'Koridor uchun gulli premium dizayn',
    location: 'Qarshi',
    areaM2: 10,
    serviceType: 'Gulli natijnoy potolok',
    result: 'Kichik joy ham gulli dizayn bilan ancha chiroyli ko‘rindi.',
    image: '/portfolio/qarshi-koridor-uv-pechat.jpg',
    gradient:
      'radial-gradient(120% 80% at 50% 0%, #B7CCFF 0%, #3A5BA8 35%, #0E1428 100%)',
    tags: ['koridor', 'gulli', 'premium'],
  },
]
