export type FAQItem = {
  id: string
  question: string
  answer: string
}

/**
 * FAQ matnlari xavfsiz wording bilan yozilgan — yolg'on muddat, raqam
 * yoki “100% kafolat” da'vosi yo'q. Operator/usta tomondan aniq tafsilot
 * mijozga botda yoki qo'ng'iroqda yetkaziladi.
 *
 *   → docs/CONTENT_STRATEGY.md
 */
export const faq: FAQItem[] = [
  {
    id: 'olchov-bepulmi',
    question: 'O‘lchov bepulmi?',
    answer:
      'Hudud va buyurtma shartlariga qarab tushuntiriladi. Telegram orqali yozsangiz, operator aniq aytadi.',
  },
  {
    id: 'narx-nimaga-qarab',
    question: 'Narx nimaga qarab o‘zgaradi?',
    answer:
      'Maydon, tanlangan potolok turi, xona holati va montaj murakkabligiga qarab farq qiladi.',
  },
  {
    id: 'qashqadaryo-xizmat',
    question: 'Qashqadaryo bo‘ylab xizmat qilasizlarmi?',
    answer:
      'Ha, Qarshi va Qashqadaryo hududlari bo‘yicha murojaatlarni qabul qilamiz.',
  },
  {
    id: 'montaj-vaqti',
    question: 'Montaj qancha vaqt oladi?',
    answer:
      'Ko‘p hollarda xona hajmi va ish murakkabligiga qarab kelishiladi. Operator sizga aniqroq yo‘l ko‘rsatadi.',
  },
  {
    id: 'kafolat',
    question: 'Kafolat bormi?',
    answer:
      'Ish boshlanishidan oldin material va montaj bo‘yicha shartlar tushunarli qilib aytiladi.',
  },
  {
    id: 'dizayn-yordam',
    question: 'Rasm yoki dizayn tanlashda yordam berasizlarmi?',
    answer:
      'Ha, xona uslubiga mos variant tanlash bo‘yicha maslahat beramiz.',
  },
]
