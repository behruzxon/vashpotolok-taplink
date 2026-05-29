# VashPotolok — User Flow

## 1. Asosiy entry point

```
Instagram bio
    └─→ taplink (https://vashpotolok.uz)
            └─→ Mini-landing (5–10s decision window)
```

Mijoz **mobile telefonda**, **Instagram in-app browser**'da ochadi. Bu degani:

- iframe / pop-up cheklovlar bor
- Deep link (`tg://`, `tel:`) bilan ehtiyot bo'lish kerak
- Bundle hajmi muhim (mobil internet)

## 2. 5-soniyalik qaror flow

```
0–1s:   Hero ko'rinadi → brendni eslab qoladi
1–2s:   Sub-title o'qiydi → xizmatni tushunadi
2–3s:   Primary CTA'ni ko'radi (Telegram bot)
3–5s:   Skroll qiladi yoki tugmani bosadi
```

Agar 5 soniyada **birorta CTA ko'rinmasa** — mijoz ketadi.

**Yechim:**
- Hero **kichik bo'lsin**: max 60% viewport.
- Birinchi CTA — fold ostidan boshlanmaydi, hero ostida darhol.
- Sticky CTA — 25% skroll'dan keyin doim ko'rinib turadi.

## 3. CTA prioriteti

### Vizual prioritet (yuqoridan pastga):

```
[Hero]
[1. 📲 Telegram bot orqali hisoblash]   ← Primary (gradient + glow)
[2. 📞 Qo'ng'iroq qilish]                ← Secondary (green)
[3. 💬 Telegramda yozish]                ← Tertiary (telegram blue)
[Price Estimate Card]                    ← Engagement
[Services Grid]                          ← Trust building
[Trust Badges]                            ← Reassurance
[Portfolio]                               ← Social proof
[Process Steps]                           ← Clarity
[4. 🖼 Ishlarimizni ko'rish]              ← Soft CTA
[5. 📸 Instagram profil]                  ← Recall CTA
[Footer phone]                            ← Last-chance
[Sticky CTA (Telegram bot + Phone)]      ← Always visible
```

### Sabab:
1. **Telegram bot** birinchi — chunki:
   - Eng past friction (chat ochadi, javob avtomatik)
   - Lead avtomatik saqlanadi (botda)
   - Mijoz uyalmaydi (chat — telefon emas)
2. **Qo'ng'iroq** ikkinchi — chunki 45+ segment uchun afzal.
3. **Telegram chat** uchinchi — operator bilan jonli savol-javob.

## 4. Flow: Telegram bot CTA → Bot

```
User taps "📲 Telegram bot orqali hisoblash"
    └─→ analytics.track("click_telegram_bot")
        └─→ window.location = "https://t.me/vashpotolokbot?start=taplink"
            └─→ Telegram app/web ochiladi
                └─→ Bot avtomatik welcome + "1-savol: xona maydoni"
```

`?start=taplink` — bot lead source'ni biladi (attribution).

## 5. Flow: Qo'ng'iroq

```
User taps "📞 Qo'ng'iroq qilish"
    └─→ analytics.track("click_call")
        └─→ window.location = "tel:+998908866666"
            └─→ Telefon dialer ochiladi
                └─→ Raqam to'ldirilgan, user "yashil" tugma bossa qo'ng'iroq ketadi
```

## 6. Flow: Telegram chat

```
User taps "💬 Telegramda yozish"
    └─→ analytics.track("click_telegram_profile")
        └─→ window.location = "https://t.me/vashpotolok"
            └─→ Telegram'da operator profili ochiladi
                └─→ User salom yozadi, operator javob beradi
```

## 7. Flow: Portfolio

```
User taps "🖼 Ishlarimizni ko'rish"  (yoki portfolio'ga skroll)
    └─→ analytics.track("click_portfolio")
        └─→ Portfolio carousel ko'rinadi
            └─→ Tap'da modal/lightbox (Phase 2)
                └─→ Modal ichida CTA: "Shunaqa qilamiz" → Telegram bot
```

Phase 1'da — placeholder gradient cards. Phase 2'da — real photo'lar.

## 8. Flow: Pro kalkulyator (Phase 3.5 — 6-step professional)

Endi narx kalkulyatori **6 qadamli professional kalkulyator**. Mijoz har bosqichda aniq ma'lumot beradi, oxirida invoice ko'rinishida breakdown chiqadi.

```
User scrolls to PriceEstimateCard
    └─→ Mount: track("pro_calculator_started")
        └─→ Header: "1/4 · Qaysi xona uchun?"
            ↓
[Step 1 — Room]   2×2 icon card grid
    Zal · Yotoqxona · Oshxona · Koridor
        └─→ tap → trackEvent("pro_room_selected")
            └─→ "Davom etish" yoniq → track("pro_calculator_step_changed")
            ↓
[Step 2 — Size]   Toggle: "Uzunlik × eni" / "Faqat m²"
    Dimensions mode: length input + width input → live area & perimeter
    Area mode:       area input → taxminiy perimeter
    Validation:      6 ≤ area ≤ 80 (inline warning)
        └─→ Davom → track("pro_calculator_dimension_entered", { mode, lengthM, widthM, areaM2 })
            ↓
[Step 3 — Ceiling]   Radio list + premium badge
    Matoviy (Standard) · Glyans (Comfort) · Satin (Comfort) · LED (Premium) · Premium dizayn (Premium)
        └─→ tap → trackEvent("pro_ceiling_selected")
            ↓
[Step 4 — Addons]   6 ta QuantityControl (multi-quantity)
    LED liniya (m) · Karniz (m) · Lyustra (dona) ·
    Spot (dona) · Truba obxod (dona) · Murakkab burchak (dona)
        └─→ −/+ → track("pro_calculator_addon_changed", { id, qty, unit })
            ↓
[Step 5 — District]   Radio list
    Qarshi (Bepul) · Qashqadaryo tumani · Uzoqroq hudud
        └─→ tap → trackEvent("pro_district_selected")
            ↓
[Step 6 — Confirm]   Summary preview + "Hisobni ko‘rish"
        └─→ track("pro_calculator_step_changed", { to: "result" })
        └─→ track("pro_calculator_completed", { roomTypeId, areaM2, ceilingTypeId, districtId, addonCount, totalMin, totalMax })
            ↓
[Result]
    ┌────────────────────────────────────────────┐
    │ Taxminiy diapazon                          │
    │ 1 742 000 — 2 708 000 so‘m                 │
    │ 24 m² · perimetr 20 m                      │
    ├────────────────────────────────────────────┤
    │ Xona:      ✨ Zal                          │
    │ Maydon:    24 m²                           │
    │ Potolok:   LED yoritish bilan              │
    │ Qo‘shimcha: LED liniya (6 m), Karniz (4 m) │
    │ Hudud:     Qarshi                          │
    ├────────────────────────────────────────────┤
    │ Polotno + montaj · LED   1 512 000 — 2 268 000 │
    │ LED liniya · 6 m           390 000 —   570 000 │
    │ Karniz · 4 m               140 000 —   240 000 │
    │ Lyustra joyi · 1 dona       50 000 —    90 000 │
    └────────────────────────────────────────────┘
    Disclaimer: "Bu taxminiy hisob. Aniq narx xona holati,
                 material, yoritish turi va o‘lchovdan keyin belgilanadi."

    [ 📲  Aniq narxni Telegramda olish ]    ← Primary CTA
    "Qayta hisoblash"                         ← restart
        └─→ track("click_pro_calculator_telegram", { payload, totalMin, totalMax })
        └─→ track("click_telegram_bot", { source: "price" })
        └─→ Telegram bot ochiladi:
            /start pro_zal_24_led_qarshi_3a
                └─→ Bot mijozni allaqachon biladi (Phase 4.5'da implement)
                    └─→ Welcome'da summary tasdiqlash + faqat rasm/hudud so‘rovi
```

**Muhim:**
- Har bosqichda **2–4 ta variant** — qaror og'ir bo'lmasin.
- "Davom etish" tugmasi tanlov yo'q bo'lsa **disabled** ko'rsatiladi (visual feedback).
- "Back" har doim mavjud (1-step bundan mustasno).
- Final'dan "Tanlovni o'zgartirish" link orqali 1-stepga qaytish mumkin (state saqlanadi).
- Disclaimer doim ko'rinadi — "taxminiy" so'zi vizual ravishda alohida emas, lekin matnda aniq turadi.
- Payload bot tomonida parslangach — mijozdan **qaytadan so'ramaydi**, faqat tasdiq yoki to'ldiruvchi (rasm, xona holati) savol beradi.

## 9. Flow: Instagram qaytish

```
User taps "📸 Instagram profil"
    └─→ analytics.track("click_instagram")
        └─→ window.location = "https://instagram.com/vashpotolok"
```

## 10. Sticky CTA flow

```
User scrolls 25% of page
    └─→ Sticky CTA reveal (translateY 120% → 0%, 400ms spring)
        └─→ Har doim ko'rinadi:
            - [📲 Hisoblash] (primary, asosiy joy)
            - [📞] (icon-only, kompakt)
        └─→ User istalgan paytda bos olishi mumkin
```

## 11. Ishonch oshirish flow

Mijoz birinchi CTA'ni bossa — ajoyib. Bosmasa, skroll qiladi va:

```
Services → "Aha, bularning hammasini qiladi"
    └─→ Trust → "Toza, sifatli, kafolat. OK."
        └─→ Portfolio → "Vau, chiroyli ishlar"
            └─→ Process → "Tushunarli, 5 qadam"
                └─→ Footer CTA / Sticky CTA → bosadi
```

## 12. Edge cases

| Holat | Yechim |
|---|---|
| Telegram o'rnatilmagan | Telegram web app fallback (`t.me/...` o'zi handles) |
| iOS Safari'da `tel:` blok | Tugma `<a href="tel:...">` — Safari `+` belgisini taniydi |
| Slow 3G | Skeleton yo'q, faqat CSS-only effects, no heavy JS |
| `prefers-reduced-motion` | Barcha animatsiyalar o'chadi |
| Light mode user preference | Dizayn dark — ignore (brendlangan tajriba) |
| Landscape mobile | Hero kichikroq, sticky CTA pastda saqlanadi |

## 8b. Pro Calculator natijasini mijozga tushuntirish (Phase 3.6)

Mijoz Result step'ni ko'rganda yoki operator bilan suhbatda **uchta** nuqta aniq bo'lishi shart. Bu sotuv flow'i va mijoz ishonchini saqlash uchun standart skript:

### 1) "Range" nima uchun

> "Kalkulyatorda **min — max range** ko'rsatdik, chunki har bir xona alohida. Material brendi, devor egriligi, deraza joyi, eski potolok holati — bularning hammasi narxga ta'sir qiladi. Sizning xonangiz uchun **aniq narxni** usta o'lchov olib kelgandan keyin aytamiz."

### 2) Disclaimer aldov emas

> "Bu yerda yashirin to'lov yo'q. Min — siz tanlagan parametrlar uchun **yaxshi material va oddiy holatda** chiqadigan narx. Max — agar material premium yoki ish qiyinroq bo'lsa. Aniq raqam shu ikkisi orasida bo'ladi."

### 3) Keyingi qadam

> "Endi bizga **xonangiz rasmini yuboring** (eski potolok, deraza, lyustra joyi ko'rinsin) va **hududingizni** ayting. Usta sizga 1–2 kun ichida qulay vaqtda kelib aniq o'lchov oladi. **Bepul.**"

### Operator do/don't

| ✅ Yaxshi | ❌ Yomon |
|---|---|
| "Sizning xonangiz uchun taxminiy 1.5M atrofida chiqishi mumkin" | "Aniq 1 200 000 so'm" (yolg'on aniqlik) |
| "Aniq narxni o'lchovdan keyin aytamiz" | "Hisob mashinada chiqqan narx — shu" |
| "Material va yoritishga qarab farq qiladi" | "Hammasi standart, farqi yo'q" |
| "Usta kelishi va o'lchov bepul" | (so'rashsa "bepul" so'zini aytmaslik) |

### Disclaimer text source

Result step ekrandagi matn:

> "Bu hisob taxminiy. Aniq narx o'lchov, xona holati, material turi, yoritish va montaj murakkabligiga qarab belgilanadi."

Operator shu matnni so'zma-so'z takrorlash shart emas — yuqoridagi 3-nuqtali skript ancha samarali. Lekin disclaimer'ni **inkor etmaslik** kerak — mijoz uni ekranda ko'rgan, agar operator "yo'q, aniq shu narx" desa — ishonch yo'qoladi.

---

## 12b. Telegram botga o'tgandan keyingi flow (Phase 4 kontrakti)

Mijoz CTA bossa, Telegram bot ochiladi va `/start <payload>` qabul qilinadi. Bot **payloadga qarab har xil welcome** ko'rsatadi.

### Routing matritsa

| Payload | Parser natija | Bot template |
|---|---|---|
| `hero` | `kind=source, source=hero` | **A** — Generic welcome |
| `sticky` | `kind=source, source=sticky` | **A** — Generic (variant) |
| `footer` | `kind=source, source=footer` | **A** — Generic (variant) |
| `portfolio` | `kind=source, source=portfolio` | **B** — Portfolio welcome |
| `price_zal_24_led_led-line-karniz` | `kind=price, room=zal, area=24, ceiling=led, addons=[led-line, karniz]` | **C** — Price summary |
| `price_yotoqxona_60_premium_4a` | `kind=price-short, room=yotoqxona, area=60, ceiling=premium, addon_count=4` | **C** — Price summary (qisqa) |
| `someinvalidstring` | `kind=unknown` | **D** — Fallback welcome |

### Flow: Source CTA → bot (Template A)

```
User taps hero/sticky/footer CTA
    └─→ Telegram ochiladi /start hero
        └─→ Bot: Template A welcome
            └─→ "Xonangiz maydoni necha m²?"
                └─→ User: "18 m²"
                    └─→ Bot intake: xona / potolok / addon / rasm / hudud
                        └─→ Lead saqlanadi (Sheets)
                            └─→ Operator notify
                                └─→ Operator bog'lanadi (telefon yoki chat)
```

### Flow: Portfolio → bot (Template B)

```
User taps portfolio card CTA
    └─→ Telegram /start portfolio
        └─→ Bot: Template B (portfolio welcome)
            └─→ "Qaysi xona uchun kerak?"
                └─→ User tanlaydi
                    └─→ Intake davom etadi
```

### Flow: Price funnel → bot (Template C) — eng qisqa intake

Bu — eng ko'p ma'lumotni olib boruvchi flow. Mijoz frontend'da 4 qadam o'tgan, bot allaqachon biladi:

```
User completes price funnel + taps "Aniq narxni botda hisoblatish"
    └─→ Telegram /start price_zal_24_led_led-line-karniz
        └─→ Bot: parse_start_payload
            └─→ Template C summary:
                ┌──────────────────────────────────────┐
                │ Tanlovlaringiz:                      │
                │ Xona: Zal                            │
                │ Maydon: 24 m²                        │
                │ Potolok: LED yoritish bilan          │
                │ Qo'shimcha: LED liniya, Karniz       │
                │                                      │
                │ Taxminiy range:                      │
                │ 1 742 000 — 2 708 000 so'm           │
                │                                      │
                │ Aniq narx uchun 2 ta ma'lumot kerak: │
                │ 1) Xonangiz rasmini yuboring         │
                │ 2) Qaysi hududdasiz?                 │
                └──────────────────────────────────────┘
            └─→ User rasm yuboradi
                └─→ User "Qarshi shahar, Mustaqillik 12"
                    └─→ Bot: "Rahmat! Operator 10 daqiqada bog'lanadi."
                        └─→ Lead (Sheets) status=new + operator notify
                            └─→ Operator bog'lanadi
```

### Flow: Unknown payload → bot (Template D)

Eski yoki noto'g'ri payload (masalan eski deploy URL'si bookmark qilingan):

```
Eski/noto'g'ri payload (e.g., "price_old_format_xyz")
    └─→ Telegram /start ...
        └─→ Bot: kind=unknown
            └─→ Template D (Template A bilan o'xshash welcome)
                └─→ Intake to'liq boshidan
                    └─→ Lead `payload` field'da raw qiymat qoladi (debug uchun)
```

### Lead status sikli

```
new (bot avtomatik)
  ↓ operator notify
contacted (operator yozdi/qo'ng'iroq qildi)
  ↓ kelishilgan kun
measured (usta kelib o'lchov oldi)
  ↓ aniq taklif yuborildi
[closed_won]  yoki  [closed_lost]
```

Phase 4.5'da bot ichida operator komandalar: `/lead 142 status measured`.

### To'liq integratsiya hujjati

- Payload kontrakti: [`TELEGRAM_BOT_INTEGRATION.md`](./TELEGRAM_BOT_INTEGRATION.md)
- Message shabloni: [`TELEGRAM_BOT_MESSAGES.md`](./TELEGRAM_BOT_MESSAGES.md)
- Python parser: [`examples/telegram_payload_parser.py`](./examples/telegram_payload_parser.py)

---

## 13. Funnel metrics (analytics ham bog'liq)

Har bir bosqichni o'lchaymiz:

```
View → 100%
└─ Hero scroll past → 80%
   └─ See primary CTA → 70%
      ├─ Click Telegram bot → 25%   ← KPI
      ├─ Click Phone → 8%            ← KPI
      └─ Click Telegram chat → 5%
   └─ Scroll to Portfolio → 40%      ← Engagement
   └─ Interact with PriceCard → 15%  ← Engagement
```

Bu Phase 5 (analytics)'da implement bo'ladi.
