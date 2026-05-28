'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'tertiary' | 'ghost'

type Props = {
  href: string
  variant: Variant
  icon: ReactNode
  label: string
  sublabel?: string
  onClick?: () => void
  external?: boolean
  ariaLabel?: string
  className?: string
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-grad-button text-white shadow-cta border-white/15 hover:shadow-[0_18px_50px_-8px_rgba(61,126,255,0.7)]',
  secondary:
    'bg-grad-button-green text-white shadow-cta-green border-white/15',
  tertiary:
    'bg-grad-button-tg text-white shadow-cta-tg border-white/15',
  ghost:
    'bg-bg-glass-strong text-ink-primary border-transparent backdrop-blur-xl hover:bg-white/[0.08] before:absolute before:inset-0 before:rounded-2xl before:p-px before:[background:linear-gradient(135deg,rgba(255,255,255,0.28),rgba(255,255,255,0.04))] before:[mask:linear-gradient(#000,#000)_content-box,linear-gradient(#000,#000)] before:[mask-composite:exclude]',
}

const iconWrapClasses: Record<Variant, string> = {
  primary: 'bg-white/15 ring-1 ring-white/25',
  secondary: 'bg-white/15 ring-1 ring-white/25',
  tertiary: 'bg-white/15 ring-1 ring-white/25',
  ghost: 'bg-white/[0.06] ring-1 ring-white/15',
}

export function CtaButton({
  href,
  variant,
  icon,
  label,
  sublabel,
  onClick,
  external = true,
  ariaLabel,
  className,
}: Props) {
  return (
    <a
      href={href}
      onClick={onClick}
      aria-label={ariaLabel ?? label}
      {...(external && href.startsWith('http')
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {})}
      className={cn(
        'group relative isolate flex min-h-[64px] items-center gap-3 overflow-hidden rounded-2xl border px-4 py-3 transition-transform duration-200 ease-out',
        'active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base',
        variantClasses[variant],
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
          iconWrapClasses[variant],
        )}
      >
        {icon}
      </span>

      <span className="flex min-w-0 flex-1 flex-col text-left">
        <span className="truncate text-[15px] font-semibold leading-tight">
          {label}
        </span>
        {sublabel ? (
          <span className="truncate text-[12px] font-medium leading-tight opacity-80">
            {sublabel}
          </span>
        ) : null}
      </span>

      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="h-5 w-5 shrink-0 opacity-70 transition-transform duration-200 group-hover:translate-x-0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 6l6 6-6 6" />
      </svg>

      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-shine motion-reduce:hidden"
      />
    </a>
  )
}
