import {
  AREA_MAX_M2,
  AREA_MIN_M2,
  ceilingTypes,
  districtOptions,
  proAddonOptions,
  roomTypes,
  type CeilingType,
  type DistrictOption,
  type ProAddonOption,
  type RoomShapeMode,
  type RoomType,
} from '@/data/price-options'

export type ProEstimateInput = {
  roomTypeId: string
  mode: RoomShapeMode
  lengthM?: number
  widthM?: number
  areaM2?: number
  ceilingTypeId: string
  addonQuantities: Record<string, number>
  districtId: string
}

export type BreakdownItem = {
  id: string
  label: string
  qty?: number
  unit?: 'meter' | 'piece' | 'fixed' | 'area'
  min: number
  max: number
}

export type ProEstimateResult = {
  valid: boolean
  areaM2: number
  perimeterM: number
  baseMin: number
  baseMax: number
  addonsMin: number
  addonsMax: number
  travelMin: number
  travelMax: number
  totalMin: number
  totalMax: number
  breakdown: BreakdownItem[]
  payload: string
}

const uzNumberFormat = new Intl.NumberFormat('uz-UZ')

// ---------------------------------------------------------------------------
// Input helpers
// ---------------------------------------------------------------------------

/** Decimal input parser: "3,5" / "3.5" / " 3 " → 3.5 (NaN agar noto‘g‘ri). */
export function parseDecimal(value: string | number | undefined | null): number {
  if (typeof value === 'number') return Number.isFinite(value) ? value : Number.NaN
  if (value === undefined || value === null) return Number.NaN
  const cleaned = String(value).trim().replace(/\s+/g, '').replace(',', '.')
  if (cleaned === '') return Number.NaN
  const n = Number(cleaned)
  return Number.isFinite(n) ? n : Number.NaN
}

function findRoom(id: string): RoomType | undefined {
  return roomTypes.find((r) => r.id === id)
}

function findCeiling(id: string): CeilingType | undefined {
  return ceilingTypes.find((c) => c.id === id)
}

function findAddon(id: string): ProAddonOption | undefined {
  return proAddonOptions.find((a) => a.id === id)
}

function findDistrict(id: string): DistrictOption | undefined {
  return districtOptions.find((d) => d.id === id)
}

/**
 * Yakuniy summalar shu qadamga yaxlitlanadi. Mijozga `1 050 000 so‘m`
 * ko‘rinishi `1 047 612 so‘m`'dan ancha tushunarli — taxminiy hisob
 * uchun ham mos. Agar 500'ga yaxlitlash kerak bo'lsa — shu qiymatni
 * o'zgartiring.
 */
const ROUNDING_STEP_SOM = 1000

function roundToStep(value: number): number {
  if (!Number.isFinite(value) || value <= 0) return 0
  return Math.round(value / ROUNDING_STEP_SOM) * ROUNDING_STEP_SOM
}

function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min
  return Math.min(max, Math.max(min, value))
}

// ---------------------------------------------------------------------------
// Geometry
// ---------------------------------------------------------------------------

function deriveAreaAndPerimeter(input: ProEstimateInput): {
  area: number
  perimeter: number
} {
  if (input.mode === 'dimensions') {
    const l = parseDecimal(input.lengthM)
    const w = parseDecimal(input.widthM)
    if (!Number.isFinite(l) || !Number.isFinite(w) || l <= 0 || w <= 0) {
      return { area: 0, perimeter: 0 }
    }
    const area = l * w
    const perimeter = 2 * (l + w)
    return { area, perimeter }
  }
  const a = parseDecimal(input.areaM2)
  if (!Number.isFinite(a) || a <= 0) return { area: 0, perimeter: 0 }
  // Square taxminiy perimeter (kvadrat = eng yomon holat)
  const side = Math.sqrt(a)
  const perimeter = side * 4
  return { area: a, perimeter }
}

// ---------------------------------------------------------------------------
// Calculation
// ---------------------------------------------------------------------------

export function calculateProEstimate(input: ProEstimateInput): ProEstimateResult {
  const empty: ProEstimateResult = {
    valid: false,
    areaM2: 0,
    perimeterM: 0,
    baseMin: 0,
    baseMax: 0,
    addonsMin: 0,
    addonsMax: 0,
    travelMin: 0,
    travelMax: 0,
    totalMin: 0,
    totalMax: 0,
    breakdown: [],
    payload: '',
  }

  const room = findRoom(input.roomTypeId)
  const ceiling = findCeiling(input.ceilingTypeId)
  const district = findDistrict(input.districtId)
  if (!room || !ceiling || !district) return empty

  const { area, perimeter } = deriveAreaAndPerimeter(input)
  if (area < AREA_MIN_M2 || area > AREA_MAX_M2) return empty

  const baseMin = ceiling.pricePerM2Min * area * room.baseMultiplier
  const baseMax = ceiling.pricePerM2Max * area * room.baseMultiplier

  const breakdown: BreakdownItem[] = [
    {
      id: 'base',
      label: `Polotno + montaj · ${ceiling.label}`,
      qty: Math.round(area * 10) / 10,
      unit: 'area',
      min: roundToStep(baseMin),
      max: roundToStep(baseMax),
    },
  ]

  let addonsMin = 0
  let addonsMax = 0
  for (const addon of proAddonOptions) {
    const raw = input.addonQuantities[addon.id] ?? 0
    const qty = clamp(Math.round(raw), addon.minQty, addon.maxQty)
    if (qty <= 0) continue

    const itemMin = addon.unit === 'fixed' ? addon.priceMin : addon.priceMin * qty
    const itemMax = addon.unit === 'fixed' ? addon.priceMax : addon.priceMax * qty
    addonsMin += itemMin
    addonsMax += itemMax

    breakdown.push({
      id: addon.id,
      label: addon.label,
      qty,
      unit: addon.unit,
      min: roundToStep(itemMin),
      max: roundToStep(itemMax),
    })
  }

  const travelMin = district.travelFeeMin
  const travelMax = district.travelFeeMax
  if (travelMax > 0) {
    breakdown.push({
      id: 'travel',
      label: `Yo‘l/hudud · ${district.label}`,
      unit: 'fixed',
      min: roundToStep(travelMin),
      max: roundToStep(travelMax),
    })
  }

  const totalMin = roundToStep(baseMin + addonsMin + travelMin)
  const totalMax = roundToStep(baseMax + addonsMax + travelMax)

  const payload = buildProTelegramPayload(input, {
    areaM2: area,
    addonQuantities: input.addonQuantities,
  })

  return {
    valid: true,
    areaM2: Math.round(area * 10) / 10,
    perimeterM: Math.round(perimeter * 10) / 10,
    baseMin: roundToStep(baseMin),
    baseMax: roundToStep(baseMax),
    addonsMin: roundToStep(addonsMin),
    addonsMax: roundToStep(addonsMax),
    travelMin,
    travelMax,
    totalMin,
    totalMax,
    breakdown,
    payload,
  }
}

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------

export function formatSom(amount: number): string {
  if (!Number.isFinite(amount) || amount <= 0) return '—'
  return `${uzNumberFormat.format(Math.round(amount))} so‘m`
}

export function formatPriceRange(min: number, max: number): string {
  if ((!Number.isFinite(min) || min <= 0) && (!Number.isFinite(max) || max <= 0)) return '—'
  if (min === max) return formatSom(min)
  return `${uzNumberFormat.format(min)} — ${uzNumberFormat.format(max)} so‘m`
}

// ---------------------------------------------------------------------------
// Telegram payload
// ---------------------------------------------------------------------------

/**
 * Pro calculator payload:
 *   pro_<room>_<area>_<ceiling>_<district>_<N>a
 *
 * <N> = qty > 0 bo‘lgan addonlar soni (0..6).
 *
 * Hozircha qisqa forma tanlandi — quantity'larni ham yuborish 64 belgilik
 * Telegram cheklovidan oshib ketadi. Bot tomonida summary tanlovlar
 * qaytadan tasdiqlanadi.
 */
export function buildProTelegramPayload(
  input: ProEstimateInput,
  override?: { areaM2?: number; addonQuantities?: Record<string, number> },
): string {
  const safeRoom = (input.roomTypeId || 'x').replace(/[^a-z0-9-]/gi, '')
  const safeCeiling = (input.ceilingTypeId || 'x').replace(/[^a-z0-9-]/gi, '')
  const safeDistrict = (input.districtId || 'x').replace(/[^a-z0-9-]/gi, '')

  const areaSource =
    override?.areaM2 !== undefined
      ? override.areaM2
      : deriveAreaAndPerimeter(input).area
  const safeArea = Math.max(0, Math.round(areaSource))

  const quantities = override?.addonQuantities ?? input.addonQuantities
  const activeAddons = proAddonOptions.filter((a) => (quantities[a.id] ?? 0) > 0).length

  const payload = `pro_${safeRoom}_${safeArea}_${safeCeiling}_${safeDistrict}_${activeAddons}a`
  return payload.length <= 60 ? payload : payload.slice(0, 60)
}

// ---------------------------------------------------------------------------
// Misc helpers used by UI
// ---------------------------------------------------------------------------

export function defaultAddonQuantities(): Record<string, number> {
  const out: Record<string, number> = {}
  for (const a of proAddonOptions) out[a.id] = a.defaultQty
  return out
}

export function totalActiveAddons(quantities: Record<string, number>): number {
  let n = 0
  for (const a of proAddonOptions) if ((quantities[a.id] ?? 0) > 0) n++
  return n
}

// ---------------------------------------------------------------------------
// SANITY CHECK — TYPICAL EXAMPLES
// ---------------------------------------------------------------------------
// Real narxlarni o'zgartirgandan keyin: shu 4 ta misol natijasi mantiqsiz
// (juda baland yoki juda past) bo'lib qolmaganini tekshiring. Manual
// sanity check jadvali: docs/PRO_CALCULATOR_SPEC.md §8.5.
//
// Dev konsolda tekshirish:
//
//   import { TYPICAL_EXAMPLES, calculateProEstimate, formatPriceRange } from '@/lib/pro-price-estimate'
//   for (const ex of TYPICAL_EXAMPLES) {
//     const r = calculateProEstimate(ex.input)
//     console.log(ex.label, '→', formatPriceRange(r.totalMin, r.totalMax))
//   }
//
// Ushbu massiv lint'da "unused" warning bermaydi — `export` qilingani uchun.

export type TypicalExample = {
  id: string
  label: string
  input: ProEstimateInput
  /** Inson tekshirishi uchun kutilgan oraliq (taxminiy). */
  expectedNote: string
}

export const TYPICAL_EXAMPLES: TypicalExample[] = [
  {
    id: 'simple-bedroom',
    label: 'Yotoqxona · matoviy · Qarshi',
    input: {
      roomTypeId: 'yotoqxona',
      mode: 'area',
      areaM2: 18,
      ceilingTypeId: 'matoviy',
      addonQuantities: { lyustra: 0 },
      districtId: 'qarshi',
    },
    expectedNote: '~500k–700k so‘m (eng oddiy, eng arzon variant)',
  },
  {
    id: 'premium-living',
    label: 'Zal · LED · LED liniya 6m + karniz 4m + lyustra 1 · Qarshi',
    input: {
      roomTypeId: 'zal',
      mode: 'dimensions',
      lengthM: 6,
      widthM: 4,
      ceilingTypeId: 'led',
      addonQuantities: { 'led-line': 6, karniz: 4, lyustra: 1 },
      districtId: 'qarshi',
    },
    expectedNote: '~2.0M–3.2M so‘m (premium komplekt)',
  },
  {
    id: 'kitchen-far-spots',
    label: 'Oshxona · glyans · spot 4 · Qashqadaryo tumani',
    input: {
      roomTypeId: 'oshxona',
      mode: 'area',
      areaM2: 14,
      ceilingTypeId: 'glyans',
      addonQuantities: { spot: 4 },
      districtId: 'qashqadaryo',
    },
    expectedNote: '~650k–1.1M so‘m (o‘rta narx + tuman yo‘l xarajati)',
  },
  {
    id: 'tiny-corridor-far',
    label: 'Koridor · premium · LED liniya 5m · Uzoq hudud',
    input: {
      roomTypeId: 'koridor',
      mode: 'area',
      areaM2: 10,
      ceilingTypeId: 'premium',
      addonQuantities: { 'led-line': 5 },
      districtId: 'far',
    },
    expectedNote: '~1.2M–2.1M so‘m (kichik joy lekin premium + uzoq yo‘l)',
  },
]

