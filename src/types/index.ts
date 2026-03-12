// ============================================
// ART CAPITAL — Core Type Definitions
// ============================================

// --- Artist Types ---

export interface Artist {
  id: string
  name: string
  nationality: string
  birthYear: number
  deathYear?: number
  medium: string[]        // e.g., ['Pittura', 'Scultura']
  movement: string[]      // e.g., ['Arte Povera', 'Concettuale']
  slug: string            // URL-friendly: 'alighiero-boetti'
  imageUrl?: string
  bio?: string
  createdAt: string
  updatedAt: string
}

export interface ArtistWithMetrics extends Artist {
  latestApiScore: ApiScore | null
  priceIndex: PriceIndexPoint[]
  auctionSummary: AuctionSummary
}

// --- Art Performance Index (API™) ---

export interface ApiScore {
  artistId: string
  score: number           // 0-100
  rating: ApiRating
  momentum: number        // 0-100 (peso 35%)
  marketDepth: number     // 0-100 (peso 25%)
  recognition: number     // 0-100 (peso 20%)
  consistency: number     // 0-100 (peso 20%)
  calculatedAt: string
}

export type ApiRating = 'Strong Buy' | 'Buy' | 'Hold' | 'Caution' | 'High Risk'

export function getApiRating(score: number): ApiRating {
  if (score >= 80) return 'Strong Buy'
  if (score >= 60) return 'Buy'
  if (score >= 40) return 'Hold'
  if (score >= 20) return 'Caution'
  return 'High Risk'
}

export function getRatingColor(rating: ApiRating): string {
  switch (rating) {
    case 'Strong Buy': return '#10B981'
    case 'Buy': return '#34D399'
    case 'Hold': return '#F59E0B'
    case 'Caution': return '#F97316'
    case 'High Risk': return '#EF4444'
  }
}

// --- Price Index (il grafico storico) ---

export interface PriceIndexPoint {
  year: number
  medianPrice: number      // prezzo mediano di vendita quell'anno
  indexValue: number        // normalizzato (anno base = 100)
  volume: number            // numero opere vendute
  sellThroughRate: number   // % vendute sul totale offerto (0-100)
  avgEstimateRatio: number  // rapporto prezzo/stima alta (>100 = sopra stima)
}

// --- Auction Data ---

export interface AuctionResult {
  id: string
  artistId: string
  title: string            // titolo dell'opera
  auctionHouse: string     // Christie's, Sotheby's, etc.
  saleTitle: string        // nome della vendita
  date: string
  estimateLow: number
  estimateHigh: number
  hammerPrice: number | null  // null = invenduto
  currency: string
  medium: string
  dimensions?: string
  imageUrl?: string
  lot: string
  sold: boolean
}

export interface AuctionSummary {
  totalLots: number
  totalSold: number
  sellThroughRate: number
  avgHammerPrice: number
  medianHammerPrice: number
  highestSale: number
  highestSaleTitle: string
  lastAuctionDate: string
}

// --- Newsletter Types ---

export interface NewsletterIssue {
  id: string
  number: number
  title: string
  slug: string
  publishedAt: string
  summary: string
  sections: NewsletterSection[]
  isPremium: boolean
}

export interface NewsletterSection {
  type: 'market-pulse' | 'deep-dive' | 'radar' | 'numbers' | 'outlook'
  title: string
  content: string
}

// --- Exhibition & News ---

export interface Exhibition {
  id: string
  title: string
  venue: string
  city: string
  country: string
  startDate: string
  endDate: string
  artistIds: string[]
  type: 'solo' | 'group' | 'fair' | 'biennial'
  url?: string
}

// --- User Types ---

export interface UserProfile {
  id: string
  email: string
  tier: 'free' | 'premium' | 'pro'
  watchlist: string[]    // artist IDs
  createdAt: string
}
