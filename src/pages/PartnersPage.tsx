import React from 'react';
import { motion } from 'motion/react';

interface Partner {
  id: string;
  name: string;
  image: string;
  fallbackImage: string;
  link?: string;
}

export const PartnersPage: React.FC = () => {
  const partners: Partner[] = [
    {
      id: 'walmart',
      name: 'Walmart',
      image: '/partners/walmart.png',
      fallbackImage: '/walmart.png'
    },
    {
      id: 'amazon',
      name: 'Amazon',
      image: '/partners/Amazon.png',
      fallbackImage: '/Amazon.png',
      link: 'https://www.amazon.com/stores/HERMEN/page/4ECE39BE-094C-4965-871F-0B093CB3E2F7?lp_asin=B0H9XLVHS3&ref_=ast_bln&store_ref=bl_ast_dp_brandlogo_sto'
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      {/* Partners Grid - 4 per row */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {partners.map((partner, index) => {
          const cardContent = (
            <div className="w-full h-full flex items-center justify-center p-4">
              <img
                src={partner.image}
                alt={`${partner.name} logo`}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== partner.fallbackImage) {
                    target.src = partner.fallbackImage;
                  }
                }}
                className="w-full h-full max-h-20 sm:max-h-24 object-contain mx-auto my-auto transition-transform duration-300 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
          );

          return (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-black/10 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 aspect-[16/10] flex items-center justify-center group"
            >
              {partner.link ? (
                <a
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-full flex items-center justify-center cursor-pointer"
                  title={`Visit HERMEN on ${partner.name}`}
                >
                  {cardContent}
                </a>
              ) : (
                cardContent
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
