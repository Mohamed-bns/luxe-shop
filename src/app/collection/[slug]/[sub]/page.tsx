import { Metadata } from 'next';
import { fetchProductsFromAirtable } from '@/lib/airtable';
import SubCollectionClient from '@/components/SubCollectionClient';

interface PageProps {
  params: Promise<{ slug: string; sub: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: `${resolvedParams.sub} - ${resolvedParams.slug.charAt(0).toUpperCase() + resolvedParams.slug.slice(1)} | Luxe✦Shop`,
    description: `Découvrez notre collection de ${resolvedParams.slug.toLowerCase()} pour ${resolvedParams.sub.toLowerCase()}.`,
  };
}

export default async function SubCollectionPage({ params }: PageProps) {
  const resolvedParams = await params;
  const products = await fetchProductsFromAirtable();

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <SubCollectionClient
        collectionSlug={resolvedParams.slug}
        subSlug={resolvedParams.sub}
        products={products}
      />
    </div>
  );
}
