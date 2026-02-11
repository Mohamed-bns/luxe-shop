import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Aide & FAQ | Luxe✦Shop',
  description: 'Questions fréquentes et aide sur vos commandes chez Luxe✦Shop.',
};

const faqs = [
  {
    question: 'Comment passer une commande ?',
    answer: 'Parcourez notre catalogue, sélectionnez vos produits, ajoutez-les au panier, puis suivez les étapes de checkout. Vous paierez à la livraison.',
  },
  {
    question: 'Quels sont les délais de livraison ?',
    answer: '1-2 jours ouvrés pour Casablanca, 2-3 jours pour les villes principales, 3-5 jours pour les autres régions.',
  },
  {
    question: 'Puis-je payer par carte bancaire ?',
    answer: 'Actuellement, nous proposons le paiement à la livraison et le virement bancaire. Le paiement par carte sera bientôt disponible.',
  },
  {
    question: 'Comment suivre ma commande ?',
    answer: 'Vous recevrez un SMS avec votre numéro de suivi. Vous pouvez aussi nous contacter sur WhatsApp pour le statut de votre livraison.',
  },
  {
    question: 'Quelle est la politique de retour ?',
    answer: 'Vous pouvez retourner les produits dans les 14 jours suivant la réception, à condition qu\'ils soient dans leur état d\'origine.',
  },
  {
    question: 'Les produits sont-ils authentiques ?',
    answer: 'Oui, tous nos produits sont 100% authentiques. Nous sélectionnons nos fournisseurs avec rigueur.',
  },
  {
    question: 'Proposez-vous la livraison internationale ?',
    answer: 'Pour le moment, nous livrons uniquement au Maroc. Stay tuned pour les livraisons internationales!',
  },
  {
    question: 'Comment vous contacter ?',
    answer: 'Vous pouvez nous joindre par WhatsApp au numéro indiqué sur le site ou par email à contact@luxeshop.ma.',
  },
];

export default function AideFaqPage() {
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
          Aide & FAQ
        </h1>
        
        <div className="w-24 h-1 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] mx-auto mb-12 rounded-full" />

        <p className="text-[#043927]/80 text-center mb-12 text-lg">
          Trouvez rapidement les réponses à vos questions les plus fréquentes.
        </p>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group p-6 bg-white rounded-2xl shadow-lg border border-[#D4AF37]/20 open:border-[#D4AF37]"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h3 className="text-lg font-semibold text-[#043927]">
                  {faq.question}
                </h3>
                <span className="text-[#D4AF37] text-2xl transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 text-[#043927]/70 leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center p-8 bg-[#043927] rounded-2xl">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Une question non répondue ?
          </h2>
          <p className="text-white/80 mb-6">
            N'hésitez pas à nous contacter directement.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-white font-medium rounded-full hover:bg-[#D4AF37]/90 transition-all"
          >
            Nous contacter
            <span>→</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
