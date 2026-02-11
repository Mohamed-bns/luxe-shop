import { AirtableResponse, Product } from '@/types';

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'site luxe';

export async function fetchProductsFromAirtable(): Promise<Product[]> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    console.error('Missing Airtable environment variables');
    return [];
  }

  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      console.error(`Airtable API error: ${response.status} ${response.statusText}`);
      return [];
    }

    const data: AirtableResponse = await response.json();

    const products: Product[] = data.records
      .map((record): Product | null => {
        const fields = record.fields;
        
        if (fields.Actif !== true) {
          return null;
        }

        const photos = fields.Photos?.map((photo) => photo.url) || [];
        const prix = fields.Prix ?? 0;
        const prixPromo = fields.PrixPromo ?? undefined;
        const quantite = fields.Quantite ?? 0;
        const ordre = fields.ordre ?? undefined;
        const genre = fields.Genre ?? undefined;
        
        const statut = (fields.Statut === 'Sold Out' || quantite <= 0) 
          ? 'Sold Out' as const
          : 'Disponible' as const;

        return {
          id: record.id,
          name: fields.Name ?? 'Sans nom',
          description: fields.Description ?? '',
          prix,
          prixPromo,
          photos,
          categorie: fields.Categorie ?? 'Non catégorisé',
          quantite,
          statut,
          actif: fields.Actif ?? false,
          couleur: fields.couleur ?? undefined,
          ordre,
          genre,
        };
      })
      .filter((product): product is Product => product !== null);

    products.sort((a, b) => {
      const ordreA = a.ordre ?? Infinity;
      const ordreB = b.ordre ?? Infinity;
      return ordreA - ordreB;
    });

    return products;
  } catch (error) {
    console.error('Error fetching products from Airtable:', error);
    return [];
  }
}

export function getCategories(products: Product[]): string[] {
  const categories = new Set(products.map((p) => p.categorie));
  return Array.from(categories).sort();
}

export function getGenres(products: Product[]): string[] {
  const genres = new Set<string>(
    products
      .map((p) => p.genre)
      .filter((g): g is string => Boolean(g))
  );
  return Array.from(genres).sort();
}

// Filtrer les collections principales (sans sous-genre)
export function getMainCollections(products: Product[]): string[] {
  const collections = new Set(products.map((p) => p.categorie));
  return Array.from(collections).sort();
}

// Collections qui ont des sous-genres (Homme/Femme)
export function getCollectionsWithSubgenres(products: Product[]): string[] {
  const collections = new Set(
    products
      .filter(p => p.genre && ['Homme', 'Femme'].includes(p.genre))
      .map(p => p.categorie)
  );
  return Array.from(collections).sort();
}
