// ============================================
// ART CAPITAL — Constants & Configuration
// ============================================

export const SITE = {
  name: 'Art Capital',
  tagline: 'Art Market Intelligence',
  description: 'Il Bloomberg dell\'Arte. Dati di mercato, analisi finanziarie e intelligence per collezionisti e investitori.',
  url: 'https://artcapitaldata.com',
  email: 'info@artcapitaldata.com',
} as const

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Artisti', href: '/artisti' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Newsletter', href: '/newsletter' },
  { label: 'Prezzi', href: '/pricing' },
] as const

export const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/company/artcapitaldata',
  instagram: 'https://instagram.com/artcapitaldata',
  x: 'https://x.com/artcapitaldata',
} as const

// API™ Score weights
export const API_WEIGHTS = {
  momentum: 0.35,
  marketDepth: 0.25,
  recognition: 0.20,
  consistency: 0.20,
} as const

// Major auction houses tracked
export const AUCTION_HOUSES = [
  'Christie\'s',
  'Sotheby\'s',
  'Phillips',
  'Bonhams',
  'Dorotheum',
  'Pandolfini',
  'Cambi',
  'Meeting Art',
  'Finarte',
  'Il Ponte',
] as const

export const PRICING = {
  free: {
    name: 'Free',
    price: 0,
    features: [
      'Newsletter settimanale (Market Pulse)',
      '1 Deep Dive al mese',
      '5 ricerche database/mese',
    ],
  },
  premium: {
    name: 'Premium',
    priceMonthly: 9.90,
    priceYearly: 99,
    features: [
      'Newsletter completa + archivio',
      'Database artisti illimitato',
      'Art Performance Index\u2122',
      'Grafici performance storici',
      'Alert personalizzati',
    ],
  },
  pro: {
    name: 'Pro',
    priceMonthly: 49,
    priceYearly: 490,
    features: [
      'Tutto Premium',
      'Report trimestrali esclusivi',
      'Export dati CSV/PDF',
      'API access',
      'Consulenza prioritaria',
    ],
  },
} as const
