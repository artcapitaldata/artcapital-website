'use client'

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

interface PriceChartProps {
  data: { year: number; index_value: number; volume?: number | null }[]
}

export default function PriceChart({ data }: PriceChartProps) {
  if (!data.length) {
    return (
      <div className="h-64 flex items-center justify-center text-text-secondary">
        Nessun dato disponibile
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
        <XAxis
          dataKey="year"
          stroke="#6B6B6B"
          tick={{ fill: '#6B6B6B', fontSize: 12 }}
          tickLine={false}
        />
        <YAxis
          stroke="#6B6B6B"
          tick={{ fill: '#6B6B6B', fontSize: 12 }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E5E5',
            borderRadius: '4px',
            color: '#1A1A1A',
            fontSize: 13,
          }}
          labelStyle={{ color: '#1A1A1A', fontWeight: 600 }}
          formatter={(value: number) => [value.toFixed(0), 'Index']}
        />
        <Line
          type="monotone"
          dataKey="index_value"
          stroke="#1A1A1A"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: '#1A1A1A', stroke: '#FFFFFF', strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
