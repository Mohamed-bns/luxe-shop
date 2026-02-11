'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartItem, Product } from '@/types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export default function Cart({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const total = items.reduce((sum, item) => {
    const price = item.product.prixPromo && item.product.prixPromo < item.product.prix
      ? item.product.prixPromo
      : item.product.prix;
    return sum + price * item.quantity;
  }, 0);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#043927]/10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#043927]">
                  Panier <span className="text-[#D4AF37]">✦</span>
                </h2>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center hover:bg-[#043927]/10 transition-colors"
                >
                  ✕
                </button>
              </div>
              <p className="text-sm text-[#043927]/50 mt-1">
                {isClient ? itemCount : 0} article{itemCount !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <span className="text-6xl text-[#043927]/20 mb-4">✦</span>
                  <p className="text-[#043927]/50">Votre panier est vide</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => {
                    const price = item.product.prixPromo && item.product.prixPromo < item.product.prix
                      ? item.product.prixPromo
                      : item.product.prix;
                    
                    return (
                      <motion.div
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="flex gap-4 p-4 bg-[#F5F5F5] rounded-xl"
                      >
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-white flex-shrink-0">
                          {item.product.photos.length > 0 && (
                            <img
                              src={item.product.photos[0]}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-[#043927] truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-sm text-[#043927]/50">
                            {price.toFixed(2)} DH
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, Math.max(0, item.quantity - 1))}
                              className="w-8 h-8 rounded-lg bg-white flex items-center justify-center hover:bg-[#043927]/10 transition-colors"
                            >
                              −
                            </button>
                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              disabled={item.quantity >= item.product.quantite}
                              className="w-8 h-8 rounded-lg bg-white flex items-center justify-center hover:bg-[#043927]/10 transition-colors disabled:opacity-50"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-[#043927]/40 hover:text-red-500 transition-colors self-start"
                        >
                          ✕
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[#043927]/10 bg-[#F5F5F5]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#043927]/60">Total</span>
                  <span className="text-2xl font-bold text-[#043927]">
                    {total.toFixed(2)} DH
                  </span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={onCheckout}
                  className="w-full py-4 bg-[#043927] text-white rounded-xl font-medium text-lg hover:bg-[#043927]/90 transition-colors shadow-lg"
                >
                  Commander →
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
