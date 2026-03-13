import { ArrowRight, Lock, FileText, TrendingUp, BarChart3 } from 'lucide-react';
import Link from 'next/link';

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

      {/* ── TESTATA ── */}
      <section className="container-ac pt-6 md:pt-8">
        <div className="rule-thick" />

        {/* Titolo giornale — piena larghezza */}
        <div className="py-8 md:py-12 border-b border-border">
          <h1 className="font-display font-normal text-text-primary tracking-tight text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
            Art Capital
          </h1>
          <p className="font-sans font-light text-text-secondary text-base md:text-lg mt-4 tracking-wide">
            Dati, analisi e indici per il mercato dell&apos;arte contemporanea
          </p>
        </div>

        {/* Numeri chiave — barra orizzontale sotto il titolo */}
        <div className="grid grid-cols-2 md:grid-cols-4 py-5 border-b border-border">
          {[
            { value: '$11.1B', label: 'Volume 2024' },
            { value: '867K', label: 'Opere Vendute' },
            { value: '500+', label: 'Artisti' },
            { value: '10+', label: "Case d'Asta" },
          ].map((stat, i) => (
            <div key={stat.label} className={`${i > 0 ? 'md:border-l md:border-border md:pl-6' : ''} ${i >= 2 ? 'mt-4 md:mt-0' : ''}`}>
              <span className="font-mono font-bold text-text-primary text-xl md:text-2xl">{stat.value}</span>
              <span className="text-text-secondary text-xs ml-2">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTENUTO PRINCIPALE — tre colonne editoriali ── */}
      <section className="container-ac py-10 md:py-14">
        <div className="grid md:grid-cols-12 gap-0">

          {/* Colonna 1 — Top Artisti (colonna principale) */}
          <div className="md:col-span-5 md:pr-8 lg:pr-10 md:border-r md:border-border">
            <div className="rule-thick mb-5" />
            <h2 className="section-label mb-4">Top Artisti</h2>
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Artista</th>
                  <th className="text-right py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">API</th>
                  <th className="text-right py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Var.</th>
                </tr>
              </thead>
              <tbody>
                {topArtists.map((artist, i) => (
                  <tr key={artist.slug} className={`border-b border-border ${i % 2 === 1 ? 'bg-surface/60' : ''}`}>
                    <td className="py-3 pr-3">
                      <Link href={`/artisti/${artist.slug}`} className="text-text-primary text-sm font-medium hover:text-accent transition-colors">
                        {artist.name}
                      </Link>
                    </td>
                    <td className="py-3 text-right">
                      <span className="font-mono font-bold text-accent">{artist.score}</span>
                    </td>
                    <td className="py-3 text-right">
                      <span className={`font-mono text-sm font-semibold ${artist.change >= 0 ? 'text-positive' : 'text-negative'}`}>
                        {artist.change >= 0 ? '+' : ''}{artist.change}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link href="/artisti" className="text-sm text-text-secondary hover:text-text-primary transition-colors inline-flex items-center gap-1 mt-4">
              Database completo <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Colonna 2 — Aste recenti + CTA */}
          <div className="md:col-span-4 md:px-8 lg:px-10 md:border-r md:border-border mt-10 md:mt-0">
            <div className="rule-thick mb-5" />
            <h2 className="section-label mb-4">Aste Recenti</h2>
            <div className="divide-y divide-border">
              {recentAuctions.map((auction, i) => (
                <div key={i} className="py-3.5 first:pt-0">
                  <div className="flex items-baseline justify-between gap-3 mb-0.5">
                    <span className="text-text-primary text-sm font-medium">{auction.artist}</span>
                    <span className="font-mono font-bold text-accent text-sm whitespace-nowrap">{auction.price}</span>
                  </div>
                  <p className="text-text-secondary text-xs leading-relaxed">{auction.title}</p>
                  <p className="text-text-secondary text-[11px] mt-0.5">{auction.house} &middot; {auction.date}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex flex-wrap gap-3">
                <Link href="/artisti" className="btn-primary gap-2 text-xs">
                  Esplora il Database <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link href="/pricing" className="btn-secondary text-xs">
                  Piani e Prezzi
                </Link>
              </div>
            </div>
          </div>

          {/* Colonna 3 — Articoli */}
          <div className="md:col-span-3 md:pl-8 lg:pl-10 mt-10 md:mt-0">
            <div className="rule-thick mb-5" />
            <h2 className="section-label mb-4">Ultimi Articoli</h2>
            <div className="divide-y divide-border">
              {[
                { title: 'Cattelan: dopo la banana, il mercato reagisce', date: '7 Mar', tag: 'Analisi' },
                { title: 'Report Q4 2024: i numeri del mercato', date: '28 Feb', tag: 'Report' },
                { title: 'Ghenie supera quota 80', date: '21 Feb', tag: 'Rating' },
              ].map((article) => (
                <div key={article.title} className="py-3.5 first:pt-0">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">{article.tag}</span>
                  <h3 className="text-sm text-text-primary mt-1 leading-snug">{article.title}</h3>
                  <span className="text-text-secondary text-[11px] mt-1 block">{article.date}</span>
                </div>
              ))}
            </div>
            <Link href="/newsletter" className="text-sm text-text-secondary hover:text-text-primary transition-colors inline-flex items-center gap-1 mt-4">
              Archivio <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* ── LA PIATTAFORMA ── */}
      <section className="bg-surface border-y border-border">
        <div className="container-ac py-10 md:py-14">
          <div className="grid md:grid-cols-3 gap-0">
            {[
              { title: 'Art Performance Index', text: 'Score 0\u2013100 calcolato su momentum, profondit\u00e0 di mercato, riconoscimento istituzionale e consistenza dei risultati d\u2019asta.' },
              { title: 'Price Index', text: 'Indici di prezzo storici normalizzati dal 2000 ad oggi. Grafici finanziari per ogni artista nel database.' },
              { title: 'Dati Verificati', text: 'Risultati da Christie\u2019s, Sotheby\u2019s, Phillips e le principali case d\u2019asta. Nessun dato inventato.' },
            ].map((feat, i) => (
              <div key={feat.title} className={`${i > 0 ? 'border-t md:border-t-0 md:border-l md:border-border pt-6 md:pt-0 md:pl-8 lg:pl-10 mt-6 md:mt-0' : ''}`}>
                <h3 className="text-base font-display font-normal text-text-primary mb-2">{feat.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{feat.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESEARCH & REPORT ── */}
      <section>
        <div className="container-ac py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-0">

            {/* Report in evidenza */}
            <div className="md:col-span-7 md:pr-10 lg:pr-14 md:border-r md:border-border">
              <div className="rule-thick mb-5" />
              <h2 className="section-label mb-5">Research &amp; Report</h2>
              <article>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-accent">{reports[0].tag}</span>
                <h3 className="text-2xl md:text-3xl font-display font-normal text-text-primary mt-2 mb-3 leading-snug">
                  {reports[0].title}
                </h3>
                <p className="text-text-secondary leading-relaxed mb-4 max-w-lg">{reports[0].summary}</p>
                <div className="flex items-center gap-4">
                  <Link href="/newsletter" className="text-sm text-text-primary font-medium hover:text-accent transition-colors inline-flex items-center gap-1.5">
                    Leggi il report <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-text-secondary text-xs">{reports[0].date}</span>
                </div>
              </article>
            </div>

            {/* Lista report */}
            <div className="md:col-span-5 md:pl-10 lg:pl-14 mt-10 md:mt-0">
              <div className="rule-thick mb-5" />
              <h2 className="section-label mb-5">Ultimi Report</h2>
              <div className="divide-y divide-border">
                {reports.slice(1).map((report, i) => (
                  <article key={i} className="py-4 first:pt-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <report.icon className="w-3 h-3 text-text-secondary" />
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">{report.tag}</span>
                      {report.isPremium && (
                        <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 font-semibold border" style={{ color: '#C9A84C', borderColor: 'rgba(201, 168, 76, 0.25)', backgroundColor: 'rgba(201, 168, 76, 0.06)', borderRadius: '2px' }}>
                          <Lock className="w-2.5 h-2.5" /> Premium
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-display font-normal text-text-primary mb-1">{report.title}</h4>
                    <p className="text-text-secondary text-xs leading-relaxed">{report.summary}</p>
                  </article>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SCHEDA ARTISTA ── */}
      <section className="bg-surface border-y border-border">
        <div className="container-ac py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-10 md:gap-14">
            <div className="md:col-span-5">
              <div className="rule-thick mb-5" />
              <h2 className="section-label mb-3">Scheda Artista</h2>
              <p className="text-xl md:text-2xl font-display font-normal text-text-primary mb-3 leading-snug">
                Ogni artista, analizzato come un asset finanziario.
              </p>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                Score, breakdown, indice di prezzo storico e risultati d&apos;asta verificati.
              </p>
              <Link href="/artisti/jean-michel-basquiat" className="btn-secondary gap-2 inline-flex text-xs">
                Vedi scheda completa <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <div className="bg-white border border-border p-6 md:p-8" style={{ borderRadius: '4px' }}>
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h3 className="text-xl font-display font-normal text-text-primary">Jean-Michel Basquiat</h3>
                    <p className="text-text-secondary text-xs mt-1">Americano, 1960–1988</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-mono font-bold text-accent leading-none">87</div>
                    <span className="badge-buy mt-1">Strong Buy</span>
                  </div>
                </div>
                <div className="border-t border-border mb-4" />
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {[
                    { label: 'Momentum', value: 92 },
                    { label: 'Depth', value: 85 },
                    { label: 'Recognition', value: 95 },
                    { label: 'Consistency', value: 78 },
                  ].map((m) => (
                    <div key={m.label}>
                      <div className="text-text-secondary text-[10px] uppercase tracking-wider mb-1">{m.label}</div>
                      <div className="text-text-primary font-mono text-lg font-semibold">{m.value}</div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border mb-4" />
                <div className="bg-surface p-3" style={{ borderRadius: '4px' }}>
                  <div className="text-[10px] text-text-secondary uppercase tracking-wider mb-2">Price Index 2000–2025</div>
                  <div className="flex items-end gap-[2px] h-16">
                    {[100,92,108,172,233,322,400,267,194,289,378,472,667,583,544,611,1000,833,750,611,917,1056,944,1000,1111].map((v, i) => (
                      <div key={i} className="flex-1 bg-text-primary" style={{ height: `${(v / 1111) * 100}%`, opacity: 0.15, borderRadius: '1px 1px 0 0' }} />
                    ))}
                  </div>
                  <div className="flex justify-between mt-1.5">
                    <span className="text-[9px] font-mono text-text-secondary">2000</span>
                    <span className="text-[9px] font-mono text-text-secondary">2025</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section>
        <div className="container-ac py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-0">
            <div className="md:col-span-5 md:pr-10 lg:pr-14 md:border-r md:border-border">
              <div className="rule-thick mb-5" />
              <h2 className="font-display font-normal text-text-primary text-2xl mb-2">Art Capital Weekly</h2>
              <p className="text-text-secondary text-sm leading-relaxed">
                Analisi di mercato, artisti sotto i riflettori e risultati d&apos;asta. Ogni settimana nella tua inbox.
              </p>
            </div>
            <div className="md:col-span-5 md:col-start-7 md:pl-10 lg:pl-14 mt-6 md:mt-0 flex items-center">
              <form className="flex gap-2 w-full">
                <input
                  type="email"
                  placeholder="La tua email"
                  className="flex-1 border border-border px-3 py-2.5 text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-text-primary transition-colors bg-white text-sm"
                  style={{ borderRadius: '2px' }}
                />
                <button type="submit" className="btn-primary text-xs py-2.5 px-5 whitespace-nowrap">
                  Iscriviti
                </button>
              </form>
            </div>
          </div>
          <p className="text-text-secondary text-[11px] mt-4">Gratis. Niente spam. Cancellati quando vuoi.</p>
        </div>
      </section>

    </main>
  );
}
