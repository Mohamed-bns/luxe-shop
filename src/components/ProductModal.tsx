'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Product } from '@/types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const displayPrice = product.prixPromo && product.prixPromo < product.prix 
    ? product.prixPromo 
    : product.prix;
  const hasDiscount = product.prixPromo && product.prixPromo < product.prix;
  const maxQuantity = Math.min(product.quantite, 10);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.photos.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.photos.length - 1 ? 0 : prev + 1
    );
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
          >
            ✕
          </button>

          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Image Carousel */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#F5F5F5]">
              {product.photos.length > 0 ? (
                <>
                  <Image
                    src={product.photos[currentImageIndex]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  {product.photos.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                      >
                        ←
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                      >
                        →
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {product.photos.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full ${
                              index === currentImageIndex ? 'bg-[#043927]' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-[#043927]/30 text-6xl">✦</span>
                </div>
              )}
              
              {product.statut === 'Sold Out' && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="bg-white text-[#043927] px-8 py-3 rounded-full font-medium tracking-wider text-lg">
                    SOLD OUT
                  </span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <p className="text-sm text-[#043927]/50 uppercase tracking-wider mb-2">
                {product.categorie}
              </p>
              <h2 className="text-3xl font-bold text-[#043927] mb-4">
                {product.name}
              </h2>
              
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-[#043927]">
                  {displayPrice.toFixed(2)} DH
                </span>
                {hasDiscount && (
                  <span className="text-xl text-[#043927]/40 line-through">
                    {product.prix.toFixed(2)} DH
                  </span>
                )}
              </div>

              <p className="text-[#043927]/70 leading-relaxed mb-6">
                {product.description}
              </p>

              {product.couleur && (
                <p className="text-sm text-[#043927]/60 mb-4">
                  <span className="font-medium">Couleur:</span> {product.couleur}
                </p>
              )}

              <p className="text-sm text-[#043927]/60 mb-6">
                <span className="font-medium">Disponibilité:</span>{' '}
                {product.statut === 'Sold Out' ? (
                  <span className="text-red-500">Rupture de stock</span>
                ) : (
                  `${product.quantite} en stock`
                )}
              </p>

              {product.statut !== 'Sold Out' && (
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center border border-[#043927]/20 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-[#F5F5F5] transition-colors"
                    >
                      −
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
                      className="px-4 py-2 hover:bg-[#F5F5F5] transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-auto">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToCart}
                  disabled={product.statut === 'Sold Out'}
                  className={`w-full py-4 rounded-xl font-medium text-lg transition-all ${
                    product.statut === 'Sold Out'
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-[#043927] text-white hover:bg-[#043927]/90 shadow-lg'
                  }`}
                >
                  {product.statut === 'Sold Out' ? 'Rupture de stock' : 'Ajouter au panier'}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
