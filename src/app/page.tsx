import { TrendingUp, BarChart3, Database, Mail, Bell, ShieldCheck, ArrowUpRight } from 'lucide-react';
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
  { icon: TrendingUp, title: 'Price Index', description: 'Indici di prezzo storici normalizzati per ogni artista. Visualizza trend dal 2000 ad oggi con grafici interattivi.' },
  { icon: BarChart3, title: 'API Score', description: 'Art Performance Index: punteggio 0-100 basato su momentum, profondita di mercato, riconoscimento e consistenza.' },
  { icon: Database, title: 'Database Artisti', description: 'Oltre 500 artisti contemporanei con dati di vendita, mostre, quotazioni e analisi dettagliate.' },
  { icon: Mail, title: 'Newsletter Settimanale', description: 'Market Pulse ogni settimana: analisi mercato, deep dive su artisti, radar delle opportunita.' },
  { icon: Bell, title: 'Alert Personalizzati', description: 'Ricevi notifiche quando un artista nella tua watchlist supera soglie di prezzo o cambia rating.' },
  { icon: ShieldCheck, title: 'Dati Verificati', description: "Risultati da Christie's, Sotheby's, Phillips e le principali case d'asta mondiali. Dati reali, non stime." },
];

const stats = [
  { value: '$11.1B', label: 'Volume Mercato 2024' },
  { value: '867K', label: 'Opere Vendute' },
  { value: '500+', label: 'Artisti Monitorati' },
  { value: '10+', label: "Case d'Asta" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <div className="bg-brand-950 border-b border-brand-800 overflow-hidden">
        <div className="ticker-wrap">
          <div className="ticker">
            {[...tickerData, ...tickerData].map((item, i) => (
              <span key={i} className="ticker-item inline-flex items-center gap-1 px-4 py-2 text-sm">
                <span className="text-brand-300 font-medium">{item.name}</span>
                <span className={item.direction === 'up' ? 'text-green-400' : 'text-red-400'}>
                  {item.direction === 'up' ? '+' : ''}{item.change}%
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className="relative bg-gradient-to-b from-brand-950 via-brand-900 to-brand-950 py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-accent text-sm font-medium">Live Market Data</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
            Il <span className="text-accent">Bloomberg</span><br />dell&apos;Arte
          </h1>
          <p className="text-xl text-brand-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Market intelligence per il mercato dell&apos;arte contemporanea. Dati, analisi e indici di performance per investitori e collezionisti.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/database" className="btn-primary text-lg px-8 py-3 rounded-lg inline-flex items-center justify-center gap-2">
              Esplora il Database <ArrowUpRight className="w-5 h-5" />
            </Link>
            <Link href="/newsletter" className="btn-secondary text-lg px-8 py-3 rounded-lg inline-flex items-center justify-center">
              Newsletter Gratuita
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-brand-900 border-y border-brand-800 py-8">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-display font-bold text-accent mb-1">{stat.value}</div>
              <div className="text-brand-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-950 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Strumenti Professionali</h2>
            <p className="text-brand-400 text-lg max-w-xl mx-auto">Tutto quello che serve per analizzare il mercato dell&apos;arte con un approccio data-driven.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="card card-hover p-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-brand-400 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-brand-900 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Anteprima Database</h2>
            <p className="text-brand-400 text-lg">Ecco come appare una scheda artista su Art Capital</p>
          </div>
          <div className="max-w-md mx-auto card p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">Jean-Michel Basquiat</h3>
                <p className="text-brand-400 text-sm">Americano, 1960-1988</p>
                <p className="text-brand-500 text-xs mt-1">Neo-Espressionismo, Street Art</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-mono font-bold text-accent">87</div>
                <span className="badge-buy text-xs px-2 py-0.5 rounded">Strong Buy</span>
              </div>
            </div>
            <div className="bg-brand-800/50 rounded-lg p-4 mb-4">
              <div className="text-xs text-brand-500 mb-2">Price Index (2000-2025)</div>
              <div className="flex items-end gap-1 h-16">
                {[100,92,108,172,233,322,400,267,194,289,378,472,667,583,544,611,1000,833,750,611,917,1056,944,1000,1111].map((v, i) => (
                  <div key={i} className="flex-1 bg-accent/60 rounded-t" style={{ height: `${(v / 1111) * 100}%` }} />
                ))}
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[10px] text-brand-600">2000</span>
                <span className="text-[10px] text-brand-600">2025</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-brand-800/30 rounded p-2"><div className="text-brand-500 text-xs">Momentum</div><div className="text-white font-mono">92</div></div>
              <div className="bg-brand-800/30 rounded p-2"><div className="text-brand-500 text-xs">Market Depth</div><div className="text-white font-mono">85</div></div>
              <div className="bg-brand-800/30 rounded p-2"><div className="text-brand-500 text-xs">Recognition</div><div className="text-white font-mono">95</div></div>
              <div className="bg-brand-800/30 rounded p-2"><div className="text-brand-500 text-xs">Consistency</div><div className="text-white font-mono">78</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-950 py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Mail className="w-12 h-12 text-accent mx-auto mb-6" />
          <h2 className="text-3xl font-display font-bold text-white mb-4">Art Capital Weekly</h2>
          <p className="text-brand-400 mb-8 leading-relaxed">
            Ogni settimana nella tua inbox: analisi di mercato, artisti sotto i riflettori, risultati d&apos;asta e opportunita. Gratis.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="La tua email" className="flex-1 bg-brand-800 border border-brand-700 rounded-lg px-4 py-3 text-white placeholder:text-brand-500 focus:outline-none focus:border-accent" />
            <button type="submit" className="btn-primary px-6 py-3 rounded-lg whitespace-nowrap">Iscriviti Gratis</button>
          </form>
          <p className="text-brand-600 text-xs mt-3">Niente spam. Cancellati quando vuoi.</p>
        </div>
      </section>
    </main>
  );
}
