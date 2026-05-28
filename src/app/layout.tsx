import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { links } from '@/data/links'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vashpotolok.uz'

// JSON-LD telephone — `links.phone` `tel:+998908866666` formatida turadi.
// Schema.org `telephone` esa toza raqam talab qiladi.
const phoneRaw = links.phone.replace(/^tel:/, '')

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'VashPotolok — Qashqadaryoda натяжной потолок',
  description:
    'Qashqadaryo va Qarshi bo‘ylab zamonaviy натяжной потолок, LED yoritish, toza montaj va kafolatli xizmat. Telegram bot orqali 1 daqiqada narx hisoblang.',
  applicationName: 'VashPotolok',
  keywords: [
    'натяжной потолок',
    'натяжной потолок Қарши',
    'натяжной потолок Қашқадарё',
    'Qashqadaryo natyajnoy potolok',
    'Karshi natyajnoy potolok',
    'LED yoritish potolok',
    'VashPotolok',
  ],
  authors: [{ name: 'VashPotolok' }],
  creator: 'VashPotolok',
  alternates: { canonical: '/' },
  // `app/opengraph-image.tsx` avtomatik aniqlanadi — `openGraph.images`
  // shu fayldan generate bo'ladi (runtime, edge). Bu yerda faqat boshqa
  // OG metalarni belgilaymiz.
  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    alternateLocale: ['ru_RU'],
    url: SITE_URL,
    siteName: 'VashPotolok',
    title: 'VashPotolok — натяжной потолок Қашқадарё бўйлаб',
    description: 'Ўлчовдан монтажгача тайёр ечим. Toza montaj, kafolat, viloyat bo‘ylab xizmat.',
  },
  // Twitter ham `app/opengraph-image.tsx`'ni qabul qiladi (alternative:
  // `app/twitter-image.tsx` qo'shilsa, shu ishlatiladi). Hozircha OG bilan
  // bir xil rasm.
  twitter: {
    card: 'summary_large_image',
    title: 'VashPotolok — натяжной потолок Қашқадарё',
    description: 'Ўлчовдан монтажгача тайёр ечим. Telegram botda narx hisoblang.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  formatDetection: { telephone: true, email: false, address: false },
  // `app/icon.svg` avtomatik favicon sifatida ishlatiladi (Next.js conventional).
  // Browser tab'da rasm ko'rinadi. Hech qanday metadata.icons kerak emas.
}

export const viewport: Viewport = {
  themeColor: '#0A0E1A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'dark',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'VashPotolok',
  image: `${SITE_URL}/opengraph-image`,
  url: SITE_URL,
  telephone: `+${phoneRaw.replace(/^\+/, '')}`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Qarshi',
    addressRegion: 'Qashqadaryo',
    addressCountry: 'UZ',
  },
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Qashqadaryo viloyati' },
    { '@type': 'City', name: 'Qarshi' },
  ],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
    opens: '09:00',
    closes: '20:00',
  },
  sameAs: [links.telegramProfile, links.instagram],
  priceRange: '$$',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Натяжной потолок xizmatlari',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'натяжной потолок montaji' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'LED yoritish' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Karniz' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Lyustra joyi' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Dizayn maslahat' } },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" className={inter.variable}>
      <head>
        <link rel="dns-prefetch" href="https://t.me" />
        <link rel="dns-prefetch" href="https://instagram.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
