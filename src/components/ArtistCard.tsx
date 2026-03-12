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
    <Link href={`/artisti/${slug}`} className="card-hover p-5 flex flex-col gap-3 group">
      <div className="w-full aspect-square bg-surface rounded flex items-center justify-center overflow-hidden border border-border">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <User className="w-10 h-10 text-border" />
        )}
      </div>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-text-primary font-semibold truncate group-hover:text-accent transition-colors">{name}</h3>
          <p className="text-text-secondary text-sm">{nationality}</p>
        </div>
        {score !== null && <ApiScoreBadge score={score} size="sm" />}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {medium.slice(0, 3).map((m) => (
          <span key={m} className="text-xs px-2 py-0.5 rounded bg-surface text-text-secondary border border-border">
            {m}
          </span>
        ))}
      </div>
    </Link>
  )
}
