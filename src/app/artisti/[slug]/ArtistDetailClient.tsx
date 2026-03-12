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
    <main className="min-h-screen">
      <div className="container-ac py-12 md:py-16">
        <Link href="/artisti" className="inline-flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors mb-10 text-sm">
          <ArrowLeft className="w-4 h-4" /> Torna alla lista
        </Link>

        {/* Header */}
        <div className="rule-thick mb-6" />
        <div className="grid md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-normal text-text-primary mb-4 leading-[1.1]">{artist.name}</h1>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-text-secondary text-sm mb-4">
              <span>{artist.nationality}</span>
              {years && <><span className="text-border">|</span><span>{years}</span></>}
              <span className="text-border">|</span>
              <span>{artist.medium.join(', ')}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {artist.movement.map((m) => (
                <span key={m} className="text-xs px-2.5 py-1 text-text-secondary border border-border" style={{ borderRadius: '2px' }}>{m}</span>
              ))}
            </div>
            <p className="text-text-secondary leading-relaxed max-w-2xl">{artist.bio}</p>
          </div>
          {artist.score && (
            <div className="md:col-span-4 md:text-right">
              <p className="section-label mb-2">Art Performance Index</p>
              <div className="text-6xl font-mono font-bold text-accent leading-none mb-2">{artist.score.score}</div>
              <ApiScoreBadge score={artist.score.score} size="lg" />
            </div>
          )}
        </div>

        {/* Score Breakdown + Chart */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12">
          {artist.score ? (
            <div>
              <div className="rule-thick mb-4" />
              <h2 className="section-label mb-6">Score Breakdown</h2>
              <ScoreRadar
                momentum={artist.score.momentum}
                marketDepth={artist.score.market_depth}
                recognition={artist.score.recognition}
                consistency={artist.score.consistency}
              />
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-6">
                {[
                  { label: 'Momentum', value: artist.score.momentum, weight: '35%' },
                  { label: 'Market Depth', value: artist.score.market_depth, weight: '25%' },
                  { label: 'Recognition', value: artist.score.recognition, weight: '20%' },
                  { label: 'Consistency', value: artist.score.consistency, weight: '20%' },
                ].map((item) => (
                  <div key={item.label} className="flex items-baseline justify-between border-b border-border pb-2">
                    <span className="text-text-secondary text-sm">{item.label} <span className="text-xs">({item.weight})</span></span>
                    <span className="text-text-primary font-mono text-lg font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="rule-thick mb-4" />
              <h2 className="section-label mb-6">Score Breakdown</h2>
              <div className="py-16 text-center">
                <p className="text-text-secondary text-sm">API Score non disponibile</p>
                <p className="text-text-secondary text-xs mt-1">In attesa di dati d&apos;asta reali per il calcolo.</p>
              </div>
            </div>
          )}
          <div>
            <div className="rule-thick mb-4" />
            <h2 className="section-label mb-6">Price Index</h2>
            {artist.priceIndex.length > 0 ? (
              <>
                <PriceChart data={artist.priceIndex} />
                <p className="text-xs text-text-secondary mt-4">Indice normalizzato (anno base = 100). Fonte: principali case d&apos;asta.</p>
              </>
            ) : (
              <div className="py-16 text-center">
                <p className="text-text-secondary text-sm">Price Index non disponibile</p>
                <p className="text-text-secondary text-xs mt-1">In attesa di dati d&apos;asta reali.</p>
              </div>
            )}
          </div>
        </div>

        {/* Auctions */}
        {artist.auctions.length > 0 && (
          <div className="mb-12">
            <div className="rule-thick mb-4" />
            <h2 className="section-label mb-6">Risultati d&apos;Asta Recenti</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 pr-4 section-label">Opera</th>
                    <th className="text-left py-3 pr-4 section-label">Casa d&apos;Asta</th>
                    <th className="text-left py-3 pr-4 section-label">Data</th>
                    <th className="text-left py-3 pr-4 section-label">Stima</th>
                    <th className="text-right py-3 section-label">Prezzo</th>
                  </tr>
                </thead>
                <tbody>
                  {artist.auctions.map((auction, i) => (
                    <tr key={i} className={`border-b border-border ${i % 2 === 1 ? 'bg-surface/50' : ''}`}>
                      <td className="py-3.5 pr-4 text-text-primary font-medium">{auction.title}</td>
                      <td className="py-3.5 pr-4 text-text-secondary">{auction.auction_house}</td>
                      <td className="py-3.5 pr-4 text-text-secondary">{new Date(auction.date).toLocaleDateString('it-IT')}</td>
                      <td className="py-3.5 pr-4 text-text-secondary font-mono text-xs">
                        {formatPrice(auction.estimate_low, auction.currency)} – {formatPrice(auction.estimate_high, auction.currency)}
                      </td>
                      <td className="py-3.5 text-right font-mono font-bold text-accent">
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
            <div className="rule-thick mb-4" />
            <h2 className="section-label mb-6">Mostre Principali</h2>
            <div className="divide-y divide-border border-b border-border">
              {artist.exhibitions.map((ex, i) => (
                <div key={i} className="flex items-start justify-between py-4">
                  <div>
                    <h3 className="text-text-primary font-medium">{ex.title}</h3>
                    <p className="text-text-secondary text-sm">{ex.venue}, {ex.city}</p>
                  </div>
                  <div className="text-text-secondary text-sm shrink-0 ml-4 font-mono">
                    {ex.year}
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
