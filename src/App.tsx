import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
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
import { AdminChatsPage } from './pages/AdminChatsPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';

function AppContent() {
  const location = useLocation();
  const { isChatOpen, setIsChatOpen, initialMessage } = useChat();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Log page view to Analytics Safely
    try {
      logEvent(analytics, 'page_view', { page_path: location.pathname });
    } catch (e) {
      console.warn("Analytics blocked or not supported in this environment:", e);
    }
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
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/admin/chats" element={<AdminChatsPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      {/* Chatbot Toggle Button */}
      <button 
        onClick={() => setIsChatOpen(true)}
        aria-label="Open AI Skin Analysis Chatbot"
        className="fixed bottom-6 right-6 bg-brand-primary text-white p-4 rounded-full shadow-lg z-[90] hover:bg-brand-accent transition-colors"
      >
        <Sparkles size={24} />
      </button>
      
      <ChatbotAnalysis isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} initialMessage={initialMessage} />
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
