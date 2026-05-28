# Deploy Checklist — VashPotolok taplink

Production deploy uchun yagona to'liq qo'llanma. Birinchi deploy paytida — har bandni navbati bilan tekshiring. Keyingi deploy'larda (narx o'zgartirish, content polish) — faqat **§5 Post-deploy smoke test**'ni qayta o'tkazing.

---

## 1. Pre-deploy checklist (lokalda)

Quyidagilarni mahalliy mashinangizda tekshiring:

- [ ] `git status` — uncommitted o'zgarishlar yo'q (yoki commit qilingan)
- [ ] `npm install` — fresh `node_modules`
- [ ] `npm run typecheck` → `✓ no errors`
- [ ] `npm run lint` → `✓ No ESLint warnings or errors`
- [ ] `npm run build` → `✓ Compiled successfully` + 7 ta static page (`○`) + `/opengraph-image` (`ƒ` dynamic)
- [ ] `npm run start` orqali production build mahalliy 3000 portda ishlaydi
- [ ] **Browser**: `http://localhost:3000` to'liq sahifa render bo'ladi
- [ ] **Browser**: `http://localhost:3000/opengraph-image` PNG qaytaradi
- [ ] **Browser**: `http://localhost:3000/icon.svg` brand favicon ko'rinadi
- [ ] **Browser**: `http://localhost:3000/sitemap.xml` to'g'ri URL bilan XML
- [ ] **Browser**: `http://localhost:3000/robots.txt` allow + sitemap pointer

### Kontent tekshiruv

- [ ] `src/data/links.ts` — barcha URL'lar to'g'ri:
  - `telegramBot` (`?start=hero` bilan)
  - `telegramProfile`
  - `instagram`
  - `phone` (`tel:` bilan)
  - `phoneDisplay` (`90 886 66 66` formati)
- [ ] `src/data/price-options.ts` — joriy narxlar bozor uchun adekvat
- [ ] `src/data/portfolio.ts` — gradient yoki real image
- [ ] `docs/PRO_CALCULATOR_SPEC.md` §8.5 manual sanity check — 4 ta misol mantiqiy chiqadi

---

## 2. Vercel deploy qadamlari

### 2.1 Birinchi marta

1. **GitHub** repo'siga push qiling (`main` yoki kerakli branch):
   ```bash
   git add -A
   git commit -m "deploy: phase 4 ready"
   git push origin main
   ```
2. [vercel.com](https://vercel.com) → **Add New → Project**
3. **Import** GitHub repo (`yourname/vashpotolok-taplink`)
4. Framework Preset: **Next.js** (avtomatik aniqlanadi)
5. Build Command: `npm run build` (default — o'zgartirmang)
6. Output Directory: `.next` (default)
7. **Environment Variables** bo'limini oching va qo'shing:
   | Key | Value |
   |---|---|
   | `NEXT_PUBLIC_SITE_URL` | `https://vashpotolok.uz` (yoki birinchi deploy uchun Vercel preview URL) |
8. **Deploy** tugmasini bosing
9. Build vaqti ~1–2 daqiqa
10. Build tugagach — preview URL (`https://vashpotolok-taplink-xxx.vercel.app`) oching va §5 smoke test'ni o'tkazing

### 2.2 Keyingi deploy

`git push` qilsangiz — Vercel avtomatik build qiladi. Hech qanday manual qadam kerak emas.

---

## 3. Custom domain ulash (`vashpotolok.uz`)

### 3.1 Domain Vercel'da

1. Vercel Project → **Settings** → **Domains**
2. `vashpotolok.uz` ni yozing → **Add**
3. Vercel sizga DNS yo'riqnomasini chiqaradi (ikkita variant):
   - **A record:** `76.76.21.21`
   - **CNAME:** `cname.vercel-dns.com`

### 3.2 DNS provider tomonida

`vashpotolok.uz` registratoringizda (Uzbekistan registrar yoki Cloudflare):

- **Variant A — A record (root domain uchun):**
  ```
  Type: A
  Name: @  (yoki bo'sh — root)
  Value: 76.76.21.21
  TTL: 3600
  ```

- **Variant B — CNAME (`www.` uchun yoki Cloudflare orqali):**
  ```
  Type: CNAME
  Name: www
  Value: cname.vercel-dns.com
  TTL: 3600
  ```

Root domain'ga ham `www`'ga ham bog'lash — ikkalasini ham qo'shing va Vercel'da `www → root` redirect'ni yoqing (default).

### 3.3 DNS tekshiruv

DNS o'zgarishlari 5 daqiqadan 24 soatgacha tarqaladi. Tekshirish:

```bash
nslookup vashpotolok.uz
# yoki
dig vashpotolok.uz
```

Vercel'da Domains bo'limida `✓ Valid Configuration` chiqishini kuting.

### 3.4 SSL/HTTPS

Vercel avtomatik **Let's Encrypt** sertifikat chiqaradi. Hech qanday qo'shimcha qadam kerak emas. ~5 daqiqada faollashadi.

---

## 4. Post-deploy Environment update

Domain ulanganidan keyin:

1. Vercel Project → **Settings** → **Environment Variables**
2. `NEXT_PUBLIC_SITE_URL` qiymatini yangilang: `https://vashpotolok.uz` (preview URL emas)
3. **Redeploy** (Deployments → latest → **Redeploy**)

Bu OG image va sitemap real domen bilan generate bo'lishi uchun zarur.

---

## 5. Post-deploy smoke test

Production URL'da bularni manual tekshiring:

### 5.1 Asosiy sahifa

| # | Test | Kutilgan natija |
|---|---|---|
| 1 | `https://vashpotolok.uz/` ochiladi | Hero + 5 CTA + Pro Calculator + Trust + Portfolio + Process + Footer + Sticky CTA |
| 2 | Mobile (375×812) ko'rinish | Hero kichik, CTA'lar baland, sticky CTA pastda |
| 3 | Desktop (1440×900) | Markazda 480px column, atrofda hero glow |
| 4 | Reload (Ctrl+Shift+R) | Bug yo'q, animatsiyalar ishlaydi |

### 5.2 CTA'lar

| # | Test | Kutilgan natija |
|---|---|---|
| 5 | Hero "📲 Telegram bot orqali hisoblash" bosildi | Telegram bot ochiladi: `https://t.me/vashpotolokbot?start=hero` |
| 6 | "📞 Qo'ng'iroq qilish" bosildi | Telefon dialer ochiladi (`+998908866666`) |
| 7 | "💬 Telegramda yozish" bosildi | Telegram profil ochiladi: `https://t.me/vashpotolok` |
| 8 | "📸 Instagram profil" bosildi | Instagram profil yangi tab'da: `https://instagram.com/vashpotolok` |
| 9 | Sticky CTA "Telegram bot" bosildi | Bot ochiladi: `?start=sticky` |
| 10 | Sticky CTA telefon (yashil) bosildi | Dialer ochiladi |
| 11 | Footer phone bosildi | Dialer ochiladi |

### 5.3 Pro Calculator (asosiy oqim)

| # | Test | Kutilgan natija |
|---|---|---|
| 12 | Scroll → Pro Calculator ko'rinadi | "1/6 · Qaysi xona uchun..." |
| 13 | **Step 1 — Room:** Zal tanlandi | Brand-glow ring, "Davom etish" enabled |
| 14 | **Step 2 — Size dimensions:** length=6, width=4 | Live preview: 24 m², perimeter 20 m |
| 15 | **Step 3 — Ceiling:** LED yoritish bilan tanlandi | Brand glow, Davom enabled |
| 16 | **Step 4 — Addons:** LED liniya 6, Karniz 4, Lyustra 1 | Quantity controls ishlaydi, brand glow active'larda |
| 17 | **Step 5 — District:** Qarshi tanlandi | "Bepul" badge, Davom enabled |
| 18 | **Step 6 — Confirm:** "Hisobni ko'rish" bosildi | Result step ochiladi |
| 19 | **Result:** total range ~`2 092 000 — 3 168 000 so'm` | Invoice breakdown 4 qator (base + LED liniya + Karniz + Lyustra) |
| 20 | Result CTA "Aniq narxni Telegramda olish" bosildi | Bot ochiladi: `?start=pro_zal_24_led_qarshi_3a` |
| 21 | "Qayta hisoblash" bosildi | Step 1'ga qaytadi, hamma state reset |

### 5.4 Pro Calculator (alternativ holatlar)

| # | Test | Kutilgan natija |
|---|---|---|
| 22 | **Area-only mode:** Step 2 toggle, area=18 | Live perimeter ~16.97 m, Davom enabled |
| 23 | **0 addon:** Step 4 hammasi 0 (lyustra ham 0) | Step 5 → 6 → Result: breakdown faqat base + travel (agar bo'lsa) |
| 24 | **Area > 80:** Step 2 area=100 | Inline warning "6–80 m² oralig'ida", Davom disabled |
| 25 | **Comma decimal:** length=`3,5`, width=`4` | 14 m² (parsing ishlaydi) |
| 26 | **Far district + premium:** Step 5 Uzoq hudud | Result'da "Yo'l/hudud" qatori 200k–400k |
| 27 | **Back nav:** Step 4 → 3 → 2 | State saqlanadi, qaytadan kirgan paytda old tanlovlar bor |

### 5.5 SEO tekshiruv

| # | Test | Kutilgan natija |
|---|---|---|
| 28 | `/sitemap.xml` ochildi | XML, `<loc>https://vashpotolok.uz</loc>` |
| 29 | `/robots.txt` ochildi | `User-agent: *` + `Allow: /` + `Sitemap: ...` |
| 30 | `/opengraph-image` ochildi | 1200×630 PNG (brand background + VASH POTOLOK matn) |
| 31 | `/icon.svg` ochildi | Brand-blue VP monogram |
| 32 | View Source (Ctrl+U) `<title>` | `VashPotolok — Qashqadaryoda натяжной потолок` |
| 33 | View Source `<meta name="description">` | "Qashqadaryo va Qarshi bo'ylab..." |
| 34 | View Source `<meta property="og:title">` | "VashPotolok — натяжной потолок Қашқадарё бўйлаб" |
| 35 | View Source `<script type="application/ld+json">` | LocalBusiness JSON-LD, telephone `+998908866666` |
| 36 | OG preview test: https://www.opengraph.xyz/url/https%3A%2F%2Fvashpotolok.uz | Brand OG image ko'rinadi |
| 37 | Google Rich Results test: https://search.google.com/test/rich-results | LocalBusiness markup tasdiqlanadi |

### 5.6 Performance

| # | Test | Kutilgan natija |
|---|---|---|
| 38 | Lighthouse mobile (Chrome DevTools) | Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO 100 |
| 39 | First Load JS (build output'da) | ~98.7 kB (qabul qilingan oraliq) |
| 40 | LCP (Lighthouse) | < 2.0s |
| 41 | CLS (Lighthouse) | < 0.05 |

---

## 6. Instagram bio update

Deploy tasdiqlangach:

1. Instagram → **Profil** → **Edit profile**
2. **Website** maydoniga `https://vashpotolok.uz` (yoki preview URL)
3. **Bio** matni (tavsiya):
   ```
   VASH POTOLOK | Qashqadaryo
   Натяжной потолок · LED · Montaj
   Narx hisoblash va buyurtma ↓
   ```
4. **Done**

Story / postlarda ham link sticker → `https://vashpotolok.uz`.

---

## 7. Rollback plan

Agar deploy'dan keyin bug paydo bo'lsa:

### Vercel built-in rollback

1. Vercel Project → **Deployments**
2. Avvalgi ishlaydigan deploy'ni toping (yashil ✓)
3. **⋯** menyu → **Promote to Production**
4. ~10 soniyada production rollback bo'ladi

### Git rollback

```bash
git revert HEAD                    # oxirgi commit'ni qaytarish
git push origin main
```

Vercel avtomatik yangi build qiladi (~1–2 daqiqa).

### Emergency: maintenance mode

Agar to'liq down qilish kerak bo'lsa:

1. Vercel Project → **Settings** → **General** → **Pause Deployments**

Yoki DNS'da `vashpotolok.uz` ni Vercel'dan static "Texnik ish ketmoqda" sahifaga o'tkazish.

---

## 8. Bo'lim referans

| Mavzu | Hujjat |
|---|---|
| Narxlarni o'zgartirish | [`PRO_CALCULATOR_SPEC.md`](./PRO_CALCULATOR_SPEC.md) §8 |
| Linklarni o'zgartirish | `src/data/links.ts` |
| SEO metadata | [`SEO_AND_ANALYTICS.md`](./SEO_AND_ANALYTICS.md) |
| Bot integration | [`TELEGRAM_BOT_INTEGRATION.md`](./TELEGRAM_BOT_INTEGRATION.md) |
| Komponent tree | [`COMPONENT_ARCHITECTURE.md`](./COMPONENT_ARCHITECTURE.md) |
| Phase tarixi | [`ROADMAP.md`](./ROADMAP.md) |
