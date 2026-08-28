import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ShoppingBag, ExternalLink, ShieldCheck } from 'lucide-react';
import { PRODUCTS } from '../constants';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find(p => p.id === id);
  const [selectedImage, setSelectedImage] = useState(product?.image || '');

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="pt-24 pb-12 px-4 text-center">
        <h2 className="text-xl font-light mb-4">Product not found.</h2>
        <Link to="/shop" className="text-brand-primary underline text-xs">Back to Shop</Link>
      </div>
    );
  }

  const amazonUrl = product.amazonUrl || `https://www.amazon.com/s?k=HERMEN+${encodeURIComponent(product.name)}`;

  return (
    <div className="pt-20 pb-12 px-4 max-w-6xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-xs tracking-[0.2em] font-bold uppercase mb-6 hover:opacity-60 transition-opacity"
      >
        <ArrowLeft size={16} className="mr-2" /> Back
      </button>

      {/* 2. 좌우 컬럼 간격 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-3">
          {/* 이미지 내부 패딩 */}
          <div className="aspect-[4/5] overflow-hidden bg-white border border-black/10 rounded-xl shadow-xs p-6 flex items-center justify-center">
            <motion.img 
              key={selectedImage}
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              src={selectedImage} 
              alt={product.name} 
              className="max-w-full max-h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* 썸네일 */}
          <div className="flex gap-2 flex-wrap">
            {product.images.map((img, index) => (
              <button 
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`w-14 h-14 border bg-white rounded-lg ${selectedImage === img ? 'border-brand-primary ring-2 ring-brand-primary/20' : 'border-black/10 hover:border-black/30'} p-1.5 overflow-hidden flex items-center justify-center transition-all`}
              >
                <img src={img} alt={`${product.name} ${index}`} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          {/* 타이틀 및 본문 */}
          <div className="mb-5">
            <span className="text-xs tracking-[0.25em] uppercase text-brand-accent mb-2.5 block font-semibold">{product.category}</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-3 text-brand-primary leading-tight">{product.name}</h1>
            <p className="text-sm md:text-base text-brand-primary/80 leading-relaxed mb-4">{product.description}</p>
          </div>

          {/* 버튼 영역 */}
          <div className="py-4 border-y border-black/10 mb-5 space-y-2.5">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <a
                href={amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-6 bg-[#FF9900] hover:bg-[#E88B00] text-black font-semibold text-xs md:text-sm tracking-[0.15em] uppercase transition-all duration-300 flex items-center justify-center gap-2 rounded-lg shadow-xs group"
              >
                <ShoppingBag size={18} />
                <span>Shop Now</span>
                <ExternalLink size={15} className="opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              
              <Link
                to="/inquiry"
                className="py-3.5 px-6 border border-black/20 hover:border-brand-primary text-brand-primary text-xs md:text-sm tracking-[0.12em] font-semibold uppercase hover:bg-black/5 transition-all flex items-center justify-center rounded-lg whitespace-nowrap"
              >
                B2B Wholesale
              </Link>
            </div>
            <p className="text-xs text-brand-primary/60 flex items-center gap-1.5 pt-0.5">
              <ShieldCheck size={15} className="text-brand-accent flex-shrink-0" />
              Official HERMEN Store on Amazon. Global shipping & verified authenticity.
            </p>
          </div>

          {/* 5. 태그 및 스펙 */}
          <div className="space-y-4 mb-5">
            <div>
              <h4 className="text-xs tracking-[0.2em] font-bold uppercase mb-2 text-brand-primary/90">Skin Types</h4>
              <div className="flex flex-wrap gap-2">
                {product.skinType.map(type => (
                  <span key={type} className="px-3.5 py-1.5 bg-white border border-black/10 text-xs md:text-sm uppercase tracking-wider rounded-full font-medium text-brand-primary/80">
                    {type}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs tracking-[0.2em] font-bold uppercase mb-2 text-brand-primary/90">Concerns</h4>
              <div className="flex flex-wrap gap-2">
                {product.concern.map(c => (
                  <span key={c} className="px-3.5 py-1.5 bg-white border border-black/10 text-xs md:text-sm uppercase tracking-wider rounded-full font-medium text-brand-primary/80">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 6. 상세 텍스트 영역 (최소 12px / 본문 14px로 가독성 강화) */}
          <div className="mt-2 pt-3 border-t border-black/5 space-y-3.5">
            {product.detailsInfo && (
              <div className="space-y-1">
                <h4 className="text-xs tracking-[0.2em] font-bold uppercase text-brand-primary/90">Product Information</h4>
                <p className="text-sm text-brand-primary/75 leading-relaxed">{product.detailsInfo}</p>
              </div>
            )}
            {product.ingredients && (
              <div className="space-y-1">
                <h4 className="text-xs tracking-[0.2em] font-bold uppercase text-brand-primary/90">Ingredients</h4>
                <p className="text-sm text-brand-primary/75 leading-relaxed">{product.ingredients}</p>
              </div>
            )}
            {product.howToUse && (
              <div className="space-y-1">
                <h4 className="text-xs tracking-[0.2em] font-bold uppercase text-brand-primary/90">How to Use</h4>
                <p className="text-sm text-brand-primary/75 leading-relaxed">{product.howToUse}</p>
              </div>
            )}
            {product.cautions && (
              <div className="space-y-1">
                <h4 className="text-xs tracking-[0.2em] font-bold uppercase text-brand-primary/90">Cautions</h4>
                <p className="text-sm text-brand-primary/75 leading-relaxed">{product.cautions}</p>
              </div>
            )}
            {product.capacity && (
              <div className="space-y-1">
                <h4 className="text-xs tracking-[0.2em] font-bold uppercase text-brand-primary/90">Capacity</h4>
                <p className="text-sm text-brand-primary/75 leading-relaxed">{product.capacity}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 7. 하단 상세 이미지 (detailImages 전용 목록 사용) */}
      {((product.detailImages && product.detailImages.length > 0) || (product.images && product.images.length > 0)) && (
        <div className="mt-6">
          <h3 className="text-xs md:text-sm tracking-[0.2em] font-bold uppercase mb-3 text-brand-primary/90">Product Details</h3>
          {/* space-y-4 제거 */}
          <div>
            {(product.detailImages && product.detailImages.length > 0 ? product.detailImages : product.images).map((img, index) => {
              const isSmallImage = img.endsWith('calming-serum.png') || 
                                  img.endsWith('balancing-serum.png') || 
                                  img.endsWith('barrier-cream.png');
              return (
                <img 
                  key={index} 
                  src={img} 
                  alt={`${product.name} detail ${index}`} 
                  /* block 추가 */
                  className={isSmallImage ? "block w-1/2 mx-auto h-auto object-contain" : "block w-full h-auto object-contain"}
                  referrerPolicy="no-referrer"
                />
              );
            })}
          </div>
        </div>
      )}
      </div>
  );
};