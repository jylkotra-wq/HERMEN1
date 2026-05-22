import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../constants';

export const HomePage = () => {
  const navigate = useNavigate();
  const [heroImgSrc, setHeroImgSrc] = useState('/home-hero.jpg');

  const handleHeroImageError = () => {
    if (heroImgSrc === '/home-hero.jpg') {
      setHeroImgSrc('/home-hero.png');
    } else if (heroImgSrc === '/home-hero.png') {
      setHeroImgSrc('/home-hero.jpeg');
    } else if (heroImgSrc === '/home-hero.jpeg') {
      setHeroImgSrc('https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=2000');
    }
  };

  return (
    <div className="w-full">
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={heroImgSrc} 
            alt="Luxury Skincare" 
            className="w-full h-full object-cover"
            onError={handleHeroImageError}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
        </motion.div>
        
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <span className="block text-[10px] tracking-[0.6em] uppercase mb-8 text-white/80 font-light">
              The Essence of Timeless Beauty
            </span>
            <div className="mb-12 flex justify-center">
              <img 
                src="/logo.png" 
                alt="HERMEN" 
                className="h-16 md:h-28 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Link 
                to="/shop"
                className="px-12 py-5 bg-white text-brand-primary text-[10px] tracking-[0.3em] font-bold uppercase hover:bg-brand-primary hover:text-white transition-all duration-700 min-w-[240px] text-center"
              >
                Explore Collection
              </Link>
              <Link 
                to="/brand"
                className="px-12 py-5 border border-white/30 text-white text-[10px] tracking-[0.3em] font-bold uppercase hover:bg-white hover:text-brand-primary transition-all duration-700 min-w-[240px] backdrop-blur-sm text-center"
              >
                Our Story
              </Link>
              <Link 
                to="/inquiry"
                className="px-12 py-5 bg-white text-brand-primary text-[10px] tracking-[0.3em] font-bold uppercase hover:bg-brand-primary hover:text-white transition-all duration-700 min-w-[240px] text-center"
              >
                INQUIRY
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-[9px] tracking-[0.3em] uppercase text-white/40 mb-4">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-transparent" />
        </motion.div>
      </section>

      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-brand-accent mb-4 block">Best Sellers</span>
            <h2 className="text-4xl font-light tracking-tight">HERMEN's Most Loved Solutions</h2>
          </div>
          <Link 
            to="/shop"
            className="group flex items-center text-xs tracking-widest font-bold uppercase mt-8 md:mt-0"
          >
            View All <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {PRODUCTS.slice(0, 3).map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="aspect-[4/5] overflow-hidden bg-brand-secondary mb-6 relative p-8 flex items-center justify-center">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-white/90 backdrop-blur-sm">
                  <button className="w-full py-3 bg-brand-primary text-white text-[10px] tracking-widest font-bold uppercase">
                    View Details
                  </button>
                </div>
              </div>
              <h3 className="text-sm font-medium mb-2">{product.name}</h3>
              <p className="text-xs text-brand-primary/50 mb-4 line-clamp-1">{product.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-brand-primary py-32 px-6 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Sparkles className="mx-auto mb-8 opacity-50" size={40} />
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8">Do you need an accurate prescription for your skin?</h2>
          <p className="text-white/60 text-sm mb-12 leading-relaxed">
            HERMEN's AI skin analysis algorithm analyzes your current skin condition and concerns to recommend the most suitable routine.
          </p>
          <Link 
            to="/analysis"
            className="px-12 py-5 bg-white text-brand-primary text-xs tracking-[0.2em] font-bold uppercase hover:bg-brand-accent hover:text-white transition-all duration-300 inline-block"
          >
            Start Solution FINDER
          </Link>
        </div>
      </section>
    </div>
  );
};
