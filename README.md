# VashPotolok — Premium Mini-Landing

Qashqadaryo va Qarshi bo'ylab **натяжной потолок** xizmati uchun Instagram bio'da ishlatilishi mo'ljallangan premium mini-landing.

Bu **taplink emas** — bu mini sales funnel + 6-step Pro Calculator.

## Stack

- **Next.js 14** (App Router)
- **TypeScript** (strict + `noUncheckedIndexedAccess`)
- **Tailwind CSS** (custom design tokens)
- **No heavy deps** — CSS-only animations, native IntersectionObserver
- Server components by default, `'use client'` faqat kerakli joyda
- Dynamic OpenGraph image (`next/og`, edge runtime)

## Quick start

```bash
npm install
npm run dev
```

http://localhost:3000 ochiladi.

## Skriptlar

```bash
npm run dev         # development
npm run build       # production build
npm run start       # production server
npm run lint        # eslint
npm run typecheck   # tsc --noEmit
```

## Struktura

```
docs/                          → Project documentation (12+ docs)
src/
├── app/
│   ├── layout.tsx             → Root metadata, fonts, JSON-LD
│   ├── page.tsx               → Landing composition
│   ├── globals.css            → Tailwind + custom slider
│   ├── icon.svg               → Favicon (brand-blue VP monogram)
│   ├── opengraph-image.tsx    → Dynamic OG (1200×630, edge runtime)
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── hero-section.tsx
│   ├── main-cta-buttons.tsx
│   ├── price-estimate-card.tsx  → Pro Calculator orchestrator (6 step)
│   ├── services-grid.tsx
│   ├── trust-badges.tsx
│   ├── portfolio-preview.tsx
│   ├── process-steps.tsx
│   ├── sticky-bottom-cta.tsx
│   ├── footer-cta.tsx
│   ├── premium-background.tsx
│   ├── calculator/              → Pro Calculator sub-components (9 ta)
│   └── primitives/
├── data/
│   ├── links.ts               → Yagona linklar manbai
│   ├── services.ts
│   ├── portfolio.ts
│   ├── trust.ts
│   └── price-options.ts       → Narx konfiguratsiyasi (biznes egasi)
└── lib/
    ├── cn.ts
    ├── analytics.ts
    └── pro-price-estimate.ts  → Calculate, format, Telegram payload
```

## Narxlarni o'zgartirish (biznes egasi uchun)

Hammasi bitta faylda: `src/data/price-options.ts`. Backend yo'q.

```
1. price-options.ts ni oching
2. Kerakli pricePerM2Min/Max yoki priceMin/Max o'zgartiring
3. npm run typecheck && npm run build
4. Deploy
```

Batafsil qo'llanma: [`docs/PRO_CALCULATOR_SPEC.md`](./docs/PRO_CALCULATOR_SPEC.md) §8.

## Linklarni o'zgartirish

`src/data/links.ts` — bitta fayl. Telegram bot, telefon, Instagram — barchasi shu yerda.

## Docs

12+ ta hujjat `docs/` ichida. Asosiy:

| Doc | Maqsad |
|---|---|
| `PROJECT_VISION.md` | Maqsad, mijoz portreti, funnel mantiqi |
| `DESIGN_SYSTEM.md` | Ranglar, typography, premium effects |
| `CONTENT_STRATEGY.md` | Til qoidalari, CTA matnlari |
| `USER_FLOW.md` | Har bir CTA flow + operator skripti |
| `COMPONENT_ARCHITECTURE.md` | Component tree va contracts |
| `SEO_AND_ANALYTICS.md` | Metadata, JSON-LD, event taksonomiyasi |
| `PRO_CALCULATOR_SPEC.md` | Kalkulyator spec + real narxlarni sozlash |
| `TELEGRAM_BOT_INTEGRATION.md` | Bot kontrakt (payload parser) |
| `TELEGRAM_BOT_MESSAGES.md` | Bot welcome shabloni |
| `DEPLOY_CHECKLIST.md` | **Deploy qadamlari + smoke testlar** |
| `ROADMAP.md` | Phase 1 → Phase 7 |

## Environment

`.env.local` (optional, fallback `https://vashpotolok.uz`):

```
NEXT_PUBLIC_SITE_URL=https://vashpotolok.uz
```

Shablon: [`.env.example`](./.env.example).

## Deploy

### Vercel orqali (tavsiya)

1. GitHub repo'ni Vercel'ga ulang
2. Framework: **Next.js** (avtomatik aniqlanadi)
3. Build command: `npm run build` (default)
4. Output: default (Vercel `.next` ni o'zi handle qiladi)
5. **Environment Variables:**
   - `NEXT_PUBLIC_SITE_URL=https://vashpotolok.uz`
6. **Deploy** tugmasini bosing.
7. Build muvaffaqiyatli tugagach — preview URL ochib `/`, `/sitemap.xml`, `/robots.xml`, `/opengraph-image` ni tekshiring.
8. Custom domain (`vashpotolok.uz`) ulang: Project Settings → Domains.

### Manual check (post-deploy)

- [ ] `/` ochiladi va to'liq sahifa render bo'ladi
- [ ] `/sitemap.xml` to'g'ri URL'ni qaytaradi
- [ ] `/robots.txt` allow + sitemap pointer
- [ ] `/opengraph-image` PNG qaytaradi (yangi tab'da ochib ko'ring)
- [ ] `/icon.svg` brand favicon
- [ ] Pro Calculator 6 step ishlaydi → Result → Telegram CTA
- [ ] Telephone CTA (`tel:+998908866666`) telefonda dialer ochadi
- [ ] Instagram CTA yangi tab'da ochadi
- [ ] Mobile (iPhone Safari + Android Chrome) ko'rinishi to'g'ri

To'liq checklist: [`docs/DEPLOY_CHECKLIST.md`](./docs/DEPLOY_CHECKLIST.md).

### Instagram bio tavsiya

```
VASH POTOLOK | Qashqadaryo
Натяжной потолок · LED · Montaj
Narx hisoblash va buyurtma ↓
```

Bio'ga link: `https://vashpotolok.uz` (yoki Vercel preview URL).
