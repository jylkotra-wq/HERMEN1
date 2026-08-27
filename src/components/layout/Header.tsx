import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Search, ArrowRight, ShieldCheck, ShoppingBag, Sparkles, HelpCircle, FileText, Info } from 'lucide-react';
import { cn } from '../../lib/utils';
import { SITE_SEARCH_INDEX, SearchItem } from '../../data/searchData';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isSearchOpen]);

  // Handle ESC key to close search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  const navItems = [
    { name: 'BRAND', path: '/brand' },
    { name: 'PRODUCTS', path: '/shop' },
    { name: 'ANALYSIS', path: '/analysis' },
    { name: 'TRUST', path: '/trust' },
    { name: 'INQUIRY', path: '/inquiry' },
  ];

  const trimmedQuery = searchQuery.trim().toLowerCase();

  // Search filter across title, description, keywords, category
  const searchResults: SearchItem[] = trimmedQuery
    ? SITE_SEARCH_INDEX.filter((item) => {
        const titleMatch = item.title.toLowerCase().includes(trimmedQuery);
        const descMatch = item.description.toLowerCase().includes(trimmedQuery);
        const catMatch = item.category.toLowerCase().includes(trimmedQuery);
        const kwMatch = item.keywords.some((kw) => kw.includes(trimmedQuery));
        return titleMatch || descMatch || catMatch || kwMatch;
      })
    : [];

  // Group search results by category
  const categories: SearchItem['category'][] = ['Product', 'Certification', 'Brand Story', 'Service', 'Contact & Support'];
  const groupedResults = categories.map((cat) => ({
    category: cat,
    items: searchResults.filter((item) => item.category === cat),
  })).filter((group) => group.items.length > 0);

  const handleNavigate = (path: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    navigate(path);
  };

  const popularKeywords = ['CPNP', 'MoCRA', 'Serum', 'Cream', 'Barrier', 'B2B Wholesale', 'Skin Analysis', 'Dossier', 'R&D'];

  const getCategoryIcon = (category: SearchItem['category']) => {
    switch (category) {
      case 'Product': return ShoppingBag;
      case 'Certification': return ShieldCheck;
      case 'Brand Story': return Info;
      case 'Service': return Sparkles;
      case 'Contact & Support': return HelpCircle;
      default: return FileText;
    }
  };

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        isScrolled ? "bg-white/95 backdrop-blur-md py-4 shadow-sm" : "bg-white/80 backdrop-blur-sm py-5"
      )}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Left: Logo */}
          <Link to="/" className="hover:opacity-70 transition-opacity flex items-center flex-shrink-0">
            <img 
              src="/logo.png" 
              alt="HERMEN" 
              className="h-6 md:h-7 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </Link>

          {/* Center: Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-10 mx-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-xs tracking-[0.15em] font-medium transition-colors duration-300 py-2 px-1 block relative whitespace-nowrap",
                  location.pathname === item.path
                    ? "text-brand-primary font-bold border-b-2 border-brand-primary pb-0.5"
                    : "text-brand-primary/70 hover:text-brand-primary"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center space-x-4 sm:space-x-5 flex-shrink-0">
            {/* Search Button Header */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 p-2 rounded-full transition-all duration-300 hover:scale-105 text-brand-primary hover:bg-black/5"
              title="Search HERMEN"
              aria-label="Search"
            >
              <Search size={18} />
              <span className="hidden lg:inline text-xs tracking-widest font-medium opacity-80 uppercase">
                Search
              </span>
            </button>

            <button 
              className="md:hidden text-black p-1"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Search Fullscreen Overlay Modal - Rendered via React Portal onto document.body to ensure true 100vw/100vh overlay */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 w-screen h-screen bg-white z-[99999] text-brand-primary flex flex-col p-6 sm:p-10 md:p-14 overflow-y-auto"
            >
              <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
                {/* Search Modal Top Bar */}
                <div className="flex items-center justify-between pb-6 border-b border-black/10">
                  <div className="flex items-center gap-3">
                    <Search size={20} className="text-brand-accent" />
                    <span className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-primary/60">
                      Search HERMEN
                    </span>
                  </div>
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="p-2 text-brand-primary/60 hover:text-brand-primary hover:bg-black/5 rounded-full transition-all flex items-center gap-2"
                    aria-label="Close search"
                  >
                    <span className="text-xs font-mono tracking-wider hidden sm:inline text-brand-primary/50">ESC</span>
                    <X size={22} />
                  </button>
                </div>

                {/* Main Search Input */}
                <div className="py-8 border-b border-black/10">
                  <div className="relative">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Enter search terms (e.g., CPNP, MoCRA, Cream, Serum, B2B...)"
                      className="w-full bg-transparent text-xl sm:text-2xl md:text-3xl font-light tracking-tight text-brand-primary placeholder:text-brand-primary/30 focus:outline-none border-none py-2"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-xs font-medium text-brand-primary/40 hover:text-brand-primary px-3 py-1 bg-black/5 rounded-full"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                {/* Quick Keywords / Popular Searches */}
                {!trimmedQuery && (
                  <div className="py-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary/50 mb-4">
                      Popular Inquiries & Search Terms
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {popularKeywords.map((kw) => (
                        <button
                          key={kw}
                          onClick={() => setSearchQuery(kw)}
                          className="px-5 py-2.5 rounded-full bg-brand-secondary/70 hover:bg-brand-secondary border border-black/5 text-xs font-medium text-brand-primary tracking-wide transition-all shadow-xs hover:border-black/15"
                        >
                          {kw}
                        </button>
                      ))}
                    </div>

                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-black/5 text-xs text-brand-primary/60">
                      <div className="p-4 rounded-xl bg-brand-secondary/40 border border-black/5 space-y-1">
                        <p className="font-semibold text-brand-primary text-sm">Product Discovery</p>
                        <p>Browse signature formulations, active ingredients, and dermatological lines.</p>
                      </div>
                      <div className="p-4 rounded-xl bg-brand-secondary/40 border border-black/5 space-y-1">
                        <p className="font-semibold text-brand-primary text-sm">Global Compliance</p>
                        <p>Search CPNP, MoCRA, ASEAN, Halal, and market certification details.</p>
                      </div>
                      <div className="p-4 rounded-xl bg-brand-secondary/40 border border-black/5 space-y-1">
                        <p className="font-semibold text-brand-primary text-sm">B2B & Distribution</p>
                        <p>Explore wholesale guidelines, minimum order quantities, and sample requests.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Live Search Results */}
                {trimmedQuery && (
                  <div className="flex-1 py-6 space-y-8 overflow-y-auto pr-2">
                    <div className="flex items-center justify-between text-xs font-medium text-brand-primary/50">
                      <span>{searchResults.length} {searchResults.length === 1 ? 'match found' : 'matches found'}</span>
                      <span className="font-mono">Press enter or click to view</span>
                    </div>

                    {groupedResults.length > 0 ? (
                      groupedResults.map((group) => {
                        const IconComp = getCategoryIcon(group.category);
                        return (
                          <div key={group.category} className="space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-primary/70 flex items-center gap-2 pb-2 border-b border-black/10">
                              <IconComp size={15} className="text-brand-accent" /> {group.category} <span className="text-brand-primary/40 font-normal">({group.items.length})</span>
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                              {group.items.map((item) => (
                                <div
                                  key={item.id}
                                  onClick={() => handleNavigate(item.path)}
                                  className="group p-5 bg-white hover:bg-brand-secondary/40 border border-black/10 hover:border-black/20 rounded-xl cursor-pointer transition-all flex items-start justify-between gap-4 shadow-2xs hover:shadow-xs"
                                >
                                  {item.image && (
                                    <img
                                      src={item.image}
                                      alt={item.title}
                                      className="w-14 h-14 object-cover rounded-lg bg-black/5 flex-shrink-0 border border-black/5"
                                    />
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap mb-1">
                                      <h5 className="text-sm font-semibold text-brand-primary group-hover:text-brand-accent transition-colors">
                                        {item.title}
                                      </h5>
                                      {item.badge && (
                                        <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-brand-secondary text-brand-primary/80 border border-black/5">
                                          {item.badge}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs text-brand-primary/65 line-clamp-2 leading-relaxed">
                                      {item.description}
                                    </p>
                                  </div>
                                  <ArrowRight size={18} className="text-brand-primary/30 group-hover:text-brand-primary transition-all transform group-hover:translate-x-1 flex-shrink-0 mt-1" />
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-16 border border-dashed border-black/15 rounded-2xl bg-brand-secondary/30">
                        <p className="text-brand-primary text-base font-medium">
                          No search results found for &quot;<span className="text-brand-accent">{searchQuery}</span>&quot;
                        </p>
                        <p className="text-brand-primary/50 text-xs mt-2 max-w-md mx-auto">
                          Please check your spelling or try popular keywords such as &quot;CPNP&quot;, &quot;MoCRA&quot;, &quot;Cream&quot;, &quot;Serum&quot;, or &quot;B2B&quot;.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Mobile Menu using React Portal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-3/4 sm:w-1/2 bg-white z-[99999] p-8 flex flex-col shadow-2xl"
            >
              <div className="flex justify-between items-center mb-12">
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="flex items-center gap-2 text-brand-primary text-sm font-medium"
                >
                  <Search size={20} />
                  <span>SEARCH</span>
                </button>
                <button onClick={() => setIsMobileMenuOpen(false)}><X size={32} /></button>
              </div>
              <div className="flex flex-col space-y-8">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "text-2xl font-light tracking-tighter text-left transition-colors duration-300",
                      location.pathname === item.path ? "text-brand-primary font-medium" : "text-brand-primary/60 hover:text-brand-primary"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
