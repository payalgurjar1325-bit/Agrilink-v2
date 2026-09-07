import { PriceHistoryPoint } from '../types';

// Deterministic pseudo-random walk so charts look realistic but are stable across renders.
function seededWalk(seed: number, days: number, base: number, volatility: number): PriceHistoryPoint[] {
  const points: PriceHistoryPoint[] = [];
  let value = base;
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const today = new Date('2026-09-06T00:00:00');
  for (let i = days - 1; i >= 0; i--) {
    const delta = (rand() - 0.48) * volatility;
    value = Math.max(base * 0.85, Math.min(base * 1.2, value + delta));
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    points.push({ date: d.toISOString().slice(0, 10), price: Math.round(value) });
  }
  return points;
}

const seeds: Record<string, number> = {
  wheat: 12, rice: 21, soybean: 33, onion: 44, tomato: 55, potato: 66,
  maize: 77, mustard: 88, chana: 99, turmeric: 111, mango: 122, cotton: 133,
};

const bases: Record<string, number> = {
  wheat: 2450, rice: 2100, soybean: 4650, onion: 1350, tomato: 1080, potato: 1120,
  maize: 2100, mustard: 5320, chana: 5620, turmeric: 7500, mango: 3600, cotton: 7040,
};

export function getPriceHistory(cropId: string, days: 7 | 30 | 90): PriceHistoryPoint[] {
  const seed = seeds[cropId] ?? 10;
  const base = bases[cropId] ?? 2000;
  return seededWalk(seed, days, base, base * 0.03);
}
