# VashPotolok — SEO & Analytics

## 1. HTML Metadata (Next.js `metadata` export)

`src/app/layout.tsx` ichidagi joriy metadata:

```ts
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vashpotolok.uz'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'VashPotolok — Qashqadaryoda natijnoy potolok',
  description:
    'Qashqadaryo va Qarshi bo‘ylab zamonaviy natijnoy potolok, LED yoritish, toza montaj va kafolatli xizmat. Telegram bot orqali 1 daqiqada narx hisoblang.',
  applicationName: 'VashPotolok',
  keywords: [
    'natijnoy potolok',
    'natijnoy potolok Qarshi',
    'natijnoy potolok Qashqadaryo',
    'Qashqadaryo natyajnoy potolok',
    'Karshi natyajnoy potolok',
    'LED yoritish potolok',
    'VashPotolok',
  ],
  authors: [{ name: 'VashPotolok' }],
  creator: 'VashPotolok',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    alternateLocale: ['ru_RU'],
    url: SITE_URL,
    siteName: 'VashPotolok',
    title: 'VashPotolok — natijnoy potolok Qashqadaryo bo‘ylab',
    description: 'O‘lchovdan montajgacha tayyor yechim. Toza montaj, kafolat, viloyat bo‘ylab xizmat.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VashPotolok — natijnoy potolok Qashqadaryo',
    description: 'O‘lchovdan montajgacha tayyor yechim. Telegram botda narx hisoblang.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  formatDetection: { telephone: true, email: false, address: false },
}
```

### Eslatmalar

- **`openGraph.images` qo'lda yozilmaydi.** `src/app/opengraph-image.tsx` (Next.js conventional, edge runtime, `next/og` `ImageResponse`) avtomatik OG image sifatida ulanadi. Twitter card ham shu rasmni qabul qiladi (`app/twitter-image.tsx` qo'shilsa o'sha ishlatiladi).
- **`metadata.icons` qo'lda yozilmaydi.** `src/app/icon.svg` (brand-blue VP monogram) Next.js conventional favicon sifatida avtomatik ulanadi.
- **`metadataBase`** `NEXT_PUBLIC_SITE_URL` env yoki `https://vashpotolok.uz` fallback. Sitemap, robots, dynamic OG image va canonical URL'lar shu base'dan derive bo'ladi.

## 2. OG image (dynamic)

`src/app/opengraph-image.tsx` — edge runtime, 1200×630 PNG'ni runtime'da generatsiya qiladi:

```ts
export const runtime = 'edge'
export const alt = 'VashPotolok — Qashqadaryoda natijnoy potolok'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
```

Brand-blue radial background, “VASH POTOLOK” heading (gradient text), “Qashqadaryo bo‘ylab natijnoy potolok” subtitle, va “Toza montaj · Sifatli material · Kafolat · LED yoritish” badge qatori.

### Instagram va Telegram preview

Instagram va Telegram ikkalasi ham OpenGraph'ni qabul qiladi:

- `og:title` — qisqa (60 belgidan kam) ✓
- `og:description` — 150 belgidan kam ✓
- `og:image` — `/opengraph-image` (1200×630 PNG, runtime) ✓
- `og:image:alt` — `metadata.openGraph` ichida emas, lekin `opengraph-image.tsx` `alt` export'i orqali ✓

## 3. Favicon

`src/app/icon.svg` — brand-blue VP monogram, gradient border. Next.js avtomatik `<link rel="icon">` sifatida ulaydi — `metadata.icons` qo'lda yozilmagan.

## 4. JSON-LD (Structured Data)

`src/app/layout.tsx` ichida `<script type="application/ld+json">` orqali inject qilinadi. Joriy shape:

```ts
const phoneRaw = links.phone.replace(/^tel:/, '')

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
    name: 'Natijnoy potolok xizmatlari',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'natijnoy potolok montaji' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'LED yoritish' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Karniz' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Lyustra joyi' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Dizayn maslahat' } },
    ],
  },
}
```

`image` `${SITE_URL}/opengraph-image` route'iga ishora qiladi — dynamic OG bilan bir xil rasm. `telephone` `data/links.ts` dagi `phone` field'idan derive bo'ladi (`tel:` prefix olib tashlanadi).

## 5. Performance (SEO factor)

Targetlar (Lighthouse mobile):

| Metric | Target |
|---|---|
| LCP | < 2.0s |
| CLS | < 0.05 |
| INP | < 200ms |
| TBT | < 200ms |
| Performance score | ≥ 95 |

Yutuq usullari:
- `next/font` (self-hosted, swap, subset: `latin` + `cyrillic`)
- Real rasm yo'q (Phase 2.5'da `next/image` bilan ulanadi) → hozircha 0 LCP rasm yuki
- Faqat `globals.css` (Tailwind tree-shake) → minimal CSS
- Heavy animation kutubxonalari yo'q (`framer-motion` ishlatmaymiz, CSS-only)
- Analytics — silent log (Phase 5'da real provider)
- `prefetch` Telegram va Instagram domenlariga (`<link rel="dns-prefetch">`)
- `preconnect` Google Fonts'ga

## 6. Sitemap & robots

```
src/app/sitemap.ts   → ['/'] (faqat asosiy sahifa)
src/app/robots.ts    → allow all + sitemap pointer + host
```

Ikkalasi ham `process.env.NEXT_PUBLIC_SITE_URL` (fallback `https://vashpotolok.uz`) bilan ishlaydi.

## 7. Telegram bot deep-link source tracking

Sahifadan **har bir Telegram bot CTA** o'z **source** etiketi bilan bot'ga uzatiladi:

```
https://t.me/vashpotolokbot?start=<source>
```

Yagona generator: `src/data/links.ts → createTelegramBotLink(source)`. Manual `t.me/...` URL ishlatish taqiqlangan.

`source` qiymatlari (current `TelegramSource` type):

| Source | Qaysi blokdan | Niyat |
|---|---|---|
| `hero`      | Hero ostidagi primary CTA | Eng issiq lead |
| `price`     | Pro Calculator result CTA tracking | Qiymat bilan qiziqqan (payload `pro_*` formatida) |
| `portfolio` | Portfolio cards va below  | Inspiratsiya bilan kelgan |
| `sticky`    | Sticky bottom CTA bar     | Skroll davomida kelgan |
| `footer`    | Footer phone (rezerv)     | Sahifa oxiriga yetgan |
| `services`  | Reserve — services grid (hozir CTA yo'q) | — |
| `trust`     | Reserve — trust badges (hozir CTA yo'q) | — |

Bot tomondagi welcome shabloni `source`'ga qarab tanlanadi — batafsil: [`TELEGRAM_BOT_INTEGRATION.md`](./TELEGRAM_BOT_INTEGRATION.md) §5.

## 8. Pro calculator payload attribution

Pro Calculator natijasidan keyin result CTA `?start=pro_<...>` payload yuboradi:

```
https://t.me/vashpotolokbot?start=pro_zal_24_led_qarshi_3a
```

Format: `pro_<room>_<area>_<ceiling>_<district>_<N>a`. Batafsil shartnoma: [`TELEGRAM_BOT_INTEGRATION.md`](./TELEGRAM_BOT_INTEGRATION.md) §2.4.

### End-to-end attribution

Funnel'ning har bosqichida bog'lanish saqlanadi:

```
Page view → pro_calculator_started
         → pro_calculator_step_changed (1→2, 2→3, …, 6→result)
         → pro_calculator_dimension_entered (Step 2 → 3 o'tishda)
         → pro_calculator_addon_changed (har quantity o'zgarishi)
         → pro_calculator_completed { roomTypeId, areaM2, ceilingTypeId, districtId, addonCount, totalMin, totalMax }
         → click_pro_calculator_telegram { payload, totalMin, totalMax }
                    ↓
              Telegram bot /start <payload>
                    ↓
              Bot: parse + summary + addon qayta tasdiqlash + lead saved
                    ↓
              Cross-reference: frontend `completed` event ↔ bot lead `payload`
```

Bu Phase 5'da real provider ulanganda funnel drop-off'larini aniq ko'rsatishga imkon beradi.

---

## 9. End-to-end attribution: frontend ↔ Telegram bot ↔ lead (Phase 4)

Phase 4'da rasmiylashtirilgan kontrakt:
- Frontend deep-link orqali bot'ga **payload** uzatadi.
- Bot payloadni parslaydi va **lead** yaratadi (Sheets/DB).
- Frontend event va bot lead — bir xil `payload` orqali bog'lanadi.

### Bog'lanish kaliti

| Tomon | Field | Misol |
|---|---|---|
| Frontend event | `click_pro_calculator_telegram.payload` | `pro_zal_24_led_qarshi_3a` |
| Telegram bot `/start` | `start` parameter | `pro_zal_24_led_qarshi_3a` |
| Lead capture | `payload` column | `pro_zal_24_led_qarshi_3a` |
| Lead capture | `telegram_user_id` | `123456789` |

### Join logic (Phase 5 ETL'da)

```sql
-- Pseudo: frontend event'lar (analytics provider) + bot lead'lar (Sheets/DB) ni join
SELECT
  e.timestamp AS click_ts,
  l.created_at AS lead_ts,
  e.payload,
  l.telegram_user_id,
  l.status,
  l.estimated_min,
  l.estimated_max
FROM frontend_events e
JOIN bot_leads l
  ON l.payload = e.payload
 AND l.created_at BETWEEN e.timestamp - INTERVAL '5 min'
                      AND e.timestamp + INTERVAL '30 min'
WHERE e.event_name = 'click_pro_calculator_telegram'
```

5–30 minutlik oyna — Telegram'ga o'tish va bot bilan birinchi xabar oraliği.

### Drop-off ko'rsatkichlari

```
1000 view
 └─ 250 pro_calculator_started     (25%)
    └─ 180 pro_calculator_completed (72% of started)
       └─ 120 click_pro_calculator_telegram (67%)
          └─  90 bot_lead_created   (75% Telegram'gacha yetdi)
             └─  35 status=contacted (39% operator yetib oldi)
                └─  12 status=measured
                   └─  6 status=closed_won
```

Har bosqichdagi drop-off — alohida optimizatsiya nuqtasi. Phase 6 (A/B) shu metrikalardan kelib chiqib o'tkaziladi.

### Bot tomonida hodisalar (Phase 4.5'da)

Bot ham analytics yuborishi mumkin (yoki Sheet log orqali):

| Bot event | Trigger | Shape |
|---|---|---|
| `bot_lead_created` | `/start <payload>` qabul qilindi | `{ payload, parsed_kind, user_id }` |
| `bot_lead_qualified` | Intake savol-javob to'liq (addon quantitylar tasdiqlangan) | `{ user_id, room, area, addons, ... }` |
| `bot_operator_assigned` | Operator chiqim notify | `{ lead_id, operator }` |
| `bot_lead_closed` | Status `closed_won` yoki `closed_lost` | `{ lead_id, won: boolean }` |

Bu eventlar frontend `click_*` eventlari bilan birga **butun funnel'ni** tashkil etadi.

---

## 10. Analytics — Event taksonomiyasi

`src/lib/analytics.ts` quyidagi event'larni track qiladi (joriy holat):

| Event | Trigger | Payload |
|---|---|---|
| `view_page` | Sahifa yuklanganda | `{ path }` |
| `click_telegram_bot` | Telegram bot CTA bosildi | `{ source: 'hero' \| 'price' \| 'portfolio' \| 'sticky' \| 'footer' }` |
| `click_call` | Phone CTA bosildi | `{ source: 'hero' \| 'sticky' \| 'footer' }` |
| `click_telegram_profile` | Telegram chat bosildi | `{ source: 'hero' }` |
| `click_instagram` | Instagram bosildi | `{ source: 'cta' \| 'portfolio' }` |
| `click_portfolio` | Portfolio item bosildi | `{ itemId }` |
| `click_price_estimate` | (legacy) | `{ area, estimate }` |
| `interact_price_slider` | (legacy) | `{ area }` |
| `scroll_depth` | 25/50/75/100% skroll | `{ percent }` |
| `pro_calculator_started` | Pro calc mount (bir marta) | `{ source: 'view' }` |
| `pro_calculator_step_changed` | Step navigatsiya | `{ from, to, direction }` |
| `pro_calculator_dimension_entered` | Step 2 → 3 o'tishda | `{ mode, lengthM?, widthM?, areaM2? }` |
| `pro_calculator_addon_changed` | Quantity control o'zgarishi | `{ id, qty, unit }` |
| `pro_calculator_completed` | Result ko'rsatilganda | `{ roomTypeId, areaM2, ceilingTypeId, districtId, addonCount, totalMin, totalMax }` |
| `click_pro_calculator_telegram` | Result CTA → bot deep-link | `{ payload, totalMin, totalMax }` |

> **Legacy event'lar** (`price_funnel_*`, `click_price_estimate_bot`) tipda saqlangan, lekin Pro Calculator Phase 3.5'da almashtirilganidan beri chaqirilmaydi. Phase 5 analytics provider ulashidan oldin tozalanishi mumkin.

### Adhoc (trackEvent generic)

| Event | Payload |
|---|---|
| `pro_room_selected` | `{ id }` |
| `pro_ceiling_selected` | `{ id }` |
| `pro_district_selected` | `{ id }` |

## 11. Analytics implementation (Phase 5)

Phase 1 — `src/lib/analytics.ts` faqat `console.debug` qiladi (silent in prod, dev'da log).

Phase 5 — provider qo'shiladi:
- **Plausible** (privacy-friendly, light) yoki
- **GA4** (free) yoki
- **Custom endpoint** (`POST /api/track`) — eng yengil, server log'larda saqlanadi

Provider'lar attribute qilinadi `process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER` orqali.

## 12. Privacy

- Cookie ishlatmaymiz (Phase 1).
- GDPR/PD: telefon raqami va Telegram username — boshqa joyda saqlanmaydi.
- Plausible / custom — cookieless.
- `Privacy-Policy` link footer'da (Phase 7).

## 13. Mahalliy SEO (Google Business Profile)

Sahifadan tashqari:
- GBP'da `VashPotolok` egasi sifatida `vashpotolok.uz`'ni link sifatida qo'shish
- Qarshi'da rasmiy manzil ko'rsatish
- Sahifa shu URL'ga ishora qiladi (JSON-LD `sameAs`)
