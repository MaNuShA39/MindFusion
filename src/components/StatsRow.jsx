import { useApp } from '../context/AppContext'

export default function StatsRow() {
  const { stats } = useApp()

  const cards = [
    { label: 'Total Scans',       value: stats.total, color: '#4f8ef7' },
    { label: 'Minimum',           value: stats.min,   color: '#10b981' },
    { label: 'Mild / Moderate',   value: stats.mild,  color: '#f59e0b' },
    { label: 'Severe',            value: stats.sev,   color: '#7c3aed' },
  ]

  return (
    <div className="grid grid-cols-4 gap-3 mb-7">
      {cards.map(c => (
        <div
          key={c.label}
          className="rounded-2xl p-4 text-center"
          style={{ background: '#0f1527', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <p
            className="font-bold leading-none mb-1"
            style={{ fontSize: '1.75rem', color: c.color, fontFamily: 'Syne, sans-serif' }}
          >
            {c.value}
          </p>
          <p className="text-xs uppercase tracking-wide" style={{ color: '#4a5580' }}>{c.label}</p>
        </div>
      ))}
    </div>
  )
}
