// Service layer for the farmer-to-buyer marketplace.
// Backed by local mock data today; swap internals for real backend calls later.

import { productListings } from '../data/marketplace';
import { getCropById } from '../data/crops';
import { ProductListing, Crop } from '../types';

const delay = <T,>(value: T, ms = 150): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

export interface EnrichedListing extends ProductListing {
  crop: Crop;
}

export interface ListingFilters {
  search?: string;
  category?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  minQuantity?: number;
  sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'quantity-desc';
}

let localListings: ProductListing[] = [...productListings];

export async function fetchListings(filters: ListingFilters = {}): Promise<EnrichedListing[]> {
  let results = [...localListings];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    results = results.filter((l) => {
      const crop = getCropById(l.cropId);
      return (
        crop?.name.toLowerCase().includes(q) ||
        l.farmerName.toLowerCase().includes(q) ||
        l.location.toLowerCase().includes(q)
      );
    });
  }
  if (filters.category) {
    results = results.filter((l) => l.category === filters.category);
  }
  if (filters.location) {
    const q = filters.location.toLowerCase();
    results = results.filter(
      (l) => l.district.toLowerCase().includes(q) || l.location.toLowerCase().includes(q)
    );
  }
  if (filters.minPrice !== undefined) {
    results = results.filter((l) => l.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    results = results.filter((l) => l.price <= filters.maxPrice!);
  }
  if (filters.minQuantity !== undefined) {
    results = results.filter((l) => l.quantity >= filters.minQuantity!);
  }

  switch (filters.sortBy) {
    case 'price-asc':
      results.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      results.sort((a, b) => b.price - a.price);
      break;
    case 'quantity-desc':
      results.sort((a, b) => b.quantity - a.quantity);
      break;
    case 'newest':
    default:
      results.sort((a, b) => new Date(b.harvestDate).getTime() - new Date(a.harvestDate).getTime());
  }

  const enriched = results
    .map((l) => {
      const crop = getCropById(l.cropId);
      if (!crop) return null;
      return { ...l, crop };
    })
    .filter((x): x is EnrichedListing => x !== null);

  return delay(enriched);
}

export async function fetchListingById(id: string): Promise<EnrichedListing | undefined> {
  const listing = localListings.find((l) => l.id === id);
  if (!listing) return delay(undefined);
  const crop = getCropById(listing.cropId);
  if (!crop) return delay(undefined);
  return delay({ ...listing, crop });
}

export async function publishListing(listing: Omit<ProductListing, 'id'>): Promise<ProductListing> {
  const newListing: ProductListing = { ...listing, id: `l${Date.now()}` };
  localListings = [newListing, ...localListings];
  return delay(newListing, 400);
}
