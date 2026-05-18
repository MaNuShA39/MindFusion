import { useState } from 'react'
import { SAMPLE_TEXTS, LABEL_COLORS } from '../utils/constants'

const samples = [
  { key: 'minimum',  label: 'Minimum',  color: LABEL_COLORS.Minimum },
  { key: 'mild',     label: 'Mild',     color: LABEL_COLORS.Mild },
  { key: 'moderate', label: 'Moderate', color: LABEL_COLORS.Moderate },
  { key: 'severe',   label: 'Severe',   color: LABEL_COLORS.Severe },
]

export default function TextInput({ value, onChange, onAnalyze, loading }) {
  const [focused, setFocused] = useState(false)

  const setSample = (key) => onChange(SAMPLE_TEXTS[key])

  return (
    <div
      className="rounded-2xl p-6"
      style={{ background: '#0f1527', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#4a5580', fontFamily: 'Syne, sans-serif' }}>
         Text Input
      </p>

      {/* Sample buttons */}
      <div className="mb-4">
        <p className="text-xs mb-2" style={{ color: '#4a5580' }}>Try a sample:</p>
        <div className="flex gap-2 flex-wrap">
          {samples.map(s => (
            <button
              key={s.key}
              onClick={() => setSample(s.key)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0"
              style={{
                background: `${s.color}15`,
                border: `1px solid ${s.color}40`,
                color: s.color,
                cursor: 'pointer',
              }}
            >
              ● {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Textarea */}
      <div
        className="rounded-xl transition-all mb-3 overflow-hidden"
        style={{
          border: `1px solid ${focused ? 'rgba(79,142,247,0.4)' : 'rgba(255,255,255,0.08)'}`,
          boxShadow: focused ? '0 0 0 3px rgba(79,142,247,0.08)' : 'none',
        }}
      >
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={e => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') onAnalyze() }}
          placeholder="Paste a Reddit post, tweet, or any text here to analyse depression severity..."
          rows={7}
          className="w-full p-4 text-sm leading-relaxed resize-y outline-none"
          style={{
            background: '#1a2240',
            color: '#e8eaf6',
            fontFamily: 'DM Sans, sans-serif',
            minHeight: '160px',
          }}
        />
      </div>

      {/* Meta row */}
      <div className="flex justify-between items-center mb-4 text-xs" style={{ color: '#4a5580' }}>
        <span>{value.length} characters</span>
        <span>Ctrl+Enter to analyse</span>
      </div>

      {/* Analyze button */}
      <button
        onClick={onAnalyze}
        disabled={loading || !value.trim()}
        className="w-full py-4 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-3 transition-all"
        style={{
          fontFamily: 'Syne, sans-serif',
          background: loading || !value.trim()
            ? 'rgba(255,255,255,0.06)'
            : 'linear-gradient(135deg, #4f8ef7, #7c5cfc)',
          color: loading || !value.trim() ? 'rgba(255,255,255,0.3)' : 'white',
          cursor: loading || !value.trim() ? 'not-allowed' : 'pointer',
          boxShadow: !loading && value.trim() ? '0 4px 20px rgba(79,142,247,0.25)' : 'none',
        }}
        onMouseEnter={e => { if (!loading && value.trim()) e.target.style.transform = 'translateY(-2px)' }}
        onMouseLeave={e => { e.target.style.transform = 'translateY(0)' }}
      >
        {loading ? (
          <>
            <span
              className="w-4 h-4 rounded-full animate-spin-slow"
              style={{ border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white' }}
            />
            Analysing...
          </>
        ) : (
          ' Analyse Text'
        )}
      </button>
    </div>
  )
}
