'use client'

import Link from 'next/link'
import { ArrowLeft, MapPin, Calendar, Palette } from 'lucide-react'
import ApiScoreBadge from '@/components/ApiScoreBadge'
import PriceChart from '@/components/PriceChart'
import ScoreRadar from '@/components/ScoreRadar'

interface ArtistData {
  name: string
  slug: string
  nationality: string
  birthYear: number | null
  deathYear: number | null
  medium: string[]
  movement: string[]
  bio: string
  score: { score: number; momentum: number; market_depth: number; recognition: number; consistency: number; rating: string }
  priceIndex: { year: number; index_value: number; volume: number }[]
  auctions: { title: string; auction_house: string; date: string; hammer_price: number | null; estimate_low: number; estimate_high: number; currency: string; sold: boolean }[]
  exhibitions: { title: string; venue: string; city: string; year: number; type: string }[]
}

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency, maximumFractionDigits: 0 }).format(price)
}

export default function ArtistDetailClient({ artist }: { artist: ArtistData }) {
  const years = artist.birthYear
    ? `${artist.birthYear}${artist.deathYear ? `-${artist.deathYear}` : ' — presente'}`
    : ''

  return (
    <main className="min-h-screen bg-brand-950 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/artisti" className="inline-flex items-center gap-2 text-brand-400 hover:text-white transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Torna alla lista
        </Link>

        {/* Header */}
        <div className="card p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">{artist.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-brand-400 text-sm mb-4">
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {artist.nationality}</span>
                {years && <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {years}</span>}
                <span className="flex items-center gap-1.5"><Palette className="w-4 h-4" /> {artist.medium.join(', ')}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {artist.movement.map((m) => (
                  <span key={m} className="text-xs px-2.5 py-1 rounded-full bg-brand-800 text-brand-300 border border-brand-700/50">{m}</span>
                ))}
              </div>
              <p className="text-brand-300 leading-relaxed max-w-2xl">{artist.bio}</p>
            </div>
            <div className="flex flex-col items-center md:items-end shrink-0">
              <div className="text-5xl font-mono font-bold text-accent-gold mb-2">{artist.score.score}</div>
              <ApiScoreBadge score={artist.score.score} size="lg" />
            </div>
          </div>
        </div>

        {/* Score + Chart */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Art Performance Index Breakdown</h2>
            <ScoreRadar
              momentum={artist.score.momentum}
              marketDepth={artist.score.market_depth}
              recognition={artist.score.recognition}
              consistency={artist.score.consistency}
            />
            <div className="grid grid-cols-2 gap-3 mt-4">
              {[
                { label: 'Momentum', value: artist.score.momentum, weight: '35%' },
                { label: 'Market Depth', value: artist.score.market_depth, weight: '25%' },
                { label: 'Recognition', value: artist.score.recognition, weight: '20%' },
                { label: 'Consistency', value: artist.score.consistency, weight: '20%' },
              ].map((item) => (
                <div key={item.label} className="bg-brand-800/30 rounded-lg p-3">
                  <div className="text-brand-500 text-xs">{item.label} ({item.weight})</div>
                  <div className="text-white font-mono text-lg font-bold">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Price Index</h2>
            <PriceChart data={artist.priceIndex} />
            <p className="text-xs text-brand-600 mt-3">Indice normalizzato (anno base = 100). Fonte: principali case d&apos;asta.</p>
          </div>
        </div>

        {/* Auctions */}
        {artist.auctions.length > 0 && (
          <div className="card p-6 mb-6">
            <h2 className="text-lg font-semibold text-white mb-4">Risultati d&apos;Asta Recenti</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-brand-700/50 text-brand-400">
                    <th className="text-left py-3 pr-4 font-medium">Opera</th>
                    <th className="text-left py-3 pr-4 font-medium">Casa d&apos;Asta</th>
                    <th className="text-left py-3 pr-4 font-medium">Data</th>
                    <th className="text-left py-3 pr-4 font-medium">Stima</th>
                    <th className="text-right py-3 font-medium">Prezzo</th>
                  </tr>
                </thead>
                <tbody>
                  {artist.auctions.map((auction, i) => (
                    <tr key={i} className="border-b border-brand-800/30 hover:bg-brand-800/20">
                      <td className="py-3 pr-4 text-white">{auction.title}</td>
                      <td className="py-3 pr-4 text-brand-300">{auction.auction_house}</td>
                      <td className="py-3 pr-4 text-brand-400">{new Date(auction.date).toLocaleDateString('it-IT')}</td>
                      <td className="py-3 pr-4 text-brand-400 font-mono text-xs">
                        {formatPrice(auction.estimate_low, auction.currency)} — {formatPrice(auction.estimate_high, auction.currency)}
                      </td>
                      <td className="py-3 text-right font-mono font-bold text-accent-gold">
                        {auction.hammer_price ? formatPrice(auction.hammer_price, auction.currency) : 'Invenduto'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Exhibitions */}
        {artist.exhibitions.length > 0 && (
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Mostre Principali</h2>
            <div className="space-y-3">
              {artist.exhibitions.map((ex, i) => (
                <div key={i} className="flex items-start justify-between bg-brand-800/20 rounded-lg p-4">
                  <div>
                    <h3 className="text-white font-medium">{ex.title}</h3>
                    <p className="text-brand-400 text-sm">{ex.venue}, {ex.city}</p>
                  </div>
                  <div className="text-brand-500 text-sm shrink-0 ml-4">
                    {ex.year} &middot; <span className="capitalize">{ex.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
