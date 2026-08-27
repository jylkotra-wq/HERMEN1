import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { PRODUCTS, Product } from '../constants';

const ProductCard = ({ product, idx, onClick }: { product: Product; idx: number; onClick: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hasHoverError, setHasHoverError] = useState(false);

  // Secondary/hover image candidates if user uploads new files
  const hoverCandidate = product.hoverImage || (product.images && product.images.length > 1 ? product.images[1] : undefined);
  const showHover = isHovered && hoverCandidate && !hasHoverError;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      className="group cursor-pointer flex flex-col h-full"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="border border-black rounded-2xl overflow-hidden bg-white flex flex-col h-full transition-all duration-300 group-hover:shadow-md">
        {/* Main image area */}
        <div className="aspect-[4/5] overflow-hidden bg-white relative p-8 flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.name} 
            className={`max-w-full max-h-full object-contain transition-all duration-500 ${
              showHover ? 'opacity-0 scale-95' : 'opacity-100 group-hover:scale-105'
            }`}
            referrerPolicy="no-referrer"
          />

          {/* Hover image (fades in on hover) */}
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

          <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-white/90 backdrop-blur-sm z-10">
            <button className="w-full py-3 bg-brand-primary text-white text-[10px] tracking-widest font-bold uppercase rounded-lg shadow">
              View Details
            </button>
          </div>
        </div>

        {/* Text description area inside the border */}
        <div className="p-5 flex-1 flex flex-col justify-start border-t border-black/10">
          <h3 className="text-sm font-semibold mb-1.5 text-brand-primary">{product.name}</h3>
          <p className="text-xs text-brand-primary/60 line-clamp-2 leading-relaxed">{product.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export const HomePage = () => {
  const navigate = useNavigate();
  const [heroImgSrc, setHeroImgSrc] = useState('/home-hero.jpg');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

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
      {/* Hero Section: Full width edge-to-edge hero extending under navigation bar */}
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

      <section className="pt-8 md:pt-12 pb-20 md:pb-28 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-brand-accent mb-3 block">Best Sellers</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">HERMEN's Most Loved Solutions</h2>
          </div>
          <Link 
            to="/shop"
            className="group flex items-center text-xs tracking-widest font-bold uppercase mt-6 md:mt-0"
          >
            View All <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.slice(0, 3).map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              idx={idx}
              onClick={() => navigate(`/product/${product.id}`)}
            />
          ))}

          {/* 4th Column: Brand Video Player Card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col h-full"
          >
            <div className="rounded-2xl overflow-hidden relative flex flex-col h-full w-full aspect-[4/5] sm:aspect-auto sm:h-full">
              <video 
                ref={videoRef}
                autoPlay 
                loop 
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover block"
                poster="/home-hero.jpg"
              >
                <source src="/brand-video.mp4" type="video/mp4" />
                <source src="/video.mp4" type="video/mp4" />
                <source src="https://assets.mixkit.co/videos/preview/mixkit-applying-face-cream-on-the-cheek-41138-large.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Video control buttons */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 z-20">
                <button 
                  onClick={toggleMute}
                  type="button"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                  className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md flex items-center justify-center transition-colors"
                >
                  {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>
                <button 
                  onClick={togglePlay}
                  type="button"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                  className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md flex items-center justify-center transition-colors"
                >
                  {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
                </button>
              </div>
            </div>
          </motion.div>
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

