// TypeScript types aligned with Airtable schema
export interface Product {
  id: string;
  name: string;
  description: string;
  prix: number;
  prixPromo?: number | null;
  photos: string[];
  categorie: string;
  quantite: number;
  statut: 'Disponible' | 'Sold Out';
  actif: boolean;
  couleur?: string | null;
  ordre?: number | null;
  genre?: string | null; // NOUVEAU: Homme, Femme, Unisexe
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerInfo {
  nom: string;
  prenom: string;
  adresse: string;
  telephone: string;
  feedback?: string;
}

export interface AirtableRecord {
  id: string;
  fields: {
    Name?: string | null;
    Description?: string | null;
    Prix?: number | null;
    PrixPromo?: number | null;
    Photos?: Array<{ url: string }> | null;
    Categorie?: string | null;
    Quantite?: number | null;
    Statut?: string | null;
    Actif?: boolean | null;
    couleur?: string | null;
    ordre?: number | null;
    Genre?: string | null; // NOUVEAU: pour filtrer Homme/Femme
  };
}

export interface AirtableResponse {
  records: AirtableRecord[];
  offset?: string;
}
