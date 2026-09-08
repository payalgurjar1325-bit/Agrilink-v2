import React from 'react';
import { ShieldCheck, Target, Users2, LineChart } from 'lucide-react';
import { useApp } from '../context/AppContext';

const pillars = [
  { icon: Target, title: 'Price transparency', desc: 'Real-time modal prices across mandis, in one place, instead of scattered word-of-mouth.' },
  { icon: LineChart, title: 'Profit-aware recommendations', desc: 'AgriLink weighs distance and transport cost, not just the headline price, when suggesting where to sell.' },
  { icon: Users2, title: 'Direct connections', desc: 'A marketplace that lets farmers reach buyers, FPOs and processors without unnecessary middlemen.' },
  { icon: ShieldCheck, title: 'Built for every farmer', desc: 'Simple language, large touch targets and a mobile-first design for rural digital accessibility.' },
];

export default function About() {
  const { t } = useApp();
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-soil-900 sm:text-3xl">{t('About')}</h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-soil-900/70">
        AgriLink is a Smart India Hackathon prototype addressing the problem statement
        <em> "Strengthening Market Linkages and Price Discovery for Farmers."</em> Indian farmers
        often sell in a nearby mandi without knowing that another market, buyer or cooperative is
        offering a meaningfully better price — sometimes because transport cost quietly erases what
        looked like a better deal. AgriLink brings price data, distance and buyer connections
        together so farmers can decide with confidence.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {pillars.map((p) => (
          <div key={p.title} className="rounded-card border border-soil-100 bg-white p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-field-50 text-field-700">
              <p.icon size={18} />
            </div>
            <h3 className="mt-4 font-semibold text-soil-900">{p.title}</h3>
            <p className="mt-1.5 text-sm text-soil-900/60">{p.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-card bg-field-50/60 p-6">
        <h2 className="font-semibold text-soil-900">The core differentiator</h2>
        <p className="mt-2 text-sm leading-relaxed text-soil-900/70">
          Existing platforms often stop at "Mandi A = ₹2,500, Mandi B = ₹2,600." AgriLink asks the
          more useful question: after transport, which mandi actually leaves more money in the
          farmer's pocket? A closer market with a slightly lower price can outperform a distant
          market with a higher one — and the Compare Markets page makes that visible at a glance.
        </p>
      </div>

      <div className="mt-10 text-sm text-soil-900/50">
        This is a frontend prototype built with mock data. Prices, listings and farmer names are
        illustrative and structured so they can later be replaced by real data sources such as
        AGMARKNET, eNAM or a dedicated backend.
      </div>
    </div>
  );
}
