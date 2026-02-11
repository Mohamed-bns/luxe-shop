import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contactez-nous | Luxe✦Shop',
  description: 'Contactez l\'équipe Luxe✦Shop pour toute question sur nos produits ou commandes.',
};

export default function ContactPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@luxeshop.ma';

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Header */}
      <header className="bg-[#1a2e1a] border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/" className="text-2xl font-bold text-white">
            Luxe<span className="text-[#D4AF37]">✦</span>Shop
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1a2e1a] mb-8 text-center">
          Contactez-nous
        </h1>
        
        <div className="w-24 h-1 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] mx-auto mb-12 rounded-full" />

        <p className="text-[#1a2e1a]/80 text-center mb-12 text-lg">
          Notre équipe est à votre disposition pour répondre à toutes vos questions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-8 bg-white rounded-2xl shadow-lg border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-300"
          >
            <div className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white text-3xl mb-6 mx-auto group-hover:scale-110 transition-transform">
              💬
            </div>
            <h3 className="text-xl font-semibold text-[#1a2e1a] text-center mb-2">
              WhatsApp
            </h3>
            <p className="text-[#1a2e1a]/60 text-center text-sm">
              Réponse rapide et personnalisée
            </p>
            <p className="text-[#D4AF37] text-center mt-4 font-medium">
              {whatsappNumber ? `+${whatsappNumber}` : 'Numéro non configuré'}
            </p>
          </a>

          {/* Email */}
          <a
            href={`mailto:${contactEmail}`}
            className="group p-8 bg-white rounded-2xl shadow-lg border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-300"
          >
            <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center text-white text-3xl mb-6 mx-auto group-hover:scale-110 transition-transform">
              ✉️
            </div>
            <h3 className="text-xl font-semibold text-[#1a2e1a] text-center mb-2">
              Email
            </h3>
            <p className="text-[#1a2e1a]/60 text-center text-sm">
              Pour toute question détaillée
            </p>
            <p className="text-[#D4AF37] text-center mt-4 font-medium">
              {contactEmail}
            </p>
          </a>
        </div>

        {/* Horaires */}
        <div className="mt-16 p-8 bg-white rounded-2xl shadow-lg border border-[#D4AF37]/10">
          <h3 className="text-xl font-semibold text-[#1a2e1a] text-center mb-6">
            Nos horaires d'ouverture
          </h3>
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="text-center">
              <p className="text-[#1a2e1a]/60 text-sm">Lundi - Samedi</p>
              <p className="text-[#1a2e1a] font-medium">9h - 20h</p>
            </div>
            <div className="text-center">
              <p className="text-[#1a2e1a]/60 text-sm">Dimanche</p>
              <p className="text-[#1a2e1a] font-medium">10h - 18h</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
