# Art Capital — Data Methodology & Source of Truth

## Documento di Riferimento

Questo documento è la **fonte di verità** per il funzionamento del sistema dati di Art Capital. Ogni componente (frontend, backend, API, agenti automatici) deve rispettare questa metodologia. Aggiornare questo file prima di modificare la logica di calcolo.

---

## 1. Flusso Dati Generale

```
[Case d'Asta] → [Scraping Automatico] → [auction_results] → [Calcolo Indici] → [price_index + api_scores]
                                              ↓
                                    [Verifica + Fonte URL]
```

Tutto parte dai **risultati d'asta reali**. Non esistono dati inventati nel sistema. Ogni numero mostrato sul sito deve essere tracciabile fino alla sua fonte originale.

---

## 2. Fonti Dati (Data Sources)

### 2.1 Case d'Asta — Fonti Primarie (Scraping)

| Casa d'Asta | URL Base | Priorità | Note |
|---|---|---|---|
| Christie's | christies.com/en/results | P0 | API non-ufficiale disponibile, risultati strutturati |
| Sotheby's | sothebys.com/en/results | P0 | Richiede parsing HTML, dati ben strutturati |
| Phillips | phillips.com/auctions/past | P1 | Focus su arte contemporanea |
| Bonhams | bonhams.com/auctions/results | P1 | Buona copertura arte moderna |
| Artcurial | artcurial.com/en/results | P2 | Focus mercato francese/europeo |
| Dorotheum | dorotheum.com/en/auctions | P2 | Focus mercato centro-europeo |
| Ketterer Kunst | kettererkunst.com | P3 | Mercato tedesco |
| Finarte | finfreak.com | P3 | Mercato italiano |

### 2.2 Aggregatori — Fonti Secondarie (API/Scraping)

| Aggregatore | Uso | Note |
|---|---|---|
| Artnet Price Database | Verifica incrociata | Richiede abbonamento, possibile API |
| Invaluable | Backup dati | API disponibile per partner |
| MutualArt | Dati biografici | Buona copertura artisti emergenti |
| Artsy | Dati mostre + mercato | API pubblica per alcuni dati |

### 2.3 Fonti per Mostre/Exhibition Data

| Fonte | Tipo | Note |
|---|---|---|
| Artsy | API | Lista mostre correnti e passate |
| ArtFacts | Scraping | Ranking artisti basato su mostre |
| Siti musei | Scraping | Mostre specifiche per artista |

---

## 3. Raccolta Dati: auction_results

### 3.1 Struttura Record

Ogni risultato d'asta nel database deve contenere **obbligatoriamente**:

```sql
-- Campi OBBLIGATORI per ogni auction_result
artist_id       -- FK verso artists (l'artista dell'opera)
title           -- Titolo dell'opera (es. "Untitled (Skull)")
auction_house   -- Nome casa d'asta (es. "Christie's")
sale_date       -- Data della vendita (YYYY-MM-DD)
medium          -- Tecnica/medium (es. "Acrylic and oilstick on canvas")
currency        -- Valuta originale (USD, EUR, GBP, CHF, HKD)
sold            -- Boolean: venduto o meno
source_url      -- URL OBBLIGATORIO della pagina del lotto sull'asta

-- Campi raccomandati
sale_name       -- Nome della vendita (es. "Post-War & Contemporary Art Evening Sale")
lot_number      -- Numero del lotto
dimensions      -- Dimensioni (es. "183 x 122 cm")
estimate_low    -- Stima bassa nella valuta originale
estimate_high   -- Stima alta nella valuta originale
hammer_price    -- Prezzo al martello (senza premium)
premium_price   -- Prezzo finale (con buyer's premium)
```

### 3.2 Regole di Raccolta

1. **Ogni record DEVE avere un source_url valido** — link diretto alla pagina del lotto
2. **Nessun dato inventato** — se un campo non è disponibile, è NULL, mai stimato
3. **Valuta originale** — il prezzo è nella valuta dell'asta; la conversione avviene solo per calcoli aggregati
4. **Deduplicazione** — un lotto è unico per (artist_id, auction_house, sale_date, lot_number)
5. **Opere non vendute** — vanno registrate con sold=false, servono per il sell-through rate

### 3.3 Categorizzazione Medium

Per il calcolo corretto degli indici, i medium vanno categorizzati in macro-categorie:

| Macro-categoria | Include |
|---|---|
| painting | Oil on canvas, acrylic, mixed media on canvas, tempera |
| work_on_paper | Watercolor, gouache, pastel, drawing, ink on paper |
| print | Screenprint, lithograph, etching, woodcut |
| sculpture | Bronze, marble, steel, mixed media sculpture, installation |
| photography | C-print, gelatin silver, digital print |
| ceramic | Ceramic, porcelain |
| other | Textile, video, digital art, NFT |

**IMPORTANTE**: Il Price Index va calcolato SEPARATAMENTE per macro-categoria, perché un disegno di Basquiat ha un prezzo molto diverso da un dipinto. L'indice principale è per "painting", con indici secondari per le altre categorie.

### 3.4 Normalizzazione Dimensioni

Le dimensioni influenzano il prezzo. Il sistema deve calcolare:
- **Superficie in cm²** = altezza × larghezza (per opere bidimensionali)
- **Prezzo per cm²** = premium_price / superficie
- Questo permette confronti equi tra opere di dimensioni diverse

---

## 4. Calcolo Price Index

### 4.1 Definizione

Il Price Index misura l'andamento del prezzo di un artista nel tempo, normalizzato a un anno base (= 100). Permette di confrontare l'evoluzione di valore tra artisti diversi.

### 4.2 Formula

Per ogni artista e anno:

```
Price_Index(artista, anno) = (Mediana_Prezzo(artista, anno) / Mediana_Prezzo(artista, anno_base)) × 100
```

Dove:
- **Mediana_Prezzo**: mediana dei premium_price di tutte le opere vendute (sold=true) nell'anno
- **Anno base**: il primo anno con almeno 5 vendite per l'artista

### 4.3 Campi Calcolati per price_index

```sql
median_price        -- Mediana dei premium_price dell'anno
avg_price           -- Media dei premium_price dell'anno
index_value         -- Indice normalizzato (anno base = 100)
volume              -- Numero di opere vendute nell'anno
total_offered       -- Numero totale di opere offerte (vendute + invendute)
sell_through_rate   -- (volume / total_offered) × 100
avg_estimate_ratio  -- Media di (premium_price / estimate_mid) per le opere vendute
volatility          -- Deviazione standard dei prezzi / media × 100 (coefficiente di variazione)
```

### 4.4 Filtri per il Calcolo

- **Solo opere vendute** (sold=true) per i prezzi
- **Tutte le opere** (vendute + invendute) per sell_through_rate
- **Per macro-categoria medium**: indice principale = "painting", poi indici per categoria
- **Outlier removal**: escludere il top/bottom 5% per mediana robusta
- **Minimo 3 vendite/anno** per calcolare un indice affidabile; altrimenti marcare come "dati insufficienti"

### 4.5 Conversione Valute

Per aggregare vendite in valute diverse:
- Usare il tasso di cambio del giorno della vendita (sale_date)
- Valuta di riferimento: **USD**
- Fonte tassi: ECB (European Central Bank) API o exchangerate.host

---

## 5. Calcolo API Score (Art Performance Index™)

### 5.1 Definizione

L'API Score è un punteggio da 0 a 100 che sintetizza la performance di mercato di un artista. È composto da 4 sotto-indici.

### 5.2 Formula

```
API_Score = (Momentum × 0.35) + (Market_Depth × 0.25) + (Recognition × 0.20) + (Consistency × 0.20)
```

### 5.3 Sotto-indici

#### Momentum (peso: 35%)
Misura la tendenza recente del mercato.

```
Momentum = normalizza_0_100(
  (variazione_prezzo_12_mesi × 0.4) +
  (variazione_prezzo_36_mesi × 0.3) +
  (variazione_volume_12_mesi × 0.2) +
  (variazione_sell_through_12_mesi × 0.1)
)
```

#### Market Depth (peso: 25%)
Misura la liquidità e la profondità del mercato.

```
Market_Depth = normalizza_0_100(
  (volume_annuo × 0.3) +
  (numero_case_asta_attive × 0.25) +
  (spread_stima_prezzo × 0.25) +
  (diversita_geografica_vendite × 0.2)
)
```

#### Recognition (peso: 20%)
Misura il riconoscimento istituzionale.

```
Recognition = normalizza_0_100(
  (mostre_museo_ultimi_5_anni × 0.35) +
  (mostre_solo_vs_group × 0.25) +
  (livello_musei × 0.25) +
  (presenza_collezioni_pubbliche × 0.15)
)
```

#### Consistency (peso: 20%)
Misura la stabilità e prevedibilità del mercato.

```
Consistency = normalizza_0_100(
  (100 - volatility_prezzo × 0.4) +
  (stabilita_sell_through × 0.3) +
  (continuita_presenza_asta × 0.2) +
  (rapporto_estimate_realizzo × 0.1)
)
```

### 5.4 Rating

| Score | Rating |
|---|---|
| 80-100 | Strong Buy |
| 60-79 | Buy |
| 40-59 | Hold |
| 20-39 | Sell |
| 0-19 | Strong Sell |

### 5.5 Frequenza di Calcolo

- **Ricalcolo**: dopo ogni nuova asta major (settimanale durante le season, mensile altrimenti)
- **Storico**: mantenere TUTTI i calcoli passati in api_scores (con calculated_at)
- L'ultimo score è quello mostrato sul sito

---

## 6. Scraping Automatico

### 6.1 Architettura

```
[Cron Job / Scheduled Task]
    ↓
[Scraper per casa d'asta]  -- uno script per ogni fonte
    ↓
[Parser + Normalizzazione]  -- estrae i campi standard
    ↓
[Deduplicazione]  -- verifica se il record esiste già
    ↓
[INSERT in auction_results]  -- con source_url obbligatorio
    ↓
[Trigger ricalcolo indici]  -- aggiorna price_index e api_scores
```

### 6.2 Frequenza Scraping

| Fonte | Frequenza | Periodo |
|---|---|---|
| Christie's | Giornaliero | Durante season (mag-giu, nov-dic) |
| Sotheby's | Giornaliero | Durante season |
| Phillips | Settimanale | Tutto l'anno |
| Altre | Settimanale | Tutto l'anno |

### 6.3 Gestione Errori

- Se uno scraper fallisce, loggare l'errore e riprovare al prossimo ciclo
- Mai sovrascrivere dati esistenti con dati parziali
- Alert se il volume dati cala improvvisamente (possibile cambio struttura sito)

---

## 7. Consultazione Dati sul Sito

### 7.1 Pagina Artista — Dati Visibili

- **Price Index chart**: grafico storico con possibilità di filtrare per categoria medium
- **Auction Results**: tabella con TUTTI i risultati d'asta, ordinabili per data/prezzo/casa d'asta
- **Fonte**: ogni risultato d'asta mostra un link cliccabile alla fonte originale (source_url)
- **API Score**: score attuale con breakdown dei 4 sotto-indici + grafico storico dello score
- **Exhibitions**: lista mostre con link alla fonte

### 7.2 Trasparenza

- Ogni dato numerico sul sito deve essere cliccabile/espandibile per mostrare la fonte
- La metodologia di calcolo deve essere accessibile da una pagina pubblica "/metodologia"
- I dati raw (risultati d'asta) sono consultabili dagli utenti premium

---

## 8. API per Agenti Automatici

### 8.1 Endpoint REST

Tutte le API devono essere progettate per essere consumate sia dal frontend che da agenti automatici.

```
GET /api/artists                       -- Lista artisti con filtri
GET /api/artists/{slug}                -- Dettaglio artista
GET /api/artists/{slug}/auctions       -- Risultati d'asta con paginazione
GET /api/artists/{slug}/price-index    -- Price index storico
GET /api/artists/{slug}/api-score      -- Score attuale + storico
GET /api/artists/{slug}/exhibitions    -- Mostre

POST /api/auctions/import              -- Importa risultati d'asta (per scraper)
POST /api/indexes/recalculate          -- Ricalcola indici per un artista
POST /api/scores/recalculate           -- Ricalcola API score per un artista
```

### 8.2 Formato Risposta Standard

```json
{
  "data": { ... },
  "meta": {
    "source": "auction_results",
    "last_updated": "2025-03-12T10:30:00Z",
    "methodology_version": "1.0",
    "total_records": 150,
    "filters_applied": { "medium": "painting", "year_from": 2020 }
  }
}
```

### 8.3 Webhook per Agenti

```
POST /api/webhooks/new-auction-data    -- Notifica quando nuovi dati sono disponibili
POST /api/webhooks/score-changed       -- Notifica quando uno score cambia significativamente
```

---

## 9. Regole per Claude Code e Agenti

1. **MAI inventare dati d'asta** — se non ci sono dati reali, il campo è NULL o la pagina mostra "Dati non disponibili"
2. **MAI calcolare indici senza almeno 3 data points** — mostrare "Dati insufficienti" invece di un numero inaffidabile
3. **SEMPRE includere source_url** — nessun risultato d'asta senza link alla fonte
4. **SEMPRE mantenere la valuta originale** — le conversioni sono solo per i calcoli aggregati
5. **SEMPRE loggare le modifiche** — chi ha cambiato cosa e quando
6. **Il Price Index è PER CATEGORIA medium** — mai mischiare pitture con stampe nell'indice principale
7. **I mock data sono temporanei** — vanno sostituiti con dati reali appena disponibili, e devono essere chiaramente marcati come "demo/mock" nel codice

---

## 10. Versioning

| Versione | Data | Modifiche |
|---|---|---|
| 1.0 | 2025-03-12 | Documento iniziale — metodologia completa |

Ultima modifica: 2025-03-12
Autore: Art Capital Team
