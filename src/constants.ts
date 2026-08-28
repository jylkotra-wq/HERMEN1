export interface Product {
  id: string;
  name: string;
  description: string;
  price?: number;
  image: string;
  hoverImage?: string;
  images: string[];          // 상단 썸네일 및 갤러리 이미지 목록
  detailImages?: string[];   // 하단 상세페이지 전용 이미지 목록
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
    image: '/products/calming-serum/calming-serum.png',
    hoverImage: '/products/calming-serum/calming-serum1.jpg',
    images: ['/products/calming-serum/1.jpg','/products/calming-serum/2.jpg','/products/calming-serum/3.jpg','/products/calming-serum/4.jpg','/products/calming-serum/5.jpg','/products/calming-serum/6.jpg','/products/calming-serum/7.jpg','/products/calming-serum/8.jpg' ],
    detailImages: ['/products/calming-serum/c1.jpg','/products/calming-serum/c2.jpg','/products/calming-serum/c3.jpg','/products/calming-serum/c4.jpg','/products/calming-serum/c5.jpg','/products/calming-serum/u1.jpg',],
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
    image: '/products/balancing-serum/balancing-serum.png',
    hoverImage: '/products/balancing-serum/balancing-serum1.jpg',
    images: ['/products/balancing-serum/1.jpg','/products/balancing-serum/2.jpg','/products/balancing-serum/3.jpg','/products/balancing-serum/4.jpg','/products/balancing-serum/5.jpg','/products/balancing-serum/6.jpg','/products/balancing-serum/7.jpg','/products/balancing-serum/8.jpg' ],
    detailImages: ['/products/balancing-serum/b1.jpg','/products/balancing-serum/b2.jpg','/products/balancing-serum/b3.jpg','/products/balancing-serum/b4.jpg','/products/balancing-serum/b5.jpg','/products/balancing-serum/u1.jpg',],
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
    image: '/products/barrier-cream/barrier-cream.png',
    hoverImage: '/products/barrier-cream/barrier-cream1.jpg',
    images: ['/products/barrier-cream/1.jpg','/products/barrier-cream/2.jpg','/products/barrier-cream/3.jpg','/products/barrier-cream/4.jpg','/products/barrier-cream/5.jpg','/products/barrier-cream/6.jpg','/products/barrier-cream/7.jpg' ],
    detailImages: ['/products/barrier-cream/d1.jpg','/products/barrier-cream/d2.jpg','/products/barrier-cream/d3.jpg','/products/barrier-cream/d4.jpg','/products/barrier-cream/d5.jpg'],
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
