import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ShoppingBag, Sparkles } from 'lucide-react';
import { logEvent } from 'firebase/analytics';
import { analytics } from './firebase';

// Layout Components
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ChatbotAnalysis } from './components/ChatbotAnalysis';
import { ChatProvider, useChat } from './contexts/ChatContext';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { AnalysisPage } from './pages/AnalysisPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { BrandPage } from './pages/BrandPage';
import { InquiryPage } from './pages/InquiryPage';
import { TrustSafetyPage } from './pages/TrustSafetyPage';

// Types
import { Product } from './constants';

function AppContent() {
  const location = useLocation();
  const { isChatOpen, setIsChatOpen, initialMessage } = useChat();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Log page view to Analytics
    logEvent(analytics, 'page_view', { page_path: location.pathname });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

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
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/analysis" element={<AnalysisPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/brand" element={<BrandPage />} />
              <Route path="/inquiry" element={<InquiryPage />} />
              <Route path="/trust" element={<TrustSafetyPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      {/* Chatbot Toggle Button */}
      <button 
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 bg-brand-primary text-white p-4 rounded-full shadow-lg z-[90] hover:bg-brand-accent transition-colors"
      >
        <Sparkles size={24} />
      </button>
      
      <ChatbotAnalysis isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} initialMessage={initialMessage} />

      {/* Toast Notification (Example usage) */}
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

export default function App() {
  return (
    <BrowserRouter>
      <ChatProvider>
        <AppContent />
      </ChatProvider>
    </BrowserRouter>
  );
}
