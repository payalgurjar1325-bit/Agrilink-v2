// Service layer for market price data.
// Currently backed by local mock data. Replace the bodies of these functions
// with real HTTP calls (e.g. to AGMARKNET / eNAM / a backend) without
// changing the function signatures consumed by the UI.

import { crops, getCropById } from '../data/crops';
import { markets, getMarketById } from '../data/markets';
import { marketPrices, getPricesForCrop } from '../data/marketPrices';
import { getPriceHistory } from '../data/priceHistory';
import { Crop, Market, MarketPrice, MarketRecommendation, PriceHistoryPoint } from '../types';

const delay = <T,>(value: T, ms = 150): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

export interface PriceSearchFilters {
  cropId?: string;
  state?: string;
  district?: string;
  marketId?: string;
}

export async function fetchCrops(): Promise<Crop[]> {
  return delay(crops);
}

export async function fetchMarkets(): Promise<Market[]> {
  return delay(markets);
}

export interface EnrichedPrice extends MarketPrice {
  crop: Crop;
  market: Market;
}

export async function searchPrices(filters: PriceSearchFilters): Promise<EnrichedPrice[]> {
  let results = marketPrices;
  if (filters.cropId) results = results.filter((p) => p.cropId === filters.cropId);
  if (filters.marketId) results = results.filter((p) => p.marketId === filters.marketId);
  if (filters.district) {
    results = results.filter((p) => {
      const m = getMarketById(p.marketId);
      return m?.district.toLowerCase().includes(filters.district!.toLowerCase());
    });
  }
  if (filters.state) {
    results = results.filter((p) => {
      const m = getMarketById(p.marketId);
      return m?.state.toLowerCase().includes(filters.state!.toLowerCase());
    });
  }
  const enriched: EnrichedPrice[] = results
    .map((p) => {
      const crop = getCropById(p.cropId);
      const market = getMarketById(p.marketId);
      if (!crop || !market) return null;
      return { ...p, crop, market };
    })
    .filter((x): x is EnrichedPrice => x !== null);
  return delay(enriched);
}

export async function fetchPriceHistory(cropId: string, range: 7 | 30 | 90): Promise<PriceHistoryPoint[]> {
  return delay(getPriceHistory(cropId, range));
}

/**
 * Transportation-aware profit calculation — the core AgriLink differentiator.
 * Given a crop and quantity, ranks every market not by headline price but by
 * estimated net earnings after a distance-based transport cost.
 */
export function calculateNetEarnings(
  modalPrice: number,
  quantityQuintals: number,
  distanceKm: number,
  transportCostPerKm: number
): { grossRevenue: number; transportCost: number; netEarnings: number } {
  const grossRevenue = modalPrice * quantityQuintals;
  const transportCost = distanceKm * transportCostPerKm;
  const netEarnings = grossRevenue - transportCost;
  return { grossRevenue, transportCost, netEarnings };
}

const DEFAULT_TRANSPORT_COST_PER_KM = 22; // ₹ per km, prototype assumption for a loaded truck

export async function recommendBestMarket(
  cropId: string,
  quantityQuintals: number,
  transportCostPerKm: number = DEFAULT_TRANSPORT_COST_PER_KM
): Promise<MarketRecommendation[]> {
  const prices = getPricesForCrop(cropId);
  const recommendations: MarketRecommendation[] = prices.map((p) => {
    const market = getMarketById(p.marketId)!;
    const { grossRevenue, transportCost, netEarnings } = calculateNetEarnings(
      p.modalPrice,
      quantityQuintals,
      market.distanceKm,
      transportCostPerKm
    );
    return {
      marketId: p.marketId,
      price: p.modalPrice,
      distanceKm: market.distanceKm,
      transportCost,
      grossRevenue,
      netEarnings,
      reason: '',
    };
  });
  recommendations.sort((a, b) => b.netEarnings - a.netEarnings);
  if (recommendations[0]) {
    const highestPrice = [...recommendations].sort((a, b) => b.price - a.price)[0];
    recommendations[0].reason =
      recommendations[0].marketId === highestPrice.marketId
        ? 'Best price and lowest effective transport cost.'
        : 'Highest estimated profit after transportation cost, even though other markets quote a higher price.';
  }
  return delay(recommendations);
}
