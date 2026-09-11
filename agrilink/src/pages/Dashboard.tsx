import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package, MessageSquare, TrendingUp, Bookmark, Bell, Eye, Pencil, Trash2, ArrowRight,
} from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { Badge, DemandBadge } from '../components/Badge';
import { Button } from '../components/Button';
import { PriceTrendChart } from '../components/PriceTrendChart';
import { PricePrediction } from '../components/PricePrediction';
import { MarketCard } from '../components/MarketCard';
import { getCropById, crops } from '../data/crops';
import { markets } from '../data/markets';
import { getPricesForCrop, getPriceForMarketCrop } from '../data/marketPrices';
import { myListings, enquiries, demandInsights } from '../data/insights';
import { fetchPriceHistory } from '../services/marketService';
import { recommendBestMarket } from '../services/marketService';
import { MarketRecommendation, PriceHistoryPoint } from '../types';
import { formatINR } from '../utils/format';
import { useApp } from '../context/AppContext';

export default function Dashboard() {
  const { t, user } = useApp();
  const navigate = useNavigate();
  const [range, setRange] = useState<7 | 30 | 90>(30);
  const [trendCrop, setTrendCrop] = useState('wheat');
  const [history, setHistory] = useState<PriceHistoryPoint[]>([]);
  const [bestMarket, setBestMarket] = useState<MarketRecommendation | null>(null);

  useEffect(() => {
    fetchPriceHistory(trendCrop, range).then(setHistory);
  }, [trendCrop, range]);

  useEffect(() => {
    recommendBestMarket('wheat', 50).then((recs) => setBestMarket(recs[0] ?? null));
  }, []);

  const bestTodayPrice = useMemo(() => {
    const all = crops.map((c) => getPricesForCrop(c.id)).flat();
    return all.sort((a, b) => b.modalPrice - a.modalPrice)[0];
  }, []);

  const stats = [
    { icon: Package, label: t('Active Listings'), value: String(myListings.filter((l) => l.status === 'active').length) },
    { icon: MessageSquare, label: t('Total Enquiries'), value: String(enquiries.length) },
    { icon: TrendingUp, label: t('Best Crop Price Today'), value: bestTodayPrice ? `₹${bestTodayPrice.modalPrice.toLocaleString('en-IN')}` : '—', sub: t(getCropById(bestTodayPrice?.cropId ?? '')?.name ?? '') },
    { icon: Bookmark, label: t('Saved Markets'), value: '3' },
    { icon: Bell, label: t('Price Alerts'), value: '2', onClick: () => navigate('/price-alerts') },
  ];

  const nearby = markets.slice(0, 3).map((m) => {
    const cropPrices = crops.map((c) => getPriceForMarketCrop(c.id, m.id)).filter(Boolean);
    const best = cropPrices.sort((a, b) => (b!.modalPrice - a!.modalPrice))[0];
    return { market: m, best: best!, crop: getCropById(best!.cropId)! };
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-soil-900 sm:text-3xl">{user?.name ? `Namaste, ${user.name} 👋` : 'Namaste 👋'}</h1>
      <p className="mt-1.5 text-soil-900/60">Here’s what’s happening with your crops and markets today.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* My active listings */}
        <div className="rounded-card border border-soil-100 bg-white p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-soil-900">{t('My Active Listings')}</h2>
            <Button size="sm" variant="secondary" onClick={() => navigate('/sell-produce')}>+ {t('Publish Listing')}</Button>
          </div>
          <div className="mt-4 space-y-3">
            {myListings.map((l) => {
              const crop = getCropById(l.cropId)!;
              return (
                <div key={l.id} className="flex items-center justify-between rounded-card border border-soil-100 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{crop.icon}</span>
                    <div>
                      <div className="font-medium text-soil-900">{crop.name}</div>
                      <div className="text-xs text-soil-900/50">{l.quantity} Quintals · {formatINR(l.price)}/Quintal</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge tone={l.status === 'active' ? 'green' : 'neutral'}>{l.status === 'active' ? 'Active' : 'Sold'}</Badge>
                    <div className="flex gap-1 text-soil-900/40">
                      <button className="rounded p-1.5 hover:bg-soil-100" aria-label="View"><Eye size={15} /></button>
                      <button className="rounded p-1.5 hover:bg-soil-100" aria-label="Edit"><Pencil size={15} /></button>
                      <button className="rounded p-1.5 hover:bg-soil-100" aria-label="Delete"><Trash2 size={15} /></button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommended market */}
        {bestMarket && (
          <div className="rounded-card border border-field-600 bg-field-50/60 p-5 ring-1 ring-field-600">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-field-700">Best Market for Wheat</h2>
            <div className="mt-2 text-lg font-semibold text-soil-900">{markets.find((m) => m.id === bestMarket.marketId)?.name}</div>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-xs text-soil-900/50">Price</div>
                <div className="font-semibold text-soil-900">{formatINR(bestMarket.price)}/Quintal</div>
              </div>
              <div>
                <div className="text-xs text-soil-900/50">Distance</div>
                <div className="font-semibold text-soil-900">{bestMarket.distanceKm} km</div>
              </div>
            </div>
            <div className="mt-3 rounded-card bg-field-700 px-3 py-2.5 text-white">
              <div className="text-xs text-field-100">Estimated Net Earnings</div>
              <div className="text-lg font-bold">{formatINR(bestMarket.netEarnings)}</div>
            </div>
            <Button className="mt-4" fullWidth variant="secondary" onClick={() => navigate('/compare-markets?crop=wheat')}>
              View Comparison <ArrowRight size={14} />
            </Button>
          </div>
        )}
      </div>

      {/* Recent enquiries */}
      <div className="mt-8 rounded-card border border-soil-100 bg-white p-5">
        <h2 className="font-semibold text-soil-900">{t('Recent Enquiries')}</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-soil-900/50">
              <tr>
                <th className="py-2 pr-4">Buyer</th>
                <th className="py-2 pr-4">Crop</th>
                <th className="py-2 pr-4">Quantity</th>
                <th className="py-2 pr-4">Offer Price</th>
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((e) => (
                <tr key={e.id} className="border-t border-soil-100">
                  <td className="py-3 pr-4 font-medium text-soil-900">{e.buyerName}</td>
                  <td className="py-3 pr-4">{getCropById(e.cropId)?.name}</td>
                  <td className="py-3 pr-4">{e.quantity} Q</td>
                  <td className="py-3 pr-4">{formatINR(e.offerPrice)}</td>
                  <td className="py-3 pr-4 text-soil-900/50">{e.date}</td>
                  <td className="py-3 pr-4">
                    <Badge tone={e.status === 'accepted' ? 'green' : e.status === 'declined' ? 'red' : 'amber'}>
                      {e.status}
                    </Badge>
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button className="font-medium text-field-700 hover:underline">Accept</button>
                      <button className="font-medium text-soil-900/50 hover:underline">View</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <PricePrediction />

      {/* Market trends */}
      <div className="mt-8 rounded-card border border-soil-100 bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-semibold text-soil-900">{getCropById(trendCrop)?.name} Price Trend</h2>
          <div className="flex items-center gap-2">
            <select value={trendCrop} onChange={(e) => setTrendCrop(e.target.value)} className="rounded-card border border-soil-100 px-2.5 py-1.5 text-sm">
              {crops.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            {[7, 30, 90].map((d) => (
              <button
                key={d}
                onClick={() => setRange(d as 7 | 30 | 90)}
                className={`rounded-card px-3 py-1.5 text-sm font-medium ${range === d ? 'bg-field-700 text-white' : 'bg-soil-100 text-soil-900/70'}`}
              >
                {d === 90 ? '3 Months' : `${d} Days`}
              </button>
            ))}
          </div>
        </div>
        {history.length > 0 && (
          <>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <TrendStat label="Current" value={history[history.length - 1].price} />
              <TrendStat label="Average" value={Math.round(history.reduce((a, p) => a + p.price, 0) / history.length)} />
              <TrendStat label="Highest" value={Math.max(...history.map((p) => p.price))} />
              <TrendStat label="Lowest" value={Math.min(...history.map((p) => p.price))} />
            </div>
            <div className="mt-4">
              <PriceTrendChart data={history} />
            </div>
          </>
        )}
      </div>

      {/* Demand insights + nearby markets */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-card border border-soil-100 bg-white p-5">
          <h2 className="font-semibold text-soil-900">{t('Market Demand')}</h2>
          <div className="mt-4 space-y-3">
            {demandInsights.map((d) => {
              const crop = getCropById(d.cropId)!;
              return (
                <div key={d.cropId} className="flex items-center justify-between rounded-card border border-soil-100 px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <span>{crop.icon}</span>
                    <span className="font-medium text-soil-900">{crop.name}</span>
                  </div>
                  <DemandBadge level={d.level} />
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="mb-4 font-semibold text-soil-900">{t('Markets Near You')}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
            {nearby.map(({ market, best, crop }) => (
              <MarketCard
                key={market.id}
                market={market}
                bestCrop={crop}
                bestPrice={best}
                popularCrops={crops.slice(0, 3)}
                onView={() => navigate(`/market-prices?crop=${crop.id}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TrendStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-card bg-soil-50 px-3 py-2.5">
      <div className="text-xs text-soil-900/50">{label}</div>
      <div className="font-semibold text-soil-900">{formatINR(value)}</div>
    </div>
  );
}
