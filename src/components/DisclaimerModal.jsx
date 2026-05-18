import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const points = [
  {
    
    title: 'Your data is never stored',
    body: 'Any text you enter is processed in real time for analysis only. Nothing you type is saved, logged, or retained in any database for any reason whatsoever.',
  },
  {
    
    title: 'Research prototype — not a clinical tool',
    body: 'MindFusion is an academic Final Year Project built for educational purposes. Results are not a medical diagnosis and should not replace professional mental health assessment.',
  },
  {
    
    title: 'No need to panic about your results',
    body: 'A "Moderate" or "Severe" prediction does not mean you are unwell. This system analyses language patterns only. If you have genuine concerns, please speak with a qualified professional.',
  },
  {
    
    title: 'Academic use only',
    body: 'This system was developed as a Final Year Project at IIT / University of Westminster (Student: W1954031) and is intended solely for demonstration and research purposes.',
  },
]

export default function DisclaimerModal({ onAgree }) {
  const [checked, setChecked] = useState(false)

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(5,8,20,0.92)', backdropFilter: 'blur(12px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative w-full max-w-lg max-h-[90vh] rounded-3xl overflow-y-auto"
          style={{
            background: '#0f1527',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(79,142,247,0.1)',
          }}
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', damping: 20, stiffness: 280 }}
        >
          {/* Top gradient bar */}
          <div className="h-[3px] w-full" style={{ background: 'linear-gradient(90deg, #4f8ef7, #7c5cfc, #10b981)' }} />

          <div className="p-5 sm:p-8">
            {/* Icon + heading */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6"
              style={{ background: 'rgba(79,142,247,0.12)', border: '1px solid rgba(79,142,247,0.25)' }}
            >
              
            </div>

            <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: '#4f8ef7', fontFamily: 'Syne, sans-serif' }}>
              Before You Continue
            </p>
            <h2 className="text-2xl font-bold mb-1 text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              Please Read This First
            </h2>
            <p className="text-sm mb-6" style={{ color: '#8892b0' }}>
              MindFusion requires your informed consent before use.
            </p>

            {/* Points */}
            <div className="flex flex-col gap-3 mb-6">
              {points.map((p, i) => (
                <motion.div
                  key={i}
                  className="flex gap-3 p-3 rounded-xl"
                  style={{ background: '#1a2240', border: '1px solid rgba(255,255,255,0.06)' }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                >
                  <span className="text-lg flex-shrink-0 mt-0.5">{p.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-white mb-0.5">{p.title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: '#8892b0' }}>{p.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Checkbox */}
            <label
              className="flex gap-3 items-start p-3 rounded-xl cursor-pointer mb-5 transition-all"
              style={{
                background: checked ? 'rgba(79,142,247,0.06)' : '#1a2240',
                border: `1px solid ${checked ? 'rgba(79,142,247,0.35)' : 'rgba(255,255,255,0.07)'}`,
              }}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={e => setChecked(e.target.checked)}
                className="mt-0.5 w-4 h-4 flex-shrink-0 cursor-pointer accent-blue-500"
              />
              <span className="text-sm leading-relaxed" style={{ color: '#8892b0' }}>
                I have read and understood the above. I agree to use MindFusion responsibly and understand it is{' '}
                <strong className="text-white">not a substitute for professional mental health advice.</strong>
              </span>
            </label>

            {/* CTA button */}
            <motion.button
              onClick={onAgree}
              disabled={!checked}
              className="w-full py-4 rounded-xl text-white font-bold text-base tracking-wide transition-all"
              style={{
                fontFamily: 'system-ui',
                background: checked
                  ? 'linear-gradient(135deg, #4f8ef7, #7c5cfc)'
                  : 'rgba(255,255,255,0.08)',
                color: checked ? 'white' : 'rgba(255,255,255,0.3)',
                cursor: checked ? 'pointer' : 'not-allowed',
                boxShadow: checked ? '0 4px 20px rgba(79,142,247,0.3)' : 'none',
              }}
              whileHover={checked ? { y: -2, boxShadow: '0 8px 28px rgba(79,142,247,0.4)' } : {}}
              whileTap={checked ? { y: 0 } : {}}
            >
              I Understand — Continue to MindFusion
            </motion.button>

            <p className="text-center text-xs mt-4" style={{ color: '#4a5580' }}>
              This is Research Prototype<br />
              If you are in crisis, please contact a mental health helpline immediately.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
