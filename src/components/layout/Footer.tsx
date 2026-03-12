import Link from 'next/link'
import { SITE } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-ac py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <span className="text-lg font-display font-bold text-text-primary mb-3 block">Art Capital</span>
            <p className="text-sm text-text-secondary max-w-sm leading-relaxed">{SITE.description}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-3">Prodotto</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link href="/artisti" className="hover:text-text-primary transition-colors">Database Artisti</Link></li>
              <li><Link href="/dashboard" className="hover:text-text-primary transition-colors">Dashboard</Link></li>
              <li><Link href="/newsletter" className="hover:text-text-primary transition-colors">Newsletter</Link></li>
              <li><Link href="/pricing" className="hover:text-text-primary transition-colors">Prezzi</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-3">Info</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link href="/about" className="hover:text-text-primary transition-colors">Chi Siamo</Link></li>
              <li><a href={`mailto:${SITE.email}`} className="hover:text-text-primary transition-colors">Contatti</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border text-center text-xs text-text-secondary">
          &copy; 2026 Art Capital. I rating non costituiscono consiglio di investimento.
        </div>
      </div>
    </footer>
  )
}
