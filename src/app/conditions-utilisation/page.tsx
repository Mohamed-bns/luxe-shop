import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Conditions d\'utilisation | Luxe✦Shop',
  description: 'Conditions d\'utilisation du site Luxe✦Shop.',
};

export default function ConditionsUtilisationPage() {
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
          Conditions d'utilisation
        </h1>
        
        <div className="w-24 h-1 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] mx-auto mb-12 rounded-full" />

        <div className="prose prose-lg text-[#043927]/80 max-w-none">
          <p className="lead text-[#043927] mb-8">
            En accédant et utilisant ce site web, vous acceptez les présentes conditions d'utilisation.
          </p>

          <h2 className="text-2xl font-semibold text-[#043927] mt-12 mb-4">
            1. Acceptation des conditions
          </h2>
          <p className="mb-6">
            L'accès et l'utilisation de ce site web sont soumis à l'acceptation pleine et entière 
            des présentes conditions. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser ce site.
          </p>

          <h2 className="text-2xl font-semibold text-[#043927] mt-12 mb-4">
            2. Propriété intellectuelle
          </h2>
          <p className="mb-6">
            Tout le contenu de ce site (textes, images, logos, etc.) est la propriété exclusive 
            de Luxe✦Shop et est protégé par les lois sur la propriété intellectuelle.
          </p>

          <h2 className="text-2xl font-semibold text-[#043927] mt-12 mb-4">
            3. Utilisation du site
          </h2>
          <p className="mb-6">
            Vous vous engagez à utiliser ce site uniquement à des fins légales et conformément 
            aux présentes conditions. Toute utilisation frauduleuse est interdite.
          </p>

          <h2 className="text-2xl font-semibold text-[#043927] mt-12 mb-4">
            4. Commandes et paiements
          </h2>
          <p className="mb-6">
            Les commandes passées sur ce site sont soumises à notre disponibilité. 
            Le paiement s'effectue à la livraison ou par virement bancaire.
          </p>

          <h2 className="text-2xl font-semibold text-[#043927] mt-12 mb-4">
            5. Responsabilité
          </h2>
          <p className="mb-6">
            Luxe✦Shop s'efforce d'assurer l'exactitude des informations sur ce site. 
            Cependant, nous ne pouvons garantir l'absence d'erreurs ou d'omissions.
          </p>

          <h2 className="text-2xl font-semibold text-[#043927] mt-12 mb-4">
            6. Modifications
          </h2>
          <p className="mb-6">
            Luxe✦Shop se réserve le droit de modifier ces conditions à tout moment. 
            Les modifications prendront effet dès leur publication sur le site.
          </p>

          <p className="mt-12 text-sm text-[#043927]/50">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </main>
    </div>
  );
}
