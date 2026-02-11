import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Retours et échanges | Luxe✦Shop',
  description: 'Politique de retour et échange pour les produits Luxe✦Shop.',
};

export default function RetoursEchangesPage() {
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
          Retours et échanges
        </h1>
        
        <div className="w-24 h-1 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] mx-auto mb-12 rounded-full" />

        <div className="space-y-12">
          {/* Délai de retour */}
          <div className="p-8 bg-white rounded-2xl shadow-lg border border-[#D4AF37]/20">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl">⏱️</span>
              <h2 className="text-2xl font-semibold text-[#043927]">
                Délai de retour
              </h2>
            </div>
            <p className="text-[#043927]/80">
              Vous disposez de <strong>14 jours</strong> après réception de votre commande 
              pour retourner un produit.
            </p>
          </div>

          {/* Conditions de retour */}
          <div className="p-8 bg-white rounded-2xl shadow-lg border border-[#D4AF37]/20">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl">📦</span>
              <h2 className="text-2xl font-semibold text-[#043927]">
                Conditions de retour
              </h2>
            </div>
            <ul className="space-y-3 text-[#043927]/70">
              <li className="flex items-center gap-3">
                <span className="text-[#D4AF37] text-xl">✓</span>
                Le produit doit être dans son état d'origine
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#D4AF37] text-xl">✓</span>
                Non porté / non utilisé
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#D4AF37] text-xl">✓</span>
                Emballage d'origine intact
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#D4AF37] text-xl">✓</span>
                Étiquette attachée
              </li>
            </ul>
          </div>

          {/* Processus de retour */}
          <div className="p-8 bg-white rounded-2xl shadow-lg border border-[#D4AF37]/20">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl">🔄</span>
              <h2 className="text-2xl font-semibold text-[#043927]">
                Comment retourner ?
              </h2>
            </div>
            <ol className="space-y-4 text-[#043927]/70">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-[#D4AF37] text-white rounded-full flex items-center justify-center font-medium">
                  1
                </span>
                <span>Contactez-nous par WhatsApp ou email pour demander un retour</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-[#D4AF37] text-white rounded-full flex items-center justify-center font-medium">
                  2
                </span>
                <span>Emballez soigneusement le produit avec tous les accessoires</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-[#D4AF37] text-white rounded-full flex items-center justify-center font-medium">
                  3
                </span>
                <span>Notre livreur récupérera le colis à votre adresse</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-[#D4AF37] text-white rounded-full flex items-center justify-center font-medium">
                  4
                </span>
                <span>Remboursement sous 5-7 jours ouvrés</span>
              </li>
            </ol>
          </div>

          {/* Échanges */}
          <div className="p-8 bg-white rounded-2xl shadow-lg border border-[#D4AF37]/20">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl">🔀</span>
              <h2 className="text-2xl font-semibold text-[#043927]">
                Échanges
              </h2>
            </div>
            <p className="text-[#043927]/80 mb-4">
              Les échanges sont possibles pour une taille ou couleur différente.
              Le premier échange est offert !
            </p>
          </div>

          {/* Remboursement */}
          <div className="p-8 bg-[#043927] rounded-2xl text-white">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">💵</span>
              <h2 className="text-2xl font-semibold">
                Remboursement
              </h2>
            </div>
            <p className="text-white/80">
              Le remboursement s'effectue par virement bancaire dans les 5-7 jours 
              suivant la réception du produit retourné.
            </p>
          </div>

          {/* Produits non éligibles */}
          <div className="p-8 bg-white rounded-2xl shadow-lg border border-red-200">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl">❌</span>
              <h2 className="text-2xl font-semibold text-[#043927]">
                Produits non échangeables
              </h2>
            </div>
            <ul className="space-y-2 text-[#043927]/70">
              <li className="flex items-center gap-3">
                <span className="text-red-400 text-xl">×</span>
                Produits soldés (sauf défaut)
              </li>
              <li className="flex items-center gap-3">
                <span className="text-red-400 text-xl">×</span>
                Produits personnalisés
              </li>
              <li className="flex items-center gap-3">
                <span className="text-red-400 text-xl">×</span>
                Produits utilisés ou endommagés
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
