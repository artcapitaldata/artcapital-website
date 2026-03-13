import { Lock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Newsletter',
}

const DEMO_ISSUES = [
  {
    number: 12,
    title: 'Cattelan: dopo la banana, il mercato reagisce',
    slug: 'cattelan-banana-mercato',
    publishedAt: '2025-03-07',
    summary: 'L\'opera "Comedian" di Cattelan venduta per $6.2M da Sotheby\'s ha riacceso il dibattito sul valore nell\'arte contemporanea.',
    isPremium: false,
  },
  {
    number: 11,
    title: 'Report Trimestrale Q4 2024: i numeri del mercato',
    slug: 'report-q4-2024',
    publishedAt: '2025-02-28',
    summary: 'Il mercato dell\'arte ha chiuso il 2024 con un volume di $11.1B. Christie\'s in testa con $4.1B.',
    isPremium: true,
  },
  {
    number: 10,
    title: 'Ghenie supera quota 80: cosa significa Strong Buy',
    slug: 'ghenie-strong-buy',
    publishedAt: '2025-02-21',
    summary: 'Adrian Ghenie è entrato nella fascia "Strong Buy" con un API Score di 80. Momentum a +22.1%.',
    isPremium: false,
  },
  {
    number: 9,
    title: 'Nara vs KAWS: due traiettorie opposte',
    slug: 'nara-vs-kaws',
    publishedAt: '2025-02-14',
    summary: 'Mentre Yoshitomo Nara consolida il suo mercato (+9.6%), KAWS perde terreno (-4.5%).',
    isPremium: false,
  },
  {
    number: 8,
    title: 'Fontana: i tagli valgono ancora?',
    slug: 'fontana-tagli-2025',
    publishedAt: '2025-02-07',
    summary: 'Con un API Score di 82 e un trend in crescita (+8.2%), Fontana resta uno dei pilastri del mercato italiano.',
    isPremium: true,
  },
  {
    number: 7,
    title: 'Basquiat a quota 87: re del mercato contemporaneo',
    slug: 'basquiat-re-mercato',
    publishedAt: '2025-01-31',
    summary: 'Basquiat domina il ranking con un API Score di 87. Il momentum a 92 riflette un 2024 record.',
    isPremium: false,
  },
]

export default function NewsletterPage() {
  return (
    <main className="min-h-screen">
      <div className="container-ac py-12 md:py-16">
        {/* Header — asymmetric like WSJ */}
        <div className="rule-thick mb-8" />
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 mb-14">
          <div className="md:col-span-7">
            <h1 className="text-4xl md:text-5xl font-display font-normal text-text-primary mb-3">Art Capital Weekly</h1>
            <p className="text-text-secondary text-lg leading-relaxed max-w-lg">
              Ogni settimana: analisi di mercato, deep dive su artisti, risultati d&apos;asta e opportunit&agrave;.
            </p>
          </div>
          <div className="md:col-span-5 md:border-l md:border-border md:pl-8">
            <p className="section-label mb-3">Iscriviti</p>
            <p className="text-text-secondary text-sm mb-4">Gratis. Niente spam. Cancellati quando vuoi.</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="La tua email"
                className="flex-1 border border-border px-3 py-2.5 text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-text-primary bg-white text-sm"
                style={{ borderRadius: '2px' }}
              />
              <button type="submit" className="btn-primary text-xs py-2.5 px-4 whitespace-nowrap">
                Iscriviti
              </button>
            </form>
          </div>
        </div>

        {/* Archive — editorial list */}
        <div className="rule-thick mb-6" />
        <h2 className="section-label mb-6">Archivio</h2>
        <div className="divide-y divide-border">
          {DEMO_ISSUES.map((issue) => (
            <article key={issue.number} className="grid md:grid-cols-12 gap-4 md:gap-8 py-6 first:pt-0">
              <div className="md:col-span-2">
                <div className="flex md:flex-col items-center md:items-start gap-2 md:gap-1">
                  <span className="text-xs font-mono text-text-secondary">N.{issue.number}</span>
                  <span className="text-xs text-text-secondary">
                    {new Date(issue.publishedAt).toLocaleDateString('it-IT', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  {issue.isPremium && (
                    <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 font-semibold border" style={{ color: '#C9A84C', borderColor: 'rgba(201, 168, 76, 0.25)', backgroundColor: 'rgba(201, 168, 76, 0.06)', borderRadius: '2px' }}>
                      <Lock className="w-2.5 h-2.5" /> Premium
                    </span>
                  )}
                </div>
              </div>
              <div className="md:col-span-9">
                <h3 className="text-lg font-display font-normal text-text-primary mb-1.5">{issue.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{issue.summary}</p>
              </div>
              <div className="md:col-span-1 flex items-start justify-end">
                <Link href="/newsletter" className="text-text-secondary hover:text-text-primary transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
