import React from 'react';
import { MapPin, BadgeCheck, Calendar } from 'lucide-react';
import { EnrichedListing } from '../services/marketplaceService';
import { formatDate, formatINR } from '../utils/format';
import { Button } from './Button';
import { Badge } from './Badge';
import { useApp } from '../context/AppContext';

export function ProductCard({
  listing,
  onViewDetails,
  onContact,
}: {
  listing: EnrichedListing;
  onViewDetails: () => void;
  onContact: () => void;
}) {
  const { t } = useApp();
  return (
    <div className="flex flex-col overflow-hidden rounded-card border border-soil-100 bg-white">
      <div
        className="flex h-32 items-center justify-center text-4xl"
        style={{ backgroundColor: `${listing.imageColor}33` }}
      >
        {listing.crop.icon}
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-semibold text-soil-900">{t(listing.crop.name)}</h4>
          <Badge tone="neutral">{t('Grade')} {listing.grade}</Badge>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-soil-900/70">
          {listing.farmerName}
          {listing.verified && <BadgeCheck size={15} className="text-field-600" />}
        </div>
        <div className="flex items-center gap-1 text-xs text-soil-900/50">
          <MapPin size={12} /> {listing.location}, {listing.district}
        </div>
        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="text-lg font-bold text-soil-900">{formatINR(listing.price)}</span>
            <span className="text-xs text-soil-900/50">{listing.priceUnit}</span>
          </div>
          <span className="text-xs text-soil-900/50">
            {listing.quantity} {listing.quantityUnit}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs text-soil-900/40">
          <Calendar size={11} /> {t('Harvested')} {formatDate(listing.harvestDate)}
        </div>
        <div className="mt-1 flex gap-2">
          <Button variant="secondary" size="sm" className="flex-1" onClick={onViewDetails}>
            {t('View Details')}
          </Button>
          <Button variant="primary" size="sm" className="flex-1" onClick={onContact}>
            {t('Contact')}
          </Button>
        </div>
      </div>
    </div>
  );
}
