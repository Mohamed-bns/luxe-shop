import { fetchProductsFromAirtable } from '@/lib/airtable';
import HomeClient from '@/components/HomeClient';

export const revalidate = 0; // Disable cache for fresh data

export default async function Home() {
  const products = await fetchProductsFromAirtable();

  return <HomeClient initialProducts={products} />;
}
