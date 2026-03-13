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
        {/* Header */}
        <div className="rule-thick mb-8" />
        <div className="grid md:grid-cols-12 gap-8 mb-14">
          <div className="md:col-span-7">
            <h1 className="text-4xl md:text-5xl font-display font-normal text-text-primary mb-2">Dashboard</h1>
            <p className="text-text-secondary">Panoramica del mercato dell&apos;arte contemporanea.</p>
          </div>
          <div className="md:col-span-5 md:border-l md:border-border md:pl-8">
            <p className="section-label mb-3">Aggiornamento</p>
            <p className="text-text-secondary text-sm">Dati aggiornati all&apos;ultima sessione d&apos;asta disponibile.</p>
          </div>
        </div>

        {/* Market Stats — newspaper row */}
        <div className="border-y border-border py-8 mb-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {MARKET_STATS.map((stat, i) => (
              <div key={stat.label} className={i > 0 ? 'lg:border-l lg:border-border lg:pl-8' : ''}>
                <div className="text-3xl md:text-4xl font-mono font-bold text-text-primary leading-none mb-1">{stat.value}</div>
                <div className="text-text-secondary text-sm">{stat.label}</div>
                <div className="text-accent text-xs font-medium mt-1">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers + In Calo — two-column with vertical border */}
        <div className="grid md:grid-cols-12 gap-0 mb-14">
          <div className="md:col-span-7 md:pr-10 lg:pr-14 md:border-r md:border-border">
            <div className="rule-thick mb-6" />
            <h2 className="section-label mb-5 flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-positive" /> Top Performers
            </h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2.5 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Artista</th>
                  <th className="text-right py-2.5 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Score</th>
                  <th className="text-right py-2.5 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Var. %</th>
                </tr>
              </thead>
              <tbody>
                {TOP_MOVERS_UP.map((artist, i) => (
                  <tr key={artist.slug} className={`border-b border-border ${i % 2 === 1 ? 'bg-surface/50' : ''}`}>
                    <td className="py-3.5 pr-3">
                      <Link href={`/artisti/${artist.slug}`} className="text-text-primary font-medium hover:text-accent transition-colors">
                        {artist.name}
                      </Link>
                    </td>
                    <td className="py-3.5 pr-3 text-right">
                      <span className="font-mono text-sm text-text-secondary">{artist.score}</span>
                    </td>
                    <td className="py-3.5 text-right">
                      <span className="text-positive font-mono text-sm font-semibold">+{artist.change}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:col-span-5 md:pl-10 lg:pl-14 mt-10 md:mt-0">
            <div className="rule-thick mb-6" />
            <h2 className="section-label mb-5 flex items-center gap-2">
              <TrendingDown className="w-3.5 h-3.5 text-negative" /> In Calo
            </h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2.5 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Artista</th>
                  <th className="text-right py-2.5 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Score</th>
                  <th className="text-right py-2.5 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Var. %</th>
                </tr>
              </thead>
              <tbody>
                {TOP_MOVERS_DOWN.map((artist, i) => (
                  <tr key={artist.slug} className={`border-b border-border ${i % 2 === 1 ? 'bg-surface/50' : ''}`}>
                    <td className="py-3.5 pr-3">
                      <Link href={`/artisti/${artist.slug}`} className="text-text-primary font-medium hover:text-accent transition-colors">
                        {artist.name}
                      </Link>
                    </td>
                    <td className="py-3.5 pr-3 text-right">
                      <span className="font-mono text-sm text-text-secondary">{artist.score}</span>
                    </td>
                    <td className="py-3.5 text-right">
                      <span className="text-negative font-mono text-sm font-semibold">{artist.change}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Watchlist */}
        <div className="rule-thick mb-6" />
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-label">La Tua Watchlist</h2>
          <span className="text-xs text-text-secondary border border-border px-2 py-0.5" style={{ borderRadius: '2px' }}>Demo</span>
        </div>
        <div className="grid sm:grid-cols-3 gap-0 border border-border" style={{ borderRadius: '2px' }}>
          {WATCHLIST.map((artist, i) => (
            <Link
              key={artist.slug}
              href={`/artisti/${artist.slug}`}
              className={`p-6 text-center hover:bg-surface transition-colors ${i > 0 ? 'border-t sm:border-t-0 sm:border-l border-border' : ''}`}
            >
              <div className="text-4xl font-mono font-bold text-accent mb-2">{artist.score}</div>
              <div className="text-text-primary font-medium text-sm mb-2">{artist.name}</div>
              <ApiScoreBadge score={artist.score} size="sm" />
            </Link>
          ))}
        </div>
        <p className="text-text-secondary text-xs mt-4 text-center">Accedi per personalizzare la tua watchlist.</p>
      </div>
    </main>
  )
}
