# Potolok X — Component Architecture

> Phase Brand-1: VashPotolok → Potolok X. Dark navy → light premium. Token nomlari saqlandi (`bg-base`, `ink-primary`, ...), qiymatlar `tailwind.config.ts` ichida light theme'ga ko'chirildi.

## 1. Tree

```
app/
├── layout.tsx                  (RootLayout: fonts, metadata, theme)
├── page.tsx                    (Landing: composition only)
└── globals.css                 (tokens, base, utilities)

components/
├── premium-background.tsx      (ceiling glow + particles)
├── hero-section.tsx            (brand + title + subtitle)
├── main-cta-buttons.tsx        (Telegram bot / Phone / Telegram chat)
├── price-estimate-card.tsx     (slider + live price + CTA)
├── services-grid.tsx           (5 services with icons)
├── trust-badges.tsx            (4 trust badges, 2×2 grid)
├── portfolio-preview.tsx       (horizontal scroll cards)
├── video-showcase.tsx          (Phase Trust-1 — Reels horizontal scroll, Phase Bio-Ready: conditional render)
├── testimonials-section.tsx    (Phase Trust-1 — mijoz fikrlari, Phase Bio-Ready: real source flag)
├── faq-section.tsx             (Phase Bio-Ready — native details/summary accordion + bot CTA)
├── process-steps.tsx           (5-step timeline)
├── sticky-bottom-cta.tsx       (always-visible CTA bar)
├── footer-cta.tsx              (phone + caption)
└── primitives/
    ├── glass-card.tsx          (reusable glass surface)
    ├── cta-button.tsx          (variants: primary/secondary/tertiary/ghost)
    └── reveal-on-scroll.tsx    (IntersectionObserver wrapper)
```

## 2. Data layer

```
data/
├── links.ts            (all external URLs — single source of truth)
├── services.ts         (5 services array)
├── portfolio.ts        (placeholder portfolio items)
├── trust.ts            (5 trust badges — Phase UI-1)
├── videos.ts           (Phase Trust-1 — VideoItem array + hasRealVideoContent helper)
├── testimonials.ts     (Phase Trust-1 — TestimonialItem array + source flag + hasRealTestimonials)
├── faq.ts              (Phase Bio-Ready — FAQItem array)
└── price-options.ts    (Phase Calc-3 — RoomType / CeilingType, district olib tashlangan)

lib/
├── analytics.ts        (track() typed + trackEvent() adhoc)
├── pro-price-estimate.ts (Phase 3.5 — calculateProEstimate, parseDecimal, buildProTelegramPayload)
└── cn.ts               (className merger)

components/calculator/   (Phase Calc-3 — 4-step Pro calculator)
├── calculator-shell.tsx       (header + 4-segment progress + body + nav)
├── room-step.tsx              (Step 1 — custom SVG room icons)
├── size-step.tsx              (Step 2 — dimensions/area toggle)
├── ceiling-step.tsx           (Step 3 — 5 ceiling types with SVG pattern preview)
├── result-step.tsx            (Step 4 — premium invoice + CTA)
└── estimate-breakdown.tsx     (invoice line items)

Phase Calc-3 da olib tashlangan:
- district-step.tsx (tuman tanlash step yo'q — Qashqadaryo bo'yicha umumiy narx)

Phase Calc-2 da olib tashlangan:
- addons-step.tsx, quantity-control.tsx (Qo'shimcha ishlar step yo'q)
```

## 3. Component contracts

### `<PremiumBackground />`
- **Vazifa:** Fixed background — radial glow + animated particles.
- **Props:** yo'q (singleton).
- **DOM:** 1 fixed `div`, ichida `::before` (glow), `::after` (conic gradient), 12 ta absolute `span` (particles).
- **Perf:** GPU-only properties (`transform`, `opacity`). No `width`/`top` animations.

### `<HeroSection />`
- **Vazifa:** Brend bloki + title + subtitle.
- **Props:** yo'q (kontent fix).
- **Children:** brand badge (dot + VASH POTOLOK), H1, subtitle.

### `<MainCTAButtons />`
- **Vazifa:** 3 ta asosiy CTA tugma (Telegram bot, Phone, Telegram chat).
- **Props:**
  ```ts
  type Props = {
    links: Pick<Links, 'telegramBot' | 'phone' | 'telegramProfile'>
  }
  ```
- **Composition:** `<CtaButton variant="primary" />` × 3.
- **On click:** `analytics.track(...)` + native link follow.

### `<PriceEstimateCard />`  (Phase 3.5 — Pro 6-step calculator)

- **Vazifa:** 6 qadamli professional kalkulyator orchestrator + Result.
- **Props:** yo'q (self-contained).
- **State:**
  ```ts
  step: 1 | 2 | 3 | 4 | 5 | 6 | 'result'
  roomTypeId: string
  mode: 'dimensions' | 'area'
  lengthM, widthM: string                  // step 2 (dimensions)
  areaInput: string                        // step 2 (area)
  ceilingTypeId: string
  addonQuantities: Record<string, number>  // step 4
  districtId: string
  ```
- **Steps (CalculatorShell wrapper):**
  1. Room — 2×2 icon grid
  2. Size — toggle dimensions/area, decimal+comma inputs, live area & perimeter preview
  3. Ceiling — radio list + premium-level badge (standard/comfort/premium)
  4. Addons — 6 ta `QuantityControl`
  5. District — radio list + "Bepul" badge
  6. Confirm — summary preview + "Hisobni ko'rish"
  - Result — taxminiy diapazon + summary + invoice breakdown + Telegram CTA + "Qayta hisoblash"
- **Validation:** step 1 / 3 / 5 — tanlov shart; step 2 — area `[6, 80]`; step 6 — `result.valid`.
- **CTA:** Result'da `createTelegramBotLink(result.payload)` (`pro_*` format). Invalid bo'lsa `aria-disabled` + click `preventDefault`.
- **Analytics:** `pro_calculator_started` (mount), `pro_calculator_step_changed`, `pro_calculator_dimension_entered` (step 2→3), `pro_calculator_addon_changed`, `pro_calculator_completed`, `click_pro_calculator_telegram` + `click_telegram_bot`.

### Calculator sub-components

| Component | Vazifa |
|---|---|
| `CalculatorShell` | Header (progress + title), body (step-in animation), back/next nav |
| `RoomStep` | 2×2 room cards, single-select |
| `SizeStep` | Mode toggle + inputs + live preview (area, perimeter) |
| `CeilingStep` | Radio list + premium-level badge |
| `AddonsStep` | 6 ta `QuantityControl` |
| `QuantityControl` | `−/+` button + value + unit label, active glow |
| `DistrictStep` | Radio list + "Bepul" badge |
| `ResultStep` | Total range + summary + breakdown + CTA + restart |
| `EstimateBreakdown` | Invoice line items |

### `lib/pro-price-estimate.ts` contracts

```ts
type ProEstimateInput = {
  roomTypeId: string
  mode: 'dimensions' | 'area'
  lengthM?: number
  widthM?: number
  areaM2?: number
  ceilingTypeId: string
  addonQuantities: Record<string, number>
  districtId: string
}

type ProEstimateResult = {
  valid: boolean
  areaM2, perimeterM: number
  baseMin, baseMax: number
  addonsMin, addonsMax: number
  travelMin, travelMax: number
  totalMin, totalMax: number
  breakdown: BreakdownItem[]
  payload: string
}

calculateProEstimate(input): ProEstimateResult
parseDecimal(value): number              // "3,5" → 3.5, "" → NaN
formatSom(amount): string                // "1 050 000 so'm"
formatPriceRange(min, max): string
buildProTelegramPayload(input): string
defaultAddonQuantities(): Record<string, number>
totalActiveAddons(quantities): number
```

### Payload format (Phase 3.5)

```
pro_<roomTypeId>_<areaM2>_<ceilingTypeId>_<districtId>_<N>a
```

- `<N>` — qty > 0 bo'lgan addon soni (0..6).
- Cheklov: ≤ 60 belgi (har doim sig'adi).
- Misol: `pro_zal_24_led_qarshi_3a`.

Quantitylar payloadda yuborilmaydi — bot welcome'da tanlovlar qaytadan summary qilinadi.

**Legacy `price_*`** Phase 3'dan olib tashlandi. Bot kelajakda faqat `pro_*` qabul qiladi (bot Phase 4 docs'da yangilanishi kerak).

To'liq spec: [`PRO_CALCULATOR_SPEC.md`](./PRO_CALCULATOR_SPEC.md).

### `lib/analytics.ts`

- `track(name, payload)` — typed taksonomiya (ro'yxat fayl ichida).
- `trackEvent(name, payload?)` — adhoc, type-relaxed (eksperiment yorliqlari uchun).
- Productionda `console.debug` chiqmaydi. Phase 5'da real provider ulanadi.

---

## 4c. Stable ID kontraktlari (Phase 4 — Telegram bot rasmiy kontrakt)

`data/price-options.ts` ichidagi quyidagi ID'lar **rasmiy tashqi kontrakt** qismi va Telegram bot tomonida ham hardcoded sifatida turadi:

```ts
roomTypeId:    'zal' | 'yotoqxona' | 'oshxona' | 'koridor'
ceilingTypeId: 'matoviy' | 'glyans' | 'satin' | 'led' | 'premium'     // satin Phase 3.5
addonId:       'led-line' | 'karniz' | 'lyustra' | 'spot' | 'pipe' | 'complex-corner'   // pipe/complex-corner Phase 3.5
districtId:    'qarshi' | 'qashqadaryo' | 'far'                         // Phase 3.5
```

### ⚠️ Breaking change qoidasi

Bu ID'larning **har qanday o'zgarishi breaking change**'dir:

1. Frontend bot deep-link'da ushbu ID'larni yuboradi.
2. Bot ID'larni hardcoded whitelist sifatida saqlaydi.
3. Bot deploy'idan oldin ID o'zgartirilsa — eski payload kelganda bot uni `unknown` deb javob beradi va mijoz konteksti yo'qoladi.

### Migratsiya protokoli

ID o'zgarishi kerak bo'lsa (masalan `led-line` → `ledline`):

1. **Bot tomonida** — yangi va eski ID ikkalasini ham qabul qiladigan kod chiqariladi (yangi ID — primary, eskisi — alias).
2. **Bot deploy.**
3. **Frontend tomonida** — ID yangilanadi va deploy bo'ladi.
4. **30 kun kutiladi** (eski payload'lar oqimi to'xtashi uchun).
5. **Bot tomonida** — eski alias olib tashlanadi.

Sinxronizatsiya hujjati: [`docs/TELEGRAM_BOT_INTEGRATION.md`](./TELEGRAM_BOT_INTEGRATION.md) §3 va §10.

### Payload format va parser

Frontend ↔ bot payload formati uchun ham hujjat: yuqoridagi link. Hyphen ambiguity (`led-line` ichida `-` borligi) — naive parsing bilan ishlamaydi, **whitelist greedy match** kerak. Python referans implementatsiya: [`docs/examples/telegram_payload_parser.py`](./examples/telegram_payload_parser.py) (16/16 test PASS).

### `lib/pro-price-estimate.ts` reciprocity

Bot tomonida narx hisoblashi uchun `calculate_estimate` Python misli mavjud (parser fayl ichida). Frontend `pricePerM2Min/Max` va `baseMultiplier` qiymatlari o'zgarsa, bot tomonidagi nusxani **manual sync** qilish kerak (Phase 4.5'da `shared/price-options.json` yagona manba qilish rejada).

### `<ServicesGrid />`
- **Vazifa:** 5 ta xizmat (icon + nom).
- **Props:**
  ```ts
  type Props = { items: Service[] }
  ```
- **Layout:** 2-column grid mobile (oxirgi card full width).

### `<TrustBadges />`
- **Vazifa:** 4 ta ishonch badge.
- **Props:**
  ```ts
  type Props = { items: TrustItem[] }
  ```
- **Layout:** 2×2 grid.

### `<PortfolioPreview />`
- **Vazifa:** Horizontal scroll gradient cards.
- **Props:**
  ```ts
  type Props = { items: PortfolioItem[]; portfolioLink?: string }
  ```
- **Scroll:** `overflow-x-auto`, `scroll-snap-type: x mandatory`.
- **CTA:** Pastda "🖼 Hammasini ko'rish" (Instagram'ga).

### `<ProcessSteps />`
- **Vazifa:** 5-qadamli vertical timeline.
- **Props:** yo'q (kontent fix). Yoki kelajakda data-driven.

### `<StickyBottomCTA />`
- **Vazifa:** Fixed pastki CTA bar, 25% scroll'dan keyin reveal.
- **Props:**
  ```ts
  type Props = { botUrl: string; phone: string }
  ```
- **State:** `visible: boolean` — scrollY > 25% viewport bo'lganda true.

### `<FooterCTA />`
- **Vazifa:** Yakuniy phone CTA + caption.
- **Props:**
  ```ts
  type Props = { phone: string; phoneDisplay: string }
  ```

### Primitives

#### `<GlassCard />`
- **Props:** `as?: 'div' | 'section' | 'article'`, `className?: string`, `children`, `glow?: boolean`.
- **DOM:** glassmorphism + gradient border.

#### `<CtaButton />`
- **Props:**
  ```ts
  type Props = {
    href: string
    variant: 'primary' | 'secondary' | 'tertiary' | 'ghost'
    icon: ReactNode
    label: string
    sublabel?: string
    onClick?: () => void
    external?: boolean       // default true
    ariaLabel?: string
  }
  ```
- **DOM:** `<a>` (chunki barcha CTA — link).
- **Animations:** shine pass on hover, scale on tap.

#### `<RevealOnScroll />`
- **Props:** `children`, `delay?: number` (ms), `as?: ElementType`.
- **Behavior:** `IntersectionObserver`, opacity 0→1, translateY 16→0, 600ms.
- **A11y:** `prefers-reduced-motion: reduce` — darhol visible.

## 4. Data shapes

```ts
// data/links.ts
export type Links = {
  telegramBot: string
  telegramProfile: string
  instagram: string
  phone: string
  phoneDisplay: string
}

// data/services.ts
export type Service = {
  id: string
  title: string
  subtitle?: string
  icon: 'ceiling' | 'led' | 'cornice' | 'lamp' | 'design'
}

// data/portfolio.ts  (Phase 2 — kengaytirilgan)
export type PortfolioItem = {
  id: string
  title: string
  location: string         // "Qarshi", "Qashqadaryo"
  areaM2?: number          // 24 → ko'rsatiladi: "24 m²"
  serviceType: string      // "LED yoritish + natijnoy potolok"
  result: string           // 1 satrli natija matni
  image?: string           // /portfolio/zal-led-24.webp  (Phase 2.5)
  beforeImage?: string     // optional, before/after slayder uchun
  afterImage?: string      // optional, before/after slayder uchun
  gradient: string         // image yo'q bo'lsa fallback
  tags: string[]           // ["zal", "led", "premium"]
  featured?: boolean       // true bo'lsa card kengroq (78% vs 64%)
}

// data/trust.ts  (Phase 2 — description qo'shildi)
export type TrustItem = {
  id: string
  title: string
  description: string      // 1 satrli "why choose us" matni
  icon: 'shield' | 'sparkles' | 'check' | 'pin'
}
```

## 4b. `data/links.ts` — Telegram source helper (Phase 2)

```ts
export type TelegramSource =
  | 'hero' | 'price' | 'portfolio' | 'sticky' | 'footer' | 'services' | 'trust'

/**
 * Telegram bot deep-link with `?start=<source>` attribution.
 * Sahifadagi har bir bot CTA shu helper orqali link yaratadi —
 * manual `t.me/...` URL ishlatish taqiqlangan.
 */
export function createTelegramBotLink(source?: TelegramSource | string): string
```

Qoidalar:
- Yangi CTA qo'shilsa — source name'ni `TelegramSource` type'ga ham, `analytics.ts`'dagi `click_telegram_bot.payload.source`'ga ham qo'shing.
- `links.telegramBot` allaqachon `createTelegramBotLink('hero')` qaytaradi (default Hero CTA uchun).
- Boshqa joylar (sticky, portfolio, price, footer) — komponent ichida helper bilan o'z source'ini yaratadi.

## 5. Page composition (`app/page.tsx`)

```tsx
<>
  <PremiumBackground />
  <main className="container">
    <HeroSection />
    <RevealOnScroll><MainCTAButtons links={links} /></RevealOnScroll>
    <RevealOnScroll delay={80}><PriceEstimateCard botUrl={links.telegramBot} /></RevealOnScroll>
    <RevealOnScroll delay={160}><ServicesGrid items={services} /></RevealOnScroll>
    <RevealOnScroll delay={240}><TrustBadges items={trust} /></RevealOnScroll>
    <RevealOnScroll delay={320}><PortfolioPreview items={portfolio} portfolioLink={links.instagram} /></RevealOnScroll>
    <RevealOnScroll delay={400}><ProcessSteps /></RevealOnScroll>
    <FooterCTA phone={links.phone} phoneDisplay={links.phoneDisplay} />
  </main>
  <StickyBottomCTA botUrl={links.telegramBot} phone={links.phone} />
</>
```

## 6. Client vs Server components

| Component | Type | Sabab |
|---|---|---|
| `layout.tsx` | Server | Metadata, fonts |
| `page.tsx` | Server | Static composition |
| `PremiumBackground` | Client | (yoki Server — CSS-only) → **Server** |
| `HeroSection` | Server | Static |
| `MainCTAButtons` | Client | analytics.track() |
| `PriceEstimateCard` | Client | useState (slider) |
| `ServicesGrid` | Server | Static |
| `TrustBadges` | Server | Static |
| `PortfolioPreview` | Client | scroll snap interactions |
| `ProcessSteps` | Server | Static |
| `StickyBottomCTA` | Client | scroll listener |
| `FooterCTA` | Client | analytics.track() |
| `RevealOnScroll` | Client | IntersectionObserver |

## 7. Data-driven plan

Phase 1 — `data/*.ts` fayllar (compile-time).
Phase 7 — admin panel orqali CMS / JSON endpoint. `data/` shape o'zgarmaydi, faqat manba.
