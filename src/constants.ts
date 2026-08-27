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
}

export const PRODUCTS: Product[] = [
  {
    id: '2',
    name: 'Calming Serum (30ml)',
    description: 'A highly concentrated serum that instantly calms sensitive skin.',
    image: '/calming-serum.png',
    hoverImage: '/calming-serum1.jpg',
    images: ['/calming-serum.png', '/calming-serum1.jpg', '/calming-serum2.jpg', '/calming-serum3.jpg'],
    category: 'serum',
    skinType: ['sensitive', 'oily', 'combination'],
    concern: ['calming'],
    amazonUrl: 'https://www.amazon.com/HERMEN-Preserve-Calming-Serum-fl-oz/dp/B0H9XLM5JD?ref_=ast_sto_dp',
  },
  {
    id: '3',
    name: 'Balancing Serum (30ml)',
    description: 'A balancing serum that restores skin balance and adds vitality.',
    image: '/balancing-serum.png',
    hoverImage: '/balancing-serum1.jpg',
    images: ['/balancing-serum.png', '/balancing-serum1.jpg'],
    category: 'serum',
    skinType: ['dry', 'combination'],
    concern: ['aging', 'hydration'],
    amazonUrl: 'https://www.amazon.com/HERMEN-Preserve-Balance-Balancing-Serum/dp/B0H9XM2KVJ?ref_=ast_sto_dp',
  },
  {
    id: '1',
    name: 'Daily Barrier Cream (50ml)',
    description: 'A daily cream that protects the skin barrier and maintains moisture.',
    image: '/barrier-cream.png',
    hoverImage: '/barrier-cream1.jpg',
    images: ['/barrier-cream.png', '/barrier-cream1.jpg'],
    category: 'cream',
    skinType: ['dry', 'combination', 'sensitive'],
    concern: ['hydration', 'calming'],
    amazonUrl: 'https://www.amazon.com/HERMEN-Preserve-Barrier-Daily-Cream/dp/B0H9XLVHS3?ref_=ast_sto_dp',
  },
];
