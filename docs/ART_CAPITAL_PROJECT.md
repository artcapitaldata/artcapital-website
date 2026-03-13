# ART CAPITAL — Project Overview

## Visione

Art Capital è la piattaforma finanziaria di riferimento per il mercato dell'arte in Italia. Non un clone di Artprice. Una piattaforma verticale sul mercato italiano — le aste che avvengono in Italia, gli artisti che vi transitano (italiani e internazionali), gli operatori che vi lavorano.

Il mercato dell'arte italiano è scoperto. Nessuna piattaforma oggi aggrega i risultati delle case d'asta italiane in modo strutturato, offre analisi per artista, o fornisce strumenti di valutazione basati su dati reali. Artprice copre il mondo ma l'Italia la copre male. Art Capital riempie quel vuoto.

---

## Posizionamento

Art Capital non compete con Artprice sul globale. Compete sulla profondità e qualità della copertura del mercato italiano.

Il perimetro è: tutto ciò che passa in asta in Italia (artisti italiani e internazionali venduti nelle case d'asta italiane) + artisti italiani venduti nelle major internazionali (Christie's, Sotheby's, Phillips, Bonhams).

---

## I tre livelli di copertura artisti

### 1. Blue Chip

Artisti con mercato d'asta consolidato e storico profondo. Italiani (Fontana, Burri, Boetti, Schifano, Castellani, Bonalumi, Manzoni, Cattelan, Pistoletto, Kounellis, Paolini, De Dominicis, Melotti, Dorazio, Vedova, Tancredi, ecc.) e internazionali che transitano regolarmente nelle aste italiane (Picasso, Warhol, Christo, ecc.).

**Contenuto della scheda:**
- Biografia completa
- Percorso espositivo (mostre principali)
- Gallerie di riferimento
- Collezioni pubbliche
- **Layer finanziario completo:**
  - Tutti i risultati d'asta aggregati
  - Trend di prezzo (5 anni, 10 anni)
  - Prezzo mediano per tecnica e fascia dimensionale
  - Percentuale di invenduto (bought-in rate)
  - Record d'asta
  - Distribuzione per fascia di prezzo
  - Confronto con artisti comparabili

**Numero stimato:** 80-150 artisti

### 2. Mid-Market

Artisti mid-career con un mercato che esiste ma non è tracciato bene. Passano nelle case d'asta italiane con risultati tra €5k e €100k. Il segmento più scoperto del mercato — nessuna piattaforma li copre con profondità.

**Contenuto della scheda:**
- Biografia completa
- Percorso espositivo
- Gallerie di riferimento
- **Layer finanziario con stime:**
  - Risultati d'asta disponibili
  - Fascia di prezzo stimata per tecnica e dimensione
  - Trend quando i dati sono sufficienti
  - Indicazione della profondità dati ("basato su X risultati")

**Numero stimato:** 200-400 artisti

### 3. Emergenti da tenere d'occhio

Artisti giovani o in crescita selezionati editorialmente. Non hanno ancora un mercato d'asta significativo ma mostrano segnali: gallerie importanti, mostre istituzionali, premi, residenze, acquisizioni museali.

**Contenuto della scheda:**
- Biografia
- Percorso espositivo
- Galleria di riferimento
- Premi e residenze
- **Nessun dato finanziario** (non disponibile)
- Selezione e commento curatoriale

**Numero stimato:** 100-200 artisti (lista che ruota e si aggiorna)

---

## Prodotto core: Il Valutatore AI

La killer feature di Art Capital. L'utente inserisce i dettagli di un'opera (artista, tecnica, dimensioni, anno) e il sistema restituisce una stima di mercato basata su comparabili reali dal database.

**Output per livello:**
- **Blue Chip:** range preciso con comparabili specifici linkati. Es: "Boetti, biro su carta, 50x70cm, 1988 — range stimato €35.000-55.000 basato su 23 comparabili."
- **Mid-Market:** range indicativo con nota sulla profondità dati. Es: "Basato su 6 comparabili, range indicativo €8.000-15.000."
- **Emergente:** nessuna stima numerica, solo contesto qualitativo su galleria e percorso.

**Disclaimer:** Non è una perizia legale. È una stima di mercato basata su transazioni pubbliche d'asta.

---

## Copertura del mercato

### Case d'asta italiane monitorate
- Finarte
- Wannenes
- Pandolfini
- Il Ponte
- Meeting Art
- Farsetti
- Cambi
- Dorotheum (vendite italiane)
- Capitolium
- Blindarte

### Case d'asta internazionali (per artisti italiani)
- Christie's
- Sotheby's
- Phillips
- Bonhams

### Fiere coperte editorialmente
- Artissima (Torino)
- Miart (Milano)
- Arte Fiera (Bologna)
- Roma Arte in Nuvola
- Flashback (Torino)

---

## Newsletter

Settimanale. Gratuita. Funzione: marketing + voce editoriale del brand.

**Contenuto fisso:**
- Recap delle aste italiane della settimana (cosa è passato, cosa è rimasto invenduto, sorprese)
- Segnalazione aste in arrivo
- Focus su un artista (rotazione tra Blue Chip, Mid-Market, Emergente)
- Un dato / un trend dal database

---

## Identità visiva e frontend

### Design attuale (da mantenere ed evolvere)

Il sito attuale ha un'identità visiva già definita e funzionante. Lo stile è premium, scuro, editoriale — ispirato ai terminali finanziari (Bloomberg) ma con un'eleganza che riflette il mondo dell'arte.

### Palette colori

- **Sfondo principale:** Blu-nero profondo (#0a1929 → #102a43) — trasmette autorevolezza e serietà finanziaria
- **Accento primario:** Oro (#C9A84C) con varianti chiare (#E8D48B) e scure (#A08530) — richiamo al mondo dell'arte e del lusso
- **Testo:** Bianco/grigio chiaro su fondo scuro — alta leggibilità
- **Segnali semantici:** Verde (#10B981) per trend positivi, Rosso (#EF4444) per negativi, Ambra (#F59E0B) per attenzione

### Tipografia

- **Titoli e display:** Playfair Display (serif) — elegante, editoriale, evoca il mondo dell'arte e della stampa di qualità
- **Testo corpo:** Inter (sans-serif) — pulito, moderno, ottima leggibilità su schermo
- **Dati e numeri:** JetBrains Mono (monospace) — precisione, leggibilità per cifre e tabelle

### Elementi di design

- **Dark mode esclusivo** — nessun light mode. Coerente con l'estetica terminale finanziario
- **Effetti glassmorphism** — backdrop blur e trasparenze per le card, crea profondità
- **Gradienti sottili** — accenti oro a bassa opacità per evidenziare sezioni
- **Card-based layout** — ogni unità informativa (artista, risultato, dato) è una card con bordi sottili
- **Transizioni fluide** — hover a 300ms, animazioni morbide
- **Ticker bar** — nastro scorrevole in alto con variazioni di prezzo degli artisti (stile Bloomberg)

### Struttura pagine (attuale + evoluzione)

Pagine già live: Homepage con hero, statistiche, feature cards, newsletter signup, preview database.

Pagine da costruire per il nuovo posizionamento:

- `/artista/[slug]` — Scheda artista con tre template diversi per tier (Blue Chip con grafici Recharts, Mid-Market con stime, Emergente con scheda qualitativa)
- `/valutatore` — Form di input + risultato AI con comparabili. Design: card centrale, form minimal, output strutturato con grafici
- `/aste` — Calendario aste italiane + risultati recenti. Grid di card per vendita, filtri per casa d'asta
- `/aste/[house]/[sale]` — Risultati singola vendita. Tabella lotti con prezzo, stima, esito
- `/emergenti` — Gallery grid con card artista, nota curatoriale, tag galleria
- `/abbonamento` — Pricing page con tre tier (Free / Collector / Professional). Card affiancate con feature list
- `/newsletter` — Archivio uscite + form signup Beehiiv

### Tech stack frontend

- **Framework:** Next.js 14 (App Router) su Vercel
- **Linguaggio:** TypeScript
- **Styling:** Tailwind CSS 3.4 con tema custom Art Capital
- **Grafici:** Recharts per visualizzazioni dati artista (trend prezzo, distribuzione, comparativi)
- **Icone:** Lucide React
- **Responsive:** Mobile-first, breakpoint Tailwind standard

### Principi UX

- **Semplicità:** L'utente deve trovare l'artista o usare il valutatore in massimo 2 click dalla homepage
- **Dati leggibili:** Numeri grandi, grafici chiari, niente tabelle sovraccariche. Un collezionista non tecnico deve capire tutto al primo sguardo
- **Italiano nativo:** Tutta l'interfaccia in italiano. Non una traduzione dall'inglese — pensata in italiano
- **Progressive disclosure:** Scheda base visibile a tutti, dati approfonditi si sbloccano con l'abbonamento (blur + CTA)

---

## Principi guida

1. **Italia-first.** Il perimetro è il mercato italiano (tutte le nazionalità che vi transitano) + artisti italiani nel mondo.
2. **Dati prima delle opinioni.** Ogni affermazione è supportata da dati d'asta reali.
3. **Trasparenza.** Quando i dati sono insufficienti, lo diciamo.
4. **Accessibilità.** UX chiara, in italiano, comprensibile a chi non è un addetto ai lavori.
5. **Crescita organica.** Il database cresce con ogni sessione d'asta monitorata. Ogni utente che usa il valutatore genera domanda che informa le priorità di copertura.
