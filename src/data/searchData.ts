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

// Comprehensive skin type & concern Korean/English mapping
const SKIN_TYPE_SYNONYMS: Record<string, string[]> = {
  dry: ['dry', 'dry skin', 'dryness', '건성', '건조', '속건조', '건성피부', '당김', '각질', '극건성', 'flaky'],
  oily: ['oily', 'oily skin', 'sebum', '지성', '지성피부', '유분', '피지', '번들거림', '개기름', '모공', 'pore'],
  sensitive: ['sensitive', 'sensitive skin', 'redness', 'irritation', '민감성', '민감성피부', '예민', '홍조', '붉은기', '자극', 'reactive'],
  combination: ['combination', 'combination skin', '복합성', '수부지', '복합성피부', 't존', 'u존', '수분부족지성'],
};

const CONCERN_SYNONYMS: Record<string, string[]> = {
  hydration: ['hydration', 'hydrating', 'moisture', 'moisturizing', '수분', '보습', '속보습', '수분공급', '물광', '촉촉', 'deep moisture'],
  calming: ['calming', 'soothing', 'relief', '진정', '피부진정', '붉은기완화', '시카', 'cica', 'centella', 'panthenol', 'irritated skin'],
  aging: ['aging', 'anti-aging', 'elasticity', 'wrinkle', 'firming', '노화', '안티에이징', '탄력', '주름', '주름개선', '리프팅', 'youthful'],
  acne: ['acne', 'trouble', 'blemish', 'breakout', '여드름', '트러블', '모공', '뾰루지', 'blemishes'],
  brightening: ['brightening', 'radiance', 'glow', 'whitening', '미백', '톤업', '맑은피부', '잡티', '기미', 'skin tone'],
};

export const SITE_SEARCH_INDEX: SearchItem[] = [
  // ==========================================
  // 1. PRODUCTS (Preserve Line)
  // ==========================================
  ...PRODUCTS.map((prod) => {
    // Generate ingredient keyword tokens
    const ingredientTokens = prod.ingredients
      ? prod.ingredients
          .toLowerCase()
          .split(/[,.\s]+/)
          .filter((word) => word.length > 2)
      : [];

    return {
      id: `prod-${prod.id}`,
      title: prod.name,
      category: 'Product' as const,
      description: prod.description,
      keywords: [
        prod.name.toLowerCase(),
        prod.category.toLowerCase(),
        ...(prod.skinType || []).flatMap((st) => SKIN_TYPE_SYNONYMS[st] || [st]),
        ...(prod.concern || []).flatMap((c) => CONCERN_SYNONYMS[c] || [c]),
        ...ingredientTokens,
        'cream', 'serum', 'skincare', '화장품', '크림', '세럼', '보습', '진정', '장벽', '수분',
        'preserve line', 'hermen', 'amazon', 'calming', 'balancing', 'barrier',
        'squalane', 'centella', 'ceramide', 'panthenol', 'niacinamide', 'hyaluronic',
        prod.capacity?.toLowerCase() || '',
        'shop', 'buy', '구매', '아마존', '주문', 'store'
      ],
      path: `/product/${prod.id}`,
      image: prod.image,
      badge: 'Preserve Line'
    };
  }),

  {
    id: 'shop-all-products',
    title: 'HERMEN Preserve Skincare Collection (Full Lineup)',
    category: 'Product',
    description: 'Explore the full HERMEN Preserve series — Calming Serum, Balancing Serum, and Daily Barrier Cream with Amazon verified authenticity.',
    keywords: [
      'shop', 'products', '전체 제품', '스킨케어', '쇼핑', '구매', 'store', 'amazon', '라인업',
      '전제품', 'catalogue', 'collection', 'dry', 'dry skin', 'sensitive', '민감성', 'oily',
      '지성', '건성', '모든제품', '스토어', '아마존'
    ],
    path: '/shop',
    badge: 'All Products'
  },

  // ==========================================
  // 2. INTELLECTUAL PROPERTY & TRADEMARKS (/trust?tab=IP)
  // ==========================================
  {
    id: 'ip-trademark-overview',
    title: 'Intellectual Property (IP) & Global Brand Protection',
    category: 'Certification',
    description: 'HERMEN secures proprietary international trademark registrations and formulations to guarantee global brand authenticity and anti-counterfeiting.',
    keywords: [
      'trademark', '상표', '상표권', 'ip', 'intellectual property', '지식재산권', '지재권', '특허', 'patent',
      'brand protection', '브랜드 보호', '독점', 'exclusivity', '정품', 'authenticity', 'global trademark',
      'anti-counterfeit', '위조방지', '상표보호', '지적재산'
    ],
    path: '/trust?tab=IP',
    badge: 'Trademark & IP'
  },
  {
    id: 'ip-kipo-trademark',
    title: 'KIPO Trademark Registration (Korean Intellectual Property Office)',
    category: 'Certification',
    description: 'Officially registered trademark certificate with the Korean Intellectual Property Office (KIPO) under Class 03 (Cosmetics & Skincare).',
    keywords: [
      'kipo', '특허청', '한국특허청', '상표등록', '상표등록증', 'korean intellectual property office',
      'trademark registration', 'kr trademark', 'class 03', '한국 상표', '특허', 'certificate',
      '등록증', '상표권자', '03류'
    ],
    path: '/trust?tab=IP',
    badge: 'KIPO Registered'
  },
  {
    id: 'ip-uspto-trademark',
    title: 'USPTO Trademark Protection (United States Patent & Trademark Office)',
    category: 'Certification',
    description: 'Active international trademark protection through the United States Patent and Trademark Office (USPTO) for North American distribution.',
    keywords: [
      'uspto', '미국 상표', '미국 특허청', 'united states patent and trademark office',
      'us trademark', 'global filing', '미국상표권', '미국 지재권', 'north america ip',
      'us brand', '미국등록'
    ],
    path: '/trust?tab=IP',
    badge: 'USPTO Protected'
  },

  // ==========================================
  // 3. REGULATORY COMPLIANCE & SAFETY (/trust?tab=Certification, /trust?tab=Clinical)
  // ==========================================
  {
    id: 'cert-cpnp-eu',
    title: 'CPNP Certification (EU Cosmetic Product Notification Portal)',
    category: 'Certification',
    description: 'European Union Cosmetic Product Notification Portal registration completed for regulatory compliance across all 27 EU member nations.',
    keywords: [
      'cpnp', '유럽', 'eu', '유럽인증', '인증', 'europe', 'notification', '수출', 'eu compliance',
      'cosmetic regulation', '유럽연합', 'safety dossier', 'ec', 'european union', '유럽수출'
    ],
    path: '/trust?tab=Certification',
    badge: 'EU CPNP'
  },
  {
    id: 'cert-mocra-fda',
    title: 'MoCRA Compliance (US FDA Modernization of Cosmetics Regulation Act)',
    category: 'Certification',
    description: 'US FDA Modernization of Cosmetics Regulation Act registration and facility/product listing completed for seamless North American market entry.',
    keywords: [
      'mocra', '미국', 'fda', '미국인증', 'usa', 'us', '북미', '규제', '수출', 'fda compliance',
      'facility listing', 'product listing', '미국 수출', '식약처', '미국규제'
    ],
    path: '/trust?tab=Certification',
    badge: 'FDA MoCRA'
  },
  {
    id: 'cert-clinical-000',
    title: 'Clinical Skin Irritation Test Completed (0.00 Non-Irritating)',
    category: 'Certification',
    description: 'Passed 24/48-hr human patch tests on sensitive skin with a verified 0.00 zero-irritation index by accredited dermatological research institutes.',
    keywords: [
      '임상', '저자극', '테스트', '민감성', '피부 자극', 'clinical', 'irritation', 'safety', '안전성',
      '0.00', 'dermatologist tested', '피부시험', '피부 자극도', '무자극', '비자극', 'hypoallergenic',
      'human patch test', 'clinical test', '임상시험'
    ],
    path: '/trust?tab=Clinical',
    badge: 'Clinical 0.00'
  },
  {
    id: 'cert-technical-dossier',
    title: 'B2B Technical Dossier, MSDS & Formulation Specs',
    category: 'Certification',
    description: 'Downloadable comprehensive technical regulatory dossiers including MSDS, Certificate of Analysis (COA), safety evaluations, and ingredient specs.',
    keywords: [
      'dossier', 'msds', '성분표', '도시에', '서류', '기술서류', 'spec', 'b2b', '규제서류',
      'technical dossier', 'download', '다운로드', 'sds', 'coa', '전성분', '분석증명서'
    ],
    path: '/trust',
    badge: 'Technical Dossier'
  },

  // ==========================================
  // 4. BRAND STORY & PHILOSOPHY (/brand)
  // ==========================================
  {
    id: 'brand-story-philosophy',
    title: 'HERMEN Brand Philosophy — "Preserve the moment."',
    category: 'Brand Story',
    description: 'High-end K-Beauty brand dedicated to protecting and restoring healthy skin against daily oxidative and environmental stress.',
    keywords: [
      '브랜드', '철학', 'story', 'brand', 'preserve', 'hermen', '슬로건', 'about', 'philosophy',
      'preserve the moment', '순간', '브랜드 스토리', 'k-beauty', 'kbeauty', '한국 화장품',
      '회사소개', '브랜드소개', 'identity', '컨셉'
    ],
    path: '/brand',
    badge: 'Brand Story'
  },
  {
    id: 'brand-rd-expertise',
    title: '25 Years of Skincare Formulation & Data-Driven Agile R&D',
    category: 'Brand Story',
    description: 'Formulated with 25 years of specialized dermatological skincare data and agile ingredient research for barrier-reinforcing skin balance.',
    keywords: [
      '연구', 'r&d', '25년', '데이터', '제조', '성분', '기술력', 'agile', 'agile r&d',
      '포뮬러', '25 years', 'expertise', '개발', '연구개발', '연구소', '제조기술', '피부과학'
    ],
    path: '/brand',
    badge: 'Agile R&D'
  },

  // ==========================================
  // 5. SERVICES & AI TOOLS (/analysis, /)
  // ==========================================
  {
    id: 'service-ai-diagnostics',
    title: 'AI Skin Diagnostics & Personalized Skincare Recommendations',
    category: 'Service',
    description: 'Upload or capture a selfie to instantly analyze skin hydration, redness, barrier strength, and receive customized product routines.',
    keywords: [
      'ai', '피부 분석', '사진', '셀카', '진단', '스킨 진단', 'analysis', 'skin test', '촬영',
      'ai 진단', '맞춤 추천', '피부 측정', '피부타입', 'selfie', 'camera', 'diagnostics',
      '피부상태', '루틴추천', 'routine'
    ],
    path: '/analysis',
    badge: 'AI Diagnostics'
  },
  {
    id: 'service-ai-concierge-bot',
    title: '24/7 AI Skincare Concierge & Support Chatbot',
    category: 'Service',
    description: 'Real-time interactive AI concierge answering product ingredient questions, application methods, certifications, and B2B wholesale inquiries.',
    keywords: [
      '챗봇', 'chatbot', 'ai 챗봇', '상담', '컨시어지', '질문', '문의', '실시간', '고객지원',
      'concierge', 'ai assistant', 'support', '채팅', '실시간상담', 'ask'
    ],
    path: '/',
    badge: '24/7 Concierge'
  },

  // ==========================================
  // 6. B2B WHOLESALE & GLOBAL DISTRIBUTION (/inquiry)
  // ==========================================
  {
    id: 'contact-b2b-wholesale',
    title: 'B2B Wholesale & Global Distribution Inquiry',
    category: 'Contact & Support',
    description: 'Official wholesale partner inquiry channel for international distributors, buyer pricing, MOQ, export conditions, and sample requests.',
    keywords: [
      'b2b', '도매', '수출', '바이어', 'wholesale', 'export', '견적', 'moq', '제휴',
      '유통', '납품', '대량구매', 'partnership', 'inquiry', '문의', '글로벌수출', '해외유통',
      'distributor', 'sample', '샘플신청'
    ],
    path: '/inquiry',
    badge: 'Wholesale'
  },
  {
    id: 'contact-hq-email',
    title: 'Official Headquarters Contact & Support (hermen@hermen.co.kr)',
    category: 'Contact & Support',
    description: 'Direct email communication with HERMEN headquarters for partnerships, press, B2B wholesale inquiries, and customer support.',
    keywords: [
      '이메일', 'email', '메일', 'contact', '연락처', '주소', 'hermen@hermen.co.kr',
      '고객센터', '본사', '문의하기', 'phone', 'contact us', '상담문의', '문의'
    ],
    path: '/inquiry',
    badge: 'Contact'
  },

  // ==========================================
  // 7. LEGAL & POLICIES (/terms, /privacy)
  // ==========================================
  {
    id: 'legal-terms-conditions',
    title: 'Terms of Service & Intellectual Property Policies',
    category: 'Contact & Support',
    description: 'Official HERMEN terms and conditions governing website usage, orders, copyright, and international trademark policies.',
    keywords: [
      'terms', 'terms of service', '이용약관', '약관', '법적고지', 'legal', '저작권', '규정',
      '조건', 'conditions'
    ],
    path: '/terms',
    badge: 'Legal'
  },
  {
    id: 'legal-privacy-policy',
    title: 'Privacy Policy & Data Protection',
    category: 'Contact & Support',
    description: 'Information regarding how HERMEN securely collects, protects, and manages customer personal information and privacy rights.',
    keywords: [
      'privacy', 'privacy policy', '개인정보', '개인정보처리방침', '보안', 'security', '데이터 보호',
      '정보보호', 'gdpr'
    ],
    path: '/privacy',
    badge: 'Privacy'
  }
];
