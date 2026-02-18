
import React from 'react';

export const MovieCardSkeleton = () => (
  <div className="flex flex-col gap-2">
    <div className="aspect-[2/3] bg-gradient-to-r from-white/5 via-white/10 to-white/5 bg-[length:200%_100%] animate-shimmer rounded-[16px] md:rounded-[20px] w-full"></div>
    <div className="h-3 bg-white/5 rounded w-3/4"></div>
    <div className="h-2 bg-white/5 rounded w-1/2 opacity-50"></div>
  </div>
);

export const HeroSkeleton = () => (
  <div className="h-[55vh] md:h-[80vh] w-full bg-[#0A0A0A] relative flex flex-col justify-end p-6 md:p-12 gap-4">
    <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 bg-[length:200%_100%] animate-shimmer opacity-30"></div>
    <div className="relative z-10 space-y-4">
      <div className="h-4 bg-white/10 rounded-full w-24"></div>
      <div className="h-12 md:h-20 bg-white/10 rounded-2xl w-2/3"></div>
      <div className="h-4 bg-white/10 rounded-lg w-1/2"></div>
      <div className="flex gap-4">
        <div className="h-12 bg-white/10 rounded-xl w-32"></div>
        <div className="h-12 bg-white/10 rounded-xl w-32"></div>
      </div>
    </div>
  </div>
);
