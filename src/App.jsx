import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AppProvider } from './context/AppContext'
import DisclaimerModal from './components/DisclaimerModal'
import Navbar from './components/Navbar'
import AnalyzePage from './pages/AnalyzePage'
import AboutPage from './pages/AboutPage'

export default function App() {
  const [agreed, setAgreed] = useState(false)

  return (
    <AppProvider>
      <BrowserRouter>
        <AnimatePresence>
          {!agreed && (
            <DisclaimerModal onAgree={() => setAgreed(true)} />
          )}
        </AnimatePresence>

        {agreed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Navbar />
            <Routes>
              <Route path="/"      element={<AnalyzePage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </motion.div>
        )}
      </BrowserRouter>
    </AppProvider>
  )
}
