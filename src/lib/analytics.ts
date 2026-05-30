export type AnalyticsEvent =
  | { name: 'view_page'; payload: { path: string } }
  | { name: 'click_telegram_bot'; payload: { source: 'hero' | 'price' | 'portfolio' | 'sticky' | 'footer' | 'trust' } }
  | { name: 'click_call'; payload: { source: 'hero' | 'sticky' | 'footer' } }
  | { name: 'click_telegram_profile'; payload: { source: 'hero' | 'faq' } }
  | { name: 'click_catalog'; payload: { source: 'hero' } }
  | { name: 'click_instagram'; payload: { source: 'cta' | 'portfolio' | 'video' } }
  | { name: 'click_youtube'; payload: { source: 'hero' } }
  | { name: 'click_portfolio'; payload: { itemId: string } }
  | { name: 'click_video'; payload: { id: string; destination: 'instagram' | 'video' } }
  | { name: 'click_price_estimate'; payload: { area: number; estimate: number } }
  | { name: 'interact_price_slider'; payload: { area: number } }
  | { name: 'scroll_depth'; payload: { percent: 25 | 50 | 75 | 100 } }
  // Phase 3 — simple price funnel (legacy events kept for back-compat)
  | { name: 'price_funnel_started'; payload: { source: 'view' } }
  | { name: 'price_funnel_step_changed'; payload: { from: number | 'final'; to: number | 'final'; direction: 'forward' | 'back' } }
  | { name: 'price_funnel_completed'; payload: { roomTypeId: string; areaM2: number; ceilingTypeId: string; addonIds: string[]; min: number; max: number } }
  | { name: 'click_price_estimate_bot'; payload: { payload: string; min: number; max: number } }
  // Phase 3.5 — pro calculator
  | { name: 'pro_calculator_started'; payload: { source: 'view' } }
  | { name: 'pro_calculator_step_changed'; payload: { from: number | 'result'; to: number | 'result'; direction: 'forward' | 'back' } }
  | { name: 'pro_calculator_dimension_entered'; payload: { mode: 'dimensions' | 'area'; lengthM?: number; widthM?: number; areaM2?: number } }
  | { name: 'pro_calculator_completed'; payload: { roomTypeId: string; areaM2: number; ceilingTypeId: string; totalMin: number; totalMax: number } }
  | { name: 'click_pro_calculator_telegram'; payload: { payload: string; totalMin: number; totalMax: number } }

const isDev = process.env.NODE_ENV !== 'production'

export function track<E extends AnalyticsEvent>(
  event: E['name'],
  payload: Extract<AnalyticsEvent, { name: E['name'] }>['payload'],
): void {
  if (typeof window === 'undefined') return
  if (isDev) {
    // eslint-disable-next-line no-console
    console.debug('[analytics]', event, payload)
  }
  // Phase 5: ulanadi (Plausible / custom endpoint).
}

/**
 * Generic, type-relaxed tracker — typed taksonomiyaga kirmagan adhoc
 * eventlar uchun (masalan, eksperiment yorliqlari). Productionda silent.
 */
export function trackEvent(name: string, payload?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return
  if (isDev) {
    // eslint-disable-next-line no-console
    console.debug('[analytics:adhoc]', name, payload ?? {})
  }
}
