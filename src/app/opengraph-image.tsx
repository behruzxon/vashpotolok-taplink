import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'VashPotolok — Qashqadaryoda натяжной потолок'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background:
            'radial-gradient(120% 80% at 50% -10%, #1E2E66 0%, #0A0E1A 60%)',
          color: '#F4F7FF',
          fontFamily: 'system-ui, -apple-system, Segoe UI, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: '#B6C2DC',
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: '#5B9BFF',
              boxShadow: '0 0 24px #5B9BFF',
            }}
          />
          Qarshi · Qashqadaryo
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: -3,
              backgroundImage:
                'linear-gradient(135deg, #FFFFFF 0%, #B6C2DC 100%)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            VASH POTOLOK
          </div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              lineHeight: 1.05,
              color: '#5B9BFF',
            }}
          >
            Qashqadaryo bo‘ylab натяжной потолок
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 500,
              color: '#B6C2DC',
              marginTop: 12,
            }}
          >
            O‘lchovdan montajgacha tayyor yechim
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 24,
            fontSize: 20,
            fontWeight: 600,
            color: '#B6C2DC',
          }}
        >
          {['Toza montaj', 'Sifatli material', 'Kafolat', 'LED yoritish'].map(
            (badge) => (
              <div
                key={badge}
                style={{
                  padding: '12px 22px',
                  borderRadius: 999,
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                }}
              >
                {badge}
              </div>
            ),
          )}
        </div>
      </div>
    ),
    size,
  )
}
