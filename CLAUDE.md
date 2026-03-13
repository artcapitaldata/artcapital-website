# CLAUDE.md - Art Capital Project Instructions

## Project Overview
Art Capital (artcapitaldata.com) is an art market intelligence platform.
It provides market data, analytics, and performance indices for contemporary art investors and collectors.

## Tech Stack
- **Framework**: Next.js 14+ with TypeScript, App Router
- **Styling**: Tailwind CSS (light editorial theme inspired by WSJ/FT — see Design System below)
- **Database**: Supabase (PostgreSQL) with Row Level Security
- **Hosting**: Vercel (Hobby plan, team: art-capitals-projects)
- **Newsletter**: Beehiiv (to be configured)
- **Charts**: Recharts for financial-style price index graphs
- **Icons**: Lucide React

## Key Concepts
- **Art Performance Index (API)**: Score 0-100 per artist
  - Formula: (Momentum x 0.35) + (Market Depth x 0.25) + (Recognition x 0.20) + (Consistency x 0.20)
  - Ratings: Strong Buy (80-100), Buy (60-79), Hold (40-59), Caution (20-39), High Risk (0-19)
- **Price Index**: Normalized historical price chart (base year = 100) using median auction prices
- **Freemium model**: Free, Premium (9.90/mo), Pro (49/mo)

## Project Structure
```
src/
  app/              # Next.js App Router pages
    layout.tsx      # Root layout (metadata, fonts)
    page.tsx        # Landing page (Server Component)
  components/
    layout/
      Header.tsx    # Responsive header with nav
      Footer.tsx    # Footer with links and disclaimer
  lib/
    constants.ts    # Site config, nav links, API weights, pricing tiers
    supabase.ts     # Supabase client (public + service role)
  styles/
    globals.css     # Tailwind + custom components + animations
  types/
    index.ts        # TypeScript types (Artist, ApiScore, PriceIndex, etc.)
supabase/
  schema.sql        # Database schema (tables, RLS, triggers)
```

## Database Tables
1. **artists** - Artist profiles (name, slug, nationality, medium[], movement[])
2. **auction_results** - Sale records (hammer_price, estimate, auction_house, date)
3. **api_scores** - Performance scores (score 0-100, momentum, depth, recognition, consistency)
4. **price_index** - Annual price data for charts (year, median_price, index_value, volume)
5. **exhibitions** + **artist_exhibitions** - Shows and fair participation
6. **newsletter_issues** - Newsletter archive
7. **profiles** - User profiles extending Supabase Auth

## Design System — Editorial Elegance

### Vision
Art Capital deve trasmettere **autorevolezza, ricchezza e sobrietà** — come il Wall Street Journal o il Financial Times applicati al mondo dell'arte. Il sito deve sembrare progettato da un team di design di alto livello, non da uno sviluppatore.

### Principi di Design

1. **Sobrietà prima di tutto** — Nessun effetto appariscente, nessuna animazione gratuita. Ogni elemento ha una ragione di esistere.
2. **Tipografia come protagonista** — I titoli e i dati parlano da soli. Grandi numeri, gerarchia chiara, ampio respiro (whitespace).
3. **Palette contenuta** — Bianco, nero, grigi caldi. Un solo colore d'accento usato con parsimonia per dati chiave e CTA.
4. **Credibilità visiva** — Grafici puliti, tabelle leggibili, fonti sempre visibili. Deve sembrare una piattaforma su cui si prendono decisioni da milioni di euro.
5. **Mai pacchiano** — No gradienti vistosi, no ombre pesanti, no bordi colorati, no emoji nell'interfaccia, no dark theme.

### Palette Colori

| Ruolo | Colore | Uso |
|---|---|---|
| Background | `#FFFFFF` bianco | Sfondo principale |
| Surface | `#F8F7F4` avorio caldo | Card, sezioni alternate |
| Text Primary | `#1A1A1A` nero morbido | Titoli, testo principale |
| Text Secondary | `#6B6B6B` grigio | Testo secondario, label |
| Border | `#E5E5E5` grigio chiaro | Linee, separatori, bordi tabelle |
| Accent | `#C9A84C` oro | Solo per: score principali, badge rating, CTA primaria |
| Positive | `#2D8C4E` verde scuro | Variazioni positive, "Buy" |
| Negative | `#C62828` rosso scuro | Variazioni negative, "Sell" |
| Chart Line | `#1A1A1A` nero | Linea principale dei grafici |

### Tipografia

- **Titoli/Display**: Playfair Display (serif) — eleganza editoriale
- **Body/UI**: Inter (sans-serif) — leggibilità e modernità
- **Dati/Numeri**: Tabular nums (monospace per allineamento) — precisione finanziaria
- **Gerarchia**: H1 grande e leggero, H2 medio e bold, body 16px, ampio line-height

### Layout

- **Max-width**: 1200px centrato, ampi margini laterali
- **Grid**: 12 colonne, gap generosi (24-32px)
- **Whitespace**: Abbondante — il vuoto è un elemento di design
- **Card**: Bordo sottile `#E5E5E5`, angoli appena arrotondati (4-6px), no ombre pesanti
- **Tabelle**: Stile editoriale — righe alternate leggere, header grassetto, allineamento numeri a destra

### Riferimenti Visivi

- Wall Street Journal (wsj.com) — layout editoriale, tipografia
- Financial Times (ft.com) — palette calda, autorevolezza
- Bloomberg Terminal (solo come riferimento per densità dati e precisione, NON come branding)
- Artnet/Artsy — solo per la struttura contenuti arte, NON per lo stile

### Anti-pattern (da EVITARE assolutamente)

- Dark mode / sfondi scuri
- Gradienti colorati
- Ombre esagerate (box-shadow pesanti)
- Animazioni continue o appariscenti
- Icone colorate o emoji nell'UI
- Font decorativi o "creativi"
- Bordi arrotondati eccessivi (no border-radius > 8px)
- Colori saturi/fluo
- Immagini stock generiche
- Layout che sembra un template Bootstrap/SaaS

## Language
- UI text is in **Italian** (the platform targets Italian collectors primarily)
- Code, comments, and variable names are in **English**

## Build Notes
- next.config.js has `ignoreBuildErrors: true` and `ignoreDuringBuilds: true` temporarily
- Page components should be Server Components by default
- Use 'use client' only when needed (interactivity, hooks, browser APIs)
- Do NOT use styled-jsx - put all CSS in globals.css or Tailwind classes

## Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=https://artcapitaldata.com
```

## GitHub
- Org: artcapitaldata
- Repo: artcapital-website
- Branch: main
- Auto-deploys to Vercel on push


---

## DATA METHODOLOGY (CRITICAL)

**LEGGI OBBLIGATORIAMENTE il file `DATA_METHODOLOGY.md` prima di lavorare su qualsiasi cosa relativa a dati, prezzi, indici o score.**

### Regole Fondamentali sui Dati

1. **MAI inventare dati d'asta** — se non ci sono dati reali, mostrare "Dati non disponibili"
2. **MAI calcolare indici senza almeno 3 data points** — mostrare "Dati insufficienti"
3. **SEMPRE includere source_url** — nessun risultato d'asta senza link alla fonte originale
4. **SEMPRE mantenere la valuta originale** — conversioni solo per calcoli aggregati
5. **Il Price Index è PER CATEGORIA medium** — mai mischiare pitture con stampe
6. **I mock data devono essere marcati** — chiaramente indicati come "demo/mock" nel codice e rimossi appena disponibili dati reali

### Come Funziona il Sistema Dati

```
[Case d'Asta] → [Scraping Automatico] → [auction_results] → [Calcolo Indici] → [price_index + api_scores]
```

- **auction_results**: dati grezzi dalle aste con source_url obbligatorio
- **price_index**: calcolato dai risultati reali, per artista/anno/categoria medium
- **api_scores**: calcolato algoritmicamente dai risultati + mostre + mercato
- **Formula API Score**: (Momentum × 0.35) + (Market Depth × 0.25) + (Recognition × 0.20) + (Consistency × 0.20)

Vedi `DATA_METHODOLOGY.md` per tutti i dettagli.
