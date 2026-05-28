# Telegram Bot Integration — Contract & Parser Spec

Bu hujjat **taplink frontend ↔ Telegram bot** o'rtasidagi rasmiy kontrakt.

> Hozircha bot kodi **bu repository ichida emas**. Bu hujjat — boshqa repoda yoki shu monorepo'da bot yaratuvchi (yoki integratsiyalovchi) uchun yagona haqiqat manbai.
>
> **Joriy versiya:** `pro_*` payload format (Phase 3.5+). Eski `price_*` format (Phase 3) ishlatilmaydi va bu hujjatda **§10 Legacy** bo'limida tarixiy referans sifatida saqlanadi.

---

## 1. Yuqori darajadagi oqim

```
Instagram bio
    └─→ Taplink (https://vashpotolok.uz)
            └─→ Mijoz CTA bosadi
                  └─→ window.location = "https://t.me/vashpotolokbot?start=<payload>"
                          └─→ Telegram app/web ochiladi
                                  └─→ Bot `/start <payload>` qabul qiladi
                                          └─→ Bot payloadni parslaydi
                                                  └─→ Tegishli welcome flow
                                                          └─→ Lead saqlash (Sheets/DB/CRM)
                                                                  └─→ Operator handover
```

Frontend rolida — **faqat payload generatsiyasi**. `src/data/links.ts` (`createTelegramBotLink`) va `src/lib/pro-price-estimate.ts` (`buildProTelegramPayload`) yagona joylar.

Bot rolida — **parsing + routing + lead capture + addon quantitylarni qayta tasdiqlash**.

---

## 2. `/start <payload>` — formal kontrakt

### 2.1 Telegram cheklovlari

- Maksimal uzunlik: **64 belgi**.
- Ruxsat etilgan belgilar: `a-z`, `A-Z`, `0-9`, `_`, `-` (underscore va hyphen).
- Boshqa belgi → Telegram'ning o'zi payloadni inkor etadi.

### 2.2 Ikki tur

| Tur | Misol | Mazmun |
|---|---|---|
| **Generic source** | `hero`, `sticky`, `footer`, `portfolio` | Mijoz qaysi blokdan keldi |
| **Pro calculator** | `pro_zal_24_led_qarshi_3a` | Mijoz Pro Calculator'ni to'liq o'tdi |

### 2.3 Generic source payload

Format: bitta token, faqat allowlist'dan:

```
hero | sticky | footer | portfolio | price | services | trust
```

> `price` — Phase 2 attribution paytida o'rnatilgan source nomi; Pro Calculator result CTA `?start=pro_*` ishlatadi, lekin tracking ichida `source: 'price'` deb belgilanadi (`src/data/links.ts` ↔ `TelegramSource`).

Misollar:
```
https://t.me/vashpotolokbot?start=hero
https://t.me/vashpotolokbot?start=portfolio
```

> Yangi source qo'shilsa: `src/data/links.ts` ichidagi `TelegramSource` type'iga qo'shing **va** bu doc'ni yangilang.

### 2.4 Pro calculator payload

Format:

```
pro_<roomTypeId>_<areaM2>_<ceilingTypeId>_<districtId>_<N>a
```

Komponentlar:

| Pozitsiya | Tip | Manbai | Misol |
|---|---|---|---|
| 0 | `pro` literali | doimo `pro` | `pro` |
| 1 | `roomTypeId` | `data/price-options.ts` → `roomTypes` | `zal` |
| 2 | `areaM2` | integer, ≥ 6 va ≤ 80 (`AREA_MIN_M2`–`AREA_MAX_M2`) | `24` |
| 3 | `ceilingTypeId` | `data/price-options.ts` → `ceilingTypes` | `led` |
| 4 | `districtId` | `data/price-options.ts` → `districtOptions` | `qarshi` |
| 5 | `<N>a` | qty > 0 bo'lgan addonlar **soni** (0..6), `a` suffix bilan | `3a` |

Misollar:
```
pro_zal_24_led_qarshi_3a
pro_yotoqxona_18_glyans_qarshi_0a
pro_oshxona_14_matoviy_qashqadaryo_2a
pro_koridor_10_premium_far_6a
```

Hammasi `≤ 60 belgi`. Frontend `payload.length <= 60 ? payload : slice(0, 60)` qoidasini qo'llaydi — amaliyotda hech qachon kesilmaydi.

### 2.5 Nima yo'q va nima uchun

**Addon ID'lari va quantitylar payload ichida YUBORILMAYDI.** Sabab:

- Telegram 64 belgilik cheklovi — `pro_yotoqxona_18_glyans_qashqadaryo_led-line-karniz-lyustra-spot-pipe-complex-corner` 60+ belgi va quantitylar bilan birga 64'dan oshib ketadi.
- Aniq quantity (LED liniya 6m, karniz 4m, ...) bot tomonida **mijozdan qayta tasdiqlanadi** — bu welcome flow'ning bir qismi va operatorga ham foyda beradi (mijoz e'tibor bermay qoldirgan parametrlarni yana ko'radi).
- `<N>a` segmenti — bot welcome'da “Siz 3 ta qo'shimcha xizmatni tanladingiz” deb taxmin yozish va keyin batafsil so'rash uchun.

Agar kelajakda quantitylar ham yuborilishi kerak bo'lsa — `v2` payload formatiga o'tish kerak (§10).

### 2.6 Char sanitatsiya (frontend tomonida)

`buildProTelegramPayload` ichida har bir ID `replace(/[^a-z0-9-]/gi, '')` orqali tozalanadi → illegal char xavfi yo'q. Frontend hech qachon `_` yoki special belgi yubormaydi.

---

## 3. Stable ID kontraktlari

Quyidagi ID'lar — **rasmiy kontrakt qismi**. Ularning **har qanday o'zgarishi breaking change**'dir va bot tomonida ham yangilanishi kerak (deploy birga).

### 3.1 `roomTypeId` (4 ta)

| ID | UI label |
|---|---|
| `zal` | Zal |
| `yotoqxona` | Yotoqxona |
| `oshxona` | Oshxona |
| `koridor` | Koridor |

### 3.2 `ceilingTypeId` (5 ta)

| ID | UI label | Premium level |
|---|---|---|
| `matoviy` | Matoviy натяжной потолок | standard |
| `glyans` | Glyans потолок | comfort |
| `satin` | Satin потолок | comfort |
| `led` | LED yoritish bilan | premium |
| `premium` | Premium dizayn | premium |

### 3.3 `addonId` (6 ta)

> Payload ichida **uzatilmaydi**, faqat ichki referans uchun. Bot welcome'da quantitylar bilan birga qayta tasdiqlanadi.

| ID | UI label | Unit |
|---|---|---|
| `led-line` | LED liniya | meter |
| `karniz` | Karniz | meter |
| `lyustra` | Lyustra joyi | piece |
| `spot` | Spot chiroqlar | piece |
| `pipe` | Truba obxod | piece |
| `complex-corner` | Murakkab burchak | piece |

### 3.4 `districtId` (3 ta)

| ID | UI label | Travel fee |
|---|---|---|
| `qarshi` | Qarshi | 0 (bepul) |
| `qashqadaryo` | Qashqadaryo tumani | 80k–180k so'm |
| `far` | Uzoqroq hudud | 200k–400k so'm |

### 3.5 Source identifikatorlari

| ID | Frontend blok |
|---|---|
| `hero` | Hero ostidagi primary CTA |
| `sticky` | Sticky bottom CTA bar |
| `footer` | Footer phone (rezerv) |
| `portfolio` | Portfolio card CTA |
| `services` | Reserve — services grid (hozir CTA yo'q) |
| `trust` | Reserve — trust badges (hozir CTA yo'q) |
| `pro_...` | Pro Calculator result CTA — to'liq payload, yuqorida §2.4 |

> **Breaking change qoidasi:** ID'larni o'zgartirish — frontend deploy'idan oldin bot ham yangilanishi shart. Aks holda eski payloadlar bot tomonida "unknown" sifatida qayta ishlanadi va mijoz konteksti yo'qoladi.

---

## 4. Parser spec

### 4.1 Natija shape

```ts
type ParsedPayload =
  | { kind: 'pro';     source: 'pro';
      room_type_id: RoomId; area_m2: number;
      ceiling_type_id: CeilingId; district_id: DistrictId;
      addon_count: number;
      raw: string }
  | { kind: 'source';  source: 'hero'|'sticky'|'footer'|'portfolio'|'price'|'services'|'trust';
      raw: string }
  | { kind: 'unknown'; source: 'unknown'; raw: string }
```

### 4.2 TypeScript implementatsiyasi (referans)

```ts
const ROOM_IDS = ['zal', 'yotoqxona', 'oshxona', 'koridor'] as const
const CEILING_IDS = ['matoviy', 'glyans', 'satin', 'led', 'premium'] as const
const DISTRICT_IDS = ['qarshi', 'qashqadaryo', 'far'] as const
const SOURCE_IDS = ['hero', 'sticky', 'footer', 'portfolio', 'price', 'services', 'trust'] as const

const VALID_CHARS = /^[A-Za-z0-9_-]+$/
const MAX_LEN = 64
const ADDON_COUNT_RE = /^(\d+)a$/

export function parseStartPayload(raw: string): ParsedPayload {
  const empty = !raw || raw.trim() === ''
  if (empty || raw.length > MAX_LEN || !VALID_CHARS.test(raw)) {
    return { kind: 'unknown', source: 'unknown', raw }
  }

  // Source
  if ((SOURCE_IDS as readonly string[]).includes(raw)) {
    return { kind: 'source', source: raw as typeof SOURCE_IDS[number], raw }
  }

  // Pro calculator
  if (raw.startsWith('pro_')) {
    const segments = raw.split('_')
    // ['pro', room, area, ceiling, district, '<N>a']
    if (segments.length !== 6) return { kind: 'unknown', source: 'unknown', raw }

    const [, room, areaStr, ceiling, district, addonsSeg] = segments
    if (!(ROOM_IDS as readonly string[]).includes(room ?? '')) {
      return { kind: 'unknown', source: 'unknown', raw }
    }
    if (!(CEILING_IDS as readonly string[]).includes(ceiling ?? '')) {
      return { kind: 'unknown', source: 'unknown', raw }
    }
    if (!(DISTRICT_IDS as readonly string[]).includes(district ?? '')) {
      return { kind: 'unknown', source: 'unknown', raw }
    }

    const area = Number(areaStr)
    if (!Number.isFinite(area) || area < 6 || area > 80) {
      return { kind: 'unknown', source: 'unknown', raw }
    }

    const m = ADDON_COUNT_RE.exec(addonsSeg ?? '')
    if (!m) return { kind: 'unknown', source: 'unknown', raw }
    const addonCount = Number(m[1])
    if (!Number.isFinite(addonCount) || addonCount < 0 || addonCount > 6) {
      return { kind: 'unknown', source: 'unknown', raw }
    }

    return {
      kind: 'pro', source: 'pro',
      room_type_id: room as typeof ROOM_IDS[number],
      area_m2: Math.round(area),
      ceiling_type_id: ceiling as typeof CEILING_IDS[number],
      district_id: district as typeof DISTRICT_IDS[number],
      addon_count: addonCount,
      raw,
    }
  }

  return { kind: 'unknown', source: 'unknown', raw }
}
```

### 4.3 Python implementatsiyasi

To'liq ishlaydigan referans (`pro_*` formatga moslashtirilgan):

➡️ [`docs/examples/telegram_payload_parser.py`](./examples/telegram_payload_parser.py)

Fayl o'zining `__main__` blokida 15+ ta test case bilan keladi. Bot'da to'g'ridan-to'g'ri import qilish mumkin.

### 4.4 Validation qoidalari (parser uchun majburiy)

| Holat | Natija |
|---|---|
| Bo'sh / `None` / `""` | `unknown` |
| Uzunlik > 64 | `unknown` |
| Allowlist'dan tashqari belgi | `unknown` |
| `pro_` prefiks lekin segmentlar ≠ 6 | `unknown` |
| `roomTypeId` ro'yxatda yo'q | `unknown` |
| `ceilingTypeId` ro'yxatda yo'q | `unknown` |
| `districtId` ro'yxatda yo'q | `unknown` |
| `areaM2` raqam emas yoki < 6 yoki > 80 | `unknown` |
| Addon segment `<N>a` formatiga mos kelmaydi | `unknown` |
| `<N>` < 0 yoki > 6 | `unknown` |
| Hech qaysi tur — boshqa string | `unknown` |

`unknown` → bot **Template D** (umumiy welcome) bilan javob beradi va `raw` qiymatini lead'ga `payload` sifatida saqlaydi (debug uchun).

---

## 5. Bot routing — qaysi template ishlatiladi

| Parsed `kind` | `source` | Template |
|---|---|---|
| `source` | `hero`, `sticky`, `footer` | **Template A** — Generic welcome |
| `source` | `portfolio` | **Template B** — Portfolio welcome |
| `pro` | `pro` | **Template C** — Pro calculator summary + addon qayta tasdiqlash |
| `unknown` | `unknown` | **Template D** — Fallback welcome |

Template matnlari: [`TELEGRAM_BOT_MESSAGES.md`](./TELEGRAM_BOT_MESSAGES.md)

### Pro calculator welcome flow (Template C)

Mijoz Pro Calculator natijasidan keyin botga keladi. Bot 4 qadamda welcome qiladi:

1. **Summary chiqaradi:** xona / maydon / potolok / hudud / "Siz 3 ta qo'shimcha xizmatni tanladingiz" (addonCount).
2. **Aniq qiymatlarni qayta tasdiqlaydi:** "Qo'shimcha xizmatlar — qaysilarini va qancha?" (inline keyboard yoki text reply).
3. **Rasm so'raydi:** "Iltimos xonangiz rasmini yuboring (ixtiyoriy)."
4. **Aloqa ma'lumotlari:** telefon raqami yoki manzil — operator chiqishi uchun.

Keyin operatorga lead notify yuboriladi.

---

## 6. Bot tomonidan narx hisoblash (taxminiy)

Bot ham frontend bilan **bir xil formula** bo'yicha taxminiy range hisoblashi mumkin. Bu Template C'da `Taxminiy range: 1 050 000 — 1 720 000 so'm` matnini chiqarish uchun kerak.

Formula (frontend `src/lib/pro-price-estimate.ts` bilan birxil):

```
base_min = ceiling.pricePerM2Min × area × room.baseMultiplier
base_max = ceiling.pricePerM2Max × area × room.baseMultiplier

# Addonlar — payloadda yo'q, mijozdan qayta so'rashdan keyin qo'shiladi.
# Welcome'da faqat base + travel ko'rsatish mumkin.

travel_min = district.travelFeeMin
travel_max = district.travelFeeMax

partial_min = round_to_thousand(base_min + travel_min)
partial_max = round_to_thousand(base_max + travel_max)
```

Narx tablitsalari — `docs/examples/telegram_payload_parser.py` ichida ham takrorlangan. Frontend `data/price-options.ts` o'zgarsa, bot tomonidagi nusxani ham yangilash kerak.

> **Tavsiya (Phase 4.5+):** narx data'sini yagona JSON faylga ko'chirish (`shared/price-options.json`) va ikkala tomon shundan o'qish. Hozircha — manual sync.

---

## 7. Lead capture plan

### Lead schema (universal)

| Field | Tip | Manbai |
|---|---|---|
| `telegram_user_id` | int | Telegram API (`message.from.id`) |
| `username` | string? | Telegram (`message.from.username`) |
| `full_name` | string | Telegram (`first_name + last_name`) |
| `source` | enum | Parser natijasi (`hero`/`sticky`/`footer`/`portfolio`/`pro`/`unknown`) |
| `payload` | string | `raw` payload |
| `room_type` | string? | Parser (pro uchun) |
| `area_m2` | int? | Parser |
| `ceiling_type` | string? | Parser |
| `district` | string? | Parser |
| `addon_count` | int? | Parser (pro_*'da har doim mavjud) |
| `addon_details` | string? | Bot welcome flow ichida mijozdan olinadi |
| `estimated_min` | int? | Bot calc |
| `estimated_max` | int? | Bot calc |
| `created_at` | timestamp | Bot |
| `status` | enum | `new`, `contacted`, `measured`, `closed_won`, `closed_lost` |
| `operator` | string? | Operator handover'dan keyin |

### Option A — Google Sheets (tavsiya — hozir)

**Plus:** 0 server, free, mobile editable, operator real-time ko'radi.
**Minus:** > 5000 row sekinlashadi, RLS yo'q, search zaif.

**Implementatsiya:**
1. Sheet yarat: `VashPotolok Leads` → tab: `Leads_2026`.
2. Header row: yuqoridagi schema.
3. Service Account JWT (`gspread` Python / `googleapis` Node).
4. Bot har `/start <payload>` da `append_row(...)` chaqiradi.
5. Keyingi javoblar `update_cells(...)` — `row_id` lead'ni topish uchun `telegram_user_id` + sana.

### Option B — SQLite/Postgres

**Plus:** tezroq query, structured, full-text search, history.
**Minus:** server kerak, hosting (Fly.io / Railway).

**Schema (SQLite):**
```sql
CREATE TABLE leads (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  telegram_user_id INTEGER NOT NULL,
  username        TEXT,
  full_name       TEXT,
  source          TEXT NOT NULL,
  payload         TEXT NOT NULL,
  room_type       TEXT,
  area_m2         INTEGER,
  ceiling_type    TEXT,
  district        TEXT,
  addon_count     INTEGER,
  addon_details   TEXT,
  estimated_min   INTEGER,
  estimated_max   INTEGER,
  status          TEXT NOT NULL DEFAULT 'new',
  operator        TEXT,
  notes           TEXT,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_leads_user ON leads(telegram_user_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created ON leads(created_at);
```

### Option C — CRM (Phase 5+)

`amoCRM` / `Bitrix24` / custom. Sheet → CRM migratsiya: Google Apps Script yoki Python ETL.

**VashPotolok holatida tavsiya:** Phase 4.5 — **Option A**. Lead oqimi (~50/oy boshlanishida) Sheets'da bemalol sig'adi. 6 oy ichida 500+ lead bo'lsa — Option B'ga ko'chiramiz. CRM faqat ko'p operator paydo bo'lganda.

---

## 8. Status flow (operator side)

```
new (avtomatik)
  ↓ bot operator notify yuboradi
contacted (operator yozdi)
  ↓ operator o'lchov sanasini kelishadi
measured (o'lchov o'tdi)
  ↓ taklif yuborildi
closed_won  yoki  closed_lost
```

Operator har holatda bot ichida `/lead 123 status measured` kabi komandadan foydalanadi (Phase 4.5'da implement bo'ladi).

---

## 9. Security & privacy

- Telegram bot token — env variable, hech qachon repoda commit qilinmaydi.
- Google Sheets uchun Service Account JSON — env yoki `secrets/`.
- Lead matnlarida shaxsiy ma'lumotlar (rasm, manzil) — Telegram tomonida saqlanmaydi (sheets/db'ga ko'chirilmaydi yoki shifrlanadi).
- Mijozdan oluvchi rasmlar — faqat ish jarayonida ishlatiladi, 90 kun saqlanadi, keyin o'chiriladi.

---

## 10. Versioning & migration

| Versiya | Format | Sana | Status |
|---|---|---|---|
| `v1` (legacy) | `price_<room>_<area>_<ceiling>[_<addons>]` | 2026-05 (Phase 3) | **Deprecated** — frontend ishlatmaydi |
| `v2` (current) | `pro_<room>_<area>_<ceiling>_<district>_<N>a` | 2026-05 (Phase 3.5) | **Aktiv** |
| `v3` (rejada) | `pv3_...` — quantitylar bilan to'liq forma | TBD | Quantitylar payloadga sig'sa |

### Legacy `price_*` format (faqat tarixiy referans)

Phase 3'da quyidagi format ishlatilgan, lekin **frontend Phase 3.5'da olib tashlagan**:

```
price_<roomTypeId>_<areaM2>_<ceilingTypeId>[_<addonId>(-<addonId>)*]
price_<roomTypeId>_<areaM2>_<ceilingTypeId>_<N>a    (qisqa fallback)
```

Bot agar transition davomida eski payload qabul qilishi kerak bo'lsa (eski deep-link'lar Instagram bio'da qolib ketgan bo'lsa), `price_*` parserni qo'shimcha sifatida saqlash mumkin. Lekin **frontend faqat `pro_*` yuboradi** — yangi linklar 100% `pro_*`.

V3'ga o'tilsa: frontend ham, bot ham `v2` va `v3` ni qabul qiladi (transition davomida). Eski payload qabul qilishni 30 kundan keyin to'xtatish mumkin.

---

## 11. Cheat sheet

| Kerak narsa | Joy |
|---|---|
| Payload generate (frontend) | `src/lib/pro-price-estimate.ts` → `buildProTelegramPayload` |
| Bot link (frontend) | `src/data/links.ts` → `createTelegramBotLink` |
| Payload parse (referans) | `docs/examples/telegram_payload_parser.py` |
| Stable ID ro'yxati | Ushbu doc, §3 |
| Bot javoblari | [`TELEGRAM_BOT_MESSAGES.md`](./TELEGRAM_BOT_MESSAGES.md) |
| Frontend pro calc eventlar | [`SEO_AND_ANALYTICS.md`](./SEO_AND_ANALYTICS.md) §6 |
| Narx konfiguratsiyasi | `src/data/price-options.ts` + [`PRO_CALCULATOR_SPEC.md`](./PRO_CALCULATOR_SPEC.md) §8 |
