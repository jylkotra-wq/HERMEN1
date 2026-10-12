export interface TikTokVideoItem {
  id: string;
  creator: string;
  creatorAvatar?: string;
  caption: string;
  hashtags: string[];
  views: string;
  likes: string;
  videoUrl: string; // Direct mp4 video URL or video path (e.g. /products/tv/1.mp4 ~ 9.mp4)
  thumbnail: string; // Poster / thumbnail fallback image
  tiktokUrl: string; // Link to the video on TikTok or HERMEN TikTok profile
  productId?: string; // Associated product ID in constants.ts ('1', '2', '3')
  productName?: string;
  productSubtitle?: string;
  productPrice?: string;
  productImage?: string;
  badgeNumber?: string;
}

/**
 * 💡 TikTok Videos Data (총 9개 순환 캐러셀)
 * 파일 업로드 위치: /public/products/tv/
 * 동영상 파일명: 1.mp4 ~ 9.mp4
 * 
 * /public/products/tv/1.mp4
 * /public/products/tv/2.mp4
 * ...
 * /public/products/tv/9.mp4
 */
export const TIKTOK_VIDEOS: TikTokVideoItem[] = [
  {
    id: 'tiktok-1',
    creator: '@hermenusa',
    creatorAvatar: '/logo.png',
    caption: 'How to soothe redness & skin barrier in just 3 drops 🌿 Calming Serum Routine',
    hashtags: ['#kbeauty', '#calmingserum', '#glassskin', '#hermen'],
    views: '248.5K',
    likes: '34.2K',
    videoUrl: '/products/tv/1.mp4',
    thumbnail: '/products/calming-serum/1.jpg',
    tiktokUrl: 'https://www.tiktok.com/@hermenusa',
    productId: '2',
    productName: 'Preserve Calming Serum',
    productSubtitle: 'Centella & Panthenol lightweight',
    productPrice: '$27.95',
    productImage: '/products/calming-serum/calming-serum.png',
    badgeNumber: '1',
  },
  {
    id: 'tiktok-2',
    creator: '@hermenusa',
    creatorAvatar: '/logo.png',
    caption: '15% Squalane Barrier Cream review! Deep hydration without greasy finish 💧✨',
    hashtags: ['#barriercream', '#skincareroutine', '#squalane', '#dryskin'],
    views: '189.1K',
    likes: '28.6K',
    videoUrl: '/products/tv/2.mp4',
    thumbnail: '/products/barrier-cream/1.jpg',
    tiktokUrl: 'https://www.tiktok.com/@hermenusa',
    productId: '1',
    productName: 'Preserve Daily Barrier Cream',
    productSubtitle: '15% Squalane Deep Moisture',
    productPrice: '$32.00',
    productImage: '/products/barrier-cream/barrier-cream.png',
    badgeNumber: '2',
  },
  {
    id: 'tiktok-3',
    creator: '@hermenusa',
    creatorAvatar: '/logo.png',
    caption: 'Sensitive skin holy grail! 0.00 non-irritating clinical test completed 🔬',
    hashtags: ['#sensitiveskin', '#cpnp', '#mocra', '#dermatology'],
    views: '312.0K',
    likes: '45.1K',
    videoUrl: '/products/tv/3.mp4',
    thumbnail: '/products/balancing-serum/1.jpg',
    tiktokUrl: 'https://www.tiktok.com/@hermenusa',
    productId: '3',
    productName: 'Preserve Balancing Serum',
    productSubtitle: 'Hydration & Balanced Finish',
    productPrice: '$27.95',
    productImage: '/products/balancing-serum/balancing-serum.png',
    badgeNumber: '3',
  },
  {
    id: 'tiktok-4',
    creator: '@hermenusa',
    creatorAvatar: '/logo.png',
    caption: 'The morning glow routine that lasts all day ☀️ Centella + Ceramide combo',
    hashtags: ['#morningroutine', '#glowyskin', '#kbeautytrend', '#hermen'],
    views: '142.3K',
    likes: '19.8K',
    videoUrl: '/products/tv/4.mp4',
    thumbnail: '/products/calming-serum/2.jpg',
    tiktokUrl: 'https://www.tiktok.com/@hermenusa',
    productId: '2',
    productName: 'Preserve Calming Serum',
    productSubtitle: 'Soothing Barrier Protection',
    productPrice: '$27.95',
    productImage: '/products/calming-serum/calming-serum.png',
    badgeNumber: '4',
  },
  {
    id: 'tiktok-5',
    creator: '@hermenusa',
    creatorAvatar: '/logo.png',
    caption: 'My secret to glass skin without breaking out! Barrier + Serum layering test ✨',
    hashtags: ['#glassskin', '#koreanskincare', '#glowup'],
    views: '405.8K',
    likes: '58.9K',
    videoUrl: '/products/tv/5.mp4',
    thumbnail: '/products/barrier-cream/2.jpg',
    tiktokUrl: 'https://www.tiktok.com/@hermenusa',
    productId: '1',
    productName: 'Preserve Daily Barrier Cream',
    productSubtitle: 'Non-comedogenic 0.00 irritation',
    productPrice: '$32.00',
    productImage: '/products/barrier-cream/barrier-cream.png',
    badgeNumber: '5',
  },
  {
    id: 'tiktok-6',
    creator: '@hermenusa',
    creatorAvatar: '/logo.png',
    caption: 'Balance oil & moisture all day long with Balancing Serum 💧',
    hashtags: ['#balancingserum', '#hydrationskin', '#kbeauty', '#hermen'],
    views: '215.4K',
    likes: '31.8K',
    videoUrl: '/products/tv/6.mp4',
    thumbnail: '/products/balancing-serum/2.jpg',
    tiktokUrl: 'https://www.tiktok.com/@hermenusa',
    productId: '3',
    productName: 'Preserve Balancing Serum',
    productSubtitle: 'Optimal Hydration Balance',
    productPrice: '$27.95',
    productImage: '/products/balancing-serum/balancing-serum.png',
    badgeNumber: '6',
  },
  {
    id: 'tiktok-7',
    creator: '@hermenusa',
    creatorAvatar: '/logo.png',
    caption: 'Calming redness relief after outdoor sun exposure 🌿 Immediate cooling sensation',
    hashtags: ['#sunrelief', '#calmingskin', '#skincaretips', '#hermen'],
    views: '178.9K',
    likes: '24.5K',
    videoUrl: '/products/tv/7.mp4',
    thumbnail: '/products/calming-serum/3.jpg',
    tiktokUrl: 'https://www.tiktok.com/@hermenusa',
    productId: '2',
    productName: 'Preserve Calming Serum',
    productSubtitle: 'Gentle Calming Recovery',
    productPrice: '$27.95',
    productImage: '/products/calming-serum/calming-serum.png',
    badgeNumber: '7',
  },
  {
    id: 'tiktok-8',
    creator: '@hermenusa',
    creatorAvatar: '/logo.png',
    caption: 'Overnight moisture lock with Barrier Cream! Wake up with plump skin 🌙',
    hashtags: ['#nightroutine', '#barrierrepair', '#squalanecream', '#hermen'],
    views: '264.1K',
    likes: '39.7K',
    videoUrl: '/products/tv/8.mp4',
    thumbnail: '/products/barrier-cream/3.jpg',
    tiktokUrl: 'https://www.tiktok.com/@hermenusa',
    productId: '1',
    productName: 'Preserve Daily Barrier Cream',
    productSubtitle: 'Long-lasting Deep Moisture',
    productPrice: '$32.00',
    productImage: '/products/barrier-cream/barrier-cream.png',
    badgeNumber: '8',
  },
  {
    id: 'tiktok-9',
    creator: '@hermenusa',
    creatorAvatar: '/logo.png',
    caption: 'The complete 3-step HERMEN clean skincare routine ✨ Glass skin unlocked',
    hashtags: ['#hermenroutine', '#kbeautyfavorites', '#healthyskin', '#hermenusa'],
    views: '389.2K',
    likes: '51.3K',
    videoUrl: '/products/tv/9.mp4',
    thumbnail: '/products/balancing-serum/3.jpg',
    tiktokUrl: 'https://www.tiktok.com/@hermenusa',
    productId: '3',
    productName: 'Preserve Balancing Serum',
    productSubtitle: 'Skin Barrier & Balance Core',
    productPrice: '$27.95',
    productImage: '/products/balancing-serum/balancing-serum.png',
    badgeNumber: '9',
  },
];
