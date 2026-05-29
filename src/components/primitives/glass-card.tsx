import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Props = {
  as?: ElementType
  className?: string
  glow?: boolean
  children: ReactNode
}

/**
 * Phase Brand-1 — light premium card surface.
 * Solid white background, subtle border, soft layered shadow.
 * "glass" naming saqlandi back-compat uchun; visual endi clean white card.
 */
export function GlassCard({ as, className, glow = false, children }: Props) {
  const Tag = (as ?? 'div') as ElementType
  return (
    <Tag
      className={cn(
        'relative isolate overflow-hidden rounded-3xl',
        'bg-bg-surface',
        'border border-line-soft',
        glow ? 'shadow-card' : 'shadow-soft',
        className,
      )}
    >
      {/* Top edge highlight — premium polish */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent"
      />
      {children}
    </Tag>
  )
}
