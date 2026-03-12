import Link from 'next/link'
import { SITE, SOCIAL_LINKS } from '@/lib/constants'
import { TrendingUp, Linkedin, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-brand-800/50 bg-brand-950">
      <div className="container-ac py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-lg bg-accent-gold flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-brand-950" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-display font-bold text-white">Art Capital</span>
            </div>
            <p className="text-sm text-brand-400 max-w-sm leading-relaxed">{SITE.description}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Prodotto</h4>
            <ul className="space-y-2 text-sm text-brand-400">
              <li><Link href="/artisti" className="hover:text-white transition-colors">Database Artisti</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link href="/newsletter" className="hover:text-white transition-colors">Newsletter</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Prezzi</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Info</h4>
            <ul className="space-y-2 text-sm text-brand-400">
              <li><Link href="/about" className="hover:text-white transition-colors">Chi Siamo</Link></li>
              <li><a href={`mailto:${SITE.email}`} className="hover:text-white transition-colors">Contatti</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-brand-800/30 text-center text-xs text-brand-600">
          &copy; 2026 Art Capital. I rating non costituiscono consiglio di investimento.
        </div>
      </div>
    </footer>
  )
}
