import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Politique de confidentialité | Luxe✦Shop',
  description: 'Politique de confidentialité et protection des données personnelles.',
};

export default function PolitiqueConfidentialitePage() {
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
          Politique de confidentialité
        </h1>
        
        <div className="w-24 h-1 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] mx-auto mb-12 rounded-full" />

        <div className="prose prose-lg text-[#043927]/80 max-w-none">
          <p className="lead text-[#043927] mb-8">
            Chez Luxe✦Shop, nous attachons une grande importance à la protection 
            de vos données personnelles.
          </p>

          <h2 className="text-2xl font-semibold text-[#043927] mt-12 mb-4">
            1. Données collectées
          </h2>
          <p className="mb-6">
            Nous pouvons collecter les informations suivantes :
          </p>
          <ul className="space-y-2 mb-6">
            <li>• Nom et prénom</li>
            <li>• Adresse de livraison</li>
            <li>• Numéro de téléphone</li>
            <li>• Adresse email</li>
            <li>• Données de paiement (traitées de manière sécurisée)</li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#043927] mt-12 mb-4">
            2. Utilisation des données
          </h2>
          <p className="mb-6">
            Vos données sont utilisées pour :
          </p>
          <ul className="space-y-2 mb-6">
            <li>• Traiter et livrer vos commandes</li>
            <li>• Vous contacter concernant votre commande</li>
            <li>• Améliorer nos services</li>
            <li>• Respecter nos obligations légales</li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#043927] mt-12 mb-4">
            3. Protection des données
          </h2>
          <p className="mb-6">
            Nous mettons en œuvre des mesures de sécurité appropriées pour protéger 
            vos données personnelles contre tout accès non autorisé, modification, 
            divulgation ou destruction.
          </p>

          <h2 className="text-2xl font-semibold text-[#043927] mt-12 mb-4">
            4. Partage des données
          </h2>
          <p className="mb-6">
            Vos données ne sont jamais vendues à des tiers. Elles peuvent être 
            partagées uniquement avec nos prestataires logistiques pour la 
            livraison de vos commandes.
          </p>

          <h2 className="text-2xl font-semibold text-[#043927] mt-12 mb-4">
            5. Cookies
          </h2>
          <p className="mb-6">
            Notre site utilise des cookies pour améliorer votre expérience. 
            Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.
          </p>

          <h2 className="text-2xl font-semibold text-[#043927] mt-12 mb-4">
            6. Vos droits
          </h2>
          <p className="mb-6">
            Conformément à la réglementation en vigueur, vous disposez des droits suivants :
          </p>
          <ul className="space-y-2 mb-6">
            <li>• Droit d'accès à vos données</li>
            <li>• Droit de rectification</li>
            <li>• Droit à l'effacement</li>
            <li>• Droit d'opposition</li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#043927] mt-12 mb-4">
            7. Contact
          </h2>
          <p className="mb-6">
            Pour toute question concernant cette politique ou pour exercer vos droits, 
            vous pouvez nous contacter à : <strong>contact@luxeshop.ma</strong>
          </p>

          <p className="mt-12 text-sm text-[#043927]/50">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </main>
    </div>
  );
}
