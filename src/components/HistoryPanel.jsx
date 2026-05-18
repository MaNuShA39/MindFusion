import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { LABEL_COLORS, LABEL_BG, LABEL_BORDER } from '../utils/constants'

export default function HistoryPanel() {
  const { history, clearHistory } = useApp()

  if (!history.length) return null

  return (
    <div
      className="rounded-2xl p-5 mt-4"
      style={{ background: '#0f1527', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#4a5580', fontFamily: 'Syne, sans-serif' }}>
          Session History
        </p>
        <button
          onClick={clearHistory}
          className="text-xs px-2.5 py-1 rounded-lg transition-all"
          style={{
            color: '#4a5580',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
            cursor: 'pointer',
          }}
          onMouseEnter={e => e.target.style.color = '#ef4444'}
          onMouseLeave={e => e.target.style.color = '#4a5580'}
        >
          Clear
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <AnimatePresence>
          {history.map((item, i) => {
            const color  = LABEL_COLORS[item.label]
            return (
              <motion.div
                key={item.id}
                className="flex items-center gap-3 p-2.5 rounded-xl"
                style={{
                  background: '#1a2240',
                  border: `1px solid rgba(255,255,255,0.05)`,
                  borderLeft: `3px solid ${color}`,
                }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ delay: i * 0.03 }}
              >
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{ background: LABEL_BG[item.label], color, border: `1px solid ${LABEL_BORDER[item.label]}`, fontFamily: 'Syne, sans-serif' }}
                >
                  {item.label}
                </span>
                <span className="text-xs flex-1 truncate" style={{ color: '#8892b0' }}>
                  {item.text.substring(0, 70)}{item.text.length > 70 ? '...' : ''}
                </span>
                <span className="text-xs flex-shrink-0 font-medium" style={{ color: '#4a5580' }}>
                  {Math.round(item.confidence * 100)}%
                </span>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
