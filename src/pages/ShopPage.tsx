import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { PRODUCTS } from '../constants';
import { cn } from '../lib/utils';

export const ShopPage = () => {
  const [filter, setFilter] = useState<string>('all');
  const navigate = useNavigate();

  const filteredProducts = filter === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);

  const categories = [
    { id: 'all', name: 'ALL' },
    { id: 'serum', name: 'SERUM' },
    { id: 'cream', name: 'CREAM' },
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h1 className="text-5xl font-light tracking-tighter mb-6">OUR PRODUCTS</h1>
        <p className="text-brand-primary/50 text-sm max-w-xl mx-auto">
          Discover HERMEN's professional skincare lineup, segmented by skin type and concern.
        </p>
      </div>

      <div className="flex justify-center space-x-8 mb-16 border-b border-black/5 pb-6">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={cn(
              "text-[10px] tracking-[0.2em] font-bold transition-colors",
              filter === cat.id ? "text-brand-primary" : "text-brand-primary/30 hover:text-brand-primary"
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {filteredProducts.map((product) => (
          <motion.div 
            layout
            key={product.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="group"
          >
            <div 
              className="aspect-[4/5] overflow-hidden bg-brand-secondary mb-6 relative cursor-pointer p-8 flex items-center justify-center"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/${product.id}`);
                  }}
                  className="w-full py-4 bg-brand-primary text-white text-[10px] tracking-widest font-bold uppercase shadow-xl"
                >
                  View Details
                </button>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div className="cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                <h3 className="text-sm font-medium mb-1">{product.name}</h3>
                <p className="text-[10px] text-brand-primary/40 uppercase tracking-widest mb-3">{product.category}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
