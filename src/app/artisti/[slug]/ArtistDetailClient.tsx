'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
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
  score: { score: number; momentum: number; market_depth: number; recognition: number; consistency: number; rating: string } | null
  priceIndex: { year: number; index_value: number; volume: number }[]
  auctions: { title: string; auction_house: string; date: string; hammer_price: number | null; estimate_low: number; estimate_high: number; currency: string; sold: boolean }[]
  exhibitions: { title: string; venue: string; city: string; year: number; type: string }[]
}

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency, maximumFractionDigits: 0 }).format(price)
}

export default function ArtistDetailClient({ artist }: { artist: ArtistData }) {
  const years = artist.birthYear
    ? `${artist.birthYear}${artist.deathYear ? `–${artist.deathYear}` : ' — presente'}`
    : ''

  return (
    <main className="min-h-screen py-10 px-5">
      <div className="max-w-editorial mx-auto">
        <Link href="/artisti" className="inline-flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors mb-8 text-sm">
          <ArrowLeft className="w-4 h-4" /> Torna alla lista
        </Link>

        {/* Header */}
        <div className="border-b border-border pb-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-3">{artist.name}</h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-text-secondary text-sm mb-4">
                <span>{artist.nationality}</span>
                {years && <span>{years}</span>}
                <span>{artist.medium.join(', ')}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-5">
                {artist.movement.map((m) => (
                  <span key={m} className="text-xs px-2.5 py-1 rounded bg-surface text-text-secondary border border-border">{m}</span>
                ))}
              </div>
              <p className="text-text-secondary leading-relaxed max-w-2xl">{artist.bio}</p>
            </div>
            {artist.score && (
              <div className="flex flex-col items-center md:items-end shrink-0">
                <div className="text-5xl font-mono font-bold text-accent mb-2">{artist.score.score}</div>
                <ApiScoreBadge score={artist.score.score} size="lg" />
              </div>
            )}
          </div>
        </div>

        {/* Score + Chart */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="card p-6">
            <h2 className="text-base font-semibold text-text-primary mb-4 uppercase tracking-wider text-xs">Art Performance Index Breakdown</h2>
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
                <div key={item.label} className="bg-surface rounded p-3">
                  <div className="text-text-secondary text-xs">{item.label} ({item.weight})</div>
                  <div className="text-text-primary font-mono text-lg font-bold">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="card p-6">
            <h2 className="text-base font-semibold text-text-primary mb-4 uppercase tracking-wider text-xs">Price Index</h2>
            <PriceChart data={artist.priceIndex} />
            <p className="text-xs text-text-secondary mt-3">Indice normalizzato (anno base = 100). Fonte: principali case d&apos;asta.</p>
          </div>
        </div>

        {/* Auctions */}
        {artist.auctions.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs font-semibold text-text-primary mb-4 uppercase tracking-wider">Risultati d&apos;Asta Recenti</h2>
            <div className="overflow-x-auto border border-border rounded">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface text-text-secondary">
                    <th className="text-left py-3 px-4 font-medium text-xs uppercase tracking-wider">Opera</th>
                    <th className="text-left py-3 px-4 font-medium text-xs uppercase tracking-wider">Casa d&apos;Asta</th>
                    <th className="text-left py-3 px-4 font-medium text-xs uppercase tracking-wider">Data</th>
                    <th className="text-left py-3 px-4 font-medium text-xs uppercase tracking-wider">Stima</th>
                    <th className="text-right py-3 px-4 font-medium text-xs uppercase tracking-wider">Prezzo</th>
                  </tr>
                </thead>
                <tbody>
                  {artist.auctions.map((auction, i) => (
                    <tr key={i} className="border-b border-border last:border-0 hover:bg-surface/50">
                      <td className="py-3 px-4 text-text-primary font-medium">{auction.title}</td>
                      <td className="py-3 px-4 text-text-secondary">{auction.auction_house}</td>
                      <td className="py-3 px-4 text-text-secondary">{new Date(auction.date).toLocaleDateString('it-IT')}</td>
                      <td className="py-3 px-4 text-text-secondary font-mono text-xs">
                        {formatPrice(auction.estimate_low, auction.currency)} — {formatPrice(auction.estimate_high, auction.currency)}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-accent">
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
          <div>
            <h2 className="text-xs font-semibold text-text-primary mb-4 uppercase tracking-wider">Mostre Principali</h2>
            <div className="space-y-0 border border-border rounded divide-y divide-border">
              {artist.exhibitions.map((ex, i) => (
                <div key={i} className="flex items-start justify-between p-4">
                  <div>
                    <h3 className="text-text-primary font-medium">{ex.title}</h3>
                    <p className="text-text-secondary text-sm">{ex.venue}, {ex.city}</p>
                  </div>
                  <div className="text-text-secondary text-sm shrink-0 ml-4">
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
