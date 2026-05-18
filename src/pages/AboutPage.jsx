import { motion } from 'framer-motion'
import { MODEL_INFO, LABEL_COLORS } from '../utils/constants'

const metrics = [
  { label: 'Weighted F1',    value: '0.7375', color: '#4f8ef7' },
  { label: 'AUC-ROC',        value: '0.8246', color: '#7c5cfc' },
  { label: 'Models Fused',   value: '3',      color: '#10b981' },
  { label: 'Severity Levels', value: '4',     color: '#f59e0b' },
]

const stages = [
  {
    num: '01',
    title: 'Stage 1 — Binary Pre-training',
    desc: 'Each model is first fine-tuned on the Reddit binary depression dataset (7,731 samples) to learn the fundamental language patterns of depressive text versus non-depressive text.',
    color: '#4f8ef7',
  },
  {
    num: '02',
    title: 'Stage 2 — Severity Fine-tuning',
    desc: 'The pre-trained models are then fine-tuned on the Naseem severity dataset (3,553 samples) across four classes: Minimum, Mild, Moderate, and Severe, using class-weighted loss to handle imbalance.',
    color: '#7c5cfc',
  },
  {
    num: '03',
    title: 'Gated Fusion',
    desc: 'The [CLS] embeddings from all three fine-tuned models are passed into a learned gated fusion network. A small gate network dynamically weights each model\'s contribution per input, producing a final severity prediction.',
    color: '#10b981',
  },
]

const novelty = [
  'Two-stage transfer learning pipeline (binary → severity) applied simultaneously across three models',
  'First combination of BERT + MentalBERT + RoBERTa in a learned gated fusion for severity',
  'Learned gate weights provide per-prediction interpretability — visible in the UI',
  'Domain-specific model (MentalBERT) explicitly included alongside general-purpose models',
  'No prior work fuses these three specific architectures for 4-class depression severity',
]

export default function AboutPage() {
  return (
    <div className="relative z-10 max-w-4xl mx-auto px-6 py-10">

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-10">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: '#4f8ef7', fontFamily: 'Syne, sans-serif' }}
          >
            About This Project
          </p>
          <h1
            className="text-4xl font-extrabold mb-4"
            style={{
              fontFamily: 'Syne, sans-serif',
              background: 'linear-gradient(135deg, #e8eaf6 40%, #8892b0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            <img
          src="/logo mind.png"
          alt="MindFusion Logo"
          className="w-12 h-12 rounded-xl mb-1 inline-block mr-3"
        />
            MindFusion
          </h1>
          <p className="text-sm leading-relaxed max-w-2xl" style={{ color: '#8892b0' }}>
            A Final Year Project at University of Westminster (W1954031) exploring
            depression severity detection through a novel three-model gated transformer fusion
            architecture with two-stage transfer learning.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {metrics.map(m => (
            <div
              key={m.label}
              className="rounded-2xl p-4 text-center"
              style={{ background: '#0f1527', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <p
                className="font-extrabold leading-none mb-1"
                style={{ fontSize: '1.8rem', color: m.color, fontFamily: 'Syne, sans-serif' }}
              >
                {m.value}
              </p>
              <p className="text-xs uppercase tracking-wide" style={{ color: '#4a5580' }}>{m.label}</p>
            </div>
          ))}
        </div>

        {/* Architecture */}
        <div
          className="rounded-2xl p-6 mb-6"
          style={{ background: '#0f1527', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-5"
            style={{ color: '#4a5580', fontFamily: 'Syne, sans-serif' }}
          >
            System Architecture
          </p>

          {/* Pipeline visual */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
            {/* Input */}
            <div className="flex-shrink-0 text-center">
              <div
                className="px-4 py-3 rounded-xl text-sm font-semibold mb-1"
                style={{ background: '#1a2240', border: '1px solid rgba(255,255,255,0.1)', color: '#e8eaf6', fontFamily: 'Syne, sans-serif' }}
              >
                Text Input
              </div>
              <p className="text-xs" style={{ color: '#4a5580' }}>Reddit post / tweet</p>
            </div>

            <div style={{ color: '#4a5580' }}>→</div>

            {/* Three models */}
            <div className="flex flex-col gap-2 flex-shrink-0">
              {MODEL_INFO.map(m => (
                <div
                  key={m.name}
                  className="px-3 py-2 rounded-xl text-xs font-semibold"
                  style={{
                    background: `${m.color}15`,
                    border: `1px solid ${m.color}35`,
                    color: m.color,
                    fontFamily: 'Syne, sans-serif',
                  }}
                >
                  {m.name}
                </div>
              ))}
            </div>

            <div style={{ color: '#4a5580' }}>→</div>

            {/* Fusion */}
            <div className="flex-shrink-0 text-center">
              <div
                className="px-4 py-3 rounded-xl text-sm font-semibold mb-1"
                style={{
                  background: 'rgba(124,92,252,0.12)',
                  border: '1px solid rgba(124,92,252,0.3)',
                  color: '#7c5cfc',
                  fontFamily: 'Syne, sans-serif',
                }}
              >
                Gated Fusion
              </div>
              <p className="text-xs" style={{ color: '#4a5580' }}>Learned gate weights</p>
            </div>

            <div style={{ color: '#4a5580' }}>→</div>

            {/* Output */}
            <div className="flex-shrink-0">
              <div className="flex flex-col gap-1.5">
                {['Minimum', 'Mild', 'Moderate', 'Severe'].map(lbl => (
                  <div
                    key={lbl}
                    className="px-3 py-1 rounded-lg text-xs font-semibold"
                    style={{
                      background: `${LABEL_COLORS[lbl]}15`,
                      border: `1px solid ${LABEL_COLORS[lbl]}35`,
                      color: LABEL_COLORS[lbl],
                      fontFamily: 'Syne, sans-serif',
                    }}
                  >
                    {lbl}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Training stages */}
          <div className="flex flex-col gap-3">
            {stages.map((s, i) => (
              <motion.div
                key={s.num}
                className="flex gap-4 p-4 rounded-xl"
                style={{ background: '#1a2240', border: '1px solid rgba(255,255,255,0.06)' }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: `${s.color}15`, color: s.color, fontFamily: 'Syne, sans-serif' }}
                >
                  {s.num}
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1 text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                    {s.title}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: '#8892b0' }}>{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Models */}
        <div
          className="rounded-2xl p-6 mb-6"
          style={{ background: '#0f1527', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: '#4a5580', fontFamily: 'Syne, sans-serif' }}
          >
            Individual Model Results (Test Set)
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { ...MODEL_INFO[0], f1: '0.7563' },
              { ...MODEL_INFO[1], f1: '0.7565' },
              { ...MODEL_INFO[2], f1: '0.7542' },
            ].map(m => (
              <div
                key={m.name}
                className="p-4 rounded-xl text-center"
                style={{
                  background: `${m.color}08`,
                  border: `1px solid ${m.color}25`,
                }}
              >
                <p className="text-2xl font-bold mb-1" style={{ color: m.color, fontFamily: 'Syne, sans-serif' }}>
                  {m.f1}
                </p>
                <p className="text-xs font-semibold mb-0.5" style={{ color: m.color }}>{m.name}</p>
                <p className="text-xs" style={{ color: '#4a5580' }}>{m.desc}</p>
              </div>
            ))}
          </div>
          <div
            className="mt-3 p-4 rounded-xl text-center"
            style={{ background: 'rgba(124,92,252,0.08)', border: '1px solid rgba(124,92,252,0.25)' }}
          >
            <p className="text-2xl font-bold mb-1" style={{ color: '#7c5cfc', fontFamily: 'Syne, sans-serif' }}>
              0.7375
            </p>
            <p className="text-xs font-semibold mb-0.5" style={{ color: '#7c5cfc' }}>Gated Fusion (Proposed)</p>
            <p className="text-xs" style={{ color: '#4a5580' }}>AUC-ROC: 0.8246 · Weighted F1 on test set</p>
          </div>
        </div>

        {/* Novelty */}
        <div
          className="rounded-2xl p-6 mb-6"
          style={{ background: '#0f1527', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: '#4a5580', fontFamily: 'Syne, sans-serif' }}
          >
            Research Novelty
          </p>
          <div className="flex flex-col gap-2.5">
            {novelty.map((n, i) => (
              <motion.div
                key={i}
                className="flex gap-3 items-start text-sm"
                style={{ color: '#8892b0' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05 * i }}
              >
                <span className="mt-0.5 flex-shrink-0" style={{ color: '#10b981' }}>✓</span>
                {n}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div
          className="rounded-2xl p-5"
          style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: '#f59e0b', fontFamily: 'Syne, sans-serif' }}>
            ⚠️ Important Disclaimer
          </p>
          <p className="text-xs leading-relaxed text-justify" style={{ color: '#8892b0' }}>
            MindFusion is a research prototype developed for academic purposes only. It is <strong className="text-white">not a clinical diagnostic tool</strong> and should not replace professional mental health assessment. User data is never stored. If you or someone you know is struggling, please contact a qualified mental health professional immediately.
          </p>
        </div>

      </motion.div>
    </div>
  )
}
