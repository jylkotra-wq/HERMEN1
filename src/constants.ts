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
    name: '피지 리밸런싱 토너',
    description: '과도한 피지를 조절하고 모공을 정돈해주는 산뜻한 타입의 토너',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=800',
    category: 'toner',
    skinType: ['oily', 'combination'],
    concern: ['acne'],
  },
  {
    id: '2',
    name: '딥 하이드레이팅 크림',
    description: '속건조를 잡아주고 72시간 보습을 유지해주는 고농축 수분 크림',
    price: 42000,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
    category: 'cream',
    skinType: ['dry', 'combination'],
    concern: ['hydration'],
  },
  {
    id: '3',
    name: '카밍 배리어 세럼',
    description: '외부 자극으로 예민해진 피부 장벽을 강화하는 진정 세럼',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=800',
    category: 'serum',
    skinType: ['sensitive', 'dry', 'oily', 'combination'],
    concern: ['calming'],
  },
  {
    id: '4',
    name: '브라이트닝 비타C 에센스',
    description: '칙칙한 피부톤을 맑고 투명하게 가꿔주는 비타민 유도체 함유 에센스',
    price: 38000,
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=800',
    category: 'serum',
    concern: ['brightening'],
    skinType: ['combination', 'dry', 'oily'],
  },
  {
    id: '5',
    name: '마일드 아미노 클렌저',
    description: '약산성 포뮬러로 세안 후에도 당김 없이 촉촉한 저자극 클렌저',
    price: 22000,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800',
    category: 'cleanser',
    skinType: ['sensitive', 'dry', 'oily', 'combination'],
    concern: ['hydration', 'calming'],
  },
  {
    id: '6',
    name: '안티에이징 리페어 밤',
    description: '피부 탄력을 높이고 잔주름을 개선하는 고영양 리페어 밤',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=800',
    category: 'cream',
    skinType: ['dry', 'combination'],
    concern: ['aging'],
  }
];
