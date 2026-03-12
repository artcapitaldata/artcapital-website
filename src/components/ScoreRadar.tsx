'use client'

import { ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts'

interface ScoreRadarProps {
  momentum: number
  marketDepth: number
  recognition: number
  consistency: number
}

export default function ScoreRadar({ momentum, marketDepth, recognition, consistency }: ScoreRadarProps) {
  const data = [
    { subject: 'Momentum', value: momentum },
    { subject: 'Market Depth', value: marketDepth },
    { subject: 'Recognition', value: recognition },
    { subject: 'Consistency', value: consistency },
  ]

  return (
    <ResponsiveContainer width="100%" height={250}>
      <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
        <PolarGrid stroke="#E5E5E5" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: '#6B6B6B', fontSize: 12 }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={{ fill: '#6B6B6B', fontSize: 10 }}
          axisLine={false}
        />
        <Radar
          name="Score"
          dataKey="value"
          stroke="#C9A84C"
          fill="#C9A84C"
          fillOpacity={0.15}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
