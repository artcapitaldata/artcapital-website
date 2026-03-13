import { Check } from 'lucide-react'
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
    <main className="min-h-screen">
      <div className="container-ac py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header — asymmetric */}
          <div className="rule-thick mb-8" />
          <div className="grid md:grid-cols-12 gap-8 mb-14">
            <div className="md:col-span-7">
              <h1 className="text-4xl md:text-5xl font-display font-normal text-text-primary mb-3">Piani e Prezzi</h1>
              <p className="text-text-secondary text-lg leading-relaxed">
                Scegli il piano pi&ugrave; adatto. Upgrade o cancellazione in qualsiasi momento.
              </p>
            </div>
            <div className="md:col-span-5 md:border-l md:border-border md:pl-8 flex items-end">
              <p className="text-text-secondary text-sm">
                Hai domande? Scrivici a{' '}
                <a href="mailto:admin@artcapitaldata.com" className="text-accent hover:underline">
                  admin@artcapitaldata.com
                </a>
              </p>
            </div>
          </div>

          {/* Pricing grid */}
          <div className="grid md:grid-cols-3 gap-0 border border-border" style={{ borderRadius: '2px' }}>
            {tiers.map((tier, i) => (
              <div
                key={tier.name}
                className={`p-8 flex flex-col ${
                  i > 0 ? 'border-t md:border-t-0 md:border-l border-border' : ''
                } ${tier.highlighted ? 'bg-surface relative' : 'bg-white'}`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-[11px] font-semibold px-3 py-1 uppercase tracking-wider" style={{ borderRadius: '2px' }}>
                    Consigliato
                  </div>
                )}
                <h2 className="text-xl font-display font-normal text-text-primary mb-1">{tier.name}</h2>
                <p className="text-text-secondary text-sm mb-6">{tier.description}</p>
                <div className="mb-8">
                  {'priceMonthly' in tier ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-mono font-bold text-text-primary">&euro;{tier.priceMonthly}</span>
                      <span className="text-text-secondary text-sm">/mese</span>
                    </div>
                  ) : (
                    <div className="text-4xl font-mono font-bold text-text-primary">&euro;0</div>
                  )}
                  {'priceYearly' in tier && (
                    <p className="text-text-secondary text-xs mt-1">
                      oppure &euro;{tier.priceYearly}/anno (risparmi {Math.round((1 - tier.priceYearly / (tier.priceMonthly * 12)) * 100)}%)
                    </p>
                  )}
                </div>
                <div className="rule mb-6" />
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span className="text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={tier.highlighted ? 'btn-primary w-full' : 'btn-secondary w-full'}>
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
