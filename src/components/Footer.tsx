'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    about: [
      { label: 'À propos', href: '/a-propos' },
      { label: 'Méthodes de paiement', href: '/paiement' },
      { label: 'Expédition et manutention', href: '/expedition' },
    ],
    contact: [
      { label: 'Contactez-nous', href: '/contact' },
      { label: 'Aide & FAQ', href: '/aide-faq' },
    ],
    legal: [
      { label: 'Conditions d\'utilisation', href: '/conditions-utilisation' },
      { label: 'Retours et échanges', href: '/retours-echanges' },
      { label: 'Politique de confidentialité', href: '/politique-confidentialite' },
    ],
  };

  return (
    <footer className="bg-[#043927] text-white">
      {/* Barrière dorée */}
      <div className="h-1 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37]" />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo et Description */}
          <div className="lg:col-span-1">
            <Link href="/">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl font-bold text-white">
                  Luxe<span className="text-[#D4AF37]">✦</span>Shop
                </span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Votre destination premium pour les montres de luxe, accessoires et
              lunettes haut de gamme. Élégance et qualité dans chaque détail.
            </p>
            <div className="flex items-center gap-4">
              {/* Paiements acceptés - Icônes */}
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-white/10 rounded text-xs">💳</span>
                <span className="px-2 py-1 bg-white/10 rounded text-xs">Visa</span>
                <span className="px-2 py-1 bg-white/10 rounded text-xs">MC</span>
              </div>
            </div>
          </div>

          {/* À propos du magasin */}
          <div>
            <h4 className="text-[#D4AF37] font-semibold text-sm uppercase tracking-wider mb-6">
              À propos du magasin
            </h4>
            <ul className="space-y-4">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[#D4AF37] transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contactez-nous */}
          <div>
            <h4 className="text-[#D4AF37] font-semibold text-sm uppercase tracking-wider mb-6">
              Contactez-nous
            </h4>
            <ul className="space-y-4">
              {footerLinks.contact.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[#D4AF37] transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Termes et politiques */}
          <div>
            <h4 className="text-[#D4AF37] font-semibold text-sm uppercase tracking-wider mb-6">
              Termes et politiques
            </h4>
            <ul className="space-y-4">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[#D4AF37] transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              © {currentYear} Luxe✦Shop. Tous droits réservés.
            </p>
            <p className="text-white/40 text-sm">
              Paiement à la livraison • Livraison gratuite dès 500 DH
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
