import type { BreakdownItem } from '@/lib/pro-price-estimate'
import { formatPriceRange } from '@/lib/pro-price-estimate'

type Props = {
  items: BreakdownItem[]
}

const unitSuffix: Record<NonNullable<BreakdownItem['unit']>, string> = {
  meter: 'm',
  piece: 'dona',
  fixed: '',
  area: 'm²',
}

export function EstimateBreakdown({ items }: Props) {
  if (items.length === 0) return null
  return (
    <ul className="overflow-hidden rounded-2xl border border-line-soft bg-bg-base">
      {items.map((item, i) => (
        <li
          key={item.id}
          className={[
            'flex items-start justify-between gap-3 px-3.5 py-2.5',
            i > 0 ? 'border-t border-line-soft' : '',
          ].join(' ')}
        >
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold leading-tight text-ink-primary">
              {item.label}
            </p>
            {item.qty !== undefined && item.unit && unitSuffix[item.unit] ? (
              <p className="mt-0.5 text-[10.5px] text-ink-muted">
                {item.qty} {unitSuffix[item.unit]}
              </p>
            ) : null}
          </div>
          <p className="shrink-0 text-right text-[12.5px] font-semibold tabular-nums text-ink-primary">
            {formatPriceRange(item.min, item.max)}
          </p>
        </li>
      ))}
    </ul>
  )
}
