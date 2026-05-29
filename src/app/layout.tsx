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
  title: 'PotolX — Qashqadaryoda натяжной потолок',
  description:
    'PotolX — Qashqadaryo va Qarshi bo‘ylab zamonaviy натяжной потолок, premium interior dizayn, toza montaj va kafolat shartlari. Telegram bot orqali 1 daqiqada narx hisoblang.',
  applicationName: 'PotolX',
  keywords: [
    'PotolX',
    'натяжной потолок',
    'натяжной потолок Қарши',
    'натяжной потолок Қашқадарё',
    'Qashqadaryo natyajnoy potolok',
    'Karshi natyajnoy potolok',
    'LED yoritish potolok',
    'premium interior Qashqadaryo',
  ],
  authors: [{ name: 'PotolX' }],
  creator: 'PotolX',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    alternateLocale: ['ru_RU'],
    url: SITE_URL,
    siteName: 'PotolX',
    title: 'PotolX — натяжной потолок Qashqadaryo bo‘ylab',
    description: 'O‘lchov · Dizayn · Montaj. Premium interior studio Qashqadaryo bo‘ylab.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PotolX — натяжной потолок Qashqadaryo',
    description: 'O‘lchov · Dizayn · Montaj. Telegram botda narx hisoblang.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  formatDetection: { telephone: true, email: false, address: false },
}

export const viewport: Viewport = {
  themeColor: '#F5F7FB',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'light',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'PotolX',
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
