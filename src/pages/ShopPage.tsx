import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ExternalLink, ShoppingBag } from 'lucide-react';
import { PRODUCTS, Product } from '../constants';
import { cn } from '../lib/utils';

const ShopProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [hasHoverError, setHasHoverError] = useState(false);

  const hoverCandidate = product.hoverImage || (product.images && product.images.length > 1 ? product.images[1] : undefined);
  const showHover = isHovered && hoverCandidate && !hasHoverError;
  const amazonUrl = product.amazonUrl || `https://www.amazon.com/s?k=HERMEN+${encodeURIComponent(product.name)}`;

  return (
    <motion.div 
      layout
      key={product.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="group cursor-pointer flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="border border-black rounded-2xl overflow-hidden bg-white flex flex-col h-full transition-all duration-300 group-hover:shadow-md">
        <div className="aspect-[4/5] overflow-hidden bg-white relative p-8 flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.name} 
            className={`max-w-full max-h-full object-contain transition-all duration-500 ${
              showHover ? 'opacity-0 scale-95' : 'opacity-100 group-hover:scale-105'
            }`}
            referrerPolicy="no-referrer"
          />

          {hoverCandidate && (
            <img 
              src={hoverCandidate} 
              alt={`${product.name} alternate`} 
              onError={() => setHasHoverError(true)}
              className={`absolute inset-0 m-auto p-8 max-w-full max-h-full object-contain transition-all duration-500 ${
                showHover ? 'opacity-100 scale-105' : 'opacity-0 scale-95 pointer-events-none'
              }`}
              referrerPolicy="no-referrer"
            />
          )}

          <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 z-10">
            <a
              href={amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-full py-2.5 bg-[#FF9900] hover:bg-[#E88B00] text-black text-[10px] tracking-widest font-bold uppercase rounded-lg shadow-lg flex items-center justify-center gap-1.5 transition-colors"
            >
              <ShoppingBag size={13} />
              <span>Shop Now</span>
              <ExternalLink size={11} />
            </a>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/product/${product.id}`);
              }}
              className="w-full py-2.5 bg-brand-primary text-white text-[10px] tracking-widest font-bold uppercase rounded-lg shadow-md hover:bg-brand-accent transition-colors"
            >
              View Details
            </button>
          </div>
        </div>

        {/* Text area inside border */}
        <div className="p-5 flex-1 flex flex-col justify-start border-t border-black/10">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] text-brand-accent uppercase tracking-widest font-semibold">{product.category}</span>
            <a
              href={amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[10px] font-semibold text-brand-primary/60 hover:text-brand-primary flex items-center gap-1"
            >
              <span>Shop Now</span>
              <ExternalLink size={11} />
            </a>
          </div>
          <h3 className="text-sm font-semibold mb-1 text-brand-primary">{product.name}</h3>
          <p className="text-xs text-brand-primary/60 line-clamp-2 leading-relaxed">{product.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export const ShopPage = () => {
  const [filter, setFilter] = useState<string>('all');

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
          <ShopProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

