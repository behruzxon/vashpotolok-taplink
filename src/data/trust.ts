export type TrustIcon = 'shield' | 'sparkles' | 'check' | 'pin'

export type TrustItem = {
  id: string
  title: string
  description: string
  icon: TrustIcon
}

export const trust: TrustItem[] = [
  {
    id: 'clean',
    title: 'Toza montaj',
    description: 'Ish joyi tartibli, montajdan keyin toza topshiriladi.',
    icon: 'check',
  },
  {
    id: 'quality',
    title: 'Sifatli material',
    description: 'Chiroyli ko‘rinish va uzoq muddatli foydalanish uchun tanlangan material.',
    icon: 'sparkles',
  },
  {
    id: 'warranty',
    title: 'Kafolat',
    description: 'Ish sifati bo‘yicha mijozga aniq va tushunarli kafolat.',
    icon: 'shield',
  },
  {
    id: 'area',
    title: 'Viloyat bo‘ylab xizmat',
    description: 'Qarshi va Qashqadaryo hududlarida o‘lchov va montaj.',
    icon: 'pin',
  },
]
