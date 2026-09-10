import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS, Product } from '../constants';
import { TikTokSection } from '../components/home/TikTokSection';

const ProductCard = ({ product, idx, onClick }: { product: Product; idx: number; onClick: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hasHoverError, setHasHoverError] = useState(false);

  const hoverCandidate = product.hoverImage || (product.images && product.images.length > 1 ? product.images[1] : undefined);
  const showHover = isHovered && hoverCandidate && !hasHoverError;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.08 }}
      className="group cursor-pointer flex flex-col h-full select-none"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="border border-neutral-200 rounded-2xl overflow-hidden bg-white flex flex-col justify-between h-full transition-all duration-300 hover:shadow-lg p-3 sm:p-4">
        {/* Main Product Image Area */}
        <div className="w-full flex-1 aspect-square lg:aspect-auto min-h-[200px] sm:min-h-[230px] overflow-hidden bg-white relative flex items-center justify-center py-2 sm:py-4">
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
              className={`absolute inset-0 m-auto p-2 max-w-full max-h-full object-contain transition-all duration-500 ${
                showHover ? 'opacity-100 scale-105' : 'opacity-0 scale-95 pointer-events-none'
              }`}
              referrerPolicy="no-referrer"
            />
          )}
        </div>

        {/* Product Name & View Details Button */}
        <div className="pt-2 sm:pt-3 flex flex-col justify-between flex-shrink-0">
          <div>
            <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-brand-primary line-clamp-2 text-center sm:text-left min-h-[32px] sm:min-h-[40px]">
              {product.name}
            </h3>
          </div>

          {/* Bottom Action Button: View Details */}
          <div className="mt-3 sm:mt-4">
            <button 
              type="button"
              className="w-full py-2.5 px-3 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-white text-[11px] sm:text-xs font-bold tracking-wider uppercase flex items-center justify-center transition-all shadow-sm active:scale-[0.98]"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const HomePage = () => {
  const navigate = useNavigate();
  const [heroImgSrc, setHeroImgSrc] = useState('/home-hero.jpg');

  // Mobile/Tablet product slider controls & dots pagination
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);
  const totalProducts = PRODUCTS.length;

  const updateScrollState = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      setActiveDot(0);
      return;
    }
    const ratio = scrollLeft / maxScroll;
    const index = Math.round(ratio * (totalProducts - 1));
    setActiveDot(Math.min(Math.max(0, index), totalProducts - 1));
  };

  const scrollToDot = (index: number) => {
    if (!sliderRef.current) return;
    const { scrollWidth, clientWidth } = sliderRef.current;
    const maxScroll = scrollWidth - clientWidth;
    const targetScroll = (index / (totalProducts - 1)) * maxScroll;
    sliderRef.current.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    });
    setActiveDot(index);
  };

  useEffect(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, [totalProducts]);

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
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden flex flex-col items-center justify-center bg-white">
        <div className="w-full">
          <img 
            src={heroImgSrc} 
            alt="Luxury Skincare" 
            className="w-full h-auto min-w-full object-cover block"
            onError={handleHeroImageError}
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="pt-8 md:pt-12 pb-6 md:pb-10 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mb-6 md:mb-10">
          <div className="w-full sm:w-auto">
            <span className="text-[10px] tracking-[0.3em] uppercase text-brand-accent mb-1.5 sm:mb-3 block font-semibold">
              Best Sellers
            </span>
            <h2 className="text-[18px] min-[360px]:text-[20px] sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
              HERMEN&apos;s Most Loved Solutions
            </h2>
          </div>
          
          <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-4">
            <Link 
              to="/shop"
              className="group flex items-center text-xs tracking-widest font-bold uppercase ml-auto sm:ml-0 text-brand-primary hover:text-brand-accent transition-colors"
            >
              View All <ArrowRight className="ml-1.5 group-hover:translate-x-1.5 transition-transform" size={15} />
            </Link>
          </div>
        </div>

        {/* Mobile/Tablet View: Product Carousel with Dots (< lg) */}
        <div className="block lg:hidden">
          <div 
            ref={sliderRef}
            onScroll={updateScrollState}
            className="flex gap-3 sm:gap-6 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth pb-2 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] touch-pan-x"
          >
            {PRODUCTS.map((product, idx) => (
              <div 
                key={product.id}
                className="w-[calc(50%-6px)] min-w-[calc(50%-6px)] sm:w-[calc(33.333%-16px)] sm:min-w-[calc(33.333%-16px)] flex-shrink-0 snap-start"
              >
                <ProductCard
                  product={product}
                  idx={idx}
                  onClick={() => navigate(`/product/${product.id}`)}
                />
              </div>
            ))}
          </div>

          {/* Dots Pagination below Products matching Mobile */}
          <div className="flex items-center justify-center gap-2.5 mt-6">
            {PRODUCTS.map((_, dotIdx) => {
              const isActive = activeDot === dotIdx;
              return (
                <button
                  key={dotIdx}
                  onClick={() => scrollToDot(dotIdx)}
                  type="button"
                  aria-label={`Go to product ${dotIdx + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'w-3.5 h-3.5 bg-[#54c7ec] scale-110 shadow-sm' 
                      : 'w-3 h-3 bg-[#c2ecf8] hover:bg-[#a6e2f4]'
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* PC View (lg+): 3 Products + 1 Brand Video all with identical width & height */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6 items-stretch">
          {PRODUCTS.slice(0, 3).map((product, idx) => (
            <div key={product.id} className="h-full flex flex-col">
              <ProductCard
                product={product}
                idx={idx}
                onClick={() => navigate(`/product/${product.id}`)}
              />
            </div>
          ))}

          {/* Brand Video Card: Same dimensions and height as product cards */}
          <div className="h-full flex flex-col">
            <div className="relative w-full h-full min-h-[380px] rounded-2xl overflow-hidden bg-neutral-900 shadow-sm border border-neutral-200 flex flex-col justify-between transition-all duration-300 hover:shadow-lg group">
              <video
                src="/brand-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover block absolute inset-0 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* TikTok Infinite Centered Video Carousel Section */}
      <TikTokSection />

      {/* AI Prescription Consultation Section */}
      <section className="bg-brand-primary mt-4 md:mt-8 py-20 md:py-28 px-6 text-white text-center">
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

