import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LABELS, LABEL_COLORS, LABEL_BG, LABEL_BORDER, LABEL_DESC, LABEL_ADVICE, MODEL_INFO } from '../utils/constants'

function AnimatedBar({ value, color, delay = 0 }) {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setWidth(value * 100), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return (
    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${width}%`, background: color, transitionTimingFunction: 'cubic-bezier(0.34,1.56,0.64,1)' }}
      />
    </div>
  )
}

function WordHighlights({ tokens, scores }) {
  if (!tokens?.length) return <p className="text-xs" style={{ color: '#4a5580' }}>No token data available.</p>
  const max = Math.max(...scores) + 1e-8
  return (
    <div className="leading-loose text-sm flex flex-wrap gap-1">
      {tokens.map((tok, i) => {
        const intensity = scores[i] / max
        let r, g, b, a
        if (intensity > 0.6)      { r=239; g=68;  b=68;  a=0.15+intensity*0.5 }
        else if (intensity > 0.3) { r=245; g=158; b=11;  a=0.1+intensity*0.4 }
        else                      { r=100; g=116; b=139; a=0.12 }
        return (
          <span
            key={i}
            className="px-1.5 py-0.5 rounded transition-transform hover:scale-105 cursor-default"
            style={{ background: `rgba(${r},${g},${b},${a.toFixed(2)})`, color: '#e8eaf6' }}
          >
            {tok}
          </span>
        )
      })}
    </div>
  )
}

export default function ResultPanel({ result }) {
  if (!result) {
    return (
      <div
        className="rounded-2xl p-6 flex flex-col items-center justify-center min-h-[400px]"
        style={{ background: '#0f1527', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="text-5xl mb-4 opacity-20">🧬</div>
        <p className="text-sm text-center max-w-[180px]" style={{ color: '#4a5580' }}>
          Enter text and click Analyse to see severity prediction and model insights
        </p>
      </div>
    )
  }

  const { label, confidence, probabilities, gate_weights, tokens, token_scores, demo_mode } = result
  const color = LABEL_COLORS[label]
  const gates = gate_weights || [0.33, 0.33, 0.34]
  const gTotal = gates.reduce((a, b) => a + b, 0)
  const gNorm  = gates.map(g => g / gTotal)

  return (
    <motion.div
      className="rounded-2xl overflow-hidden"
      style={{ background: '#0f1527', border: `1px solid ${LABEL_BORDER[label]}` }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Top accent bar */}
      <div className="h-1 w-full" style={{ background: color }} />

      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#4a5580', fontFamily: 'Syne, sans-serif' }}>
          Analysis Results {demo_mode && <span style={{ color: '#f59e0b' }}>(Demo Mode)</span>}
        </p>

        {/* Severity + confidence */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-2 font-bold text-sm"
              style={{ background: LABEL_BG[label], border: `1px solid ${LABEL_BORDER[label]}`, color, fontFamily: 'Syne, sans-serif' }}
            >
              <span className="w-2 h-2 rounded-full animate-pulseDot" style={{ background: color }} />
              {label}
            </div>
            <p className="text-xs leading-relaxed max-w-xs" style={{ color: '#8892b0' }}>{LABEL_DESC[label]}</p>
          </div>
          <div className="text-right flex-shrink-0 ml-4">
            <p className="font-bold leading-none" style={{ fontSize: '2.5rem', color, fontFamily: 'Syne, sans-serif' }}>
              {Math.round(confidence * 100)}%
            </p>
            <p className="text-xs" style={{ color: '#4a5580' }}>confidence</p>
          </div>
        </div>

        {/* Advice box */}
        <div
          className="p-3 rounded-xl text-xs leading-relaxed mb-5"
          style={{ background: `${color}12`, borderLeft: `3px solid ${color}`, color: '#8892b0' }}
        >
          {LABEL_ADVICE[label]}
        </div>

        {/* Probability bars */}
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#4a5580', fontFamily: 'Syne, sans-serif' }}>
            Probability Distribution
          </p>
          <div className="flex flex-col gap-2.5">
            {LABELS.map((lbl, i) => (
              <div key={lbl} className="grid items-center gap-3" style={{ gridTemplateColumns: '72px 1fr 38px' }}>
                <span className="text-xs font-medium text-right" style={{ color: LABEL_COLORS[lbl] }}>{lbl}</span>
                <AnimatedBar value={probabilities[i]} color={LABEL_COLORS[lbl]} delay={i * 80} />
                <span className="text-xs text-right" style={{ color: '#4a5580' }}>
                  {(probabilities[i] * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.06)', margin: '0 0 20px' }} />

        {/* Gate weights */}
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#4a5580', fontFamily: 'Syne, sans-serif' }}>
            Model Trust Weights
          </p>
          <p className="text-xs mb-3" style={{ color: '#4a5580' }}>
            How much the fusion gate relied on each model for this prediction
          </p>
          <div className="flex flex-col gap-2.5">
            {MODEL_INFO.map((m, i) => (
              <div key={m.name} className="grid items-center gap-3" style={{ gridTemplateColumns: '90px 1fr 38px' }}>
                <span className="text-xs font-medium" style={{ color: m.color }}>{m.name}</span>
                <AnimatedBar value={gNorm[i]} color={m.color} delay={200 + i * 80} />
                <span className="text-xs text-right" style={{ color: '#4a5580' }}>
                  {(gNorm[i] * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.06)', margin: '0 0 20px' }} />

        {/* Word highlights */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#4a5580', fontFamily: 'Syne, sans-serif' }}>
            Word Attention Highlights
          </p>
          <p className="text-xs mb-3" style={{ color: '#4a5580' }}>
            🔴 High attention · 🟡 Medium · ⬜ Low influence on prediction
          </p>
          <div
            className="p-3 rounded-xl"
            style={{ background: '#1a2240', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <WordHighlights tokens={tokens} scores={token_scores} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
