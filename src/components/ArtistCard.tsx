import Link from 'next/link'
import { User } from 'lucide-react'
import ApiScoreBadge from './ApiScoreBadge'

interface ArtistCardProps {
  name: string
  slug: string
  nationality: string
  medium: string[]
  score: number | null
  imageUrl?: string | null
}

export default function ArtistCard({ name, slug, nationality, medium, score, imageUrl }: ArtistCardProps) {
  return (
    <Link href={`/artisti/${slug}`} className="card card-hover p-5 flex flex-col gap-3 group">
      <div className="w-full aspect-square bg-brand-800/50 rounded-lg flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <User className="w-12 h-12 text-brand-600" />
        )}
      </div>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-white font-semibold truncate group-hover:text-accent-gold transition-colors">{name}</h3>
          <p className="text-brand-400 text-sm">{nationality}</p>
        </div>
        {score !== null && <ApiScoreBadge score={score} size="sm" />}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {medium.slice(0, 3).map((m) => (
          <span key={m} className="text-xs px-2 py-0.5 rounded-full bg-brand-800 text-brand-300 border border-brand-700/50">
            {m}
          </span>
        ))}
      </div>
    </Link>
  )
}
