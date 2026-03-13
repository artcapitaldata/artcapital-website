# ART CAPITAL — Roadmap Operativa

---

## Fase 0: Ricognizione (Settimana 1-2)

**Obiettivo:** Capire come raccogliere i dati prima di costruire qualsiasi cosa.

### Attività AI (Cowork)
- [ ] Analizzare i siti delle 10 case d'asta italiane target
- [ ] Per ciascuna: documentare come pubblicano i risultati (HTML statico, PDF, SPA, API)
- [ ] Per ciascuna: verificare se hanno archivio storico accessibile e quanto indietro va
- [ ] Per ciascuna: valutare difficoltà di scraping (Tier 1-4)
- [ ] Produrre report di fattibilità con priorità di attacco

### Attività Sebastiano
- [ ] Contattare 2-3 galleristi/operatori: "Se esistesse uno strumento che aggrega tutti i risultati delle aste italiane con analisi per artista, lo useresti? Pagheresti?"
- [ ] Raccogliere feedback grezzo (anche informale, WhatsApp, a voce)

### Output
- Report fattibilità scraping per casa d'asta
- Feedback qualitativo dal mercato (sì/no/forse + commenti)

---

## Fase 1: Database Foundation (Settimana 3-6)

**Obiettivo:** Costruire il database con i primi dati reali.

### Attività AI
- [ ] Sviluppare scraper per le prime 3 case d'asta italiane (partendo dalle più facili)
- [ ] Raccogliere risultati d'asta degli ultimi 3 anni per le case coperte
- [ ] Aggiornare schema database Supabase (nuovi campi, tabelle, viste)
- [ ] Costruire il normalizzatore dati (dimensioni, tecniche, valute, nomi artisti)
- [ ] Collegare i risultati d'asta agli artisti esistenti nel DB (matching)
- [ ] Calcolare le prime statistiche aggregate (vista `artist_market_stats`)

### Attività Sebastiano
- [ ] Definire la lista dei ~100 artisti Blue Chip da coprire per primi
- [ ] Definire la lista dei primi ~50 artisti Mid-Market
- [ ] Identificare i primi 20-30 Emergenti da tenere d'occhio

### Output
- Database con 5.000-15.000 risultati d'asta reali
- 100 artisti Blue Chip con statistiche aggregate
- Scraper funzionanti per 3+ case d'asta

---

## Fase 2: Prodotto MVP (Settimana 7-12)

**Obiettivo:** Sito online con schede artista e valutatore AI funzionante.

### Attività AI
- [ ] Ridisegnare il frontend di artcapitaldata.com con il nuovo posizionamento
- [ ] Costruire le pagine scheda artista (tre template per tier)
- [ ] Implementare il Valutatore AI (form + logica matching + output)
- [ ] Costruire la pagina calendario aste / risultati recenti
- [ ] Implementare la sezione Emergenti
- [ ] Setup autenticazione utenti (Supabase Auth)
- [ ] Setup paywall freemium (Stripe)
- [ ] Espandere scraper alle restanti case d'asta
- [ ] Raccogliere dati storici (obiettivo: 5 anni indietro per le case principali)

### Attività Sebastiano
- [ ] Scrivere le note curatoriali per i primi 20 Emergenti
- [ ] Revisionare 10-20 schede artista Blue Chip (controllo qualità)
- [ ] Definire tono e voce editoriale di Art Capital
- [ ] Preparare la prima newsletter (contenuto)

### Output
- Sito live con schede artista (almeno 200)
- Valutatore AI funzionante per Blue Chip
- Sistema di pagamento attivo
- Prima newsletter inviata

---

## Fase 3: Lancio e crescita (Mese 4-6)

**Obiettivo:** Acquisire i primi utenti paganti e validare il modello.

### Attività AI
- [ ] SEO: ottimizzare schede artista per ricerche Google italiane
- [ ] Newsletter settimanale: preparazione contenuto automatizzata
- [ ] Espandere copertura Mid-Market (obiettivo: 200+ artisti)
- [ ] Migliorare il valutatore AI basandosi sull'uso reale
- [ ] Aggiungere alert personalizzati per artisti seguiti
- [ ] Report premium: costruire template e flusso di generazione
- [ ] Monitoraggio continuo aste (aggiornamento post-vendita)

### Attività Sebastiano
- [ ] Lancio newsletter (promozione via contatti personali, social, word of mouth)
- [ ] Contattare case d'asta per partnership formali
- [ ] Presentare Art Capital a fiere (Miart aprile, Artissima novembre)
- [ ] Raccogliere feedback utenti e iterare
- [ ] Primo outreach verso studi legali e wealth manager

### Output
- 3.000+ iscritti newsletter
- 30-50 abbonati paganti
- 5+ report premium venduti
- 1-2 partnership con case d'asta

---

## Fase 4: Consolidamento (Mese 7-12)

**Obiettivo:** Consolidare la posizione e raggiungere sostenibilità.

### Attività AI
- [ ] Database: 30.000+ risultati d'asta
- [ ] Copertura: 500+ artisti con schede complete
- [ ] Valutatore: migliorare precisione con dataset crescente
- [ ] Nuove feature basate su feedback utenti
- [ ] Automazione completa aggiornamento post-asta

### Attività Sebastiano
- [ ] 100+ abbonati paganti
- [ ] Partnership attive con 3-5 case d'asta
- [ ] Presenza a Artissima come Art Capital
- [ ] Primo revenue da newsletter sponsorizzata
- [ ] Valutare espansione: mercato francese? spagnolo?

### Output
- Revenue mensile: €3.000-5.000
- Brand riconosciuto nel settore italiano
- Database che è un asset difendibile

---

## Milestone di validazione (go/no-go)

| Milestone | Deadline | Criterio | Decisione |
|-----------|----------|----------|-----------|
| Feedback mercato | Fine settimana 2 | Almeno 2 operatori su 3 dicono "sì, lo userei" | Se no: ripensare posizionamento |
| Dati raccoglibili | Fine settimana 4 | Almeno 3 case d'asta scrapabili con dati reali | Se no: valutare partnership dirette |
| MVP live | Fine settimana 12 | Sito online con 200 schede e valutatore | Se no: semplificare scope |
| Primi paganti | Fine mese 6 | Almeno 20 abbonati paganti | Se no: pivot pricing o modello |
| Sostenibilità | Fine mese 12 | Revenue > costi | Se no: valutare modello alternativo |

---

## Dipendenze critiche

1. **Accessibilità dati case d'asta italiane** — Se i siti sono troppo difficili da scrappare o bloccano, tutto si rallenta. La Fase 0 serve esattamente a verificare questo.
2. **Feedback dal mercato** — Se gli operatori dicono "non mi interessa", bisogna capire perché prima di costruire.
3. **Tempo di Sebastiano** — Le attività di business development e validazione sono essenziali e non delegabili all'AI.
