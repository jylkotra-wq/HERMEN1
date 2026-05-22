import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'BRAND', path: '/brand' },
    { name: 'PRODUCTS', path: '/shop' },
    { name: 'ANALYSIS', path: '/analysis' },
    { name: 'TRUST', path: '/trust' },
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

        <div className="flex items-center justify-end space-x-6 col-start-2 md:col-start-3">
          <button 
            className={cn("md:hidden", isWhite ? "text-white" : "text-black")}
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-1/2 bg-white z-[60] p-8 flex flex-col"
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
