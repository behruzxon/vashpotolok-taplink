type Step = {
  id: string
  title: string
  subtitle: string
}

const steps: Step[] = [
  { id: '1', title: 'Buyurtma', subtitle: 'Telegram yoki qo‘ng‘iroq' },
  { id: '2', title: 'Ўлчов', subtitle: 'Mutaxassis kelib o‘lchaydi · bepul' },
  { id: '3', title: 'Tanlash', subtitle: 'Material, rang, dizayn' },
  { id: '4', title: 'Montaj', subtitle: 'Toza, 1 kun ichida' },
  { id: '5', title: 'Kafolat', subtitle: 'Rasmiy hujjat bilan' },
]

export function ProcessSteps() {
  return (
    <section aria-labelledby="process-title">
      <div className="mb-3 px-1">
        <h2 id="process-title" className="text-[18px] font-bold text-ink-primary">
          Jarayon
        </h2>
        <p className="text-[12px] text-ink-muted">Buyurtmadan kafolatgacha — 5 qadam</p>
      </div>

      <ol className="relative space-y-3 rounded-3xl border border-line-soft bg-bg-glass-strong p-4 backdrop-blur-md">
        <span
          aria-hidden
          className="absolute left-[34px] top-7 bottom-7 w-px bg-gradient-to-b from-brand-accent-glow/60 via-brand-accent/30 to-transparent"
        />
        {steps.map((step, i) => (
          <li key={step.id} className="relative flex items-start gap-3 pl-1">
            <span
              aria-hidden
              className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-accent to-brand-primary-700 text-[12px] font-bold text-white shadow-[0_0_0_4px_rgba(91,155,255,0.12)] ring-1 ring-white/15"
            >
              {i + 1}
            </span>
            <div className="min-w-0 flex-1 pt-1">
              <p className="text-[14px] font-semibold leading-tight text-ink-primary">
                {step.title}
              </p>
              <p className="mt-0.5 text-[12px] leading-snug text-ink-secondary">
                {step.subtitle}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
