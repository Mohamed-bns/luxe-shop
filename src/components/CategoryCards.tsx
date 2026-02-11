'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Configuration avec les chemins exacts de vos images
const categoryCards = [
  {
    name: 'Montres',
    slug: 'montres',
    image: '/collections/montres.jpg.jpeg',
    description: 'Horlogerie de luxe',
    hasSubgenre: true, // Homme/Femme
  },
  {
    name: 'Lunettes',
    slug: 'lunettes',
    image: '/collections/lunettes.jpg.jpeg',
    description: 'Style emblématique',
    hasSubgenre: true,
  },
  {
    name: 'Wallets',
    slug: 'wallets',
    image: '/collections/wallets.jpg.jpeg',
    description: 'Cuir premium',
    hasSubgenre: false,
  },
  {
    name: 'Accessoires',
    slug: 'accessoires',
    image: '/collections/accessoires.jpg.jpeg',
    description: 'Détails parfaits',
    hasSubgenre: false,
  },
  {
    name: 'Parfums',
    slug: 'parfums',
    image: '/collections/parfums.jpg.jpeg',
    description: 'Essences luxueuses',
    hasSubgenre: false,
  },
  {
    name: 'Bijoux',
    slug: 'bijoux',
    image: '/collections/bijoux.jpg.jpeg',
    description: 'Éclat et élégance',
    hasSubgenre: false,
  },
];

export default function CategoryCards() {
  return (
    <section className="py-20 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Titre Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#D4AF37] text-sm font-medium tracking-wider uppercase">
            Explorer
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#043927] mt-2">
            Nos Collections
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Grille de Cartes Premium */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryCards.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/collection/${category.slug}`}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer shadow-lg"
                >
                  {/* Image */}
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#043927]/80 via-[#043927]/20 to-transparent" />

                  {/* Contenu */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <span className="text-[#D4AF37] text-xs font-medium tracking-wider uppercase mb-2">
                      {category.description}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {category.name}
                    </h3>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 text-[#D4AF37] font-medium"
                    >
                      <span>{category.hasSubgenre ? 'Homme / Femme' : 'Découvrir'}</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-2">
                        →
                      </span>
                    </motion.div>
                  </div>

                  {/* Bordure dorée au hover */}
                  <div className="absolute inset-0 border-2 border-[#D4AF37] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Lien vers toute la boutique */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/boutique"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-[#D4AF37] text-[#043927] font-medium rounded-full hover:bg-[#D4AF37] hover:text-white transition-all duration-300"
          >
            Voir toute la collection
            <span>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
