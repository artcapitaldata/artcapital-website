'use client'

import { useState } from 'react'
import Link from 'next/link'
import { NAV_LINKS } from '@/lib/constants'
import { Menu, X, TrendingUp } from 'lucide-react'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full z-50 bg-brand-950/80 backdrop-blur-xl border-b border-brand-800/50">
      <div className="container-ac flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-accent-gold flex items-center justify-center">
            <TrendingUp className="w-4.5 h-4.5 text-brand-950" strokeWidth={2.5} />
          </div>
          <span className="text-lg font-display font-bold text-white leading-tight tracking-tight">Art Capital</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="relative px-3 py-2 text-sm text-brand-300 hover:text-white transition-colors rounded-lg hover:bg-brand-800/50">
              {link.label}
              {'badge' in link && link.badge && (<span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full bg-accent-gold/10 text-accent-gold border border-accent-gold/20">{link.badge}</span>)}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <Link href="/newsletter" className="btn-primary text-sm py-2 px-4">Iscriviti Gratis</Link>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-brand-400 hover:text-white">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
       {mobileOpen && (
        <div className="md:hidden bg-brand-950 border-t border-brand-800/50">
          <nav className="container-ac py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (<Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="px-3 py-2.5 text-brand-300 hover:text-white hover:bg-brand-800/50 rounded-lg">{link.label}</Link>))}
          </nav>
        </div>
      )}
    </header>
  )
}
