# ART CAPITAL — Specifica Tecnica

---

## 1. Architettura generale

```
[Frontend: Next.js / Vercel]
        |
        v
[API Layer: Next.js API routes / Edge Functions]
        |
        v
[Database: Supabase PostgreSQL]
        |
        v
[Scraper: Node.js scripts eseguiti dal Mac di Sebastiano o da cron job]
        |
        v
[Valutatore AI: Logica di matching + generazione risposta]
```

---

## 2. Database — Schema

### Tabella: `auction_results` (esistente, da espandere)

Contiene tutti i risultati d'asta raccolti. Ogni riga = un lotto passato in asta.

| Campo | Tipo | Descrizione |
|-------|------|-------------|
| id | uuid | PK |
| artist_name | text | Nome artista come da catalogo |
| artist_id | uuid | FK verso tabella artists (nullable) |
| title | text | Titolo dell'opera |
| auction_house | text | Casa d'asta (es: "Finarte", "Wannenes") |
| auction_house_country | text | "IT" per case italiane, "UK", "US" ecc. |
| sale_name | text | Nome della vendita |
| sale_date | date | Data della vendita |
| lot_number | text | Numero del lotto |
| medium | text | Tecnica (es: "olio su tela", "biro su carta") |
| medium_category | text | Categoria normalizzata (painting, work_on_paper, sculpture, print, photography, mixed_media) |
| dimensions_cm | text | Dimensioni originali come da catalogo |
| height_cm | numeric | Altezza in cm (estratta/normalizzata) |
| width_cm | numeric | Larghezza in cm (estratta/normalizzata) |
| year_created | integer | Anno di creazione dell'opera |
| estimate_low | numeric | Stima bassa |
| estimate_high | numeric | Stima alta |
| hammer_price | numeric | Prezzo di aggiudicazione (martello) |
| premium_price | numeric | Prezzo con diritti d'asta |
| currency | text | Valuta (EUR per le italiane) |
| sold | boolean | true = venduto, false = invenduto |
| source_url | text | URL della pagina sorgente |
| image_url | text | URL immagine dell'opera |
| created_at | timestamp | Data inserimento nel DB |
| updated_at | timestamp | Ultimo aggiornamento |

### Tabella: `artists` (esistente, da espandere)

| Campo | Tipo | Descrizione |
|-------|------|-------------|
| id | uuid | PK |
| name | text | Nome completo |
| birth_year | integer | Anno di nascita |
| death_year | integer | Anno di morte (null se vivente) |
| nationality | text | Nazionalità |
| bio_it | text | Biografia in italiano |
| bio_en | text | Biografia in inglese |
| tier | text | "blue_chip", "mid_market", "emerging" |
| galleries | jsonb | Lista gallerie rappresentanti |
| exhibitions | jsonb | Lista mostre principali |
| collections | jsonb | Collezioni pubbliche |
| awards | jsonb | Premi e residenze |
| image_url | text | Foto/ritratto artista |
| editorial_note | text | Nota curatoriale (per emergenti) |
| created_at | timestamp | |
| updated_at | timestamp | |

### Tabella: `auction_houses` (nuova)

| Campo | Tipo | Descrizione |
|-------|------|-------------|
| id | uuid | PK |
| name | text | Nome (es: "Finarte") |
| country | text | Paese |
| city | text | Città sede |
| website | text | URL sito |
| scraper_config | jsonb | Configurazione per lo scraper (selettori, URL patterns) |
| last_scraped | timestamp | Ultima raccolta dati |
| active | boolean | Se monitorata attivamente |

### Vista: `artist_market_stats` (materializzata, aggiornata dopo ogni import)

Vista precalcolata con statistiche aggregate per artista. Alimenta le schede e il valutatore.

| Campo | Tipo | Descrizione |
|-------|------|-------------|
| artist_id | uuid | |
| total_lots | integer | Totale lotti in asta |
| total_sold | integer | Lotti venduti |
| total_unsold | integer | Lotti invenduti |
| bought_in_rate | numeric | % invenduto |
| avg_hammer_eur | numeric | Prezzo medio martello (EUR) |
| median_hammer_eur | numeric | Prezzo mediano martello |
| max_hammer_eur | numeric | Record |
| min_hammer_eur | numeric | Minimo |
| avg_premium_eur | numeric | Media con diritti |
| first_auction_date | date | Prima apparizione in asta |
| last_auction_date | date | Ultima apparizione |
| trend_1y | numeric | Variazione % prezzo medio ultimo anno |
| trend_3y | numeric | Variazione % 3 anni |
| trend_5y | numeric | Variazione % 5 anni |
| stats_by_medium | jsonb | Breakdown per tecnica |
| stats_by_size | jsonb | Breakdown per fascia dimensionale |
| last_computed | timestamp | |

---

## 3. Scraper — Architettura

### Approccio per case d'asta italiane

Le case d'asta italiane hanno siti molto più semplici di Christie's/Sotheby's. La strategia cambia radicalmente:

**Tier 1 — HTTP diretto (preferito):**
Molte case d'asta italiane servono i risultati come HTML statico o hanno API interne semplici. Si usano chiamate HTTP con `node-fetch` o `axios`. Zero browser, zero Playwright.

**Tier 2 — HTML parsing leggero:**
Per siti che richiedono rendering JS minimo, si usa `cheerio` per parsare l'HTML.

**Tier 3 — Playwright (ultimo resort):**
Solo per siti con SPA complesse. Si usa con `headless: false` e anti-detection.

**Tier 4 — Partnership diretta:**
Alcune case d'asta potrebbero fornire dati via export CSV/Excel o API. Da esplorare.

### Struttura scraper

```
scripts/
├── scrapers/
│   ├── finarte.js
│   ├── wannenes.js
│   ├── pandolfini.js
│   ├── ilponte.js
│   ├── meetingart.js
│   ├── farsetti.js
│   ├── cambi.js
│   └── dorotheum-it.js
├── lib/
│   ├── supabase.js          # Client Supabase condiviso
│   ├── normalizer.js        # Normalizzazione dati (dimensioni, valute, tecniche)
│   ├── checkpoint.js        # Sistema checkpoint per resume
│   └── logger.js            # Logging strutturato
├── run-all.js               # Esegue tutti gli scraper in sequenza
└── scraper-config.json      # Configurazione per casa d'asta
```

### Normalizzazione dati

Ogni scraper produce dati grezzi che vengono normalizzati prima dell'inserimento:

- **Dimensioni:** Tutti i formati ("50 x 70 cm", "50x70", "cm 50x70") → `height_cm: 50, width_cm: 70`
- **Tecniche:** Tutti i formati ("olio su tela", "Oil on canvas", "olio/tela") → `medium_category: "painting"`
- **Valute:** Tutto convertito in EUR al cambio del giorno d'asta
- **Nomi artisti:** Normalizzati e collegati alla tabella `artists` tramite fuzzy matching

### Scheduling

Gli scraper girano sul Mac di Sebastiano con un semplice cron job o manualmente dopo ogni sessione d'asta. Frequenza tipica: 1-2 volte a settimana.

---

## 4. Valutatore AI — Logica

### Input utente
```
{
  "artist_name": "Alighiero Boetti",
  "medium": "biro su carta",
  "height_cm": 50,
  "width_cm": 70,
  "year_created": 1988
}
```

### Processo

1. **Matching artista:** Fuzzy match del nome inserito con la tabella `artists`
2. **Filtro comparabili:** Query su `auction_results` con filtri:
   - Stesso artista
   - Stessa `medium_category` (o simile)
   - Range dimensionale: ±30% su altezza e larghezza
   - Periodo: ±10 anni sulla data di creazione
   - Solo risultati venduti (`sold = true`)
   - Ordinati per data vendita (più recenti pesano di più)
3. **Calcolo statistico:**
   - Mediana dei `premium_price` dei comparabili
   - Range interquartile (Q1-Q3) come range di stima
   - Media ponderata (peso decrescente per anzianità)
   - Trend rispetto a comparabili di 3 anni fa
4. **Generazione risposta:**
   - Range di stima
   - Numero di comparabili usati
   - Lista dei 3-5 comparabili più rilevanti (con link sorgente)
   - Nota sul trend
   - Livello di confidenza (alto se >15 comparabili, medio se 5-15, basso se <5)
   - Disclaimer legale

### Output esempio
```
STIMA ART CAPITAL

Artista: Alighiero Boetti
Opera: biro su carta, 50x70 cm, 1988

Range stimato: €35.000 — €55.000
Prezzo mediano comparabili: €42.000
Comparabili analizzati: 23
Livello di confidenza: ALTO

Trend: +12% rispetto a 3 anni fa

Comparabili principali:
1. "Mappa", biro su carta, 48x68 cm, 1989 — €48.000 (Wannenes, mar 2025)
2. "Tutto", biro su carta, 52x72 cm, 1987 — €38.500 (Finarte, nov 2024)
3. "Aerei", biro su carta, 50x70 cm, 1990 — €41.000 (Christie's Milano, giu 2024)

⚠️ Questa è una stima indicativa basata su risultati d'asta pubblici.
Non costituisce una perizia professionale.
```

---

## 5. Frontend — Struttura pagine

```
artcapitaldata.com/
├── /                           # Homepage: ricerca artista + ultimi risultati + newsletter signup
├── /artista/[slug]             # Scheda artista (bio + dati finanziari per tier)
├── /valutatore                 # Valutatore AI (form + risultato)
├── /aste                       # Calendario aste italiane + risultati recenti
├── /aste/[house]/[sale]        # Risultati di una specifica vendita
├── /emergenti                  # Sezione emergenti da tenere d'occhio
├── /newsletter                 # Archivio newsletter + signup
├── /abbonamento                # Piani e pricing
└── /chi-siamo                  # Chi è Art Capital
```

### Tech stack
- **Framework:** Next.js 14.2 (App Router) su Vercel
- **Linguaggio:** TypeScript 5.5
- **Styling:** Tailwind CSS 3.4 con tema custom
- **Grafici:** Recharts 2.12
- **Icone:** Lucide React
- **Database:** Supabase PostgreSQL
- **Auth:** Supabase Auth
- **Pagamenti:** Stripe
- **Newsletter:** Beehiiv (integrazione già attiva)
- **Analytics:** Plausible o PostHog

---

## 6. Frontend — Design System

### Palette colori (definita in tailwind.config.ts)

```
Brand (sfondi):
  brand-950: #0a1929    — sfondo principale
  brand-900: #102a43    — sfondo secondario/card
  brand-800: #243b53    — bordi, separatori
  brand-500: #627d98    — testo secondario
  brand-200: #bcccdc    — testo chiaro

Accento (oro):
  accent-gold:       #C9A84C   — accento primario, CTA, badge
  accent-gold-light: #E8D48B   — hover, highlight
  accent-gold-dark:  #A08530   — pressed, active

Semantici:
  success: #10B981   — trend positivo, venduto
  warning: #F59E0B   — attenzione, dati limitati
  danger:  #EF4444   — trend negativo, invenduto
```

### Tipografia

```
Font display:  'Playfair Display', serif     — titoli, nomi artisti, hero
Font body:     'Inter', sans-serif            — testo, navigazione, UI
Font mono:     'JetBrains Mono', monospace    — prezzi, numeri, dati, tabelle
```

### Componenti UI esistenti

**Header:** Barra navigazione fissa, logo con icona TrendingUp in box oro, menu responsive (hamburger su mobile), CTA "Iscriviti Gratis".

**Footer:** Brand info, link in 4 colonne, social (LinkedIn, Instagram), copyright e disclaimer.

**Card system:** Definito in globals.css:
- `.card` — card base con sfondo brand-900, bordo brand-800, border-radius
- `.card-hover` — card interattiva con transizione e glow oro su hover
- `.badge-buy`, `.badge-hold`, `.badge-caution` — badge stato artista

**Buttons:** `.btn-primary` (sfondo oro, testo scuro), `.btn-secondary` (bordo oro, testo oro)

**Ticker bar:** Nastro scorrevole orizzontale con variazioni prezzo artisti, animazione marquee CSS

**Container:** `.container-ac` — max-width 7xl, padding responsive

### Template schede artista (da costruire)

**Blue Chip template:**
- Hero con nome artista (Playfair Display), nazionalità, anni
- Sezione dati finanziari: 4 card KPI (prezzo mediano, trend, record, bought-in rate)
- Grafico trend prezzo (Recharts, LineChart con area fill oro)
- Tabella risultati d'asta (sortable, filterable per casa d'asta/anno/tecnica)
- Distribuzione prezzi per fascia (BarChart)
- Breakdown per tecnica/dimensione
- Sezione bio/mostre/gallerie sotto i dati

**Mid-Market template:**
- Stesso hero
- Sezione stime: range indicativo con barra visuale (min-mediana-max)
- Risultati d'asta disponibili in tabella
- Nota sulla profondità dati ("Basato su X risultati")
- Bio/mostre/gallerie

**Emergente template:**
- Hero con nome + tag "Emergente da tenere d'occhio"
- Nota curatoriale in evidenza (box con bordo oro)
- Galleria di riferimento
- Timeline mostre/premi/residenze
- Nessun dato finanziario — solo percorso qualitativo

### Pagina Valutatore AI (da costruire)

- Form centrato: 4 campi (artista con autocomplete, tecnica dropdown, dimensioni, anno)
- Bottone "Valuta" con animazione di caricamento
- Output: card risultato con range (barra visuale), comparabili in mini-card, trend, livello confidenza
- Per utenti free: output parziale con blur sui comparabili + CTA upgrade

### Design principles

- Dark mode esclusivo (nessun toggle light/dark)
- Glassmorphism sulle card (backdrop-blur, trasparenze)
- Gradienti oro sottili per sezioni in evidenza
- Transizioni fluide a 300ms
- Mobile-first responsive
- Progressive disclosure: dati premium blurrati con overlay CTA per utenti free

---

## 7. Sicurezza e privacy

- Chiavi Supabase mai esposte nel frontend (solo anon key per read, service key solo server-side)
- Rate limiting sul valutatore AI per utenti free (3 ricerche/mese)
- Dati degli utenti (email, pagamenti) gestiti da Supabase Auth + Stripe, mai in chiaro nel DB
- GDPR compliance: cookie banner, privacy policy, diritto all'oblio
- Nessun dato sensibile nelle URL (parametri di ricerca non loggati)
