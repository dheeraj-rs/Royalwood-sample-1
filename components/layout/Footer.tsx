import Link from 'next/link';
import { Crown, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="glass mt-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Crown className="h-8 w-8 text-gold" />
              <span className="text-2xl font-bold font-playfair text-gold">Royalwood</span>
            </div>
            <p className="text-gray-300 max-w-xs">
              Crafting luxury furniture that transforms your space into a royal sanctuary.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-gold cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-gold cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-gold cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <div className="space-y-2">
              {['Home', 'Products', 'About Us', 'Contact', 'Blog'].map((link) => (
                <Link
                  key={link}
                  href={`/${link.toLowerCase().replace(' ', '-')}`}
                  className="block text-gray-300 hover:text-gold transition-colors"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
            <div className="space-y-2">
              {['Living Room', 'Bedroom', 'Dining', 'Office', 'Storage'].map((category) => (
                <Link
                  key={category}
                  href={`/products?category=${category.toLowerCase()}`}
                  className="block text-gray-300 hover:text-gold transition-colors"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="h-4 w-4 text-gold flex-shrink-0" />
                <span className="text-sm">123 Luxury Ave, Royal District</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="h-4 w-4 text-gold flex-shrink-0" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="h-4 w-4 text-gold flex-shrink-0" />
                <span className="text-sm">info@royalwood.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Royalwood. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-gold text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-gold text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}