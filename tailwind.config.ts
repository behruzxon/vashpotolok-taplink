import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Phase Brand-1 — Light premium theme (PotolX)
        // Token nomlari saqlandi (bg-base, bg-elevated, ink-primary, ...),
        // qiymatlar light theme'ga moslashtirildi.
        bg: {
          base: '#F5F7FB',                      // soft off-white page
          surface: '#FFFFFF',                   // card surface (new alias)
          elevated: '#FFFFFF',                  // was dark, now white card
          glass: 'rgba(255, 255, 255, 0.70)',
          'glass-strong': 'rgba(255, 255, 255, 0.92)',
        },
        brand: {
          primary: '#1E3A8A',                   // deep navy
          'primary-700': '#1D4ED8',
          accent: '#2F6BFF',                    // electric cobalt
          'accent-glow': '#60A5FA',             // lighter glow accent
          'accent-soft': 'rgba(47, 107, 255, 0.10)',
        },
        ink: {
          primary: '#0F172A',                   // slate-900
          secondary: '#475569',                 // slate-600
          muted: '#94A3B8',                     // slate-400
        },
        line: {
          soft: '#E2E8F0',                      // slate-200
          strong: '#CBD5E1',                    // slate-300
        },
        gold: {
          DEFAULT: '#B8954A',
          soft: 'rgba(184, 149, 74, 0.12)',
        },
        success: '#16A34A',
        call: '#16A34A',
        telegram: '#2563EB',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '24px',
      },
      boxShadow: {
        // Light theme — soft layered shadows (sm + md combo for depth)
        soft: '0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04)',
        card: '0 4px 14px rgba(15,23,42,0.06), 0 2px 6px rgba(15,23,42,0.04)',
        cta: '0 10px 24px -8px rgba(47,107,255,0.35), 0 2px 6px rgba(15,23,42,0.05)',
        glow: '0 0 32px rgba(96,165,250,0.22)',
        'cta-green': '0 10px 24px -8px rgba(22,163,74,0.30), 0 2px 6px rgba(15,23,42,0.05)',
        'cta-tg': '0 10px 24px -8px rgba(37,99,235,0.30), 0 2px 6px rgba(15,23,42,0.05)',
      },
      backgroundImage: {
        // Hero ambient — soft sky → off-white
        'grad-hero': 'radial-gradient(120% 80% at 50% -10%, #DBEAFE 0%, #F5F7FB 55%)',
        'grad-glow': 'radial-gradient(50% 50% at 50% 0%, rgba(96,165,250,0.22), transparent 70%)',
        'grad-button': 'linear-gradient(135deg, #2F6BFF 0%, #1D4ED8 100%)',
        'grad-button-green': 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
        'grad-button-tg': 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
        'grad-border': 'linear-gradient(135deg, rgba(15,23,42,0.12), rgba(15,23,42,0.04))',
        'grad-gold': 'linear-gradient(135deg, #D9B872, #B8954A)',
      },
      animation: {
        'glow-pulse': 'glow-pulse 8s ease-in-out infinite',
        'shine': 'shine 1.4s ease-in-out',
        'float-up': 'float-up 60s linear infinite',
        'spin-slow': 'spin 90s linear infinite',
        'step-in': 'step-in 320ms cubic-bezier(0.22, 1, 0.36, 1) both',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '0.85', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.04)' },
        },
        shine: {
          '0%': { transform: 'translateX(-120%) skewX(-15deg)' },
          '100%': { transform: 'translateX(220%) skewX(-15deg)' },
        },
        'float-up': {
          '0%': { transform: 'translateY(110vh)', opacity: '0' },
          '10%': { opacity: '0.4' },
          '90%': { opacity: '0.4' },
          '100%': { transform: 'translateY(-10vh)', opacity: '0' },
        },
        'step-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
