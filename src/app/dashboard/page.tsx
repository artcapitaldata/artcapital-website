import { TrendingUp, TrendingDown } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import ApiScoreBadge from '@/components/ApiScoreBadge'

export const metadata: Metadata = {
  title: 'Dashboard',
}

// DEMO — score e variazioni placeholder, chiaramente marcati come demo nel codice
const TOP_MOVERS_UP = [
  { name: 'Adrian Ghenie', slug: 'adrian-ghenie', change: +22.1, score: 80 },
  { name: 'Maurizio Cattelan', slug: 'maurizio-cattelan', change: +15.2, score: 78 },
  { name: 'Jean-Michel Basquiat', slug: 'jean-michel-basquiat', change: +12.4, score: 87 },
  { name: 'Yoshitomo Nara', slug: 'yoshitomo-nara', change: +9.6, score: 76 },
  { name: 'Lucio Fontana', slug: 'lucio-fontana', change: +8.2, score: 82 },
]

const TOP_MOVERS_DOWN = [
  { name: 'KAWS', slug: 'kaws', change: -4.5, score: 69 },
  { name: 'Banksy', slug: 'banksy', change: -3.1, score: 72 },
  { name: 'Gerhard Richter', slug: 'gerhard-richter', change: -1.8, score: 85 },
]

// DEMO — statistiche placeholder
const MARKET_STATS = [
  { label: 'Volume Totale 2025', value: '$4.2B', sub: '+8.3% YoY' },
  { label: 'Artisti Monitorati', value: '500+', sub: '20 nel database' },
  { label: 'API Score Medio', value: '71.2', sub: 'su 20 artisti' },
  { label: 'Opere Tracciate', value: '12.4K', sub: 'ultimi 12 mesi' },
]

// DEMO — watchlist placeholder
const WATCHLIST = [
  { name: 'Jean-Michel Basquiat', slug: 'jean-michel-basquiat', score: 87 },
  { name: 'Gerhard Richter', slug: 'gerhard-richter', score: 85 },
  { name: 'Lucio Fontana', slug: 'lucio-fontana', score: 82 },
]

export default function DashboardPage() {
  return (
    <main className="min-h-screen">
      <div className="container-ac py-12 md:py-16">
        <div className="rule-thick mb-4" />
        <h1 className="text-4xl md:text-5xl font-display font-normal text-text-primary mb-2">Dashboard</h1>
        <p className="text-text-secondary mb-12">Panoramica del mercato dell&apos;arte contemporanea.</p>

        {/* Market Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-16">
          {MARKET_STATS.map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl md:text-4xl font-mono font-bold text-text-primary mb-1">{stat.value}</div>
              <div className="text-text-secondary text-sm">{stat.label}</div>
              <div className="text-accent text-xs font-medium mt-1">{stat.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16">
          {/* Top Performers */}
          <div>
            <div className="rule-thick mb-4" />
            <h2 className="section-label mb-6 flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-positive" /> Top Performers
            </h2>
            <table className="w-full text-sm">
              <tbody>
                {TOP_MOVERS_UP.map((artist, i) => (
                  <tr key={artist.slug} className={`border-b border-border ${i % 2 === 1 ? 'bg-surface/50' : ''}`}>
                    <td className="py-3 pr-3">
                      <Link href={`/artisti/${artist.slug}`} className="text-text-primary font-medium hover:text-accent transition-colors">
                        {artist.name}
                      </Link>
                    </td>
                    <td className="py-3 pr-3 text-right">
                      <span className="font-mono text-xs text-text-secondary">{artist.score}</span>
                    </td>
                    <td className="py-3 text-right">
                      <span className="text-positive font-mono text-sm font-semibold">+{artist.change}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* In Calo */}
          <div>
            <div className="rule-thick mb-4" />
            <h2 className="section-label mb-6 flex items-center gap-2">
              <TrendingDown className="w-3.5 h-3.5 text-negative" /> In Calo
            </h2>
            <table className="w-full text-sm">
              <tbody>
                {TOP_MOVERS_DOWN.map((artist, i) => (
                  <tr key={artist.slug} className={`border-b border-border ${i % 2 === 1 ? 'bg-surface/50' : ''}`}>
                    <td className="py-3 pr-3">
                      <Link href={`/artisti/${artist.slug}`} className="text-text-primary font-medium hover:text-accent transition-colors">
                        {artist.name}
                      </Link>
                    </td>
                    <td className="py-3 pr-3 text-right">
                      <span className="font-mono text-xs text-text-secondary">{artist.score}</span>
                    </td>
                    <td className="py-3 text-right">
                      <span className="text-negative font-mono text-sm font-semibold">{artist.change}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-text-secondary text-xs mt-4">Dati aggiornati all&apos;ultima sessione d&apos;asta disponibile.</p>
          </div>
        </div>

        {/* Watchlist */}
        <div className="rule-thick mb-4" />
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-label">La Tua Watchlist</h2>
          <span className="text-xs text-text-secondary border border-border px-2 py-0.5" style={{ borderRadius: '2px' }}>Demo</span>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {WATCHLIST.map((artist) => (
            <Link
              key={artist.slug}
              href={`/artisti/${artist.slug}`}
              className="card-hover p-6 text-center"
            >
              <div className="text-4xl font-mono font-bold text-accent mb-2">{artist.score}</div>
              <div className="text-text-primary font-medium text-sm mb-2">{artist.name}</div>
              <ApiScoreBadge score={artist.score} size="sm" />
            </Link>
          ))}
        </div>
        <p className="text-text-secondary text-xs mt-6 text-center">Accedi per personalizzare la tua watchlist.</p>
      </div>
    </main>
  )
}
