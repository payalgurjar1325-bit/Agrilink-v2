import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SlidersHorizontal, GitCompareArrows, Target, Handshake,
  BadgeIndianRupee, Users, Bell, TrendingUp as TrendUpIcon, ArrowRight,
} from 'lucide-react';
import { Button } from '../components/Button';
import { Select } from '../components/FormControls';
import { crops } from '../data/crops';
import { markets } from '../data/markets';
import { marketPrices } from '../data/marketPrices';
import { getMarketById } from '../data/markets';
import { getCropById } from '../data/crops';
import { PriceCard } from '../components/PriceCard';

const steps = [
  { icon: SlidersHorizontal, title: 'Select your crop', desc: 'Choose the crop and quantity you plan to sell.' },
  { icon: GitCompareArrows, title: 'Compare market prices', desc: 'See today’s prices across nearby mandis instantly.' },
  { icon: Target, title: 'Find the most profitable market', desc: 'AgriLink factors in distance and transport cost, not just price.' },
  { icon: Handshake, title: 'Sell directly or visit the market', desc: 'Connect with a buyer or head to the recommended mandi.' },
];

const benefits = [
  { icon: BadgeIndianRupee, title: 'Transparent Prices', desc: 'Compare prices from multiple agricultural markets in one place.' },
  { icon: Users, title: 'Direct Buyer Connection', desc: 'Reduce unnecessary intermediaries and sell with confidence.' },
  { icon: Target, title: 'Smart Market Recommendation', desc: 'Find markets based on price, distance and estimated profit.' },
  { icon: Bell, title: 'Price Alerts', desc: 'Get notified when your crop reaches your target price.' },
  { icon: TrendUpIcon, title: 'Market Demand Insights', desc: 'Understand where particular crops are currently in demand.' },
];

export default function Home() {
  const navigate = useNavigate();
  const [cropId, setCropId] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');

  const todaysPrices = useMemo(
    () =>
      marketPrices.slice(0, 6).map((p) => ({
        price: p,
        crop: getCropById(p.cropId)!,
        market: getMarketById(p.marketId)!,
      })),
    []
  );

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (cropId) params.set('crop', cropId);
    if (state) params.set('state', state);
    if (district) params.set('district', district);
    navigate(`/market-prices?${params.toString()}`);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-field-50/60">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:items-center lg:px-8 lg:py-20">
          <div>
            <h1 className="font-display text-4xl font-semibold leading-tight text-soil-900 sm:text-5xl">
              Better markets. Better prices. Better income.
            </h1>
            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-soil-900/70">
              Compare mandi prices, discover better markets and connect directly with trusted buyers — all in one place.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" onClick={() => navigate('/market-prices')}>Check Market Prices</Button>
              <Button size="lg" variant="secondary" onClick={() => navigate('/sell-produce')}>Sell Your Produce</Button>
            </div>
          </div>
          <div className="rounded-card border border-field-200 bg-white p-5">
            <div className="text-sm font-medium text-soil-900/60">Today’s highlight</div>
            <div className="mt-2 flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold text-soil-900">Soybean · Sehore Mandi</div>
                <div className="text-sm text-soil-900/50">41 km from your registered village</div>
              </div>
              <span className="text-2xl">🫘</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-card bg-field-50 p-3">
                <div className="text-xs text-soil-900/50">Modal Price</div>
                <div className="text-xl font-bold text-soil-900">₹4,680</div>
              </div>
              <div className="rounded-card bg-field-700 p-3 text-white">
                <div className="text-xs text-field-100">Est. Net Earnings*</div>
                <div className="text-xl font-bold">₹1,39,500</div>
              </div>
            </div>
            <p className="mt-3 text-xs text-soil-900/40">*For 30 quintals, after transportation cost. See Compare Markets for your own numbers.</p>
          </div>
        </div>
      </section>

      {/* Quick crop search */}
      <section className="mx-auto -mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-card border border-soil-100 bg-white p-5 shadow-card sm:p-6">
          <h2 className="text-base font-semibold text-soil-900">Find the best market for your crop</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Select
              placeholder="Select crop"
              value={cropId}
              onChange={(e) => setCropId(e.target.value)}
              options={crops.map((c) => ({ value: c.id, label: `${c.icon} ${c.name}` }))}
            />
            <Select
              placeholder="Select state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              options={[...new Set(markets.map((m) => m.state))].map((s) => ({ value: s, label: s }))}
            />
            <Select
              placeholder="District / Location"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              options={[...new Set(markets.map((m) => m.district))].map((d) => ({ value: d, label: d }))}
            />
          </div>
          <Button className="mt-4" onClick={handleSearch}>
            Find Best Market <ArrowRight size={16} />
          </Button>
        </div>
      </section>

      {/* Today's market prices */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-soil-900">Today’s Market Prices</h2>
          <button onClick={() => navigate('/market-prices')} className="text-sm font-medium text-field-700 hover:underline">
            View all
          </button>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {todaysPrices.map(({ price, crop, market }) => (
            <PriceCard key={price.id} price={price} crop={crop} market={market} />
          ))}
        </div>
      </section>

      {/* How AgriLink works */}
      <section className="bg-field-50/50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-soil-900">How AgriLink Works</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.title} className="rounded-card bg-white p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-field-700 text-white">
                  <s.icon size={18} />
                </div>
                <h3 className="mt-4 font-semibold text-soil-900">{i + 1}. {s.title}</h3>
                <p className="mt-1.5 text-sm text-soil-900/60">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key benefits */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-soil-900">Key Benefits</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <div key={b.title} className="rounded-card border border-soil-100 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-field-50 text-field-700">
                <b.icon size={18} />
              </div>
              <h3 className="mt-4 font-semibold text-soil-900">{b.title}</h3>
              <p className="mt-1.5 text-sm text-soil-900/60">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
