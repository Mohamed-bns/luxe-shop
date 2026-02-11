# ✦ Luxe Shop - E-commerce One Page Premium

Site e-commerce "One Page" ultra premium avec design luxe, gestion des produits via Airtable et checkout via WhatsApp.

## 🎨 Style Luxe

- **Couleurs**: Vert émeraude (#043927), fond blanc cassé (#F5F5F5), accents or/doré (#D4AF37)
- **Animations**: Framer Motion pour des transitions fluides et premium
- **Responsive**: Mobile-first, très fluide

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos valeurs
```

## ⚙️ Configuration

### Variables d'environnement (.env.local)

```env
# Airtable Configuration
AIRTABLE_API_KEY=your_airtable_api_key_here
AIRTABLE_BASE_ID=your_airtable_base_id_here
AIRTABLE_TABLE_NAME=site luxe

# WhatsApp Configuration (format international sans +)
NEXT_PUBLIC_WHATSAPP_NUMBER=212600000000
```

### Schéma Airtable (Table: "site luxe")

| Champ | Type | Description |
|-------|------|-------------|
| Name | Single line text | Nom du produit |
| Description | Long text | Description détaillée |
| Prix | Number | Prix normal |
| PrixPromo | Number | Prix promo (optionnel) |
| Photos | Attachment | Images du produit |
| Categorie | Single select | Catégorie du produit |
| Quantite | Number | Quantité en stock |
| Statut | Formula | "Disponible" ou "Sold Out" |
| Actif | Checkbox | Coché = affiché |
| couleur | Long text | Couleur (optionnel) |
| ordre | Number | Ordre d'affichage ASC |

## 🛠 Commandes NPM

```bash
# Développement
npm run dev

# Build production
npm run build

# Démarrer production
npm run start

# Linting
npm run lint
```

## 🐙 Déploiement GitHub + Vercel

### 1. Initialiser Git

```bash
git init
git add .
git commit -m "Initial commit: Luxe Shop e-commerce"
```

### 2. Créer le repository GitHub

1. Aller sur [GitHub](https://github.com/new)
2. Créer un nouveau repository
3. Lier et pousser:

```bash
git remote add origin https://github.com/votre-username/luxe-shop.git
git branch -M main
git push -u origin main
```

### 3. Déployer sur Vercel

1. Aller sur [Vercel](https://vercel.com)
2. Cliquer "Add New..." → "Project"
3. Importer votre repository GitHub
4. Dans "Environment Variables", ajouter:

| Variable | Valeur |
|----------|--------|
| AIRTABLE_API_KEY | Votre clé API Airtable |
| AIRTABLE_BASE_ID | ID de votre base Airtable |
| AIRTABLE_TABLE_NAME | site luxe |
| NEXT_PUBLIC_WHATSAPP_NUMBER | Numéro WhatsApp (212...) |

5. Cliquer "Deploy"

## 📱 Fonctionnalités

- ✦ Header luxe avec panier
- ✦ Barre catégories sticky
- ✦ Grille produits premium avec animations
- ✦ Modale produit avec carousel d'images
- ✦ Panier persistant (localStorage)
- ✦ Checkout via WhatsApp avec message pré-rempli
- ✦ Responsive mobile-first

## 🏗 Architecture

```
luxe-shop/
├── src/
│   ├── app/
│   │   ├── api/products/route.ts  # API route pour Airtable
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Cart.tsx              # Panier latéral
│   │   ├── CategoryBar.tsx       # Barre de catégories
│   │   ├── CheckoutForm.tsx      # Formulaire checkout
│   │   ├── HomeClient.tsx        # Composant principal client
│   │   ├── Modal.tsx             # Modale produit
│   │   └── ProductCard.tsx       # Carte produit
│   ├── lib/
│   │   └── airtable.ts           # Helper Airtable
│   ├── store/
│   │   └── cart.ts               # Gestion du panier
│   └── types/
│       └── index.ts              # Types TypeScript
├── .env.example
├── package.json
├── tailwind.config.ts
└── README.md
```

## 🔒 Sécurité

- Clé API Airtable **jamais exposée** côté client
- Fetch via API Route Next.js (côté serveur)
- Variables d'environnement serveur protégées

## 📦 Dépendances

- **Next.js 14** - Framework React
- **React 18** - UI library
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **TypeScript** - Type safety

---

Fait avec ✦ par Luxe Shop
