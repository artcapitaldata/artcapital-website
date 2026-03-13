'use client'

import { useState } from 'react'
import Link from 'next/link'
import { NAV_LINKS } from '@/lib/constants'
import { Menu, X } from 'lucide-react'

// DEMO — variazioni percentuali placeholder
const tickerData = [
  { name: 'Basquiat', change: 12.4, direction: 'up' },
  { name: 'Fontana', change: 8.2, direction: 'up' },
  { name: 'Banksy', change: -3.1, direction: 'down' },
  { name: 'Koons', change: 5.7, direction: 'up' },
  { name: 'Richter', change: -1.8, direction: 'down' },
  { name: 'Hirst', change: 0.4, direction: 'up' },
  { name: 'Cattelan', change: 15.2, direction: 'up' },
  { name: 'Nara', change: 9.6, direction: 'up' },
  { name: 'KAWS', change: -4.5, direction: 'down' },
  { name: 'Boetti', change: 6.8, direction: 'up' },
  { name: 'Morandi', change: 3.2, direction: 'up' },
  { name: 'Ghenie', change: 22.1, direction: 'up' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full z-50">
      {/* Navigation bar */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="container-ac flex items-center justify-between h-14">
          <Link href="/" className="group">
            <span className="text-2xl font-display font-normal text-text-primary tracking-tight">
              Art Capital
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] font-sans text-text-secondary hover:text-text-primary transition-colors uppercase tracking-[0.08em]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center">
            <Link href="/newsletter" className="btn-primary text-xs py-2 px-5 uppercase tracking-[0.1em]">
              Iscriviti
            </Link>
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-text-secondary hover:text-text-primary"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-border">
            <nav className="container-ac py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-2 py-2.5 text-text-secondary hover:text-text-primary text-sm"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/newsletter"
                onClick={() => setMobileOpen(false)}
                className="btn-primary mt-3 text-xs py-2.5 uppercase tracking-[0.1em]"
              >
                Iscriviti
              </Link>
            </nav>
          </div>
        )}
      </div>

      {/* Ticker bar */}
      <div className="bg-white border-b border-border overflow-hidden">
        <div className="ticker-wrap">
          <div className="ticker">
            {[...tickerData, ...tickerData].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-5 py-1.5 text-[13px]">
                <span className="text-text-primary font-medium">{item.name}</span>
                <span className={`font-mono ${item.direction === 'up' ? 'text-positive' : 'text-negative'}`}>
                  {item.direction === 'up' ? '+' : ''}{item.change}%
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
