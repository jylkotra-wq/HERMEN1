export interface TikTokVideoItem {
  id: string;
  creator: string;
  creatorAvatar?: string;
  caption: string;
  hashtags: string[];
  views: string;
  likes: string;
  videoUrl: string; // Direct mp4 video URL or video path (e.g. /tiktok/video1.mp4, or external CDN/TikTok video URL)
  thumbnail: string; // Poster / thumbnail image
  tiktokUrl: string; // Link to the video on TikTok (e.g. https://www.tiktok.com/@hermen/video/...)
  productId?: string; // Associated product ID in constants.ts (e.g. '1', '2', '3')
  productName?: string;
  productSubtitle?: string;
  productPrice?: string;
  productImage?: string;
  badgeNumber?: string;
}

/**
 * 💡 TikTok Videos Data
 * 동영상 주소(videoUrl)와 틱톡 링크(tiktokUrl), 썸네일(thumbnail)을 이곳에 추가/수정하시면
 * 홈페이지의 TikTok 비디오 카드에 즉시 반영됩니다.
 */
export const TIKTOK_VIDEOS: TikTokVideoItem[] = [
  {
    id: 'tiktok-1',
    creator: '@gabtayy',
    creatorAvatar: '/logo.png',
    caption: 'How to soothe redness & skin barrier in just 3 drops 🌿 Calming Serum Routine',
    hashtags: ['#kbeauty', '#calmingserum', '#glassskin', '#hermen'],
    views: '248.5K',
    likes: '34.2K',
    videoUrl: '/products/tv/2.mp4',
    thumbnail: '/products/calming-serum/1.jpg',
    tiktokUrl: 'https://www.tiktok.com/@gabtayy/video/7678884923398245662',
    productId: '2',
    productName: 'Preserve Calming Serum',
    productSubtitle: 'Centella & Panthenol lightweight',
    productPrice: '$27.95',
    productImage: '/products/calming-serum/calming-serum.png',
  },
  {
    id: 'tiktok-2',
    creator: '@glowwith_anna',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    caption: '15% Squalane Barrier Cream review! Deep hydration without greasy finish 💧✨',
    hashtags: ['#barriercream', '#skincareroutine', '#squalane', '#dryskin'],
    views: '189.1K',
    likes: '28.6K',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-massaging-her-face-with-cream-41144-large.mp4',
    thumbnail: '/products/barrier-cream/1.jpg',
    tiktokUrl: 'https://www.tiktok.com',
    productId: '1',
    productName: 'Preserve Daily Barrier Cream',
    productSubtitle: '15% Squalane Deep Moisture',
    productPrice: '$32.00',
    productImage: '/products/barrier-cream/barrier-cream.png',
  },
  {
    id: 'tiktok-3',
    creator: '@skincare_expert_kr',
    creatorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    caption: 'Sensitive skin holy grail! 0.00 non-irritating clinical test completed 🔬',
    hashtags: ['#sensitiveskin', '#cpnp', '#mocra', '#dermatology'],
    views: '312.0K',
    likes: '45.1K',
    videoUrl: '/products/tv/3.mp4',
    thumbnail: '/products/balancing-serum/1.jpg',
    tiktokUrl: 'https://www.tiktok.com',
    productId: '3',
    productName: 'Preserve Balancing Serum',
    productSubtitle: 'Hydration & Balanced Finish',
    productPrice: '$27.95',
    productImage: '/products/balancing-serum/balancing-serum.png',
  },
  {
    id: 'tiktok-4',
    creator: '@daily_skin_glow',
    creatorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    caption: 'The morning glow routine that lasts all day ☀️ Centella + Ceramide combo',
    hashtags: ['#morningroutine', '#glowyskin', '#kbeautytrend', '#hermen'],
    views: '142.3K',
    likes: '19.8K',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-applying-facial-cream-41140-large.mp4',
    thumbnail: '/products/calming-serum/2.jpg',
    tiktokUrl: 'https://www.tiktok.com',
    productId: '2',
    productName: 'Preserve Calming Serum',
    productSubtitle: 'Soothing Barrier Protection',
    productPrice: '$27.95',
    productImage: '/products/calming-serum/calming-serum.png',
  },
  {
    id: 'tiktok-5',
    creator: '@kbeauty_insider',
    creatorAvatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&auto=format&fit=crop&q=80',
    caption: 'My secret to glass skin without breaking out! Barrier + Serum layering test ✨',
    hashtags: ['#glassskin', '#koreanskincare', '#glowup'],
    views: '405.8K',
    likes: '58.9K',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-applying-facial-cream-41140-large.mp4',
    thumbnail: '/products/barrier-cream/2.jpg',
    tiktokUrl: 'https://www.tiktok.com',
    productId: '1',
    productName: 'Preserve Daily Barrier Cream',
    productSubtitle: 'Non-comedogenic 0.00 irritation',
    productPrice: '$32.00',
    productImage: '/products/barrier-cream/barrier-cream.png',
  }
];
