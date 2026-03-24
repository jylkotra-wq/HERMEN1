/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  Star, 
  ArrowRight,
  User,
  Heart,
  Sparkles,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';
import { PRODUCTS, Product } from './constants';
import { cn } from './lib/utils';

// --- Components ---

const Header = ({ cartCount }: { cartCount: number }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'BRAND', path: '/brand' },
    { name: 'PRODUCTS', path: '/shop' },
    { name: 'FINDER', path: '/finder' },
    { name: 'INQUIRY', path: '/inquiry' },
  ];

  const isMainPage = location.pathname === '/';
  const isWhite = isMainPage && !isScrolled;

  return (
    <header className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-500",
      isScrolled ? "bg-white py-4 shadow-sm" : "bg-transparent py-6"
    )}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-3 items-center">
        <Link 
          to="/"
          className="hover:opacity-70 transition-opacity flex items-center"
        >
          <img 
            src="/logo.png" 
            alt="HERMEN" 
            className="h-6 md:h-7 w-auto object-contain"
            onError={(e) => {
              // Fallback to text if image is missing
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                const text = document.createElement('span');
                text.className = cn("text-2xl font-bold tracking-[0.2em]", isWhite ? "text-white" : "text-black");
                text.innerText = "HERMEN";
                parent.appendChild(text);
              }
            }}
            referrerPolicy="no-referrer"
          />
        </Link>

        <nav className="hidden md:flex items-center justify-center space-x-12 col-start-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-xs tracking-[0.15em] font-medium transition-colors",
                isWhite ? "hover:text-white/70" : "hover:text-black/70",
                isWhite 
                  ? (location.pathname === item.path ? "text-white" : "text-white/60")
                  : (location.pathname === item.path ? "text-black" : "text-black/60")
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end space-x-6 col-start-2 md:col-start-3">
          <button 
            className={cn("md:hidden", isWhite ? "text-white" : "text-black")}
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[60] p-8 flex flex-col"
          >
            <div className="flex justify-end mb-12">
              <button onClick={() => setIsMobileMenuOpen(false)}><X size={32} /></button>
            </div>
            <div className="flex flex-col space-y-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-light tracking-tighter text-left"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Footer = () => (
  <footer className="bg-brand-secondary py-20 px-6 border-t border-black/5">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-2">
        <img src="/logo.png" alt="HERMEN" className="h-8 mb-6" />
        <p className="text-sm text-brand-primary/60 max-w-md leading-relaxed">
          HERMEN believes in the power of skin. We combine scientific data with the purity of nature to propose the optimal skincare solution just for you.
        </p>
      </div>
      <div>
        <h3 className="text-xs font-bold tracking-widest mb-6 uppercase">Customer Service</h3>
        <ul className="text-sm text-brand-primary/60 space-y-3">
          <li>Customer Service: +82 (0) 507-1438-5539</li>
          <li>Weekdays 10:00 - 17:00 (KST, UTC+9) </li>
          <li>Lunch 12:00 - 13:00 (KST, UTC+9) </li>
          <li>Closed on weekends and holidays</li>
        </ul>
      </div>
      <div>
        <h3 className="text-xs font-bold tracking-widest mb-6 uppercase">Information</h3>
        <ul className="text-sm text-brand-primary/60 space-y-3">
          <li>Terms of Service</li>
          <li>Privacy Policy</li>
          <li>Shipping Guide</li>
          <li><a href="https://www.hermen.co.kr/brand" className="hover:text-brand-primary transition-colors">About Us</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-brand-primary/40 tracking-widest uppercase">
      <p>© 2026 HERMEN. ALL RIGHTS RESERVED.</p>
      <div className="flex space-x-6 mt-4 md:mt-0">
        <a href="https://www.instagram.com/hermen_global?igsh=bXVucTFyOTE2eWph" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">Instagram</a>
        <span>Youtube</span>
        <span>Kakao</span>
      </div>
    </div>
  </footer>
);

// --- Pages ---

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=2000" 
            alt="Luxury Skincare" 
            className="w-full h-full object-cover"
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
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    const h1 = document.createElement('h1');
                    h1.className = "text-7xl md:text-9xl font-extralight tracking-[-0.05em] text-white leading-none";
                    h1.innerText = "HERMEN";
                    parent.appendChild(h1);
                  }
                }}
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
              <a 
                href="mailto:hermen@hermen.co.kr"
                className="px-12 py-5 bg-white text-brand-primary text-[10px] tracking-[0.3em] font-bold uppercase hover:bg-brand-primary hover:text-white transition-all duration-700 min-w-[240px] text-center"
              >
                INQUIRY
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
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

      {/* Featured Products */}
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

      {/* FINDER CTA */}
      <section className="bg-brand-primary py-32 px-6 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Sparkles className="mx-auto mb-8 opacity-50" size={40} />
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8">Do you need an accurate prescription for your skin?</h2>
          <p className="text-white/60 text-sm mb-12 leading-relaxed">
            HERMEN's AI skin analysis algorithm analyzes your current skin condition and concerns to recommend the most suitable routine.
          </p>
          <Link 
            to="/finder"
            className="px-12 py-5 bg-white text-brand-primary text-xs tracking-[0.2em] font-bold uppercase hover:bg-brand-accent hover:text-white transition-all duration-300 inline-block"
          >
            Start Skin FINDER
          </Link>
        </div>
      </section>
    </div>
  );
};

const ShopPage = ({ onAddToCart }: { onAddToCart: (p: Product) => void }) => {
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

const FinderPage = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{ skinType?: string; concern?: string }>({});
  const [result, setResult] = useState<Product | null>(null);
  const navigate = useNavigate();

  const steps = [
    {
      question: "What is your skin type?",
      key: "skinType",
      options: [
        { label: "Dry (Dry and tight)", value: "dry" },
        { label: "Oily (Greasy and oily)", value: "oily" },
        { label: "Sensitive (Easily reddened and sensitive)", value: "sensitive" },
        { label: "Combination (Different by area)", value: "combination" },
      ]
    },
    {
      question: "What is your biggest skin concern?",
      key: "concern",
      options: [
        { label: "Acne & Troubles", value: "acne" },
        { label: "Elasticity & Wrinkles", value: "aging" },
        { label: "Lack of Moisture & Dryness", value: "hydration" },
        { label: "Skin Calming", value: "calming" },
        { label: "Dull Skin Tone", value: "brightening" },
      ]
    }
  ];

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [steps[step].key]: value };
    setAnswers(newAnswers);
    
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      // Calculate result
      const recommended = PRODUCTS.find(p => 
        p.concern.includes(newAnswers.concern as any) || 
        p.skinType.includes(newAnswers.skinType as any)
      ) || PRODUCTS[0];
      setResult(recommended);
      setStep(step + 1);
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-3xl mx-auto min-h-[70vh] flex flex-col justify-center">
      <AnimatePresence mode="wait">
        {step < steps.length ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-brand-accent mb-6 block">Question 0{step + 1}</span>
            <h2 className="text-3xl font-light tracking-tight mb-12">{steps[step].question}</h2>
            <div className="grid grid-cols-1 gap-4">
              {steps[step].options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer(opt.value)}
                  className="p-6 border border-black/10 text-sm hover:border-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300 text-left flex justify-between items-center group"
                >
                  {opt.label}
                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="mb-12">
              <CheckCircle2 className="mx-auto mb-6 text-green-500" size={48} />
              <h2 className="text-3xl font-light tracking-tight mb-4">Analysis Complete!</h2>
              <p className="text-brand-primary/50 text-sm">Here are HERMEN's recommended products to solve your skin concerns.</p>
            </div>

            {result && (
              <div className="bg-brand-secondary p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 text-left mb-12">
                <div className="aspect-[4/5] w-48 flex-shrink-0 overflow-hidden shadow-2xl bg-white p-4 flex items-center justify-center">
                  <img src={result.image} alt={result.name} className="max-w-full max-h-full object-contain" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-brand-accent mb-2 block">Recommended for you</span>
                  <h3 className="text-2xl font-medium mb-4">{result.name}</h3>
                  <p className="text-sm text-brand-primary/60 mb-8 leading-relaxed">{result.description}</p>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => navigate(`/product/${result.id}`)}
                      className="px-8 py-4 bg-brand-primary text-white text-[10px] tracking-widest font-bold uppercase"
                    >
                      View Product
                    </button>
                    <button 
                      onClick={() => { setStep(0); setAnswers({}); setResult(null); }}
                      className="px-8 py-4 border border-brand-primary text-brand-primary text-[10px] tracking-widest font-bold uppercase"
                    >
                      Retry FINDER
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProductDetailPage = ({ onAddToCart }: { onAddToCart: (p: Product) => void }) => {
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
          <div className="aspect-[4/5] overflow-hidden bg-brand-secondary shadow-2xl p-12 flex items-center justify-center">
            <motion.img 
              key={selectedImage}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              src={selectedImage} 
              alt={product.name} 
              className="max-w-full max-h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex gap-4">
            {product.images.map((img, index) => (
              <button 
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 border ${selectedImage === img ? 'border-brand-primary' : 'border-black/10'} p-2`}
              >
                <img src={img} alt={`${product.name} ${index}`} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="mb-12">
            <span className="text-[10px] tracking-[0.3em] uppercase text-brand-accent mb-4 block">{product.category}</span>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-6">{product.name}</h1>
            <p className="text-brand-primary/70 leading-relaxed mb-12">{product.description}</p>
          </div>

          <div className="space-y-8 mb-12">
            <div>
              <h4 className="text-[10px] tracking-[0.2em] font-bold uppercase mb-4">Skin Types</h4>
              <div className="flex flex-wrap gap-2">
                {product.skinType.map(type => (
                  <span key={type} className="px-3 py-1 bg-brand-secondary text-[10px] uppercase tracking-wider rounded-full">
                    {type}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-[10px] tracking-[0.2em] font-bold uppercase mb-4">Concerns</h4>
              <div className="flex flex-wrap gap-2">
                {product.concern.map(c => (
                  <span key={c} className="px-3 py-1 bg-brand-secondary text-[10px] uppercase tracking-wider rounded-full">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-black/5 space-y-8">
            <div className="space-y-4">
              <h4 className="text-[10px] tracking-[0.2em] font-bold uppercase">Product Information</h4>
              <p className="text-xs text-brand-primary/60 leading-relaxed">
                This product has completed skin irritation tests and is designed to be suitable for all skin types.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] tracking-[0.2em] font-bold uppercase">Ingredients</h4>
              <p className="text-xs text-brand-primary/60 leading-relaxed">
                Purified water, Glycerin, Butylene glycol, Niacinamide, 1,2-Hexanediol, Panthenol, Sodium hyaluronate, Centella asiatica extract, Allantoin, Ethylhexylglycerin, Disodium EDTA.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] tracking-[0.2em] font-bold uppercase">How to Use</h4>
              <p className="text-xs text-brand-primary/60 leading-relaxed">
                Apply an appropriate amount gently over the entire face and pat lightly to absorb. Use in the morning and evening skincare steps.
              </p>
            </div>
            <div className="space-y-4">
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
          {product.images.map((img, index) => (
            <img 
              key={index} 
              src={img} 
              alt={`${product.name} detail ${index}`} 
              className="w-full h-auto object-contain"
              referrerPolicy="no-referrer"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const BrandPage = () => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto text-center">
      <h1 className="text-5xl font-light tracking-tighter mb-12">Our Philosophy</h1>
      <div className="aspect-video mb-16 overflow-hidden bg-brand-secondary flex items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=1200" 
          alt="Brand Philosophy" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="space-y-16 max-w-2xl mx-auto">
        <div className="space-y-10 text-left">
          <h2 className="text-3xl font-light tracking-tight text-center">Preserve the moment.</h2>
          <div className="space-y-6 text-brand-primary/70 leading-relaxed text-center md:text-left">
            <p>
              Every day is made up of moments that matter, such as your commute, a date, an important meeting, and time with family.
            </p>
            <p>
              And surprisingly, even small stresses on your skin can interrupt an otherwise good day.
            </p>
            <p>
              Hermen was created to reduce those small breakdowns.
              Rooted in Korea's refined approach to formulation, we design care for skin that is built to last, supporting comfort and a healthy look throughout the day.
            </p>
            <p className="pt-4 font-medium text-brand-primary text-center">
              We're here for every moment of your day,<br/>
              helping you preserve the moment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const InquiryPage = () => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-2xl mx-auto">
      <h1 className="text-5xl font-light tracking-tighter mb-12 text-center">Inquiry</h1>
      <div className="space-y-6 text-center">
        <p className="text-brand-primary/70 leading-relaxed">
          For any questions, partnership opportunities, or customer support, please feel free to reach out to us.
        </p>
        <a 
          href="mailto:hermen@hermen.co.kr"
          className="inline-block px-12 py-5 bg-brand-primary text-white text-[10px] tracking-[0.3em] font-bold uppercase hover:bg-brand-accent transition-all duration-700 min-w-[240px]"
        >
          SEND EMAIL
        </a>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [cart, setCart] = useState<Product[]>([]);
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <BrowserRouter>
      <AppContent cart={cart} onAddToCart={handleAddToCart} showToast={showToast} />
    </BrowserRouter>
  );
}

function AppContent({ cart, onAddToCart, showToast }: { 
  cart: Product[], 
  onAddToCart: (p: Product) => void,
  showToast: boolean 
}) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartCount={cart.length} />

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage onAddToCart={onAddToCart} />} />
              <Route path="/finder" element={<FinderPage />} />
              <Route path="/product/:id" element={<ProductDetailPage onAddToCart={onAddToCart} />} />
              <Route path="/brand" element={<BrandPage />} />
              <Route path="/inquiry" element={<InquiryPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 right-10 z-[100] bg-brand-primary text-white px-8 py-4 shadow-2xl flex items-center space-x-4"
          >
            <ShoppingBag size={18} />
            <span className="text-xs font-bold tracking-widest uppercase">Added to Cart</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
