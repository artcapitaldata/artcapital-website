'use client'

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

interface PriceChartProps {
  data: { year: number; index_value: number; volume?: number | null }[]
}

export default function PriceChart({ data }: PriceChartProps) {
  if (!data.length) {
    return (
      <div className="h-64 flex items-center justify-center text-brand-500">
        Nessun dato disponibile
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334e68" strokeOpacity={0.3} />
        <XAxis
          dataKey="year"
          stroke="#627d98"
          tick={{ fill: '#627d98', fontSize: 12 }}
          tickLine={false}
        />
        <YAxis
          stroke="#627d98"
          tick={{ fill: '#627d98', fontSize: 12 }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#102a43',
            border: '1px solid #334e68',
            borderRadius: '8px',
            color: '#fff',
          }}
          labelStyle={{ color: '#C9A84C' }}
          formatter={(value: number) => [value.toFixed(0), 'Index']}
        />
        <Line
          type="monotone"
          dataKey="index_value"
          stroke="#C9A84C"
          strokeWidth={2.5}
          dot={false}
          activeDot={{ r: 5, fill: '#C9A84C', stroke: '#102a43', strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
