import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ArtistDetailClient from './ArtistDetailClient'

// Demo data — will be replaced with Supabase queries
const DEMO_ARTISTS: Record<string, {
  name: string; slug: string; nationality: string; birthYear: number | null; deathYear: number | null;
  medium: string[]; movement: string[]; bio: string;
  score: { score: number; momentum: number; market_depth: number; recognition: number; consistency: number; rating: string };
  priceIndex: { year: number; index_value: number; volume: number }[];
  auctions: { title: string; auction_house: string; date: string; hammer_price: number | null; estimate_low: number; estimate_high: number; currency: string; sold: boolean }[];
  exhibitions: { title: string; venue: string; city: string; year: number; type: string }[];
}> = {
  'jean-michel-basquiat': {
    name: 'Jean-Michel Basquiat', slug: 'jean-michel-basquiat', nationality: 'Americano', birthYear: 1960, deathYear: 1988,
    medium: ['Pittura', 'Disegno'], movement: ['Neo-Espressionismo', 'Street Art'],
    bio: 'Jean-Michel Basquiat (1960-1988) è stato un artista americano che ha raggiunto la fama come parte del movimento neo-espressionista degli anni \'80. Da graffitista a star del mercato dell\'arte contemporanea, le sue opere mescolano testo, immagini e riferimenti culturali con una forza visiva unica.',
    score: { score: 87, momentum: 92, market_depth: 85, recognition: 95, consistency: 78, rating: 'Strong Buy' },
    priceIndex: [
      { year: 2000, index_value: 100, volume: 45 }, { year: 2001, index_value: 92, volume: 38 },
      { year: 2002, index_value: 108, volume: 52 }, { year: 2003, index_value: 172, volume: 61 },
      { year: 2004, index_value: 233, volume: 55 }, { year: 2005, index_value: 322, volume: 72 },
      { year: 2006, index_value: 400, volume: 68 }, { year: 2007, index_value: 267, volume: 45 },
      { year: 2008, index_value: 194, volume: 32 }, { year: 2009, index_value: 289, volume: 48 },
      { year: 2010, index_value: 378, volume: 58 }, { year: 2011, index_value: 472, volume: 65 },
      { year: 2012, index_value: 667, volume: 71 }, { year: 2013, index_value: 583, volume: 62 },
      { year: 2014, index_value: 544, volume: 55 }, { year: 2015, index_value: 611, volume: 59 },
      { year: 2016, index_value: 1000, volume: 78 }, { year: 2017, index_value: 833, volume: 70 },
      { year: 2018, index_value: 750, volume: 64 }, { year: 2019, index_value: 611, volume: 52 },
      { year: 2020, index_value: 917, volume: 45 }, { year: 2021, index_value: 1056, volume: 82 },
      { year: 2022, index_value: 944, volume: 75 }, { year: 2023, index_value: 1000, volume: 68 },
      { year: 2024, index_value: 1111, volume: 71 }, { year: 2025, index_value: 1200, volume: 40 },
    ],
    auctions: [
      { title: 'Untitled (1982)', auction_house: "Christie's", date: '2024-11-15', hammer_price: 85000000, estimate_low: 60000000, estimate_high: 80000000, currency: 'USD', sold: true },
      { title: 'In This Case', auction_house: "Christie's", date: '2024-05-09', hammer_price: 93100000, estimate_low: 50000000, estimate_high: 70000000, currency: 'USD', sold: true },
      { title: 'El Gran Espectaculo', auction_house: "Sotheby's", date: '2024-03-20', hammer_price: 67000000, estimate_low: 45000000, estimate_high: 65000000, currency: 'USD', sold: true },
      { title: 'Versus Medici', auction_house: "Sotheby's", date: '2023-11-08', hammer_price: 50800000, estimate_low: 35000000, estimate_high: 50000000, currency: 'USD', sold: true },
      { title: 'Warrior', auction_house: "Christie's", date: '2023-05-18', hammer_price: 41900000, estimate_low: 25000000, estimate_high: 35000000, currency: 'USD', sold: true },
    ],
    exhibitions: [
      { title: 'Basquiat: King Pleasure', venue: 'Starrett-Lehigh', city: 'New York', year: 2022, type: 'solo' },
      { title: 'Jean-Michel Basquiat', venue: 'Fondation Louis Vuitton', city: 'Parigi', year: 2018, type: 'solo' },
      { title: 'Basquiat: Boom for Real', venue: 'Barbican Centre', city: 'Londra', year: 2017, type: 'solo' },
    ],
  },
  'lucio-fontana': {
    name: 'Lucio Fontana', slug: 'lucio-fontana', nationality: 'Argentino-Italiano', birthYear: 1899, deathYear: 1968,
    medium: ['Pittura', 'Scultura', 'Ceramica'], movement: ['Spazialismo', 'Arte Informale'],
    bio: 'Lucio Fontana (1899-1968) è stato il fondatore dello Spazialismo. Con i suoi celebri "tagli" e "buchi", ha rivoluzionato il concetto di pittura, aprendo la tela verso una nuova dimensione spaziale.',
    score: { score: 82, momentum: 78, market_depth: 88, recognition: 90, consistency: 72, rating: 'Strong Buy' },
    priceIndex: [
      { year: 2000, index_value: 100, volume: 120 }, { year: 2002, index_value: 145, volume: 135 },
      { year: 2004, index_value: 210, volume: 142 }, { year: 2006, index_value: 380, volume: 155 },
      { year: 2008, index_value: 320, volume: 110 }, { year: 2010, index_value: 400, volume: 148 },
      { year: 2012, index_value: 520, volume: 160 }, { year: 2014, index_value: 600, volume: 145 },
      { year: 2016, index_value: 710, volume: 158 }, { year: 2018, index_value: 650, volume: 140 },
      { year: 2020, index_value: 580, volume: 105 }, { year: 2022, index_value: 720, volume: 152 },
      { year: 2024, index_value: 800, volume: 138 },
    ],
    auctions: [
      { title: 'Concetto spaziale, Attese (1964)', auction_house: "Christie's", date: '2024-06-12', hammer_price: 16500000, estimate_low: 12000000, estimate_high: 18000000, currency: 'EUR', sold: true },
      { title: 'Concetto spaziale (1962)', auction_house: "Sotheby's", date: '2024-03-05', hammer_price: 8200000, estimate_low: 6000000, estimate_high: 8000000, currency: 'EUR', sold: true },
    ],
    exhibitions: [
      { title: 'Lucio Fontana: Ambienti/Environments', venue: 'Pirelli HangarBicocca', city: 'Milano', year: 2017, type: 'solo' },
    ],
  },
  'gerhard-richter': {
    name: 'Gerhard Richter', slug: 'gerhard-richter', nationality: 'Tedesco', birthYear: 1932, deathYear: null,
    medium: ['Pittura'], movement: ['Arte Contemporanea', 'Fotorealismo'],
    bio: 'Gerhard Richter (1932-) è considerato il più grande pittore vivente. La sua opera spazia dal fotorealismo all\'astrazione, con una padronanza tecnica senza eguali.',
    score: { score: 85, momentum: 80, market_depth: 92, recognition: 98, consistency: 70, rating: 'Strong Buy' },
    priceIndex: [
      { year: 2000, index_value: 100, volume: 85 }, { year: 2002, index_value: 160, volume: 92 },
      { year: 2004, index_value: 280, volume: 98 }, { year: 2006, index_value: 420, volume: 105 },
      { year: 2008, index_value: 380, volume: 78 }, { year: 2010, index_value: 500, volume: 95 },
      { year: 2012, index_value: 750, volume: 102 }, { year: 2014, index_value: 680, volume: 88 },
      { year: 2016, index_value: 620, volume: 82 }, { year: 2018, index_value: 550, volume: 75 },
      { year: 2020, index_value: 480, volume: 60 }, { year: 2022, index_value: 600, volume: 85 },
      { year: 2024, index_value: 720, volume: 90 },
    ],
    auctions: [
      { title: 'Abstraktes Bild (1986)', auction_house: "Sotheby's", date: '2024-10-18', hammer_price: 32500000, estimate_low: 20000000, estimate_high: 30000000, currency: 'USD', sold: true },
    ],
    exhibitions: [
      { title: 'Gerhard Richter: Painting After All', venue: 'Met Breuer', city: 'New York', year: 2020, type: 'solo' },
    ],
  },
}

// Add generic fallback data for other artists from the demo list
const GENERIC_ARTISTS = [
  { slug: 'alighiero-boetti', name: 'Alighiero Boetti', nationality: 'Italiano', birthYear: 1940, deathYear: 1994, medium: ['Ricamo', 'Disegno', 'Mixed Media'], movement: ['Arte Povera', 'Arte Concettuale'], bio: 'Figura chiave dell\'Arte Povera. Le sue celebri "Mappe" ricamate sono diventate icone dell\'arte contemporanea italiana.', score: { score: 74, momentum: 70, market_depth: 78, recognition: 82, consistency: 66, rating: 'Buy' } },
  { slug: 'maurizio-cattelan', name: 'Maurizio Cattelan', nationality: 'Italiano', birthYear: 1960, deathYear: null, medium: ['Scultura', 'Installazione'], movement: ['Arte Contemporanea', 'Neo-Concettualismo'], bio: 'Artista provocatore italiano, celebre per opere iconiche come "Comedian" (la banana) e "La Nona Ora".', score: { score: 78, momentum: 85, market_depth: 72, recognition: 88, consistency: 68, rating: 'Buy' } },
  { slug: 'giorgio-morandi', name: 'Giorgio Morandi', nationality: 'Italiano', birthYear: 1890, deathYear: 1964, medium: ['Pittura', 'Incisione'], movement: ['Metafisica', 'Modernismo'], bio: 'Il maestro della natura morta. Le sue composizioni di bottiglie e vasi hanno influenzato generazioni di artisti.', score: { score: 71, momentum: 60, market_depth: 75, recognition: 88, consistency: 62, rating: 'Buy' } },
  { slug: 'piero-manzoni', name: 'Piero Manzoni', nationality: 'Italiano', birthYear: 1933, deathYear: 1963, medium: ['Mixed Media', 'Performance'], movement: ['Arte Concettuale', 'Neo-Avanguardia'], bio: 'Pioniere dell\'arte concettuale italiana. La sua "Merda d\'artista" resta una delle provocazioni più famose della storia dell\'arte.', score: { score: 68, momentum: 62, market_depth: 70, recognition: 78, consistency: 64, rating: 'Buy' } },
  { slug: 'banksy', name: 'Banksy', nationality: 'Britannico', birthYear: null, deathYear: null, medium: ['Street Art', 'Stampa', 'Installazione'], movement: ['Street Art', 'Arte Contemporanea'], bio: 'Artista anonimo britannico. Le sue opere di street art e le sue azioni provocatorie hanno conquistato il mercato globale.', score: { score: 72, momentum: 75, market_depth: 80, recognition: 92, consistency: 42, rating: 'Buy' } },
  { slug: 'damien-hirst', name: 'Damien Hirst', nationality: 'Britannico', birthYear: 1965, deathYear: null, medium: ['Scultura', 'Installazione', 'Pittura'], movement: ['Young British Artists', 'Arte Contemporanea'], bio: 'Leader degli Young British Artists. Noto per le sue opere con animali in formaldeide e le "spin paintings".', score: { score: 58, momentum: 45, market_depth: 72, recognition: 85, consistency: 32, rating: 'Hold' } },
  { slug: 'jeff-koons', name: 'Jeff Koons', nationality: 'Americano', birthYear: 1955, deathYear: null, medium: ['Scultura', 'Pittura'], movement: ['Neo-Pop', 'Arte Contemporanea'], bio: 'Il re del Neo-Pop. Le sue sculture monumentali come "Balloon Dog" sono tra le opere più costose mai vendute.', score: { score: 64, momentum: 55, market_depth: 78, recognition: 90, consistency: 35, rating: 'Buy' } },
  { slug: 'yoshitomo-nara', name: 'Yoshitomo Nara', nationality: 'Giapponese', birthYear: 1959, deathYear: null, medium: ['Pittura', 'Scultura', 'Disegno'], movement: ['Neo-Pop', 'Arte Contemporanea'], bio: 'Artista giapponese celebre per i suoi ritratti di bambini ribelli dall\'aria apparentemente innocente.', score: { score: 76, momentum: 80, market_depth: 72, recognition: 78, consistency: 74, rating: 'Buy' } },
  { slug: 'kaws', name: 'KAWS', nationality: 'Americano', birthYear: 1974, deathYear: null, medium: ['Scultura', 'Pittura', 'Toy Art'], movement: ['Neo-Pop', 'Street Art'], bio: 'Brian Donnelly aka KAWS. Da graffitista a fenomeno globale con i suoi iconici "Companion" e collaborazioni con brand.', score: { score: 69, momentum: 72, market_depth: 65, recognition: 75, consistency: 64, rating: 'Buy' } },
  { slug: 'adrian-ghenie', name: 'Adrian Ghenie', nationality: 'Rumeno', birthYear: 1977, deathYear: null, medium: ['Pittura'], movement: ['Arte Contemporanea'], bio: 'Pittore figurativo rumeno tra i più quotati della sua generazione. Le sue opere combinano storia e memoria con una tecnica potente.', score: { score: 80, momentum: 88, market_depth: 74, recognition: 78, consistency: 80, rating: 'Strong Buy' } },
  { slug: 'nicolas-party', name: 'Nicolas Party', nationality: 'Svizzero', birthYear: 1980, deathYear: null, medium: ['Pittura', 'Scultura', 'Installazione'], movement: ['Arte Contemporanea'], bio: 'Artista svizzero noto per i suoi pastelli surreali e le installazioni site-specific dalle cromie intense.', score: { score: 71, momentum: 78, market_depth: 62, recognition: 68, consistency: 76, rating: 'Buy' } },
  { slug: 'enrico-castellani', name: 'Enrico Castellani', nationality: 'Italiano', birthYear: 1930, deathYear: 2017, medium: ['Pittura', 'Scultura'], movement: ['ZERO', 'Arte Cinetica'], bio: 'Maestro delle superfici estroflesse. Le sue tele bianche con chiodi creano giochi di luce e ombra unici.', score: { score: 62, momentum: 55, market_depth: 68, recognition: 72, consistency: 54, rating: 'Buy' } },
  { slug: 'rudolf-stingel', name: 'Rudolf Stingel', nationality: 'Italiano', birthYear: 1956, deathYear: null, medium: ['Pittura', 'Installazione'], movement: ['Arte Contemporanea'], bio: 'Pittore altoatesino basato a New York. Le sue installazioni ambientali sfidano i confini della pittura tradizionale.', score: { score: 65, momentum: 60, market_depth: 70, recognition: 72, consistency: 58, rating: 'Buy' } },
  { slug: 'salvo', name: 'Salvo', nationality: 'Italiano', birthYear: 1947, deathYear: 2015, medium: ['Pittura'], movement: ['Arte Povera', 'Transavanguardia'], bio: 'Paesaggi luminosi e mediterranei. La sua pittura ha attraversato l\'Arte Povera e la Transavanguardia con uno stile unico.', score: { score: 55, momentum: 48, market_depth: 52, recognition: 65, consistency: 58, rating: 'Hold' } },
  { slug: 'anish-kapoor', name: 'Anish Kapoor', nationality: 'Britannico-Indiano', birthYear: 1954, deathYear: null, medium: ['Scultura', 'Installazione'], movement: ['Arte Contemporanea'], bio: 'Scultore britannico-indiano noto per le sue sculture monumentali come "Cloud Gate" a Chicago.', score: { score: 61, momentum: 55, market_depth: 65, recognition: 80, consistency: 48, rating: 'Buy' } },
  { slug: 'cecily-brown', name: 'Cecily Brown', nationality: 'Britannica', birthYear: 1969, deathYear: null, medium: ['Pittura'], movement: ['Arte Contemporanea', 'Neo-Espressionismo'], bio: 'Astrazione gestuale e figurazione si fondono nei suoi dipinti energici e sensuali.', score: { score: 73, momentum: 78, market_depth: 68, recognition: 72, consistency: 74, rating: 'Buy' } },
  { slug: 'george-condo', name: 'George Condo', nationality: 'Americano', birthYear: 1957, deathYear: null, medium: ['Pittura', 'Scultura', 'Disegno'], movement: ['Arte Contemporanea', 'Espressionismo'], bio: 'Inventore del "Cubismo Artificiale". I suoi ritratti grotteschi e psicologici sono inconfondibili.', score: { score: 67, momentum: 62, market_depth: 70, recognition: 74, consistency: 62, rating: 'Buy' } },
]

for (const a of GENERIC_ARTISTS) {
  if (!DEMO_ARTISTS[a.slug]) {
    DEMO_ARTISTS[a.slug] = {
      ...a,
      priceIndex: [
        { year: 2010, index_value: 100, volume: 30 }, { year: 2012, index_value: 130, volume: 35 },
        { year: 2014, index_value: 170, volume: 40 }, { year: 2016, index_value: 220, volume: 38 },
        { year: 2018, index_value: 200, volume: 42 }, { year: 2020, index_value: 180, volume: 28 },
        { year: 2022, index_value: 260, volume: 45 }, { year: 2024, index_value: 300, volume: 40 },
      ],
      auctions: [],
      exhibitions: [],
    }
  }
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const artist = DEMO_ARTISTS[slug]
  if (!artist) return { title: 'Artista non trovato' }
  return { title: `${artist.name} — Art Performance Index` }
}

export default async function ArtistDetailPage({ params }: PageProps) {
  const { slug } = await params
  const artist = DEMO_ARTISTS[slug]
  if (!artist) notFound()

  return <ArtistDetailClient artist={artist} />
}
