# PotolX — Content Strategy

> **Phase Brand-1 (PotolX, light premium):** brand name `VashPotolok` → `PotolX`. Mood “premium tunda LED” → **`clean premium interior studio`**. `натяжной потолок` keyword saqlanadi (Cyrillic SEO).

## 1. Til qoidasi (Multilingual mix)

VashPotolok mijozi — Qarshi + Qashqadaryo aholisi. Ular **o'zbek + rus + kirilcha** aralashmasini tabiiy qabul qiladi.

### Qoidalar:

| Kontekst | Til | Misol |
|---|---|---|
| Xizmat nomi (asosiy keyword) | **Kirilcha rus** | `натяжной потолок` |
| Brend nomi | **Lotin (mixed-case wordmark)** | `PotolX` |
| Sub-headerlar | **Kirilcha o'zbek** | `Қашқадарё бўйлаб` |
| CTA tugmalari | **Lotin o'zbek** | `Telegram bot orqali hisoblash` |
| Ishonch matnlari | **Lotin o'zbek** | `Toza montaj`, `Kafolat` |
| Footer | **Lotin o'zbek** | `Bugun bepul maslahat oling` |
| Telefon raqami | **Lokal format** | `90 886 66 66` |

**Sabab:** "натяжной потолок" — local search'da eng ko'p qidiriladi (kirilcha). Lekin CTA matnlari lotinda — chunki yosh segment lotinda yozadi.

## 2. Hierarchy va qisqalik

### Sarlavhalar
- **3 so'zdan oshmasin** (mobile uchun).
- **Aktiv fe'l** ishlatish: `hisoblash`, `bog'lanish`, `ko'rish`.
- **Emoji** sarlavhada — yo'q. Faqat CTA tugmalarida.

### Matnlar
- **Body matn: 1–2 qatorga** sig'sin.
- Har bir blok bitta gapni aytsin.
- "Биз энг яхши" gaplari yo'q — buni isbotlovchi faktlar bo'lsin.

## 3. Hero Bloki

```
[Brand badge]   VASH POTOLOK
[Title]         Қашқадарё бўйлаб
                натяжной потолок
[Subtitle]      Ўлчовдан монтажгача тайёр ечим
```

**Maqsad:** 1 soniyada brend + xizmat + geografiya.

## 4. Primary CTA Matnlari (data/links.ts ichida)

| # | Matn | Icon | Maqsad | Vizual rol |
|---|---|---|---|---|
| 1 | `Telegram bot orqali hisoblash` | 📲 | Avtomatik narx kalkulyatsiyasi | Primary, eng kuchli |
| 2 | `Qo'ng'iroq qilish` | 📞 | To'g'ridan-to'g'ri operator | Secondary, yashil |
| 3 | `Telegramda yozish` | 💬 | Operator chat | Tertiary, telegram blue |
| 4 | `Ishlarimizni ko'rish` | 🖼 | Portfolio | Ghost, ishonch oshirish |
| 5 | `Instagram profil` | 📸 | IG'ga qaytish | Ghost, brand recall |

Eslatma: emoji'lar **icon component** sifatida ham renderlanishi mumkin (lucide-react). Default — SVG icon, fallback — emoji.

## 5. Narx Bloki (PriceEstimateCard)

```
[Title]     Narx hisoblash
[Body]      Xonangiz razmerini yuboring — 
            1 daqiqada taxminiy narx aytamiz
[Slider]    Maydon (m²): [_______●_______]  18 m²
[Estimate]  Taxminiy:    540 000 so'm  (live update)
[CTA]       📲 Aniq narxni Telegram botda olish
```

**Mantiq:**
- Slider 6–60 m² oralig'ida.
- Formula: `m² × 30 000 so'm` (taxminiy, simple).
- Yakuniy CTA — Telegram bot'ga olib boradi.
- "Aniq narx" so'zi muhim — bu narx faqat orientir ekanligini bildiradi.

## 5a. Conditional render — real content rule (Phase Bio-Ready)

Demo placeholder vibe oldini olish uchun quyidagi sectionlar **faqat real kontent** bo'lganida ko'rinadi:

| Section | Helper | Real content sharti |
|---|---|---|
| `VideoShowcase` | `hasRealVideoContent(videos)` | `videoUrl` yoki `thumbnail` mavjud, yoki `instagramUrl` ichida `/reel/`, `/reels/`, `/p/` |
| `PortfolioPreview` | `hasRealPortfolioImages(items)` | Kamida 1 ta item'da `image: '/portfolio/<id>.webp'` |
| `TestimonialsSection` | `hasRealTestimonials(items)` | Kamida 1 ta item `source: 'real'` |

**Maqsad:** Instagram'dan kelgan mijoz uchun “bu firma demo holatida” taassuroti tug'ilmasligi.

**Real kontent kelganda:** data file (`videos.ts` / `portfolio.ts` / `testimonials.ts`) ichida tegishli item'larni yangilash yetadi. Page kodi avtomatik conditional render qiladi.

**Fake proof qat'iy taqiqlangan:**
- Fake mijoz ismi yoki yuzi
- Fake raqamlar (“150+ buyurtma”, “3 yil tajriba”)
- Yolg'on kafolat muddati
- Fake Telegram/Instagram screenshot

## 5b. Video va mijoz fikrlari (Phase Trust-1)

### VideoShowcase

- Section title: `Video ishlarimiz`
- Subtitle: `Montaj jarayoni va tayyor natijalarni qisqa videolarda ko‘ring.`
- Har card uchun:
  - **Title** — qisqa, 5–8 so'z (`"Zal uchun LED натяжной потолок"`)
  - **Tags** — max 3–4 ta (`LED`, `Zal`, `Qarshi`)
  - **Duration** — `M:SS` format (15–30 soniya Reels)
  - **CTA** — `"Videoni ko‘rish"`, Instagram Reels linkka olib boradi
- Section CTA: `"Instagramda ko‘proq videolarni ko‘rish"`

### TestimonialsSection

- Section title: `Mijozlar fikri`
- Subtitle: `Har bir buyurtmada tushunarli hisob, toza montaj va mos yechimga e’tibor beramiz.`
- Section CTA: `"Shunga o‘xshash hisoblatish"` (Telegram bot `source: 'trust'`)

### Copy qoidalari

**Fake ism qat'iy taqiqlangan.** Mijoz ruxsati bo'lmasa `customerLabel` faqat joy + xona turi:
- ✅ `"Qarshi · Zal"`
- ✅ `"Qashqadaryo · Yotoqxona"`
- ❌ `"Sherzod · Qarshi · Zal"` — ruxsat tasdiqlanmagan

**Quote yumshoq va professional:**
- ✅ `"Zalimiz ancha yorug‘ va chiroyli bo‘lib qoldi. Montaj toza qilindi."`
- ❌ `"Eng zo‘r firma, 100% tavsiya qilaman!"` — reklama va'da
- ❌ `"Boshqa hech kim shuni qila olmaydi"` — competitive da'vo

**Rating 5/5 faqat real bo'lsa.** Yolg'on rating qo'shilmaydi. Rating yo'q bo'lsa field bermang.

**Privacy:** Bola, yosh oilaviy a'zo, mijoz yuzi yoki shaxsiy buyumi videoda ko'rinmasin. Mijoz ruxsatini olib tashlash so'rovi kelsa 24 soat ichida data file'dan o'chiriladi.

Batafsil workflow: [`VIDEOS_AND_TESTIMONIALS_GUIDE.md`](./VIDEOS_AND_TESTIMONIALS_GUIDE.md).

## 5c. FAQ section (Phase Bio-Ready)

`src/data/faq.ts` — 6 ta savol-javob, xavfsiz copy. Hech qanday yolg'on muddat, raqam yoki “100% kafolat” da'vosi yo'q.

**Copy qoidalari:**
- Savol — mijozning real Telegram chat'ida uchragan savollardan
- Javob — operator yoki usta tomondan tasdiqlangan matn
- “Tushuntiriladi”, “kelishiladi”, “aytadi” kabi yumshoq fe'llar — aniq son/muddat berib mijozni cheklamasdan, operatorga rishta beradi
- Botga olib boruvchi CTA pastida (`source: 'trust'`) — savol qoldirilsa, real javob mijozga botda kelsin

Yangi FAQ qo'shilsa: `id` lotin kebab-case, `question` qisqa (max 60 belgi), `answer` 1-2 jumla (max 180 belgi).

## 6. Xizmatlar (ServicesGrid)

```
1. натяжной потолок    — Asosiy xizmat
2. LED yoritish        — Trend, premium
3. Karniz              — Komplementar
4. Lyustra joyi        — Texnik talab
5. Dizayn maslahat     — Bepul value-add
```

Har bir xizmat:
- **Icon**
- **1 so'zli sarlavha**
- **1 satrli izoh** (optional)

## 7. Ishonch (TrustBadges)

| Badge | Matn | Sabab |
|---|---|---|
| ✅ | `Toza montaj` | Asosiy qo'rquvni yo'qotadi |
| ⭐ | `Sifatli material` | Sifat haqida shubha |
| 🛡 | `Kafolat` | Xavfsizlik hissi |
| 📍 | `Qarshi va viloyat bo'ylab` | Geografik qamrov |

## 8. Process Steps (ProcessSteps)

```
1. Buyurtma — Telegram yoki qo'ng'iroq
2. Ўлчов — Mutaxassis kelib o'lchaydi (bepul)
3. Tanlash — Material va rang
4. Montaj — Toza, 1 kunda
5. Kafolat — Rasmiy hujjat
```

Har bir step: **1 so'zli sarlavha + 1 satrli izoh**.

## 9. Footer CTA

```
[Title]   Bugun bepul maslahat oling
[CTA]     📞 90 886 66 66
[Caption] Қашқадарё бўйлаб, ҳар куни 09:00–20:00
```

## 10. Microcopy qoidalari

| ❌ Yomon | ✅ Yaxshi |
|---|---|
| `Bizga murojaat qiling` | `Telegramda yozish` |
| `Kontakt` | `Qo'ng'iroq qilish` |
| `Bizning ishlarimiz` | `Ishlarimizni ko'rish` |
| `Onlayn kalkulyator` | `Narx hisoblash` |
| `Профессионал команда` | `Toza montaj` |

**Qoida:** har bir matn — **harakat fe'li bilan tugaydi** yoki **konkret natijani** beradi.

## 11. SEO uchun kalit so'zlar

- `натяжной потолок Қарши`
- `натяжной потолок Қашқадарё`
- `Qashqadaryoda натяжной потолок`
- `Karshi natyajnoy potolok`
- `LED yoritish potolok`

Bular **meta description'da** va **JSON-LD'da** ishlatiladi (SEO doc'da batafsil).
