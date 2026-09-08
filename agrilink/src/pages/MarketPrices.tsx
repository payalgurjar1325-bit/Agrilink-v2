import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { FilterBar } from '../components/FilterBar';
import { Select } from '../components/FormControls';
import { Button } from '../components/Button';
import { TrendBadge } from '../components/Badge';
import { EmptyState, LoadingState } from '../components/Feedback';
import { crops } from '../data/crops';
import { districtsByState, markets, states } from '../data/markets';
import { searchPrices, EnrichedPrice } from '../services/marketService';
import { timeAgo } from '../utils/format';
import { useApp } from '../context/AppContext';

export default function MarketPrices() {
  const { language, t } = useApp();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [cropId, setCropId] = useState(params.get('crop') || '');
  const [state, setState] = useState(params.get('state') || '');
  const [district, setDistrict] = useState(params.get('district') || '');
  const [marketId, setMarketId] = useState('');
  const [results, setResults] = useState<EnrichedPrice[]>([]);
  const [loading, setLoading] = useState(true);

  const runSearch = async () => {
    setLoading(true);
    const data = await searchPrices({ cropId, state, district, marketId });
    setResults(data);
    setLoading(false);
  };

  useEffect(() => {
    runSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-soil-900 sm:text-3xl">{t('Discover Today’s Crop Prices')}</h1>
      <p className="mt-1.5 text-soil-900/60">{t('Search and compare mandi prices across markets.')}</p>

      <div className="mt-6">
        <FilterBar>
          <Select
            placeholder={t('All crops')}
            value={cropId}
            onChange={(e) => setCropId(e.target.value)}
            options={crops.map((c) => ({ value: c.id, label: `${c.icon} ${t(c.name)}` }))}
          />
          <Select
            placeholder={t('All states')}
            value={state}
            onChange={(e) => { setState(e.target.value); setDistrict(''); }}
            options={states.map((s) => ({ value: s, label: s }))}
          />
          <Select
            placeholder={t('All districts')}
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            options={(districtsByState[state] ?? [...new Set(markets.map((m) => m.district))]).map((d) => ({ value: d, label: d }))}
          />
          <Select
            placeholder={t('All markets')}
            value={marketId}
            onChange={(e) => setMarketId(e.target.value)}
            options={markets.map((m) => ({ value: m.id, label: m.name }))}
          />
        </FilterBar>
        <Button className="mt-3" onClick={runSearch}>
          <Search size={16} /> {t('Search')}
        </Button>
      </div>

      <div className="mt-8">
        {loading ? (
          <LoadingState label={t('Fetching latest prices...')} />
        ) : results.length === 0 ? (
          <EmptyState
            title={t('No prices found')}
            description={t('Try clearing a filter or choosing a different crop or district.')}
          />
        ) : (
          <div className="overflow-hidden rounded-card border border-soil-100 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="bg-soil-50 text-xs uppercase tracking-wide text-soil-900/50">
                  <tr>
                    <th className="px-4 py-3">{t('Crop')}</th><th className="px-4 py-3">{t('Market')}</th><th className="px-4 py-3">{t('District')}</th><th className="px-4 py-3">{t('Min Price')}</th><th className="px-4 py-3">{t('Max Price')}</th><th className="px-4 py-3">{t('Modal Price')}</th><th className="px-4 py-3">{t('Change')}</th><th className="px-4 py-3">{t('Distance')}</th><th className="px-4 py-3">{t('Updated')}</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r) => (
                    <tr key={r.id} className="border-t border-soil-100">
                      <td className="px-4 py-3.5 font-medium text-soil-900">{r.crop.icon} {t(r.crop.name)}</td>
                      <td className="px-4 py-3.5">{r.market.name}</td>
                      <td className="px-4 py-3.5 text-soil-900/60">{r.market.district}</td>
                      <td className="px-4 py-3.5">₹{r.minPrice.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3.5">₹{r.maxPrice.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3.5 font-semibold text-soil-900">₹{r.modalPrice.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3.5"><TrendBadge trend={r.trend} changePercent={r.changePercent} /></td>
                      <td className="px-4 py-3.5 text-soil-900/60">{r.market.distanceKm} km</td>
                      <td className="px-4 py-3.5 text-soil-900/50">{timeAgo(r.updatedAt, language)}</td>
                      <td className="px-4 py-3.5">
                        <button
                          onClick={() => navigate(`/compare-markets?crop=${r.cropId}`)}
                          className="font-medium text-field-700 hover:underline"
                        >
                          {t('View Market')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
