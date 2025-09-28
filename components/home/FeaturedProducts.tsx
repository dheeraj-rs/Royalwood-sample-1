'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingCart, Eye, Heart } from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function FeaturedProducts() {
  const { addItem } = useCart();
  const featuredProducts = products.filter(product => product.isFeatured).slice(0, 3);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-playfair text-white mb-4">
            Featured <span className="text-gold">Collection</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Handpicked luxury pieces that define elegance and sophistication
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group glass-card hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-6">
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
                </div>

                {/* Quick Add to Cart */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <Button 
                    onClick={() => addItem(product)}
                    className="w-full btn-primary"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Quick Add
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-4">
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
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/products">
            <Button className="btn-primary text-lg px-12 py-4">
              View All Products
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}