import { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
  const [apiUrl, setApiUrl]           = useState('')
  const [connected, setConnected]     = useState(false)
  const [history, setHistory]         = useState([])
  const [stats, setStats]             = useState({ total:0, min:0, mild:0, mod:0, sev:0 })
  const [lastResult, setLastResult]   = useState(null)

  const addToHistory = (result, text) => {
    const entry = { label: result.label, confidence: result.confidence, text, id: Date.now() }
    setHistory(prev => [entry, ...prev].slice(0, 10))
    setStats(prev => {
      const next = { ...prev, total: prev.total + 1 }
      if (result.label === 'Minimum')  next.min++
      else if (result.label === 'Mild' || result.label === 'Moderate') next.mild++
      else if (result.label === 'Severe') next.sev++
      return next
    })
  }

  const clearHistory = () => {
    setHistory([])
    setStats({ total:0, min:0, mild:0, mod:0, sev:0 })
  }

  return (
    <AppContext.Provider value={{
      apiUrl, setApiUrl,
      connected, setConnected,
      history, addToHistory, clearHistory,
      stats,
      lastResult, setLastResult,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
