import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

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

const features = [
  { title: 'Price Index', description: 'Indici di prezzo storici normalizzati per ogni artista. Trend dal 2000 ad oggi con grafici interattivi.' },
  { title: 'Art Performance Index', description: 'Punteggio 0-100 basato su momentum, profondita di mercato, riconoscimento e consistenza.' },
  { title: 'Database 500+ Artisti', description: 'Artisti contemporanei con dati di vendita, mostre, quotazioni e analisi dettagliate.' },
  { title: 'Newsletter Settimanale', description: 'Market Pulse ogni settimana: analisi mercato, deep dive su artisti, radar delle opportunita.' },
  { title: 'Alert Personalizzati', description: 'Notifiche quando un artista nella tua watchlist supera soglie di prezzo o cambia rating.' },
  { title: 'Dati Verificati', description: "Risultati da Christie's, Sotheby's, Phillips e le principali case d'asta mondiali." },
];

const stats = [
  { value: '$11.1B', label: 'Volume Mercato 2024' },
  { value: '867K', label: 'Opere Vendute' },
  { value: '500+', label: 'Artisti Monitorati' },
  { value: '10+', label: "Case d'Asta" },
];

export default function HomePage() {
  return (
    <main>
      {/* Ticker */}
      <div className="border-b border-border overflow-hidden bg-surface">
        <div className="ticker-wrap">
          <div className="ticker">
            {[...tickerData, ...tickerData].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-4 py-2 text-sm">
                <span className="text-text-primary font-medium">{item.name}</span>
                <span className={item.direction === 'up' ? 'text-positive font-mono' : 'text-negative font-mono'}>
                  {item.direction === 'up' ? '+' : ''}{item.change}%
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="py-20 md:py-28 px-5">
        <div className="max-w-editorial mx-auto">
          <p className="text-sm font-medium text-accent tracking-wider uppercase mb-6">Art Market Intelligence</p>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-text-primary mb-6 leading-[1.1] max-w-3xl">
            Il Bloomberg<br />dell&apos;Arte
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mb-10 leading-relaxed">
            Market intelligence per il mercato dell&apos;arte contemporanea. Dati, analisi e indici di performance per investitori e collezionisti.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/artisti" className="btn-primary text-base px-8 py-3 inline-flex items-center justify-center gap-2">
              Esplora il Database <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link href="/newsletter" className="btn-secondary text-base px-8 py-3 inline-flex items-center justify-center">
              Newsletter Gratuita
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-border py-8 bg-surface">
        <div className="max-w-editorial mx-auto px-5 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-display font-bold text-text-primary mb-1">{stat.value}</div>
              <div className="text-text-secondary text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-5">
        <div className="max-w-editorial mx-auto">
          <div className="mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-3">Strumenti Professionali</h2>
            <p className="text-text-secondary text-lg max-w-xl">Tutto quello che serve per analizzare il mercato dell&apos;arte con un approccio data-driven.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white p-8">
                <h3 className="text-lg font-semibold text-text-primary mb-2">{feature.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artist Preview */}
      <section className="py-20 px-5 bg-surface">
        <div className="max-w-editorial mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-3">Anteprima Database</h2>
            <p className="text-text-secondary text-lg">Ecco come appare una scheda artista su Art Capital</p>
          </div>
          <div className="max-w-md mx-auto card p-6">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="text-xl font-display font-bold text-text-primary">Jean-Michel Basquiat</h3>
                <p className="text-text-secondary text-sm">Americano, 1960–1988</p>
                <p className="text-text-secondary text-xs mt-0.5">Neo-Espressionismo, Street Art</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-mono font-bold text-accent">87</div>
                <span className="badge-buy">Strong Buy</span>
              </div>
            </div>
            <div className="bg-surface rounded p-4 mb-4">
              <div className="text-xs text-text-secondary mb-2">Price Index (2000–2025)</div>
              <div className="flex items-end gap-0.5 h-16">
                {[100,92,108,172,233,322,400,267,194,289,378,472,667,583,544,611,1000,833,750,611,917,1056,944,1000,1111].map((v, i) => (
                  <div key={i} className="flex-1 bg-text-primary/15 rounded-t" style={{ height: `${(v / 1111) * 100}%` }} />
                ))}
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[10px] text-text-secondary">2000</span>
                <span className="text-[10px] text-text-secondary">2025</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-surface rounded p-2.5"><div className="text-text-secondary text-xs">Momentum</div><div className="text-text-primary font-mono font-semibold">92</div></div>
              <div className="bg-surface rounded p-2.5"><div className="text-text-secondary text-xs">Market Depth</div><div className="text-text-primary font-mono font-semibold">85</div></div>
              <div className="bg-surface rounded p-2.5"><div className="text-text-secondary text-xs">Recognition</div><div className="text-text-primary font-mono font-semibold">95</div></div>
              <div className="bg-surface rounded p-2.5"><div className="text-text-secondary text-xs">Consistency</div><div className="text-text-primary font-mono font-semibold">78</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 px-5 border-t border-border">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold text-text-primary mb-3">Art Capital Weekly</h2>
          <p className="text-text-secondary mb-8 leading-relaxed">
            Ogni settimana nella tua inbox: analisi di mercato, artisti sotto i riflettori, risultati d&apos;asta e opportunita. Gratis.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="La tua email"
              className="flex-1 border border-border rounded px-4 py-3 text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:border-text-primary transition-colors bg-white"
            />
            <button type="submit" className="btn-primary px-6 py-3 whitespace-nowrap">
              Iscriviti Gratis
            </button>
          </form>
          <p className="text-text-secondary text-xs mt-3">Niente spam. Cancellati quando vuoi.</p>
        </div>
      </section>
    </main>
  );
}
