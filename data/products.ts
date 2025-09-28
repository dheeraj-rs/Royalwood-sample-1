import { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Royal Executive Desk',
    price: 2899,
    originalPrice: 3499,
    category: 'Office',
    description: 'Handcrafted executive desk with premium mahogany finish and gold accents. Perfect for the modern executive office.',
    images: [
      'https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    features: ['Premium mahogany wood', 'Gold-plated hardware', 'Built-in cable management', 'Soft-close drawers'],
    dimensions: { width: 180, height: 75, depth: 90 },
    materials: ['Mahogany', 'Brass', 'Leather'],
    inStock: true,
    rating: 4.8,
    reviews: 124,
    colors: ['Dark Mahogany', 'Natural Oak', 'Black Walnut'],
    isNew: true,
    isFeatured: true
  },
  {
    id: '2',
    name: 'Luxury Dining Set',
    price: 4599,
    category: 'Dining',
    description: 'Elegant 8-seater dining set with marble top table and velvet upholstered chairs.',
    images: [
      'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    features: ['Italian marble top', 'Velvet upholstery', 'Solid wood frame', 'Anti-scratch coating'],
    dimensions: { width: 240, height: 75, depth: 110 },
    materials: ['Marble', 'Velvet', 'Oak'],
    inStock: true,
    rating: 4.9,
    reviews: 87,
    colors: ['Emerald Green', 'Royal Blue', 'Deep Purple'],
    isFeatured: true
  },
  {
    id: '3',
    name: 'Premium Sofa Collection',
    price: 3299,
    originalPrice: 3899,
    category: 'Living Room',
    description: 'Luxurious 3-seater sofa with genuine leather upholstery and brass studs detailing.',
    images: [
      'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    features: ['Genuine leather', 'Hardwood frame', 'High-density foam', 'Brass detailing'],
    dimensions: { width: 220, height: 85, depth: 95 },
    materials: ['Leather', 'Hardwood', 'Brass'],
    inStock: true,
    rating: 4.7,
    reviews: 156,
    colors: ['Cognac Brown', 'Midnight Black', 'Rich Burgundy'],
    isNew: true
  },
  {
    id: '4',
    name: 'King Size Bedroom Set',
    price: 5299,
    category: 'Bedroom',
    description: 'Complete luxury bedroom set with tufted headboard, matching nightstands, and dresser.',
    images: [
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    features: ['Tufted headboard', 'Solid wood construction', 'Soft-close drawers', 'LED strip lighting'],
    dimensions: { width: 200, height: 120, depth: 220 },
    materials: ['Oak', 'Velvet', 'LED'],
    inStock: false,
    rating: 4.6,
    reviews: 93,
    colors: ['Cream White', 'Charcoal Grey', 'Navy Blue'],
    isFeatured: true
  },
  {
    id: '5',
    name: 'Executive Bookshelf',
    price: 1899,
    category: 'Office',
    description: 'Towering bookshelf with adjustable shelves and integrated lighting system.',
    images: [
      'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2177482/pexels-photo-2177482.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    features: ['Adjustable shelves', 'LED lighting', 'Cable management', 'Anti-tip system'],
    dimensions: { width: 120, height: 240, depth: 35 },
    materials: ['Walnut', 'Glass', 'LED'],
    inStock: true,
    rating: 4.5,
    reviews: 67,
    colors: ['Dark Walnut', 'Light Oak', 'White Oak']
  },
  {
    id: '6',
    name: 'Luxury Coffee Table',
    price: 1299,
    originalPrice: 1599,
    category: 'Living Room',
    description: 'Statement coffee table with glass top and gold-finished metal frame.',
    images: [
      'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    features: ['Tempered glass top', 'Gold-plated frame', 'Geometric design', 'Easy assembly'],
    dimensions: { width: 120, height: 45, depth: 60 },
    materials: ['Glass', 'Steel', 'Gold plating'],
    inStock: true,
    rating: 4.4,
    reviews: 45,
    colors: ['Gold', 'Silver', 'Bronze'],
    isNew: true
  }
];

export const categories = [
  'All',
  'Office',
  'Living Room', 
  'Bedroom',
  'Dining',
  'Storage'
];

export const materials = [
  'Mahogany',
  'Oak',
  'Walnut',
  'Leather',
  'Velvet',
  'Marble',
  'Glass',
  'Brass',
  'Steel'
];

export const colors = [
  'Dark Mahogany',
  'Natural Oak',
  'Black Walnut',
  'Cognac Brown',
  'Midnight Black',
  'Emerald Green',
  'Royal Blue',
  'Cream White',
  'Charcoal Grey'
];