
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Play } from 'lucide-react';
import { Movie } from '../types';
import { getImageUrl } from '../services/api';
import SmartImage from './SmartImage';

interface MovieCardProps {
  movie: Movie;
  className?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, className = '' }) => {
  const optimizedImg = getImageUrl(movie.poster_url || movie.thumb_url, 300);

  return (
    <Link 
      to={`/phim/${movie.slug}`}
      className={`group relative overflow-hidden rounded-xl md:rounded-[24px] aspect-[2/3] bg-[#0A0A0A] block transition-all duration-500 hover:z-10 hover:shadow-[0_15px_30px_rgba(0,0,0,0.8)] hover:translate-y-[-4px] active:scale-95 ${className}`}
    >
      <SmartImage
        src={optimizedImg}
        alt={movie.name}
        className="w-full h-full transition-transform duration-1000 group-hover:scale-110"
      />
      
      {/* Badges - Premium Look */}
      <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
        {movie.quality && (
          <span className="bg-[#FFD700] text-black text-[6px] md:text-[10px] font-black px-1.5 py-0.5 rounded shadow-lg uppercase tracking-widest">
            {movie.quality}
          </span>
        )}
        {movie.episode_current && movie.episode_current.includes('Tập') && (
          <span className="bg-black/80 backdrop-blur-md text-white text-[6px] md:text-[9px] font-black px-1.5 py-0.5 rounded border border-white/10 uppercase tracking-tighter shadow-xl">
            {movie.episode_current.replace('Tập', 'T')}
          </span>
        )}
      </div>

      <div className="absolute top-2 right-2 z-10">
         <div className="bg-black/50 backdrop-blur-md text-white text-[6px] md:text-[10px] font-black px-1.5 py-0.5 rounded border border-white/10 uppercase tracking-widest">
            {movie.year}
         </div>
      </div>

      {/* Hover Play Icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
         <div className="w-10 h-10 md:w-14 md:h-14 bg-[#FFD700] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,215,0,0.5)] transform scale-50 group-hover:scale-100 transition-transform duration-500">
            <Play className="w-5 h-5 md:w-7 md:h-7 text-black fill-current" />
         </div>
      </div>

      {/* Info Overlay - Higher Gradient */}
      <div className="absolute bottom-0 left-0 right-0 p-2 md:p-5 pt-8 md:pt-16 bg-gradient-to-t from-black via-black/80 to-transparent z-10">
        <h3 className="text-[10px] md:text-[14px] font-black truncate text-white group-hover:text-[#FFD700] transition-colors uppercase tracking-tight leading-tight mb-1">
          {movie.name}
        </h3>
        
        <div className="flex items-center justify-between opacity-70 group-hover:opacity-100 transition-all">
           <div className="flex items-center gap-1 text-[#FFD700]">
              <Star className="w-2 h-2 md:w-3 md:h-3 fill-current" />
              <span className="text-[7px] md:text-[11px] font-black">4.9</span>
           </div>
           <span className="text-[6px] md:text-[9px] text-gray-400 font-black uppercase tracking-[0.2em]">{movie.lang === 'Vietsub' ? 'SUB' : 'LỒNG'}</span>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
