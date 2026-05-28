/**
 * VashPotolok Pro Calculator — narx konfiguratsiyasi.
 *
 * MIJOZ KO'RADI: faqat taxminiy min/max range. Aniq narx — usta o'lchov
 * olganidan keyin belgilanadi. Buni `Result step` disclaimer'i va
 * `docs/PRO_CALCULATOR_SPEC.md` mahkamlaydi.
 *
 * BIZNES EGASI O'ZGARTIRADI: bu fayldagi `pricePerM2Min/Max`,
 * `priceMin/Max`, `travelFeeMin/Max`. Sozlash qo'llanmasi:
 *   → docs/PRO_CALCULATOR_SPEC.md §8 "Real narxlarni sozlash bo'yicha
 *     qo'llanma" — qaysi qiymatni qachon o'zgartirish, qaysi qiymatlarga
 *     tegmaslik kerak, sanity-check qanday qilinadi.
 *
 * QO'YILMAGAN: backend, admin panel, bot integration. Hozircha sozlash
 * = bu faylni o'zgartirish + `npm run build` + deploy.
 */

// ---------------------------------------------------------------------------
// O'LCHAM CHEKLOVLARI
// ---------------------------------------------------------------------------
// Calculator faqat shu oraliqda taxminiy hisob beradi. Mijoz katta xona
// (80+ m²) yoki juda mayda joy (<6 m²) so'rasa — operator bilan to'g'ridan-
// to'g'ri kelishish kerak (kalkulyator bunday loyihalar uchun mo'ljallanmagan).
export const AREA_MIN_M2 = 6
export const AREA_MAX_M2 = 80
export const AREA_DEFAULT_M2 = 18
export const SIDE_MIN_M = 1.5
export const SIDE_MAX_M = 12

// ---------------------------------------------------------------------------
// MUMKIN BO'LGAN PREMIUM DARAJALAR
// ---------------------------------------------------------------------------
// UI'da badge sifatida ko'rinadi. Faqat 3 ta — standard / comfort / premium.
// Bu visual ierarxiya, narxga to'g'ridan-to'g'ri ta'sir qilmaydi
// (narx pricePerM2Min/Max orqali boshqariladi).
export type PremiumLevel = 'standard' | 'comfort' | 'premium'

export type RoomType = {
  id: string
  label: string
  hint: string
  icon: string
  baseMultiplier: number
}

export type CeilingType = {
  id: string
  label: string
  hint: string
  pricePerM2Min: number
  pricePerM2Max: number
  premiumLevel: PremiumLevel
}

export type AddonUnit = 'meter' | 'piece' | 'fixed'

export type ProAddonOption = {
  id: string
  label: string
  hint: string
  unit: AddonUnit
  minQty: number
  maxQty: number
  defaultQty: number
  priceMin: number
  priceMax: number
}

export type DistrictOption = {
  id: string
  label: string
  hint: string
  travelFeeMin: number
  travelFeeMax: number
}

export type RoomShapeMode = 'dimensions' | 'area'

// ---------------------------------------------------------------------------
// XONA TURLARI
// ---------------------------------------------------------------------------
// baseMultiplier — xona "murakkabligi" korreksiyasi. Zal odatda kattaroq
// va ko'rinadigan joy → murakkabroq dizayn so'raydi. Koridor — oddiyroq
// shakl. Bu qiymatni 0.85 — 1.20 oralig'idan tashqari chiqarmaslik tavsiya
// etiladi: aks holda boshqa kalkulyator parametrlari (ceiling/addon) bilan
// natija mantiqsiz bo'lib qoladi.
export const roomTypes: RoomType[] = [
  { id: 'zal',       label: 'Zal',       hint: 'Katta xona uchun premium ko‘rinish',  icon: '✨',  baseMultiplier: 1.05 },
  { id: 'yotoqxona', label: 'Yotoqxona', hint: 'Sokin va minimal dizayn',             icon: '🌙',  baseMultiplier: 1.00 },
  { id: 'oshxona',   label: 'Oshxona',   hint: 'Yorug‘ va amaliy yechim',             icon: '🍽️', baseMultiplier: 1.00 },
  { id: 'koridor',   label: 'Koridor',   hint: 'Kichik joyni kengroq ko‘rsatish',     icon: '➡️',  baseMultiplier: 0.95 },
]

// ---------------------------------------------------------------------------
// POTOLOK TURLARI (polotno + montaj — kvadrat metr uchun)
// ---------------------------------------------------------------------------
// QIYMATLAR: boshlang'ich "safe starter preset" (Qarshi/Qashqadaryo
// 2026-yil bozori uchun taxminiy ko'rsatkichlar). Real narxlarga
// moslashtirish — biznes egasining vazifasi.
//
// MIJOZ NIMA KO'RADI: tanlangan turning min — max (m² × multiplier).
// MIJOZ KO'RMAYDI: pricePerM2Min, pricePerM2Max alohida.
//
// SAVOL JAVOBI uchun docs/PRO_CALCULATOR_SPEC.md §8.2'ga qarang.
//
// Tartib: arzondan qimmatga (UI'da shu tartibda ko'rsatiladi).
export const ceilingTypes: CeilingType[] = [
  {
    id: 'matoviy',
    label: 'Matoviy натяжной потолок',
    hint: 'Eng ko‘p tanlanadigan toza va sokin ko‘rinish',
    pricePerM2Min: 28000, // taxminiy — eng arzon variant
    pricePerM2Max: 38000,
    premiumLevel: 'standard',
  },
  {
    id: 'glyans',
    label: 'Glyans потолок',
    hint: 'Yorug‘likni qaytaradi, xona kengroq ko‘rinadi',
    pricePerM2Min: 35000, // taxminiy — matoviydan biroz qimmat
    pricePerM2Max: 48000,
    premiumLevel: 'comfort',
  },
  {
    id: 'satin',
    label: 'Satin потолок',
    hint: 'Yumshoq premium faktura',
    pricePerM2Min: 42000, // taxminiy — glyansga yaqin, kuchliroq faktura
    pricePerM2Max: 58000,
    premiumLevel: 'comfort',
  },
  {
    id: 'led',
    label: 'LED yoritish bilan',
    hint: 'Zamonaviy yorug‘lik effektlari uchun',
    pricePerM2Min: 60000, // taxminiy — material + integratsiya
    pricePerM2Max: 90000,
    premiumLevel: 'premium',
  },
  {
    id: 'premium',
    label: 'Premium dizayn',
    hint: 'Murakkab dizayn, kombinatsiya va effektlar',
    pricePerM2Min: 80000, // taxminiy — eng murakkab variant
    pricePerM2Max: 120000,
    premiumLevel: 'premium',
  },
]

// ---------------------------------------------------------------------------
// QO'SHIMCHA XIZMATLAR (addons)
// ---------------------------------------------------------------------------
// Har bir addon — alohida qator invoice'da.
//
// `unit`:
//   - meter — qty * price (LED liniya, karniz)
//   - piece — qty * price (lyustra joyi, spot, pipe, complex corner)
//   - fixed — price (qty hisobga olinmaydi — hozirgi presetda yo'q,
//              kelajakda kerak bo'lsa)
//
// `minQty` / `maxQty` — UI'da −/+ buttonlari shu oraliqda chiqadi.
//
// `defaultQty`:
//   - 0 = mijoz aniq tanlaganda hisobga kiradi.
//   - lyustra joyi default 1 — chunki amaliyotda deyarli barcha xonada
//     bitta lyustra joyi qo'yiladi (mijoz uni keraksiz deb bilsa, 0 qiladi).
//
// Tartib: tez-tez ishlatiladiganlardan kamroq tanlanadiganlarga.
export const proAddonOptions: ProAddonOption[] = [
  {
    id: 'led-line',
    label: 'LED liniya',
    hint: 'Xonaga zamonaviy yorug‘lik beradi',
    unit: 'meter',
    minQty: 0,
    maxQty: 30,
    defaultQty: 0,
    priceMin: 65000, // metr uchun — material + montaj
    priceMax: 95000,
  },
  {
    id: 'karniz',
    label: 'Karniz',
    hint: 'Pardalar uchun chiroyli yechim',
    unit: 'meter',
    minQty: 0,
    maxQty: 30,
    defaultQty: 0,
    priceMin: 35000, // metr uchun
    priceMax: 60000,
  },
  {
    id: 'lyustra',
    label: 'Lyustra joyi',
    hint: 'Lyustra o‘rnatish nuqtasi',
    unit: 'piece',
    minQty: 0,
    maxQty: 5,
    defaultQty: 1, // default 1 — odatda har xonada bitta
    priceMin: 50000, // bitta nuqta uchun
    priceMax: 90000,
  },
  {
    id: 'spot',
    label: 'Spot chiroqlar',
    hint: 'Qo‘shimcha yoritish nuqtalari',
    unit: 'piece',
    minQty: 0,
    maxQty: 20,
    defaultQty: 0,
    priceMin: 25000, // bitta spot uchun
    priceMax: 45000,
  },
  {
    id: 'pipe',
    label: 'Truba obxod',
    hint: 'Quvur atrofidan toza aylanish',
    unit: 'piece',
    minQty: 0,
    maxQty: 10,
    defaultQty: 0,
    priceMin: 80000, // bitta obxod — ish murakkabligi yuqori
    priceMax: 140000,
  },
  {
    id: 'complex-corner',
    label: 'Murakkab burchak',
    hint: 'To‘g‘ri to‘rtburchakdan tashqari burchaklar',
    unit: 'piece',
    minQty: 0,
    maxQty: 12,
    defaultQty: 0,
    priceMin: 60000, // bitta burchak — qo'shimcha ishlov
    priceMax: 110000,
  },
]

// ---------------------------------------------------------------------------
// MONTAJ HUDUDI (travel fee)
// ---------------------------------------------------------------------------
// `travelFeeMin/Max` — usta chiqish + transport + qaytib kelish (taxminiy).
// Qarshi shahar uchun bepul (0). Tumanlar uchun masofaga qarab kichik
// range. Boshqa viloyat (`far`) — keng range, chunki har holat alohida
// kelishiladi.
export const districtOptions: DistrictOption[] = [
  {
    id: 'qarshi',
    label: 'Qarshi',
    hint: 'Shahar ichi — qo‘shimcha xarajat yo‘q',
    travelFeeMin: 0,
    travelFeeMax: 0,
  },
  {
    id: 'qashqadaryo',
    label: 'Qashqadaryo tumani',
    hint: 'Viloyat tumanlari uchun yo‘l xarajati',
    travelFeeMin: 80000, // taxminiy — yaqin tumanlar
    travelFeeMax: 180000, // taxminiy — uzoqroq tumanlar
  },
  {
    id: 'far',
    label: 'Uzoqroq hudud',
    hint: 'Boshqa viloyat — alohida kelishuv',
    travelFeeMin: 200000, // taxminiy — odatdagi minimum
    travelFeeMax: 400000, // taxminiy — uzoq masofa
  },
]
