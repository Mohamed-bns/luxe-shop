"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Product } from "@/types";
import { useCartStore } from "@/store/cart";

interface ModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function Modal({ product, onClose }: ModalProps) {
  const addItem = useCartStore((s) => s.addItem);

  if (!product) return null;

  const isUnavailable = product.statut === "Indisponible";

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="relative w-full md:w-1/2 aspect-square bg-gray-100">
                {product.photo ? (
                  <Image
                    src={product.photo}
                    alt={product.nom}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}

                {isUnavailable && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                    Indisponible
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <span className="inline-block bg-emerald-100 text-emerald-900 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {product.categorie}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {product.nom}
                  </h2>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-bold text-emerald-900">
                      {product.prix.toLocaleString("fr-FR")}
                    </span>
                    <span className="text-lg text-amber-600 font-semibold">MAD</span>
                  </div>
                  <div className="border-t border-gray-100 pt-4">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Description & Variantes
                    </h3>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {product.description}
                    </p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: isUnavailable ? 1 : 1.02 }}
                  whileTap={{ scale: isUnavailable ? 1 : 0.98 }}
                  disabled={isUnavailable}
                  onClick={() => {
                    if (!isUnavailable) {
                      addItem(product);
                      onClose();
                    }
                  }}
                  className={`mt-6 w-full py-4 rounded-2xl text-lg font-bold transition-all ${
                    isUnavailable
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-emerald-900 text-white hover:bg-emerald-800 shadow-lg hover:shadow-xl"
                  }`}
                >
                  {isUnavailable ? "Produit Indisponible" : "Ajouter au Panier"}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
