import React from 'react';
import { MapPin } from 'lucide-react';
import { TrendBadge } from './Badge';
import { Crop, Market, MarketPrice } from '../types';
import { timeAgo } from '../utils/format';
import { useApp } from '../context/AppContext';

export function PriceCard({ crop, price, market }: { crop: Crop; price: MarketPrice; market: Market }) {
  const { language, t } = useApp();
  return (
    <div className="flex min-w-[220px] flex-1 flex-col gap-3 rounded-card border border-soil-100 bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-field-50 text-lg">{crop.icon}</span>
          <div>
            <div className="font-semibold text-soil-900">{crop.name}</div>
            <div className="text-xs text-soil-900/50">{t(crop.category)}</div>
          </div>
        </div>
        <TrendBadge trend={price.trend} changePercent={price.changePercent} />
      </div>
      <div>
        <span className="text-2xl font-bold text-soil-900">₹{price.modalPrice.toLocaleString('en-IN')}</span>
        <span className="ml-1 text-sm text-soil-900/50">/{t(crop.unit)}</span>
      </div>
      <div className="flex items-center justify-between text-xs text-soil-900/50">
        <span className="flex items-center gap-1">
          <MapPin size={12} /> {market.name}
        </span>
        <span>{timeAgo(price.updatedAt, language)}</span>
      </div>
    </div>
  );
}
