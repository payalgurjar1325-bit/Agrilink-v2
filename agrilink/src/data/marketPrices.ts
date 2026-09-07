import { MarketPrice } from '../types';

// Hand-tuned so the "profit after transport" story is visible:
// a further mandi with a higher headline price is NOT always the best net earner.
export const marketPrices: MarketPrice[] = [
  // Wheat
  { id: 'wheat-bhopal', cropId: 'wheat', marketId: 'bhopal', minPrice: 2340, maxPrice: 2480, modalPrice: 2450, changePercent: 3.2, trend: 'up', updatedAt: '2026-09-06T08:30:00' },
  { id: 'wheat-sehore', cropId: 'wheat', marketId: 'sehore', minPrice: 2410, maxPrice: 2560, modalPrice: 2520, changePercent: 2.1, trend: 'up', updatedAt: '2026-09-06T08:15:00' },
  { id: 'wheat-indore', cropId: 'wheat', marketId: 'indore', minPrice: 2480, maxPrice: 2640, modalPrice: 2610, changePercent: 4.5, trend: 'up', updatedAt: '2026-09-06T07:50:00' },
  { id: 'wheat-ujjain', cropId: 'wheat', marketId: 'ujjain', minPrice: 2400, maxPrice: 2540, modalPrice: 2500, changePercent: -0.4, trend: 'down', updatedAt: '2026-09-06T08:00:00' },
  { id: 'wheat-vidisha', cropId: 'wheat', marketId: 'vidisha', minPrice: 2380, maxPrice: 2500, modalPrice: 2460, changePercent: 0.6, trend: 'stable', updatedAt: '2026-09-06T08:05:00' },

  // Soybean
  { id: 'soybean-bhopal', cropId: 'soybean', marketId: 'bhopal', minPrice: 4480, maxPrice: 4650, modalPrice: 4620, changePercent: 1.8, trend: 'up', updatedAt: '2026-09-06T08:20:00' },
  { id: 'soybean-sehore', cropId: 'soybean', marketId: 'sehore', minPrice: 4520, maxPrice: 4700, modalPrice: 4680, changePercent: 2.4, trend: 'up', updatedAt: '2026-09-06T08:10:00' },
  { id: 'soybean-dewas', cropId: 'soybean', marketId: 'dewas', minPrice: 4600, maxPrice: 4820, modalPrice: 4790, changePercent: 3.9, trend: 'up', updatedAt: '2026-09-06T07:40:00' },
  { id: 'soybean-indore', cropId: 'soybean', marketId: 'indore', minPrice: 4650, maxPrice: 4880, modalPrice: 4850, changePercent: 5.1, trend: 'up', updatedAt: '2026-09-06T07:45:00' },

  // Onion
  { id: 'onion-bhopal', cropId: 'onion', marketId: 'bhopal', minPrice: 1180, maxPrice: 1420, modalPrice: 1350, changePercent: 6.2, trend: 'up', updatedAt: '2026-09-06T08:25:00' },
  { id: 'onion-indore', cropId: 'onion', marketId: 'indore', minPrice: 1260, maxPrice: 1520, modalPrice: 1480, changePercent: 8.4, trend: 'up', updatedAt: '2026-09-06T07:55:00' },
  { id: 'onion-dewas', cropId: 'onion', marketId: 'dewas', minPrice: 1220, maxPrice: 1460, modalPrice: 1410, changePercent: 4.9, trend: 'up', updatedAt: '2026-09-06T08:00:00' },
  { id: 'onion-ujjain', cropId: 'onion', marketId: 'ujjain', minPrice: 1200, maxPrice: 1400, modalPrice: 1360, changePercent: 1.1, trend: 'stable', updatedAt: '2026-09-06T08:05:00' },

  // Tomato
  { id: 'tomato-bhopal', cropId: 'tomato', marketId: 'bhopal', minPrice: 900, maxPrice: 1150, modalPrice: 1080, changePercent: -3.5, trend: 'down', updatedAt: '2026-09-06T08:30:00' },
  { id: 'tomato-raisen', cropId: 'tomato', marketId: 'raisen', minPrice: 950, maxPrice: 1200, modalPrice: 1140, changePercent: -1.2, trend: 'down', updatedAt: '2026-09-06T08:10:00' },
  { id: 'tomato-vidisha', cropId: 'tomato', marketId: 'vidisha', minPrice: 920, maxPrice: 1170, modalPrice: 1100, changePercent: 0.5, trend: 'stable', updatedAt: '2026-09-06T08:00:00' },

  // Potato
  { id: 'potato-bhopal', cropId: 'potato', marketId: 'bhopal', minPrice: 980, maxPrice: 1180, modalPrice: 1120, changePercent: 2.8, trend: 'up', updatedAt: '2026-09-06T08:15:00' },
  { id: 'potato-hoshangabad', cropId: 'potato', marketId: 'hoshangabad', minPrice: 1020, maxPrice: 1240, modalPrice: 1190, changePercent: 3.6, trend: 'up', updatedAt: '2026-09-06T07:50:00' },
  { id: 'potato-vidisha', cropId: 'potato', marketId: 'vidisha', minPrice: 960, maxPrice: 1150, modalPrice: 1100, changePercent: 0.9, trend: 'stable', updatedAt: '2026-09-06T08:05:00' },

  // Maize
  { id: 'maize-bhopal', cropId: 'maize', marketId: 'bhopal', minPrice: 1980, maxPrice: 2150, modalPrice: 2100, changePercent: 1.4, trend: 'up', updatedAt: '2026-09-06T08:20:00' },
  { id: 'maize-hoshangabad', cropId: 'maize', marketId: 'hoshangabad', minPrice: 2020, maxPrice: 2200, modalPrice: 2160, changePercent: 2.0, trend: 'up', updatedAt: '2026-09-06T07:55:00' },

  // Mustard
  { id: 'mustard-bhopal', cropId: 'mustard', marketId: 'bhopal', minPrice: 5150, maxPrice: 5380, modalPrice: 5320, changePercent: -1.1, trend: 'down', updatedAt: '2026-09-06T08:10:00' },
  { id: 'mustard-vidisha', cropId: 'mustard', marketId: 'vidisha', minPrice: 5200, maxPrice: 5420, modalPrice: 5380, changePercent: 0.3, trend: 'stable', updatedAt: '2026-09-06T08:05:00' },

  // Chana
  { id: 'chana-bhopal', cropId: 'chana', marketId: 'bhopal', minPrice: 5480, maxPrice: 5680, modalPrice: 5620, changePercent: 2.2, trend: 'up', updatedAt: '2026-09-06T08:00:00' },
  { id: 'chana-sehore', cropId: 'chana', marketId: 'sehore', minPrice: 5520, maxPrice: 5720, modalPrice: 5680, changePercent: 2.9, trend: 'up', updatedAt: '2026-09-06T08:10:00' },

  // Turmeric
  { id: 'turmeric-indore', cropId: 'turmeric', marketId: 'indore', minPrice: 7200, maxPrice: 7650, modalPrice: 7500, changePercent: 5.6, trend: 'up', updatedAt: '2026-09-06T07:45:00' },

  // Mango
  { id: 'mango-hoshangabad', cropId: 'mango', marketId: 'hoshangabad', minPrice: 3200, maxPrice: 3800, modalPrice: 3600, changePercent: -2.4, trend: 'down', updatedAt: '2026-09-06T08:00:00' },

  // Cotton
  { id: 'cotton-indore', cropId: 'cotton', marketId: 'indore', minPrice: 6800, maxPrice: 7150, modalPrice: 7040, changePercent: 1.9, trend: 'up', updatedAt: '2026-09-06T07:50:00' },
];

export const getPricesForCrop = (cropId: string) => marketPrices.filter((p) => p.cropId === cropId);
export const getPriceForMarketCrop = (cropId: string, marketId: string) =>
  marketPrices.find((p) => p.cropId === cropId && p.marketId === marketId);
