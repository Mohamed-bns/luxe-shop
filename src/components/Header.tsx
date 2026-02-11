'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from './SearchBar';
import { Product } from '@/types';

interface HeaderProps {
  onCartClick: () => void;
  cartItemCount: number;
  products?: Product[];
}

export default function Header({ onCartClick, cartItemCount, products = [] }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/boutique', label: 'La Sélection' },
    { href: '/contact', label: 'Contactez-nous' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#FDFBF7]/95 backdrop-blur-md shadow-lg border-b border-[#D4AF37]/20'
          : 'bg-[#FDFBF7]'
      }`}
    >
      {/* Top bar dorée */}
      <div className="h-1 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37]" />

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2"
            >
              <span className="text-3xl font-bold text-[#043927] tracking-tight">
                Luxe<span className="text-[#D4AF37]">✦</span>Shop
              </span>
            </motion.div>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <motion.span
                  whileHover={{ y: -2 }}
                  className="text-[#043927] font-medium text-sm tracking-wide uppercase hover:text-[#D4AF37] transition-colors duration-300"
                >
                  {link.label}
                </motion.span>
              </Link>
            ))}
          </nav>

          {/* Actions Droite */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden md:block">
              <SearchBar products={products} />
            </div>

            {/* Cart Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCartClick}
              className="relative p-2 rounded-full bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 transition-colors"
            >
              <span className="text-xl">🛒</span>
              {cartItemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-[#D4AF37] text-white text-xs rounded-full flex items-center justify-center font-medium"
                >
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </motion.span>
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2"
            >
              <span className="text-2xl">
                {isMobileMenuOpen ? '✕' : '☰'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 border-t border-[#D4AF37]/20">
                <div className="mb-4 md:hidden">
                  <SearchBar products={products} />
                </div>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-[#043927] font-medium text-lg hover:text-[#D4AF37] transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
