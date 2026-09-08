export type PriceTrend = 'up' | 'down' | 'stable';
export type DemandLevel = 'high' | 'medium' | 'low' | 'stable';
export type QualityGrade = 'A' | 'B' | 'C';
export type UserRole = 'farmer' | 'buyer';
export type Language = 'en' | 'hi' | 'mr';
export type ContactRequestStatus = 'Pending' | 'Approved' | 'Rejected' | 'Resolved';
export type ReviewStatus = 'Pending' | 'Approved' | 'Rejected';

export interface ContactRequest {
  id: string;
  name: string;
  contact: string;
  subject: string;
  message: string;
  date: string;
  status: ContactRequestStatus;
  solution: string;
}

export interface RegisteredUser {
  id: string;
  name: string;
  role: UserRole;
  contact: string;
  status: 'Active' | 'Inactive';
  registrationDate: string;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  review: string;
  rating: number;
  image: string;
  status: ReviewStatus;
}

export interface Crop {
  id: string;
  name: string;
  nameHi: string;
  category: 'Vegetables' | 'Fruits' | 'Grains' | 'Pulses' | 'Oilseeds' | 'Spices';
  unit: string;
  icon: string;
}

export interface Market {
  id: string;
  name: string;
  district: string;
  state: string;
  distanceKm: number;
  lat: number;
  lng: number;
}

export interface MarketPrice {
  id: string;
  cropId: string;
  marketId: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  changePercent: number;
  trend: PriceTrend;
  updatedAt: string;
}

export interface PriceHistoryPoint {
  date: string;
  price: number;
}

export interface ProductListing {
  id: string;
  cropId: string;
  farmerName: string;
  verified: boolean;
  location: string;
  district: string;
  state: string;
  quantity: number;
  quantityUnit: string;
  price: number;
  priceUnit: string;
  harvestDate: string;
  grade: QualityGrade;
  description: string;
  imageColor: string;
  category: Crop['category'];
}

export interface Farmer {
  id: string;
  name: string;
  village: string;
  district: string;
  state: string;
  primaryCrops: string[];
}

export interface Buyer {
  id: string;
  name: string;
  organization: string;
  businessType: string;
  location: string;
}

export interface PriceAlert {
  id: string;
  cropId: string;
  targetPrice: number;
  preferredMarketId: string;
  notifyVia: 'sms' | 'app' | 'both';
  status: 'watching' | 'triggered';
}

export interface MarketRecommendation {
  marketId: string;
  price: number;
  distanceKm: number;
  transportCost: number;
  grossRevenue: number;
  netEarnings: number;
  reason: string;
}

export interface Enquiry {
  id: string;
  buyerName: string;
  cropId: string;
  quantity: number;
  offerPrice: number;
  date: string;
  status: 'pending' | 'accepted' | 'declined';
}

export interface MyListing {
  id: string;
  cropId: string;
  quantity: number;
  price: number;
  status: 'active' | 'sold' | 'paused';
}
