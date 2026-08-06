import { PRODUCTS } from '../constants';

export interface SearchItem {
  id: string;
  title: string;
  category: 'Product' | 'Certification' | 'Brand Story' | 'Service' | 'Contact & Support';
  description: string;
  keywords: string[];
  path: string;
  image?: string;
  badge?: string;
}

export const SITE_SEARCH_INDEX: SearchItem[] = [
  // Products
  ...PRODUCTS.map((prod) => ({
    id: `prod-${prod.id}`,
    title: prod.name,
    category: 'Product' as const,
    description: prod.description,
    keywords: [
      prod.name.toLowerCase(),
      prod.category.toLowerCase(),
      'cream', 'serum', 'skincare', '화장품', '크림', '세럼', '보습', '진정', '장벽', '수분'
    ],
    path: '/shop',
    image: prod.image,
    badge: 'Preserve Line'
  })),

  // Certifications & Safety (/trust)
  {
    id: 'cert-cpnp',
    title: 'CPNP Certification (EU Cosmetic Registration)',
    category: 'Certification',
    description: 'European Union Cosmetic Product Notification Portal registration completed for full EU distribution and compliance.',
    keywords: ['cpnp', '유럽', 'eu', '유럽인증', '인증', 'europe', 'notification', '수출'],
    path: '/trust',
    badge: 'EU Certified'
  },
  {
    id: 'cert-mocra',
    title: 'MoCRA Registration (US FDA Compliance)',
    category: 'Certification',
    description: 'US FDA Modernization of Cosmetics Regulation Act registration completed for North American market entry.',
    keywords: ['mocra', '미국', 'fda', '미국인증', 'usa', 'us', '북미', '규제', '수출'],
    path: '/trust',
    badge: 'FDA MoCRA'
  },
  {
    id: 'cert-clinical',
    title: 'Clinical Skin Irritation Test Completed',
    category: 'Certification',
    description: 'Passed dermatological skin irritation tests on sensitive skin with a 0.00 non-irritation rating.',
    keywords: ['임상', '저자극', '테스트', '민감성', '피부 자극', 'clinical', 'irritation', 'safety', '안전성'],
    path: '/trust',
    badge: 'Dermatologically Tested'
  },
  {
    id: 'cert-dossier',
    title: 'B2B Technical Dossier & Product Specs',
    category: 'Certification',
    description: 'Technical documents including MSDS, CPNP/MoCRA proof, and formulation dossiers for global B2B buyers.',
    keywords: ['dossier', 'msds', '성분표', '도시에', '서류', '기술서류', 'spec', 'b2b'],
    path: '/trust',
    badge: 'Technical Dossier'
  },

  // Brand Story (/brand)
  {
    id: 'brand-philosophy',
    title: 'HERMEN Philosophy - "Preserve the moment."',
    category: 'Brand Story',
    description: 'High-end K-Beauty brand philosophy dedicated to protecting and preserving healthy skin through every moment of your day.',
    keywords: ['브랜드', '철학', 'story', 'brand', 'preserve', 'hermen', '슬로건', 'about', 'philosophy'],
    path: '/brand'
  },
  {
    id: 'brand-rd',
    title: '25 Years of Expertise & Data-Driven R&D',
    category: 'Brand Story',
    description: 'Formulated with 25 years of skincare data and fresh active ingredients for long-lasting skin care.',
    keywords: ['연구', 'r&d', '25년', '데이터', '제조', '성분', '기술력', 'agile'],
    path: '/brand'
  },

  // Services & Tools
  {
    id: 'service-ai-analysis',
    title: 'AI Skin Diagnostics Service',
    category: 'Service',
    description: 'Upload or capture a photo to analyze skin type and specific concerns (redness, dryness, balance) in real-time.',
    keywords: ['ai', '피부 분석', '사진', '셀카', '진단', '스킨 진단', 'analysis', 'skin test', '촬영'],
    path: '/analysis',
    badge: 'AI Powered'
  },
  {
    id: 'service-ai-concierge',
    title: 'AI Concierge Chatbot (24/7 Assistance)',
    category: 'Service',
    description: 'Interactive AI chatbot guiding product recommendations, CPNP/MoCRA certifications, and B2B inquiries.',
    keywords: ['챗봇', 'chatbot', 'ai 챗봇', '상담', '컨시어지', '질문', '문의'],
    path: '/',
    badge: '24/7 Support'
  },

  // Contact & Inquiry (/inquiry)
  {
    id: 'contact-b2b',
    title: 'B2B Wholesale & Global Export Inquiry',
    category: 'Contact & Support',
    description: 'Dedicated B2B inquiry form for international wholesale orders, MOQ, sample requests, and global distribution.',
    keywords: ['b2b', '도매', '수출', '바이어', 'wholesale', 'export', '견적', 'moq', '제휴'],
    path: '/inquiry',
    badge: 'Wholesale'
  },
  {
    id: 'contact-email',
    title: 'Official Email Support (hermen@hermen.co.kr)',
    category: 'Contact & Support',
    description: 'Direct email contact with HERMEN head office: hermen@hermen.co.kr',
    keywords: ['이메일', 'email', '메일', 'contact', '연락처', '주소', 'hermen@hermen.co.kr'],
    path: '/inquiry'
  }
];
