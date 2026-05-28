# Pro Calculator — Spec

VashPotolok taplink ichidagi **6 qadamli professional kalkulyator** (`PriceEstimateCard`) — Phase 3.5 deliverable.

Bog'liq hujjatlar:
- [`COMPONENT_ARCHITECTURE.md`](./COMPONENT_ARCHITECTURE.md) — komponent daraxti
- [`TELEGRAM_BOT_INTEGRATION.md`](./TELEGRAM_BOT_INTEGRATION.md) — payload kontrakt
- [`SEO_AND_ANALYTICS.md`](./SEO_AND_ANALYTICS.md) — eventlar

---

## 1. Maqsad

Phase 3'dagi oddiy 4-step funnel (room → area slider → ceiling → addon checkboxes) **professional kalkulyator**ga aylantirildi:

- Real o'lcham (uzunlik × eni) yoki tayyor m²
- 5 turdagi potolok + premium level badge
- 6 ta addon **quantity** bilan (metr/dona)
- Hudud + yo'l xarajati
- Invoice-like breakdown + total range
- Telegramga tayyor payload (yangi `pro_*` format)

Mijoz **botga borgunicha** to'liq kontekstga ega bo'ladi, bot ortiqcha so'roq qilmaydi.

---

## 2. Inputlar

| Input | Manbai | Joy |
|---|---|---|
| `roomTypeId` | Step 1 (room cards) | `data/price-options.ts` → `roomTypes` |
| `mode` | Step 2 toggle (`dimensions` \| `area`) | komponent state |
| `lengthM`, `widthM` | Step 2 (dimensions mode) | text input, decimal/comma OK |
| `areaM2` | Step 2 (area mode) | text input, decimal/comma OK |
| `ceilingTypeId` | Step 3 (radio list) | `ceilingTypes` |
| `addonQuantities` | Step 4 (quantity controls) | `proAddonOptions` |
| `districtId` | Step 5 (radio list) | `districtOptions` |

### Stable ID kontrakt

Phase 4 Telegram bot contract bilan **bir xil**:

```
roomTypeId:    zal | yotoqxona | oshxona | koridor
ceilingTypeId: matoviy | glyans | satin | led | premium   ← satin Phase 3.5'da qo'shildi
addonId:       led-line | karniz | lyustra | spot | pipe | complex-corner   ← pipe va complex-corner yangi
districtId:    qarshi | qashqadaryo | far                  ← Phase 3.5'da yangi
```

> **Breaking change qoidasi:** ushbu ID'larni o'zgartirish frontend ↔ bot kontraktini buzadi. Migratsiya qo'llanmasi [`TELEGRAM_BOT_INTEGRATION.md`](./TELEGRAM_BOT_INTEGRATION.md) §10.

---

## 3. Formula

### 3.1 Geometriya

**Dimensions mode:**
```
area = length × width
perimeter = 2 × (length + width)
```

**Area mode** (perimeter taxminiy — kvadrat eng yomon ssenariy):
```
side = sqrt(area)
perimeter = side × 4
```

### 3.2 Polotno + montaj (base)

```
base_min = ceiling.pricePerM2Min × area × room.baseMultiplier
base_max = ceiling.pricePerM2Max × area × room.baseMultiplier
```

### 3.3 Qo'shimcha xizmatlar (addons)

Har bir tanlangan addon uchun (`qty > 0`):

```
fixed unit:  addon.priceMin           va  addon.priceMax
meter/piece: addon.priceMin × qty     va  addon.priceMax × qty
```

Jami:
```
addons_min = Σ addon_item.min
addons_max = Σ addon_item.max
```

### 3.4 Yo'l/hudud

```
travel_min = district.travelFeeMin
travel_max = district.travelFeeMax
```

`qarshi` uchun ikkalasi ham `0`.

### 3.5 Yakuniy

```
total_min = round_to_thousand(base_min + addons_min + travel_min)
total_max = round_to_thousand(base_max + addons_max + travel_max)
```

Yaxlitlash — eng yaqin **1000 so'm**ga.

### 3.6 Validatsiya

| Tekshiruv | Natija |
|---|---|
| `area < AREA_MIN_M2 (6)` yoki `> AREA_MAX_M2 (80)` | `result.valid = false`, total `0` |
| `roomTypeId`, `ceilingTypeId`, `districtId` ro'yxatda yo'q | `valid = false` |
| `lengthM` / `widthM` parse bo'lmasa (dimensions mode) | `area = 0`, `valid = false` |
| Addon qty `minQty` dan kichik yoki `maxQty` dan katta | `clamp` qilinadi |
| Addon qty `0` | breakdown'ga qo'shilmaydi |

---

## 4. Output (breakdown)

`calculateProEstimate(...)` quyidagini qaytaradi:

```ts
type ProEstimateResult = {
  valid: boolean
  areaM2: number          // 0.1 ga yaxlit
  perimeterM: number      // 0.1 ga yaxlit
  baseMin: number
  baseMax: number
  addonsMin: number
  addonsMax: number
  travelMin: number
  travelMax: number
  totalMin: number
  totalMax: number
  breakdown: BreakdownItem[]   // UI'da invoice ko'rinishi uchun
  payload: string              // Telegram bot uchun
}
```

`breakdown` — UI invoice'i:

```
[
  { id: 'base',     label: 'Polotno + montaj · LED yoritish bilan', qty: 24, unit: 'meter', min: 1512000, max: 2268000 },
  { id: 'led-line', label: 'LED liniya',     qty: 6, unit: 'meter', min: 390000, max: 570000 },
  { id: 'karniz',   label: 'Karniz',         qty: 4, unit: 'meter', min: 140000, max: 240000 },
  { id: 'lyustra',  label: 'Lyustra joyi',   qty: 1, unit: 'piece', min: 50000,  max: 90000  },
  { id: 'travel',   label: 'Yo‘l/hudud · Qashqadaryo tumani',       unit: 'fixed', min: 80000, max: 180000 },
]
```

---

## 5. Disclaimer policy

**Doim ko'rsatiladi:**

> Bu taxminiy hisob. Aniq narx xona holati, material, yoritish turi va o'lchovdan keyin belgilanadi.

CTA matni — **"Aniq narxni Telegramda olish"** (mijoz "aniq" so'zining shartli ekanligini biladi).

Bot tomonida ham bir xil disclaimer bo'lishi shart — final taklif faqat usta o'lchov olib kelganidan keyin beriladi.

---

## 6. Payload format (Telegram bot uchun)

```
pro_<roomTypeId>_<areaM2>_<ceilingTypeId>_<districtId>_<N>a
```

`<N>` — qty > 0 bo'lgan addonlar soni (0..6). Quantity'lar payloadda yuborilmaydi — 64 belgilik Telegram cheklovidan oshmaslik uchun. Bot welcome message'ida summary tanlovlar qaytadan tasdiqlanadi.

### Misollar

```
pro_zal_24_led_qarshi_3a
pro_yotoqxona_18_glyans_qarshi_0a
pro_oshxona_14_matoviy_qashqadaryo_2a
pro_koridor_10_premium_far_4a
```

Hammasi `≤ 60 belgi`. Payload `≤ 60 belgi` shartiga to'g'ri kelmasa (deyarli imkonsiz), `slice(0, 60)` qilinadi.

### Legacy `price_*` format

Phase 3 oddiy multi-step funnel `price_<room>_<area>_<ceiling>_<addonIds>` formatini ishlatardi. **Phase 3.5'da olib tashlandi** (bot integratsiyalanmagani uchun safe). Bot kelajakda faqat `pro_*` prefiksini qabul qilishi kerak.

---

## 7. Edge cases

| Holat | Yechim |
|---|---|
| `length` yoki `width` bo'sh | parser `NaN` qaytaradi, `area = 0`, validatsiya `valid: false` |
| `area = 0` | `valid: false`, CTA disabled |
| `area > AREA_MAX_M2 (80)` | UI'da inline warning ("Maydon 6–80 m² oralig'ida bo'lishi kerak"), CTA disabled |
| Negative input | `parseDecimal` `Number(... )`'ga tushadi, validatsiya `≤ 0` ni reject qiladi |
| Addon qty `> maxQty` | `clamp` (UI'da `+` button disabled) |
| Addon qty `< minQty` | `clamp` (UI'da `−` button disabled) |
| Decimal: `3.5` | OK |
| Comma decimal: `3,5` | `parseDecimal` `,` → `.` qiladi, OK |
| Whitespace: ` 3.5 ` | `trim()`, OK |
| NaN bo'lib chiqsa | `roundToThousand(NaN)` → `0`, formatPriceRange → `'—'` |
| Step 6 (Confirm)'da `result.valid = false` | UI inline warning, "Hisobni ko'rish" button disabled |
| Result CTA — `result.valid = false` | `<a>` `aria-disabled` + `onClick` `preventDefault` + visual disabled |

---

## 8. Real narxlarni sozlash bo'yicha qo'llanma (Phase 3.6)

Hozirgi narxlar — **"safe starter preset"** (Qarshi/Qashqadaryo 2026-yil bozori uchun taxminiy boshlang'ich qiymatlar). Bu **real bozor narxi deb da'vo qilinmaydi** — operatorda aniq narxlar bilan moslash kerak.

### 8.1 Qaysi faylni o'zgartirish

Hammasi bir joyda: **`src/data/price-options.ts`**. Backend yoki admin panel yo'q. Sozlash:

```
1. price-options.ts ni oching
2. Kerakli qiymatni o'zgartiring
3. npm run typecheck && npm run build
4. Deploy
```

Hech narsani boshqa joydan import qilmaydi — bitta faylda barcha biznes qiymatlari.

### 8.2 Potolok (`pricePerM2Min/Max`)

`ceilingTypes` array ichidagi har bir item:

```ts
{
  id: 'matoviy',                  // ← TEGMANG (Telegram bot kontrakti)
  label: 'Matoviy натяжной потолок',
  ...
  pricePerM2Min: 28000,           // ← shu yerda almashtiring (so'm/m²)
  pricePerM2Max: 38000,
  premiumLevel: 'standard',        // ← optional o'zgartirish (visual badge)
}
```

**Range mantiq:**
- `Min` — eng yaxshi material bilan, eng oddiy holatda
- `Max` — qiyinroq holatda yoki sezgir material
- Mijoz **min va max o'rtasidagi farq** ko'radi va "aniq narx" so'roq qilishga undalladi

**Tartib qoidasi:** UI'da array tartibida ko'rinadi → arzondan qimmatga saqlash tavsiya etiladi.

### 8.3 Addonlar (`priceMin/Max`)

`proAddonOptions` array ichida:

```ts
{
  id: 'led-line',                 // ← TEGMANG
  label: 'LED liniya',
  unit: 'meter',                  // ← unit logikasi (quyida)
  minQty: 0,
  maxQty: 30,                     // ← maksimum kerak bo'lsa kengaytirish OK
  defaultQty: 0,
  priceMin: 65000,                // ← shu yerda almashtiring
  priceMax: 95000,
}
```

**`unit` qoidalari:**
- `meter` — bitta metr uchun narx (jami `qty × price`).
- `piece` — bitta dona uchun narx (jami `qty × price`).
- `fixed` — qty hisobga olinmaydi, faqat `price` (`qty` ko'paytirilmaydi). Hozirgi presetda ishlatilmagan, lekin kerak bo'lsa ishlatiladi (masalan, "Bonus dizayn maslahat" sifatida bir martalik xizmat).

### 8.4 Hudud (`travelFeeMin/Max`)

`districtOptions` array ichida:

```ts
{
  id: 'qashqadaryo',              // ← TEGMANG
  label: 'Qashqadaryo tumani',
  travelFeeMin: 80000,            // ← yaqin tumanlar uchun
  travelFeeMax: 180000,           // ← uzoq tumanlar uchun
}
```

**`qarshi` har doim `0` qoladi** — bu vizual ravishda "Bepul" badge'ini chiqaradi va mijozga ishonch beradi.

### 8.5 Manual sanity check jadvali

Real narxlarni o'zgartirgandan keyin, shu 4 ta misol natijasi mantiqsiz bo'lib qolmaganini tekshiring. Bu massiv **`src/lib/pro-price-estimate.ts`** ichida `TYPICAL_EXAMPLES` deb eksport qilingan.

| # | Input | Expected range (joriy preset) | Izoh |
|---|---|---|---|
| 1 | Yotoqxona · matoviy · 18 m² · Qarshi · 0 addon | **~504 000 — 684 000 so'm** | Eng oddiy, eng arzon variant. Diapazon 25 m² × 28k = 700k atrofida bo'lishi mantiqiy. |
| 2 | Zal · LED · 6×4 m (24 m²) · LED liniya 6m + karniz 4m + lyustra 1 · Qarshi | **~2 092 000 — 3 168 000 so'm** | Premium kombinatsiya. LED material + LED liniya — yuqori narx mantiqiy. |
| 3 | Oshxona · glyans · 14 m² · spot 4 · Qashqadaryo tumani | **~670 000 — 1 032 000 so'm** | O'rta narx + tuman yo'l xarajati. Travel fee 80k–180k diapazon ichida. |
| 4 | Koridor · premium · 10 m² · LED liniya 5m · Uzoq hudud | **~1 285 000 — 2 015 000 so'm** | Kichik joy, lekin premium material va uzoq yo'l xarajati. Real hayotda 10 m² koridorga premium kam qilinadi — lekin kalkulyator matematikani to'g'ri ko'rsatadi. |

**Tekshirish usuli (DevTools console):**

```js
// Browser dev console'da:
const { TYPICAL_EXAMPLES, calculateProEstimate, formatPriceRange } =
  await import('/_next/static/chunks/.../pro-price-estimate.js')

for (const ex of TYPICAL_EXAMPLES) {
  const r = calculateProEstimate(ex.input)
  console.log(ex.label, '→', formatPriceRange(r.totalMin, r.totalMax))
  console.log('  expected:', ex.expectedNote)
}
```

Yoki oddiyroq — kalkulyatorni ochib, 4 ta misolni manual kiritib, natijani jadvalga solishtiring.

### 8.6 Room multiplier — nima uchun kerak

`roomTypes[*].baseMultiplier` — xona turining "murakkablik" korreksiyasi:
- `zal: 1.05` — odatda kattaroq, ko'rinadigan, premium dizayn so'raydi
- `yotoqxona: 1.00` — base (boshqalari shunga nisbatan)
- `oshxona: 1.00` — base
- `koridor: 0.95` — odatda oddiyroq shakl, kichikroq ish

**Qoida:** `baseMultiplier` ni **`0.85` — `1.20`** oralig'idan tashqari chiqarmang. Aks holda boshqa parametrlar (ceiling, addon) bilan natija mantiqsiz bo'lib qoladi va mijoz "g'alati" deb hisoblaydi.

### 8.7 Yaxlitlash qadami

Yakuniy summa **`ROUNDING_STEP_SOM = 1000`** ga yaxlitlanadi (`src/lib/pro-price-estimate.ts`). Mijozga `1 050 000 so'm` ko'rinish `1 047 612 so'm`'dan ancha tushunarli. Agar `500`'ga yaxlitlash kerak bo'lsa — shu qiymatni o'zgartiring.

### 8.8 Min/max range — nima uchun kerak

Mijozga **bitta aniq son** ko'rsatish noto'g'ri — chunki:
- Materialda variant bor (oddiy, sezgir, premium brand)
- Xona holati (eski plitka, deraza joyi, devor egriligi) bilmas
- Operator faqat o'lchov bilan to'liq hisoblay oladi

Shuning uchun **doim min — max range**. Mijoz "taxminiy" so'zini ko'radi va "aniq narx Telegramda" CTA'sini bosadi. Bu — funnel'ning asosiy mehanikasi.

### 8.9 Qaysi qiymatlarni o'zgartirmaslik kerak

**TEGMANG** (Telegram bot kontrakti qismi):
- `id` (room/ceiling/addon/district) — bot whitelist'i shu ID'lar bilan ishlaydi
- `AREA_MIN_M2`, `AREA_MAX_M2` — payload format'i va validatsiya bilan bog'liq

**EHTIYOT BO'LIB** o'zgartiring:
- `baseMultiplier` (0.85–1.20 oralig'i)
- `defaultQty` (lyustra default 1 — odat asoslangan)
- `maxQty` (juda kichik bo'lmasin: spot 20'gacha, addon 30 m'gacha)

**ERKIN** o'zgartiring:
- `pricePerM2Min/Max`, `priceMin/Max`, `travelFeeMin/Max`
- `label`, `hint`, `icon`, `premiumLevel`

### 8.10 Build oldidan checklist

```
[ ] price-options.ts o'zgartirildi
[ ] npm run typecheck   → ✓
[ ] npm run lint        → ✓
[ ] npm run build       → ✓
[ ] Browser'da kalkulyator manual sinab ko'rildi (4 ta TYPICAL_EXAMPLES)
[ ] Natijalar mantiqiy (juda baland yoki juda past emas)
[ ] Mobile'da test (375px ekran)
[ ] Deploy
```

---

## 9. UX qoidalari

- **Mobile-first** — barcha tap target ≥ 44px, quantity buttonlari 36px+ (kompakt, lekin yetarli).
- **Step'lararo transition** — `animate-step-in` (8px translate + opacity, 320ms, cubic-bezier).
- **`prefers-reduced-motion`** — barcha animatsiyalar avtomatik o'chadi.
- **Active state** — `border-brand-accent-glow` + `bg-brand-accent-soft` + box-shadow glow.
- **Premium level badge** (Step 3) — `standard` neutral, `comfort` brand-blue, `premium` gold.
- **Bepul badge** (Step 5) — qarshi uchun `success` ranggi.
- **Result step** — invoice-like (har qator: label + qty + range), pastida total range katta.
- **Disabled CTA** — `cursor-not-allowed` + grey, lekin `<a>` saqlanadi (a11y).

---

## 10. Test checklist (manual)

- [ ] Step 1: 4 ta room — har biri tanlanmagan paytda "Davom etish" disabled, tanlangach yoniqlanadi.
- [ ] Step 2: dimensions toggle — length 6, width 4 → area 24, perimeter 20 ko'rinadi.
- [ ] Step 2: area mode → 18 m² → perimeter 16.97 ko'rinadi.
- [ ] Step 2: length 0 → CTA disabled.
- [ ] Step 2: area 100 → warning "6–80 m² oralig'ida", CTA disabled.
- [ ] Step 2: `3,5` (vergulli) → `3.5` sifatida tan olinadi.
- [ ] Step 3: 5 ta ceiling, har biri premium badge bilan.
- [ ] Step 4: 6 ta addon, `+`/`−` buttonlari max/min'da disabled bo'ladi.
- [ ] Step 5: 3 ta district, qarshi "Bepul" badge bilan.
- [ ] Step 6: Confirm matni, valid bo'lsa "Hisobni ko'rish" yoniq.
- [ ] Result: invoice + total range to'g'ri, CTA Telegram'ga to'g'ri payload bilan ochiladi.
- [ ] Result: "Qayta hisoblash" → Step 1'ga, state reset.
- [ ] Back navigatsiya har step'da ishlaydi.
