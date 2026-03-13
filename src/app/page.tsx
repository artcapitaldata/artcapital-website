import { ArrowRight } from 'lucide-react';
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
                <span className="w-1 h-1 bg-accent rotate-45 ml-2 opacity-40" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Masthead */}
      <section className="container-ac pt-16 md:pt-24">
        <div className="text-center pb-12 md:pb-16">
          <p className="section-label mb-5">Art Market Intelligence</p>
          <h1 className="font-display font-normal text-text-primary leading-none tracking-tight text-6xl md:text-7xl lg:text-[6.5rem]">
            Art Capital
          </h1>
          {/* Gold accent line under title */}
          <div className="flex justify-center mt-5">
            <div className="w-12 h-[2px] bg-accent" />
          </div>
          <p className="text-lg text-text-secondary mt-5 max-w-md mx-auto leading-relaxed">
            Dati, analisi e indici di performance per investitori e collezionisti nel mercato dell&apos;arte contemporanea.
          </p>
          <div className="flex gap-4 justify-center mt-10">
            <Link href="/artisti" className="btn-primary gap-2">
              Esplora il Database <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/newsletter" className="btn-secondary">
              Newsletter
            </Link>
          </div>
        </div>
      </section>

      {/* Key Numbers */}
      <section className="border-y border-border bg-surface">
        <div className="container-ac py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: '$11.1B', label: 'Volume Mercato 2024' },
              { value: '867K', label: 'Opere Vendute' },
              { value: '500+', label: 'Artisti Monitorati' },
              { value: '10+', label: "Case d'Asta" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-mono font-semibold text-text-primary mb-1">{stat.value}</div>
                <div className="text-text-secondary text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diamond separator */}
      <div className="diamond-sep container-ac"><span /></div>

      {/* Two-column editorial: Top Artists + What is Art Capital */}
      <section className="container-ac py-12 md:py-20">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">

          {/* Left: Top Artists ranking */}
          <div className="md:col-span-7">
            <div className="rule-double mb-8" />
            <h2 className="section-label mb-6">Top Artisti per API Score</h2>
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-text-primary">
                  <th className="text-left py-2 text-xs font-semibold text-text-secondary uppercase tracking-wider">Artista</th>
                  <th className="text-right py-2 text-xs font-semibold text-text-secondary uppercase tracking-wider">Score</th>
                  <th className="text-right py-2 text-xs font-semibold text-text-secondary uppercase tracking-wider">Var.</th>
                </tr>
              </thead>
              <tbody>
                {topArtists.map((artist, i) => (
                  <tr key={artist.slug} className={`border-b border-border ${i % 2 === 1 ? 'bg-surface/60' : ''}`}>
                    <td className="py-4 pr-4">
                      <Link href={`/artisti/${artist.slug}`} className="text-text-primary font-medium hover:text-accent transition-colors">
                        {artist.name}
                      </Link>
                    </td>
                    <td className="py-4 text-right">
                      <span className="font-mono font-bold text-accent text-lg">{artist.score}</span>
                    </td>
                    <td className="py-4 text-right">
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

          {/* Right: What is Art Capital */}
          <div className="md:col-span-5">
            <div className="rule-double mb-8" />
            <h2 className="section-label mb-6">La piattaforma</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-text-primary mb-1.5">Art Performance Index</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Punteggio 0–100 calcolato su momentum, profondità di mercato, riconoscimento istituzionale e consistenza dei risultati d&apos;asta.
                </p>
              </div>
              <div className="border-t border-border" />
              <div>
                <h3 className="text-base font-semibold text-text-primary mb-1.5">Price Index</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Indici di prezzo storici normalizzati dal 2000 ad oggi. Grafici finanziari per ogni artista nel database.
                </p>
              </div>
              <div className="border-t border-border" />
              <div>
                <h3 className="text-base font-semibold text-text-primary mb-1.5">Dati Verificati</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Risultati da Christie&apos;s, Sotheby&apos;s, Phillips e le principali case d&apos;asta. Nessun dato inventato.
                </p>
              </div>
              <div className="border-t border-border" />
              <div>
                <h3 className="text-base font-semibold text-text-primary mb-1.5">Alert & Newsletter</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Market Pulse settimanale e notifiche su variazioni di prezzo e cambi di rating nella tua watchlist.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Artist Preview Card */}
      <section className="bg-surface border-y border-border">
        <div className="container-ac py-16 md:py-24">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <h2 className="section-label mb-3">Anteprima</h2>
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
                      <div key={i} className="flex-1 bg-text-primary" style={{ height: `${(v / 1111) * 100}%`, opacity: 0.2, borderRadius: '1px 1px 0 0' }} />
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

      {/* Diamond separator */}
      <div className="diamond-sep container-ac"><span /></div>

      {/* Newsletter CTA */}
      <section className="container-ac py-12 md:py-20">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="section-label mb-4">Newsletter</h2>
          <p className="text-2xl md:text-3xl font-display font-normal text-text-primary mb-4">Art Capital Weekly</p>
          <p className="text-text-secondary mb-10 leading-relaxed">
            Ogni settimana nella tua inbox: analisi di mercato, artisti sotto i riflettori, risultati d&apos;asta e opportunità.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="La tua email"
              className="flex-1 border border-border px-4 py-3 text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-text-primary transition-colors bg-white text-sm"
              style={{ borderRadius: '2px' }}
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Iscriviti Gratis
            </button>
          </form>
          <p className="text-text-secondary text-xs mt-4">Niente spam. Cancellati quando vuoi.</p>
        </div>
      </section>
    </main>
  );
}
