/**
 * VashPotolok Pro Calculator — narx konfiguratsiyasi (Phase Calc-2).
 *
 * MIJOZ KO'RADI: faqat taxminiy min/max range. Aniq narx — usta o'lchov
 * olganidan keyin belgilanadi. Buni `Result step` disclaimer'i va
 * `docs/PRO_CALCULATOR_SPEC.md` mahkamlaydi.
 *
 * BIZNES EGASI O'ZGARTIRADI: bu fayldagi `pricePerM2Min/Max`. Sozlash
 * qo'llanmasi:
 *   → docs/PRO_CALCULATOR_SPEC.md §8 "Real narxlarni sozlash bo'yicha
 *     qo'llanma" — qaysi qiymatni qachon o'zgartirish, qaysi qiymatlarga
 *     tegmaslik kerak, sanity-check qanday qilinadi.
 *
 * PHASE CALC-3 ESLATMA: tuman/district tanlash stepi olib tashlandi.
 * Narx Qashqadaryo bo'yicha umumiy hisoblanadi (faqat xona/o'lcham/potolok).
 * Addons step Phase Calc-2'da olib tashlangan edi.
 */

// ---------------------------------------------------------------------------
// O'LCHAM CHEKLOVLARI
// ---------------------------------------------------------------------------
export const AREA_MIN_M2 = 6
export const AREA_MAX_M2 = 80
export const AREA_DEFAULT_M2 = 18
export const SIDE_MIN_M = 1.5
export const SIDE_MAX_M = 12

// ---------------------------------------------------------------------------
// PREMIUM DARAJALAR
// ---------------------------------------------------------------------------
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

export type RoomShapeMode = 'dimensions' | 'area'

// ---------------------------------------------------------------------------
// XONA TURLARI
// ---------------------------------------------------------------------------
// baseMultiplier — xona "murakkabligi" korreksiyasi (0.85–1.20 oraliq).
export const roomTypes: RoomType[] = [
  { id: 'zal',       label: 'Zal',       hint: 'Katta xona uchun premium ko‘rinish',  icon: '',  baseMultiplier: 1.05 },
  { id: 'yotoqxona', label: 'Yotoqxona', hint: 'Sokin va minimal dizayn',             icon: '',  baseMultiplier: 1.00 },
  { id: 'oshxona',   label: 'Oshxona',   hint: 'Yorug‘ va amaliy yechim',             icon: '',  baseMultiplier: 1.00 },
  { id: 'koridor',   label: 'Koridor',   hint: 'Kichik joyni kengroq ko‘rsatish',     icon: '',  baseMultiplier: 0.95 },
]

// ---------------------------------------------------------------------------
// POTOLOK TURLARI (Phase Calc-2 — biznes yo'nalishiga moslangan)
// ---------------------------------------------------------------------------
// MIJOZ KO'RADI: tanlangan turning min — max (m² × multiplier).
// MIJOZ KO'RMAYDI: pricePerM2Min, pricePerM2Max alohida.
//
// SAVOL JAVOBI uchun docs/PRO_CALCULATOR_SPEC.md §8.2'ga qarang.
//
// Tartib: arzondan qimmatga (UI'da shu tartibda ko'rsatiladi).
export const ceilingTypes: CeilingType[] = [
  {
    id: 'odnotonniy',
    label: 'Однотонный',
    hint: 'Sodda va toza ko‘rinish',
    pricePerM2Min: 80000,
    pricePerM2Max: 90000,
    premiumLevel: 'standard',
  },
  {
    id: 'gulli',
    label: 'Gulli',
    hint: 'Naqshli va bezakli ko‘rinish',
    pricePerM2Min: 120000,
    pricePerM2Max: 135000,
    premiumLevel: 'comfort',
  },
  {
    id: 'naqsh',
    label: 'Naqsh',
    hint: 'Dekorativ naqshli yechim',
    pricePerM2Min: 120000,
    pricePerM2Max: 135000,
    premiumLevel: 'comfort',
  },
  {
    id: 'mramor',
    label: 'Mramor',
    hint: 'Mramor effektli premium ko‘rinish',
    pricePerM2Min: 120000,
    pricePerM2Max: 135000,
    premiumLevel: 'premium',
  },
  {
    id: 'uv-pechat',
    label: 'UV pechat',
    hint: 'Rasm va maxsus print bilan yechim',
    pricePerM2Min: 140000,
    pricePerM2Max: 160000,
    premiumLevel: 'premium',
  },
]

