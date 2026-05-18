import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { testConnection, setApiUrl as setGlobalUrl } from '../utils/api'

export default function ApiConnector() {
  const { apiUrl, setApiUrl, setConnected, connected } = useApp()
  const [testing, setTesting]   = useState(false)
  const [message, setMessage]   = useState('Enter your ngrok URL to connect')
  const [status, setStatus]     = useState('idle') // idle | ok | error

  const handleTest = async () => {
    if (!apiUrl.trim()) { setMessage('Please enter a URL'); setStatus('error'); return }
    setTesting(true)
    setMessage('Testing connection...')
    setStatus('idle')
    try {
      setGlobalUrl(apiUrl)
      await testConnection(apiUrl)
      setConnected(true)
      setStatus('ok')
      setMessage('Connected — ready to analyse')
    } catch {
      setConnected(false)
      setStatus('error')
      setMessage('Could not reach server — check URL and ensure ngrok is running')
    } finally {
      setTesting(false)
    }
  }

  const dotColor = status === 'ok' ? '#10b981' : status === 'error' ? '#ef4444' : '#f59e0b'

  return (
    <div
      className="rounded-2xl p-5 mb-5"
      style={{ background: '#0f1527', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#4a5580', fontFamily: 'Syne, sans-serif' }}>
        Backend Connection
      </p>

      <div className="flex gap-2">
        <input
          type="text"
          value={apiUrl}
          onChange={e => setApiUrl(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleTest()}
          placeholder="https://xxxx-xx-xx-xx-xx.ngrok-free.app"
          className="flex-1 px-3 py-2.5 rounded-xl text-sm outline-none transition-all"
          style={{
            background: '#1a2240',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#e8eaf6',
            fontFamily: 'DM Mono, monospace',
          }}
          onFocus={e => e.target.style.borderColor = 'rgba(79,142,247,0.5)'}
          onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
        />
        <button
          onClick={handleTest}
          disabled={testing}
          className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
          style={{
            background: 'rgba(79,142,247,0.15)',
            border: '1px solid rgba(79,142,247,0.3)',
            color: '#4f8ef7',
            cursor: testing ? 'not-allowed' : 'pointer',
            opacity: testing ? 0.6 : 1,
            fontFamily: 'Syne, sans-serif',
          }}
        >
          {testing ? '...' : 'Test'}
        </button>
      </div>

      <div className="flex items-center gap-2 mt-2.5">
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulseDot"
          style={{ background: dotColor }}
        />
        <span className="text-xs" style={{ color: '#8892b0' }}>{message}</span>
      </div>

      {!connected && (
        <p className="text-xs mt-2" style={{ color: '#4a5580' }}>
          No URL? The app runs in <strong style={{ color: '#f59e0b' }}>demo mode</strong> with simulated predictions.
        </p>
      )}
    </div>
  )
}
