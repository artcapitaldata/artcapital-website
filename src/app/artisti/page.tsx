'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import SearchBar from '@/components/SearchBar'
import { Filter } from 'lucide-react'
import ApiScoreBadge from '@/components/ApiScoreBadge'

// DEMO — score placeholder, chiaramente marcati come demo nel codice
const DEMO_ARTISTS = [
  { name: 'Jean-Michel Basquiat', slug: 'jean-michel-basquiat', nationality: 'Americano', medium: ['Pittura', 'Disegno'], movement: ['Neo-Espressionismo'], score: 87 },
  { name: 'Gerhard Richter', slug: 'gerhard-richter', nationality: 'Tedesco', medium: ['Pittura'], movement: ['Fotorealismo'], score: 85 },
  { name: 'Lucio Fontana', slug: 'lucio-fontana', nationality: 'Argentino-Italiano', medium: ['Pittura', 'Scultura', 'Ceramica'], movement: ['Spazialismo'], score: 82 },
  { name: 'Adrian Ghenie', slug: 'adrian-ghenie', nationality: 'Rumeno', medium: ['Pittura'], movement: ['Arte Contemporanea'], score: 80 },
  { name: 'Maurizio Cattelan', slug: 'maurizio-cattelan', nationality: 'Italiano', medium: ['Scultura', 'Installazione'], movement: ['Arte Contemporanea'], score: 78 },
  { name: 'Yoshitomo Nara', slug: 'yoshitomo-nara', nationality: 'Giapponese', medium: ['Pittura', 'Scultura', 'Disegno'], movement: ['Neo-Pop'], score: 76 },
  { name: 'Alighiero Boetti', slug: 'alighiero-boetti', nationality: 'Italiano', medium: ['Ricamo', 'Disegno', 'Mixed Media'], movement: ['Arte Povera'], score: 74 },
  { name: 'Cecily Brown', slug: 'cecily-brown', nationality: 'Britannica', medium: ['Pittura'], movement: ['Neo-Espressionismo'], score: 73 },
  { name: 'Banksy', slug: 'banksy', nationality: 'Britannico', medium: ['Street Art', 'Stampa'], movement: ['Street Art'], score: 72 },
  { name: 'Giorgio Morandi', slug: 'giorgio-morandi', nationality: 'Italiano', medium: ['Pittura', 'Incisione'], movement: ['Metafisica'], score: 71 },
  { name: 'Nicolas Party', slug: 'nicolas-party', nationality: 'Svizzero', medium: ['Pittura', 'Scultura', 'Installazione'], movement: ['Arte Contemporanea'], score: 71 },
  { name: 'KAWS', slug: 'kaws', nationality: 'Americano', medium: ['Scultura', 'Pittura', 'Toy Art'], movement: ['Neo-Pop', 'Street Art'], score: 69 },
  { name: 'Piero Manzoni', slug: 'piero-manzoni', nationality: 'Italiano', medium: ['Mixed Media', 'Performance'], movement: ['Arte Concettuale'], score: 68 },
  { name: 'George Condo', slug: 'george-condo', nationality: 'Americano', medium: ['Pittura', 'Scultura', 'Disegno'], movement: ['Espressionismo'], score: 67 },
  { name: 'Rudolf Stingel', slug: 'rudolf-stingel', nationality: 'Italiano', medium: ['Pittura', 'Installazione'], movement: ['Arte Contemporanea'], score: 65 },
  { name: 'Jeff Koons', slug: 'jeff-koons', nationality: 'Americano', medium: ['Scultura', 'Pittura'], movement: ['Neo-Pop'], score: 64 },
  { name: 'Enrico Castellani', slug: 'enrico-castellani', nationality: 'Italiano', medium: ['Pittura', 'Scultura'], movement: ['ZERO'], score: 62 },
  { name: 'Anish Kapoor', slug: 'anish-kapoor', nationality: 'Britannico-Indiano', medium: ['Scultura', 'Installazione'], movement: ['Arte Contemporanea'], score: 61 },
  { name: 'Damien Hirst', slug: 'damien-hirst', nationality: 'Britannico', medium: ['Scultura', 'Installazione', 'Pittura'], movement: ['Young British Artists'], score: 58 },
  { name: 'Salvo', slug: 'salvo', nationality: 'Italiano', medium: ['Pittura'], movement: ['Transavanguardia'], score: 55 },
]

const ALL_NATIONALITIES = [...new Set(DEMO_ARTISTS.map((a) => a.nationality))].sort()
const ALL_MEDIUM = [...new Set(DEMO_ARTISTS.flatMap((a) => a.medium))].sort()
const ALL_MOVEMENTS = [...new Set(DEMO_ARTISTS.flatMap((a) => a.movement))].sort()

export default function ArtistiPage() {
  const [search, setSearch] = useState('')
  const [nationality, setNationality] = useState('')
  const [medium, setMedium] = useState('')
  const [movement, setMovement] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    return DEMO_ARTISTS.filter((a) => {
      if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false
      if (nationality && a.nationality !== nationality) return false
      if (medium && !a.medium.includes(medium)) return false
      if (movement && !a.movement.includes(movement)) return false
      return true
    }).sort((a, b) => b.score - a.score)
  }, [search, nationality, medium, movement])

  const selectClass = "w-full border border-border px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-text-primary bg-white"

  return (
    <main className="min-h-screen">
      <div className="container-ac py-12 md:py-16">
        <div className="rule-thick mb-4" />
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-normal text-text-primary mb-2">Database Artisti</h1>
            <p className="text-text-secondary">{DEMO_ARTISTS.length} artisti contemporanei monitorati</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1">
            <SearchBar value={search} onChange={setSearch} placeholder="Cerca artista per nome..." />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary flex items-center gap-2 px-4"
          >
            <Filter className="w-4 h-4" />
            Filtri
          </button>
        </div>

        {showFilters && (
          <div className="border border-border p-5 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-5" style={{ borderRadius: '2px' }}>
            <div>
              <label className="section-label mb-2 block">Nazionalit&agrave;</label>
              <select value={nationality} onChange={(e) => setNationality(e.target.value)} className={selectClass} style={{ borderRadius: '2px' }}>
                <option value="">Tutte</option>
                {ALL_NATIONALITIES.map((n) => (<option key={n} value={n}>{n}</option>))}
              </select>
            </div>
            <div>
              <label className="section-label mb-2 block">Medium</label>
              <select value={medium} onChange={(e) => setMedium(e.target.value)} className={selectClass} style={{ borderRadius: '2px' }}>
                <option value="">Tutti</option>
                {ALL_MEDIUM.map((m) => (<option key={m} value={m}>{m}</option>))}
              </select>
            </div>
            <div>
              <label className="section-label mb-2 block">Movimento</label>
              <select value={movement} onChange={(e) => setMovement(e.target.value)} className={selectClass} style={{ borderRadius: '2px' }}>
                <option value="">Tutti</option>
                {ALL_MOVEMENTS.map((m) => (<option key={m} value={m}>{m}</option>))}
              </select>
            </div>
          </div>
        )}

        <p className="text-sm text-text-secondary mb-4">{filtered.length} risultati</p>

        {/* Table layout — editorial, not cards */}
        <div className="border-t-2 border-text-primary">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 pr-4 section-label">Artista</th>
                <th className="text-left py-3 pr-4 section-label hidden md:table-cell">Nazionalità</th>
                <th className="text-left py-3 pr-4 section-label hidden lg:table-cell">Medium</th>
                <th className="text-left py-3 pr-4 section-label hidden md:table-cell">Movimento</th>
                <th className="text-right py-3 section-label">Score</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((artist, i) => (
                <tr key={artist.slug} className={`border-b border-border hover:bg-surface transition-colors ${i % 2 === 1 ? 'bg-surface/50' : ''}`}>
                  <td className="py-3.5 pr-4">
                    <Link href={`/artisti/${artist.slug}`} className="text-text-primary font-medium hover:text-accent transition-colors">
                      {artist.name}
                    </Link>
                  </td>
                  <td className="py-3.5 pr-4 text-text-secondary hidden md:table-cell">{artist.nationality}</td>
                  <td className="py-3.5 pr-4 text-text-secondary hidden lg:table-cell">{artist.medium.slice(0, 2).join(', ')}</td>
                  <td className="py-3.5 pr-4 text-text-secondary hidden md:table-cell">{artist.movement[0]}</td>
                  <td className="py-3.5 text-right">
                    <ApiScoreBadge score={artist.score} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-text-secondary">
            Nessun artista trovato. Prova a modificare i filtri.
          </div>
        )}
      </div>
    </main>
  )
}
