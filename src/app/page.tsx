import { ArrowRight, Lock, FileText, TrendingUp, BarChart3 } from 'lucide-react';
import Link from 'next/link';

// DEMO — variazioni percentuali placeholder
const tickerData = [
  { name: 'Basquiat', change: 12.4, direction: 'up' },
  { name: 'Fontana', change: 8.2, direction: 'up' },
  { name: 'Banksy', change: -3.1, direction: 'down' },
  { name: 'Koons', change: 5.7, direction: 'up' },
  { name: 'Richter', change: -1.8, direction: 'down' },
  { name: 'Hirst', change: 0.4, direction: 'up' },
  { name: 'Cattelan', change: 15.2, direction: 'up' },
  { name: 'Nara', change: 9.6, direction: 'up' },
  { name: 'KAWS', change: -4.5, direction: 'down' },
  { name: 'Boetti', change: 6.8, direction: 'up' },
  { name: 'Morandi', change: 3.2, direction: 'up' },
  { name: 'Ghenie', change: 22.1, direction: 'up' },
];

// DEMO — top 5 artisti per score placeholder
const topArtists = [
  { name: 'Jean-Michel Basquiat', slug: 'jean-michel-basquiat', score: 87, change: +12.4 },
  { name: 'Gerhard Richter', slug: 'gerhard-richter', score: 85, change: -1.8 },
  { name: 'Lucio Fontana', slug: 'lucio-fontana', score: 82, change: +8.2 },
  { name: 'Adrian Ghenie', slug: 'adrian-ghenie', score: 80, change: +22.1 },
  { name: 'Maurizio Cattelan', slug: 'maurizio-cattelan', score: 78, change: +15.2 },
];

// DEMO — report/research placeholder
const reports = [
  {
    tag: 'Report Trimestrale',
    title: 'Art Market Report Q4 2024',
    summary: 'Volume globale a $11.1B, Christie\'s domina con $4.1B. Analisi dei trend per segmento, fascia di prezzo e area geografica.',
    date: '15 Gen 2025',
    isPremium: false,
    icon: BarChart3,
  },
  {
    tag: 'Deep Dive',
    title: 'Basquiat: anatomia di un mercato da $67M',
    summary: 'Come il mercato di Basquiat si è trasformato dal 2017 ad oggi. Distribuzione per fascia, buyer profile e proiezioni.',
    date: '28 Feb 2025',
    isPremium: true,
    icon: TrendingUp,
  },
  {
    tag: 'Sector Report',
    title: 'Arte Italiana Contemporanea 2025',
    summary: 'Fontana, Cattelan, Boetti: performance a confronto. Il mercato italiano nelle aste internazionali.',
    date: '7 Mar 2025',
    isPremium: true,
    icon: FileText,
  },
];

// DEMO — recent auction highlights placeholder
const recentAuctions = [
  { artist: 'Jean-Michel Basquiat', title: 'El Gran Espectaculo', house: "Christie's", price: '$67.1M', date: 'Nov 2024' },
  { artist: 'Gerhard Richter', title: 'Abstraktes Bild (599)', house: "Sotheby's", price: '$46.3M', date: 'Oct 2024' },
  { artist: 'Maurizio Cattelan', title: 'Comedian', house: "Sotheby's", price: '$6.2M', date: 'Nov 2024' },
];

export default function HomePage() {
  return (
    <main>
      {/* Ticker */}
      <div className="border-b border-border overflow-hidden">
        <div className="ticker-wrap">
          <div className="ticker">
            {[...tickerData, ...tickerData].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-5 py-2 text-[13px]">
                <span className="text-text-primary font-medium">{item.name}</span>
                <span className={`font-mono ${item.direction === 'up' ? 'text-positive' : 'text-negative'}`}>
                  {item.direction === 'up' ? '+' : ''}{item.change}%
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Masthead — WSJ-style asymmetric editorial */}
      <section className="container-ac pt-12 md:pt-16 pb-10 md:pb-14">
        <div className="rule-thick" />
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 pt-8">

          {/* Left column — headline + lead */}
          <div className="md:col-span-7 lg:col-span-8">
            <p className="section-label mb-4">Art Market Intelligence</p>
            <h1 className="font-display font-normal text-text-primary leading-[1.05] tracking-tight text-[2.75rem] md:text-[3.5rem] lg:text-[4.25rem] mb-6">
              Dati, analisi e indici<br className="hidden lg:block" /> per il mercato dell&apos;arte
            </h1>
            <p className="text-text-secondary text-lg leading-relaxed max-w-xl mb-8">
              Art Capital monitora oltre 500 artisti con score proprietari, indici di prezzo e risultati d&apos;asta verificati dalle principali case internazionali.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/artisti" className="btn-primary gap-2">
                Esplora il Database <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/pricing" className="btn-secondary">
                Piani e Prezzi
              </Link>
            </div>
          </div>

          {/* Right column — latest articles */}
          <div className="md:col-span-5 lg:col-span-4 md:border-l md:border-border md:pl-8 lg:pl-12">
            <p className="section-label mb-5">Ultimi Articoli</p>
            <div className="divide-y divide-border">
              {[
                { title: 'Cattelan: dopo la banana, il mercato reagisce', date: '7 Mar 2025', tag: 'Analisi' },
                { title: 'Report Q4 2024: i numeri del mercato', date: '28 Feb 2025', tag: 'Report' },
                { title: 'Ghenie supera quota 80: Strong Buy', date: '21 Feb 2025', tag: 'Rating' },
                { title: 'Nara vs KAWS: due traiettorie opposte', date: '14 Feb 2025', tag: 'Confronto' },
              ].map((article) => (
                <div key={article.title} className="py-4 first:pt-0 last:pb-0">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-accent">{article.tag}</span>
                  <h3 className="text-sm font-medium text-text-primary mt-1 leading-snug">{article.title}</h3>
                  <span className="text-text-secondary text-xs mt-1 block">{article.date}</span>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/newsletter" className="text-sm text-text-secondary hover:text-text-primary transition-colors inline-flex items-center gap-1">
                Tutti gli articoli <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Top Artists ranking + Latest Auctions — newspaper two-column */}
      <section className="border-t border-border">
        <div className="container-ac py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-0">

            {/* Left: Top Artists */}
            <div className="md:col-span-7 md:pr-10 lg:pr-14 md:border-r md:border-border">
              <div className="rule-thick mb-6" />
              <h2 className="section-label mb-5">Top Artisti per API Score</h2>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2.5 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Artista</th>
                    <th className="text-right py-2.5 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Score</th>
                    <th className="text-right py-2.5 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Var. %</th>
                  </tr>
                </thead>
                <tbody>
                  {topArtists.map((artist, i) => (
                    <tr key={artist.slug} className={`border-b border-border ${i % 2 === 1 ? 'bg-surface/60' : ''}`}>
                      <td className="py-3.5 pr-4">
                        <Link href={`/artisti/${artist.slug}`} className="text-text-primary font-medium hover:text-accent transition-colors">
                          {artist.name}
                        </Link>
                      </td>
                      <td className="py-3.5 text-right">
                        <span className="font-mono font-bold text-accent text-lg">{artist.score}</span>
                      </td>
                      <td className="py-3.5 text-right">
                        <span className={`font-mono text-sm font-semibold ${artist.change >= 0 ? 'text-positive' : 'text-negative'}`}>
                          {artist.change >= 0 ? '+' : ''}{artist.change}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4">
                <Link href="/artisti" className="text-sm text-text-secondary hover:text-text-primary transition-colors inline-flex items-center gap-1">
                  Vedi tutti gli artisti <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right: Latest Auctions + Newsletter */}
            <div className="md:col-span-5 md:pl-10 lg:pl-14 mt-10 md:mt-0">
              <div className="rule-thick mb-6" />
              <h2 className="section-label mb-5">Aste Recenti</h2>
              <div className="divide-y divide-border">
                {recentAuctions.map((auction, i) => (
                  <div key={i} className="py-4 first:pt-0">
                    <div className="flex items-baseline justify-between gap-4 mb-1">
                      <span className="text-text-primary font-medium text-sm">{auction.artist}</span>
                      <span className="font-mono font-bold text-accent text-sm whitespace-nowrap">{auction.price}</span>
                    </div>
                    <p className="text-text-secondary text-xs">{auction.title}</p>
                    <p className="text-text-secondary text-xs mt-0.5">{auction.house} &middot; {auction.date}</p>
                  </div>
                ))}
              </div>

              {/* Newsletter inline CTA */}
              <div className="mt-10">
                <div className="rule-thick mb-6" />
                <h3 className="section-label mb-3">Newsletter</h3>
                <p className="text-text-primary font-display text-xl font-normal mb-2">Art Capital Weekly</p>
                <p className="text-text-secondary text-sm leading-relaxed mb-5">
                  Analisi di mercato, artisti sotto i riflettori e risultati d&apos;asta. Ogni settimana.
                </p>
                <form className="flex gap-2">
                  <input
                    type="email"
                    placeholder="La tua email"
                    className="flex-1 border border-border px-3 py-2.5 text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-text-primary transition-colors bg-white text-sm"
                    style={{ borderRadius: '2px' }}
                  />
                  <button type="submit" className="btn-primary text-xs py-2.5 px-4 whitespace-nowrap">
                    Iscriviti
                  </button>
                </form>
                <p className="text-text-secondary text-[11px] mt-2">Gratis. Niente spam.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* La Piattaforma — three features in editorial columns */}
      <section className="bg-surface border-y border-border">
        <div className="container-ac py-12 md:py-16">
          <div className="rule-thick mb-6" />
          <h2 className="section-label mb-8">La Piattaforma</h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div>
              <h3 className="text-lg font-display font-normal text-text-primary mb-2">Art Performance Index</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Score 0–100 calcolato su momentum, profondità di mercato, riconoscimento istituzionale e consistenza dei risultati d&apos;asta.
              </p>
            </div>
            <div className="md:border-l md:border-border md:pl-8">
              <h3 className="text-lg font-display font-normal text-text-primary mb-2">Price Index</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Indici di prezzo storici normalizzati dal 2000 ad oggi. Grafici finanziari per ogni artista nel database.
              </p>
            </div>
            <div className="md:border-l md:border-border md:pl-8">
              <h3 className="text-lg font-display font-normal text-text-primary mb-2">Dati Verificati</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Risultati da Christie&apos;s, Sotheby&apos;s, Phillips e le principali case d&apos;asta. Nessun dato inventato.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Research & Reports */}
      <section>
        <div className="container-ac py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-0">

            {/* Left: featured report */}
            <div className="md:col-span-7 md:pr-10 lg:pr-14 md:border-r md:border-border">
              <div className="rule-thick mb-6" />
              <h2 className="section-label mb-6">Research &amp; Report</h2>
              <article>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-accent">{reports[0].tag}</span>
                  <span className="text-text-secondary text-xs">{reports[0].date}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-normal text-text-primary mb-3 leading-snug">
                  {reports[0].title}
                </h3>
                <p className="text-text-secondary leading-relaxed mb-6 max-w-lg">
                  {reports[0].summary}
                </p>
                <Link href="/newsletter" className="text-sm text-text-primary font-medium hover:text-accent transition-colors inline-flex items-center gap-1.5">
                  Leggi il report <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </article>
            </div>

            {/* Right: report list */}
            <div className="md:col-span-5 md:pl-10 lg:pl-14 mt-10 md:mt-0">
              <div className="rule-thick mb-6" />
              <h2 className="section-label mb-6">Ultimi Report</h2>
              <div className="divide-y divide-border">
                {reports.slice(1).map((report, i) => (
                  <article key={i} className="py-5 first:pt-0">
                    <div className="flex items-center gap-3 mb-2">
                      <report.icon className="w-3.5 h-3.5 text-text-secondary" />
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-accent">{report.tag}</span>
                      {report.isPremium && (
                        <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 font-semibold border" style={{ color: '#C9A84C', borderColor: 'rgba(201, 168, 76, 0.25)', backgroundColor: 'rgba(201, 168, 76, 0.06)', borderRadius: '2px' }}>
                          <Lock className="w-2.5 h-2.5" /> Premium
                        </span>
                      )}
                    </div>
                    <h4 className="text-base font-display font-normal text-text-primary mb-1">{report.title}</h4>
                    <p className="text-text-secondary text-sm leading-relaxed">{report.summary}</p>
                    <span className="text-text-secondary text-xs mt-2 block">{report.date}</span>
                  </article>
                ))}
              </div>
              <div className="mt-5">
                <Link href="/newsletter" className="text-sm text-text-secondary hover:text-text-primary transition-colors inline-flex items-center gap-1">
                  Tutti i report <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Artist Preview — Basquiat card */}
      <section className="bg-surface border-y border-border">
        <div className="container-ac py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-10 md:gap-14">
            <div className="md:col-span-5">
              <div className="rule-thick mb-6" />
              <h2 className="section-label mb-3">Anteprima Scheda</h2>
              <p className="text-2xl md:text-3xl font-display font-normal text-text-primary mb-4 leading-snug">
                Ogni artista, analizzato come un asset finanziario.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                Score, breakdown dei fattori, indice di prezzo storico e risultati d&apos;asta verificati. Tutto in una scheda.
              </p>
              <Link href="/artisti/jean-michel-basquiat" className="btn-secondary gap-2 inline-flex">
                Vedi scheda completa <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <div className="bg-white border border-border p-8" style={{ borderRadius: '4px' }}>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-display font-normal text-text-primary">Jean-Michel Basquiat</h3>
                    <p className="text-text-secondary text-sm mt-1">Americano, 1960–1988</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-mono font-bold text-accent leading-none">87</div>
                    <span className="badge-buy mt-1">Strong Buy</span>
                  </div>
                </div>
                <div className="border-t border-border mb-5" />
                <div className="grid grid-cols-4 gap-4 mb-5">
                  {[
                    { label: 'Momentum', value: 92 },
                    { label: 'Depth', value: 85 },
                    { label: 'Recognition', value: 95 },
                    { label: 'Consistency', value: 78 },
                  ].map((m) => (
                    <div key={m.label}>
                      <div className="text-text-secondary text-[11px] uppercase tracking-wider mb-1">{m.label}</div>
                      <div className="text-text-primary font-mono text-xl font-semibold">{m.value}</div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border mb-5" />
                <div className="bg-surface p-4" style={{ borderRadius: '4px' }}>
                  <div className="text-[11px] text-text-secondary uppercase tracking-wider mb-3">Price Index 2000–2025</div>
                  <div className="flex items-end gap-[2px] h-20">
                    {[100,92,108,172,233,322,400,267,194,289,378,472,667,583,544,611,1000,833,750,611,917,1056,944,1000,1111].map((v, i) => (
                      <div key={i} className="flex-1 bg-text-primary" style={{ height: `${(v / 1111) * 100}%`, opacity: 0.15, borderRadius: '1px 1px 0 0' }} />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-[10px] font-mono text-text-secondary">2000</span>
                    <span className="text-[10px] font-mono text-text-secondary">2025</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
