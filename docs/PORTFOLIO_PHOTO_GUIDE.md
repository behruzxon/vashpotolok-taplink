# Portfolio Photo Guide — Real fotosuratlar qo'shish

VashPotolok taplink Portfolio bo'limi real fotosuratlarga tayyor. Hozircha har card abstrakt ceiling render bilan ko'rinadi (gradient + LED line + horizon). Real foto qo'shilsa, render avtomatik almashtiriladi.

> **Phase Bio-Ready conditional render:** agar hech qaysi item'da `image` field bo'lmasa, **Portfolio section butunlay hidden** bo'ladi (`hasRealPortfolioImages` helper orqali). Demo placeholder vibe oldi olinadi.
>
> **Bio-ready threshold:** 1 ta real foto ham section'ni jonlantiradi. Lekin **ideal 4–6 ta** — featured card + 3-5 ta regular card ko'rinishi. 3 ta minimum mijozga “yetarli ish ko'rsatma” taassuroti beradi.

---

## 1. Qanday foto tanlash

**Tavsiya:**
- Bir xonaning to'liq vazn potolok ko'rinishi (yotoqxona, zal, oshxona, koridor).
- Yorug'lik yoqilgan paytda (LED chiroqlar yonib turgan).
- Toza, tartibli holat — montajdan keyingi finish.
- Kompozitsiya markazda, potolok aniq ko'rinadi.

**Qochish kerak:**
- Maxsus mijoz yuzi yoki shaxsiy buyumlar (privacy).
- Past sifat, blurry yoki noise'li rasm.
- Devor reklama yozuvlari.
- Mijoz aniq aytmagan rasmni nashr qilish.

**Mijozdan ruxsat olish:** Har bir foto uchun mijozdan portfolio ko'rinishida ishlatish uchun aniq og'zaki yoki Telegram chat orqali ruxsat oling.

---

## 2. Qanday kesish va o'lcham

| Parametr | Qiymat |
|---|---|
| **Aspect ratio** | `4:3` (gorizontal landscape) — `PortfolioPreview` card aspect-[4/3] |
| **Min o'lcham** | 800 × 600 px |
| **Tavsiya** | 1200 × 900 px (retina/2x ekranlar) |
| **Max** | 1600 × 1200 px (kattaroq — siqishda ortiqcha bayt) |
| **Format** | **WebP** (`.webp`) — eng yaxshi siqish + zamonaviy brauzerlar 100% qo'llab |
| **Sifat** | WebP 80–85% — vizual ravishda lossless, fayl ~80–120 KB |

**Kesish:** Featured card 4:3 (78–82% kenglik), regular card 4:3.2 (60–70%). Universal `4:3` ham mos.

---

## 3. Fayl nomlash konvensiyasi

`public/portfolio/` papkasiga joylashtiring (yo'q bo'lsa yarating):

```
public/
└── portfolio/
    ├── qarshi-zal-led.webp
    ├── yotoqxona-matoviy.webp
    ├── oshxona-glyans.webp
    └── koridor-led.webp
```

**Nomlash qoidasi:**
- `<hudud>-<xona>-<ceiling-turi>.webp`
- Faqat lotin harflar, kichik harf, `-` ajratuvchi
- `.webp` extension

**Misollar:**
- `qarshi-zal-led.webp`
- `qashqadaryo-yotoqxona-satin.webp`
- `qarshi-oshxona-glyans.webp`

---

## 4. `data/portfolio.ts` ichida ulash

Har item uchun `image` field qo'shing. Boshqa fieldlar (`title`, `location`, `areaM2`, `serviceType`, `result`, `gradient`, `tags`, `featured`) saqlanadi.

**Avval (abstrakt render):**
```ts
{
  id: 'zal-led-24',
  title: 'Zal uchun LED natijnoy potolok',
  location: 'Qarshi',
  areaM2: 24,
  serviceType: 'LED yoritish + natijnoy potolok',
  result: 'Xona yorug‘ligi va ko‘rinishi premium darajaga chiqdi.',
  gradient: 'radial-gradient(...)',
  tags: ['zal', 'led', 'premium'],
  featured: true,
},
```

**Foto qo'shilgach:**
```ts
{
  id: 'zal-led-24',
  title: 'Zal uchun LED natijnoy potolok',
  location: 'Qarshi',
  areaM2: 24,
  serviceType: 'LED yoritish + natijnoy potolok',
  result: 'Xona yorug‘ligi va ko‘rinishi premium darajaga chiqdi.',
  gradient: 'radial-gradient(...)',  // fallback uchun saqlang
  image: '/portfolio/qarshi-zal-led.webp',  // ← yangi
  tags: ['zal', 'led', 'premium'],
  featured: true,
},
```

`gradient` saqlanadi — kelajakda `image` o'chirilsa avtomatik fallback ishlatiladi.

---

## 5. Fallback mexanikasi

`src/components/portfolio-preview.tsx` ichidagi `PortfolioCard` logikasi:

```tsx
{item.image ? (
  <img src={item.image} alt="..." loading="lazy" ... />
) : (
  <RenderPlaceholder gradient={item.gradient} />
)}
```

- `image` mavjud bo'lsa: native `<img>` lazy yuklanadi.
- `image` undefined bo'lsa: 3D-like abstrakt render (ceiling panel + LED + horizon + perspective gradient) ishlatiladi.

> **Phase 2.5 ROADMAP:** real foto kelganda `<img>` `next/image` ga ko'chirilishi kerak (`<Image>` + responsive sizes + automatic WebP/AVIF). Hozir native `<img>` ishlatiladi va `eslint-disable @next/next/no-img-element` bilan belgilangan.

---

## 6. Workflow (mijoz ruxsatidan deploy'gacha)

1. **Mijozdan ruxsat ol** — Telegram chatda yozma tasdiq (screenshot saqlang).
2. **Foto tayyorla:**
   - Asl rasmni 1200×900 yoki 1600×1200 ga kesib oling (4:3).
   - WebP'ga aylantiring (online: `squoosh.app`, CLI: `cwebp -q 82 input.jpg -o output.webp`).
   - Fayl hajmi 80–120 KB oralig'ida bo'lishini tekshiring.
3. **Faylni joylashtir:** `public/portfolio/qarshi-zal-led.webp` (yoki tegishli nom).
4. **`data/portfolio.ts`** ichida tegishli item'ga `image` qo'shing.
5. **Lokalda tekshir:**
   - `npm run dev`
   - `http://localhost:3000` da Portfolio bo'limi ochiladi → rasm chiqadi.
   - Mobil ekranda ham (DevTools 375×812) toza ko'rinishini tekshir.
6. **Build:**
   - `npm run typecheck && npm run lint && npm run build`
   - First Load JS o'sgani — odatda 0 KB (rasmlar JS bundle'ga kirmaydi).
7. **Deploy:** `git push` → Vercel avtomatik.

---

## 7. Privacy va huquq

- **Mijoz yuzi yoki shaxsiy buyumi ko'rinmasin.** Agar ko'rinsa — yo'q yoki blur qiling.
- **Mijoz ruxsati har bir foto uchun alohida** olinadi (umumiy ruxsat emas).
- **Bola yoki yosh oilaviy a'zo ko'rinmasin** — extra ehtiyot.
- Mijoz ruxsatni qaytarib olishi mumkin — bu paytda foto darhol olib tashlanadi (`data/portfolio.ts` dan o'chirish + `public/portfolio/` dan ham).

---

## 8. Quick reference

| Action | Joy |
|---|---|
| Foto fayli | `public/portfolio/<nom>.webp` |
| Item config | `src/data/portfolio.ts` → `image` field |
| Render mexanikasi | `src/components/portfolio-preview.tsx` → `PortfolioCard` |
| Abstrakt fallback | `RenderPlaceholder` (gradient + LED + horizon) |
| Next.js Image migration (Phase 2.5) | [`ROADMAP.md`](./ROADMAP.md) §Phase 2.5 |
