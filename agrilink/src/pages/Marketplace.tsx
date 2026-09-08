import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../components/FilterBar';
import { Select } from '../components/FormControls';
import { ProductCard } from '../components/ProductCard';
import { EmptyState, LoadingState, Modal } from '../components/Feedback';
import { Button } from '../components/Button';
import { fetchListings, EnrichedListing, ListingFilters } from '../services/marketplaceService';
import { markets } from '../data/markets';
import { useApp } from '../context/AppContext';

const categories = ['Vegetables', 'Fruits', 'Grains', 'Pulses', 'Oilseeds', 'Spices'];

export default function Marketplace() {
  const { t } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState<ListingFilters['sortBy']>('newest');
  const [listings, setListings] = useState<EnrichedListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [contactListing, setContactListing] = useState<EnrichedListing | null>(null);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(async () => {
      const data = await fetchListings({
        search: search || undefined,
        category: category || undefined,
        location: location || undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        sortBy,
      });
      setListings(data);
      setLoading(false);
    }, 200);
    return () => clearTimeout(timeout);
  }, [search, category, location, maxPrice, sortBy]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-soil-900 sm:text-3xl">{t('Farmer Marketplace')}</h1>
      <p className="mt-1.5 text-soil-900/60">{t('Connect directly with farmers and verified buyers.')}</p>

      <div className="mt-6 rounded-card border border-soil-100 bg-white p-4 sm:p-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SearchBar value={search} onChange={setSearch} placeholder={t('Search produce, farmer, location...')} />
          </div>
          <Select
            placeholder={t('All categories')}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={categories.map((c) => ({ value: c, label: t(c) }))}
          />
          <Select
            placeholder={t('All locations')}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            options={[...new Set(markets.map((m) => m.district))].map((d) => ({ value: d, label: d }))}
          />
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as ListingFilters['sortBy'])}
            options={[
              { value: 'newest', label: 'Sort: Newest Harvest' },
              { value: 'price-asc', label: 'Sort: Price (Low to High)' },
              { value: 'price-desc', label: 'Sort: Price (High to Low)' },
              { value: 'quantity-desc', label: 'Sort: Quantity Available' },
            ]}
          />
        </div>
        <div className="mt-3 max-w-xs">
          <Select
            placeholder="Max price / quintal"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            options={['1500', '3000', '5000', '8000'].map((v) => ({ value: v, label: `Under ₹${v}` }))}
          />
        </div>
      </div>

      <div className="mt-8">
        {loading ? (
          <LoadingState label={t('Loading listings...')} />
        ) : listings.length === 0 ? (
          <EmptyState title={t('No listings match your filters')} description={t('Try widening your search or clearing a filter.')} />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {listings.map((l) => (
              <ProductCard
                key={l.id}
                listing={l}
                onViewDetails={() => navigate(`/marketplace/${l.id}`)}
                onContact={() => setContactListing(l)}
              />
            ))}
          </div>
        )}
      </div>

      <Modal open={!!contactListing} onClose={() => setContactListing(null)} title={t('Contact Farmer')}>
        {contactListing && (
          <div className="space-y-4">
            <p className="text-sm text-soil-900/70">
              Send an enquiry to <strong>{contactListing.farmerName}</strong> about their {contactListing.crop.name} listing.
              This is a prototype — no message is actually sent.
            </p>
            <Button fullWidth onClick={() => setContactListing(null)}>{t('Send Enquiry')}</Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
