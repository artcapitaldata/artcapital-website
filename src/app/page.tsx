import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import {
  TrendingUp, BarChart3, Newspaper, Bell,
  ArrowRight, ChevronRight, Database, Zap,
  Shield, Globe
} from 'lucide-react'

// Sample data for the market ticker
const TICKER_DATA = [
  { name: 'Basquiat', change: '+12.3%', positive: true },
  { name: 'Cattelan', change: '+8.7%', positive: true },
  { name: 'Koons', change: '-3.2%', positive: false },
  { name: 'Fontana', change: '+5.1%', positive: true },
  { name: 'Hirst', change: '-1.8%', positive: false },
  { name: 'Banksy', change: '+15.6%', positive: true },
  { name: 'Boetti', change: '+9.4%', positive: true },
  { name: 'Kapoor', change: '+2.1%', positive: true },
]

export default function HomePage() {
  return (
    <>
      <Header />

      {/* Market Ticker Bar */}
      <div className="fixed top-16 w-full z-40 bg-brand-900/90 backdrop-blur border-b border-brand-800/30 overflow-hidden">
        <div className="flex items-center h-8 animate-marquee whitespace-nowrap">
          {[...TICKER_DATA, ...TICKER_DATA].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 mx-4 text-xs">
              <span className="text-brand-300 font-medium">{item.name}</span>
              <span className={item.positive ? 'text-emerald-400' : 'text-red-400'}>
                {item.change}
              </span>
            </span>
          ))}
        </div>
      </div>

      <main className="pt-24">
        {/* ===== HERO ===== */}
        <section className="relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-950 via-brand-950 to-brand-900" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent-gold/5 rounded-full blur-3xl" />

          <div className="relative container-ac py-20 md:py-32">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-gold/10 border border-accent-gold/20 text-accent-gold text-xs font-medium mb-6">
                <Zap size={12} />
                Art Market Intelligence — Powered by AI
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.1] tracking-tight mb-6">
                Il Bloomberg
                <br />
                <span className="text-accent-gold">dell&apos;Arte</span>
              </h1>

              <p className="text-lg md:text-xl text-brand-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                Dati di mercato, analisi finanziarie e intelligence per chi investe nell&apos;Arte.
                Ogni artista trattato come un asset. Ogni decisione guidata dai dati.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#newsletter" className="btn-primary text-base px-8 py-3.5 group">
                  Iscriviti alla Newsletter
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#features" className="btn-secondary text-base px-8 py-3.5">
                  Scopri di pi&ugrave;
                </a>
              </div>

              <p className="text-xs text-brand-500 mt-4">
                Gratuita. Ogni settimana nella tua inbox. Cancellati quando vuoi.
              </p>
            </div>

            {/* Stats bar */}
            <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { label: 'Mercato globale aste 2025', value: '$11.1B', sub: '+12% YoY' },
                { label: 'Opere vendute', value: '867K', sub: 'Record storico' },
                { label: 'Case d\'asta monitorate', value: '10+', sub: 'IT + Internazionale' },
                { label: 'Aggiornamento', value: 'Settimanale', sub: 'Newsletter + Dati' },
              ].map((stat, i) => (
                <div key={i} className="card p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white font-mono">{stat.value}</div>
                  <div className="text-xs text-accent-gold mt-1">{stat.sub}</div>
                  <div className="text-xs text-brand-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FEATURES ===== */}
        <section id="features" className="py-20 md:py-28 bg-brand-900/30">
          <div className="container-ac">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                Come funziona
              </h2>
              <p className="text-brand-400 max-w-xl mx-auto">
                Art Capital trasforma il mercato dell&apos;arte in dati azionabili.
                Ogni settimana, tutto quello che devi sapere.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: BarChart3,
                  title: 'Price Index Storico',
                  desc: 'Grafici di performance per ogni artista dal 1990 a oggi. Come un titolo in borsa: vedi salite, discese, volumi e volatilità.',
                },
                {
                  icon: TrendingUp,
                  title: 'Art Performance Index™',
                  desc: 'Score proprietario 0-100 che sintetizza momentum, profondità di mercato, riconoscimento istituzionale e consistenza storica.',
                },
                {
                  icon: Database,
                  title: 'Database Artisti',
                  desc: 'Schede complete: storico aste, metriche, artisti comparabili, mostre in programma. Il tuo terminale Bloomberg per l&apos;Arte.',
                },
                {
                  icon: Newspaper,
                  title: 'Newsletter Settimanale',
                  desc: 'Market Pulse, Deep Dive, Radar, Numeri della Settimana. Tutto in 5 minuti di lettura, nella tua inbox.',
                },
                {
                  icon: Bell,
                  title: 'Alert Personalizzati',
                  desc: 'Monitora i tuoi artisti. Ti avvisiamo quando passano in asta, cambiano score, o fanno notizia.',
                },
                {
                  icon: Shield,
                  title: 'Dati Verificati',
                  desc: 'Risultati d\'asta reali dalle principali case mondiali e italiane. Nessuna stima, solo dati concreti.',
                },
              ].map((feature, i) => (
                <div key={i} className="card-hover p-6">
                  <div className="w-10 h-10 rounded-lg bg-accent-gold/10 flex items-center justify-center mb-4">
                    <feature.icon size={20} className="text-accent-gold" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-brand-400 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== NEWSLETTER SIGNUP */}
        <section id="newsletter" className="py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-900/30 to-brand-950" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent-gold/5 rounded-full blur-3xl" />

          <div className="relative container-ac">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                Non perdere il prossimo numero
              </h2>
              <p className="text-brand-400 mb-8">
                Ogni settimana, i dati che contano sul mercato dell&apos;Arte.
                Gratis. In italiano. Nella tua inbox.
              </p>

              {/* Email Form — connects to Beehiiv */}
              <form
                action="https://artcapitaldata.beehiiv.com/subscribe" /* TODO: update with real Beehiiv URL */
                method="POST"
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="La tua email"
                  className="flex-1 px-4 py-3 rounded-lg bg-brand-800/50 border border-brand-700/50 text-white placeholder:text-brand-500 focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/20 text-sm"
                />
                <button type="submit" className="btn-primary text-sm whitespace-nowrap">
                  Iscriviti Gratis
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </form>

              <p className="text-xs text-brand-600 mt-3">
                Niente spam. Cancellati in un click. I tuoi dati non verranno mai condivisi.
              </p>

              {/* Social proof */}
              <div className="mt-10 flex items-center justify-center gap-6 text-sm text-brand-500">
                <span className="flex items-center gap-1.5">
                  <Globe size={14} className="text-accent-gold" />
                  10+ case d&apos;asta monitorate
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap size={14} className="text-accent-gold" />
                  AI-powered analysis
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ===== COMB�ISG SOON: DATABASE PREVIEW ===== */}
        <section className="py-20 md:py-28 bg-brand-900/30">
          <div className="container-ac">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-800 text-accent-gold text-xs font-medium mb-4">
                  In arrivo
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                  Database Artisti
                </h2>
                <p className="text-brand-400 max-w-xl mx-auto">
                  Ogni artista come un asset. Performance storiche, score, comparabili, alert.
                  Il primo terminale di market intelligence per l&apos;Arte in Italia.
                </p>
              </div>

              {/* Mock artist card */}
              <div className="card p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-display font-bold text-white">Jean-Michel Basquiat</h3>
                        <p className="text-sm text-brand-400">Americano, 1960-1988 &middot; Neo-Espressionismo</p>
                      </div>
                      <div className="badge-buy">Strong Buy</div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-brand-500">API&trade; Score</div>
                        <div className="text-2xl font-bold font-mono text-emerald-400">87</div>
                      </div>
                      <div>
                        <div className="text-xs text-brand-500">Prezzo Mediano</div>
                        <div className="text-lg font-bold font-mono text-white">$2.4M</div>
                      </div>
                      <div>
                        <div className="text-xs text-brand-500">Sell-Through</div>
                        <div className="text-lg font-bold font-mono text-white">89%</div>
                      </div>
                    </div>

                    {/* Mini chart placeholder */}
                    <div className="h-32 bg-brand-800/30 rounded-lg border border-brand-700/20 flex items-center justify-center">
                      <div className="flex items-end gap-1 h-20">
                        {[40, 45, 38, 52, 48, 65, 58, 72, 68, 75, 82, 78, 85, 90, 87].map((v, i) => (
                          <div
                            key={i}
                            className="w-3 rounded-t bg-gradient-to-t from-accent-gold/60 to-accent-gold"
                            style={{ height: `${v}%` }}
                          />
                        ))}
                      </div>
                      <span className="ml-3 text-xs text-brand-500">2010 → 2025</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-center text-sm text-brand-500 mt-6">
                Iscriviti alla newsletter per essere tra i primi ad accedere al database.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Marquee animation */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </>
  )
}
