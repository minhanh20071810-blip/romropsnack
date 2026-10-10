export type ProductCategory = 'all' | 'basic' | 'regional' | 'halloween';

export interface Product {
  id: string;
  name: string;
  line: 'basic' | 'regional' | 'halloween';
  lineLabel: string;
  tag: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  crispiness: number; // 1 to 5
  flavorNotes: string;
  spec: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  packagingTheme: {
    bg: string;
    border: string;
    accent: string;
    gradient: string;
    tagBg: string;
    tagText: string;
  };
  image?: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface StoreLocation {
  id: string;
  name: string;
  tag: string;
  city: 'hcm' | 'hanoi' | 'danang' | 'cantho';
  cityName: string;
  district: string;
  address: string;
  hours: string;
  phone: string;
  isFlagship?: boolean;
  services: string[];
  lat: number;
  lng: number;
}

export interface JobOpening {
  id: string;
  title: string;
  department: 'ecommerce' | 'production' | 'sales' | 'design' | 'finance';
  deptLabel: string;
  type: string;
  salary: string;
  location: string;
  summary: string;
  requirements: string[];
  benefits: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user' | 'agent';
  agentName?: string;
  text: string;
  timestamp: string;
  suggestedProductIds?: string[];
}
