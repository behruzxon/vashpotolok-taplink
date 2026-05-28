import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#0A0E1A',
          elevated: '#111729',
          glass: 'rgba(255, 255, 255, 0.04)',
          'glass-strong': 'rgba(255, 255, 255, 0.08)',
        },
        brand: {
          primary: '#0B1B3F',
          'primary-700': '#0E2454',
          accent: '#3D7EFF',
          'accent-glow': '#5B9BFF',
          'accent-soft': 'rgba(61, 126, 255, 0.18)',
        },
        ink: {
          primary: '#F4F7FF',
          secondary: '#B6C2DC',
          muted: '#6B7896',
        },
        line: {
          soft: 'rgba(255, 255, 255, 0.08)',
          strong: 'rgba(255, 255, 255, 0.16)',
        },
        gold: {
          DEFAULT: '#D9B872',
          soft: 'rgba(217, 184, 114, 0.15)',
        },
        success: '#3DD68C',
        call: '#28C76F',
        telegram: '#29A9EB',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '24px',
        '3xl': '28px',
      },
      boxShadow: {
        soft: '0 8px 24px rgba(0, 0, 0, 0.25)',
        card: '0 20px 60px -10px rgba(0, 0, 0, 0.45)',
        cta: '0 12px 40px -8px rgba(61, 126, 255, 0.55)',
        glow: '0 0 80px 0 rgba(91, 155, 255, 0.35)',
        'cta-green': '0 12px 40px -8px rgba(40, 199, 111, 0.45)',
        'cta-tg': '0 12px 40px -8px rgba(41, 169, 235, 0.45)',
      },
      backgroundImage: {
        'grad-hero': 'radial-gradient(120% 80% at 50% -10%, #1E2E66 0%, #0A0E1A 55%)',
        'grad-glow': 'radial-gradient(50% 50% at 50% 0%, rgba(91,155,255,0.45), transparent 70%)',
        'grad-button': 'linear-gradient(135deg, #3D7EFF 0%, #2A5BD1 100%)',
        'grad-button-green': 'linear-gradient(135deg, #34E08F 0%, #1FA055 100%)',
        'grad-button-tg': 'linear-gradient(135deg, #50C0F2 0%, #1E8FCB 100%)',
        'grad-border': 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.05))',
        'grad-gold': 'linear-gradient(135deg, #E9CE89, #B8954A)',
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
          '50%': { opacity: '1', transform: 'scale(1.05)' },
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
