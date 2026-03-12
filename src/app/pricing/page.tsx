import { Check, Star } from 'lucide-react'
import type { Metadata } from 'next'
import { PRICING } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Prezzi',
}

const tiers = [
  {
    ...PRICING.free,
    description: 'Per chi vuole restare informato sul mercato dell\'arte.',
    cta: 'Inizia Gratis',
    highlighted: false,
  },
  {
    ...PRICING.premium,
    description: 'Per collezionisti e appassionati che vogliono dati concreti.',
    cta: 'Scegli Premium',
    highlighted: true,
  },
  {
    ...PRICING.pro,
    description: 'Per professionisti, gallerie e fondi di investimento.',
    cta: 'Scegli Pro',
    highlighted: false,
  },
]

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-brand-950 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">Piani e Prezzi</h1>
          <p className="text-brand-400 text-lg max-w-xl mx-auto">
            Scegli il piano pi&ugrave; adatto alle tue esigenze. Upgrade o cancellazione in qualsiasi momento.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`card p-6 flex flex-col ${
                tier.highlighted
                  ? 'border-accent-gold/50 shadow-lg shadow-accent-gold/10 relative'
                  : ''
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-accent-gold text-brand-950 text-xs font-bold px-3 py-1 rounded-full">
                  <Star className="w-3 h-3" /> Consigliato
                </div>
              )}
              <h2 className="text-xl font-display font-bold text-white mb-2">{tier.name}</h2>
              <p className="text-brand-400 text-sm mb-4">{tier.description}</p>
              <div className="mb-6">
                {'priceMonthly' in tier ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-mono font-bold text-white">
                      &euro;{tier.priceMonthly}
                    </span>
                    <span className="text-brand-500 text-sm">/mese</span>
                  </div>
                ) : (
                  <div className="text-4xl font-mono font-bold text-white">&euro;0</div>
                )}
                {'priceYearly' in tier && (
                  <p className="text-brand-500 text-xs mt-1">
                    oppure &euro;{tier.priceYearly}/anno (risparmi {Math.round((1 - tier.priceYearly / (tier.priceMonthly * 12)) * 100)}%)
                  </p>
                )}
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                    <span className="text-brand-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={
                  tier.highlighted
                    ? 'btn-primary w-full py-3 rounded-lg'
                    : 'btn-secondary w-full py-3 rounded-lg'
                }
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-brand-500 text-sm">
            Hai domande? Scrivici a{' '}
            <a href="mailto:info@artcapitaldata.com" className="text-accent-gold hover:underline">
              info@artcapitaldata.com
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
