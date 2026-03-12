import { TrendingUp, TrendingDown, BarChart3, Users, DollarSign, Eye } from 'lucide-react'
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
  { icon: DollarSign, label: 'Volume Totale 2025', value: '$4.2B', sub: '+8.3% YoY' },
  { icon: Users, label: 'Artisti Monitorati', value: '500+', sub: '20 nel database' },
  { icon: BarChart3, label: 'API Score Medio', value: '71.2', sub: 'su 20 artisti' },
  { icon: Eye, label: 'Opere Tracciate', value: '12.4K', sub: 'ultimi 12 mesi' },
]

const WATCHLIST_PLACEHOLDER = [
  { name: 'Jean-Michel Basquiat', slug: 'jean-michel-basquiat', score: 87, rating: 'Strong Buy' },
  { name: 'Gerhard Richter', slug: 'gerhard-richter', score: 85, rating: 'Strong Buy' },
  { name: 'Lucio Fontana', slug: 'lucio-fontana', score: 82, rating: 'Strong Buy' },
]

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-brand-950 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">Dashboard</h1>
          <p className="text-brand-400">Panoramica del mercato dell&apos;arte contemporanea.</p>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {MARKET_STATS.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="card p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-accent-gold/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-accent-gold" />
                  </div>
                </div>
                <div className="text-2xl font-mono font-bold text-white mb-1">{stat.value}</div>
                <div className="text-brand-400 text-sm">{stat.label}</div>
                <div className="text-accent-gold text-xs mt-1">{stat.sub}</div>
              </div>
            )
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Top Movers Up */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" /> Top Performers
            </h2>
            <div className="space-y-3">
              {TOP_MOVERS_UP.map((artist) => (
                <Link
                  key={artist.slug}
                  href={`/artisti/${artist.slug}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-brand-800/20 hover:bg-brand-800/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-800 flex items-center justify-center text-xs font-mono text-brand-300">
                      {artist.score}
                    </div>
                    <span className="text-white font-medium">{artist.name}</span>
                  </div>
                  <span className="text-green-400 font-mono text-sm font-bold">+{artist.change}%</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Top Movers Down */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-red-400" /> In Calo
            </h2>
            <div className="space-y-3">
              {TOP_MOVERS_DOWN.map((artist) => (
                <Link
                  key={artist.slug}
                  href={`/artisti/${artist.slug}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-brand-800/20 hover:bg-brand-800/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-800 flex items-center justify-center text-xs font-mono text-brand-300">
                      {artist.score}
                    </div>
                    <span className="text-white font-medium">{artist.name}</span>
                  </div>
                  <span className="text-red-400 font-mono text-sm font-bold">{artist.change}%</span>
                </Link>
              ))}
            </div>
            <div className="mt-4 p-4 rounded-lg bg-brand-800/10 border border-brand-700/30 text-center">
              <p className="text-brand-500 text-sm">Dati aggiornati all&apos;ultima sessione d&apos;asta disponibile.</p>
            </div>
          </div>
        </div>

        {/* Watchlist */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-accent-gold" /> La Tua Watchlist
            </h2>
            <span className="text-xs text-brand-500 bg-brand-800 px-3 py-1 rounded-full">Demo</span>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {WATCHLIST_PLACEHOLDER.map((artist) => (
              <Link
                key={artist.slug}
                href={`/artisti/${artist.slug}`}
                className="p-4 rounded-lg bg-brand-800/20 hover:bg-brand-800/40 transition-colors text-center"
              >
                <div className="text-3xl font-mono font-bold text-accent-gold mb-1">{artist.score}</div>
                <div className="text-white font-medium text-sm">{artist.name}</div>
                <div className="badge-buy text-xs mt-2">{artist.rating}</div>
              </Link>
            ))}
          </div>
          <p className="text-brand-600 text-xs mt-4 text-center">Accedi per personalizzare la tua watchlist con gli artisti che segui.</p>
        </div>
      </div>
    </main>
  )
}
