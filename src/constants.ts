export interface Product {
  id: string;
  name: string;
  description: string;
  price?: number;
  image: string;
  hoverImage?: string;
  images: string[];
  category: 'toner' | 'serum' | 'cream' | 'cleanser';
  skinType: ('oily' | 'dry' | 'sensitive' | 'combination')[];
  concern: ('acne' | 'aging' | 'hydration' | 'calming' | 'brightening')[];
  amazonUrl?: string;
  detailsInfo?: string;
  ingredients?: string;
  howToUse?: string;
  cautions?: string;
  capacity?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: '2',
    name: 'Preserve the Calm Calming Serum',
    description: 'Lightweight calming serum with Centella and panthenol to help soothe skin under daily stress. Quick-absorbing and non-sticky for skin with visible redness.',
    image: '/calming-serum.png',
    hoverImage: '/calming-serum1.jpg',
    images: ['/calming-serum.png', '/calming-serum1.jpg'],
    category: 'serum',
    skinType: ['sensitive', 'oily', 'combination'],
    concern: ['calming'],
    amazonUrl: 'https://www.amazon.com/HERMEN-Preserve-Calming-Serum-fl-oz/dp/B0H9XLM5JD?ref_=ast_sto_dp',
    ingredients: 'Purified water, Glycerin, Butylene glycol, Niacinamide, 1,2-Hexanediol, Panthenol, Sodium hyaluronate, Centella asiatica extract, Allantoin, Ethylhexylglycerin, Disodium EDTA.',
    howToUse: 'Apply an appropriate amount to skin and pat gently until absorbed.',
    cautions: 'For external use only. Do not use it on broken or irritated skin. If irritation occurs, discontinue use and consult a physician if needed. Keep out of reach of children. This product is best used within 12 months after opening. Storage conditions: 10~30℃. Keep away from direct sunlight.',
    capacity: '30ml / 1.01 fl.oz.',
  },
  {
    id: '3',
    name: 'Preserve the Balance Balancing Serum',
    description: 'Balancing serum that helps keep skin comfortably hydrated and smooth. With a fresh finish, it helps maintain a balanced, smooth complexion.',
    image: '/balancing-serum.png',
    hoverImage: '/balancing-serum1.jpg',
    images: ['/balancing-serum.png', '/balancing-serum1.jpg'],
    category: 'serum',
    skinType: ['dry', 'combination'],
    concern: ['aging', 'hydration'],
    amazonUrl: 'https://www.amazon.com/HERMEN-Preserve-Balance-Balancing-Serum/dp/B0H9XM2KVJ?ref_=ast_sto_dp',
    ingredients: 'Purified water, Glycerin, Butylene glycol, Niacinamide, Squalane, 1,2-Hexanediol, Sodium Hyaluronate, Ceramide NP, Camellia Sinensis Leaf Extract, Adenosine, Ethylhexylglycerin, Disodium EDTA.',
    howToUse: 'Apply an appropriate amount to skin and pat gently until absorbed.',
    cautions: 'For external use only. Do not use it on broken or irritated skin. If irritation occurs, discontinue use and consult a physician if needed. Keep out of reach of children. This product is best used within 12 months after opening. Storage conditions: 10~30℃. Keep away from direct sunlight.',
    capacity: '30ml / 1.01 fl.oz.',
  },
  {
    id: '1',
    name: 'Preserve the Barrier Daily Barrier Cream',
    description: 'Powered by 15% squalane, this daily barrier cream delivers rich moisture for soft, supple skin. Helps keep skin smooth and comfortably hydrated.',
    image: '/barrier-cream.png',
    hoverImage: '/barrier-cream1.jpg',
    images: ['/barrier-cream.png', '/barrier-cream1.jpg'],
    category: 'cream',
    skinType: ['dry', 'combination', 'sensitive'],
    concern: ['hydration', 'calming'],
    amazonUrl: 'https://www.amazon.com/HERMEN-Preserve-Barrier-Daily-Cream/dp/B0H9XLVHS3?ref_=ast_sto_dp',
    ingredients: 'Purified water, Caprylic/Capric Triglyceride, Glycerin, Butylene glycol, Cetearyl Alcohol, Ceramide NP, Panthenol, Shea Butter, 1,2-Hexanediol, Centella Asiatica Extract, Sodium Hyaluronate, Allantoin, Carbomer, Ethylhexylglycerin, Disodium EDTA.',
    howToUse: 'Apply an appropriate amount to skin and pat gently until absorbed.',
    cautions: 'For external use only. Do not use it on broken or irritated skin. If irritation occurs, discontinue use and consult a physician if needed. Keep out of reach of children. This product is best used within 12 months after opening. Storage conditions: 10~30℃. Keep away from direct sunlight.',
    capacity: '50ml / 1.69 fl.oz.',
  },
];
