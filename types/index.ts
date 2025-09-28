export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  description: string;
  images: string[];
  features: string[];
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  materials: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
  colors: string[];
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface FilterOptions {
  category?: string;
  priceRange?: [number, number];
  materials?: string[];
  colors?: string[];
  inStock?: boolean;
}