export type TestimonialItem = {
  id: string
  quote: string
  location: string
  projectType: string
  areaM2?: number
  rating?: number
  customerLabel: string
  /**
   * Phase Bio-Ready: `'real'` faqat mijozdan yozma ruxsat olingan va
   * matn so'zma-so'z ko'chirilgan fikrlar uchun. `'sample'` — placeholder
   * matn. Agar massivda hech qaysisi `'real'` bo'lmasa, TestimonialsSection
   * butun section'i **hidden** bo'ladi (`hasRealTestimonials` orqali).
   */
  source?: 'real' | 'sample'
}

/**
 * Mijoz fikrlari. **Fake ism ishlatma** — real mijoz ruxsati bo'lmasa,
 * `customerLabel` faqat xona turi + joy bo'lsin ("Qarshi · Zal").
 *
 * Joriy 3 ta item — sample (`source: 'sample'`). Real fikr kelgach
 * `source: 'real'` qilib belgilanadi va Telegram chat screenshot
 * saqlanadi.
 *
 *   → docs/VIDEOS_AND_TESTIMONIALS_GUIDE.md §5
 */
export const testimonials: TestimonialItem[] = [
  {
    id: 'qarshi-zal-led',
    quote:
      'Zalimiz ancha yorug‘ va chiroyli bo‘lib qoldi. Montaj toza qilindi.',
    location: 'Qarshi',
    projectType: 'LED natijnoy potolok',
    areaM2: 24,
    rating: 5,
    customerLabel: 'Qarshi · Zal',
    source: 'sample',
  },
  {
    id: 'qashqadaryo-yotoqxona-matoviy',
    quote:
      'O‘lchovdan keyin narx tushunarli aytildi. Ish tartibli bajarildi.',
    location: 'Qashqadaryo',
    projectType: 'Matoviy potolok',
    areaM2: 18,
    rating: 5,
    customerLabel: 'Qashqadaryo · Yotoqxona',
    source: 'sample',
  },
  {
    id: 'qarshi-oshxona-glyans',
    quote:
      'Oshxona uchun yorug‘ va toza ko‘rinish bo‘ldi. Maslahat yaxshi berildi.',
    location: 'Qarshi',
    projectType: 'Glyans potolok',
    areaM2: 14,
    rating: 5,
    customerLabel: 'Qarshi · Oshxona',
    source: 'sample',
  },
]

export function hasRealTestimonials(items: TestimonialItem[]): boolean {
  return items.some((t) => t.source === 'real')
}
