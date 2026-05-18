import axios from 'axios'
import { LABELS } from './constants'

let baseURL = 'http://localhost:8000'

export const setApiUrl = (url) => {
  baseURL = url.replace(/\/$/, '')
}

export const getApiUrl = () => baseURL

// This header tells ngrok to skip its browser warning page
const NGROK_HEADERS = {
  'Content-Type': 'application/json',
}

export const testConnection = async (url) => {
  const target = (url || baseURL).replace(/\/$/, '')
  const res = await axios.get(`${target}/health`, {
    timeout: 8000,
    headers: NGROK_HEADERS,
  })
  return res.data
}

export const predict = async (text) => {
  if (!baseURL) throw new Error('No API URL set')
  const res = await axios.post(
    `${baseURL}/predict`,
    { text },
    {
      timeout: 30000,
      headers: NGROK_HEADERS,
    }
  )
  return res.data
}

// Demo mode simulation when backend not connected
export const simulateResult = (text) => {
  const t = text.toLowerCase()
  const patterns = [
    { words: ['hate myself','hopeless','disappear','ending everything','want to die','no reason'], idx: 3 },
    { words: ['can barely','pointless','nothing feels','stopped talking','empty inside','completely'], idx: 2 },
    { words: ['bit off','losing motivation','harder','feeling low','not sure','distant'], idx: 1 },
  ]

  let idx = 0
  for (const p of patterns) {
    if (p.words.some(w => t.includes(w))) { idx = p.idx; break }
  }

  const probs = [0.08, 0.08, 0.08, 0.08]
  probs[idx] = 0.68
  const rem = 0.32
  const others = [0,1,2,3].filter(i => i !== idx)
  others.forEach(i => { probs[i] = rem / 3 })

  const words = text.split(/\s+/).filter(Boolean).slice(0, 25)
  const scores = words.map(() => Math.random())

  return {
    label: LABELS[idx],
    label_idx: idx,
    confidence: probs[idx],
    probabilities: probs,
    gate_weights: [
      0.33 + (Math.random() - 0.5) * 0.2,
      0.33 + (Math.random() - 0.5) * 0.2,
      0.34 + (Math.random() - 0.5) * 0.2,
    ],
    tokens: words,
    token_scores: scores,
    demo_mode: true,
  }
}
