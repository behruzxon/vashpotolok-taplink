# VashPotolok — Roadmap

## Phase 1 — Premium static landing  ✅

- Next.js 14 (App Router) + TypeScript + Tailwind asosida.
- Barcha komponentlar mavjud: Hero, MainCTA, PriceEstimate, Services, Trust, Portfolio, Process, Sticky CTA, Footer.
- Linklar `data/links.ts` ichida.
- Premium effects: ceiling glow, particles, shine, reveal animations.
- SEO metadata + OpenGraph + JSON-LD.
- `analytics.ts` skeleton (silent log).
- Mobile-first, ≥ 95 Lighthouse target.

**Deliverable:** statik premium mini-landing — production-ready.

---

## Phase 2 — Sales-funnel polish (portfolio + trust + source tracking)  ✅ (current)

Real fotosuratlar hali yo'q bo'lsa-da, sahifa "ishonchli mini-sales-funnel" darajasiga ko'tarildi.

### Bajarilgani:

- **PortfolioItem** struktura kengaytirildi: `location`, `areaM2`, `serviceType`, `result`, `tags`, `featured`, va `image` / `beforeImage` / `afterImage` (optional). Rasm yo'q bo'lganda gradient placeholder ko'rsatiladi.
- **PortfolioPreview** premium project cards: header zonasi gradient + glass overlay + shine, location pin, m² badge, "Ish namunasi" chip, serviceType (brand accent), result matni, tags chip'lar, va alohida **"Shunga o'xshash narx hisoblatish"** CTA — har bir card ostida (Telegram bot, source=`portfolio`).
- **Featured card** kengroq (78%), boshqalar 64% snap'da.
- **TrustBadges** "Nega bizni tanlaysiz" formati: title + 1 satrli description, hover'da glow + icon ring + scale micro-animation.
- **PriceEstimateCard** taxminiy **range** ko'rsatadi (`low → high`), disclaimer matni qo'shildi ("Aniq narx xona holati, yoritish va materialga qarab belgilanadi"), CTA `createTelegramBotLink('price')` orqali.
- **Telegram source attribution**: `createTelegramBotLink(source)` helper, har bir CTA o'z source'i bilan bot'ga deep-link uzatadi (`hero`, `price`, `portfolio`, `sticky`, `footer`).
- **Analytics event** taksonomiyasi `portfolio` source bilan kengaytirildi.
- Real rasmlar uchun zamin tayyor — `image` field ishlatilganda gradient placeholder o'rniga `<img>` chiqadi (next/image keyingi qadamda).
- Build statik (`○`), bundle hajmi minimal o'sdi.

**Deliverable:** sales-funnel ko'rinishida ishonchli portfolio + trust + per-CTA attribution.

---

## Phase 2.5 — Real fotosuratlar (Phase 2 davomi, mini-iteratsiya)

- `data/portfolio.ts` da `image: "/portfolio/zal-led-24.webp"` to'ldiriladi.
- `public/portfolio/` papkasiga 4–6 ta real foto (WebP, 800×600).
- `next/image` integratsiyasi (`<Image>` + `priority` faqat featured uchun).
- Modal/lightbox: card bosilganda full-screen rasm (CSS-only `<dialog>` yoki kichik client komponent).
- Optional: `beforeImage` / `afterImage` to'plansa — slayder.

**Deliverable:** real social proof.

---

## Phase 3 — Multi-step price funnel  ✅

Mijoz hozir mini-funnel orqali o'tadi va botga **tayyor payload** bilan boradi.

### Bajarilgani:

- **`src/data/price-options.ts`** — yangi fayl: `RoomType`, `CeilingType`, `AddonOption` (4 + 4 + 4 ta opsiya). Hammasi data-driven, narxlar `pricePerM2Min/Max` va `estimatedMin/Max` shaklida. Kelajakda admin panel `O‘zgartirish` nuqtasi shu fayl.
- **`src/lib/price-estimate.ts`** — yangi fayl:
  - `calculateEstimate(input)` — `min`/`max` so‘mga yaxlit (1000ga).
  - `formatPriceRange(min, max)` — `Intl.NumberFormat('uz-UZ')` bilan.
  - `buildTelegramPricePayload(input)` — Telegram bot `?start=` payload (uzun forma `≤60 belgi`; aks holda qisqartirilgan `price_<room>_<area>_<ceiling>_<N>a`).
- **`PriceEstimateCard`** to'liq qayta yozildi — 4 qadam + Final summary:
  - Step 1 (Room): 2×2 ikona-card grid, single select.
  - Step 2 (Area): −/+ buttonlar + slider + katta tabular son.
  - Step 3 (Ceiling): radio-style list, hint matn bilan.
  - Step 4 (Addons): multi-select checkbox list.
  - Final: range + summary (xona/maydon/potolok/addons) + disclaimer + bot CTA + "Tanlovni o‘zgartirish".
  - Progress: `1/4 … 4/4` + 4 qatorli sline indicator (current = glow gradient).
  - Step transition: `animate-step-in` (320ms cubic-bezier).
  - Back/Next bottom navigation, validation (step 1, 3 — option talab qiladi).
- **Analytics taksonomiyasi kengaytirildi:**
  - `price_funnel_started`, `price_funnel_step_changed`, `price_funnel_completed`, `click_price_estimate_bot`.
  - Generic `trackEvent(name, payload?)` — adhoc eventlar uchun (`price_room_selected`, `price_ceiling_selected`, `price_addon_toggled`).
- **`createTelegramBotLink`** payload sifatida ham ishlatiladi — bot deep-link tayyor mahsulot/parametrlar bilan keladi.

**Deliverable:** lead qualification tool — bot allaqachon mijozni biladi.

---

## Phase 3.5 — Pro Calculator  ✅

Phase 3'dagi oddiy 4-step funnel **professional 6-step kalkulyator**ga aylandi.

### Bajarilgani:

- **`data/price-options.ts`** kengaytirildi:
  - `PremiumLevel` (`standard | comfort | premium`) qo'shildi, har ceiling type'ga teglandi.
  - **Satin** potolok qo'shildi (5 ta ceiling type).
  - `ProAddonOption` — `unit` (meter/piece/fixed), `minQty/maxQty/defaultQty`, `priceMin/Max`. 6 ta addon: led-line, karniz, lyustra, spot, **pipe**, **complex-corner**.
  - `DistrictOption` — `qarshi / qashqadaryo / far` + `travelFeeMin/Max`.
  - `RoomShapeMode` — `dimensions | area`.
- **`lib/pro-price-estimate.ts`** yangi:
  - `calculateProEstimate(input): ProEstimateResult` — base + addons + travel + breakdown.
  - `parseDecimal` — decimal va comma (`3,5`) qabul qiladi.
  - `formatSom`, `formatPriceRange` — `Intl.NumberFormat('uz-UZ')`.
  - `buildProTelegramPayload` — yangi `pro_<room>_<area>_<ceiling>_<district>_<N>a` format.
  - `defaultAddonQuantities`, `totalActiveAddons` helperlari.
- **Calculator komponentlari** (`src/components/calculator/`):
  - `calculator-shell.tsx` — header (progress + title), body, footer nav.
  - `quantity-control.tsx` — universal `−/+` counter (meter/piece/fixed).
  - `room-step.tsx`, `size-step.tsx`, `ceiling-step.tsx`, `addons-step.tsx`, `district-step.tsx`, `result-step.tsx`, `estimate-breakdown.tsx`.
- **`PriceEstimateCard`** — orchestrator (state, validation, step navigation, analytics).
- **Eski `price-estimate.ts` o'chirildi** — pro variant bilan almashtirildi.
- **Analytics** kengaytirildi (6 ta yangi event).
- **`docs/PRO_CALCULATOR_SPEC.md`** yangi hujjat — formula, breakdown, edge cases, real narxlarni sozlash qo'llanmasi.

**Deliverable:** professional, mijozni ishontiradigan kalkulyator. Bot bo'lmaganda ham qiymat beradi (mijoz aniq invoice ko'radi va qaror qabul qiladi).

---

## Phase 3.6 — Price preset calibration  ✅

Pro Calculator endi biznes egasi uchun **xavfsiz va o'zgartirilishi oson** narx konfiguratsiyasiga ega.

### Bajarilgani:

- **`data/price-options.ts` qaytadan tashkil etildi:**
  - Fayl boshida — purpose comment (mijoz vs biznes egasi sharhi).
  - Har bir bo'lim (`AREA_*` limitlar, `roomTypes`, `ceilingTypes`, `proAddonOptions`, `districtOptions`) **section header** + biznes egasi uchun guidance comment.
  - Har bir narx qiymati yonida inline `// taxminiy — ...` izoh: ushbu qiymat qachon va qancha o'zgarishi mumkin.
  - "TEGMANG" / "EHTIYOT BO'LIB" / "ERKIN o'zgartiring" qoidasi formal yozildi.
- **Safe starter preset** kalibrlandi (4 ta `TYPICAL_EXAMPLES` orqali validatsiya):
  - Premium dizayn 80k–120k/m² (130k'dan pasaytirildi — juda baland chiqmaslik uchun)
  - Boshqa narxlar saqlandi (manual sanity check'da mantiqiy chiqdi)
- **Magic number → const:** `ROUNDING_STEP_SOM = 1000` ajratildi va kommentlandi (biznes egasi `500`ga o'zgartirishi mumkin).
- **`TYPICAL_EXAMPLES`** export'i `pro-price-estimate.ts` ichida — 4 ta tipik holat input + expected note bilan. Dev console'da tekshirish mumkin.
- **Copy polish (calculator UI):**
  - Result disclaimer kuchaytirildi: "Bu hisob taxminiy. Aniq narx o'lchov, xona holati, material turi, yoritish va montaj murakkabligiga qarab belgilanadi."
  - Size step helper: "Agar aniq o'lchamni bilmasangiz, taxminiy m² kiriting. Usta kelganda aniq o'lchov olinadi."
  - Addons step subtitle: "Qo'shimcha ishlarni bilmasangiz, 0 qoldiring — operator maslahat beradi."
  - District step subtitle: "Hudud yo'l xarajati va usta chiqish vaqtiga ta'sir qilishi mumkin."
- **`docs/PRO_CALCULATOR_SPEC.md` §8** to'liq qayta yozildi: "Real narxlarni sozlash bo'yicha qo'llanma" (10 ta sub-bo'lim, manual sanity check jadvali, build oldidan checklist).
- **`docs/USER_FLOW.md` §8b** yangi: kalkulyator natijasini mijozga **operator/sotuvchi qanday tushuntirishi** kerak (script).

**Deliverable:** kalkulyator endi biznes egasi tomonidan **bitta fayl o'zgartirish** orqali sozlanadi, mantiqsiz natijalar oldini olish uchun sanity-check infratuzilmasi qurilgan.

---

## Phase 4 (frontend) — Deploy readiness  ✅ (current)

Loyiha **production deploy uchun 100% tayyor**. Yangi infratuzilma fayllari, dynamic OG image, deploy qo'llanmasi.

### Bajarilgani:

- **Dynamic OpenGraph image** — `src/app/opengraph-image.tsx` (Edge runtime, `next/og` `ImageResponse`). 1200×630 brand-blue PNG runtime'da generatsiya qilinadi — Instagram/Telegram link preview professional ko'rinadi. Statik fayl shart emas.
- **Favicon** — `src/app/icon.svg` (brand-blue VP monogram, gradient border). Next.js avtomatik favicon sifatida ulaydi.
- **`metadata.openGraph.images`** olib tashlandi → conventional `opengraph-image.tsx` ishlatiladi.
- **JSON-LD DRY** — `links.phone`'dan `phoneRaw` derive qilindi (`tel:` prefiks olib tashlanadi), `sameAs` ham `links.ts`'dan keladi. Endi telefon raqami bitta joyda — `data/links.ts`.
- **`.env.example`** — `NEXT_PUBLIC_SITE_URL` shabloni biznes egasi uchun komment bilan.
- **`.gitignore`** kengaytirildi — `tsconfig.tsbuildinfo` (TypeScript incremental cache) qo'shildi.
- **README.md** to'liq qayta yozildi — Pro Calculator sektsiyasi, narxlarni o'zgartirish bo'limi, Vercel deploy qadamlari, Instagram bio tavsiya.
- **`docs/DEPLOY_CHECKLIST.md`** yangi — 8 ta bo'lim:
  1. Pre-deploy checklist (lokal)
  2. Vercel deploy qadamlari
  3. Custom domain ulash + DNS
  4. Post-deploy env update
  5. **Smoke test jadvallari (41 ta test)** — 5.1 sahifa, 5.2 CTA, 5.3 calculator asosiy oqim, 5.4 calculator alternativ holatlar, 5.5 SEO, 5.6 performance
  6. Instagram bio update
  7. Rollback plan (Vercel built-in + git revert + maintenance mode)
  8. Doc referans
- **Build output:** 7 ta static page (`○`) + 1 ta dynamic (`ƒ /opengraph-image`). Build 100% green.

**Deliverable:** "git push → Vercel build → domain ulash → smoke test → live" — to'liq qo'llanma bilan.

---

## Phase 4 (bot) — Telegram bot integration contract  ✅

Hozir bot **alohida proyektda** (yoki yaratilishi kerak) — bu repository ichida frontend uchun deep-link generatsiya tugagan. Phase 4 bu **kontraktni** rasmiylashtiradi.

### Bajarilgani:

- **`docs/TELEGRAM_BOT_INTEGRATION.md`** — to'liq spec:
  - `/start <payload>` formati, generic source + price funnel.
  - Telegram cheklovlari (64 belgi, `[A-Za-z0-9_-]`).
  - **Stable ID kontrakti** (`roomTypeId`, `ceilingTypeId`, `addonId`, source) — har qanday o'zgarishi breaking change.
  - **Hyphen ambiguity** masalasi (`led-line` ID'si ichida `-` borligi) — whitelist greedy parsing yagona to'g'ri yondashuv.
  - TypeScript + Python parser implementatsiyalari.
  - Validatsiya qoidalari (empty, length, illegal chars, unknown IDs, NaN area).
  - Lead capture: Option A (Google Sheets), B (SQLite/Postgres), C (CRM) — tavsiya **A**.
- **`docs/TELEGRAM_BOT_MESSAGES.md`** — 4 ta welcome shabloni (A: generic, B: portfolio, C: price summary + qisqa fallback, D: unknown), placeholder qiymatlari, reply/inline keyboard tavsiyalari, microcopy do/don't, operator handover signal.
- **`docs/examples/telegram_payload_parser.py`** — ishlaydigan Python referansi (160+ qator), 16 ta test case (hammasi PASS), `calculate_estimate` ham mavjud (frontend bilan birxil formula).
- Frontend **o'zgarmadi** — payload kontrakti allaqachon Phase 3'da rasmiylashgan, hozir faqat dokumentlandi.

**Deliverable:** to'liq integratsiya kontrakti — bot yaratuvchi (yoki bot integratsiyalovchi) shu hujjatlardan boshlab oxirigacha implement qila oladi.

---

## Phase 4.5 — Actual Telegram bot implementation  ◀ keyingisi

Bot kodi yaratiladi (alohida repo yoki monorepo `bot/` papka).

### Tavsiya etilgan stack:
- **Python + aiogram 3** (yoki **Node.js + grammY**).
- Webhook hosting: **Fly.io** / **Railway** / **Render** (free tier).
- Storage: **Google Sheets** (Option A) → 6 oydan keyin **Postgres** (Option B).
- Bot token: env variable, Service Account JSON — secrets.

### Implementatsiya checklist:
- [ ] Bot skeleton (aiogram/grammY).
- [ ] `parse_start_payload` ni docs example'dan importlash.
- [ ] 4 template handler (A, B, C, D).
- [ ] Sheet append (`gspread`) + update.
- [ ] Photo handling (mijoz rasmi).
- [ ] Operator chat notify (yangi lead alert).
- [ ] Status komandalar (`/lead <id> status contacted`).
- [ ] Webhook URL frontend ekosistemasi bilan tegmaydi — domen alohida (`bot.vashpotolok.uz`).

**Deliverable:** end-to-end lead capture, mijoz Telegram'ga o'tgandan keyin avtomatik intake.

---

## Phase 5 — Analytics tracking + lead attribution

- `lib/analytics.ts` real provider'ga ulanadi.
- Variant A: **Plausible** (self-hosted yoki cloud).
- Variant B: **Custom endpoint** + ClickHouse / BigQuery.
- Dashboard: real-time funnel metrics:
  - View → Click ratio
  - Per-source conversion (`hero` / `price` / `portfolio` / `sticky` / `footer`)
  - Price funnel drop-off (step 1 → 2 → 3 → 4 → final → bot click)
  - Bot lead conversion (frontend `price_funnel_completed` ↔ bot `lead_created` join)
  - Scroll depth, time on page
- **Cross-system attribution:**
  - Frontend `click_price_estimate_bot` event'i `payload` saqlaydi.
  - Bot lead'ida ham `payload` mavjud.
  - ETL job (kunlik) ikkala manbadan ma'lumotni `payload + telegram_user_id + 24h window` bo'yicha join qiladi.
- Weekly digest (email) — Telegram bot orqali admin'ga.

**Deliverable:** data-driven decision making + lead attribution to-the-source.

---

## Phase 6 — A/B testing

- CTA matnlari variantlari (`Telegram bot orqali hisoblash` vs `Tezda narx oling`).
- Hero matnlari variantlari.
- CTA buyurtmasi (Phone vs Telegram bot birinchi).
- Tool: GrowthBook (open source) yoki o'z A/B logikamiz.
- Statistik signifikantlik orqali winner tanlanadi.

**Deliverable:** continuous conversion optimization.

---

## Phase 7 — Admin panel orqali linklarni boshqarish

- Lightweight admin UI (`/admin`, auth-protected).
- Boshqarish:
  - Linklar (Telegram bot, telefon, Telegram chat, Instagram)
  - Portfolio item'lar (rasm yuklash, gradient tanlash)
  - Xizmatlar
  - Trust badge'lar
  - Phone display format
  - Hero matnlari
- Backing: Vercel KV / Supabase / faylga (`config.json`).
- ISR (Incremental Static Regeneration) — admin save'da revalidate.

**Deliverable:** non-technical user contentni o'zi boshqara oladi.

---

## Backlog (priority sirtmoqdan tashqarida)

- **PWA** — `manifest.json` + service worker, "Add to home screen".
- **Multi-city landing'lar** — `/qarshi`, `/shahrisabz` (SEO uchun).
- **WhatsApp CTA** — agar mijozlar so'rasa.
- **Review widget** — Google Reviews integrate.
- **Video hero** — qisqa 5s loop (sip stretching real footage).
- **Dark/light toggle** — agar foydalanuvchilardan talab kelsa.

---

## Texnik qarz (Tech debt) — proaktiv ko'rib turish

- `framer-motion` agar UX talabi bo'lsa qo'shiladi (hozircha CSS-only).
- `@vercel/analytics` agar Vercel'da deploy bo'lsa, ulanadi.
- E2E test (`playwright`) Phase 5'dan keyin.

---

## Release sikli

- **v0.1.0** — Phase 1 (premium static)
- **v0.2.0** — Phase 2 (real portfolio)
- **v0.3.0** — Phase 3 (advanced calculator)
- **v1.0.0** — Phase 4 + 5 (bot + analytics integrated)
- **v1.1.0** — Phase 6 (A/B)
- **v2.0.0** — Phase 7 (admin)
