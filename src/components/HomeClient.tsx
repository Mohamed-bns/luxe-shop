'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Product, CartItem, CustomerInfo } from '@/types';
import Header from './Header';
import HeroSlider from './HeroSlider';
import CategoryCards from './CategoryCards';
import Cart from './Cart';
import CheckoutForm from './CheckoutForm';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

interface HomeClientProps {
  initialProducts: Product[];
}

export default function HomeClient({ initialProducts }: HomeClientProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedCart = localStorage.getItem('luxe-shop-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error parsing cart from localStorage');
      }
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('luxe-shop-cart', JSON.stringify(cart));
    }
  }, [cart, isClient]);

  const handleCheckout = (customerInfo: CustomerInfo) => {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';
    
    const total = cart.reduce((sum, item) => {
      const price = item.product.prixPromo && item.product.prixPromo < item.product.prix
        ? item.product.prixPromo
        : item.product.prix;
      return sum + price * item.quantity;
    }, 0);

    const productList = cart
      .map((item) => {
        const price = item.product.prixPromo && item.product.prixPromo < item.product.prix
          ? item.product.prixPromo
          : item.product.prix;
        return `• ${item.product.name} x${item.quantity} = ${(price * item.quantity).toFixed(2)} DH`;
      })
      .join('\n');

    const message = `🛍️ *Nouvelle commande - Luxe Shop*\n\n` +
      `*Produits:*\n${productList}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `*TOTAL: ${total.toFixed(2)} DH*\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `*Client:* ${customerInfo.prenom} ${customerInfo.nom}\n` +
      `📞 ${customerInfo.telephone}\n` +
      `📍 ${customerInfo.adresse}\n` +
      `${customerInfo.feedback ? `\n📝 *Note:* ${customerInfo.feedback}` : ''}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    setCart([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  };

  const cartItemCount = isClient
    ? cart.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Header 
        onCartClick={() => setIsCartOpen(true)} 
        cartItemCount={cartItemCount} 
        products={initialProducts} 
      />

      {/* Hero Slider */}
      <HeroSlider />

      {/* Premium Categories - PAS DE PRODUITS SUR LA HOME */}
      <CategoryCards />

      {/* Footer */}
      <Footer />

      {/* WhatsApp Button */}
      <WhatsAppButton />

      {/* Cart Sidebar */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={(id, qty) => {
          if (qty <= 0) {
            setCart(prev => prev.filter(item => item.product.id !== id));
          } else {
            setCart(prev => prev.map(item => 
              item.product.id === id ? { ...item, quantity: Math.min(qty, item.product.quantite) } : item
            ));
          }
        }}
        onRemoveItem={(id) => setCart(prev => prev.filter(item => item.product.id !== id))}
        onCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Checkout Form */}
      {isCheckoutOpen && (
        <CheckoutForm
          items={cart}
          onClose={() => setIsCheckoutOpen(false)}
          onSubmit={handleCheckout}
        />
      )}
    </div>
  );
}
