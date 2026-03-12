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
    summary: 'L\'opera "Comedian" di Cattelan venduta per $6.2M da Sotheby\'s ha riacceso il dibattito sul valore nell\'arte contemporanea. Analizziamo l\'impatto sul suo API Score e sul mercato.',
    isPremium: false,
  },
  {
    number: 11,
    title: 'Report Trimestrale Q4 2024: i numeri del mercato',
    slug: 'report-q4-2024',
    publishedAt: '2025-02-28',
    summary: 'Il mercato dell\'arte ha chiuso il 2024 con un volume di $11.1B. Christie\'s in testa con $4.1B, seguita da Sotheby\'s. Ecco i trend principali.',
    isPremium: true,
  },
  {
    number: 10,
    title: 'Ghenie supera quota 80: cosa significa Strong Buy',
    slug: 'ghenie-strong-buy',
    publishedAt: '2025-02-21',
    summary: 'Adrian Ghenie è entrato nella fascia "Strong Buy" con un API Score di 80. Momentum a +22.1%. Analizziamo i fattori dietro l\'ascesa del pittore rumeno.',
    isPremium: false,
  },
  {
    number: 9,
    title: 'Nara vs KAWS: due traiettorie opposte',
    slug: 'nara-vs-kaws',
    publishedAt: '2025-02-14',
    summary: 'Mentre Yoshitomo Nara consolida il suo mercato (+9.6%), KAWS perde terreno (-4.5%). Un\'analisi comparata di due artisti Neo-Pop a confronto.',
    isPremium: false,
  },
  {
    number: 8,
    title: 'Fontana: i tagli valgono ancora?',
    slug: 'fontana-tagli-2025',
    publishedAt: '2025-02-07',
    summary: 'Con un API Score di 82 e un trend in crescita (+8.2%), Fontana resta uno dei pilastri del mercato italiano. Deep dive sui Concetti Spaziali.',
    isPremium: true,
  },
  {
    number: 7,
    title: 'Basquiat a quota 87: re del mercato contemporaneo',
    slug: 'basquiat-re-mercato',
    publishedAt: '2025-01-31',
    summary: 'Jean-Michel Basquiat domina il nostro ranking con un API Score di 87 (Strong Buy). Il momentum a 92 riflette un 2024 record con vendite sopra i $300M.',
    isPremium: false,
  },
]

export default function NewsletterPage() {
  return (
    <main className="min-h-screen py-10 px-5">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-3">Art Capital Weekly</h1>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Ogni settimana: analisi di mercato, deep dive su artisti, risultati d&apos;asta e opportunit&agrave;.
          </p>
        </div>

        {/* Subscribe CTA */}
        <div className="bg-surface border border-border rounded p-8 mb-12 text-center">
          <h2 className="text-xl font-display font-semibold text-text-primary mb-2">Iscriviti alla Newsletter</h2>
          <p className="text-text-secondary text-sm mb-5">Gratis. Niente spam. Cancellati quando vuoi.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="La tua email"
              className="flex-1 border border-border rounded px-4 py-3 text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:border-text-primary bg-white transition-colors"
            />
            <button type="submit" className="btn-primary px-6 py-3 whitespace-nowrap">
              Iscriviti Gratis
            </button>
          </form>
        </div>

        {/* Archive */}
        <h2 className="text-xs font-semibold text-text-primary mb-5 uppercase tracking-wider">Archivio</h2>
        <div className="border border-border rounded divide-y divide-border">
          {DEMO_ISSUES.map((issue) => (
            <div key={issue.number} className="p-5 hover:bg-surface/50 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-mono text-text-secondary">#{issue.number}</span>
                    <span className="text-xs text-text-secondary">{new Date(issue.publishedAt).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    {issue.isPremium && (
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded text-accent font-semibold" style={{ backgroundColor: 'rgba(201, 168, 76, 0.1)' }}>
                        <Lock className="w-3 h-3" /> Premium
                      </span>
                    )}
                  </div>
                  <h3 className="text-text-primary font-semibold mb-1">{issue.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{issue.summary}</p>
                </div>
                <Link href="#" className="shrink-0 p-2 rounded hover:bg-surface transition-colors">
                  <ArrowRight className="w-4 h-4 text-text-secondary" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
