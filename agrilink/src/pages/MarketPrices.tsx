import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { FilterBar } from '../components/FilterBar';
import { Select } from '../components/FormControls';
import { Button } from '../components/Button';
import { TrendBadge } from '../components/Badge';
import { EmptyState, LoadingState } from '../components/Feedback';
import { crops } from '../data/crops';
import { markets } from '../data/markets';
import { searchPrices, EnrichedPrice } from '../services/marketService';
import { timeAgo } from '../utils/format';

export default function MarketPrices() {
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
      <h1 className="text-2xl font-semibold text-soil-900 sm:text-3xl">Discover Today’s Crop Prices</h1>
      <p className="mt-1.5 text-soil-900/60">Search and compare mandi prices across markets.</p>

      <div className="mt-6">
        <FilterBar>
          <Select
            placeholder="All crops"
            value={cropId}
            onChange={(e) => setCropId(e.target.value)}
            options={crops.map((c) => ({ value: c.id, label: `${c.icon} ${c.name}` }))}
          />
          <Select
            placeholder="All states"
            value={state}
            onChange={(e) => setState(e.target.value)}
            options={[...new Set(markets.map((m) => m.state))].map((s) => ({ value: s, label: s }))}
          />
          <Select
            placeholder="All districts"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            options={[...new Set(markets.map((m) => m.district))].map((d) => ({ value: d, label: d }))}
          />
          <Select
            placeholder="All markets"
            value={marketId}
            onChange={(e) => setMarketId(e.target.value)}
            options={markets.map((m) => ({ value: m.id, label: m.name }))}
          />
        </FilterBar>
        <Button className="mt-3" onClick={runSearch}>
          <Search size={16} /> Search
        </Button>
      </div>

      <div className="mt-8">
        {loading ? (
          <LoadingState label="Fetching latest prices..." />
        ) : results.length === 0 ? (
          <EmptyState
            title="No prices found"
            description="Try clearing a filter or choosing a different crop or district."
          />
        ) : (
          <div className="overflow-hidden rounded-card border border-soil-100 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="bg-soil-50 text-xs uppercase tracking-wide text-soil-900/50">
                  <tr>
                    <th className="px-4 py-3">Crop</th>
                    <th className="px-4 py-3">Market</th>
                    <th className="px-4 py-3">District</th>
                    <th className="px-4 py-3">Min Price</th>
                    <th className="px-4 py-3">Max Price</th>
                    <th className="px-4 py-3">Modal Price</th>
                    <th className="px-4 py-3">Change</th>
                    <th className="px-4 py-3">Distance</th>
                    <th className="px-4 py-3">Updated</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r) => (
                    <tr key={r.id} className="border-t border-soil-100">
                      <td className="px-4 py-3.5 font-medium text-soil-900">{r.crop.icon} {r.crop.name}</td>
                      <td className="px-4 py-3.5">{r.market.name}</td>
                      <td className="px-4 py-3.5 text-soil-900/60">{r.market.district}</td>
                      <td className="px-4 py-3.5">₹{r.minPrice.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3.5">₹{r.maxPrice.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3.5 font-semibold text-soil-900">₹{r.modalPrice.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3.5"><TrendBadge trend={r.trend} changePercent={r.changePercent} /></td>
                      <td className="px-4 py-3.5 text-soil-900/60">{r.market.distanceKm} km</td>
                      <td className="px-4 py-3.5 text-soil-900/50">{timeAgo(r.updatedAt)}</td>
                      <td className="px-4 py-3.5">
                        <button
                          onClick={() => navigate(`/compare-markets?crop=${r.cropId}`)}
                          className="font-medium text-field-700 hover:underline"
                        >
                          View Market
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
