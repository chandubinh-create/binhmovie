
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieDetail, getImageUrl } from '../services/api';
import { MovieDetail } from '../types';
// Added Info icon to the import list
import { Play, Calendar, Clock, Star, Users, MapPin, Tag, Loader2, Bookmark, Share2, Info } from 'lucide-react';

const MovieDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchMovieDetail(slug)
        .then(data => {
          setMovie(data.movie ? { ...data.movie, episodes: data.episodes } : null);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-red-600 animate-spin" />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Không tìm thấy phim này</h2>
        <Link to="/" className="text-red-500 hover:underline">Quay về trang chủ</Link>
      </div>
    );
  }

  const firstEpisode = movie.episodes?.[0]?.server_data?.[0];

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      {/* Header Banner */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={getImageUrl(movie.thumb_url)} 
            alt={movie.name} 
            className="w-full h-full object-cover blur-md scale-110 opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] to-transparent" />
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-12 -mt-48 md:-mt-64 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster Section */}
          <div className="w-full md:w-80 shrink-0">
            <div className="aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img 
                src={getImageUrl(movie.poster_url)} 
                alt={movie.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="mt-6 flex flex-col gap-3">
              {firstEpisode && (
                <Link 
                  to={`/xem-phim/${movie.slug}/${firstEpisode.slug}`}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-105"
                >
                  <Play className="w-6 h-6 fill-current" /> XEM PHIM NGAY
                </Link>
              )}
              <div className="flex gap-2">
                 <button className="flex-1 bg-white/10 hover:bg-white/20 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors font-medium">
                    <Bookmark className="w-5 h-5" /> Lưu lại
                 </button>
                 <button className="px-4 bg-white/10 hover:bg-white/20 py-3 rounded-xl transition-colors">
                    <Share2 className="w-5 h-5" />
                 </button>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="flex-grow space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                {movie.name}
              </h1>
              <h2 className="text-xl md:text-2xl text-gray-400 font-medium tracking-wide italic">
                {movie.origin_name} ({movie.year})
              </h2>
              
              <div className="flex flex-wrap gap-4 text-sm font-medium">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span>8.5 (IMDb)</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                  <Clock className="w-4 h-4 text-red-500" />
                  <span>{movie.time || 'Đang cập nhật'}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                  <Tag className="w-4 h-4 text-blue-500" />
                  <span>{movie.quality}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
               <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-red-500 shrink-0" />
                  <div>
                    <span className="block text-xs font-bold text-gray-500 uppercase">Quốc gia</span>
                    {movie.country.map(c => c.name).join(', ')}
                  </div>
               </div>
               <div className="flex gap-3">
                  <Users className="w-5 h-5 text-red-500 shrink-0" />
                  <div>
                    <span className="block text-xs font-bold text-gray-500 uppercase">Diễn viên</span>
                    {movie.actor.slice(0, 5).join(', ') || 'Chưa rõ'}
                  </div>
               </div>
               <div className="flex gap-3">
                  <Tag className="w-5 h-5 text-red-500 shrink-0" />
                  <div>
                    <span className="block text-xs font-bold text-gray-500 uppercase">Thể loại</span>
                    {movie.category.map(c => c.name).join(', ')}
                  </div>
               </div>
               <div className="flex gap-3">
                  <Users className="w-5 h-5 text-red-500 shrink-0" />
                  <div>
                    <span className="block text-xs font-bold text-gray-500 uppercase">Đạo diễn</span>
                    {movie.director.join(', ') || 'Chưa rõ'}
                  </div>
               </div>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-red-500" /> Tóm tắt nội dung
              </h3>
              <div 
                className="text-gray-400 leading-relaxed text-sm md:text-base"
                dangerouslySetInnerHTML={{ __html: movie.content }} 
              />
            </div>

            {/* Episode List */}
            {movie.episodes && movie.episodes.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-bold uppercase tracking-widest">Danh sách tập</h3>
                  <div className="h-px flex-grow bg-white/10" />
                </div>
                {movie.episodes.map((server, sIdx) => (
                  <div key={sIdx} className="space-y-4">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                       Server: <span className="text-red-500">{server.server_name}</span>
                    </p>
                    <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-3">
                      {server.server_data.map((ep, eIdx) => (
                        <Link
                          key={eIdx}
                          to={`/xem-phim/${movie.slug}/${ep.slug}`}
                          className="bg-white/5 hover:bg-red-600 border border-white/10 hover:border-red-600 text-center py-2.5 rounded-lg text-sm font-bold transition-all"
                        >
                          {ep.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
