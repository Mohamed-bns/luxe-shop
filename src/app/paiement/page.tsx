import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Méthodes de paiement | Luxe✦Shop',
  description: 'Découvrez les méthodes de paiement acceptées chez Luxe✦Shop.',
};

export default function PaiementPage() {
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
          Méthodes de paiement
        </h1>
        
        <div className="w-24 h-1 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] mx-auto mb-12 rounded-full" />

        <div className="space-y-12">
          {/* Paiement à la livraison */}
          <div className="p-8 bg-white rounded-2xl shadow-lg border border-[#D4AF37]/20">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl">💵</span>
              <h2 className="text-2xl font-semibold text-[#043927]">
                Paiement à la livraison (COD)
              </h2>
            </div>
            <p className="text-[#043927]/80 mb-4">
              Nous proposons le paiement à la livraison pour votre convenience et sécurité.
              Payez directement lors de la réception de votre commande.
            </p>
            <ul className="space-y-2 text-[#043927]/70">
              <li className="flex items-center gap-2">
                <span className="text-[#D4AF37]">✓</span>
                Paiement en espèces à la livraison
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#D4AF37]">✓</span>
                Pas de paiement anticipé requis
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#D4AF37]">✓</span>
                Vérifiez votre colis avant de payer
              </li>
            </ul>
          </div>

          {/* Virement bancaire */}
          <div className="p-8 bg-white rounded-2xl shadow-lg border border-[#D4AF37]/20">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl">🏦</span>
              <h2 className="text-2xl font-semibold text-[#043927]">
                Virement bancaire
              </h2>
            </div>
            <p className="text-[#043927]/80 mb-4">
              Vous pouvez également payer par virement bancaire.
            </p>
            <div className="bg-[#F5F5F5] p-4 rounded-xl">
              <p className="text-sm text-[#043927]/60 mb-2">Coordonnées bancaires :</p>
              <p className="font-medium text-[#043927]">IBAN: MA00 0000 0000 0000 0000 0000</p>
              <p className="font-medium text-[#043927]">Banque: Attijariwafa bank</p>
            </div>
          </div>

          {/* Carte bancaire */}
          <div className="p-8 bg-white rounded-2xl shadow-lg border border-[#D4AF37]/20">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl">💳</span>
              <h2 className="text-2xl font-semibold text-[#043927]">
                Carte bancaire (bientôt disponible)
              </h2>
            </div>
            <p className="text-[#043927]/80">
              Le paiement par carte bancaire sera bientôt disponible sur notre site.
              Stay tuned!
            </p>
          </div>

          {/* Sécurité */}
          <div className="p-8 bg-[#043927] rounded-2xl text-white">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">🔒</span>
              <h2 className="text-2xl font-semibold">
                Sécurité des paiements
              </h2>
            </div>
            <p className="text-white/80">
              Toutes vos transactions sont sécurisées. Nous ne stockons aucune information 
              de paiement sensibles. Vos données sont protégées.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
