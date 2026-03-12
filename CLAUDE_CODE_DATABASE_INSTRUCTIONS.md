# Art Capital — Istruzioni per Claude Code: Database Supabase

## Contesto del Progetto

Art Capital (artcapitaldata.com) è una piattaforma di market intelligence per il mercato dell'arte.

Il repository del progetto è su GitHub: artcapitaldata/artcapital-website

---

## STEP 1: Creazione Progetto Supabase

Sebastiano deve creare un progetto Supabase:
1. Vai su supabase.com e accedi
2. Clicca "New Project"
3. Organization: "Art Capital", Project name: art-capital, Region: eu-central-1, Free tier
4. Recupera le credenziali da Settings > API: Project URL, anon public key, service_role key

---

## STEP 2: Esecuzione Schema SQL

Esegui il file supabase/schema.sql nel SQL Editor di Supabase. Crea 7 tabelle principali:
artists, auction_results, api_scores, price_index, exhibitions + artist_exhibitions, newsletter_issues, profiles

---

## STEP 3: Seed Data - Artisti Iniziali (20 artisti)

Esegui questo SQL dopo aver creato le tabelle:

INSERT INTO artists (name, slug, nationality, birth_year, death_year, medium, movement, bio) VALUES
('Lucio Fontana', 'lucio-fontana', 'Argentino-Italiano', 1899, 1968, ARRAY['Pittura','Scultura','Ceramica'], ARRAY['Spazialismo','Arte Informale'], 'Fondatore dello Spazialismo.'),
('Alighiero Boetti', 'alighiero-boetti', 'Italiano', 1940, 1994, ARRAY['Ricamo','Disegno','Mixed Media'], ARRAY['Arte Povera','Arte Concettuale'], 'Figura chiave Arte Povera.'),
('Maurizio Cattelan', 'maurizio-cattelan', 'Italiano', 1960, NULL, ARRAY['Scultura','Installazione'], ARRAY['Arte Contemporanea','Neo-Concettualismo'], 'Artista provocatore.'),
('Giorgio Morandi', 'giorgio-morandi', 'Italiano', 1890, 1964, ARRAY['Pittura','Incisione'], ARRAY['Metafisica','Modernismo'], 'Maestro della natura morta.'),
('Piero Manzoni', 'piero-manzoni', 'Italiano', 1933, 1963, ARRAY['Mixed Media','Performance'], ARRAY['Arte Concettuale','Neo-Avanguardia'], 'Pioniere arte concettuale italiana.'),
('Enrico Castellani', 'enrico-castellani', 'Italiano', 1930, 2017, ARRAY['Pittura','Scultura'], ARRAY['ZERO','Arte Cinetica'], 'Maestro delle superfici estroflesse.'),
('Rudolf Stingel', 'rudolf-stingel', 'Italiano', 1956, NULL, ARRAY['Pittura','Installazione'], ARRAY['Arte Contemporanea'], 'Pittore altoatesino a New York.'),
('Salvo', 'salvo', 'Italiano', 1947, 2015, ARRAY['Pittura'], ARRAY['Arte Povera','Transavanguardia'], 'Paesaggi luminosi mediterranei.'),
('Jean-Michel Basquiat', 'jean-michel-basquiat', 'Americano', 1960, 1988, ARRAY['Pittura','Disegno'], ARRAY['Neo-Espressionismo','Street Art'], 'Da graffitista a star.'),
('Banksy', 'banksy', 'Britannico', NULL, NULL, ARRAY['Street Art','Stampa','Installazione'], ARRAY['Street Art','Arte Contemporanea'], 'Artista anonimo famoso.'),
('Damien Hirst', 'damien-hirst', 'Britannico', 1965, NULL, ARRAY['Scultura','Installazione','Pittura'], ARRAY['Young British Artists','Arte Contemporanea'], 'Leader degli YBAs.'),
('Jeff Koons', 'jeff-koons', 'Americano', 1955, NULL, ARRAY['Scultura','Pittura'], ARRAY['Neo-Pop','Arte Contemporanea'], 'Re del Neo-Pop.'),
('Gerhard Richter', 'gerhard-richter', 'Tedesco', 1932, NULL, ARRAY['Pittura'], ARRAY['Arte Contemporanea','Fotorealismo'], 'Il piu grande pittore vivente.'),
('Yoshitomo Nara', 'yoshitomo-nara', 'Giapponese', 1959, NULL, ARRAY['Pittura','Scultura','Disegno'], ARRAY['Neo-Pop','Arte Contemporanea'], 'Ritratti di bambini ribelli.'),
('Anish Kapoor', 'anish-kapoor', 'Britannico-Indiano', 1954, NULL, ARRAY['Scultura','Installazione'], ARRAY['Arte Contemporanea'], 'Sculture monumentali.'),
('KAWS', 'kaws', 'Americano', 1974, NULL, ARRAY['Scultura','Pittura','Toy Art'], ARRAY['Neo-Pop','Street Art'], 'Brian Donnelly aka KAWS.'),
('Cecily Brown', 'cecily-brown', 'Britannica', 1969, NULL, ARRAY['Pittura'], ARRAY['Arte Contemporanea','Neo-Espressionismo'], 'Astrazione gestuale e figurazione.'),
('George Condo', 'george-condo', 'Americano', 1957, NULL, ARRAY['Pittura','Scultura','Disegno'], ARRAY['Arte Contemporanea','Espressionismo'], 'Cubismo Artificiale.'),
('Adrian Ghenie', 'adrian-ghenie', 'Rumeno', 1977, NULL, ARRAY['Pittura'], ARRAY['Arte Contemporanea'], 'Pittore figurativo quotato.'),
('Nicolas Party', 'nicolas-party', 'Svizzero', 1980, NULL, ARRAY['Pittura','Scultura','Installazione'], ARRAY['Arte Contemporanea'], 'Pastelli surreali.');

## STEP 4: Price Index Demo (Basquiat) - vedi file completo nel repo

## STEP 5: API Score Demo per Basquiat

INSERT INTO api_scores (artist_id, score, rating, momentum, market_depth, recognition, consistency)
SELECT a.id, 87, 'Strong Buy', 92, 85, 95, 78 FROM artists a WHERE a.slug = 'jean-michel-basquiat';

## STEP 6: Environment Variables

.env.local:
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=https://artcapitaldata.com

Configura anche su Vercel (Settings > Environment Variables).

## Note
- Schema definitivo, eseguire nell'ordine
- RLS essenziale, non rimuovere
- Seed data sono esempi realistici per il lancio

---

## IMPORTANTE: Metodologia Dati

**LEGGI OBBLIGATORIAMENTE** il file `DATA_METHODOLOGY.md` nella root del progetto. È la fonte di verità per:

- Come raccogliere i dati d'asta (auction_results)
- Come calcolare il Price Index (per categoria medium)
- Come calcolare l'API Score (formula con 4 sotto-indici)
- Le fonti dati (case d'asta da scrapare)
- Le API REST da implementare per gli agenti automatici

### Regole Fondamentali (da DATA_METHODOLOGY.md):

1. **MAI inventare dati d'asta** — se non ci sono dati reali, il campo è NULL
2. **MAI calcolare indici senza almeno 3 data points**
3. **SEMPRE includere source_url** — ogni risultato d'asta deve avere il link alla fonte
4. **Il Price Index è PER CATEGORIA medium** — painting, work_on_paper, print, sculpture, photography, ceramic, other
5. **I mock data sono temporanei** — marcali chiaramente come "demo/mock" nel codice
6. **Valuta originale** — i prezzi vanno in valuta dell'asta, conversione solo per aggregati
7. **Deduplicazione** — un lotto è unico per (artist_id, auction_house, sale_date, lot_number)

### Prossimi Step per lo Sviluppo:

1. Implementare gli scraper per Christie's e Sotheby's (priorità P0)
2. Creare le API routes (/api/artists/[slug]/auctions, /api/artists/[slug]/price-index, ecc.)
3. Aggiungere la pagina /metodologia sul sito
4. Mostrare i risultati d'asta reali nelle pagine artista con link source_url
5. Implementare il calcolo automatico degli indici dopo import dati
