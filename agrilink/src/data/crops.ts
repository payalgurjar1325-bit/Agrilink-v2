import { Crop } from '../types';

export const crops: Crop[] = [
  { id: 'wheat', name: 'Wheat', nameHi: 'गेहूं', category: 'Grains', unit: 'Quintal', icon: '🌾' },
  { id: 'rice', name: 'Rice', nameHi: 'चावल', category: 'Grains', unit: 'Quintal', icon: '🍚' },
  { id: 'soybean', name: 'Soybean', nameHi: 'सोयाबीन', category: 'Oilseeds', unit: 'Quintal', icon: '🫘' },
  { id: 'onion', name: 'Onion', nameHi: 'प्याज', category: 'Vegetables', unit: 'Quintal', icon: '🧅' },
  { id: 'tomato', name: 'Tomato', nameHi: 'टमाटर', category: 'Vegetables', unit: 'Quintal', icon: '🍅' },
  { id: 'potato', name: 'Potato', nameHi: 'आलू', category: 'Vegetables', unit: 'Quintal', icon: '🥔' },
  { id: 'maize', name: 'Maize', nameHi: 'मक्का', category: 'Grains', unit: 'Quintal', icon: '🌽' },
  { id: 'mustard', name: 'Mustard', nameHi: 'सरसों', category: 'Oilseeds', unit: 'Quintal', icon: '🌱' },
  { id: 'chana', name: 'Chana (Gram)', nameHi: 'चना', category: 'Pulses', unit: 'Quintal', icon: '🟤' },
  { id: 'turmeric', name: 'Turmeric', nameHi: 'हल्दी', category: 'Spices', unit: 'Quintal', icon: '🟡' },
  { id: 'mango', name: 'Mango', nameHi: 'आम', category: 'Fruits', unit: 'Quintal', icon: '🥭' },
  { id: 'cotton', name: 'Cotton', nameHi: 'कपास', category: 'Grains', unit: 'Quintal', icon: '☁️' },
];

export const getCropById = (id: string) => crops.find((c) => c.id === id);
