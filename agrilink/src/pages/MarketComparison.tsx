import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Calculator, Info } from 'lucide-react';
import { Select, Input } from '../components/FormControls';
import { Button } from '../components/Button';
import { MarketComparisonCard } from '../components/MarketComparisonCard';
import { LoadingState, EmptyState } from '../components/Feedback';
import { crops, getCropById } from '../data/crops';
import { getMarketById } from '../data/markets';
import { getPriceForMarketCrop } from '../data/marketPrices';
import { recommendBestMarket, calculateNetEarnings } from '../services/marketService';
import { MarketRecommendation } from '../types';
import { formatINR } from '../utils/format';

export default function MarketComparison() {
  const [params, setParams] = useSearchParams();
  const defaultCropId = crops[0]?.id ?? '';
  const requestedCropId = params.get('crop');
  const initialCropId = crops.some((cropOption) => cropOption.id === requestedCropId)
    ? requestedCropId!
    : defaultCropId;
  const [cropId, setCropId] = useState(initialCropId);
  const [quantity, setQuantity] = useState(30);
  const [transportRate, setTransportRate] = useState(22);
  const [recommendations, setRecommendations] = useState<MarketRecommendation[]>([]);
  const [loading, setLoading] = useState(true);

  // Standalone calculator state
  const [calcPrice, setCalcPrice] = useState(2500);
  const [calcQty, setCalcQty] = useState(20);
  const [calcDistance, setCalcDistance] = useState(50);
  const [calcRate, setCalcRate] = useState(22);

  const runCompare = async () => {
    if (!cropId) return;
    setLoading(true);
    const data = await recommendBestMarket(cropId, quantity, transportRate);
    setRecommendations(data);
    setLoading(false);
  };

  useEffect(() => {
    if (!cropId) return;
    let cancelled = false;
    setRecommendations([]);
    setLoading(true);
    recommendBestMarket(cropId, quantity, transportRate).then((data) => {
      if (!cancelled) {
        setRecommendations(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [cropId]);

  const calcResult = calculateNetEarnings(calcPrice, calcQty, calcDistance, calcRate);
  const crop = getCropById(cropId);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-soil-900 sm:text-3xl">Compare Markets</h1>
      <p className="mt-1.5 max-w-2xl text-soil-900/60">
        AgriLink doesn’t just compare prices — it estimates your actual take-home earnings after transportation, so you can see which market really pays best.
      </p>

      <div className="mt-6 rounded-card border border-soil-100 bg-white p-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
          <Select
            label="Crop"
            value={cropId}
            onChange={(e) => {
              const nextCropId = e.target.value;
              setCropId(nextCropId);
              setParams((current) => {
                current.set('crop', nextCropId);
                return current;
              });
            }}
            options={crops.map((c) => ({ value: c.id, label: `${c.icon} ${c.name}` }))}
          />
          <Input
            label="Quantity (Quintals)"
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <Input
            label="Transport cost (₹/km)"
            type="number"
            min={1}
            value={transportRate}
            onChange={(e) => setTransportRate(Number(e.target.value))}
          />
          <div className="flex items-end">
            <Button fullWidth onClick={runCompare}>Compare</Button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        {loading ? (
          <LoadingState label="Comparing mandis..." />
        ) : recommendations.length === 0 ? (
          <EmptyState title="No data for this crop" description="Try a different crop to see market comparisons." />
        ) : (
          <>
            <div className="mb-4 flex items-start gap-2 rounded-card bg-field-50 px-4 py-3 text-sm text-field-800">
              <Info size={16} className="mt-0.5 shrink-0" />
              <p>
                Sorted by <strong>estimated net earnings</strong>, not headline price. Notice how the top market may not have the highest quoted price for {crop?.name}.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {recommendations.map((r, i) => {
                const market = getMarketById(r.marketId)!;
                const priceInfo = getPriceForMarketCrop(cropId, r.marketId);
                if (!market || !priceInfo) return null;
                return (
                  <MarketComparisonCard
                    key={r.marketId}
                    market={market}
                    price={r.price}
                    trend={priceInfo.trend}
                    changePercent={priceInfo.changePercent}
                    distanceKm={r.distanceKm}
                    transportCost={r.transportCost}
                    grossRevenue={r.grossRevenue}
                    netEarnings={r.netEarnings}
                    isBest={i === 0}
                    reason={i === 0 ? r.reason : undefined}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Profit calculator */}
      <div className="mt-14 rounded-card border border-soil-100 bg-white p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <Calculator size={18} className="text-field-700" />
          <h2 className="text-lg font-semibold text-soil-900">Profit Calculator</h2>
        </div>
        <p className="mt-1 text-sm text-soil-900/60">Try your own numbers for any market and crop.</p>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Quantity (Quintals)" type="number" min={0} value={calcQty} onChange={(e) => setCalcQty(Number(e.target.value))} />
            <Input label="Market Price (₹/Quintal)" type="number" min={0} value={calcPrice} onChange={(e) => setCalcPrice(Number(e.target.value))} />
            <Input label="Distance (km)" type="number" min={0} value={calcDistance} onChange={(e) => setCalcDistance(Number(e.target.value))} />
            <Input label="Transport Cost (₹/km)" type="number" min={0} value={calcRate} onChange={(e) => setCalcRate(Number(e.target.value))} />
          </div>
          <div className="flex flex-col justify-center gap-3 rounded-card bg-soil-50 p-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-soil-900/60">Gross Revenue</span>
              <span className="font-semibold text-soil-900">{formatINR(calcResult.grossRevenue)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-soil-900/60">Transportation Cost</span>
              <span className="font-semibold text-clay-500">− {formatINR(calcResult.transportCost)}</span>
            </div>
            <div className="mt-1 flex items-center justify-between border-t border-soil-100 pt-3">
              <span className="text-sm font-medium text-soil-900">Estimated Net Revenue</span>
              <span className="text-xl font-bold text-field-700">{formatINR(calcResult.netEarnings)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
