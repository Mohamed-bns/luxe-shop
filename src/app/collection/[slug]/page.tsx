import { Metadata } from 'next';
import { fetchProductsFromAirtable, getCollectionsWithSubgenres, getGenres } from '@/lib/airtable';
import CollectionClient from '@/components/CollectionClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: `${resolvedParams.slug.charAt(0).toUpperCase() + resolvedParams.slug.slice(1)} | Luxe✦Shop`,
    description: `Découvrez notre collection de ${resolvedParams.slug.toLowerCase()}.`,
  };
}

export default async function CollectionPage({ params }: PageProps) {
  const resolvedParams = await params;
  const products = await fetchProductsFromAirtable();
  const collectionSlug = resolvedParams.slug;
  
  // Vérifier si cette collection a des sous-genres (Homme/Femme)
  const collectionsWithSubgenres = getCollectionsWithSubgenres(products);
  const hasSubgenres = collectionsWithSubgenres.includes(collectionSlug);

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <CollectionClient
        collectionSlug={collectionSlug}
        products={products}
        hasSubgenres={hasSubgenres}
      />
    </div>
  );
}
