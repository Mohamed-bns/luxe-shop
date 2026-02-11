import { NextResponse } from 'next/server';
import { fetchProductsFromAirtable } from '@/lib/airtable';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const genre = searchParams.get('genre');
    const search = searchParams.get('search');

    let products = await fetchProductsFromAirtable();

    // Filtrer par catégorie (support多种格式)
    if (category) {
      const normalizedCategory = category.toLowerCase();
      products = products.filter(p => 
        p.categorie.toLowerCase() === normalizedCategory ||
        p.categorie.toLowerCase().includes(normalizedCategory)
      );
    }

    // Filtrer par genre (si le champ existe)
    if (genre) {
      const normalizedGenre = genre.toLowerCase();
      products = products.filter(p => 
        p.genre && p.genre.toLowerCase() === normalizedGenre
      );
    }

    // Recherche par nom (insensible à la casse)
    if (search) {
      const normalizedSearch = search.toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(normalizedSearch) ||
        p.description.toLowerCase().includes(normalizedSearch)
      );
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { error: 'Impossible de charger les produits' },
      { status: 500 }
    );
  }
}
