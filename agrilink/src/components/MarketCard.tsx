import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { Market, Crop, MarketPrice } from '../types';
import { Button } from './Button';

export function MarketCard({
  market,
  bestCrop,
  bestPrice,
  popularCrops,
  onView,
}: {
  market: Market;
  bestCrop: Crop;
  bestPrice: MarketPrice;
  popularCrops: Crop[];
  onView?: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-card border border-soil-100 bg-white p-4">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-semibold text-soil-900">{market.name}</h4>
          <span className="flex items-center gap-1 text-xs text-soil-900/50">
            <MapPin size={12} /> {market.distanceKm} km away
          </span>
        </div>
        <span className="rounded-full bg-field-50 px-2.5 py-1 text-xs font-medium text-field-700">Open</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {popularCrops.map((c) => (
          <span key={c.id} className="rounded-full bg-soil-100 px-2 py-0.5 text-xs text-soil-900/70">
            {c.icon} {c.name}
          </span>
        ))}
      </div>
      <div className="rounded-card bg-field-50 px-3 py-2.5">
        <div className="text-xs text-soil-900/60">Best current opportunity</div>
        <div className="font-semibold text-field-800">
          {bestCrop.name} · ₹{bestPrice.modalPrice.toLocaleString('en-IN')}/{bestCrop.unit}
        </div>
      </div>
      <Button variant="secondary" size="sm" onClick={onView}>
        View Prices <ArrowRight size={14} />
      </Button>
    </div>
  );
}
