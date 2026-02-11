'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Product, CartItem, CustomerInfo } from '@/types';
import Header from './Header';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import Cart from './Cart';
import CheckoutForm from './CheckoutForm';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

interface SubCollectionClientProps {
  collectionSlug: string;
  subSlug: string;
  products: Product[];
}

export default function SubCollectionClient({ collectionSlug, subSlug, products }: SubCollectionClientProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFilteredProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('category', collectionSlug);
      params.append('genre', subSlug);

      const response = await fetch(`/api/products?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setFilteredProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  }, [collectionSlug, subSlug]);

  useEffect(() => {
    setIsClient(true);
    const savedCart = localStorage.getItem('luxe-shop-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error parsing cart');
      }
    }
    fetchFilteredProducts();
  }, [fetchFilteredProducts]);

  const addToCart = (product: Product, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.quantite) }
            : item
        );
      }
      return [...prev, { product, quantity: Math.min(quantity, product.quantite) }];
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== productId));
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.min(quantity, item.product.quantite) }
            : item
        )
      );
    }
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleCheckout = (customerInfo: CustomerInfo) => {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';
    const total = cart.reduce((sum, item) => {
      const price = item.product.prixPromo && item.product.prixPromo < item.product.prix
        ? item.product.prixPromo : item.product.prix;
      return sum + price * item.quantity;
    }, 0);
    const productList = cart.map((item) => {
      const price = item.product.prixPromo && item.product.prixPromo < item.product.prix
        ? item.product.prixPromo : item.product.prix;
      return `• ${item.product.name} x${item.quantity} = ${(price * item.quantity).toFixed(2)} DH`;
    }).join('\n');
    const message = `🛍️ *Nouvelle commande - Luxe Shop*\n\n*Produits:*\n${productList}\n\n*TOTAL:* ${total.toFixed(2)} DH\n\n*Client:* ${customerInfo.prenom} ${customerInfo.nom}\n📞 ${customerInfo.telephone}\n📍 ${customerInfo.adresse}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setCart([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  };

  const cartItemCount = isClient ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Header onCartClick={() => setIsCartOpen(true)} cartItemCount={cartItemCount} products={products} />

      {/* Page Header */}
      <div className="pt-28 pb-12 px-4 bg-[#043927]">
        <div className="max-w-7xl mx-auto text-center">
          <Link href={`/collection/${collectionSlug}`} className="text-[#D4AF37] text-sm hover:underline mb-4 inline-block">
            ← Retour à {collectionSlug}
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            {collectionSlug} {subSlug}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60"
          >
            {filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''}
          </motion.p>
        </div>
      </div>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full" />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard product={product} onClick={setSelectedProduct} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {!isLoading && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block">📦</span>
            <p className="text-[#043927]/50 text-lg mb-4">
              Aucun produit disponible dans cette catégorie
            </p>
            <p className="text-[#043927]/40 text-sm mb-6">
              (Vérifiez que le champ "Genre" existe dans Airtable avec les valeurs "homme" ou "femme")
            </p>
            <Link
              href="/boutique"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-white rounded-full hover:bg-[#D4AF37]/90 transition-colors"
            >
              Voir tous les produits
              <span>→</span>
            </Link>
          </div>
        )}
      </main>

      <Footer />
      <WhatsAppButton />

      {/* Product Modal */}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={addToCart} />

      {/* Cart Sidebar */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cart} onUpdateQuantity={updateCartQuantity} onRemoveItem={removeFromCart} onCheckout={() => setIsCheckoutOpen(true)} />

      {/* Checkout Form */}
      {isCheckoutOpen && <CheckoutForm items={cart} onClose={() => setIsCheckoutOpen(false)} onSubmit={handleCheckout} />}
    </div>
  );
}
