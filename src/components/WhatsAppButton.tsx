'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';

  const defaultMessage = 'Bonjour, j\'ai une question concernant vos produits.';

  const openWhatsApp = () => {
    const message = encodeURIComponent(defaultMessage);
    const url = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-72 bg-white rounded-2xl shadow-2xl border border-[#D4AF37]/20 overflow-hidden"
          >
            <div className="bg-[#043927] px-4 py-3">
              <p className="text-white text-sm font-medium">
                L'équipe Luxe✦Shop
              </p>
            </div>
            <div className="p-4">
              <p className="text-[#043927] text-sm mb-4">
                {defaultMessage}
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={openWhatsApp}
                className="w-full py-3 bg-[#25D366] text-white font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-[#20BD5A] transition-colors"
              >
                <span>💬</span>
                <span>Envoyer un message</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bouton principal */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#25D366] rounded-full shadow-xl flex items-center justify-center text-white text-2xl hover:bg-[#20BD5A] transition-colors"
        aria-label="Ouvrir WhatsApp"
      >
        {isOpen ? '✕' : '💬'}
      </motion.button>
    </div>
  );
}
