import { Metadata } from 'next';
import { fetchProductsFromAirtable, getCategories } from '@/lib/airtable';
import BoutiqueClient from '@/components/BoutiqueClient';

export const metadata: Metadata = {
  title: 'La Boutique | Luxe✦Shop',
  description: 'Découvrez notre collection complète de produits de luxe.',
};

interface PageProps {
  searchParams: Promise<{ search?: string; category?: string }>;
}

export default async function BoutiquePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const products = await fetchProductsFromAirtable();
  const categories = getCategories(products);

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <BoutiqueClient 
        initialProducts={products}
        categories={categories}
        initialSearch={params.search}
        initialCategory={params.category}
      />
    </div>
  );
}
