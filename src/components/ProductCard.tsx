'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const displayPrice = product.prixPromo && product.prixPromo < product.prix 
    ? product.prixPromo 
    : product.prix;
  const hasDiscount = product.prixPromo && product.prixPromo < product.prix;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(4, 57, 39, 0.15)' }}
      onClick={() => onClick(product)}
      className="bg-white rounded-2xl overflow-hidden cursor-pointer shadow-sm border border-[#043927]/5 group"
    >
      <div className="relative aspect-square overflow-hidden">
        {product.photos.length > 0 ? (
          <Image
            src={product.photos[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-[#F5F5F5] flex items-center justify-center">
            <span className="text-[#043927]/30 text-4xl">✦</span>
          </div>
        )}
        
        {product.statut === 'Sold Out' && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-[#043927] px-6 py-2 rounded-full font-medium tracking-wider">
              SOLD OUT
            </span>
          </div>
        )}
        
        {hasDiscount && product.statut !== 'Sold Out' && (
          <div className="absolute top-4 left-4 bg-[#D4AF37] text-white px-3 py-1 rounded-full text-xs font-medium">
            -{Math.round((1 - product.prixPromo! / product.prix) * 100)}%
          </div>
        )}
      </div>

      <div className="p-6">
        <p className="text-xs text-[#043927]/50 uppercase tracking-wider mb-2">
          {product.categorie}
        </p>
        <h3 className="text-lg font-semibold text-[#043927] mb-2 line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-[#043927]">
            {displayPrice.toFixed(2)} DH
          </span>
          {hasDiscount && (
            <span className="text-sm text-[#043927]/40 line-through">
              {product.prix.toFixed(2)} DH
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
