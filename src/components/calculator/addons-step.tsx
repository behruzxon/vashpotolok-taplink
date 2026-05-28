'use client'

import { proAddonOptions } from '@/data/price-options'
import { track } from '@/lib/analytics'
import { QuantityControl } from './quantity-control'

type Props = {
  quantities: Record<string, number>
  onChange: (id: string, qty: number) => void
}

export function AddonsStep({ quantities, onChange }: Props) {
  return (
    <ul className="flex flex-col gap-2">
      {proAddonOptions.map((addon) => {
        const value = quantities[addon.id] ?? addon.defaultQty
        return (
          <li key={addon.id}>
            <QuantityControl
              label={addon.label}
              hint={addon.hint}
              unit={addon.unit}
              value={value}
              min={addon.minQty}
              max={addon.maxQty}
              onChange={(next) => {
                onChange(addon.id, next)
                track('pro_calculator_addon_changed', {
                  id: addon.id,
                  qty: next,
                  unit: addon.unit,
                })
              }}
            />
          </li>
        )
      })}
    </ul>
  )
}
