import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { PriceHistoryPoint } from '../types';

export function PriceTrendChart({ data }: { data: PriceHistoryPoint[] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="priceFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#437A32" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#437A32" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#EFEDE5" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: '#2B2A2499' }}
            tickFormatter={(v) => new Date(v).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
            axisLine={false}
            tickLine={false}
            minTickGap={30}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#2B2A2499' }}
            axisLine={false}
            tickLine={false}
            width={55}
            domain={['dataMin - 50', 'dataMax + 50']}
          />
          <Tooltip
            formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Price']}
            labelFormatter={(v) => new Date(v).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            contentStyle={{ borderRadius: 10, border: '1px solid #EFEDE5', fontSize: 13 }}
          />
          <Area type="monotone" dataKey="price" stroke="#437A32" strokeWidth={2} fill="url(#priceFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
