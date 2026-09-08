import { Market } from '../types';

export const states = ['Madhya Pradesh', 'Maharashtra'];

export const districtsByState: Record<string, string[]> = {
  'Madhya Pradesh': [...new Set([
    'Bhopal', 'Sehore', 'Indore', 'Ujjain', 'Vidisha', 'Narmadapuram', 'Raisen', 'Dewas',
  ])],
  Maharashtra: [
    'Mumbai City', 'Mumbai Suburban', 'Pune', 'Thane', 'Nashik', 'Nagpur',
    'Aurangabad/Chhatrapati Sambhajinagar', 'Kolhapur', 'Satara', 'Sangli', 'Solapur',
    'Ahmednagar/Ahilyanagar', 'Jalgaon', 'Dhule', 'Nandurbar', 'Raigad', 'Ratnagiri', 'Sindhudurg',
    'Palghar', 'Amravati', 'Akola', 'Washim', 'Buldhana', 'Yavatmal', 'Wardha',
    'Bhandara', 'Gondia', 'Chandrapur', 'Gadchiroli', 'Latur', 'Nanded', 'Hingoli',
    'Parbhani', 'Beed', 'Osmanabad/Dharashiv',
  ],
};

export const markets: Market[] = [
  { id: 'bhopal', name: 'Bhopal Mandi', district: 'Bhopal', state: 'Madhya Pradesh', distanceKm: 12, lat: 23.2599, lng: 77.4126 },
  { id: 'sehore', name: 'Sehore Mandi', district: 'Sehore', state: 'Madhya Pradesh', distanceKm: 41, lat: 23.2, lng: 77.08 },
  { id: 'indore', name: 'Indore Mandi', district: 'Indore', state: 'Madhya Pradesh', distanceKm: 189, lat: 22.7196, lng: 75.8577 },
  { id: 'ujjain', name: 'Ujjain Mandi', district: 'Ujjain', state: 'Madhya Pradesh', distanceKm: 55, lat: 23.1793, lng: 75.7849 },
  { id: 'vidisha', name: 'Vidisha Mandi', district: 'Vidisha', state: 'Madhya Pradesh', distanceKm: 58, lat: 23.5251, lng: 77.8081 },
  { id: 'hoshangabad', name: 'Hoshangabad Mandi', district: 'Narmadapuram', state: 'Madhya Pradesh', distanceKm: 66, lat: 22.75, lng: 77.72 },
  { id: 'raisen', name: 'Raisen Mandi', district: 'Raisen', state: 'Madhya Pradesh', distanceKm: 47, lat: 23.33, lng: 77.79 },
  { id: 'dewas', name: 'Dewas Mandi', district: 'Dewas', state: 'Madhya Pradesh', distanceKm: 148, lat: 22.9676, lng: 76.0534 },
];

export const getMarketById = (id: string) => markets.find((m) => m.id === id);
