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
  },
  {
    id: '3',
    name: 'Balancing Serum (30ml)',
    description: 'A balancing serum that restores skin balance and adds vitality.',
    image: '/balancing-serum.png',
    hoverImage: '/balancing-serum2.png',
    images: ['/balancing-serum.png', '/balancing-serum1.jpg', '/balancing-serum2.png', '/balancing-serum2.jpg'],
    category: 'serum',
    skinType: ['dry', 'combination'],
    concern: ['aging', 'hydration'],
  },
  {
    id: '1',
    name: 'Daily Barrier Cream (50ml)',
    description: 'A daily cream that protects the skin barrier and maintains moisture.',
    image: '/barrier-cream.png',
    hoverImage: '/barrier-cream2.png',
    images: ['/barrier-cream.png', '/barrier-cream1.jpg', '/barrier-cream2.png', '/barrier-cream2.jpg'],
    category: 'cream',
    skinType: ['dry', 'combination', 'sensitive'],
    concern: ['hydration', 'calming'],
  },
];
