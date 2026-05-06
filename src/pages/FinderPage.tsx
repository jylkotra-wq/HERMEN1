import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { PRODUCTS, Product } from '../constants';

export const FinderPage = () => {
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
