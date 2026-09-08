import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, BadgeCheck, Calendar, Package } from 'lucide-react';
import { fetchListingById, EnrichedListing } from '../services/marketplaceService';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { LoadingState, Modal } from '../components/Feedback';
import { formatDate, formatINR } from '../utils/format';
import { useApp } from '../context/AppContext';

export default function MarketplaceDetail() {
  const { t } = useApp();
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState<EnrichedListing | null | undefined>(undefined);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchListingById(id).then((l) => setListing(l ?? null));
  }, [id]);

  if (listing === undefined) return <LoadingState label={t('Loading listing...')} />;
  if (listing === null) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h2 className="text-xl font-semibold text-soil-900">{t('Listing not found')}</h2>
        <Link to="/marketplace" className="mt-3 inline-block text-field-700 hover:underline">{t('View Marketplace')}</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <button onClick={() => navigate(-1)} className="mb-5 flex items-center gap-1.5 text-sm font-medium text-soil-900/60 hover:text-field-700">
        <ArrowLeft size={16} /> {t('Back')}
      </button>

      <div className="overflow-hidden rounded-card border border-soil-100 bg-white">
        <div className="flex h-48 items-center justify-center text-7xl" style={{ backgroundColor: `${listing.imageColor}33` }}>
          {listing.crop.icon}
        </div>
        <div className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-semibold text-soil-900">{listing.crop.name}</h1>
              <div className="mt-1 flex items-center gap-1.5 text-sm text-soil-900/70">
                {listing.farmerName}
                {listing.verified && <BadgeCheck size={16} className="text-field-600" />}
              </div>
            </div>
            <Badge tone="neutral">{t('Grade')} {listing.grade}</Badge>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 border-y border-soil-100 py-5 sm:grid-cols-4">
            <div>
              <div className="text-xs text-soil-900/50">{t('Price')}</div>
              <div className="font-semibold text-soil-900">{formatINR(listing.price)}{listing.priceUnit}</div>
            </div>
            <div>
              <div className="text-xs text-soil-900/50">{t('Quantity')}</div>
              <div className="font-semibold text-soil-900">{listing.quantity} {listing.quantityUnit}</div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-xs text-soil-900/50"><MapPin size={11}/> {t('Location')}</div>
              <div className="font-semibold text-soil-900">{listing.location}, {listing.district}</div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-xs text-soil-900/50"><Calendar size={11}/> {t('Harvested')}</div>
              <div className="font-semibold text-soil-900">{formatDate(listing.harvestDate)}</div>
            </div>
          </div>

          <div className="mt-5">
            <h3 className="flex items-center gap-1.5 font-semibold text-soil-900"><Package size={16}/> {t('Description')}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-soil-900/70">{listing.description}</p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button fullWidth onClick={() => setShowEnquiry(true)}>{t('Send Enquiry')}</Button>
            <Button fullWidth variant="secondary" onClick={() => setShowEnquiry(true)}>{t('Contact Farmer')}</Button>
          </div>
        </div>
      </div>

      <Modal open={showEnquiry} onClose={() => { setShowEnquiry(false); setSent(false); }} title={sent ? t('Enquiry Sent') : t('Send Enquiry')}>
        {sent ? (
          <p className="text-sm text-soil-900/70">
            Your enquiry about {listing.crop.name} has been sent to {listing.farmerName}. They will contact you shortly.
          </p>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-soil-900/70">This is a prototype — sending an enquiry simulates contacting {listing.farmerName} directly.</p>
            <Button fullWidth onClick={() => setSent(true)}>{t('Confirm & Send')}</Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
