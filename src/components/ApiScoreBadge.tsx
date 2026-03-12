import { getApiRating } from '@/types'

interface ApiScoreBadgeProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
}

export default function ApiScoreBadge({ score, size = 'md' }: ApiScoreBadgeProps) {
  const rating = getApiRating(score)

  const badgeClass =
    score >= 60
      ? 'badge-buy'
      : score >= 40
        ? 'badge-hold'
        : 'badge-caution'

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base px-3 py-1',
  }

  return (
    <span className={`${badgeClass} ${sizeClasses[size]}`}>
      <span className="font-mono font-bold mr-1">{score}</span>
      {rating}
    </span>
  )
}
