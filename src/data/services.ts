export type ServiceIcon = 'ceiling' | 'led' | 'cornice' | 'lamp' | 'design'

export type Service = {
  id: string
  title: string
  subtitle?: string
  icon: ServiceIcon
  /** Mini status badge: "Top tanlov", "Premium", "Bepul", ... */
  badge?: string
  /** Featured service — section'da full-width premium card sifatida ko'rinadi. */
  featured?: boolean
}

export const services: Service[] = [
  {
    id: 'ceiling',
    title: 'Natijnoy potolok',
    subtitle: 'Mat, glyans va satin variantlar',
    icon: 'ceiling',
    badge: 'Top tanlov',
    featured: true,
  },
  {
    id: 'led',
    title: 'LED yoritish',
    subtitle: 'Shift bo‘ylab zamonaviy LED chiziqlar',
    icon: 'led',
    badge: 'Premium',
  },
  {
    id: 'cornice',
    title: 'Karniz',
    subtitle: 'Yashirin va ochiq karniz yechimlari',
    icon: 'cornice',
    badge: 'Interyer',
  },
  {
    id: 'lamp',
    title: 'Lyustra joyi',
    subtitle: 'Aniq va toza o‘rnatish nuqtasi',
    icon: 'lamp',
    badge: 'Aniq montaj',
  },
  {
    id: 'design',
    title: 'Dizayn maslahat',
    subtitle: 'Xonangizga mos bepul tavsiya',
    icon: 'design',
    badge: 'Bepul',
  },
]
