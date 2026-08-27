import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ShoppingBag, ExternalLink, ShieldCheck } from 'lucide-react';
import { PRODUCTS } from '../constants';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find(p => p.id === id);
  const [selectedImage, setSelectedImage] = useState(product?.image || '');

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="pt-40 pb-20 px-6 text-center">
        <h2 className="text-2xl font-light mb-8">Product not found.</h2>
        <Link to="/shop" className="text-brand-primary underline text-sm">Back to Shop</Link>
      </div>
    );
  }

  const amazonUrl = product.amazonUrl || `https://www.amazon.com/s?k=HERMEN+${encodeURIComponent(product.name)}`;

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-[10px] tracking-[0.2em] font-bold uppercase mb-12 hover:opacity-60 transition-opacity"
      >
        <ArrowLeft size={16} className="mr-2" /> Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
        <div className="space-y-4">
          <div className="aspect-[4/5] overflow-hidden bg-white border border-black/10 rounded-2xl shadow-xs p-10 flex items-center justify-center">
            <motion.img 
              key={selectedImage}
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              src={selectedImage} 
              alt={product.name} 
              className="max-w-full max-h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex gap-3 flex-wrap">
            {product.images.map((img, index) => (
              <button 
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 border bg-white rounded-xl ${selectedImage === img ? 'border-brand-primary ring-2 ring-brand-primary/20' : 'border-black/10 hover:border-black/30'} p-2 overflow-hidden flex items-center justify-center transition-all`}
              >
                <img src={img} alt={`${product.name} ${index}`} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="mb-8">
            <span className="text-[10px] tracking-[0.3em] uppercase text-brand-accent mb-4 block">{product.category}</span>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-6">{product.name}</h1>
            <p className="text-brand-primary/70 leading-relaxed mb-6">{product.description}</p>
          </div>

          {/* Shop Now CTA Section */}
          <div className="py-6 border-y border-black/10 mb-8 space-y-3">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <a
                href={amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-4 px-8 bg-[#FF9900] hover:bg-[#E88B00] text-black font-semibold text-xs tracking-[0.18em] uppercase transition-all duration-300 flex items-center justify-center gap-2.5 rounded-xl shadow-xs group"
              >
                <ShoppingBag size={17} />
                <span>Shop Now</span>
                <ExternalLink size={15} className="opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              
              <Link
                to="/inquiry"
                className="py-4 px-6 border border-black/20 hover:border-brand-primary text-brand-primary text-xs tracking-[0.15em] font-semibold uppercase hover:bg-black/5 transition-all flex items-center justify-center rounded-xl whitespace-nowrap"
              >
                B2B Wholesale
              </Link>
            </div>
            <p className="text-[11px] text-brand-primary/50 flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-brand-accent" />
              Official HERMEN Store on Amazon. Global shipping & verified authenticity.
            </p>
          </div>

          <div className="space-y-6 mb-10">
            <div>
              <h4 className="text-[10px] tracking-[0.2em] font-bold uppercase mb-3 text-brand-primary/80">Skin Types</h4>
              <div className="flex flex-wrap gap-2">
                {product.skinType.map(type => (
                  <span key={type} className="px-3.5 py-1.5 bg-white border border-black/10 text-[10px] uppercase tracking-wider rounded-full font-medium text-brand-primary/80">
                    {type}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-[10px] tracking-[0.2em] font-bold uppercase mb-3 text-brand-primary/80">Concerns</h4>
              <div className="flex flex-wrap gap-2">
                {product.concern.map(c => (
                  <span key={c} className="px-3.5 py-1.5 bg-white border border-black/10 text-[10px] uppercase tracking-wider rounded-full font-medium text-brand-primary/80">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-black/5 space-y-8">
            <div className="space-y-3">
              <h4 className="text-[10px] tracking-[0.2em] font-bold uppercase">Product Information</h4>
              <p className="text-xs text-brand-primary/60 leading-relaxed">
                This product has completed skin irritation tests and is designed to be suitable for all skin types.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-[10px] tracking-[0.2em] font-bold uppercase">Ingredients</h4>
              <p className="text-xs text-brand-primary/60 leading-relaxed">
                Purified water, Glycerin, Butylene glycol, Niacinamide, 1,2-Hexanediol, Panthenol, Sodium hyaluronate, Centella asiatica extract, Allantoin, Ethylhexylglycerin, Disodium EDTA.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-[10px] tracking-[0.2em] font-bold uppercase">How to Use</h4>
              <p className="text-xs text-brand-primary/60 leading-relaxed">
                Apply an appropriate amount gently over the entire face and pat lightly to absorb. Use in the morning and evening skincare steps.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-[10px] tracking-[0.2em] font-bold uppercase">Capacity and Packing Specifications</h4>
              <p className="text-xs text-brand-primary/60 leading-relaxed">
                Capacity: 50ml / 1.69 fl.oz. | Packaging: Recyclable glass container and eco-friendly paper packaging used.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24">
        <h3 className="text-[10px] tracking-[0.2em] font-bold uppercase mb-8">Product Details</h3>
        <div className="space-y-8">
          {product.images.map((img, index) => {
            const isSmallImage = img.includes('calming-serum.png') || 
                                 img.includes('balancing-serum.png') || 
                                 img.includes('barrier-cream.png');
            return (
              <img 
                key={index} 
                src={img} 
                alt={`${product.name} detail ${index}`} 
                className={isSmallImage ? "w-1/2 mx-auto h-auto object-contain" : "w-full h-auto object-contain"}
                referrerPolicy="no-referrer"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
