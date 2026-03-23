export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'toner' | 'serum' | 'cream' | 'cleanser';
  skinType: ('oily' | 'dry' | 'sensitive' | 'combination')[];
  concern: ('acne' | 'aging' | 'hydration' | 'calming' | 'brightening')[];
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Daily Barrier Cream',
    description: '피부 장벽을 보호하고 수분을 유지해주는 데일리 크림',
    price: 38000,
    image: '/barrier-cream.png',
    category: 'cream',
    skinType: ['dry', 'combination', 'sensitive'],
    concern: ['hydration', 'calming'],
  },
  {
    id: '2',
    name: 'Calming Serum',
    description: '예민해진 피부를 즉각적으로 진정시켜주는 고농축 세럼',
    price: 35000,
    image: '/calming-serum.png',
    category: 'serum',
    skinType: ['sensitive', 'oily', 'combination'],
    concern: ['calming'],
  },
  {
    id: '3',
    name: 'Recovery Serum',
    description: '피부 밸런스를 회복하고 활력을 더해주는 리커버리 세럼',
    price: 42000,
    image: '/recovery-serum.png',
    category: 'serum',
    skinType: ['dry', 'combination'],
    concern: ['aging', 'hydration'],
  }
];
