# Telegram Bot Message Templates

VashPotolok bot uchun **4 ta asosiy welcome shabloni** + qisqa keyingi qadam bo'limlari.

Bog'liq hujjatlar:
- [`TELEGRAM_BOT_INTEGRATION.md`](./TELEGRAM_BOT_INTEGRATION.md) — payload contract, routing
- [`CONTENT_STRATEGY.md`](./CONTENT_STRATEGY.md) — til qoidalari (UZ + kirilcha + rus)

---

## Til qoidalari (qisqa eslatma)

| Joy | Til |
|---|---|
| Asosiy xizmat nomi | Kirilcha rus: **natijnoy potolok** |
| Brend nomi | Lotin uppercase: **VASH POTOLOK** |
| Geografiya | Kirilcha o'zbek: **Qashqadaryo** |
| Bot UI matnlari | Lotin o'zbek: **Xonangiz maydoni**, **Aniq narx** |
| Emoji | CTA va welcome'larda ✓, sarlavhada ✗ |

---

## Template A — Generic welcome (`source: hero | sticky | footer`)

Trigger: `parsed.kind === 'source'` va `source ∈ {hero, sticky, footer}`.

```
Assalomu alaykum! VASH POTOLOK botiga xush kelibsiz 😊
Qashqadaryo bo‘ylab natijnoy potolok bo‘yicha tezkor maslahat beramiz.

Xonangiz maydoni necha m²?
Masalan: 18 m²
```

**Reply keyboard (suggested):**
```
[ 12 m² ]  [ 18 m² ]  [ 24 m² ]
[ 30 m² ]  [ Boshqa o‘lcham ]
[ ☎️ Operator bilan gaplashish ]
```

**Source variant tweaks:**
- `hero` — yuqoridagi default matn.
- `sticky` — birinchi qatorda kichik o'zgartirish: *"Skroll qilib pastdagi tugmadan keldingiz — yordam beramiz."*
- `footer` — *"Qo'ng'iroq qilish o'rniga botda yozdingiz — bu ham qulay 😊"*

---

## Template B — Portfolio welcome (`source: portfolio`)

Trigger: `parsed.kind === 'source'` va `source === 'portfolio'`.

```
Assalomu alaykum! Ishlarimiz namunasidan keldingiz 😊
Sizga ham shunga o‘xshash natijnoy potolok yechimini hisoblab beramiz.

Qaysi xona uchun kerak?
1) Zal
2) Yotoqxona
3) Oshxona
4) Koridor
```

**Inline keyboard:**
```
[ ✨ Zal ]          [ 🌙 Yotoqxona ]
[ 🍽️ Oshxona ]     [ ➡️ Koridor ]
[ 📷 Boshqa namunalar ko‘rsating ]
```

Tanlovdan keyin bot frontend funnelining 2-qadamiga (`area`) o'tadi.

---

## Template C — Price funnel summary (`kind: price | price-short`)

Trigger: `parsed.kind === 'price'` yoki `'price-short'`.

### C.1 — Long form (addon ID'lar bor)

```
Zo‘r, siz taplinkda taxminiy hisoblashni boshlagansiz ✅

Tanlovlaringiz:
Xona: {ROOM_LABEL}
Maydon: {AREA} m²
Potolok: {CEILING_LABEL}
Qo‘shimcha: {ADDONS_LABELS_JOINED}

Taxminiy range: {MIN_FMT} — {MAX_FMT} so‘m

Aniq narx uchun 2 ta ma’lumot kerak:
1) Xonangiz rasmini yuboring
2) Qaysi hududdasiz?
```

**Placeholder qiymatlar:**

| Placeholder | Manbai | Misol |
|---|---|---|
| `{ROOM_LABEL}` | `roomTypes` map (parsed `room_type_id`) | `Zal` |
| `{AREA}` | parsed `area_m2` | `24` |
| `{CEILING_LABEL}` | `ceilingTypes` map | `LED yoritish bilan` |
| `{ADDONS_LABELS_JOINED}` | addons → `label`, vergul bilan | `LED liniya, Karniz` |
| `{MIN_FMT}` / `{MAX_FMT}` | calc, `Intl.NumberFormat('uz-UZ')` ekvivalenti | `1 050 000` / `1 720 000` |

Addons bo'sh bo'lsa — `Qo‘shimcha:` qatorini chiqarmaslik, yoki `Qo‘shimcha: yo‘q`.

### C.2 — Short form (qisqa fallback, addon nomlari yo'q)

```
Zo‘r, siz taplinkda taxminiy hisoblashni boshlagansiz ✅

Tanlovlaringiz:
Xona: {ROOM_LABEL}
Maydon: {AREA} m²
Potolok: {CEILING_LABEL}
Qo‘shimcha: ~{ADDON_COUNT} ta tanlangan

Taxminiy range: {MIN_FMT} — {MAX_FMT} so‘m
(qo‘shimchalarni aniqlashtirish uchun pastdagi tugmalardan tanlang)

Aniq narx uchun 2 ta ma’lumot kerak:
1) Xonangiz rasmini yuboring
2) Qaysi hududdasiz?
```

**Inline keyboard (addon qaytadan tanlash):**
```
[ LED liniya ]   [ Karniz ]
[ Lyustra joyi ] [ Spot chiroqlar ]
[ ✅ Tasdiqlash ]
```

### C.3 — Bot calculation

Bot frontend bilan **bir xil formula**dan foydalanadi (price tablitsasi ham bot ichida bo'ladi — Phase 4.5 setup'da yagona JSON faylga ko'chiradi):

```
base_min = ceiling.price_per_m2_min × area × room.base_multiplier
base_max = ceiling.price_per_m2_max × area × room.base_multiplier
addon_min = Σ addon.estimated_min
addon_max = Σ addon.estimated_max
min = round_to_thousand(base_min + addon_min)
max = round_to_thousand(base_max + addon_max)
```

Price-short form'da addons ma'lum emas → bot yoki `addon_count` ni o'rtacha qiymat bilan multiply qiladi, yoki addon range'ni ko'rsatmaydi (matnda "taxminiy" so'zi disclaimer rolini bajaradi).

---

## Template D — Unknown payload fallback

Trigger: `parsed.kind === 'unknown'` yoki `/start` bo'sh payload bilan.

```
Assalomu alaykum! VASH POTOLOK botiga xush kelibsiz 😊
Sizga natijnoy potolok bo‘yicha yordam beramiz.

Xonangiz maydoni necha m²?
```

**Reply keyboard (suggested):**
```
[ 12 m² ]  [ 18 m² ]  [ 24 m² ]
[ 30 m² ]  [ Boshqa o‘lcham ]
```

Bot lead'ga `payload` field'iga `raw` qiymatini saqlaydi — keyin debug uchun.

---

## Bot keyingi savol-javob ketma-ketligi (umumiy)

Welcome'dan keyin barcha flow bir umumiy "qisqa intake" ga birikadi:

```
1. Xona turi (agar Template A/D'dan kelgan bo'lsa)
   └─→ Zal / Yotoqxona / Oshxona / Koridor

2. Maydon
   └─→ Number (Reply keyboard yoki manual input)
       Validation: 4 ≤ area ≤ 200

3. Potolok turi
   └─→ Matoviy / Glyans / LED / Premium

4. Qo'shimcha
   └─→ Multi-select (LED liniya / Karniz / Lyustra / Spot)

5. Rasmingiz
   └─→ photo (optional, but encouraged)

6. Hudud / aloqa
   └─→ "Qaysi shahar/tuman?" + opt phone share

7. Yakuniy summary + operator handover
   └─→ "Rahmat! Operatorimiz {expected_time} ichida bog‘lanadi."
```

Template C'dan kelgan mijoz qadamlar 1-4'ni o'tkazib yuboradi (allaqachon tanlangan), darhol qadam 5'ga keladi.

---

## Microcopy do/don't

| ✅ Yaxshi | ❌ Yomon |
|---|---|
| `Xonangiz maydoni necha m²?` | `O'lchov ko'rsatkichini kiriting` |
| `Toza montaj, kafolat bilan` | `Bizning kompaniya yetakchi...` |
| `Rasmingizni yuboring` | `Iltimos, attach feature orqali rasmni ulang` |
| `Operatorimiz 10 daqiqada bog'lanadi` | `Iltimos kuting` |
| `Tanlovingiz tasdiqlandi ✅` | `OK` yoki `Qabul qilindi` |

**Qoida:** bot matnlari **mijozning so'zlari bilan** gapirsin, **rasmiy ish tili emas**.

---

## Operator handover signali

Bot lead to'liq bo'lganda (yoki user `Operator bilan gaplashish`ni tanlasa) — operator chatga notifikatsiya yuboradi:

```
🆕 Yangi lead — lead #142
Source: portfolio
User: @ali_user (Ali Aliyev)
Xona: Zal · 24 m²
Potolok: LED yoritish bilan
Qo'shimcha: LED liniya, Karniz
Taxminiy: 1 050 000 — 1 720 000 so'm
Hudud: Qarshi shahar
Bog'lanish: 09:00–20:00 oralig'ida

[ Olib qo'yish ]  [ O'tkazib yuborish ]
```

Operator `Olib qo'yish` bossa — lead status `contacted` ga o'tadi va boshqa operatorga ko'rinmaydi.

---

## Cheat sheet — qaysi template qaysi paytda

```
parse_start_payload(...)
    │
    ├─ kind == 'source':
    │     ├─ source ∈ {hero, sticky, footer} → Template A
    │     └─ source == 'portfolio'           → Template B
    │
    ├─ kind ∈ {'price', 'price-short'}      → Template C (C.1 yoki C.2)
    │
    └─ kind == 'unknown'                    → Template D
```
