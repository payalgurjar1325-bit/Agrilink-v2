import React, { useMemo, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, CalendarDays, LineChart, Sprout } from 'lucide-react';
import { crops } from '../data/crops';
import { getPricesForCrop } from '../data/marketPrices';
import { Crop, PriceTrend } from '../types';
import { formatINR } from '../utils/format';

const mockPredictionFactors: Record<string, { changePercent: number; sellWindow: string }> = {
  wheat: { changePercent: 6.8, sellWindow: 'In 2–3 weeks' },
  rice: { changePercent: 4.2, sellWindow: 'In 10–14 days' },
  soybean: { changePercent: 7.5, sellWindow: 'In 3–4 weeks' },
  onion: { changePercent: -3.4, sellWindow: 'Within 5–7 days' },
  tomato: { changePercent: -5.8, sellWindow: 'Within 3–5 days' },
  potato: { changePercent: 5.1, sellWindow: 'In 2–3 weeks' },
  maize: { changePercent: 4.9, sellWindow: 'In 2 weeks' },
  mustard: { changePercent: 3.6, sellWindow: 'In 10–14 days' },
  chana: { changePercent: 6.1, sellWindow: 'In 2–3 weeks' },
  turmeric: { changePercent: 8.2, sellWindow: 'In 3–4 weeks' },
  mango: { changePercent: -2.7, sellWindow: 'Within 7 days' },
  cotton: { changePercent: 5.7, sellWindow: 'In 2–3 weeks' },
};

const mockCurrentPrices: Record<string, number> = {
  rice: 3280,
};

function getPrediction(crop: Crop) {
  const currentPrice = Math.max(...getPricesForCrop(crop.id).map((price) => price.modalPrice), mockCurrentPrices[crop.id] ?? 0);
  const factor = mockPredictionFactors[crop.id] ?? { changePercent: 3.5, sellWindow: 'In 2–3 weeks' };
  const predictedPrice = Math.round(currentPrice * (1 + factor.changePercent / 100));
  const trend: PriceTrend = factor.changePercent > 1 ? 'up' : factor.changePercent < -1 ? 'down' : 'stable';

  return { currentPrice, predictedPrice, trend, ...factor };
}

export function PricePrediction() {
  const [selectedCropId, setSelectedCropId] = useState(crops[0].id);
  const selectedCrop = crops.find((crop) => crop.id === selectedCropId) ?? crops[0];
  const prediction = useMemo(() => getPrediction(selectedCrop), [selectedCrop]);
  const isIncrease = prediction.changePercent >= 0;
  const TrendIcon = isIncrease ? ArrowUpRight : ArrowDownRight;

  return (
    <section className="mt-8 rounded-card border border-soil-100 bg-white p-5" aria-labelledby="price-prediction-heading">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id="price-prediction-heading" className="font-semibold text-soil-900">Price Prediction</h2>
          <p className="mt-1 text-sm text-soil-900/50">Mock forecast based on current market trends</p>
        </div>
        <label className="flex items-center gap-2 text-sm text-soil-900/60">
          <span className="sr-only">Select crop</span>
          <Sprout size={16} />
          <select
            value={selectedCropId}
            onChange={(event) => setSelectedCropId(event.target.value)}
            className="rounded-card border border-soil-100 bg-white px-2.5 py-1.5 text-sm text-soil-900"
          >
            {crops.map((crop) => <option key={crop.id} value={crop.id}>{crop.name}</option>)}
          </select>
        </label>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <PredictionStat label="Current Market Price" value={formatINR(prediction.currentPrice)} suffix={`/${selectedCrop.unit}`} />
        <PredictionStat label="Predicted Future Price" value={formatINR(prediction.predictedPrice)} suffix={`/${selectedCrop.unit}`} />
        <PredictionStat
          label="Expected Change"
          value={`${isIncrease ? '+' : ''}${prediction.changePercent.toFixed(1)}%`}
          valueClass={isIncrease ? 'text-field-700' : 'text-red-700'}
          icon={<TrendIcon size={17} />}
        />
        <PredictionStat
          label="Price Trend"
          value={prediction.trend === 'up' ? 'Increasing' : prediction.trend === 'down' ? 'Decreasing' : 'Stable'}
          valueClass={isIncrease ? 'text-field-700' : 'text-red-700'}
          icon={<LineChart size={17} />}
        />
        <PredictionStat
          label="Best Time to Sell"
          value={prediction.sellWindow}
          valueClass="text-soil-900"
          icon={<CalendarDays size={17} />}
        />
      </div>
    </section>
  );
}

function PredictionStat({
  label,
  value,
  suffix,
  valueClass = 'text-soil-900',
  icon,
}: {
  label: string;
  value: string;
  suffix?: string;
  valueClass?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-card bg-soil-50 px-3 py-3">
      <div className="flex items-center gap-1.5 text-xs text-soil-900/50">
        {icon}
        <span>{label}</span>
      </div>
      <div className={`mt-2 flex items-baseline gap-1 font-semibold ${valueClass}`}>
        <span>{value}</span>
        {suffix && <span className="text-xs font-normal text-soil-900/50">{suffix}</span>}
      </div>
    </div>
  );
}