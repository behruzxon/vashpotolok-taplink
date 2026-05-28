'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { CalculatorShell, TOTAL_STEPS } from './calculator/calculator-shell'
import { RoomStep } from './calculator/room-step'
import { SizeStep } from './calculator/size-step'
import { CeilingStep } from './calculator/ceiling-step'
import { DistrictStep } from './calculator/district-step'
import { ResultStep } from './calculator/result-step'
import {
  AREA_DEFAULT_M2,
  AREA_MAX_M2,
  AREA_MIN_M2,
  type RoomShapeMode,
} from '@/data/price-options'
import {
  calculateProEstimate,
  parseDecimal,
} from '@/lib/pro-price-estimate'
import { track } from '@/lib/analytics'

type Step = 1 | 2 | 3 | 4 | 'result'

const STEP_ORDER: Step[] = [1, 2, 3, 4, 'result']

// Phase Calc-2 input steps: 1 room, 2 size, 3 ceiling, 4 district.
// Result is the 5th visible state (TOTAL_STEPS = 5 in shell).
const LAST_INPUT_STEP = 4

const STEP_COPY: Record<Exclude<Step, 'result'>, { title: string; subtitle: string }> = {
  1: {
    title: 'Qaysi xona uchun?',
    subtitle: 'Xona turiga qarab narx taxmini moslashadi.',
  },
  2: {
    title: 'Xona o‘lchami',
    subtitle: 'Uzunlik va eni yozilsa, maydon avtomatik hisoblanadi.',
  },
  3: {
    title: 'Qaysi tur kerak?',
    subtitle: 'Dizayn turiga qarab narx taxmini farq qiladi.',
  },
  4: {
    title: 'Tumanni tanlang',
    subtitle: 'Qaysi hududdan yozayotganingizni belgilang.',
  },
}

export function PriceEstimateCard() {
  const [step, setStep] = useState<Step>(1)
  const [roomTypeId, setRoomTypeId] = useState<string>('')
  const [mode, setMode] = useState<RoomShapeMode>('dimensions')
  const [lengthM, setLengthM] = useState<string>('6')
  const [widthM, setWidthM] = useState<string>('4')
  const [areaInput, setAreaInput] = useState<string>(String(AREA_DEFAULT_M2))
  const [ceilingTypeId, setCeilingTypeId] = useState<string>('')
  const [districtId, setDistrictId] = useState<string>('')

  const startedRef = useRef(false)
  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true
    track('pro_calculator_started', { source: 'view' })
  }, [])

  const result = useMemo(
    () =>
      calculateProEstimate({
        roomTypeId,
        mode,
        lengthM: parseDecimal(lengthM),
        widthM: parseDecimal(widthM),
        areaM2: parseDecimal(areaInput),
        ceilingTypeId,
        districtId,
      }),
    [roomTypeId, mode, lengthM, widthM, areaInput, ceilingTypeId, districtId],
  )

  const sizeValid = useMemo(() => {
    if (mode === 'dimensions') {
      const l = parseDecimal(lengthM)
      const w = parseDecimal(widthM)
      if (!Number.isFinite(l) || !Number.isFinite(w) || l <= 0 || w <= 0) return false
      const a = l * w
      return a >= AREA_MIN_M2 && a <= AREA_MAX_M2
    }
    const a = parseDecimal(areaInput)
    return Number.isFinite(a) && a >= AREA_MIN_M2 && a <= AREA_MAX_M2
  }, [mode, lengthM, widthM, areaInput])

  const goTo = (next: Step) => {
    if (next === step) return
    const fromIdx = STEP_ORDER.indexOf(step)
    const toIdx = STEP_ORDER.indexOf(next)
    track('pro_calculator_step_changed', {
      from: step === 'result' ? 'result' : (step as number),
      to: next === 'result' ? 'result' : (next as number),
      direction: toIdx > fromIdx ? 'forward' : 'back',
    })
    if (step === 2 && toIdx > fromIdx) {
      track('pro_calculator_dimension_entered', {
        mode,
        lengthM: parseDecimal(lengthM),
        widthM: parseDecimal(widthM),
        areaM2: parseDecimal(areaInput),
      })
    }
    setStep(next)
    if (next === 'result' && result.valid) {
      track('pro_calculator_completed', {
        roomTypeId,
        areaM2: result.areaM2,
        ceilingTypeId,
        districtId,
        totalMin: result.totalMin,
        totalMax: result.totalMax,
      })
    }
  }

  const next = () => {
    const idx = STEP_ORDER.indexOf(step)
    const target = STEP_ORDER[idx + 1]
    if (target) goTo(target)
  }
  const back = () => {
    const idx = STEP_ORDER.indexOf(step)
    const target = STEP_ORDER[idx - 1]
    if (target) goTo(target)
  }

  const restart = () => {
    setRoomTypeId('')
    setCeilingTypeId('')
    setDistrictId('')
    setMode('dimensions')
    setLengthM('6')
    setWidthM('4')
    setAreaInput(String(AREA_DEFAULT_M2))
    goTo(1)
  }

  const canGoNext: boolean =
    step === 1
      ? roomTypeId !== ''
      : step === 2
        ? sizeValid
        : step === 3
          ? ceilingTypeId !== ''
          : step === 4
            ? districtId !== '' && result.valid
            : false

  const card =
    step === 'result' ? (
      <CalculatorShell
        step="result"
        title="Siz uchun taxminiy hisob"
        subtitle="Aniq narxni botda olishingiz mumkin."
        back={{ onClick: () => goTo(LAST_INPUT_STEP) }}
      >
        <ResultStep
          result={result}
          roomTypeId={roomTypeId}
          ceilingTypeId={ceilingTypeId}
          districtId={districtId}
          onRestart={restart}
        />
      </CalculatorShell>
    ) : (
      (() => {
        const copy = STEP_COPY[step]
        const isFinalInput = step === LAST_INPUT_STEP
        const nextLabel = isFinalInput ? 'Hisobni ko‘rish' : 'Davom etish'
        return (
          <CalculatorShell
            step={step}
            title={copy.title}
            subtitle={copy.subtitle}
            back={step > 1 ? { onClick: back } : undefined}
            next={{ onClick: next, disabled: !canGoNext, label: nextLabel }}
          >
            {step === 1 ? <RoomStep selectedId={roomTypeId} onSelect={setRoomTypeId} /> : null}
            {step === 2 ? (
              <SizeStep
                mode={mode}
                lengthM={lengthM}
                widthM={widthM}
                areaM2={areaInput}
                onModeChange={setMode}
                onLengthChange={setLengthM}
                onWidthChange={setWidthM}
                onAreaChange={setAreaInput}
              />
            ) : null}
            {step === 3 ? (
              <CeilingStep selectedId={ceilingTypeId} onSelect={setCeilingTypeId} />
            ) : null}
            {step === 4 ? (
              <DistrictStep selectedId={districtId} onSelect={setDistrictId} />
            ) : null}
          </CalculatorShell>
        )
      })()
    )

  // TOTAL_STEPS imported so it's referenced (5 segments rendered by shell).
  void TOTAL_STEPS

  return (
    <div className="flex flex-col gap-2.5">
      <PriceAnchor />
      {card}
    </div>
  )
}

function PriceAnchor() {
  return (
    <div className="flex items-start gap-2.5 rounded-2xl border border-line-soft bg-white/[0.03] px-3.5 py-2.5">
      <svg
        viewBox="0 0 24 24"
        className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent-glow"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4" />
        <path d="M12 16h.01" />
      </svg>
      <p className="text-[11.5px] leading-snug text-ink-secondary">
        <span className="font-semibold text-ink-primary">Taxminiy hisob 1 daqiqada.</span>{' '}
        Yakuniy narx o‘lchov va yakuniy tanlovdan keyin aniqlanadi.
      </p>
    </div>
  )
}
