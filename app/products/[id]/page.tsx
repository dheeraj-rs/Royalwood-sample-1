'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Check,
  Minus,
  Plus
} from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ProductDetailPage() {
  const params = useParams();
  const { addItem } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === params.id);

  if (!product) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Product Not Found</h1>
          <Link href="/products">
            <Button className="btn-primary">Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleAddToCart = () => {
    addItem(product, quantity, selectedColor);
  };

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-gold">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-gold">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-white">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-square glass-card p-4 overflow-hidden">
              <Image
                src={product.images[currentImageIndex]}
                alt={product.name}
                fill
                className="object-cover rounded-xl"
              />
              
              {/* Image Navigation */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 glass w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5 text-white" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 glass w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <ChevronRight className="h-5 w-5 text-white" />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-6 left-6 flex flex-col space-y-2">
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

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden ${
                      index === currentImageIndex ? 'ring-2 ring-gold' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gold font-medium">{product.category}</span>
                <div className="flex items-center space-x-2">
                  <Button size="icon" variant="ghost" className="hover:bg-white/10">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="ghost" className="hover:bg-white/10">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold font-playfair text-white mb-4">
                {product.name}
              </h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? 'text-gold fill-current' : 'text-gray-400'
                      }`}
                    />
                  ))}
                  <span className="text-white font-semibold ml-2">{product.rating}</span>
                </div>
                <span className="text-gray-400">({product.reviews} reviews)</span>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-gold">
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div>
                <h3 className="text-white font-semibold mb-3">Available Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        selectedColor === color
                          ? 'border-gold bg-gold/20 text-gold'
                          : 'border-white/20 text-gray-300 hover:border-gold/50'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-white font-semibold mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center glass rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-white/10 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 text-white font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-white/10 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-gray-400">
                  Total: ${(product.price * quantity).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="btn-primary flex-1"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              <Button className="btn-secondary">
                Buy Now
              </Button>
            </div>

            {/* Features */}
            <div className="glass-card p-6">
              <h3 className="text-white font-semibold mb-4">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3 text-gray-300">
                    <Check className="h-4 w-4 text-gold flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="glass-card p-4 text-center">
                <Truck className="h-8 w-8 text-gold mx-auto mb-2" />
                <h4 className="text-white font-semibold mb-1">Free Delivery</h4>
                <p className="text-gray-400 text-sm">On orders over $2,000</p>
              </div>
              <div className="glass-card p-4 text-center">
                <Shield className="h-8 w-8 text-gold mx-auto mb-2" />
                <h4 className="text-white font-semibold mb-1">5 Year Warranty</h4>
                <p className="text-gray-400 text-sm">Full coverage included</p>
              </div>
              <div className="glass-card p-4 text-center">
                <RotateCcw className="h-8 w-8 text-gold mx-auto mb-2" />
                <h4 className="text-white font-semibold mb-1">30 Day Returns</h4>
                <p className="text-gray-400 text-sm">Hassle-free returns</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16"
        >
          <Tabs defaultValue="details" className="glass-card p-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="mt-6">
              <div className="prose prose-invert max-w-none">
                <h3 className="text-xl font-semibold text-white mb-4">Product Details</h3>
                <p className="text-gray-300 mb-4">
                  {product.description}
                </p>
                <p className="text-gray-300">
                  This piece represents the pinnacle of luxury furniture craftsmanship, 
                  combining traditional techniques with modern design sensibilities. 
                  Each item is carefully handcrafted by master artisans using only the 
                  finest materials sourced from around the world.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Dimensions</h4>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex justify-between">
                      <span>Width:</span>
                      <span>{product.dimensions.width}cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Height:</span>
                      <span>{product.dimensions.height}cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Depth:</span>
                      <span>{product.dimensions.depth}cm</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Materials</h4>
                  <div className="space-y-2">
                    {product.materials.map((material, index) => (
                      <div key={index} className="flex items-center space-x-2 text-gray-300">
                        <Check className="h-4 w-4 text-gold" />
                        <span>{material}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-white">Customer Reviews</h4>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating) ? 'text-gold fill-current' : 'text-gray-400'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-white font-semibold">{product.rating}</span>
                    <span className="text-gray-400">({product.reviews} reviews)</span>
                  </div>
                </div>
                
                {/* Sample Reviews */}
                <div className="space-y-4">
                  <div className="glass border border-white/10 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                          <span className="text-gold font-semibold text-sm">JD</span>
                        </div>
                        <span className="text-white font-medium">John Doe</span>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 text-gold fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Absolutely stunning piece! The craftsmanship is exceptional and it looks 
                      even better in person. Worth every penny.
                    </p>
                  </div>
                  
                  <div className="glass border border-white/10 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                          <span className="text-gold font-semibold text-sm">MS</span>
                        </div>
                        <span className="text-white font-medium">Maria Smith</span>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-3 w-3 ${i < 4 ? 'text-gold fill-current' : 'text-gray-400'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Beautiful furniture with excellent attention to detail. Delivery was 
                      prompt and the setup service was very professional.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}