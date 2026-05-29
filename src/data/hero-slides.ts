export type HeroSlide = {
  id: string
  src: string
  alt: string
  badge: string
}

/**
 * Hero auto-slider slides (Phase Hero-3).
 *
 * Rasmlar `public/hero/slides/` ichida WebP formatda saqlanadi.
 * Yangi slide qo'shilsa: file ko'chiriladi, mass'iv ichiga yangi entry
 * yoziladi — slider avtomatik auto-rotate qiladi.
 */
export const heroSlides: HeroSlide[] = [
  {
    id: 'minimal-zal',
    src: '/hero/slides/minimal-zal.webp',
    alt: 'Potolok X minimal zal uchun natijnoy potolok dizayni',
    badge: 'MINIMAL ZAL',
  },
  {
    id: 'led-chiziqli-potolok',
    src: '/hero/slides/led-chiziqli-potolok.webp',
    alt: 'Potolok X LED chiziqli natijnoy potolok dizayni',
    badge: 'LED CHIZIQLI',
  },
  {
    id: 'mramor-premium-dizayn',
    src: '/hero/slides/mramor-premium-dizayn.webp',
    alt: 'Potolok X mramor premium natijnoy potolok dizayni',
    badge: 'MRAMOR DIZAYN',
  },
  {
    id: 'yotoqxona-minimal',
    src: '/hero/slides/yotoqxona-minimal.webp',
    alt: 'Potolok X yotoqxona uchun minimal natijnoy potolok dizayni',
    badge: 'YOTOQXONA',
  },
  {
    id: 'koridor-zamonaviy',
    src: '/hero/slides/koridor-zamonaviy.webp',
    alt: 'Potolok X koridor uchun zamonaviy natijnoy potolok dizayni',
    badge: 'KORIDOR',
  },
]
