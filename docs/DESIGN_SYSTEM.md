# Potolok X — Design System (Phase Brand-1 light premium)

## 1. Visual Direction

**Clean premium light, modern interior showroom.**

Vizual metafora — quyosh nuri ostidagi premium interior studio. Bright white card'lar yumshoq off-white fonda turadi, har element subtle cobalt aksent bilan ajraladi. “Magazin/jurnal” feel — Instagram'dan kirgan oilaviy/uy egasi mijozga **toza, qimmatbaho, ishonchli** taassurot beradi.

Hech qanday dark navy yo'q — yangi Potolok X **light premium**.

## 2. Color Tokens (Tailwind config)

```ts
colors: {
  bg: {
    base: '#F5F7FB',                        // soft off-white page
    surface: '#FFFFFF',                     // card surface
    elevated: '#FFFFFF',                    // back-compat alias of surface
    glass: 'rgba(255, 255, 255, 0.70)',
    'glass-strong': 'rgba(255, 255, 255, 0.92)',
  },
  brand: {
    primary: '#1E3A8A',                     // deep navy text accent
    'primary-700': '#1D4ED8',
    accent: '#2F6BFF',                      // electric cobalt
    'accent-glow': '#60A5FA',               // light blue glow
    'accent-soft': 'rgba(47, 107, 255, 0.10)',
  },
  ink: {
    primary: '#0F172A',                     // slate-900
    secondary: '#475569',                   // slate-600
    muted: '#94A3B8',                       // slate-400
  },
  line: {
    soft: '#E2E8F0',                        // slate-200
    strong: '#CBD5E1',                      // slate-300
  },
  gold: {
    DEFAULT: '#B8954A',
    soft: 'rgba(184, 149, 74, 0.12)',
  },
  success: '#16A34A',
  call: '#16A34A',
  telegram: '#2563EB',
}
```

## 3. Shadows (light theme — ikki qatlamli soft)

```ts
boxShadow: {
  soft: '0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04)',
  card: '0 4px 14px rgba(15,23,42,0.06), 0 2px 6px rgba(15,23,42,0.04)',
  cta:  '0 10px 24px -8px rgba(47,107,255,0.35), 0 2px 6px rgba(15,23,42,0.05)',
  glow: '0 0 32px rgba(96,165,250,0.22)',
  'cta-green': '0 10px 24px -8px rgba(22,163,74,0.30), 0 2px 6px rgba(15,23,42,0.05)',
  'cta-tg':    '0 10px 24px -8px rgba(37,99,235,0.30), 0 2px 6px rgba(15,23,42,0.05)',
}
```

## 4. Gradients

```ts
backgroundImage: {
  'grad-hero':         'radial-gradient(120% 80% at 50% -10%, #DBEAFE 0%, #F5F7FB 55%)',
  'grad-glow':         'radial-gradient(50% 50% at 50% 0%, rgba(96,165,250,0.22), transparent 70%)',
  'grad-button':       'linear-gradient(135deg, #2F6BFF 0%, #1D4ED8 100%)',
  'grad-button-green': 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
  'grad-button-tg':    'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
  'grad-border':       'linear-gradient(135deg, rgba(15,23,42,0.12), rgba(15,23,42,0.04))',
  'grad-gold':         'linear-gradient(135deg, #D9B872, #B8954A)',
}
```

## 5. Brand

- **Brand name:** `Potolok X` (P + lowercase otol + X)
- **Monogram:** `PX` — deep blue gradient card, white text, gentle white-to-transparent sheen overlay
- **Logo treatment:** monogram + wordmark side-by-side on hero
- **Wordmark gradient:** `from-ink-primary via-brand-primary to-brand-accent` bg-clip-text

---

## Old (VashPotolok dark navy) — DEPRECATED

The earlier dark navy palette was retired in Phase Brand-1.

## 3. Typography

| Rol | Font | Size (mobile) | Weight | Line-height |
|---|---|---|---|---|
| Display | Inter / Manrope | 36px → 44px | 800 | 1.05 |
| H1 | Inter | 28px | 700 | 1.1 |
| H2 | Inter | 22px | 700 | 1.2 |
| Subtitle | Inter | 16px | 500 | 1.4 |
| Body | Inter | 15px | 400 | 1.5 |
| Caption | Inter | 12px | 500 | 1.3 |
| Button | Inter | 16px | 600 | 1.0 |

- Brend nomi (`VASH POTOLOK`) — **tracking-widest, uppercase, semibold**.
- "natijnoy potolok" — kirilcha qoladi (mahalliy SEO + intent).
- Headerlar **qisqa**: maksimum 3 so'z.
- Body **15px** — mobile o'qish uchun optimal.
- Hech qachon **3 qatordan ko'p** bir tugmada.

## 4. Spacing & Radius

```css
--radius-sm: 12px;
--radius-md: 16px;
--radius-lg: 20px;
--radius-2xl: 24px;
--radius-3xl: 28px;
--radius-pill: 999px;

--space-xs: 8px;
--space-sm: 12px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
--space-3xl: 64px;
```

Mobile container: **max-width 480px**, padding 20px.
Desktop: markazda 480px ustun, atrofda hero glow.

## 5. Shadows / Elevation

```css
--shadow-soft:  0 8px 24px rgba(0, 0, 0, 0.25);
--shadow-card:  0 20px 60px -10px rgba(0, 0, 0, 0.45);
--shadow-cta:   0 12px 40px -8px rgba(61, 126, 255, 0.55);
--shadow-glow:  0 0 80px 0 rgba(91, 155, 255, 0.35);
```

## 6. UI Elementlari

### 6.1 Glassmorphism Card
- Background: `--bg-glass-strong`
- Backdrop-filter: `blur(20px) saturate(140%)`
- Border: 1px solid `--border-soft`
- Radius: `--radius-2xl`
- Inner highlight (top border): `inset 0 1px 0 rgba(255,255,255,0.08)`

### 6.2 Gradient Border (Premium Card)
- Pseudo-element `::before` bilan `--grad-border` chiziladi
- `mask: linear-gradient(...)` orqali faqat chet qoladi
- 1px qalinlik, mahalliy "silver rim" effekti

### 6.3 CTA Button
- **Primary (Telegram bot):** `--grad-button` + animated shine pass + glow shadow + icon chap tomonda.
- **Secondary (Call):** glass + green accent ring, telefon ikonkasi yashil glow bilan.
- **Tertiary (Telegram chat):** glass + telegram blue accent.
- **Ghost (Instagram, Portfolio):** transparent + gradient border.

Har biri:
- Min-height: **64px** (mobile tap target)
- Radius: `--radius-2xl`
- Tap state: `scale(0.98)`
- Hover (desktop): subtle shine pass left→right (1.2s)

### 6.4 Trust Badges
- 2×2 grid mobile'da
- Icon + qisqa matn
- Glass card mini variant
- Icon uchun gradient ring

### 6.5 Portfolio Preview (Phase 2 — premium project cards)

Card — ikki qatlam:

1. **Top zone** (gradient/image header)
   - Featured card: aspect `4:3`, width `78%`. Regular card: aspect `4:3.2`, width `64%`.
   - Snap scroll (mandatory) `-mx-5 px-5` orqali edge-to-edge.
   - Image yo'q bo'lsa — `item.gradient` placeholder. Image bor bo'lsa — `<img loading="lazy">` (Phase 2.5'da `next/image`).
   - Yuqorida radial highlight: `radial-gradient(60% 40% at 50% 0%, rgba(255,255,255,0.18), transparent 70%)`.
   - Group-hover'da shine pass.
   - **Chiplar:**
     - Top-left: "Ish namunasi" (qora glass, brand dot bilan).
     - Top-right: `{areaM2} m²` (bo'lsa) — qora glass, tabular-nums.
   - Bottom gradient (rgba(8,11,22,0.92 → transparent)) ustida:
     - Pin icon + location (uppercase, ink-secondary/70).
     - Title (16px bold, white).

2. **Bottom zone** (info + CTA)
   - Background: `bg-elevated/80`, backdrop-blur.
   - serviceType (12px uppercase, brand accent glow).
   - result (13px, ink-secondary).
   - tags: chip'lar (`#tag`, 10px, line-soft border).
   - CTA: "Shunga o'xshash narx hisoblatish" (primary gradient, 44px height).

Card border: `border-line-strong` (kuchliroq, premium hissi uchun).
Shadow: `shadow-card`.

### 6.5c Pro Calculator (Phase 3.5)

Calculator — sahifaning **eng katta interaktiv komponenti**. Vizual qoidalar:

**Karta (CalculatorShell):**
- `GlassCard glow` — strong glow shadow
- Top right: `n/6` badge (yoki "Hisob tayyor" success badge result'da)
- 6-segmentli progress strip: filled (`brand-accent/70`), current (`bg-grad-button` + glow), empty (`bg-white/[0.08]`)
- Title 18px bold, subtitle 12.5px ink-secondary
- Body min-height 260px (step almashganda jumps oldini olish uchun)
- `animate-step-in` har step content yangilanganda
- Footer nav: back square button + next/CTA flex-1 button

**Step optionlari (Room/Ceiling/District):**
- Inactive: `border-line-soft bg-white/[0.04]`
- Active: `border-brand-accent-glow bg-brand-accent-soft shadow-[0_0_24px_-4px_rgba(91,155,255,0.45)]`
- Hover: `border-line-strong`
- Checkmark (active) — kichik gradient pill, glow shadow

**SizeStep:**
- Mode toggle: 2 ta button segmented control, active = `bg-grad-button` glow
- Numeric inputs: `h-12`, `text-[16px] font-bold tabular-nums`, focus'da brand-accent border
- Preview metrics — `text-[22px] font-extrabold`, valid bo'lsa `text-brand-accent-glow`
- Out-of-range warning — `text-call/90` (yashil/qizil aralash → accent)

**QuantityControl (Addons):**
- Active (`qty > 0`): `border-brand-accent-glow bg-brand-accent-soft` + glow
- `−/+` buttonlar: `h-9 w-9 rounded-xl`, disabled bo'lsa opacity 50%
- Value: katta tabular-nums, unit pastida uppercase tracking-wider

**Premium badge (CeilingStep):**
- Standard: `bg-white/[0.06] text-ink-secondary border-line-soft`
- Comfort: `bg-brand-accent-soft text-brand-accent-glow border-brand-accent/30`
- Premium: `bg-gold-soft text-gold border-gold/40`

**Bepul badge (DistrictStep — qarshi):**
- `bg-success/15 text-success border-success/30`

**ResultStep:**
- **Total range** — ekranning eng kuchli vizual elementi: `text-[28-32px] font-extrabold` gradient-clip
- Summary `<dl>` — 2 column grid, 12px font
- **EstimateBreakdown** — invoice-like: har qator label + qty (kichik muted) + range (right-aligned, tabular-nums), border-line-soft separator
- CTA: `bg-grad-button shadow-cta` min-h-56px, disabled bo'lsa `bg-white/[0.05] text-ink-muted cursor-not-allowed`
- "Qayta hisoblash" — ghost text-button, underline on hover

### 6.5b Trust Cards (Phase 2 — why-choose-us)

- 2×2 grid, gap 2.5
- Glass card + `border-line-soft`
- Hover'da:
  - Border → `border-line-strong`
  - Top chiziq (`from-transparent via-white/20 to-transparent`) — opacity 60 → 100
  - Icon ring → `ring-white/20`, scale 1.05
  - Icon ortida 18px blue glow (`box-shadow: 0 0 18px rgba(91,155,255,0.55)`)
  - O'ng-yuqorida 24×24 brand-accent-soft "lens flare" — opacity 0 → 100 (500ms)
- Title 13px bold, description 11.5px ink-secondary
- `motion-reduce` — barcha glow/transition o'chadi

### 6.6 Process Steps
- Vertical timeline
- Nuqta + glow + bog'lovchi chiziq
- Har bir step: raqam, sarlavha, 1 qatorli izoh

### 6.7 Sticky Bottom CTA
- Pastda fixed, mobile'da har doim ko'rinadi
- Backdrop blur fonida
- 2 ta tugma: Telegram bot (primary) + Phone (secondary icon)
- Safe-area inset hisobga olinadi (iOS)

## 7. "Hech kimda yo'q" Effektlar

### Ceiling Light Glow
- Sahifa yuqorisida fixed `radial-gradient` glow.
- 60s davomida juda sekin `pulse` animatsiyasi (opacity 0.85 ↔ 1.0).
- Body engagement uchun: scroll qilganda glow biroz qisqaradi.

### Premium Particles
- Sahifa fonida 12–18 ta `dust particle` (CSS-only, JS yo'q).
- Har biri sekin yuqoriga suzadi (40–80s loop).
- Opacity 0.15, blur 1px. **Mobile'da kamroq** (perf).

### Animated Background
- Hero zonasida `conic-gradient` ohista aylanadi (90s loop, `prefers-reduced-motion` bilan to'xtaydi).

### Sticky CTA Reveal
- Sahifa yuqorida — sticky CTA yashirin (transform: translateY(120%)).
- 25% scroll'dan keyin — yumshoq spring bilan chiqadi.

### Interactive Estimate Card
- Mini "qiymat slider" (xona o'lchami).
- Slider'ni harakatlantirsa, taxminiy narx (live) o'zgaradi.
- Yakuniy CTA: "Telegram bot orqali aniq narx".

### 3D / Shine Button Hover
- `::before` orqali diagonal shine pass.
- Hover'da `1.2s ease` shine left→right.
- Tap'da `box-shadow` glow kuchayadi.

### Section Reveal Animation
- `IntersectionObserver` bilan har bir section: `opacity 0 → 1`, `translateY(16px) → 0`.
- Stagger 80ms.
- `prefers-reduced-motion: reduce` — barcha animatsiyalar o'chadi.

## 8. Iconography

- **Lucide React** (tree-shakeable, light bundle).
- Yoki inline SVG (hero, custom).
- Telegram, Phone, Instagram — brend ranglari saqlanadi.

## 9. "Generic Taplink" bo'lib qolmaslik qoidalari

1. **Hech qachon** vertikal tugmalar ro'yxati holos bo'lmasin. Har bir CTA — vizual xarakterga ega.
2. **Avatar/profil rasmi** o'rtada — taplink shabloni. Buni qilmaymiz. O'rniga — brend bloki, ceiling glow.
3. **Bir xil rangdagi tugmalar** — yo'q. Har bir CTA o'z mantiqida ranglanadi (Telegram bot = brand blue, Phone = green, etc.).
4. **Section'lar bor**: Hero → CTA → Price → Services → Trust → Portfolio → Process → Footer. Funnel mantiqida.
5. **Sticky CTA** har doim ko'rinadi — Linktree'da yo'q.
6. **Premium effects** (glow, shine, particles) — Linktree'da yo'q.
7. **Brendlangan kontent** — bizning xizmatimiz haqida tushuntiruvchi matn, narx kalkulyatori. Tugmalar ro'yxati emas.

## 10. Accessibility

- Kontrast: WCAG AA (≥ 4.5:1 body, ≥ 3:1 large text).
- Focus states: `outline: 2px solid var(--accent)`, offset 2px.
- Aria-label har bir icon-only tugmada.
- `prefers-reduced-motion` qo'llab-quvvatlanadi.
- Tap target ≥ 44×44px (Apple HIG), ko'pchiligi 64px.
