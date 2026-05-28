export type TestimonialItem = {
  id: string
  quote: string
  location: string
  projectType: string
  areaM2?: number
  rating?: number
  customerLabel: string
}

/**
 * Mijoz fikrlari. **Fake ism ishlatma** — real mijoz ruxsati bo'lmasa,
 * `customerLabel` faqat xona turi + joy bo'lsin ("Qarshi · Zal").
 *
 * Real ism qo'shilsa: mijozdan yozma ruxsat (Telegram chat screenshot)
 * va `customerLabel` ga ko'chiriladi.
 *
 *   → docs/VIDEOS_AND_TESTIMONIALS_GUIDE.md §5
 */
export const testimonials: TestimonialItem[] = [
  {
    id: 'qarshi-zal-led',
    quote:
      'Zalimiz ancha yorug‘ va chiroyli bo‘lib qoldi. Montaj toza qilindi.',
    location: 'Qarshi',
    projectType: 'LED натяжной потолок',
    areaM2: 24,
    rating: 5,
    customerLabel: 'Qarshi · Zal',
  },
  {
    id: 'qashqadaryo-yotoqxona-matoviy',
    quote:
      'O‘lchovdan keyin narx tushunarli aytildi. Ish tartibli bajarildi.',
    location: 'Qashqadaryo',
    projectType: 'Matoviy потолок',
    areaM2: 18,
    rating: 5,
    customerLabel: 'Qashqadaryo · Yotoqxona',
  },
  {
    id: 'qarshi-oshxona-glyans',
    quote:
      'Oshxona uchun yorug‘ va toza ko‘rinish bo‘ldi. Maslahat yaxshi berildi.',
    location: 'Qarshi',
    projectType: 'Glyans потолок',
    areaM2: 14,
    rating: 5,
    customerLabel: 'Qarshi · Oshxona',
  },
]
