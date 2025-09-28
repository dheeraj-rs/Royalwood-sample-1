'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Crown, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/80" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-4 h-4 bg-gold/30 rounded-full blur-sm"
        />
        <motion.div
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-3/4 right-1/4 w-6 h-6 bg-gold/20 rounded-full blur-sm"
        />
        <motion.div
          animate={{ y: [-10, 30, -10] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 right-1/3 w-3 h-3 bg-gold/40 rounded-full blur-sm"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="glass-card max-w-4xl mx-auto p-8 md:p-12 animate-glow"
        >
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-flex items-center space-x-2 bg-gold/20 backdrop-blur-sm px-4 py-2 rounded-full border border-gold/30 mb-6"
          >
            <Crown className="h-4 w-4 text-gold" />
            <span className="text-gold font-medium text-sm">Premium Collection 2024</span>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 text-gold fill-current" />
              ))}
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-playfair text-white leading-tight mb-6"
          >
            Luxury Furniture
            <br />
            <span className="text-gold">Redefined</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Discover our handcrafted collection that transforms your space into a 
            <span className="text-gold font-semibold"> royal sanctuary</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/products">
              <Button className="btn-primary group min-w-[200px]">
                Explore Collection
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Button className="btn-secondary min-w-[200px]">
              Watch Craftsmanship
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20"
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gold mb-2">10K+</div>
              <div className="text-gray-400 text-sm">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gold mb-2">500+</div>
              <div className="text-gray-400 text-sm">Luxury Pieces</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gold mb-2">15+</div>
              <div className="text-gray-400 text-sm">Years Experience</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-8 bg-gradient-to-b from-gold to-transparent rounded-full"
          />
        </motion.div>
      </div>
    </section>
  );
}