import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Luxe✦Shop | E-commerce Premium',
  description: 'Boutique e-commerce luxe avec paiement à la livraison. Montres, accessoires et lunettes de luxe.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
