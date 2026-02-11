'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CartItem, CustomerInfo } from '@/types';

interface CheckoutFormProps {
  items: CartItem[];
  onClose: () => void;
  onSubmit: (info: CustomerInfo) => void;
}

export default function CheckoutForm({ items, onClose, onSubmit }: CheckoutFormProps) {
  const [formData, setFormData] = useState<CustomerInfo>({
    nom: '',
    prenom: '',
    adresse: '',
    telephone: '',
    feedback: '',
  });

  const [errors, setErrors] = useState<Partial<CustomerInfo>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<CustomerInfo> = {};

    if (!formData.nom.trim()) newErrors.nom = 'Nom requis';
    if (!formData.prenom.trim()) newErrors.prenom = 'Prénom requis';
    if (!formData.adresse.trim()) newErrors.adresse = 'Adresse requise';
    if (!formData.telephone.trim()) {
      newErrors.telephone = 'Téléphone requis';
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.telephone.replace(/\s/g, ''))) {
      newErrors.telephone = 'Numéro invalide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CustomerInfo]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const total = items.reduce((sum, item) => {
    const price = item.product.prixPromo && item.product.prixPromo < item.product.prix
      ? item.product.prixPromo
      : item.product.prix;
    return sum + price * item.quantity;
  }, 0);

  return (
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
        className="relative bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
        >
          ✕
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-[#043927] mb-2">
            Finaliser la commande
          </h2>
          <p className="text-[#043927]/50 mb-6">
            Paiement à la livraison
          </p>

          {/* Order Summary */}
          <div className="bg-[#F5F5F5] rounded-xl p-4 mb-6">
            <div className="flex justify-between text-sm text-[#043927]/60 mb-2">
              <span>{items.length} article{items.length !== 1 ? 's' : ''}</span>
              <span className="font-medium text-[#043927]">{total.toFixed(2)} DH</span>
            </div>
            <div className="flex justify-between font-bold text-[#043927]">
              <span>Total</span>
              <span>{total.toFixed(2)} DH</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#043927]/70 mb-1">
                  Nom *
                </label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.nom ? 'border-red-400' : 'border-[#043927]/20'
                  } focus:outline-none focus:border-[#043927] transition-colors`}
                  placeholder="Nom"
                />
                {errors.nom && (
                  <p className="text-red-500 text-xs mt-1">{errors.nom}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-[#043927]/70 mb-1">
                  Prénom *
                </label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.prenom ? 'border-red-400' : 'border-[#043927]/20'
                  } focus:outline-none focus:border-[#043927] transition-colors`}
                  placeholder="Prénom"
                />
                {errors.prenom && (
                  <p className="text-red-500 text-xs mt-1">{errors.prenom}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#043927]/70 mb-1">
                Téléphone *
              </label>
              <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.telephone ? 'border-red-400' : 'border-[#043927]/20'
                } focus:outline-none focus:border-[#043927] transition-colors`}
                placeholder="06XXXXXXXX"
              />
              {errors.telephone && (
                <p className="text-red-500 text-xs mt-1">{errors.telephone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#043927]/70 mb-1">
                Adresse *
              </label>
              <textarea
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                rows={3}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.adresse ? 'border-red-400' : 'border-[#043927]/20'
                } focus:outline-none focus:border-[#043927] transition-colors resize-none`}
                placeholder="Adresse complète de livraison"
              />
              {errors.adresse && (
                <p className="text-red-500 text-xs mt-1">{errors.adresse}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#043927]/70 mb-1">
                Commentaire (optionnel)
              </label>
              <textarea
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-3 rounded-lg border border-[#043927]/20 focus:outline-none focus:border-[#043927] transition-colors resize-none"
                placeholder="Instructions particulières..."
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 bg-[#D4AF37] text-white rounded-xl font-medium text-lg hover:bg-[#D4AF37]/90 transition-colors shadow-lg mt-4"
            >
              Valider et commander via WhatsApp
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
