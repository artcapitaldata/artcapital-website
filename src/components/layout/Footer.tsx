import Link from 'next/link'
import { SITE } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-ac py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <span className="text-xl font-display font-normal text-text-primary block mb-4">Art Capital</span>
            <p className="text-sm text-text-secondary max-w-xs leading-relaxed">{SITE.description}</p>
          </div>
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="section-label mb-4">Prodotto</h4>
            <ul className="space-y-2.5 text-sm text-text-secondary">
              <li><Link href="/artisti" className="hover:text-text-primary transition-colors">Database Artisti</Link></li>
              <li><Link href="/dashboard" className="hover:text-text-primary transition-colors">Dashboard</Link></li>
              <li><Link href="/newsletter" className="hover:text-text-primary transition-colors">Newsletter</Link></li>
              <li><Link href="/pricing" className="hover:text-text-primary transition-colors">Prezzi</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="section-label mb-4">Info</h4>
            <ul className="space-y-2.5 text-sm text-text-secondary">
              <li><Link href="/about" className="hover:text-text-primary transition-colors">Chi Siamo</Link></li>
              <li><a href={`mailto:${SITE.email}`} className="hover:text-text-primary transition-colors">Contatti</a></li>
            </ul>
          </div>
        </div>
        <div className="rule mt-12 pt-6 text-center text-xs text-text-secondary">
          &copy; 2026 Art Capital. I rating non costituiscono consiglio di investimento.
        </div>
      </div>
    </footer>
  )
}
