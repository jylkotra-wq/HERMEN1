import React from 'react';

export const InquiryPage = () => {
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
