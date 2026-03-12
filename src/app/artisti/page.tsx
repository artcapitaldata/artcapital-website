'use client'

import { useState, useMemo } from 'react'
import ArtistCard from '@/components/ArtistCard'
import SearchBar from '@/components/SearchBar'
import { Filter } from 'lucide-react'

const DEMO_ARTISTS = [
  { name: 'Lucio Fontana', slug: 'lucio-fontana', nationality: 'Argentino-Italiano', medium: ['Pittura', 'Scultura', 'Ceramica'], movement: ['Spazialismo'], score: 82 },
  { name: 'Alighiero Boetti', slug: 'alighiero-boetti', nationality: 'Italiano', medium: ['Ricamo', 'Disegno', 'Mixed Media'], movement: ['Arte Povera'], score: 74 },
  { name: 'Maurizio Cattelan', slug: 'maurizio-cattelan', nationality: 'Italiano', medium: ['Scultura', 'Installazione'], movement: ['Arte Contemporanea'], score: 78 },
  { name: 'Giorgio Morandi', slug: 'giorgio-morandi', nationality: 'Italiano', medium: ['Pittura', 'Incisione'], movement: ['Metafisica'], score: 71 },
  { name: 'Piero Manzoni', slug: 'piero-manzoni', nationality: 'Italiano', medium: ['Mixed Media', 'Performance'], movement: ['Arte Concettuale'], score: 68 },
  { name: 'Enrico Castellani', slug: 'enrico-castellani', nationality: 'Italiano', medium: ['Pittura', 'Scultura'], movement: ['ZERO'], score: 62 },
  { name: 'Rudolf Stingel', slug: 'rudolf-stingel', nationality: 'Italiano', medium: ['Pittura', 'Installazione'], movement: ['Arte Contemporanea'], score: 65 },
  { name: 'Salvo', slug: 'salvo', nationality: 'Italiano', medium: ['Pittura'], movement: ['Transavanguardia'], score: 55 },
  { name: 'Jean-Michel Basquiat', slug: 'jean-michel-basquiat', nationality: 'Americano', medium: ['Pittura', 'Disegno'], movement: ['Neo-Espressionismo'], score: 87 },
  { name: 'Banksy', slug: 'banksy', nationality: 'Britannico', medium: ['Street Art', 'Stampa'], movement: ['Street Art'], score: 72 },
  { name: 'Damien Hirst', slug: 'damien-hirst', nationality: 'Britannico', medium: ['Scultura', 'Installazione', 'Pittura'], movement: ['Young British Artists'], score: 58 },
  { name: 'Jeff Koons', slug: 'jeff-koons', nationality: 'Americano', medium: ['Scultura', 'Pittura'], movement: ['Neo-Pop'], score: 64 },
  { name: 'Gerhard Richter', slug: 'gerhard-richter', nationality: 'Tedesco', medium: ['Pittura'], movement: ['Fotorealismo'], score: 85 },
  { name: 'Yoshitomo Nara', slug: 'yoshitomo-nara', nationality: 'Giapponese', medium: ['Pittura', 'Scultura', 'Disegno'], movement: ['Neo-Pop'], score: 76 },
  { name: 'Anish Kapoor', slug: 'anish-kapoor', nationality: 'Britannico-Indiano', medium: ['Scultura', 'Installazione'], movement: ['Arte Contemporanea'], score: 61 },
  { name: 'KAWS', slug: 'kaws', nationality: 'Americano', medium: ['Scultura', 'Pittura', 'Toy Art'], movement: ['Neo-Pop', 'Street Art'], score: 69 },
  { name: 'Cecily Brown', slug: 'cecily-brown', nationality: 'Britannica', medium: ['Pittura'], movement: ['Neo-Espressionismo'], score: 73 },
  { name: 'George Condo', slug: 'george-condo', nationality: 'Americano', medium: ['Pittura', 'Scultura', 'Disegno'], movement: ['Espressionismo'], score: 67 },
  { name: 'Adrian Ghenie', slug: 'adrian-ghenie', nationality: 'Rumeno', medium: ['Pittura'], movement: ['Arte Contemporanea'], score: 80 },
  { name: 'Nicolas Party', slug: 'nicolas-party', nationality: 'Svizzero', medium: ['Pittura', 'Scultura', 'Installazione'], movement: ['Arte Contemporanea'], score: 71 },
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
    }).sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
  }, [search, nationality, medium, movement])

  const selectClass = "w-full border border-border rounded px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-text-primary bg-white"

  return (
    <main className="min-h-screen py-10 px-5">
      <div className="max-w-editorial mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-2">Database Artisti</h1>
          <p className="text-text-secondary">Esplora {DEMO_ARTISTS.length} artisti contemporanei con dati di mercato e performance.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1">
            <SearchBar value={search} onChange={setSearch} placeholder="Cerca artista per nome..." />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary flex items-center gap-2 px-4 py-2.5"
          >
            <Filter className="w-4 h-4" />
            Filtri
          </button>
        </div>

        {showFilters && (
          <div className="card p-5 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-text-secondary mb-1.5 block font-medium">Nazionalit&agrave;</label>
              <select value={nationality} onChange={(e) => setNationality(e.target.value)} className={selectClass}>
                <option value="">Tutte</option>
                {ALL_NATIONALITIES.map((n) => (<option key={n} value={n}>{n}</option>))}
              </select>
            </div>
            <div>
              <label className="text-xs text-text-secondary mb-1.5 block font-medium">Medium</label>
              <select value={medium} onChange={(e) => setMedium(e.target.value)} className={selectClass}>
                <option value="">Tutti</option>
                {ALL_MEDIUM.map((m) => (<option key={m} value={m}>{m}</option>))}
              </select>
            </div>
            <div>
              <label className="text-xs text-text-secondary mb-1.5 block font-medium">Movimento</label>
              <select value={movement} onChange={(e) => setMovement(e.target.value)} className={selectClass}>
                <option value="">Tutti</option>
                {ALL_MOVEMENTS.map((m) => (<option key={m} value={m}>{m}</option>))}
              </select>
            </div>
          </div>
        )}

        <p className="text-sm text-text-secondary mb-4">{filtered.length} artisti trovati</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((artist) => (
            <ArtistCard
              key={artist.slug}
              name={artist.name}
              slug={artist.slug}
              nationality={artist.nationality}
              medium={artist.medium}
              score={artist.score}
            />
          ))}
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
