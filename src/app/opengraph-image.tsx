import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Potolok X — Qashqadaryoda natijnoy potolok'
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
            'radial-gradient(120% 80% at 50% -10%, #DBEAFE 0%, #F5F7FB 60%)',
          color: '#0F172A',
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
            color: '#475569',
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: '#2F6BFF',
              boxShadow: '0 0 24px #60A5FA',
            }}
          />
          Qarshi · Qashqadaryo
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 22,
            }}
          >
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: 24,
                background: 'linear-gradient(135deg, #2F6BFF 0%, #1D4ED8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontSize: 44,
                fontWeight: 800,
                letterSpacing: -1,
                boxShadow: '0 16px 40px -8px rgba(47,107,255,0.45)',
              }}
            >
              PX
            </div>
            <div
              style={{
                fontSize: 88,
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: -3,
                backgroundImage:
                  'linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Potolok X
            </div>
          </div>
          <div
            style={{
              fontSize: 50,
              fontWeight: 700,
              lineHeight: 1.05,
              color: '#1D4ED8',
            }}
          >
            Qashqadaryo bo‘ylab natijnoy potolok
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 500,
              color: '#475569',
              marginTop: 8,
            }}
          >
            O‘lchov · Dizayn · Montaj
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 18,
            fontSize: 20,
            fontWeight: 600,
            color: '#475569',
          }}
        >
          {['Taxminiy hisob', 'Toza montaj', 'Material tanlash', 'Telegram'].map(
            (badge) => (
              <div
                key={badge}
                style={{
                  padding: '12px 22px',
                  borderRadius: 999,
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 2px 6px rgba(15,23,42,0.05)',
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
