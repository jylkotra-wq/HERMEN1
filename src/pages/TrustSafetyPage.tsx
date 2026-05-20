import React, { useState, useRef } from 'react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useChat } from '../contexts/ChatContext';

const CertificationItem = ({ item, logo }: { item: { title: string; desc: string }; logo: string }) => {
    return (
        <div className="border border-gray-100 p-6 rounded hover:shadow-lg transition-shadow">
            <div className="h-40 bg-gray-100 mb-4 rounded flex items-center justify-center font-bold text-gray-500 overflow-hidden">
                <img src={logo} alt={item.title} className="w-full h-full object-contain" />
            </div>
            <h4 className="font-bold mb-2">{item.title}</h4>
            <p className="text-sm text-gray-600">{item.desc}</p>
        </div>
    );
};

const CertificationSection = () => {
    const logos = [
        '/logos/mocra.png',
        '/logos/cpnp.png',
        '/logos/gmp.jpg',
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <h3 className="text-xl font-medium">Ready for the Global Market</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { title: 'MoCRA (USA)', desc: 'US Cosmetic Regulation Modernization Act registration complete.' },
                    { title: 'CPNP (EU)', desc: 'European Cosmetic Product Notification Portal registration complete.' },
                    { title: 'CGMP', desc: 'Manufactured in CGMP certified facilities meeting highest standards.' },
                ].map((item, i) => (
                    <CertificationItem key={i} item={item} logo={logos[i]} />
                ))}
            </div>
        </motion.div>
    );
};

// ... ClinicalSection and IPSection remain the same for now
// (I will keep them as is and just edit the import/TrustSafetyPage component)

const ClinicalSection = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
    <h3 className="text-xl font-medium">Formulated for Sensitive Skin</h3>
    <div className="bg-gray-50 p-8 rounded-lg">
      <p className="text-gray-700 mb-6">All products (Preserve Series) have passed skin irritation tests.</p>
      <div className="h-64 bg-white rounded flex items-center justify-center text-gray-400">
        [Before/After Graphs & Research Lab Logos]
      </div>
    </div>
  </motion.div>
);

const IPSection = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
    <h3 className="text-xl font-medium">Brand Protection & Exclusivity</h3>
    <div className="grid grid-cols-2 gap-8">
      <div className="bg-gray-100 h-64 rounded flex items-center justify-center overflow-hidden">
        <img src="/logos/us_trademark.png" alt="US Trademark" className="w-full h-full object-contain" />
      </div>
      <div className="bg-gray-100 h-64 rounded flex items-center justify-center overflow-hidden">
        <img src="/logos/kr_trademark.png" alt="KR Trademark" className="w-full h-full object-contain" />
      </div>
    </div>
  </motion.div>
);

export const TrustSafetyPage = () => {
  const [activeTab, setActiveTab] = useState<'Certification' | 'Clinical' | 'IP'>('Certification');
  const { openChatWith } = useChat();

  const handleDownloadDossier = () => {
    window.open('/dossier.pdf', '_blank');
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">The Science Behind HERMEN</h1>
      <p className="text-lg text-gray-600 mb-12 max-w-3xl">
        25 years of skincare expertise and data-driven Agile R&D define HERMEN's quality assurance. Explore our global skincare solutions, compliant with rigorous North American and European regulations.
      </p>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-10 overflow-x-auto">
        {[
          { name: 'Certification', label: 'Certification' },
          { name: 'Clinical', label: 'Clinical' },
          { name: 'IP', label: 'IP' }
        ].map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name as any)}
            className={cn(
              "pb-4 text-xs font-bold tracking-widest uppercase transition-colors mr-8 whitespace-nowrap",
              activeTab === tab.name ? "text-brand-primary border-b-2 border-brand-primary" : "text-gray-400 hover:text-black"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'Certification' && <CertificationSection />}
        {activeTab === 'Clinical' && <ClinicalSection />}
        {activeTab === 'IP' && <IPSection />}
      </div>

      {/* Section 4 */}
      <div className="mt-20 p-10 bg-gray-50 rounded-lg">
        <h2 className="text-2xl font-medium mb-6">Partner with HERMEN</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <button onClick={handleDownloadDossier} className="bg-brand-primary text-white py-3 px-6 rounded text-sm hover:bg-brand-accent transition-colors">Download B2B Dossier</button>
          <button onClick={() => openChatWith("I want to request a wholesale quote.")} className="border border-brand-primary text-brand-primary py-3 px-6 rounded text-sm hover:bg-gray-100 transition-colors">Request Wholesale Quote</button>
        </div>
      </div>
    </div>
  );
};
