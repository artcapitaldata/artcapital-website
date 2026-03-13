# ART CAPITAL — Specifica Tecnica v2

---

## 1. Architettura

Art Capital v2 è un progetto leggero: un sito statico + una newsletter. Niente database, niente backend, niente scraper.

```
[Sito: Next.js su Vercel]  ←→  [Newsletter: Substack o Beehiiv]
        |
        v
[Contenuti: file MDX nel repo GitHub]
```

Il sito è essenzialmente un sito statico con contenuti gestiti come file Markdown (MDX) nel repository GitHub. L'AI (Claude) scrive i contenuti, Sebastiano li rivede e approva, il deploy è automatico via Vercel.

---

## 2. Tech stack

| Componente | Tecnologia | Costo |
|------------|-----------|-------|
| Framework | Next.js 14 (App Router) | €0 |
| Hosting | Vercel (tier gratuito) | €0 |
| Linguaggio | TypeScript | €0 |
| Styling | Tailwind CSS 3.4 con tema custom | €0 |
| Repository | GitHub (sebastianofurlotti/artcapitaldata.com) | €0 |
| Newsletter | Substack o Beehiiv (tier gratuito) | €0 |
| Dominio | artcapitaldata.com (già acquistato) | già pagato |
| Icone | Lucide React | €0 |

**Non servono:** Supabase, PostgreSQL, Stripe, Auth, scraper, cron job, API esterne.

---

## 3. Struttura del sito

```
artcapitaldata.com/
├── /                    # Homepage
├── /newsletter          # Archivio uscite + signup
├── /emergenti           # Gallery artisti emergenti segnalati
├── /emergenti/[slug]    # Scheda singolo artista emergente
└── /chi-siamo           # Chi è Art Capital
```

### Homepage (`/`)
- Hero con headline e value proposition
- Form iscrizione newsletter (embed Substack/Beehiiv)
- Anteprima ultime 3 uscite della newsletter
- Sezione "Emergenti in evidenza" (3-4 card artista)
- Statistiche chiave animate (numero artisti coperti, uscite pubblicate)

### Archivio Newsletter (`/newsletter`)
- Lista cronologica di tutte le uscite
- Ogni uscita: titolo, data, abstract, link alla versione completa su Substack/Beehiiv
- Form signup in evidenza

### Emergenti (`/emergenti`)
- Grid di card artista con: nome, foto/opera, galleria, nota breve
- Filtri opzionali: tecnica, città, galleria
- Ogni card linka alla scheda artista

### Scheda Artista Emergente (`/emergenti/[slug]`)
- Nome, anni, nazionalità
- Nota curatoriale (perché è da tenere d'occhio)
- Galleria di riferimento
- Mostre principali, premi, residenze
- Link a risultati d'asta su ValutaOpere/ArsValue (se esistono)
- **Nessun dato finanziario proprietario** — solo link esterni

### Chi Siamo (`/chi-siamo`)
- Presentazione Art Capital
- Chi è Sebastiano (bio, credenziali)
- Perché questa newsletter esiste

---

## 4. Gestione contenuti

I contenuti del sito sono file MDX nel repository GitHub.

```
content/
├── newsletter/
│   ├── 2026-03-20-prima-uscita.mdx
│   ├── 2026-03-27-seconda-uscita.mdx
│   └── ...
└── emergenti/
    ├── artista-nome-cognome.mdx
    ├── artista-altro.mdx
    └── ...
```

Ogni file MDX ha un frontmatter con i metadati:

```mdx
---
title: "Chi è [Nome Artista] e perché dovresti seguirlo"
date: 2026-03-20
artist: "Nome Cognome"
birthYear: 1992
gallery: "Galleria Nome, Milano"
technique: "Pittura"
tags: ["emergente", "pittura", "Milano"]
arsvalueUrl: "https://arsvalue.com/..."
valutaopereUrl: "https://valutaopere.it/..."
---

Contenuto della scheda in Markdown...
```

**Workflow di pubblicazione:**
1. Claude scrive la bozza del contenuto (scheda artista o newsletter)
2. Sebastiano rivede, modifica, approva
3. Push su GitHub
4. Vercel fa il deploy automatico

---

## 5. Newsletter — Setup tecnico

### Opzione A: Substack (consigliata per partire)
- Setup gratuito
- Discovery interna (Substack ha un network di lettori)
- Supporto abbonamenti premium integrato
- Embed form iscrizione nel sito Next.js
- Archivio uscite hostato su Substack (linkato dal sito)

### Opzione B: Beehiiv (per crescere)
- Tier gratuito fino a 2.500 iscritti
- Più controllo sul design
- Migliore analytics
- Referral program integrato
- Supporto sponsorizzazioni native

La scelta può essere rimandata. Si parte con Substack per semplicità, si migra a Beehiiv se serve più controllo.

---

## 6. Design system

### Palette colori (tailwind.config.ts)

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
  success: #10B981   — trend positivo
  warning: #F59E0B   — attenzione
  danger:  #EF4444   — trend negativo
```

### Tipografia

```
Font display:  'Playfair Display', serif     — titoli, nomi artisti
Font body:     'Inter', sans-serif            — testo, navigazione
Font mono:     'JetBrains Mono', monospace    — prezzi, numeri
```

### Componenti

- **Header:** Barra fissa, logo Art Capital con icona TrendingUp in box oro, menu responsive, CTA "Iscriviti"
- **Footer:** Brand info, link, social (LinkedIn, Instagram), disclaimer
- **Card artista:** Sfondo brand-900, bordo brand-800, hover con glow oro. Immagine, nome, galleria, nota breve
- **Card newsletter:** Data, titolo, abstract, link "Leggi →"
- **Buttons:** Primary (sfondo oro, testo scuro), Secondary (bordo oro, testo oro)
- **Container:** max-width 7xl, padding responsive

### Principi UX
- Dark mode esclusivo (nessun light mode)
- Glassmorphism sulle card (backdrop-blur, trasparenze)
- Transizioni fluide a 300ms
- Mobile-first responsive
- Semplicità: l'utente deve iscriversi alla newsletter in massimo 1 click dalla homepage

---

## 7. Principio operativo: AI come co-fondatore

Claude (AI) gestisce tutto lo sviluppo tecnico e la produzione di bozze:

**Cosa fa l'AI:**
- Costruisce e mantiene il sito Next.js
- Scrive bozze delle uscite newsletter (recap aste, schede artista)
- Analizza dati da ArsValue/ValutaOpere per estrarre insight
- Crea e aggiorna le schede artisti emergenti
- Gestisce deploy, fix, aggiornamenti tecnici
- SEO: ottimizza contenuti per ricerche Google

**Cosa fa Sebastiano:**
- Definisce la linea editoriale
- Seleziona gli artisti emergenti da coprire
- Rivede e approva ogni contenuto prima della pubblicazione
- Gestisce relazioni (galleristi, operatori, case d'asta)
- È il volto e la voce del brand

**Workflow tipo per una uscita settimanale:**
1. Sebastiano indica il tema / artista della settimana
2. Claude raccoglie dati e scrive la bozza
3. Sebastiano rivede, modifica, approva
4. Pubblicazione su Substack + aggiornamento sito

---

## 8. Roadmap

### Settimana 1-2: Setup
- [ ] Ristrutturare il sito Next.js con le nuove pagine (homepage, newsletter, emergenti, chi siamo)
- [ ] Setup Substack con branding Art Capital
- [ ] Embed form iscrizione nel sito
- [ ] Sebastiano: definire lista primi 10-15 artisti emergenti da coprire

### Settimana 3-4: Contenuti
- [ ] Creare le prime 10-15 schede artisti emergenti
- [ ] Scrivere la prima uscita della newsletter
- [ ] Pubblicare e testare il flusso completo (sito → Substack → email)

### Mese 2-3: Lancio
- [ ] Pubblicazione settimanale regolare
- [ ] Sebastiano promuove via contatti personali e social
- [ ] Espandere a 30+ artisti emergenti
- [ ] Raccogliere feedback dai primi lettori

### Mese 4-6: Crescita
- [ ] Obiettivo 500-1.000 iscritti
- [ ] Valutare introduzione contenuti premium
- [ ] Prima sponsorizzazione (se il pubblico c'è)
- [ ] Valutare se la domanda giustifica feature aggiuntive (valuator, dati strutturati)

### Milestone go/no-go

| Milestone | Deadline | Criterio | Decisione |
|-----------|----------|----------|-----------|
| Prima uscita | Fine settimana 3 | Newsletter inviata, sito live | Se no: semplificare ulteriormente |
| 100 iscritti | Fine mese 2 | Almeno 100 iscritti organici | Se no: rivedere contenuto/promozione |
| 500 iscritti | Fine mese 6 | Crescita costante | Se no: valutare se continuare |
| Prima revenue | Fine mese 9 | Almeno €100 da premium o sponsor | Se no: valutare pivot |

---

## 9. Obblighi legali (GDPR)

Per una newsletter in Italia servono:
1. **Consenso esplicito** — Form con checkbox non pre-selezionata (Substack/Beehiiv lo gestiscono)
2. **Informativa privacy** — Pagina sul sito che spiega quali dati si raccolgono (solo email) e perché
3. **Link disiscrizione** — In ogni email (Substack/Beehiiv lo fanno automaticamente)
4. **Contratto trattamento dati** — Col provider newsletter (incluso nei ToS di Substack/Beehiiv)

Se si usa Substack, il 90% degli obblighi è coperto dalla piattaforma. Serve solo una pagina privacy policy sul sito.
