# Videos & Testimonials Guide — Phase Trust-1

VashPotolok taplink Phase Trust-1 ikkita yangi trust bo'limini qo'shdi:
- **VideoShowcase** — Reels va qisqa video ishlar.
- **TestimonialsSection** — mijoz fikrlari (xavfsiz copy).

Hozircha real video fayllar yo'q — UI Instagram Reels link orqali ishlaydi va thumbnail bo'lmaganda **abstrakt LED ceiling fallback** ko'rsatadi.

---

## 1. Tezkor jadval

| Element | Joy |
|---|---|
| Video data | `src/data/videos.ts` |
| Testimonial data | `src/data/testimonials.ts` |
| Video komponent | `src/components/video-showcase.tsx` |
| Testimonial komponent | `src/components/testimonials-section.tsx` |
| Sahifa flow | `src/app/page.tsx` |
| Analytics taksonomiyasi | `src/lib/analytics.ts` (`click_video`, `click_instagram` `source: 'video'`, `click_telegram_bot` `source: 'trust'`) |

---

## 2. Qanday video tanlash

**Tavsiya:**
- Reels formatda **15–30 soniya** uzunlikda — qisqa, dinamik.
- **Vertikal yoki 4:3** (vertikal Reels'da 9:16 originalmiz, lekin taplinkda thumbnail 4:3 — Reels'ga link bilan ochiladi).
- **Tabiiy yorug'lik + ishlangan LED** ko'rinishi.
- Mijoz aniq ruxsat bergan — chat screenshot saqlangan.
- Mijoz yuzi yoki shaxsiy buyumi ko'rinmasin.

**Qochish kerak:**
- Tashqi reklama belgilari (boshqa firma logosi).
- Past sifat, qaltirayotgan kamera.
- 1 daqiqadan uzun video (Reels uchun emas).
- Mijoz ruxsati yo'q bo'lgan kontent.

---

## 3. Thumbnail tayyorlash (ixtiyoriy — fallback ham chiroyli)

Agar `data/videos.ts` ichida `thumbnail` field qoldirilsa — komponent abstrakt LED ceiling fallback'ni avtomatik ko'rsatadi. Demo'ga yetadi.

Agar real thumbnail kerak bo'lsa:

| Parametr | Qiymat |
|---|---|
| Aspect ratio | `4:3` (gorizontal landscape) |
| Min o'lcham | 800 × 600 px |
| Tavsiya | 1200 × 900 px |
| Format | **WebP** (`.webp`) 80–85% sifat |
| Hajm | 80–120 KB |
| Joy | `public/videos/thumbnails/<id>.webp` |

Misol:

```ts
{
  id: 'zal-led-qarshi',
  thumbnail: '/videos/thumbnails/zal-led-qarshi.webp',
  ...
}
```

---

## 4. Reels link ulash

Real Instagram Reels link `data/videos.ts` ichida `instagramUrl` field'iga yoziladi:

```ts
{
  id: 'zal-led-qarshi',
  instagramUrl: 'https://www.instagram.com/reel/<reel-id>/',
  duration: '0:18',
  ...
}
```

CTA tugmasi `instagramUrl` mavjud bo'lsa avtomatik unga yo'naltiradi (`target="_blank" rel="noopener noreferrer"`) va `click_video { destination: 'instagram' }` + `click_instagram { source: 'video' }` analytics yuboradi.

Agar `videoUrl` qo'shilsa (direct MP4 hosting), kelajakda modal player implement qilinishi mumkin. Hozir oddiy external link sifatida ochiladi.

---

## 5. Testimonial copy qoidalari

### Real ismlar qoidasi

**Fake ism ishlatma.** Agar mijozdan yozma ruxsat (Telegram chat screenshot saqlanagan) bo'lmasa:
- `customerLabel` faqat **joy + xona turi**: `"Qarshi · Zal"`, `"Qashqadaryo · Yotoqxona"`.

Agar mijoz ruxsat bersa:
- `customerLabel` ga ism qo'shish mumkin: `"Sherzod · Qarshi · Zal"`.
- Bola yoki yosh oilaviy a'zoga tegishli emas.

### Quote yozish

**Yumshoq, professional, ortiqcha emas:**
- ✅ `"Zalimiz ancha yorug‘ va chiroyli bo‘lib qoldi. Montaj toza qilindi."`
- ✅ `"O‘lchovdan keyin narx tushunarli aytildi. Ish tartibli bajarildi."`
- ❌ `"Eng zo‘r firma! 100% tavsiya qilaman!"` — reklama va'da
- ❌ `"Boshqa hech kim shuni qila olmaydi"` — competitive da'vo
- ❌ `"Narx eng arzon"` — narx va'da (yolg'on bo'lishi mumkin)

### Rating

- 5/5 yulduz **faqat real bo'lsa** ishlatilsin.
- Ko'p mijozda 5 baho bo'lsa OK — lekin yolg'on “5 yulduz” reyting qo'shma.
- Rating yo'q bo'lsa `rating` field'ini bermang — komponent kichik dot bilan almashtiradi.

---

## 6. Sample content (joriy 3 ta misol)

### Video samples (`src/data/videos.ts`)

1. **Zal · LED · Qarshi** — featured (78–82% snap)
   - Duration `0:18`
   - Tags `LED, Zal, Qarshi`
   - Instagram link `https://instagram.com/vashpotolok` (umumiy profil — Reels link kelganda yangilanadi)

2. **Yotoqxona · Matoviy · Qashqadaryo**
   - Duration `0:15`
   - Tags `Matoviy, Yotoqxona`

3. **Oshxona · Glyans · Qarshi**
   - Duration `0:20`
   - Tags `Oshxona, Glyans`

### Testimonial samples (`src/data/testimonials.ts`)

1. `customerLabel: "Qarshi · Zal"` — LED натяжной потолок, 24 m², 5/5.
2. `customerLabel: "Qashqadaryo · Yotoqxona"` — Matoviy, 18 m², 5/5.
3. `customerLabel: "Qarshi · Oshxona"` — Glyans, 14 m², 5/5.

---

## 7. Workflow (mijozdan deploy'gacha)

### Video qo'shish
1. Mijozdan ruxsat ol (Telegram chat yozma).
2. Reels'ni Instagram'da post qil (yoki avval post qilingan bo'lsa link nusxa ol).
3. `src/data/videos.ts` ga yangi `VideoItem` qo'sh:
   - `id` (lotin, kichik harf, `-` ajratuvchi)
   - `title`, `location`, `roomType`, `serviceType`
   - `instagramUrl` (Reels link)
   - `duration` (format `M:SS`)
   - `tags` (max 3-4)
   - `featured: true` faqat bitta video uchun (eng yaxshisi)
4. Thumbnail kerak bo'lsa: WebP 1200×900 tayyor, `public/videos/thumbnails/<id>.webp`, `thumbnail: '/videos/thumbnails/<id>.webp'`.
5. Lokal test: `npm run dev`, video card to'g'ri render, CTA Instagram'ga ochadi.
6. Build: `npm run typecheck && npm run lint && npm run build`.
7. Deploy.

### Testimonial qo'shish
1. Mijoz fikrini Telegram chatdan oling (yoki SMS — screenshot saqlangan).
2. Quote'ni **so'zma-so'z ko'chirma** — grammatika tuzatish OK, lekin ma'no o'zgartirma.
3. `src/data/testimonials.ts` ga `TestimonialItem` qo'sh:
   - `id` (lotin, `-` ajratuvchi)
   - `quote` (1–2 jumla, max 150 belgi)
   - `location`, `projectType`, `areaM2` (ixtiyoriy)
   - `rating` (faqat real bo'lsa, 4–5 oraliq odatda)
   - `customerLabel` (ism ruxsati bo'lmasa joy + xona turi)
4. Build + deploy.

---

## 8. Privacy va huquq

- **Mijoz ruxsati har bir kontent uchun alohida** olinadi (umumiy ruxsat emas).
- **Ruxsat screenshot** saqlangan — kelajakda agar mijoz “olib tashlang” desa, dalil bor.
- **Olib tashlash so'rovi** kelganida 24 soat ichida `data/videos.ts` yoki `data/testimonials.ts` dan o'chiriladi va deploy yangilanadi.
- **Bola/yosh oilaviy a'zo** ovozi yoki tasviri ishlatilmaydi.
- **Mijoz to'liq ismi** faqat aniq yozma ruxsat bilan ishlatiladi.

---

## 9. Performance

- Real video fayllar bevosita yuklanmaydi — faqat Instagram Reels link.
- Thumbnails — WebP, lazy load (`loading="lazy"`).
- Fallback render — CSS gradient + box-shadow (JS bundle'ga ta'sir 0).
- Autoplay yo'q, audio yo'q.
- `motion-reduce:` saqlanadi.

---

## 10. Quick reference

| Action | Joy |
|---|---|
| Yangi video qo'shish | `src/data/videos.ts` |
| Yangi testimonial qo'shish | `src/data/testimonials.ts` |
| Thumbnail joyi | `public/videos/thumbnails/<id>.webp` |
| Video CTA analytics | `click_video { id, destination }` |
| Testimonial CTA analytics | `click_telegram_bot { source: 'trust' }` |
| Section flow | `src/app/page.tsx` |
| Real foto qo'shish (portfolio) | [`PORTFOLIO_PHOTO_GUIDE.md`](./PORTFOLIO_PHOTO_GUIDE.md) |
