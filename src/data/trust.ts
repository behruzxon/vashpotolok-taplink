export type TrustIcon = 'shield' | 'sparkles' | 'check' | 'pin' | 'compass'

export type TrustItem = {
  id: string
  title: string
  description: string
  icon: TrustIcon
}

export const trust: TrustItem[] = [
  {
    id: 'consult',
    title: 'Bepul maslahat',
    description: 'Xonangizga mos variantni tushuntirib beramiz.',
    icon: 'compass',
  },
  {
    id: 'clean',
    title: 'Toza montaj',
    description: 'Ish joyi tartibli, montajdan keyin toza topshiriladi.',
    icon: 'check',
  },
  {
    id: 'material',
    title: 'Material tanlash',
    description: 'Mat, glyans, satin va LED yechimlar bo‘yicha yo‘l ko‘rsatamiz.',
    icon: 'sparkles',
  },
  {
    id: 'area',
    title: 'Qashqadaryo bo‘ylab',
    description: 'Qarshi va viloyat hududlarida chiqish imkoniyati.',
    icon: 'pin',
  },
  {
    id: 'warranty',
    title: 'Kafolat shartlari',
    description: 'Ish sifati bo‘yicha tushunarli kafolat shartlari.',
    icon: 'shield',
  },
]
