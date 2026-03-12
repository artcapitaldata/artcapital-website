'use client'

import { useState } from 'react'
import Link from 'next/link'
import { NAV_LINKS } from '@/lib/constants'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full z-50 bg-white border-b border-border">
      <div className="container-ac flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-lg font-display font-bold text-text-primary tracking-tight">Art Capital</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center">
          <Link href="/newsletter" className="btn-primary text-sm py-2 px-5">
            Iscriviti
          </Link>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-text-secondary hover:text-text-primary"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border">
          <nav className="container-ac py-3 flex flex-col gap-0.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 text-text-secondary hover:text-text-primary hover:bg-surface rounded text-sm"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/newsletter"
              onClick={() => setMobileOpen(false)}
              className="btn-primary mt-2 text-sm py-2.5"
            >
              Iscriviti
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
