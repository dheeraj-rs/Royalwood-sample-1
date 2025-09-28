'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center glass-card p-12 max-w-md mx-auto">
          <ShoppingBag className="h-16 w-16 text-gold mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
          <p className="text-gray-400 mb-6">
            Discover our luxury furniture collection and add items to your cart.
          </p>
          <Link href="/products">
            <Button className="btn-primary">
              Start Shopping
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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
            Shopping <span className="text-gold">Cart</span>
          </h1>
          <p className="text-xl text-gray-300">
            {items.length} item{items.length !== 1 ? 's' : ''} in your cart
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Cart Items</h2>
              <Button
                variant="ghost"
                onClick={clearCart}
                className="text-red-400 hover:text-red-300"
              >
                Clear All
              </Button>
            </div>

            {items.map((item, index) => (
              <motion.div
                key={`${item.product.id}-${item.selectedColor}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 flex flex-col sm:flex-row gap-4"
              >
                {/* Product Image */}
                <div className="relative w-full sm:w-32 aspect-square rounded-xl overflow-hidden">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-white">{item.product.name}</h3>
                      <p className="text-gold font-medium">{item.product.category}</p>
                      {item.selectedColor && (
                        <p className="text-sm text-gray-400">Color: {item.selectedColor}</p>
                      )}
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeItem(item.product.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-xl font-bold text-gold">
                      ${item.product.price.toLocaleString()}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2 glass rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 hover:bg-white/10 transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-3 py-1 text-white font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 hover:bg-white/10 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right text-lg font-bold text-white">
                    Subtotal: ${(item.product.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card p-6 h-fit"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal:</span>
                <span>${getTotalPrice().toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Shipping:</span>
                <span>{getTotalPrice() > 2000 ? 'Free' : '$199'}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Tax:</span>
                <span>${Math.round(getTotalPrice() * 0.08).toLocaleString()}</span>
              </div>
              <div className="border-t border-white/20 pt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span className="text-white">Total:</span>
                  <span className="text-gold">
                    ${(
                      getTotalPrice() +
                      (getTotalPrice() > 2000 ? 0 : 199) +
                      Math.round(getTotalPrice() * 0.08)
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Button className="w-full btn-primary">
                Proceed to Checkout
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Link href="/products">
                <Button variant="ghost" className="w-full text-gray-300 hover:text-white">
                  Continue Shopping
                </Button>
              </Link>
            </div>

            {/* Benefits */}
            <div className="mt-8 pt-6 border-t border-white/20 space-y-3 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <span>Free delivery on orders over $2,000</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <span>5-year warranty included</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <span>Professional assembly service</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}