'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Product, CartItem, CustomerInfo } from '@/types';
import Header from './Header';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import Cart from './Cart';
import CheckoutForm from './CheckoutForm';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

interface BoutiqueClientProps {
  initialProducts: Product[];
  categories: string[];
  initialSearch?: string;
  initialCategory?: string;
}

export default function BoutiqueClient({
  initialProducts,
  categories,
  initialSearch,
  initialCategory,
}: BoutiqueClientProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState(initialSearch || '');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'Toutes');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
  }, []);

  // Fonction de recherche via API
  const searchProducts = useCallback(async (query: string, category?: string) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (query) params.append('search', query);
      if (category && category !== 'Toutes') params.append('category', category);

      const response = await fetch(`/api/products?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setFilteredProducts(data);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Effect pour la recherche
  useEffect(() => {
    const timer = setTimeout(() => {
      searchProducts(searchQuery, selectedCategory);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, searchProducts]);

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

    const message = `🛍️ *Nouvelle commande - Luxe Shop*\n\n*Produits:*\n${productList}\n\n━━━━━━━━━━━━━━━━━━━━━\n*TOTAL: ${total.toFixed(2)} DH*\n━━━━━━━━━━━━━━━━━━━━━\n\n*Client:* ${customerInfo.prenom} ${customerInfo.nom}\n📞 ${customerInfo.telephone}\n📍 ${customerInfo.adresse}`;

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
      <Header onCartClick={() => setIsCartOpen(true)} cartItemCount={cartItemCount} products={initialProducts} />

      {/* Page Header */}
      <div className="pt-28 pb-12 px-4 bg-[#043927]">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            La Boutique
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

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto px-4 -mt-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-2"
        >
          <div className="flex items-center gap-4">
            <span className="text-[#D4AF37] text-xl ml-2">🔍</span>
            <input
              type="text"
              placeholder="Rechercher un produit (ex: Tissot, Omega...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-[#043927] placeholder-[#043927]/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="px-3 py-1 bg-[#F5F5F5] rounded-lg text-[#043927] hover:bg-[#D4AF37]/20 transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {['Toutes', ...categories].map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-[#D4AF37] text-white shadow-lg'
                  : 'bg-white text-[#043927] border border-[#D4AF37]/20 hover:border-[#D4AF37]/40'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 pb-16">
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
                <ProductCard
                  product={product}
                  onClick={setSelectedProduct}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {!isLoading && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block">🔍</span>
            <p className="text-[#043927]/50 text-lg mb-4">
              Aucun produit trouvé
            </p>
            <p className="text-[#043927]/40 text-sm">
              Essayez une autre recherche ou catégorie
            </p>
          </div>
        )}
      </main>

      <Footer />
      <WhatsAppButton />

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />

      {/* Cart Sidebar */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
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
