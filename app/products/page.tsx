'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid2x2 as Grid, List, Star, ShoppingCart, Eye, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { products, categories, materials, colors } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

export default function ProductsPage() {
  const { addItem } = useCart();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 6000]);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Search query filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      // Materials filter
      if (selectedMaterials.length > 0 && 
          !selectedMaterials.some(material => product.materials.includes(material))) {
        return false;
      }

      // Colors filter
      if (selectedColors.length > 0 && 
          !selectedColors.some(color => product.colors.includes(color))) {
        return false;
      }

      // Price range filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      // In stock filter
      if (showInStockOnly && !product.inStock) {
        return false;
      }

      return true;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedMaterials, selectedColors, priceRange, showInStockOnly, sortBy]);

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-white mb-4">
            Luxury <span className="text-gold">Collection</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover our complete range of handcrafted premium furniture
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-80 glass-card p-6 h-fit"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Filter className="h-5 w-5 mr-2 text-gold" />
              Filters
            </h3>

            {/* Search */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-300 mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 glass border-white/20"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-300 mb-3 block">Category</label>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category
                        ? 'bg-gold/20 text-gold border border-gold/30'
                        : 'text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-300 mb-3 block">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <Slider
                value={priceRange}
                onValueChange={(value) => setPriceRange([value[0], value[1]])}
                max={6000}
                step={100}
                className="mt-2"
              />
            </div>

            {/* Materials */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-300 mb-3 block">Materials</label>
              <div className="space-y-2">
                {materials.map((material) => (
                  <div key={material} className="flex items-center space-x-2">
                    <Checkbox
                      id={material}
                      checked={selectedMaterials.includes(material)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedMaterials([...selectedMaterials, material]);
                        } else {
                          setSelectedMaterials(selectedMaterials.filter(m => m !== material));
                        }
                      }}
                    />
                    <label htmlFor={material} className="text-sm text-gray-300">
                      {material}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* In Stock Only */}
            <div className="mb-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="inStock"
                  checked={showInStockOnly}
                  onCheckedChange={setShowInStockOnly}
                />
                <label htmlFor="inStock" className="text-sm text-gray-300">
                  In stock only
                </label>
              </div>
            </div>
          </motion.aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="glass-card p-4 mb-8"
            >
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-300">
                    {filteredProducts.length} products found
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="glass px-3 py-2 rounded-lg border border-white/20 text-white bg-transparent"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>

                  {/* View Mode */}
                  <div className="flex items-center space-x-1 glass rounded-lg p-1">
                    <Button
                      size="sm"
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      onClick={() => setViewMode('list')}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Products */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={viewMode === 'grid' ? 
                'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 
                'space-y-6'
              }
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group glass-card hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden ${
                    viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''
                  }`}
                >
                  {/* Product Image */}
                  <div className={`relative overflow-hidden rounded-xl ${
                    viewMode === 'list' ? 'sm:w-64 aspect-square sm:aspect-[4/3]' : 'aspect-[4/3]'
                  } mb-4 ${viewMode === 'list' ? 'sm:mb-0 sm:mr-6' : ''}`}>
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                      <Button size="icon" variant="secondary" className="glass">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Link href={`/products/${product.id}`}>
                        <Button size="icon" variant="secondary" className="glass">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col space-y-2">
                      {product.isNew && (
                        <Badge className="bg-gold text-black font-semibold">New</Badge>
                      )}
                      {product.originalPrice && (
                        <Badge variant="destructive">
                          {Math.round((1 - product.price / product.originalPrice) * 100)}% Off
                        </Badge>
                      )}
                      {!product.inStock && (
                        <Badge variant="secondary">Out of Stock</Badge>
                      )}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className={`space-y-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gold font-medium">{product.category}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-gold fill-current" />
                          <span className="text-sm text-gray-300">{product.rating}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-gold transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-gold">
                          ${product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">
                            ${product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-400">
                        {product.reviews} reviews
                      </span>
                    </div>

                    {/* Add to Cart Button */}
                    <Button 
                      onClick={() => addItem(product)}
                      disabled={!product.inStock}
                      className="w-full btn-primary"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* No products found */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl text-gray-600 mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
                <p className="text-gray-400">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}