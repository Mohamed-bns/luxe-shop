'use client';

import { motion } from 'framer-motion';

interface CategoryBarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryBar({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: CategoryBarProps) {
  const allCategories = ['Tous', ...categories];

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-40 bg-[#F5F5F5]/95 backdrop-blur-sm py-4 border-b border-[#043927]/10"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {allCategories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-[#043927] text-white shadow-lg'
                  : 'bg-white text-[#043927] border border-[#043927]/20 hover:border-[#043927]/40'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
