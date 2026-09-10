import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Plus
} from 'lucide-react';
import { TIKTOK_VIDEOS, TikTokVideoItem } from '../../data/tiktokVideos';

// TikTok Icon SVG
const TikTokIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

// Helper to extract TikTok video ID from URL
function getTikTokVideoId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/video\/(\d+)/);
  if (match && match[1]) return match[1];
  const embedMatch = url.match(/embed\/(?:v\d+\/)?(\d+)/);
  if (embedMatch && embedMatch[1]) return embedMatch[1];
  return null;
}

// Helper to normalize video URL (e.g. strip /public prefix if user added it)
function getResolvedVideoUrl(url?: string): string {
  if (!url) return '';
  if (url.startsWith('/public/')) {
    return url.replace('/public/', '/');
  }
  if (url.startsWith('public/')) {
    return '/' + url.replace('public/', '');
  }
  return url;
}

// Side Preview Card Media: renders first frame of video directly if mp4, or fallback thumbnail
const VideoCardMedia = ({ 
  item, 
  className = "w-full h-full object-cover object-center outline-none border-0 block" 
}: { 
  item: TikTokVideoItem; 
  className?: string; 
}) => {
  const isDirectVideo = item.videoUrl && !item.videoUrl.includes('tiktok.com');
  const resolvedUrl = getResolvedVideoUrl(item.videoUrl);

  if (isDirectVideo) {
    return (
      <video
        src={`${resolvedUrl}#t=0.001`}
        preload="metadata"
        muted
        playsInline
        className={`${className} pointer-events-none`}
      />
    );
  }

  return (
    <img 
      src={item.thumbnail} 
      alt={item.caption}
      className={className}
      referrerPolicy="no-referrer"
    />
  );
};

export const TikTokSection = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const total = TIKTOK_VIDEOS.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
    setIsPlaying(true);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    setIsPlaying(true);
  }, [total]);

  // 10-second automatic rotation timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 10000);

    return () => clearInterval(interval);
  }, [currentIndex, isPlaying, total]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      nextSlide();
    } else if (info.offset.x > swipeThreshold) {
      prevSlide();
    }
  };

  const currentItem = TIKTOK_VIDEOS[currentIndex];
  const prevItem = TIKTOK_VIDEOS[(currentIndex - 1 + total) % total];
  const nextItem = TIKTOK_VIDEOS[(currentIndex + 1) % total];
  const prev2Item = TIKTOK_VIDEOS[(currentIndex - 2 + total) % total];
  const next2Item = TIKTOK_VIDEOS[(currentIndex + 2) % total];

  const currentTikTokId = getTikTokVideoId(currentItem.videoUrl);

  useEffect(() => {
    if (!currentTikTokId && videoRef.current) {
      videoRef.current.currentTime = 0;
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [currentIndex, isPlaying, currentTikTokId]);

  return (
    <section className="py-10 md:py-16 w-full max-w-none overflow-hidden">
      {/* Title Header */}
      <div className="text-center mb-6 md:mb-10 px-4 max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 text-brand-primary text-[11px] font-semibold tracking-wider uppercase mb-2">
          <TikTokIcon className="w-3.5 h-3.5" />
          <span>HERMEN on TikTok</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-brand-primary">
          Real Reviews & Skincare Moments
        </h2>
      </div>

      {/* Infinite Centered Video Carousel: Mobile gap 2px (gap-[2px]), PC gap 15px (md:gap-[15px]) */}
      <div className="relative w-full flex items-center justify-center gap-[2px] md:gap-[15px] min-h-[460px] sm:min-h-[500px] md:min-h-[540px] lg:min-h-[620px] overflow-hidden py-4">
        {/* Far-Left Card (Visible on large PC screens, true 70% height crop without distortion, 15px gap) */}
        <div 
          onClick={prevSlide}
          className="hidden xl:flex flex-shrink-0 xl:w-[280px] 2xl:w-[320px] aspect-[45/56] rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer opacity-35 hover:opacity-75 transition-all duration-300 shadow-md select-none outline-none border-0 relative"
        >
          <VideoCardMedia item={prev2Item} />
          <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-colors" />
          {prev2Item.productName && (
            <div className="absolute bottom-3 left-2.5 right-2.5 bg-white/95 backdrop-blur-md rounded-xl p-2 flex items-center gap-2 shadow-md border-0">
              <div className="relative w-8 h-8 rounded-lg bg-neutral-100 p-1 flex-shrink-0 flex items-center justify-center border-0">
                <img 
                  src={prev2Item.productImage || prev2Item.thumbnail} 
                  alt={prev2Item.productName} 
                  className="w-full h-full object-contain border-0"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[10px] font-bold text-brand-primary truncate">{prev2Item.productName}</h4>
              </div>
            </div>
          )}
        </div>

        {/* Left Peeking Card: Same width as center, real 70% height crop (aspect-[45/56]) without stretching/squishing */}
        <div 
          onClick={prevSlide}
          className="flex flex-shrink-0 w-[60vw] min-[380px]:w-[55vw] sm:w-[35vw] md:w-[280px] lg:w-[320px] xl:w-[350px] aspect-[45/56] rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer opacity-60 hover:opacity-85 transition-all duration-300 shadow-lg select-none outline-none border-0 relative"
        >
          <VideoCardMedia item={prevItem} />
          <div className="absolute inset-0 bg-black/30 hover:bg-black/10 transition-colors" />
          
          {/* Bottom product pill in left preview */}
          {prevItem.productName && (
            <div className="absolute bottom-3 left-2.5 right-2.5 bg-white/95 backdrop-blur-md rounded-xl p-2 flex items-center gap-2 shadow-md border-0">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-neutral-100 p-1 flex-shrink-0 flex items-center justify-center border-0">
                <img 
                  src={prevItem.productImage || prevItem.thumbnail} 
                  alt={prevItem.productName} 
                  className="w-full h-full object-contain border-0"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[10px] sm:text-[11px] font-bold text-brand-primary truncate">{prevItem.productName}</h4>
              </div>
            </div>
          )}
        </div>

        {/* Center Playing Video Card: Mobile 60vw, PC standard baseline */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0.85, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          className="relative z-20 flex-shrink-0 w-[60vw] min-[380px]:w-[58vw] sm:w-[40vw] md:w-[280px] lg:w-[320px] xl:w-[350px] aspect-[9/16] rounded-2xl md:rounded-3xl overflow-hidden bg-neutral-900 shadow-2xl cursor-grab active:cursor-grabbing select-none outline-none border-0 ring-0"
        >
          {/* Main Video or TikTok Embed */}
          {currentTikTokId ? (
            <div className="w-full h-full relative bg-black flex items-center justify-center">
              <iframe
                key={currentTikTokId}
                src={`https://www.tiktok.com/embed/v2/${currentTikTokId}`}
                title={`TikTok video ${currentTikTokId}`}
                className="w-full h-full border-0 block"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                src={getResolvedVideoUrl(currentItem.videoUrl)}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload="auto"
                className="w-full h-full object-cover block outline-none border-0"
              />

              {/* Subtle gradient vignette */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/75 pointer-events-none border-0" />

              {/* Top-Right Control Buttons (Speaker & Pause/Play) */}
              <div className="absolute top-3.5 right-3.5 flex flex-col gap-2 z-30">
                {/* Mute/Unmute */}
                <button
                  onClick={toggleMute}
                  type="button"
                  aria-label={isMuted ? "Unmute sound" : "Mute sound"}
                  className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center shadow-lg transition-transform active:scale-95 border-0 outline-none"
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>

                {/* Pause/Play */}
                <button
                  onClick={togglePlay}
                  type="button"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                  className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center shadow-lg transition-transform active:scale-95 border-0 outline-none"
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5 fill-white" />}
                </button>
              </div>
            </>
          )}

          {/* Bottom Overlay: Product Card (No border) */}
          <div className="absolute bottom-3.5 left-3.5 right-3.5 z-30">
            <div 
              onClick={(e) => {
                e.stopPropagation();
                if (currentItem.productId) {
                  navigate(`/product/${currentItem.productId}`);
                }
              }}
              className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 flex items-center justify-between gap-2.5 shadow-xl cursor-pointer hover:bg-white transition-all group border-0 outline-none"
            >
              {/* Product Thumbnail with Badge */}
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-neutral-100 p-1 flex-shrink-0 flex items-center justify-center border-0">
                <img 
                  src={currentItem.productImage || currentItem.thumbnail} 
                  alt={currentItem.productName || "Product"} 
                  className="w-full h-full object-contain border-0"
                  referrerPolicy="no-referrer"
                />
                {currentItem.badgeNumber && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-black text-white text-[9px] font-bold flex items-center justify-center border-0">
                    {currentItem.badgeNumber}
                  </span>
                )}
              </div>

              {/* Product Info (Name, Subtitle, Price) */}
              <div className="flex-1 min-w-0 text-left">
                <h4 className="text-xs sm:text-[13px] font-bold text-brand-primary leading-tight truncate">
                  {currentItem.productName}
                </h4>
                {currentItem.productSubtitle && (
                  <p className="text-[10px] text-brand-primary/60 truncate leading-snug">
                    {currentItem.productSubtitle}
                  </p>
                )}
                <p className="text-[11px] sm:text-xs font-extrabold text-brand-primary mt-0.5">
                </p>
              </div>

              {/* Cyan / Accent Plus Button */}
              <button
                type="button"
                aria-label="View product details"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#54c7ec] hover:bg-[#43b6db] active:scale-95 text-brand-primary flex items-center justify-center flex-shrink-0 shadow-md transition-all group-hover:rotate-90 border-0 outline-none"
              >
                <Plus size={18} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right Peeking Card: Same width as center, real 70% height crop (aspect-[45/56]) without stretching/squishing */}
        <div 
          onClick={nextSlide}
          className="flex flex-shrink-0 w-[60vw] min-[380px]:w-[55vw] sm:w-[35vw] md:w-[280px] lg:w-[320px] xl:w-[350px] aspect-[45/56] rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer opacity-60 hover:opacity-85 transition-all duration-300 shadow-lg select-none outline-none border-0 relative"
        >
          <VideoCardMedia item={nextItem} />
          <div className="absolute inset-0 bg-black/35 hover:bg-black/15 transition-colors" />
          
          {/* Bottom product pill in right preview */}
          {nextItem.productName && (
            <div className="absolute bottom-3 left-2.5 right-2.5 bg-white/95 backdrop-blur-md rounded-xl p-2 flex items-center gap-2 shadow-md border-0">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-neutral-100 p-1 flex-shrink-0 flex items-center justify-center border-0">
                <img 
                  src={nextItem.productImage || nextItem.thumbnail} 
                  alt={nextItem.productName} 
                  className="w-full h-full object-contain border-0"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[10px] sm:text-[11px] font-bold text-brand-primary truncate">{nextItem.productName}</h4>
              </div>
            </div>
          )}
        </div>

        {/* Far-Right Card (Visible on large PC screens, true 70% height crop without distortion, 15px gap) */}
        <div 
          onClick={nextSlide}
          className="hidden xl:flex flex-shrink-0 xl:w-[280px] 2xl:w-[320px] aspect-[45/56] rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer opacity-35 hover:opacity-75 transition-all duration-300 shadow-md select-none outline-none border-0 relative"
        >
          <VideoCardMedia item={next2Item} />
          <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-colors" />
          {next2Item.productName && (
            <div className="absolute bottom-3 left-2.5 right-2.5 bg-white/95 backdrop-blur-md rounded-xl p-2 flex items-center gap-2 shadow-md border-0">
              <div className="relative w-8 h-8 rounded-lg bg-neutral-100 p-1 flex-shrink-0 flex items-center justify-center border-0">
                <img 
                  src={next2Item.productImage || next2Item.thumbnail} 
                  alt={next2Item.productName} 
                  className="w-full h-full object-contain border-0"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[10px] font-bold text-brand-primary truncate">{next2Item.productName}</h4>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
