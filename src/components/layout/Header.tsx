import React, { useState, useEffect, useRef } from 'react';
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

  const isMainPage = location.pathname === '/';
  const isWhite = isMainPage && !isScrolled;

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
    <header className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-500",
      isScrolled ? "bg-white py-4 shadow-sm" : "bg-transparent py-6"
    )}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-3 items-center">
        <Link to="/" className="hover:opacity-70 transition-opacity flex items-center w-fit">
          <img 
            src="/logo.png" 
            alt="HERMEN" 
            className="h-6 md:h-7 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </Link>

        <nav className="hidden md:flex items-center justify-center space-x-12 col-start-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-xs tracking-[0.15em] font-medium transition-colors duration-300",
                location.pathname === item.path
                  ? (isWhite ? "text-white font-semibold" : "text-brand-primary font-semibold")
                  : (isWhite ? "text-white/60 hover:text-white" : "text-brand-primary/60 hover:text-brand-primary")
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end space-x-5 col-start-2 md:col-start-3">
          {/* Search Button Header */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className={cn(
              "flex items-center gap-2 p-1.5 rounded-full transition-all duration-300 hover:scale-105",
              isWhite 
                ? "text-white hover:bg-white/10" 
                : "text-brand-primary hover:bg-black/5"
            )}
            title="Search HERMEN"
            aria-label="Search"
          >
            <Search size={20} />
            <span className="hidden lg:inline text-xs tracking-widest font-medium opacity-80 uppercase">
              Search
            </span>
          </button>

          <button 
            className={cn("md:hidden", isWhite ? "text-white" : "text-black")}
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Search Fullscreen Overlay Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-brand-primary/95 backdrop-blur-md z-[100] text-white flex flex-col p-6 md:p-12 overflow-y-auto"
          >
            <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
              {/* Search Modal Top Bar */}
              <div className="flex items-center justify-between pb-8 border-b border-white/15">
                <div className="flex items-center gap-3">
                  <Search size={22} className="text-white/60" />
                  <span className="text-xs uppercase tracking-[0.2em] font-medium text-white/60">
                    Search HERMEN
                  </span>
                </div>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all"
                  aria-label="Close search"
                >
                  <X size={26} />
                </button>
              </div>

              {/* Main Search Input */}
              <div className="py-8">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter search terms (e.g., CPNP, MoCRA, Cream, Serum, B2B...)"
                  className="w-full bg-transparent text-2xl md:text-3xl font-light tracking-tight text-white placeholder-white/30 focus:outline-none border-none py-2"
                />
              </div>

              {/* Quick Keywords / Popular Searches */}
              {!trimmedQuery && (
                <div className="py-6 border-t border-white/10">
                  <p className="text-xs font-mono uppercase tracking-widest text-white/50 mb-4">
                    Popular Searches
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {popularKeywords.map((kw) => (
                      <button
                        key={kw}
                        onClick={() => setSearchQuery(kw)}
                        className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs tracking-wider transition-all"
                      >
                        {kw}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Live Search Results */}
              {trimmedQuery && (
                <div className="flex-1 py-4 space-y-8 overflow-y-auto pr-2">
                  <div className="text-xs font-mono text-white/50">
                    {searchResults.length} {searchResults.length === 1 ? 'result found' : 'results found'}
                  </div>

                  {groupedResults.length > 0 ? (
                    groupedResults.map((group) => {
                      const IconComp = getCategoryIcon(group.category);
                      return (
                        <div key={group.category} className="space-y-3">
                          <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 flex items-center gap-2 pb-1 border-b border-white/10">
                            <IconComp size={14} /> {group.category} ({group.items.length})
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {group.items.map((item) => (
                              <div
                                key={item.id}
                                onClick={() => handleNavigate(item.path)}
                                className="group p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg cursor-pointer transition-all flex items-start justify-between gap-3"
                              >
                                {item.image && (
                                  <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-12 h-12 object-cover rounded bg-white/10 flex-shrink-0 mt-0.5"
                                  />
                                )}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <h5 className="text-sm font-medium text-white group-hover:text-white/90">
                                      {item.title}
                                    </h5>
                                    {item.badge && (
                                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 border border-white/10">
                                        {item.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-white/60 mt-1 line-clamp-2 leading-relaxed">
                                    {item.description}
                                  </p>
                                </div>
                                <ArrowRight size={16} className="text-white/40 group-hover:text-white transition-all transform group-hover:translate-x-1 flex-shrink-0 mt-1" />
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-12 border border-white/10 rounded-lg bg-white/5">
                      <p className="text-white/60 text-sm">
                        No search results found for &quot;<span className="text-white font-medium">{searchQuery}</span>&quot;.
                      </p>
                      <p className="text-white/40 text-xs mt-2">
                        Try searching for &quot;CPNP&quot;, &quot;MoCRA&quot;, &quot;Cream&quot;, &quot;Serum&quot;, or &quot;B2B&quot;.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-3/4 sm:w-1/2 bg-white z-[60] p-8 flex flex-col"
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
      </AnimatePresence>
    </header>
  );
};
