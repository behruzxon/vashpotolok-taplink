import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Props = {
  as?: ElementType
  className?: string
  glow?: boolean
  children: ReactNode
}

export function GlassCard({ as, className, glow = false, children }: Props) {
  const Tag = (as ?? 'div') as ElementType
  return (
    <Tag
      className={cn(
        'relative isolate overflow-hidden rounded-3xl',
        'bg-bg-glass-strong backdrop-blur-xl backdrop-saturate-150',
        'border border-line-soft',
        'shadow-card',
        'before:absolute before:inset-0 before:-z-10 before:rounded-3xl before:bg-grad-border before:p-px before:[mask:linear-gradient(#000,#000)_content-box,linear-gradient(#000,#000)] before:[mask-composite:exclude]',
        glow && 'shadow-glow',
        className,
      )}
    >
      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      {children}
    </Tag>
  )
}
