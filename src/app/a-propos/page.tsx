import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'À propos | Luxe✦Shop',
  description: 'Découvrez l\'histoire et les valeurs de Luxe✦Shop, votre destination premium pour les accessoires de luxe.',
};

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Header Doré - Medium Dark */}
      <header className="bg-[#1a2e1a] border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/" className="text-2xl font-bold text-white">
            Luxe<span className="text-[#D4AF37]">✦</span>Shop
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1a2e1a] mb-8 text-center">
          À propos de nous
        </h1>
        
        <div className="w-24 h-1 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] mx-auto mb-12 rounded-full" />

        <div className="prose prose-lg text-[#1a2e1a]/80 max-w-none">
          <p className="lead text-xl text-[#1a2e1a] mb-8">
            Bienvenue chez <strong>Luxe✦Shop</strong>, votre destination exclusive pour les accessoires de luxe. 
            Nous curons avec passion les plus belles pièces pour sublimer votre style.
          </p>

          <h2 className="text-2xl font-semibold text-[#1a2e1a] mt-12 mb-4">
            Notre histoire
          </h2>
          <p className="mb-6">
            Fondée avec une vision claire de démocratiser l'accès aux produits de luxe, 
            Luxe✦Shop est née de la passion pour l'élégance et la qualité. 
            Notre équipe d'experts sélectionne personnellement chaque pièce de notre collection 
            pour garantir une qualité exceptionnelle.
          </p>

          <h2 className="text-2xl font-semibold text-[#1a2e1a] mt-12 mb-4">
            Nos valeurs
          </h2>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <span className="text-[#D4AF37] text-xl">✦</span>
              <span><strong>Qualité Premium</strong> - Chaque produit est sélectionné avec rigueur</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#D4AF37] text-xl">✦</span>
              <span><strong>Service Client Dédié</strong> - Une équipe à votre écoute</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#D4AF37] text-xl">✦</span>
              <span><strong>Authenticité Garantie</strong> - Produits 100% authentiques</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#D4AF37] text-xl">✦</span>
              <span><strong>Paiement Sécurisé</strong> - Transactions protégées</span>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#1a2e1a] mt-12 mb-4">
            Notre engagement
          </h2>
          <p className="mb-6">
            Chez Luxe✦Shop, nous nous engageons à vous offrir une expérience d'achat 
            inégalée. De la sélection rigoureuse de nos produits à la livraison soignée, 
            chaque détail compte. Votre satisfaction est notre priorité absolue.
          </p>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Link
            href="/boutique"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#D4AF37] text-white font-medium rounded-full hover:bg-[#D4AF37]/90 transition-all duration-300"
          >
            Découvrir nos produits
            <span>→</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
