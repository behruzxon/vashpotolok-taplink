import {
  AREA_MAX_M2,
  AREA_MIN_M2,
  ceilingTypes,
  districtOptions,
  roomTypes,
  type CeilingType,
  type DistrictOption,
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

function findDistrict(id: string): DistrictOption | undefined {
  return districtOptions.find((d) => d.id === id)
}

/**
 * Yakuniy summalar shu qadamga yaxlitlanadi. Mijozga `1 050 000 so‘m`
 * ko‘rinishi `1 047 612 so‘m`'dan ancha tushunarli — taxminiy hisob
 * uchun ham mos.
 */
const ROUNDING_STEP_SOM = 1000

function roundToStep(value: number): number {
  if (!Number.isFinite(value) || value <= 0) return 0
  return Math.round(value / ROUNDING_STEP_SOM) * ROUNDING_STEP_SOM
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
// Calculation (Phase Calc-2: faqat polotno + montaj, addonsiz, travel = 0)
// ---------------------------------------------------------------------------

export function calculateProEstimate(input: ProEstimateInput): ProEstimateResult {
  const empty: ProEstimateResult = {
    valid: false,
    areaM2: 0,
    perimeterM: 0,
    baseMin: 0,
    baseMax: 0,
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

  const totalMin = roundToStep(baseMin)
  const totalMax = roundToStep(baseMax)

  const payload = buildProTelegramPayload(input, { areaM2: area })

  return {
    valid: true,
    areaM2: Math.round(area * 10) / 10,
    perimeterM: Math.round(perimeter * 10) / 10,
    baseMin: roundToStep(baseMin),
    baseMax: roundToStep(baseMax),
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
// Telegram payload (Phase Calc-2: addonsiz qisqa forma)
// ---------------------------------------------------------------------------

/**
 * Pro calculator payload:
 *   pro_<room>_<area>_<ceiling>_<district>
 *
 * Misollar:
 *   pro_zal_24_gulli_kitob
 *   pro_yotoqxona_18_odnotonniy_qarshi-shahar
 *   pro_oshxona_14_mramor_kasbi
 */
export function buildProTelegramPayload(
  input: ProEstimateInput,
  override?: { areaM2?: number },
): string {
  const safeRoom = (input.roomTypeId || 'x').replace(/[^a-z0-9-]/gi, '')
  const safeCeiling = (input.ceilingTypeId || 'x').replace(/[^a-z0-9-]/gi, '')
  const safeDistrict = (input.districtId || 'x').replace(/[^a-z0-9-]/gi, '')

  const areaSource =
    override?.areaM2 !== undefined
      ? override.areaM2
      : deriveAreaAndPerimeter(input).area
  const safeArea = Math.max(0, Math.round(areaSource))

  const payload = `pro_${safeRoom}_${safeArea}_${safeCeiling}_${safeDistrict}`
  return payload.length <= 60 ? payload : payload.slice(0, 60)
}

// ---------------------------------------------------------------------------
// SANITY CHECK — TYPICAL EXAMPLES
// ---------------------------------------------------------------------------
// Real narxlarni o'zgartirgandan keyin: shu 4 ta misol natijasi mantiqsiz
// (juda baland yoki juda past) bo'lib qolmaganini tekshiring. Manual
// sanity check jadvali: docs/PRO_CALCULATOR_SPEC.md §8.5.

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
    label: 'Yotoqxona · odnotonniy · 18 m² · Qarshi shahri',
    input: {
      roomTypeId: 'yotoqxona',
      mode: 'area',
      areaM2: 18,
      ceilingTypeId: 'odnotonniy',
      districtId: 'qarshi-shahar',
    },
    expectedNote: '~1 440 000 — 1 620 000 so‘m (eng oddiy variant)',
  },
  {
    id: 'living-gulli',
    label: 'Zal · gulli · 6×4 m (24 m²) · Kitob',
    input: {
      roomTypeId: 'zal',
      mode: 'dimensions',
      lengthM: 6,
      widthM: 4,
      ceilingTypeId: 'gulli',
      districtId: 'kitob',
    },
    expectedNote: '~3 024 000 — 3 402 000 so‘m (zal + gulli)',
  },
  {
    id: 'mramor-kitchen',
    label: 'Oshxona · mramor · 14 m² · Kasbi',
    input: {
      roomTypeId: 'oshxona',
      mode: 'area',
      areaM2: 14,
      ceilingTypeId: 'mramor',
      districtId: 'kasbi',
    },
    expectedNote: '~1 680 000 — 1 890 000 so‘m (premium mramor)',
  },
  {
    id: 'uv-print-koridor',
    label: 'Koridor · UV pechat · 10 m² · Yakkabog‘',
    input: {
      roomTypeId: 'koridor',
      mode: 'area',
      areaM2: 10,
      ceilingTypeId: 'uv-pechat',
      districtId: 'yakkabog',
    },
    expectedNote: '~1 330 000 — 1 520 000 so‘m (UV pechat, koridor multiplier 0.95)',
  },
]
