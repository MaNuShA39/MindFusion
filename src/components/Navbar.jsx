import { Link, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const navLinks = [
  { to: '/',         label: 'Analyse' },
  { to: '/about',    label: 'About' },
]

export default function Navbar() {
  const { connected } = useApp()
  const location = useLocation()

  return (
    <nav
      className="sticky top-0 z-40 flex items-center justify-between px-8 py-4"
      style={{
        background: 'rgba(10,14,26,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* Brand */}
      <Link to="/" className="flex items-center gap-3 no-underline">
        <img
          src="/logo mind.png"
          alt="MindFusion Logo"
          className="w-9 h-9 rounded-xl object-cover"
        />
        <div>
          <p className="text-white font-bold text-lg leading-none" style={{ fontFamily: 'Syne, sans-serif' }}>
            MindFusion
          </p>
          <p className="text-xs leading-none mt-0.5" style={{ color: '#4a5580' }}>
            Depression Severity Analysis
          </p>
        </div>
      </Link>

      {/* Links */}
      <div className="flex items-center gap-1">
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all no-underline"
            style={{
              color: location.pathname === link.to ? '#4f8ef7' : '#8892b0',
              background: location.pathname === link.to ? 'rgba(79,142,247,0.1)' : 'transparent',
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Status badge */}
      <div
        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
        style={{
          background: connected ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
          border: `1px solid ${connected ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.2)'}`,
          color: connected ? '#10b981' : '#ef4444',
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulseDot"
          style={{ background: connected ? '#10b981' : '#ef4444' }}
        />
        {connected ? 'Connected' : 'Not Clinical Use'}
      </div>
    </nav>
  )
}
