export type TrustIcon = 'shield' | 'sparkles' | 'check' | 'pin' | 'compass' | 'award'

export type TrustItem = {
  id: string
  title: string
  description: string
  icon: TrustIcon
}

export const trust: TrustItem[] = [
  {
    id: 'experience',
    title: '6+ yillik tajriba',
    description:
      'Qashqadaryo bo‘ylab natijnoy potolok bo‘yicha tajriba va amaliy yechimlar.',
    icon: 'award',
  },
  {
    id: 'consult',
    title: 'Bepul maslahat',
    description: 'Qaysi material mosligini tushuntiramiz.',
    icon: 'compass',
  },
  {
    id: 'clean',
    title: 'Toza montaj',
    description: 'Ish joyi tartibli topshiriladi.',
    icon: 'check',
  },
  {
    id: 'material',
    title: 'Material tanlash',
    description: 'Mat, glyans, satin va LED variantlar.',
    icon: 'sparkles',
  },
  {
    id: 'area',
    title: 'Qashqadaryo bo‘ylab',
    description: 'Qarshi va viloyat hududlarida.',
    icon: 'pin',
  },
  {
    id: 'warranty',
    title: 'Kafolat shartlari',
    description: 'Ishdan oldin tushunarli kelishuv.',
    icon: 'shield',
  },
]
