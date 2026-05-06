import React from 'react';

export const BrandPage = () => {
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
