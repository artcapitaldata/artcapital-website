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

      {/* Hero — editorial masthead */}
      <section className="container-ac pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-7">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-normal text-text-primary leading-[1.05] mb-8" style={{ letterSpacing: '-0.02em' }}>
              Art Capital
            </h1>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-lg">
              Market intelligence per il mercato dell&apos;arte contemporanea. Dati, analisi e indici di performance per investitori e collezionisti.
            </p>
          </div>
          <div className="md:col-span-5 md:pt-4">
            <div className="space-y-8">
              <div>
                <p className="section-label mb-3">Art Performance Index</p>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Punteggio 0–100 calcolato su momentum, profondità di mercato, riconoscimento istituzionale e consistenza dei risultati d&apos;asta.
                </p>
              </div>
              <div className="rule" />
              <div>
                <p className="section-label mb-3">Database</p>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Oltre 500 artisti con dati verificati da Christie&apos;s, Sotheby&apos;s, Phillips e le principali case d&apos;asta.
                </p>
              </div>
              <div className="rule" />
              <div className="flex gap-4">
                <Link href="/artisti" className="btn-primary gap-2">
                  Esplora il Database <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/newsletter" className="btn-secondary">
                  Newsletter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Numbers */}
      <section className="bg-surface">
        <div className="container-ac py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: '$11.1B', label: 'Volume Mercato 2024' },
              { value: '867K', label: 'Opere Vendute' },
              { value: '500+', label: 'Artisti Monitorati' },
              { value: '10+', label: "Case d'Asta" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-display font-normal text-text-primary mb-1">{stat.value}</div>
                <div className="text-text-secondary text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer — editorial columns, NOT feature cards */}
      <section className="container-ac py-20 md:py-24">
        <div className="rule-thick mb-4" />
        <h2 className="text-3xl md:text-4xl font-display font-normal text-text-primary mb-12">
          Strumenti per decisioni informate
        </h2>
        <div className="grid md:grid-cols-3 gap-0">
          {[
            { title: 'Price Index', text: 'Indici di prezzo storici normalizzati per ogni artista. Visualizza trend dal 2000 ad oggi con grafici finanziari.' },
            { title: 'Art Performance Index', text: 'Score 0–100 che sintetizza momentum di mercato, profondità, riconoscimento e consistenza in un unico numero.' },
            { title: 'Alert & Newsletter', text: 'Market Pulse settimanale e notifiche personalizzate su variazioni di prezzo e cambi di rating nella tua watchlist.' },
          ].map((item, i) => (
            <div key={item.title} className={`py-6 ${i > 0 ? 'md:pl-8 md:border-l md:border-border' : ''}`}>
              <h3 className="text-lg font-display font-normal text-text-primary mb-2">{item.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Artist Preview — editorial card */}
      <section className="bg-surface">
        <div className="container-ac py-20 md:py-24">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <p className="section-label mb-3">Anteprima</p>
              <h2 className="text-3xl md:text-4xl font-display font-normal text-text-primary mb-4">
                Scheda Artista
              </h2>
              <p className="text-text-secondary leading-relaxed mb-8">
                Ogni artista nel database ha una scheda completa con score, breakdown dei fattori, indice di prezzo storico e risultati d&apos;asta verificati.
              </p>
              <Link href="/artisti" className="btn-secondary gap-2 inline-flex">
                Vedi tutti gli artisti <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <div className="card p-8">
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
                <div className="rule mb-5" />
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
                <div className="rule mb-5" />
                <div className="bg-surface p-4" style={{ borderRadius: '2px' }}>
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

      {/* Newsletter CTA */}
      <section className="container-ac py-20 md:py-24">
        <div className="max-w-lg mx-auto text-center">
          <p className="section-label mb-4">Newsletter</p>
          <h2 className="text-3xl md:text-4xl font-display font-normal text-text-primary mb-4">Art Capital Weekly</h2>
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
