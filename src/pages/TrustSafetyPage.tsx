import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import { useChat } from '../contexts/ChatContext';
import { ShieldCheck, Award, FileCheck, CheckCircle2 } from 'lucide-react';

const CertificationItem = ({ item, logo }: { item: { title: string; desc: string }; logo: string }) => {
    const [imgError, setImgError] = useState(false);
    return (
        <div className="border border-black/10 p-6 rounded-xl hover:shadow-lg bg-white transition-all flex flex-col justify-between">
            <div className="h-44 bg-brand-secondary/40 mb-5 rounded-lg flex items-center justify-center p-4 overflow-hidden border border-black/5">
                {!imgError ? (
                    <img 
                      src={logo} 
                      alt={item.title} 
                      onError={() => setImgError(true)} 
                      className="max-h-full max-w-full object-contain" 
                      referrerPolicy="no-referrer"
                    />
                ) : (
                    <div className="flex flex-col items-center gap-2 text-brand-primary/60">
                        <FileCheck size={40} className="text-brand-accent" />
                        <span className="text-xs font-semibold tracking-wider uppercase">{item.title}</span>
                    </div>
                )}
            </div>
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 size={16} className="text-brand-accent flex-shrink-0" />
                    <h4 className="font-semibold text-brand-primary text-base">{item.title}</h4>
                </div>
                <p className="text-xs text-brand-primary/70 leading-relaxed">{item.desc}</p>
            </div>
        </div>
    );
};

const CertificationSection = () => {
    const logos = [
        '/logos/mocra.png',
        '/logos/cpnp.png'
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl">
                {[
                    { title: 'MoCRA (USA)', desc: 'US Cosmetic Regulation Modernization Act facility and product listing complete.' },
                    { title: 'CPNP (EU)', desc: 'European Cosmetic Product Notification Portal safety dossier and registration complete.' }
                ].map((item, i) => (
                    <CertificationItem key={i} item={item} logo={logos[i]} />
                ))}
            </div>
        </motion.div>
    );
};

const ClinicalSection = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
    <div>
      <span className="text-[10px] tracking-[0.25em] uppercase text-brand-accent font-semibold block mb-2">Formulated for Sensitive Skin</span>
      <h3 className="text-2xl font-light tracking-tight text-brand-primary">All products (Preserve Series) have passed skin irritation tests.</h3>
    </div>
  </motion.div>
);

const IPSection = () => {
  const [krImgError, setKrImgError] = useState(false);
  const [usImgError, setUsImgError] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div>
        <span className="text-[10px] tracking-[0.25em] uppercase text-brand-accent font-semibold block mb-2">Intellectual Property</span>
        <h3 className="text-2xl font-light tracking-tight text-brand-primary">Brand Protection & Global Exclusivity</h3>
      </div>
      <p className="text-sm text-brand-primary/70 max-w-3xl leading-relaxed">
        HERMEN secures proprietary international trademark registrations and formulations to guarantee global brand integrity, authentic distribution channels, and buyer exclusivity.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl">
        {/* KR Trademark */}
        <div className="border border-black/10 rounded-xl p-6 bg-white shadow-2xs flex flex-col justify-between">
          <div className="bg-brand-secondary/30 h-56 rounded-lg mb-5 flex items-center justify-center p-4 overflow-hidden border border-black/5">
            {!krImgError ? (
              <img 
                src="/logos/kr_trademark.jpg" 
                alt="Korea Intellectual Property Office Trademark Registration" 
                onError={() => setKrImgError(true)} 
                className="max-h-full max-w-full object-contain rounded" 
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-brand-primary/60">
                <Award size={48} className="text-brand-accent" />
                <span className="text-xs font-semibold uppercase tracking-wider">KIPO Registered Trademark</span>
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <ShieldCheck size={16} className="text-brand-accent flex-shrink-0" />
              <h4 className="font-semibold text-brand-primary text-base">KIPO Trademark Registration (KR)</h4>
            </div>
            <p className="text-xs text-brand-primary/70 leading-relaxed">
              Officially registered with the Korean Intellectual Property Office under Class 03 (Cosmetics & Skincare).
            </p>
          </div>
        </div>

        {/* US / Global Trademark */}
        <div className="border border-black/10 rounded-xl p-6 bg-white shadow-2xs flex flex-col justify-between">
          <div className="bg-brand-secondary/30 h-56 rounded-lg mb-5 flex items-center justify-center p-4 overflow-hidden border border-black/5">
            {!usImgError ? (
              <img 
                src="/logos/us_trademark.png" 
                alt="USPTO Trademark Application & Protection" 
                onError={() => setUsImgError(true)} 
                className="max-h-full max-w-full object-contain rounded" 
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-brand-primary/60 text-center px-4">
                <Award size={48} className="text-brand-accent" />
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider block">USPTO Global Filing</span>
                  <span className="text-[10px] text-brand-primary/50">United States Patent and Trademark Office</span>
                </div>
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <ShieldCheck size={16} className="text-brand-accent flex-shrink-0" />
              <h4 className="font-semibold text-brand-primary text-base">USPTO </h4>
            </div>
            <p className="text-xs text-brand-primary/70 leading-relaxed">
              Active trademark protection
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const TrustSafetyPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') as 'Certification' | 'Clinical' | 'IP') || 'Certification';
  const [activeTab, setActiveTab] = useState<'Certification' | 'Clinical' | 'IP'>(
    ['Certification', 'Clinical', 'IP'].includes(initialTab) ? initialTab : 'Certification'
  );
  const { openChatWith } = useChat();

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['Certification', 'Clinical', 'IP'].includes(tabParam)) {
      setActiveTab(tabParam as 'Certification' | 'Clinical' | 'IP');
    }
  }, [searchParams]);

  const handleTabChange = (tabName: 'Certification' | 'Clinical' | 'IP') => {
    setActiveTab(tabName);
    setSearchParams({ tab: tabName });
  };

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
            onClick={() => handleTabChange(tab.name as any)}
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
