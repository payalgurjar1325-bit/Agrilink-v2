import { DemandLevel, Enquiry, MyListing, PriceAlert } from '../types';

export interface DemandInsight {
  cropId: string;
  level: DemandLevel;
  note: string;
}

export const demandInsights: DemandInsight[] = [
  { cropId: 'onion', level: 'high', note: 'Festive-season buying is pushing demand up across MP mandis.' },
  { cropId: 'potato', level: 'high', note: 'Processors are stocking up ahead of the winter season.' },
  { cropId: 'wheat', level: 'medium', note: 'Steady government and open-market procurement.' },
  { cropId: 'soybean', level: 'medium', note: 'Crushing mills buying at a steady pace.' },
  { cropId: 'tomato', level: 'low', note: 'Supply is currently outpacing demand in nearby markets.' },
  { cropId: 'mustard', level: 'stable', note: 'Prices holding steady with balanced supply.' },
  { cropId: 'chana', level: 'medium', note: 'Dal mills increasing purchases ahead of festival demand.' },
  { cropId: 'maize', level: 'stable', note: 'Feed industry demand is consistent.' },
];

export const myListings: MyListing[] = [
  { id: 'ml1', cropId: 'wheat', quantity: 50, price: 2480, status: 'active' },
  { id: 'ml2', cropId: 'soybean', quantity: 18, price: 4650, status: 'active' },
  { id: 'ml3', cropId: 'chana', quantity: 12, price: 5600, status: 'sold' },
];

export const enquiries: Enquiry[] = [
  { id: 'e1', buyerName: 'Madhav Agro Traders', cropId: 'wheat', quantity: 20, offerPrice: 2460, date: '2026-09-05', status: 'pending' },
  { id: 'e2', buyerName: 'Krishna Cooperative', cropId: 'wheat', quantity: 50, offerPrice: 2500, date: '2026-09-04', status: 'pending' },
  { id: 'e3', buyerName: 'Sehore FPO', cropId: 'soybean', quantity: 18, offerPrice: 4670, date: '2026-09-03', status: 'accepted' },
];

export const priceAlertsSeed: PriceAlert[] = [
  { id: 'pa1', cropId: 'wheat', targetPrice: 2500, preferredMarketId: 'sehore', notifyVia: 'both', status: 'watching' },
  { id: 'pa2', cropId: 'soybean', targetPrice: 4800, preferredMarketId: 'indore', notifyVia: 'app', status: 'watching' },
];
