
import React, { useState, useEffect } from 'react';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

const SmartImage: React.FC<SmartImageProps> = ({ src, alt, className = '', priority = false }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Reset state khi src thay đổi (ví dụ khi chuyển trang)
    setIsLoaded(false);
    setError(false);

    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setError(true);
  }, [src]);

  return (
    <div className={`relative overflow-hidden bg-[#0A0A0A] ${className}`}>
      {/* Skeleton Shimmer ánh kim cao cấp - Luôn hiển thị cho đến khi ảnh thật sẵn sàng */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 bg-[length:200%_100%] animate-shimmer z-[1]"></div>
      )}

      {/* Ảnh thật với tối ưu Rendering */}
      <img
        src={error ? 'https://placehold.co/400x600/111/ffd700?text=Binh+VietSub' : src}
        alt={alt}
        decoding="async"
        className={`w-full h-full object-cover transition-all duration-700 ease-out will-change-[opacity,transform]
          ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105 blur-sm'}
          ${className}`}
        loading={priority ? 'eager' : 'lazy'}
        // @ts-ignore
        fetchpriority={priority ? 'high' : 'auto'}
      />
      
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-[2]"></div>
    </div>
  );
};

export default SmartImage;
