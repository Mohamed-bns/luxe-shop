import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Expédition et manutention | Luxe✦Shop',
  description: 'Informations sur les expéditions et délais de livraison chez Luxe✦Shop.',
};

export default function ExpeditionPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <header className="bg-[#FDFBF7] border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/" className="text-2xl font-bold text-[#043927]">
            Luxe<span className="text-[#D4AF37]">✦</span>Shop
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#043927] mb-8 text-center">
          Expédition et manutention
        </h1>
        
        <div className="w-24 h-1 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] mx-auto mb-12 rounded-full" />

        <div className="space-y-12">
          {/* Zones de livraison */}
          <div className="p-8 bg-white rounded-2xl shadow-lg border border-[#D4AF37]/20">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl">📦</span>
              <h2 className="text-2xl font-semibold text-[#043927]">
                Zones de livraison
              </h2>
            </div>
            <p className="text-[#043927]/80 mb-4">
              Nous livrons dans tout le Maroc.
            </p>
            <ul className="space-y-2 text-[#043927]/70">
              <li className="flex items-center gap-2">
                <span className="text-[#D4AF37]">✓</span>
                Casablanca, Rabat, Marrakech
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#D4AF37]">✓</span>
                Toutes les villes principales
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#D4AF37]">✓</span>
                Zones rurales (délais variables)
              </li>
            </ul>
          </div>

          {/* Délais de livraison */}
          <div className="p-8 bg-white rounded-2xl shadow-lg border border-[#D4AF37]/20">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl">🚚</span>
              <h2 className="text-2xl font-semibold text-[#043927]">
                Délais de livraison
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-[#F5F5F5] rounded-xl">
                <span className="text-3xl">⚡</span>
                <p className="font-semibold text-[#043927] mt-2">1-2 jours</p>
                <p className="text-sm text-[#043927]/60">Casablanca</p>
              </div>
              <div className="text-center p-4 bg-[#F5F5F5] rounded-xl">
                <span className="text-3xl">🏙️</span>
                <p className="font-semibold text-[#043927] mt-2">2-3 jours</p>
                <p className="text-sm text-[#043927]/60">Villes principales</p>
              </div>
              <div className="text-center p-4 bg-[#F5F5F5] rounded-xl">
                <span className="text-3xl">🌍</span>
                <p className="font-semibold text-[#043927] mt-2">3-5 jours</p>
                <p className="text-sm text-[#043927]/60">Autres régions</p>
              </div>
            </div>
          </div>

          {/* Frais de livraison */}
          <div className="p-8 bg-white rounded-2xl shadow-lg border border-[#D4AF37]/20">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl">💰</span>
              <h2 className="text-2xl font-semibold text-[#043927]">
                Frais de livraison
              </h2>
            </div>
            <div className="bg-[#F5F5F5] p-6 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[#043927]">Livraison standard</span>
                <span className="font-semibold text-[#043927]">49 DH</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-[#043927]">Livraison gratuite</span>
                <span className="font-semibold text-[#D4AF37]">0 DH</span>
              </div>
              <p className="text-sm text-[#043927]/60 text-center border-t border-[#D4AF37]/20 pt-4">
                Livraison gratuite pour toute commande de 500 DH ou plus
              </p>
            </div>
          </div>

          {/* Suivi de commande */}
          <div className="p-8 bg-white rounded-2xl shadow-lg border border-[#D4AF37]/20">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl">📱</span>
              <h2 className="text-2xl font-semibold text-[#043927]">
                Suivi de votre commande
              </h2>
            </div>
            <p className="text-[#043927]/80 mb-4">
              Une fois votre commande expédiée, vous recevrez un SMS avec votre numéro de suivi.
              Vous pouvez également nous contacter sur WhatsApp pour le statut de votre livraison.
            </p>
          </div>

          {/* Emballage soigné */}
          <div className="p-8 bg-[#043927] rounded-2xl text-white">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">🎁</span>
              <h2 className="text-2xl font-semibold">
                Emballage soigné
              </h2>
            </div>
            <p className="text-white/80">
              Chaque commande est soigneusement emballée pour garantir une livraison en parfait état.
              Nos produits de luxe méritent un包装 tout aussi luxueux.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
