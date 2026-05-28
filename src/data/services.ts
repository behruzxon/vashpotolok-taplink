export type ServiceIcon = 'ceiling' | 'led' | 'cornice' | 'lamp' | 'design'

export type Service = {
  id: string
  title: string
  subtitle?: string
  icon: ServiceIcon
}

export const services: Service[] = [
  {
    id: 'ceiling',
    title: 'натяжной потолок',
    subtitle: 'Matt, glyans, satin',
    icon: 'ceiling',
  },
  {
    id: 'led',
    title: 'LED yoritish',
    subtitle: 'Zamonaviy yechim',
    icon: 'led',
  },
  {
    id: 'cornice',
    title: 'Karniz',
    subtitle: 'Yashirin va ochiq',
    icon: 'cornice',
  },
  {
    id: 'lamp',
    title: 'Lyustra joyi',
    subtitle: 'Toza o‘rnatish',
    icon: 'lamp',
  },
  {
    id: 'design',
    title: 'Dizayn maslahat',
    subtitle: 'Bepul',
    icon: 'design',
  },
]
