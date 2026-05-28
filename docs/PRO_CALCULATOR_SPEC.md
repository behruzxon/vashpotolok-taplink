# Pro Calculator — Spec (Phase Calc-2)

VashPotolok taplink ichidagi **5 qadamli professional kalkulyator** (`PriceEstimateCard`) — Phase Calc-2 deliverable.

Bog'liq hujjatlar:
- [`COMPONENT_ARCHITECTURE.md`](./COMPONENT_ARCHITECTURE.md) — komponent daraxti
- [`TELEGRAM_BOT_INTEGRATION.md`](./TELEGRAM_BOT_INTEGRATION.md) — payload kontrakt (`pro_<room>_<area>_<ceiling>_<district>`)
- [`SEO_AND_ANALYTICS.md`](./SEO_AND_ANALYTICS.md) — eventlar

---

## 1. Maqsad

Phase Calc-2 da kalkulyator biznes yo'nalishiga moslandi:
- **Addons step olib tashlandi** — mijoz uchun ixcham oqim
- **Yangi ceiling type'lar** real xizmatga mos: `odnotonniy`, `gulli`, `naqsh`, `mramor`, `uv-pechat`
- **Qashqadaryo bo'yicha bitta narx siyosati** — district travel fee 0, tuman faqat lead context uchun
- **16 tumandan tanlash** — viloyat bo'ylab to'liq qoplama

Mijoz **botga borgunicha** to'liq kontekstga ega bo'ladi, bot ortiqcha so'roq qilmaydi.

---

## 2. Step flow

| # | Step | Component | Validation |
|---|---|---|---|
| 1 | Xona turi | `RoomStep` | `roomTypeId !== ''` |
| 2 | Xona o'lchami | `SizeStep` | `AREA_MIN_M2 ≤ area ≤ AREA_MAX_M2` (6–80 m²) |
| 3 | Potolok turi | `CeilingStep` | `ceilingTypeId !== ''` |
| 4 | Tuman | `DistrictStep` | `districtId !== '' && result.valid` |
| 5 | Natija (`result`) | `ResultStep` | — |

`TOTAL_STEPS = 5` (4 input + 1 result), progress bar 5 segment.

---

## 3. Inputlar

| Input | Manbai | Joy |
|---|---|---|
| `roomTypeId` | Step 1 (room cards) | `data/price-options.ts` → `roomTypes` |
| `mode` | Step 2 toggle (`dimensions` \| `area`) | komponent state |
| `lengthM`, `widthM` | Step 2 (dimensions mode) | text input, decimal/comma OK |
| `areaM2` | Step 2 (area mode) | text input, decimal/comma OK |
| `ceilingTypeId` | Step 3 (radio list) | `ceilingTypes` |
| `districtId` | Step 4 (2-col grid) | `districtOptions` |

### Stable ID kontrakt

Phase Calc-2 bot kontrakti bilan **bir xil**:

```
roomTypeId:    zal | yotoqxona | oshxona | koridor
ceilingTypeId: odnotonniy | gulli | naqsh | mramor | uv-pechat
districtId:    qarshi-shahar | qarshi-tumani | shahrisabz-shahar | shahrisabz-tumani |
               kitob | yakkabog | chiroqchi | qamashi | guzor | kasbi |
               koson | nishon | muborak | mirishkor | dehqonobod | kokdala
```

> **Breaking change qoidasi:** ushbu ID'larni o'zgartirish frontend ↔ bot kontraktini buzadi. Migratsiya qo'llanmasi [`TELEGRAM_BOT_INTEGRATION.md`](./TELEGRAM_BOT_INTEGRATION.md) §10.

---

## 4. Formula

### 4.1 Geometriya

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

### 4.2 Polotno + montaj (yagona narx qatori)

```
base_min = ceiling.pricePerM2Min × area × room.baseMultiplier
base_max = ceiling.pricePerM2Max × area × room.baseMultiplier

total_min = round_to_thousand(base_min)
total_max = round_to_thousand(base_max)
```

District narxga **ta'sir qilmaydi** — har 16 tuman uchun yagona narx siyosati.

### 4.3 Yaxlitlash

Yakuniy summa **`ROUNDING_STEP_SOM = 1000`** ga yaxlitlanadi.

### 4.4 Validatsiya

| Tekshiruv | Natija |
|---|---|
| `area < AREA_MIN_M2 (6)` yoki `> AREA_MAX_M2 (80)` | `result.valid = false`, total `0` |
| `roomTypeId`, `ceilingTypeId`, `districtId` ro'yxatda yo'q | `valid = false` |
| `lengthM` / `widthM` parse bo'lmasa (dimensions mode) | `area = 0`, `valid = false` |

---

## 5. Output (breakdown)

```ts
type ProEstimateResult = {
  valid: boolean
  areaM2: number          // 0.1 ga yaxlit
  perimeterM: number      // 0.1 ga yaxlit
  baseMin: number
  baseMax: number
  totalMin: number
  totalMax: number
  breakdown: BreakdownItem[]   // UI'da invoice ko'rinishi uchun
  payload: string              // Telegram bot uchun
}
```

`breakdown` faqat 1 ta qator:

```
[
  { id: 'base', label: 'Polotno + montaj · Mramor', qty: 24, unit: 'area', min: 1638000, max: 2268000 },
]
```

Result step'da `unit: 'area'` → UI'da `24 m²` ko'rsatadi.

---

## 6. Payload format (Telegram bot uchun)

```
pro_<roomTypeId>_<areaM2>_<ceilingTypeId>_<districtId>
```

### Misollar

```
pro_zal_24_gulli_kitob
pro_yotoqxona_18_odnotonniy_qarshi-shahar
pro_oshxona_14_mramor_kasbi
pro_koridor_10_uv-pechat_yakkabog
```

Hammasi `≤ 60 belgi` (eng uzun kombinatsiya `pro_yotoqxona_80_uv-pechat_shahrisabz-tumani` ≈ 46 ta belgi). Payload `≤ 60 belgi` shartiga to'g'ri kelmasa (deyarli imkonsiz) `slice(0, 60)` qilinadi.

### Legacy format (Phase 3.5 — olib tashlangan)

`pro_<room>_<area>_<ceiling>_<district>_<N>a` formati Phase Calc-2'da `<N>a` segmentisiz qoldi (addons olib tashlandi). Eski format hozir generate qilinmaydi.

---

## 7. Disclaimer policy

**Doim ko'rsatiladi (Result step amber info box):**

> Bu taxminiy hisob. Aniq narx o'lchov va yakuniy tanlovdan keyin belgilanadi.

**CTA matni:** “Aniq narxni Telegramda olish” (mijoz “aniq” so'zining shartli ekanligini biladi).

**Calculator card ustida (PriceAnchor):**

> Taxminiy hisob 1 daqiqada. Yakuniy narx o'lchov va yakuniy tanlovdan keyin aniqlanadi.

---

## 8. Real narxlarni sozlash bo'yicha qo'llanma

### 8.1 Qaysi faylni o'zgartirish

Hammasi bir joyda: **`src/data/price-options.ts`**.

```
1. price-options.ts ni oching
2. Kerakli qiymatni o'zgartiring
3. npm run typecheck && npm run build
4. Deploy
```

### 8.2 Potolok (`pricePerM2Min/Max`)

`ceilingTypes` array ichidagi har bir item:

```ts
{
  id: 'mramor',                    // ← TEGMANG (Telegram bot kontrakti)
  label: 'Mramor',
  pricePerM2Min: 120000,           // ← shu yerda almashtiring (so'm/m²)
  pricePerM2Max: 135000,
  premiumLevel: 'premium',
}
```

**Range mantiq:**
- `Min` — eng yaxshi material bilan, eng oddiy holatda
- `Max` — qiyinroq holatda yoki sezgir material

**Tartib qoidasi:** UI'da array tartibida ko'rinadi → arzondan qimmatga saqlash tavsiya etiladi.

### 8.3 Tuman ro'yxati

`districtOptions` array — 16 ta Qashqadaryo tumani/shahri. Narxga ta'sir yo'q. Yangi tuman qo'shilsa:

```ts
{ id: 'yangituman', label: 'Yangituman' }
```

ID'lar bot parser bilan sinxronlanishi shart (`docs/TELEGRAM_BOT_INTEGRATION.md` §3.4).

### 8.4 Room multiplier — nima uchun kerak

`roomTypes[*].baseMultiplier` — xona turining “murakkablik” korreksiyasi:
- `zal: 1.05`, `yotoqxona: 1.00`, `oshxona: 1.00`, `koridor: 0.95`

**Qoida:** `baseMultiplier` ni `0.85` — `1.20` oralig'idan tashqari chiqarmang.

### 8.5 Manual sanity check jadvali

`src/lib/pro-price-estimate.ts` ichida `TYPICAL_EXAMPLES`:

| # | Input | Expected range (joriy preset) |
|---|---|---|
| 1 | Yotoqxona · odnotonniy · 18 m² · Qarshi shahri | ~1 440 000 — 1 620 000 so'm |
| 2 | Zal · gulli · 6×4 m (24 m²) · Kitob | ~3 024 000 — 3 402 000 so'm |
| 3 | Oshxona · mramor · 14 m² · Kasbi | ~1 680 000 — 1 890 000 so'm |
| 4 | Koridor · UV pechat · 10 m² · Yakkabog‘ | ~1 330 000 — 1 520 000 so'm |

### 8.6 Yaxlitlash

`ROUNDING_STEP_SOM = 1000` — `src/lib/pro-price-estimate.ts`. `500`ga yaxlitlash kerak bo'lsa shu qiymatni o'zgartiring.

### 8.7 Qaysi qiymatlarni o'zgartirmaslik kerak

**TEGMANG** (Telegram bot kontrakti qismi):
- `id` (room/ceiling/district) — bot whitelist'i shu ID'lar bilan ishlaydi
- `AREA_MIN_M2`, `AREA_MAX_M2` — payload format'i va validatsiya bilan bog'liq

**EHTIYOT BO'LIB** o'zgartiring:
- `baseMultiplier` (0.85–1.20)
- `premiumLevel` (UI badge ranggini o'zgartiradi)

**ERKIN** o'zgartiring:
- `pricePerM2Min/Max`
- `label`, `hint`

### 8.8 Build oldidan checklist

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

- **Mobile-first** — barcha tap target ≥ 44px.
- **Step'lararo transition** — `animate-step-in` (8px translate + opacity, 320ms).
- **`prefers-reduced-motion`** — barcha animatsiyalar avtomatik o'chadi.
- **Active state** — `border-brand-accent-glow` + `bg-brand-accent-soft` + box-shadow glow.
- **Premium level badge** (Step 3) — `standard` neutral, `comfort` brand-blue, `premium` gold.
- **District info note** (Step 4) — “Qashqadaryo bo'ylab narx bir xil. Tuman tanlovi faqat kontakt uchun ishlatiladi.”
- **Result step** — gradient total range katta, summary 4 row (Xona, Maydon, Potolok, Tuman), invoice 1 line + amber disclaimer.

---

## 10. Test checklist (manual)

- [ ] Step 1: 4 ta room — har biri tanlanmagan paytda “Davom etish” disabled, tanlangach yoniqlanadi.
- [ ] Step 2: dimensions toggle — length 6, width 4 → area 24, perimeter 20.
- [ ] Step 2: area mode → 18 m² → perimeter 16.97.
- [ ] Step 2: length 0 → CTA disabled.
- [ ] Step 2: area 100 → warning “6–80 m² oralig'ida”, CTA disabled.
- [ ] Step 2: `3,5` (vergulli) → `3.5` sifatida tan olinadi.
- [ ] Step 3: 5 ta ceiling, har biri SVG pattern preview va premium badge bilan.
- [ ] Step 4: 16 ta district 2-col grid, har biri tanlanadi, top'da info note.
- [ ] Result: invoice 1 ta qator (Polotno + montaj) + total range gradient, district info summary'da.
- [ ] Result: CTA Telegram'ga `pro_<room>_<area>_<ceiling>_<district>` payload bilan ochiladi.
- [ ] Result: “Qayta hisoblash” → Step 1'ga, state reset.
- [ ] Back navigatsiya har step'da ishlaydi.
