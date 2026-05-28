'use client'

import type { ElementType, ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'

type Props = {
  children: ReactNode
  delay?: number
  as?: ElementType
  className?: string
}

export function RevealOnScroll({ children, delay = 0, as, className }: Props) {
  const Tag = (as ?? 'div') as ElementType
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
            break
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref as never}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        'transition-all duration-700 ease-out will-change-transform',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
