import { TrendingUp, TrendingDown } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Dashboard',
}

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

const MARKET_STATS = [
  { label: 'Volume Totale 2025', value: '$4.2B', sub: '+8.3% YoY' },
  { label: 'Artisti Monitorati', value: '500+', sub: '20 nel database' },
  { label: 'API Score Medio', value: '71.2', sub: 'su 20 artisti' },
  { label: 'Opere Tracciate', value: '12.4K', sub: 'ultimi 12 mesi' },
]

const WATCHLIST_PLACEHOLDER = [
  { name: 'Jean-Michel Basquiat', slug: 'jean-michel-basquiat', score: 87, rating: 'Strong Buy' },
  { name: 'Gerhard Richter', slug: 'gerhard-richter', score: 85, rating: 'Strong Buy' },
  { name: 'Lucio Fontana', slug: 'lucio-fontana', score: 82, rating: 'Strong Buy' },
]

export default function DashboardPage() {
  return (
    <main className="min-h-screen py-10 px-5">
      <div className="max-w-editorial mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-2">Dashboard</h1>
          <p className="text-text-secondary">Panoramica del mercato dell&apos;arte contemporanea.</p>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {MARKET_STATS.map((stat) => (
            <div key={stat.label} className="card p-5">
              <div className="text-2xl font-mono font-bold text-text-primary mb-1">{stat.value}</div>
              <div className="text-text-secondary text-sm">{stat.label}</div>
              <div className="text-accent text-xs font-medium mt-1">{stat.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Top Movers Up */}
          <div>
            <h2 className="text-xs font-semibold text-text-primary mb-4 uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-positive" /> Top Performers
            </h2>
            <div className="border border-border rounded divide-y divide-border">
              {TOP_MOVERS_UP.map((artist) => (
                <Link
                  key={artist.slug}
                  href={`/artisti/${artist.slug}`}
                  className="flex items-center justify-between p-4 hover:bg-surface transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-xs font-mono text-text-secondary font-semibold">
                      {artist.score}
                    </span>
                    <span className="text-text-primary font-medium">{artist.name}</span>
                  </div>
                  <span className="text-positive font-mono text-sm font-bold">+{artist.change}%</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Top Movers Down */}
          <div>
            <h2 className="text-xs font-semibold text-text-primary mb-4 uppercase tracking-wider flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-negative" /> In Calo
            </h2>
            <div className="border border-border rounded divide-y divide-border">
              {TOP_MOVERS_DOWN.map((artist) => (
                <Link
                  key={artist.slug}
                  href={`/artisti/${artist.slug}`}
                  className="flex items-center justify-between p-4 hover:bg-surface transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-xs font-mono text-text-secondary font-semibold">
                      {artist.score}
                    </span>
                    <span className="text-text-primary font-medium">{artist.name}</span>
                  </div>
                  <span className="text-negative font-mono text-sm font-bold">{artist.change}%</span>
                </Link>
              ))}
            </div>
            <div className="mt-4 p-4 rounded bg-surface border border-border text-center">
              <p className="text-text-secondary text-sm">Dati aggiornati all&apos;ultima sessione d&apos;asta disponibile.</p>
            </div>
          </div>
        </div>

        {/* Watchlist */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-semibold text-text-primary uppercase tracking-wider">La Tua Watchlist</h2>
            <span className="text-xs text-text-secondary bg-surface px-3 py-1 rounded border border-border">Demo</span>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {WATCHLIST_PLACEHOLDER.map((artist) => (
              <Link
                key={artist.slug}
                href={`/artisti/${artist.slug}`}
                className="card p-5 hover:border-text-secondary transition-colors text-center"
              >
                <div className="text-3xl font-mono font-bold text-accent mb-1">{artist.score}</div>
                <div className="text-text-primary font-medium text-sm">{artist.name}</div>
                <div className="badge-buy text-xs mt-2">{artist.rating}</div>
              </Link>
            ))}
          </div>
          <p className="text-text-secondary text-xs mt-4 text-center">Accedi per personalizzare la tua watchlist con gli artisti che segui.</p>
        </div>
      </div>
    </main>
  )
}
