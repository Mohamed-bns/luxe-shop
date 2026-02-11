'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';

interface SearchBarProps {
  products?: Product[];
}

export default function SearchBar({ products = [] }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim()) {
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) &&
          p.statut !== 'Sold Out'
      );
      setFilteredProducts(filtered.slice(0, 5));
    } else {
      setFilteredProducts([]);
    }
  }, [query, products]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
          isOpen
            ? 'border-[#D4AF37] bg-white shadow-md'
            : 'border-[#D4AF37]/30 bg-transparent'
        }`}
      >
        <span className="text-[#D4AF37]">🔍</span>
        <input
          ref={inputRef}
          type="text"
          placeholder="Rechercher..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="bg-transparent border-none outline-none text-[#043927] placeholder-[#043927]/40 w-32 lg:w-48 text-sm"
        />
      </motion.div>

      {/* Results Dropdown */}
      <AnimatePresence>
        {isOpen && query.trim() && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-[#D4AF37]/20 overflow-hidden z-50"
          >
            {filteredProducts.length > 0 ? (
              <div className="py-2">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/collections?search=${encodeURIComponent(product.name)}`}
                    onClick={() => {
                      setIsOpen(false);
                      setQuery('');
                    }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[#FDFBF7] transition-colors"
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#F5F5F5]">
                      {product.photos.length > 0 ? (
                        <Image
                          src={product.photos[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-[#D4AF37]">✦</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#043927] font-medium text-sm truncate">
                        {product.name}
                      </p>
                      <p className="text-[#D4AF37] font-semibold text-sm">
                        {product.prixPromo && product.prixPromo < product.prix
                          ? product.prixPromo.toFixed(2)
                          : product.prix.toFixed(2)}{' '}
                        DH
                      </p>
                    </div>
                  </Link>
                ))}
                {filteredProducts.length >= 5 && (
                  <Link
                    href={`/collections?search=${encodeURIComponent(query)}`}
                    onClick={() => {
                      setIsOpen(false);
                      setQuery('');
                    }}
                    className="block px-4 py-3 text-center text-[#D4AF37] text-sm font-medium hover:bg-[#FDFBF7] transition-colors border-t border-[#D4AF37]/10"
                  >
                    Voir tous les résultats →
                  </Link>
                )}
              </div>
            ) : (
              <div className="px-4 py-8 text-center">
                <span className="text-3xl">🔍</span>
                <p className="text-[#043927]/50 text-sm mt-2">
                  Aucun produit trouvé
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
