import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { predict, simulateResult, testConnection, setApiUrl } from '../utils/api'
import TextInput from '../components/TextInput'
import ResultPanel from '../components/ResultPanel'
import StatsRow from '../components/StatsRow'
import HistoryPanel from '../components/HistoryPanel'
import { MODEL_INFO } from '../utils/constants'

const BACKEND_URL = 'http://localhost:8000'

export default function AnalyzePage() {
  const { connected, setConnected, addToHistory, lastResult, setLastResult } = useApp()
  const [text, setText]         = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [checking, setChecking] = useState(true)

  // Auto-connect to backend on page load
  useEffect(() => {
    const autoConnect = async () => {
      try {
        setApiUrl(BACKEND_URL)
        await testConnection(BACKEND_URL)
        setConnected(true)
      } catch {
        setConnected(false)
      } finally {
        setChecking(false)
      }
    }
    autoConnect()
  }, [])

  const handleAnalyze = async () => {
    if (!text.trim()) return
    setLoading(true)
    setError('')
    try {
      let result
      if (connected) {
        result = await predict(text.trim())
      } else {
        await new Promise(r => setTimeout(r, 800))
        result = simulateResult(text.trim())
      }
      setLastResult(result)
      addToHistory(result, text.trim())
    } catch (e) {
      const fallback = simulateResult(text.trim())
      setLastResult(fallback)
      addToHistory(fallback, text.trim())
      setError('Backend unreachable — showing demo result.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">

      {/* Page header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
          style={{
            background: 'rgba(79,142,247,0.1)',
            border: '1px solid rgba(79,142,247,0.2)',
            color: '#4f8ef7',
            fontFamily: 'Syne, sans-serif',
          }}
        >
          Gated Transformer Fusion
        </div>

        <h1
          className="text-5xl font-extrabold leading-snug mb-4"
          style={{
            fontFamily: 'classiC, sans-serif',
            background: 'linear-gradient(135deg, #e8eaf6 40%, #8892b0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Analyse Depression Severity<br />in Natural Language
        </h1>

        <p className="text-sm max-w-md mx-auto leading-relaxed" style={{ color: '#8892b0' }}>
          Three fine-tuned transformer models combined through a learned gated fusion network
          to classify text into four depression severity levels.
        </p>

        {/* Model pills */}
        <div className="flex justify-center gap-2 flex-wrap mt-5">
          {MODEL_INFO.map(m => (
            <div
              key={m.name}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{
                background: '#1a2240',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#8892b0',
              }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: m.color }} />
              {m.name}
            </div>
          ))}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{ background: '#1a2240', border: '1px solid rgba(255,255,255,0.08)', color: '#8892b0' }}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: '#7c5cfc' }} />
            Gated Fusion
          </div>
        </div>

        {/* Connection status indicator */}
        <div className="flex justify-center mt-4">
          {checking ? (
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
              style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', color: '#f59e0b' }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulseDot"
                style={{ background: '#f59e0b' }}
              />
              Connecting to models...
            </div>
          ) : connected ? (
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
              style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#10b981' }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulseDot"
                style={{ background: '#10b981' }}
              />
              Models loaded — ready to analyse
            </div>
          ) : (
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
              style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444' }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#ef4444' }} />
              Backend offline — running in demo mode
            </div>
          )}
        </div>
      </motion.div>

      {/* Session stats */}
      <StatsRow />

      {/* Error banner */}
      {error && (
        <div
          className="mb-4 px-4 py-3 rounded-xl text-xs"
          style={{
            background: 'rgba(245,158,11,0.1)',
            border: '1px solid rgba(245,158,11,0.25)',
            color: '#f59e0b',
          }}
        >
          ⚠️ {error}
        </div>
      )}

      {/* Main grid */}
      <div
        className="grid gap-5"
        style={{ gridTemplateColumns: '1.1fr 0.9fr', alignItems: 'start' }}
      >
        {/* Left col */}
        <div>
          <TextInput
            value={text}
            onChange={setText}
            onAnalyze={handleAnalyze}
            loading={loading}
          />
          <HistoryPanel />
        </div>

        {/* Right col */}
        <div>
          <ResultPanel result={lastResult} />
        </div>
      </div>

      {/* Footer */}
      <div
        className="text-center mt-12 pt-6 text-xs leading-relaxed"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)', color: '#4a5580' }}
      >
        MindFusion · W1954031 · IIT / University of Westminster · Research Prototype<br />
        Weighted F1: 0.7375 · AUC-ROC: 0.8246 · BERT + MentalBERT + RoBERTa (Gated Fusion)<br />
        <span style={{ color: 'rgba(239,68,68,0.6)' }}>
          Not for clinical use. If you are in crisis, please contact a mental health professional immediately.
        </span>
      </div>
    </div>
  )
}