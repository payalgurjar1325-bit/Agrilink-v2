import React from 'react';
import { MapPin, Truck, TrendingUp, Award } from 'lucide-react';
import { Market } from '../types';
import { formatINR } from '../utils/format';
import { TrendBadge } from './Badge';

interface Props {
  market: Market;
  price: number;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
  distanceKm: number;
  transportCost: number;
  grossRevenue: number;
  netEarnings: number;
  isBest?: boolean;
  reason?: string;
}

export function MarketComparisonCard({
  market,
  price,
  trend,
  changePercent,
  distanceKm,
  transportCost,
  grossRevenue,
  netEarnings,
  isBest,
  reason,
}: Props) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-card border p-5 ${
        isBest ? 'border-field-600 bg-field-50/60 ring-1 ring-field-600' : 'border-soil-100 bg-white'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          {isBest && (
            <span className="mb-1.5 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-field-700">
              <Award size={13} /> Best Market for You
            </span>
          )}
          <h4 className="text-lg font-semibold text-soil-900">{market.name}</h4>
          <span className="flex items-center gap-1 text-xs text-soil-900/50">
            <MapPin size={12} /> {distanceKm} km · {market.district}
          </span>
        </div>
        <TrendBadge trend={trend} changePercent={changePercent} />
      </div>

      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-bold text-soil-900">{formatINR(price)}</span>
        <span className="text-sm text-soil-900/50">/ quintal</span>
      </div>

      <div className="grid grid-cols-2 gap-3 border-t border-soil-100 pt-3 text-sm">
        <div>
          <div className="flex items-center gap-1 text-xs text-soil-900/50">
            <TrendingUp size={12} /> Gross Revenue
          </div>
          <div className="font-medium text-soil-900">{formatINR(grossRevenue)}</div>
        </div>
        <div>
          <div className="flex items-center gap-1 text-xs text-soil-900/50">
            <Truck size={12} /> Transport Cost
          </div>
          <div className="font-medium text-clay-500">− {formatINR(transportCost)}</div>
        </div>
      </div>

      <div className={`rounded-card px-3 py-2.5 ${isBest ? 'bg-field-700 text-white' : 'bg-soil-50'}`}>
        <div className={`text-xs ${isBest ? 'text-field-100' : 'text-soil-900/50'}`}>Estimated Net Earnings</div>
        <div className="text-xl font-bold">{formatINR(netEarnings)}</div>
      </div>

      {reason && <p className="text-xs text-soil-900/60">{reason}</p>}
    </div>
  );
}
