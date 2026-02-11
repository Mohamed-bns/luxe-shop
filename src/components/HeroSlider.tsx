'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Configuration avec les chemins exacts de vos images
const heroImages = [
  {
    src: '/hero/montres-hommes-haut.jpg.jpeg',
    alt: 'Montres Homme',
    title: 'Montres Homme',
    subtitle: 'Élégance masculine',
    link: '/collection/montres/homme',
  },
  {
    src: '/hero/montres-femmes-haut.jpg.jpeg',
    alt: 'Montres Femme',
    title: 'Montres Femme',
    subtitle: 'Sophistication féminine',
    link: '/collection/montres/femme',
  },
  {
    src: '/hero/lunnetes-haut.jpg.jpeg',
    alt: 'Lunettes de Soleil',
    title: 'Lunettes',
    subtitle: 'Style emblématique',
    link: '/collection/lunettes',
  },
  {
    src: '/hero/accessoires-haut.jpg.jpeg',
    alt: 'Accessoires Premium',
    title: 'Accessoires',
    subtitle: 'Complétez votre style',
    link: '/collection/accessoires',
  },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      if (newDirection === 1) {
        return prev === heroImages.length - 1 ? 0 : prev + 1;
      }
      return prev === 0 ? heroImages.length - 1 : prev - 1;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [paginate]);

  return (
    <section className="relative h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
          }}
          className="absolute inset-0"
        >
          {/* Image avec overlay */}
          <div className="relative w-full h-full">
            <Image
              src={heroImages[currentIndex].src}
              alt={heroImages[currentIndex].alt}
              fill
              priority
              className="object-cover"
            />
            {/* Overlay gradient luxueux */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#043927]/60 via-[#043927]/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#043927]/40 via-transparent to-transparent" />
          </div>

          {/* Texte et CTA */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="max-w-xl"
              >
                <span className="inline-block px-4 py-1 bg-[#D4AF37]/20 backdrop-blur-sm border border-[#D4AF37]/50 rounded-full text-[#D4AF37] text-sm font-medium tracking-wider uppercase mb-4">
                  {heroImages[currentIndex].subtitle}
                </span>
                <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
                  {heroImages[currentIndex].title}
                </h2>
                <Link
                  href={heroImages[currentIndex].link}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-[#D4AF37] text-white font-medium rounded-full hover:bg-[#D4AF37]/90 transition-all duration-300 hover:gap-4"
                >
                  Découvrir
                  <span className="text-lg">→</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-[#D4AF37] w-8'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Aller à la slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Flèches de navigation */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-10"
        aria-label="Slide précédente"
      >
        <span className="text-xl">←</span>
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-10"
        aria-label="Slide suivante"
      >
        <span className="text-xl">→</span>
      </button>
    </section>
  );
}
